"use client";

import { useState, useRef } from "react";
import { createSecureEmbed, validateHtmlContent } from "@/utils/embedUtils";
import { useIframeResizer } from "@/hooks/useIframeResizer";
import { StepOneOutput } from "@/types/embed";

interface StepOneProps {
  onDataGenerated: (data: StepOneOutput) => void;
}

export default function StepOne({ onDataGenerated }: StepOneProps) {
  const [htmlContent, setHtmlContent] = useState("");
  const [height, setHeight] = useState(500);
  const [embedType, setEmbedType] = useState<"none" | "fixed" | "responsive">(
    "none"
  );
  const [generatedEmbedCode, setGeneratedEmbedCode] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  // For responsive preview
  const { iframeRef: responsiveIframeRef, height: responsiveHeight } =
    useIframeResizer({
      onResize: (newHeight) => {
        console.log("Responsive preview resized to:", newHeight + "px");
      },
    });

  const fixedIframeRef = useRef<HTMLIFrameElement>(null);

  // Load example Hebrew Chart.js code
  const loadExample = () => {
    const exampleCode = `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js"></script>

<style>
        body {
            font-family: Arial, Hebrew, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
            direction: rtl;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        button {
            padding: 12px 24px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
            background-color: #e0e0e0;
            color: #333;
        }
        button:hover {
            background-color: #d0d0d0;
        }
        button.active {
            background-color: #2196F3;
            color: white;
        }
        .chart-container {
            position: relative;
            height: 400px;
            margin-top: 20px;
        }
        .stats {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
</style>

<div class="container">
    <h1>נתוני רייטינג - רצועות שידור</h1>
    <div class="buttons">
        <button onclick="showData('main')" class="active">מהדורה מרכזית</button>
        <button onclick="showData('prime')">פריים טיים</button>
        <button onclick="showData('late')">לייט נייט</button>
    </div>
    <div class="chart-container">
        <canvas id="ratingsChart"></canvas>
    </div>
    <div class="stats" id="stats"></div>
</div>

<script>
        const data = {
            main: {
                labels: ['חדשות 12', 'חדשות 14', 'חדשות 13', 'חדשות 11'],
                viewers: [516, 264, 245, 123],
                rating: [19.8, 9.5, 7.8, 4.6],
                shows: ['יונית לוי ודני קושמרו', 'מגי טביבי', 'אודי סגל ודוריה למפל', 'טל ברמן וטלי מורנו']
            },
            prime: {
                labels: ['רוקדים עם כוכבים\\n(קשת 12)', 'האח הגדול\\n(רשת 13)', 'הפטריוטים\\n(ערוץ 14)'],
                viewers: [493, 414, 320],
                rating: [18.7, 14.7, 10.6],
                shows: ['', '', 'ינון מגל עם נתניהו']
            },
            late: {
                labels: ['אברי גלעד ויאיר שרקי\\n(קשת 12)', 'הצינור - גיא לרר\\n(רשת 13)', 'היום שהיה\\n(רשת 13)', 'חדשות הלילה\\n(ערוץ 14)', 'חדשות הלילה\\n(כאן 11)'],
                viewers: [261, 229, 148, 95, 77],
                rating: [10.4, 7.5, 5.4, 3.6, 2.9],
                shows: ['', '', '', 'יהודה שלזינגר', 'עמרי אסנהיים ורוני קובן']
            }
        };

        let chart;
        const ctx = document.getElementById('ratingsChart').getContext('2d');

        function createChart(dataKey) {
            const currentData = data[dataKey];
            
            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: currentData.labels,
                    datasets: [
                        {
                            label: 'צופים (אלפים)',
                            data: currentData.viewers,
                            backgroundColor: 'rgba(33, 150, 243, 0.7)',
                            borderColor: 'rgba(33, 150, 243, 1)',
                            borderWidth: 1,
                            yAxisID: 'y-viewers'
                        },
                        {
                            label: 'נתח צפייה (%)',
                            data: currentData.rating,
                            backgroundColor: 'rgba(255, 99, 132, 0.7)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            type: 'line',
                            yAxisID: 'y-rating'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        'y-viewers': {
                            type: 'linear',
                            position: 'right',
                            title: {
                                display: true,
                                text: 'צופים (אלפים)',
                                font: {
                                    size: 14
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        },
                        'y-rating': {
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'נתח צפייה (%)',
                                font: {
                                    size: 14
                                }
                            },
                            max: 25
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 12
                                },
                                maxRotation: 0,
                                autoSkip: false
                            }
                        }
                    }
                }
            });

            updateStats(dataKey);
        }

        function showData(dataKey) {
            document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            createChart(dataKey);
        }

        function updateStats(dataKey) {
            const currentData = data[dataKey];
            const totalViewers = currentData.viewers.reduce((a, b) => a + b, 0);
            const avgViewers = Math.round(totalViewers / currentData.viewers.length);
            const maxViewers = Math.max(...currentData.viewers);
            const minViewers = Math.min(...currentData.viewers);
            
            let statsText = \`סה"כ צופים: \${totalViewers} אלף | ממוצע: \${avgViewers} אלף | \`;
            statsText += \`הגבוה ביותר: \${maxViewers} אלף | הנמוך ביותר: \${minViewers} אלף\`;
            
            document.getElementById('stats').textContent = statsText;
        }

        // Initialize with main news data
        createChart('main');
</script>`;

    setHtmlContent(exampleCode);
  };

  // Generate Fixed Height Iframe
  const generateFixedEmbed = () => {
    if (!validateHtmlContent(htmlContent)) {
      alert("Please enter some HTML content");
      return;
    }

    const secureEmbed = createSecureEmbed(htmlContent, false);

    const embedCode = `<!-- Secure Fixed Height HTML Embed -->
<iframe 
    style="width: 100%; border: 1px solid #ddd; height: ${height}px; border-radius: 5px;" 
    sandbox="allow-scripts allow-forms allow-popups allow-modals"
    src="${secureEmbed}"
    title="Secure HTML Embed">
</iframe>`;

    setGeneratedEmbedCode(embedCode);
    setPreviewSrc(secureEmbed);
    setEmbedType("fixed");
  };

  // Generate Responsive Iframe - THIS feeds into Step 2
  const generateResponsiveEmbed = () => {
    if (!validateHtmlContent(htmlContent)) {
      alert("Please enter some HTML content");
      return;
    }

    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";
    const secureEmbed = createSecureEmbed(htmlContent, true, baseUrl);

    const embedCode = `<!-- Secure Responsive HTML Embed -->
<script>
(function() {
  let resizeTimeout;
  function handleIframeMessage(event) {
    if (event.data?.type === 'iframe-height-update') {
      const iframes = document.querySelectorAll('iframe[data-responsive="true"]');
      iframes.forEach(iframe => {
        if (iframe.contentWindow === event.source) {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            iframe.style.height = Math.max(event.data.height, 150) + 'px';
          }, 10);
        }
      });
    }
  }
  
  if (!window.iframeResizerInitialized) {
    window.addEventListener('message', handleIframeMessage);
    window.iframeResizerInitialized = true;
  }
})();
</script>

<iframe 
    data-responsive="true"
    style="width: 100%; border: 1px solid #ddd; min-height: 150px; border-radius: 5px;" 
    sandbox="allow-scripts allow-forms allow-popups allow-modals"
    src="${secureEmbed}"
    title="Secure Responsive HTML Embed">
</iframe>`;

    setGeneratedEmbedCode(embedCode);
    setPreviewSrc(secureEmbed);
    setEmbedType("responsive");

    // Pass data to Step 2
    const stepOneOutput: StepOneOutput = {
      htmlContent,
      responsiveEmbedCode: embedCode,
    };
    onDataGenerated(stepOneOutput);
  };

  const copyEmbedCode = () => {
    if (!generatedEmbedCode) return;
    navigator.clipboard
      .writeText(generatedEmbedCode)
      .then(() => alert("✅ Embed code copied to clipboard!"))
      .catch(() => alert("❌ Failed to copy to clipboard"));
  };

  const clearAll = () => {
    setHtmlContent("");
    setEmbedType("none");
    setGeneratedEmbedCode("");
    setPreviewSrc("");
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: "20px", color: "#007bff" }}>
        🔒 Step 1: Generate Embed Code for CMS
      </h2>

      <div className="security-notice">
        <strong>🛡️ For TinyMCE & CMS:</strong> Generate embed codes with vanilla
        JS that work in any content editor. Responsive option feeds into next
        steps.
      </div>

      <div className="form-group">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label className="form-label">Raw HTML Code Input</label>
          <button
            className="button"
            style={{
              background: "#17a2b8",
              color: "white",
              fontSize: "14px",
              padding: "8px 16px",
            }}
            onClick={loadExample}
          >
            📊 Load Hebrew Chart.js Example
          </button>
        </div>
        <textarea
          className="form-textarea"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          placeholder="Paste your raw HTML/CSS/JavaScript code here, or click 'Load Example' to see a Hebrew Chart.js demo..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Fixed Height (px)</label>
        <input
          type="number"
          className="form-input"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          min="100"
          max="2000"
          style={{ width: "200px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          className="button button-success"
          onClick={generateFixedEmbed}
          disabled={!validateHtmlContent(htmlContent)}
        >
          📐 Generate Fixed Height Iframe
        </button>

        <button
          className="button"
          style={{ background: "#17a2b8", color: "white" }}
          onClick={generateResponsiveEmbed}
          disabled={!validateHtmlContent(htmlContent)}
        >
          📏 Generate Responsive Iframe → Next Steps
        </button>

        <button className="button button-danger" onClick={clearAll}>
          🗑️ Clear All
        </button>
      </div>

      {/* Generated Embed Code Section */}
      {embedType !== "none" && (
        <div style={{ marginTop: "20px" }}>
          <div className="card">
            <h3 style={{ marginBottom: "15px" }}>
              📋 Generated{" "}
              {embedType === "fixed" ? "Fixed Height" : "Responsive"} Embed Code
              {embedType === "responsive" && (
                <span style={{ color: "#28a745", fontSize: "14px" }}>
                  {" "}
                  → Will process in Step 2
                </span>
              )}
            </h3>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button className="button button-success" onClick={copyEmbedCode}>
                📋 Copy Embed Code
              </button>
            </div>

            <textarea
              readOnly
              value={generatedEmbedCode}
              style={{
                width: "100%",
                height: "120px",
                fontFamily: '"Courier New", monospace',
                fontSize: "11px",
                padding: "10px",
                border: "2px solid #28a745",
                borderRadius: "5px",
                background: "#f8f9fa",
                marginBottom: "20px",
              }}
            />

            {/* TinyMCE Compatible Preview */}
            <h4 style={{ marginBottom: "10px" }}>
              👁️ TinyMCE Preview (
              {embedType === "fixed"
                ? `Fixed: ${height}px`
                : "Responsive Auto-height"}
              )
            </h4>

            <div className="preview-container">
              <div
                style={{
                  padding: "10px",
                  background: embedType === "fixed" ? "#ffc107" : "#28a745",
                  color: "white",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                {embedType === "fixed"
                  ? `🔒 Fixed Height Preview (${height}px) - Ready for CMS`
                  : `🔒📏 Responsive Preview (${responsiveHeight}px) - Vanilla JS for TinyMCE`}
              </div>

              <div style={{ padding: "20px" }}>
                {embedType === "fixed" ? (
                  <iframe
                    ref={fixedIframeRef}
                    src={previewSrc}
                    style={{
                      width: "100%",
                      height: `${height}px`,
                      border: "none",
                    }}
                    sandbox="allow-scripts allow-forms allow-popups allow-modals"
                    title="Fixed Height Preview"
                  />
                ) : (
                  <iframe
                    ref={responsiveIframeRef}
                    src={previewSrc}
                    data-responsive="true"
                    style={{
                      width: "100%",
                      height: `${responsiveHeight}px`,
                      border: "none",
                      minHeight: "150px",
                    }}
                    sandbox="allow-scripts allow-forms allow-popups allow-modals"
                    title="Responsive Preview"
                  />
                )}
              </div>
            </div>

            {/* Show what this example demonstrates */}
            {htmlContent.includes("Chart.js") && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  background: "#e8f4fd",
                  borderRadius: "6px",
                }}
              >
                <strong>🎯 This Example Demonstrates:</strong>
                <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                  <li>
                    ✅ <strong>External CDN Libraries:</strong> Chart.js from
                    cdnjs.cloudflare.com
                  </li>
                  <li>
                    ✅ <strong>Complex JavaScript:</strong> Interactive charts
                    with button controls
                  </li>
                  <li>
                    ✅ <strong>Hebrew/RTL Content:</strong> Right-to-left text
                    direction support
                  </li>
                  <li>
                    ✅ <strong>Data Visualization:</strong> Dynamic charts with
                    multiple datasets
                  </li>
                  <li>
                    ✅ <strong>Responsive Design:</strong> Auto-resizing based
                    on content
                  </li>
                  <li>
                    ✅ <strong>Event Handling:</strong> Button clicks update
                    chart data
                  </li>
                  <li>
                    ✅ <strong>CSS Styling:</strong> Professional appearance
                    with shadows & animations
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
