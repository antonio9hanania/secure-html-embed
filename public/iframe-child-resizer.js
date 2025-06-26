(function () {
  "use strict";

  let lastHeight = 0;
  let resizeObserver;
  let mutationObserver;
  let isInitialized = false;

  function sendHeight() {
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    if (height !== lastHeight && height > 0) {
      lastHeight = height;

      // Send height to parent via postMessage
      try {
        window.parent.postMessage(
          {
            type: "iframe-height-update",
            height: height,
            timestamp: Date.now(),
            source: "iframe-child-resizer",
          },
          "*"
        );

        console.log("Sent height update:", height + "px");
      } catch (e) {
        console.warn("Could not send height to parent:", e);
      }
    }
  }

  function setupResizeDetection() {
    if (isInitialized) return;
    isInitialized = true;

    // Method 1: ResizeObserver (modern browsers)
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(sendHeight);
      });
      resizeObserver.observe(document.body);
      resizeObserver.observe(document.documentElement);
    }

    // Method 2: MutationObserver (DOM changes)
    if (window.MutationObserver) {
      mutationObserver = new MutationObserver(() => {
        requestAnimationFrame(sendHeight);
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "height"],
      });
    }

    // Method 3: Window resize events
    window.addEventListener("resize", () => {
      requestAnimationFrame(sendHeight);
    });

    // Method 4: Listen for test messages
    window.addEventListener("message", function (event) {
      if (event.data?.type === "add-test-content") {
        // Add test content to verify responsiveness
        const testDiv = document.createElement("div");
        testDiv.style.cssText =
          "padding: 20px; background: #e8f4fd; margin: 10px 0; border-radius: 5px;";
        testDiv.innerHTML =
          "<h3>Test Content Added!</h3><p>This content was added dynamically to test the responsive iframe functionality.</p>";
        document.body.appendChild(testDiv);

        setTimeout(sendHeight, 100); // Send height after DOM update
      }
    });

    // Method 5: Periodic checking (fallback)
    setInterval(sendHeight, 500);

    console.log("Iframe resizer initialized");
  }

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupResizeDetection);
    } else {
      setupResizeDetection();
    }

    // Send initial height after a short delay
    setTimeout(() => {
      sendHeight();
      console.log("Initial height sent");
    }, 100);

    // Send height again after images might load
    setTimeout(sendHeight, 1000);
  }

  // Initialize when script loads
  init();

  // Cleanup function (if needed)
  window.iframeResizerCleanup = function () {
    if (resizeObserver) resizeObserver.disconnect();
    if (mutationObserver) mutationObserver.disconnect();
    isInitialized = false;
  };

  console.log("Iframe child resizer script loaded");
})();
