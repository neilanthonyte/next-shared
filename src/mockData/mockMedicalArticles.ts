import moment from "moment";
import {
  ArticlePreview,
  IMedicalArticle,
  MedicalArticle,
} from "../models/Article";

export const mockMedicalArticlesJson: IMedicalArticle[] = [
  {
    slug: "top-tips-for-a-healthy-home",
    title: "Top Tips for a Healthy Home",
    type: "standard",
    description:
      "Healthy homes are critical to our health. This environment and its occupants can be affected by the use of chemicals, excessive moisture and the development of mould, the proximity to electromagnetic fields or radiations, the absence of water filters, as examples.",
    posterImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/medical-articles/posters/_largeHeroHeader/sydney-rae-ho4lBWWD4nc-unsplash.jpg?mtime=20190626114220",
    previewImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/medical-articles/posters/_largeHeroHeader/sydney-rae-ho4lBWWD4nc-unsplash.jpg?mtime=20190626114220",
    category: "General",
    content: [
      {
        type: "text",
        content:
          "<p>For a complete brief on the topic, read Nicole Bijlsma's Book, Healthy Home Healthy Family, 3rd Edition. And if you want to get started, the sheet below provides a list of items you can review and implement in your home when relevant.</p>",
      },
      {
        type: "image",
        imageUrl:
          "https://d1qr34qzhiwpdo.cloudfront.net/medical-articles/content/_largeHeroHeader/7694/Building-Biology.jpg?mtime=20190626113714",
      },
    ],
    // visibility: {
    //   users: "public",
    //   location: ["nsw-edgecliff"],
    // },
  },
  {
    type: "standard",
    slug: "all-content-types",
    title: "All content types",
    description:
      "Quis dolore in veniam nulla pariatur cillum ea nulla voluptate magna dolore deserunt dolor duis deserunt duis commodo quis.",
    posterImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/medical-articles/posters/_previewCard/sample.jpg?mtime=20180630184040",
    previewImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/medical-articles/posters/_previewCard/sample.jpg?mtime=20180630184040",
    category: "General",
    content: [
      {
        type: "heading",
        content: "Text and stats",
      },
      {
        type: "anatomy",
        title: "Male Urinary System",
        // slug: "male-urinary-system",
        sceneName: "m=male_system_anatomy_urinary_whole",
        description:
          "The urinary system, also called the renal system, is responsible for filtering waste from the bloodstream and expelling it out of the body as urine. Parts of the urinary system include the kidneys, ureters, bladder, and urethra.",
        posterImage: null,
        placeholderImage: null,
        cameraPositions: {
          default: {
            position: {
              x: -7.68,
              y: 118.611,
              z: -41.815,
            },
            target: {
              x: -0.101,
              y: 104.442,
              z: 5.764,
            },
            up: {
              x: 0.044,
              y: 0.959,
              z: 0.279,
            },
          },
          primary: {
            position: {
              x: -2.077,
              y: 116.572,
              z: -40.942,
            },
            target: {
              x: 13.65,
              y: 104.731,
              z: 5.256,
            },
            up: {
              x: 0.076,
              y: 0.972,
              z: 0.223,
            },
          },
          secondary: {
            position: {
              x: 14.034,
              y: 116.572,
              z: -43.545,
            },
            target: {
              x: 13.65,
              y: 104.731,
              z: 5.256,
            },
            up: {
              x: -0.002,
              y: 0.972,
              z: 0.236,
            },
          },
        },
        // category: "",
      },
      {
        type: "text",
        content:
          "<p>Duis ea eu qui occaecat. Quis dolore in veniam nulla pariatur cillum ea nulla voluptate magna dolore deserunt dolor duis deserunt duis commodo quis.</p>",
      },
      {
        type: "number",
        value: 1000000,
        animation: "tallyUp",
        description:
          "Quis dolore in veniam nulla pariatur cillum ea nulla voluptate magna dolore deserunt dolor duis deserunt duis commodo quis.",
      },
      {
        type: "prevalence",
        populationSize: 20,
        proportion: 40,
        description: null,
      },
      {
        type: "heading",
        content: "Image and video",
      },
      {
        type: "image",
        imageUrl:
          "https://d1qr34qzhiwpdo.cloudfront.net/medical-articles/content/_largeHeroHeader/innovation.jpg?mtime=20180630184040",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "hY7m5jjJ9mM",
      },
    ],
    // relatedTo: {
    //   observations: ["bloodPressure", "weight"],
    // },
  },
  {
    slug: "foo-bar",
    title:
      "Sunt amet veniam eiusmod aute amet laboris amet enim eu ea nostrud ex adipisicing.",
    type: "standard",
    description:
      "Amet nostrud non magna consectetur cillum commodo ipsum cillum proident nostrud. Ullamco culpa pariatur excepteur sunt anim quis Lorem sit aliqua veniam anim minim. Lorem nostrud amet ex commodo. Do Lorem laboris elit ea eiusmod quis excepteur ipsum ad.",
    posterImage: "https://picsum.photos/400/200/",
    previewImage: "https://picsum.photos/400/200/",
    category: "General",
    postDate: moment().subtract(1, "week").unix(),
    content: [
      {
        type: "text",
        content:
          "<p>Ullamco minim laborum aliqua velit cillum. Fugiat ut adipisicing est incididunt sunt excepteur pariatur enim veniam officia culpa laborum adipisicing. Amet eiusmod ad reprehenderit dolor irure consequat enim ut exercitation cillum fugiat. Minim ad sunt anim Lorem veniam ullamco nisi ut ullamco Lorem.</p>",
      },
    ],
    // visibility: {
    //   users: "public",
    //   location: ["nsw-edgecliff"],
    // },
  },
  //   {
  //     slug: "example-1",
  //     url: "http://nextpracticehealth.local/articles/example-1",
  //     title: "Hi, I'm Bill",
  //     description:
  //       "Measles is a very contagious viral infection that can cause a rash and fever. In some cases, it can lead to hospitalisation and in severe circumstances, death. An increase in international measles cases means that travelers have the potential to spread the infection to unimmune members of our community.",
  //     posterImage: "http://www.fillmurray.com/400/400",
  //     category: null,
  //     authors: [],
  //     postDate: 1559718480,
  //     dateUpdated: 1559891954,
  //   },
];

export const mockMedicalArticles = mockMedicalArticlesJson.map((a) =>
  MedicalArticle.unserialize(a),
);
export const mockMedicalArticlePreviews = mockMedicalArticlesJson.map((a) =>
  ArticlePreview.unserialize(a),
);
