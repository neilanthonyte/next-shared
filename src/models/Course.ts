import { validate, IsString, IsArray } from "class-validator";

import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ValidationError } from "../helpers/errorTypes";

export interface ICourse {
  slug: string;
  title: string;
  posterImage: string;
  description: string;
  articleSlugs?: string[];
}

export class Course implements ISerializable {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  posterImage: string;

  @IsString()
  description: string;

  @IsArray()
  articleSlugs: string[];

  public serialize(): ICourse {
    return {
      slug: this.slug,
      title: this.title,
      posterImage: this.posterImage,
      description: this.description,
      articleSlugs: this.articleSlugs,
    };
  }

  public static unserialize(newCourse: ICourse): Course {
    const course = new Course();

    course.slug = newCourse.slug;
    course.title = newCourse.title;
    course.posterImage = newCourse.posterImage;
    course.description = newCourse.description;
    course.articleSlugs = newCourse.articleSlugs;
    return course;
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
