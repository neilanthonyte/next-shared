import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  validate,
} from "class-validator";

import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ValidationError } from "../helpers/errorTypes";

const getFileExtension = (path: string) => {
  if (!path) return null;
  return path
    .replace(/[?#].*$/, "")
    .split(".")
    .pop();
};

export interface IAsset {
  label: string | null;
  assetUrl: string;
  fileType?: string;
}

export interface IFilesResource {
  title: string;
  description: string;
  posterImage?: string;
  category?: string;
  // single vs multi-file resource
  assets?: IAsset[];
  assetUrl?: string;
}

export class FilesResource implements ISerializable {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  @IsOptional()
  public posterImage: string;

  @IsArray()
  public assets: IAsset[];

  @IsString()
  public category: string;

  public filterSensitiveData() {
    return cloneModelObject(this);
  }

  public serialize(): IFilesResource {
    return {
      title: this.title,
      description: this.description,
      posterImage: this.posterImage,
      assets: this.assets,
      category: this.category,
    };
  }

  static unserialize(resource: IFilesResource) {
    const object = new FilesResource();

    object.title = resource.title;
    object.description = resource.description;
    object.posterImage = resource.posterImage;

    object.assets = resource.assets;
    // support for single file resource
    if (resource.assetUrl) {
      object.assets = [
        {
          label: "Download",
          assetUrl: resource.assetUrl,
          fileType: getFileExtension(resource.assetUrl),
        },
      ];
    }

    object.category = resource.category;
    return object;
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }
    return true;
  }
}
