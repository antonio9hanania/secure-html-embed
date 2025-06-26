"use client";

import { useState } from "react";
import { useIframeResizer } from "@/hooks/useIframeResizer";
import { StepTwoOutput } from "@/types/embed";

interface StepThreeProps {
  embedJson: StepTwoOutput;
}

export default function StepThree({ embedJson }: StepThreeProps) {
  const [showImplementation, setShowImplementation] = useState(false);

  const { iframeRef, height, isLoaded } = useIframeResizer({
    onResize: (newHeight) => {
      console.log("Next.js iframe resized to:", newHeight + "px");
    },
    onLoad: () => {
      console.log("Next.js iframe loaded successfully");
    },
    minHeight: 150,
    maxHeight: 2000,
  });

  return (
    <div className="card">
      <h2 style={{ marginBottom: "20px", color: "#007bff" }}>
        🚀 Step 3: Next.js Frontend - Use src Directly
      </h2>

      <div className="security-notice">
        <strong>🚀 Next.js Best Practice:</strong> Using the pre-generated
        secure src from Step 1 directly - no regeneration needed!
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f8f9fa",
          borderRadius: "6px",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>📊 Using JSON Data:</h3>
        <div style={{ fontSize: "14px", color: "#666" }}>
          <p>
            <strong>ID:</strong> {embedJson.id}
          </p>
          <p>
            <strong>Type:</strong> {embedJson.type}
          </p>
          <p>
            <strong>Mode:</strong> Responsive Auto-height (Direct src usage)
          </p>
          <p>
            <strong>Current Height:</strong> {height}px
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {isLoaded ? "✅ Loaded & Responsive" : "⏳ Loading..."}
          </p>
          <p>
            <strong>Responsive Working:</strong>{" "}
            {height > 150 ? "✅ Yes" : "⏳ Initializing..."}
          </p>
        </div>
      </div>

      <div className="preview-container">
        <div
          style={{
            padding: "10px",
            background: "#28a745",
            color: "white",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            fontWeight: "bold",
          }}
        >
          🚀 Next.js Production - Direct src Usage - Height: {height}px
        </div>

        <div style={{ padding: "20px" }}>
          <iframe
            ref={iframeRef}
            src={embedJson.src} // ← Using src directly from JSON!
            style={{
              width: "100%",
              height: `${height}px`,
              border: "none",
              minHeight: "150px",
              transition: "height 0.3s ease",
            }}
            sandbox="allow-scripts allow-forms allow-popups allow-modals"
            title="Next.js Responsive Embed"
            onLoad={() => {
              console.log("Direct src iframe loaded successfully");
            }}
          />
        </div>
      </div>

      {/* Test responsiveness */}
      <div style={{ marginTop: "15px", marginBottom: "20px" }}>
        <button
          className="button"
          onClick={() => {
            const iframe = iframeRef.current;
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(
                {
                  type: "add-test-content",
                },
                "*"
              );
            }
          }}
        >
          🧪 Test Responsiveness (Add Content)
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          className="button"
          onClick={() => setShowImplementation(!showImplementation)}
        >
          {showImplementation ? "🙈 Hide" : "👁️ Show"} Next.js Implementation
          Code
        </button>
      </div>

      {showImplementation && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#d4edda",
            borderRadius: "6px",
          }}
        >
          <h4>🔧 Simplified Next.js Implementation:</h4>

          <div className="json-display">
            {`// 1. ResponsiveHtmlEmbed Component
import { useIframeResizer } from '@/hooks/useIframeResizer';

interface ResponsiveHtmlEmbedProps {
  embedData: {
    id: number;
    type: 'rawhtmlcoder';
    responsive: true;
    src: string; // Pre-generated secure src
  };
}

function ResponsiveHtmlEmbed({ embedData }: ResponsiveHtmlEmbedProps) {
  const { iframeRef, height, isLoaded } = useIframeResizer({
    onResize: (newHeight) => {
      console.log('Embed', embedData.id, 'resized to:', newHeight + 'px');
    },
    minHeight: 150,
    maxHeight: 2000
  });
  
  return (
    <div style={{ margin: '20px 0' }}>
      <iframe
        ref={iframeRef}
        src={embedData.src} // ← Direct usage, no regeneration!
        style={{ 
          width: '100%', 
          height: height + 'px',
          border: 'none',
          minHeight: '150px',
          transition: 'height 0.3s ease'
        }}
        sandbox="allow-scripts allow-forms allow-popups allow-modals"
        title={\`Responsive HTML Embed \${embedData.id}\`}
      />
    </div>
  );
}

// 2. CMS Article Component
function ArticleRenderer({ embeds }: { embeds: EmbedData[] }) {
  return (
    <article>
      {embeds.map(embed => {
        // Responsive HTML embeds - use src directly
        if (embed.type === 'rawhtmlcoder' && embed.responsive) {
          return (
            <ResponsiveHtmlEmbed 
              key={embed.id} 
              embedData={embed} 
            />
          );
        }
        
        // Fixed height HTML embeds - also use src directly
        if (embed.type === 'rawhtmlcoder' && !embed.responsive) {
          return (
            <iframe
              key={embed.id}
              src={embed.src} // ← Direct usage
              style={{ 
                width: '100%', 
                height: embed.height + 'px',
                border: 'none' 
              }}
              sandbox="allow-scripts allow-forms allow-popups allow-modals"
              title={\`Fixed HTML Embed \${embed.id}\`}
            />
          );
        }
        
        return null;
      })}
    </article>
  );
}

// 3. Example Usage - Clean JSON structure
const embedData = ${JSON.stringify(embedJson, null, 2)};

export default function Article() {
  const embeds = [embedData];
  return <ArticleRenderer embeds={embeds} />;
}`}
          </div>

          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              background: "#d4edda",
              borderRadius: "6px",
            }}
          >
            <strong>✅ Benefits of Direct src Usage:</strong>
            <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
              <li>
                <strong>No regeneration overhead</strong> - Use what Step 1
                created
              </li>
              <li>
                <strong>Exact consistency</strong> - Same embed tested in Step 1
              </li>
              <li>
                <strong>Simpler JSON</strong> - Only store what's needed
              </li>
              <li>
                <strong>Better performance</strong> - No processing in Next.js
              </li>
              <li>
                <strong>Clean architecture</strong> - Step 1 does the work once
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
