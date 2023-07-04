export interface ICmsImage {
  full: string;
  galleryThumbnail: string;
  halfPage: string;
  largeHeroHeader: string;
  mobileList: string;
  oneThirdPage: string;
  previewCard: string;
  squareSmall: string;
}

export interface ICmsImageStd {
  full: string;
  squareSmall: string;
  squareMedium: string;
  squareLarge?: string;
  // legacy support
  largePosterImage?: string;
}
