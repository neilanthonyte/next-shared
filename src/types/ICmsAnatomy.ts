export interface ICmsAnatomy {
  type: "anatomy";
  title: string;
  slug: string;
  sceneName: string;
  description: string;
  posterImage: string;
  placeholderImage: null | string;
  cameraPositions: any;
  category: string;
  url?: string;
}
