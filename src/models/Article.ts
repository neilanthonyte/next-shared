import {
  validate,
  IsString,
  IsInt,
  IsArray,
  IsBoolean,
  IsOptional,
  IsObject,
} from "class-validator";

import { cloneModelObject } from "../helpers/cloneModelObject";
import { ValidationError } from "../helpers/errorTypes";
import { unixTimestamp } from "../types/dateTypes";
import { ICameraPosition } from "../types/ICameraPosition";
import { ISerializable } from "../types/ISerializable";

export interface IGalleryImage {
  original: string;
  thumbnail: string;
  full: string;
}

export interface IArticleImage {
  full: string;
  galleryThumbnail: string;
  halfPage: string;
  largeHeroHeader: string;
  mobileList: string;
  oneThirdPage: string;
  previewCard: string;
  squareSmall: string;
}

export interface IAuthor {
  name: string;
  profileImage?: string;
  profileUrl?: string;
}

export type TArticleType = "standard" | "externalResource";

export interface IArticlePreview {
  type?: TArticleType;
  url?: string;
  slug: string;
  title: string;
  description: string;
  posterImage?: string;
  previewImage?: string;
  postDate?: unixTimestamp;
  // HACK - cms field
  postedAt?: unixTimestamp;
  authors?: IAuthor[];
  category?: string;
  dateUpdated?: number;
}

export class ArticlePreview implements ISerializable {
  @IsOptional()
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  type: TArticleType = "standard";

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  posterImage: string;

  @IsOptional()
  @IsString()
  previewImage: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsInt()
  postDate: number;

  @IsOptional()
  @IsArray()
  authors: IAuthor[];

  public static unserialize(newArticle: IArticlePreview): ArticlePreview {
    const model = new this();
    model.url = newArticle.url;
    model.type = newArticle.type;
    model.title = newArticle.title;
    model.slug = newArticle.slug;
    model.description = newArticle.description;
    model.posterImage = newArticle.posterImage;
    model.previewImage = newArticle.previewImage;
    model.postDate = newArticle.postDate || newArticle.postedAt;
    model.authors = newArticle.authors;
    model.category = newArticle.category;
    return model;
  }

  public serialize(): IArticlePreview {
    return {
      url: this.url,
      type: this.type,
      title: this.title,
      slug: this.slug,
      description: this.description,
      posterImage: this.posterImage,
      previewImage: this.previewImage,
      postDate: this.postDate,
      authors: this.authors,
      category: this.category,
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }
    return true;
  }
}

interface IArticleField {
  type:
    | "text"
    | "image"
    | "number"
    | "prevalence"
    | "video"
    | "icons"
    | "gallery"
    // ops article (??)
    | "heading"
    | "resource"
    // medical article (??)
    | "anatomy";
  description?: string;
  content?: string;
  imageUrl?: string;
  image?: IArticleImage;
  images?: IGalleryImage[];
  value?: number;
  animation?: "tallyUp";
  populationSize?: number;
  proportion?: number;
  videoProvider?: "youtube";
  videoId?: string;
  icons?: Array<{
    slug: string;
    url: string;
    urlRaw: string;
    title: string;
  }>;
  placeholderImage?: IArticleImage[];
  // ops articles
  anchorId?: string;
  // resource
  title?: string;
  assetUrl?: string;
  _style?: any;
  // medical article
  sceneName?: string;
  cameraPositions?: {
    default: ICameraPosition;
    primary: ICameraPosition;
    secondary: ICameraPosition;
  };
  biodigitalId?: string;
  posterImage?: IArticleImage;
  camera?: {
    default: string;
    primary: string;
    secondary: string;
  };
}

export interface IArticleVisibilityOptions {
  // which user group can view it
  users: "public" | "users";
  // which clinic can view it (null == ALL)
  location: null | string[];
  // where is it served
  device: string[];
}

// TODO split content into the different content types to make it clearer as to what content
// fields are used by each block type
export interface IArticle extends IArticlePreview {
  content: IArticleField[];
  // for external resources
  resourceUrl?: string;
  // used for content editing
  _raw?: any;
  // originally for medical articles
  visibility?: IArticleVisibilityOptions;
}

export class Article extends ArticlePreview {
  @IsArray()
  content: IArticleField[];

  @IsString()
  @IsOptional()
  resourceUrl: string;

  @IsObject()
  @IsOptional()
  visibility?: IArticleVisibilityOptions;

  public static unserialize(newArticle: IArticle): Article {
    const model: Article = super.unserialize(newArticle) as Article;
    model.content = newArticle.content;
    model.resourceUrl = newArticle.resourceUrl;
    model.visibility = newArticle.visibility;
    return model;
  }

  public serialize(): IArticle {
    const article = super.serialize() as IArticle;
    article.content = this.content;
    article.resourceUrl = this.resourceUrl;
    article.visibility = this.visibility;
    return article;
  }
}
export interface IMedicalArticle extends IArticle {
  // relatedTo?: {
  //   observations: string[];
  // };
}

