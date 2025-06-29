export interface EmbedConfig {
  htmlContent: string;
  responsive: boolean;
  height?: number;
}

export interface StepOneOutput {
  htmlContent: string;
  responsiveEmbedCode: string;
}

export interface StepTwoOutput {
  id: number;
  type: "rawhtmlcoder";
  responsive: true;
  src: string;
  embedId?: string; // Add optional embedId for container reference
  createdAt: string;
}
