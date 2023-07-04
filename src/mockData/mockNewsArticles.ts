import { ArticlePreview, NewsArticle, INewsArticle } from "../models/Article";

const mockNewsArticlesJson: INewsArticle[] = [
  {
    type: "standard",
    slug: "news-article-01",
    title: "My News Article",
    description:
      "Elit ea veniam dolor aliquip dolor consequat ut ea adipisicing enim deserunt non. Consectetur eiusmod nostrud non amet dolor eiusmod enim labore cupidatat aliqua minim duis. Pariatur exercitation anim sunt est commodo excepteur dolor nulla ex aliqua labore eiusmod aliqua.",
    posterImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/articles/_largeHeroHeader/7781/image_190717_012147.jpg",
    previewImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/articles/_previewCard/7781/image_190717_012147.jpg",
    category: null,
    authors: [
      {
        name: "Dr Torben Sko",
        profileImage:
          "https://d1qr34qzhiwpdo.cloudfront.net/articles/image_190717_012147.jpeg",
        profileUrl: null,
      },
    ],
    postDate: 1563322260,
    content: [
      {
        type: "text",
        content: [
          '<p>Ad eu tempor <a href="http://google.com">veniam do incididunt</a> ad mollit officia pariatur in amet officia. Aute cillum adipisicing est adipisicing dolor Lorem anim duis commodo sint reprehenderit labore. Officia enim nisi in eu reprehenderit ea sint voluptate pariatur aliquip veniam consequat amet reprehenderit.</p>',
          "<p>Fugiat incididunt proident Lorem sunt dolor excepteur ipsum. Ut id labore cupidatat magna. Ex Lorem ex id aliqua proident reprehenderit sunt in dolore magna occaecat ut tempor et. Mollit qui sunt officia qui in incididunt nostrud consectetur occaecat enim incididunt ipsum aute sint. Consectetur Lorem incididunt ad nisi.</p>",
          "<ol><li>Pariatur mollit ex consequat pariatur.</li><li>Velit tempor minim elit enim commodo velit duis et nostrud quis velit laboris mollit.</li></ol>",
        ].join("\n"),
      },
      {
        type: "gallery",
        images: [
          {
            original:
              "https://d1qr34qzhiwpdo.cloudfront.net/articles/galleries/image_190717_012150.jpeg?mtime=20190717112150",
            thumbnail:
              "https://d1qr34qzhiwpdo.cloudfront.net/articles/galleries/_galleryThumbnail/7783/image_190717_012150.jpg?mtime=20190717112150",
            full: "https://d1qr34qzhiwpdo.cloudfront.net/articles/galleries/_galleryFull/7783/image_190717_012150.jpg?mtime=20190717112150",
          },
          {
            original:
              "https://d1qr34qzhiwpdo.cloudfront.net/articles/galleries/image_190717_012147.jpeg",
            thumbnail:
              "https://d1qr34qzhiwpdo.cloudfront.net/articles/galleries/_galleryThumbnail/7780/image_190717_012147.jpg",
            full: "https://d1qr34qzhiwpdo.cloudfront.net/articles/galleries/_galleryFull/7780/image_190717_012147.jpg",
          },
        ],
        description: null,
      },
    ],
  },
];

export const mockNewsArticles = mockNewsArticlesJson.map((a) =>
  NewsArticle.unserialize(a),
);
export const mockNewsArticlePreviews = mockNewsArticlesJson.map((a) =>
  ArticlePreview.unserialize(a),
);