export class MedicalArticle extends Article {
  public static unserialize(newArticle: IMedicalArticle): MedicalArticle {
    const model: MedicalArticle = super.unserialize(
      newArticle,
    ) as MedicalArticle;
    return model;
  }

  public serialize(): IMedicalArticle {
    const article = super.serialize() as IMedicalArticle;
    return article;
  }
}

export interface IOpsArticle extends IArticle {
  isCommon: boolean;
}

export class OpsArticle extends Article {
  @IsBoolean()
  isCommon: boolean;

  public static unserialize(newArticle: IOpsArticle): OpsArticle {
    const model: OpsArticle = super.unserialize(newArticle) as OpsArticle;
    model.isCommon = newArticle.isCommon;
    return model;
  }

  public serialize(): IOpsArticle {
    const article = super.serialize() as IOpsArticle;
    article.isCommon = this.isCommon;
    return article;
  }
}

export interface IBlogArticleLocation {
  slug: string;
  id: number;
  url: string;
}

export interface IBlogArticle extends IArticle {
  visibilityFoyer: boolean;
  visibilityCompanion: boolean;
  visibilityLocationBlog: boolean;
  visibilityNextBlog: boolean;
  visibilityLocationSpecific: IBlogArticleLocation[];
}

export class BlogArticle extends Article {
  @IsBoolean()
  public visibilityFoyer: boolean;

  @IsBoolean()
  public visibilityCompanion: boolean;

  @IsBoolean()
  public visibilityLocationBlog: boolean;

  @IsBoolean()
  public visibilityNextBlog: boolean;

  // TODO we should start validating nested fields
  @IsArray()
  public visibilityLocationSpecific: IBlogArticleLocation[];

  public static unserialize(newArticle: IBlogArticle): BlogArticle {
    const model: BlogArticle = super.unserialize(newArticle) as BlogArticle;
    model.visibilityFoyer = newArticle.visibilityFoyer;
    model.visibilityCompanion = newArticle.visibilityCompanion;
    model.visibilityLocationBlog = newArticle.visibilityLocationBlog;
    model.visibilityNextBlog = newArticle.visibilityNextBlog;
    model.visibilityLocationSpecific = newArticle.visibilityLocationSpecific;
    return model;
  }

  public serialize(): IBlogArticle {
    const article = super.serialize() as IBlogArticle;
    article.visibilityFoyer = this.visibilityFoyer;
    article.visibilityCompanion = this.visibilityCompanion;
    article.visibilityLocationBlog = this.visibilityLocationBlog;
    article.visibilityNextBlog = this.visibilityNextBlog;
    article.visibilityLocationSpecific = this.visibilityLocationSpecific;
    return article;
  }
}

export interface IBlogArticlePreview extends IArticlePreview {
  visibilityFoyer: boolean;
  visibilityCompanion: boolean;
  visibilityLocationBlog: boolean;
  visibilityNextBlog: boolean;
  visibilityLocationSpecific: IBlogArticleLocation[];
}

export class BlogArticlePreview extends ArticlePreview {
  @IsBoolean()
  public visibilityFoyer: boolean;

  @IsBoolean()
  public visibilityCompanion: boolean;

  @IsBoolean()
  public visibilityLocationBlog: boolean;

  @IsBoolean()
  public visibilityNextBlog: boolean;

  // TODO we should start validating nested fields
  @IsArray()
  public visibilityLocationSpecific: IBlogArticleLocation[];

  public static unserialize(
    newArticle: IBlogArticlePreview,
  ): BlogArticlePreview {
    const model: BlogArticlePreview = super.unserialize(
      newArticle,
    ) as BlogArticlePreview;
    model.visibilityFoyer = newArticle.visibilityFoyer;
    model.visibilityCompanion = newArticle.visibilityCompanion;
    model.visibilityLocationBlog = newArticle.visibilityLocationBlog;
    model.visibilityNextBlog = newArticle.visibilityNextBlog;
    model.visibilityLocationSpecific = newArticle.visibilityLocationSpecific;
    return model;
  }

  public serialize(): IBlogArticlePreview {
    const article = super.serialize() as IBlogArticlePreview;
    article.visibilityFoyer = this.visibilityFoyer;
    article.visibilityCompanion = this.visibilityCompanion;
    article.visibilityLocationBlog = this.visibilityLocationBlog;
    article.visibilityNextBlog = this.visibilityNextBlog;
    article.visibilityLocationSpecific = this.visibilityLocationSpecific;
    return article;
  }
}

export interface INewsArticle extends IArticle {}

export class NewsArticle extends Article {
  public static unserialize(newArticle: INewsArticle): NewsArticle {
    return super.unserialize(newArticle);
  }

  public serialize(): INewsArticle {
    return super.serialize();
  }
}
