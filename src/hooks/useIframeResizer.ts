"use client";

import { useEffect, useRef, useState } from "react";

interface UseIframeResizerOptions {
  onResize?: (height: number) => void;
  onLoad?: () => void;
  onError?: (error: any) => void;
  minHeight?: number;
  maxHeight?: number;
}

export function useIframeResizer(options: UseIframeResizerOptions = {}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(options.minHeight || 150);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleMessage = (event: MessageEvent) => {
      // Security: Only accept messages from our iframe
      if (event.source !== iframe.contentWindow) return;

      if (
        event.data?.type === "iframe-height-update" &&
        event.data?.source === "iframe-child-resizer"
      ) {
        const newHeight = event.data.height;
        const minHeight = options.minHeight || 150;
        const maxHeight = options.maxHeight || 2000;

        const constrainedHeight = Math.min(
          Math.max(newHeight, minHeight),
          maxHeight
        );

        console.log(`Height update: ${newHeight}px -> ${constrainedHeight}px`);

        setHeight(constrainedHeight);
        options.onResize?.(constrainedHeight);
      }
    };

    const handleLoad = () => {
      console.log("Iframe loaded");
      setIsLoaded(true);
      options.onLoad?.();

      // Request initial height after load
      setTimeout(() => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: "request-height" }, "*");
        }
      }, 100);
    };

    const handleError = (error: any) => {
      console.error("Iframe error:", error);
      options.onError?.(error);
    };

    // Add event listeners
    window.addEventListener("message", handleMessage);
    iframe.addEventListener("load", handleLoad);
    iframe.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", handleLoad);
      iframe.removeEventListener("error", handleError);
    };
  }, [options]);

  return {
    iframeRef,
    height,
    isLoaded,
  };
}
