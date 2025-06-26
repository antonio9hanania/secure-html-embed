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
  createdAt: string;
}
