"use client";

import { useEffect, useState, useCallback } from "react";
import { generateEmbedId } from "@/utils/embedUtils";
import { StepOneOutput, StepTwoOutput } from "@/types/embed";

interface StepTwoProps {
  inputData: StepOneOutput;
  onJsonGenerated: (json: StepTwoOutput) => void;
}

export default function StepTwo({ inputData, onJsonGenerated }: StepTwoProps) {
  const [jsonOutput, setJsonOutput] = useState<StepTwoOutput | null>(null);
  const [processing, setProcessing] = useState(true);

  const processResponsiveEmbed = useCallback(() => {
    setProcessing(true);

    try {
      // Extract the iframe src from within the container div
      const srcMatch = inputData.responsiveEmbedCode.match(/src="([^"]+)"/);
      if (!srcMatch) {
        throw new Error("Could not find iframe src in the embed code");
      }

      // Extract the embed ID from the container
      const idMatch = inputData.responsiveEmbedCode.match(/id="([^"]+)"/);
      const embedId = idMatch ? idMatch[1] : `extracted-${Date.now()}`;

      // Extract embed type from container
      const typeMatch = inputData.responsiveEmbedCode.match(
        /data-embed-type="([^"]+)"/
      );
      const embedType = typeMatch ? typeMatch[1] : "responsive-html";

      const srcUrl = srcMatch[1];

      // Create simple JSON structure for Next.js frontend
      const embedData: StepTwoOutput = {
        id: generateEmbedId(),
        type: "rawhtmlcoder",
        responsive: true,
        src: srcUrl,
        embedId: embedId, // Container ID for backend reference
        createdAt: new Date().toISOString(),
      };

      setJsonOutput(embedData);
      onJsonGenerated(embedData);
      setProcessing(false);
    } catch (error) {
      console.error("Error processing embed code:", error);
      setProcessing(false);
    }
  }, [inputData, onJsonGenerated]);

  useEffect(() => {
    // Auto-process when component mounts
    processResponsiveEmbed();
  }, [processResponsiveEmbed]);

  const copyJson = () => {
    if (jsonOutput) {
      navigator.clipboard
        .writeText(JSON.stringify(jsonOutput, null, 2))
        .then(() => alert("✅ JSON copied to clipboard!"))
        .catch(() => alert("❌ Failed to copy to clipboard"));
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: "20px", color: "#007bff" }}>
        ⚙️ Step 2: Backend Processing (Extract src → JSON)
      </h2>

      <div
        style={{
          background: "#d4edda",
          border: "1px solid #c3e6cb",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <strong>✅ Auto-Processing:</strong> Extracting the secure iframe src
        from Step 1 and creating clean JSON structure for Next.js.
      </div>

      {processing ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚙️</div>
          <p>Extracting secure iframe src...</p>
        </div>
      ) : (
        <>
          {jsonOutput && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <h3 style={{ margin: 0 }}>📄 Clean JSON for Next.js:</h3>
                <button className="button" onClick={copyJson}>
                  📋 Copy JSON
                </button>
              </div>

              <div className="json-display">
                {JSON.stringify(jsonOutput, null, 2)}
              </div>

              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  background: "#e8f4fd",
                  borderRadius: "6px",
                }}
              >
                <strong>📊 Backend Processing Result:</strong>
                <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                  <li>
                    <strong>ID:</strong> {jsonOutput.id}
                  </li>
                  <li>
                    <strong>Type:</strong> {jsonOutput.type}
                  </li>
                  <li>
                    <strong>Mode:</strong> Responsive (ready-to-use)
                  </li>
                  <li>
                    <strong>Src:</strong> Complete secure embed from Step 1
                  </li>
                  <li>
                    <strong>Status:</strong> ✅ Ready for Next.js
                  </li>
                </ul>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  background: "#fff3cd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              >
                <strong>🗄️ Backend Logic:</strong>
                <ol style={{ marginTop: "5px", paddingLeft: "20px" }}>
                  <li>Received complete responsive embed code from Step 1</li>
                  <li>Extracted the secure iframe src attribute</li>
                  <li>Generated unique ID and metadata</li>
                  <li>Created minimal JSON structure</li>
                  <li>Ready for Next.js direct usage</li>
                </ol>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
