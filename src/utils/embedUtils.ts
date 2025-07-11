export function createSecureEmbed(
  htmlContent: string,
  responsive: boolean = false,
  baseUrl: string = ""
): string {
  // Add iframe-resizer script for responsive mode (inside iframe where it belongs)
  const childScript = responsive
    ? `\n<script src="https://antonio9hanania.github.io/secure-html-embed/iframe-child-resizer.js"></script>`
    : "";

  const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://antonio9hanania.github.io https://cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://antonio9hanania.github.io https://cdnjs.cloudflare.com;">
    <title>Secure Embed</title>
    ${childScript}
</head>
<body style="margin: 0; padding: 0;">
${htmlContent}
</body>
</html>`;

  // Create data URI
  const dataUri =
    "data:text/html;charset=utf-8," + encodeURIComponent(fullHTML);
  return dataUri;
}

export function generateEmbedId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export function validateHtmlContent(content: string): boolean {
  return content.trim().length > 0;
}
