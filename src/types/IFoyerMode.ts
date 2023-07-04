export enum EFoyerLogoMode {
  LIGHT = "light",
  DARK = "dark",
  ANIMATED = "animated",
  COLOR = "color",
}

export interface IFoyerTouchColors {
  high: number[];
  mid: number[];
  low: number[];
}
export interface IFoyerMode {
  touchColors: IFoyerTouchColors;
  backgroundColor?: number[];
  backgroundImageUrl?: string;
  showArticle?: boolean;
  logoType?: EFoyerLogoMode;
}
