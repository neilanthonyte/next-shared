import { ArticlePreview, IOpsArticle, OpsArticle } from "../models/Article";

const mockOpsArticlesJson: IOpsArticle[] = [
  {
    type: "standard",
    slug: "opening",
    title: "Opening",
    description: "Detail of daily tasks",
    posterImage:
      "https://dph95f73vdxmz.cloudfront.net/uploads/ops/articles/_opsArticlePoster/Staff-Manager-Employee-Review-5-min-cropped-2.jpg",
    previewImage:
      "https://www.zambrero.com.au/index.php?p=actions/assets/generate-transform&transformId=227",
    category: "Foo",
    isCommon: true,
    content: [
      {
        type: "heading",
        content: "Get up to speed with daily Admin and Communication",
        anchorId: "6785",
      },
      {
        type: "text",
        content:
          "<ul><li>Check communications book   </li><li>Emails for messages, orders\n  </li><li>Zam News comms\n  </li><li>Check issues from the previous day in app\n</li></ul>",
      },
      {
        type: "heading",
        content: "Prepare equipment for service",
        anchorId: "6787",
      },
      {
        type: "text",
        content:
          "<ul><li>Fill up back up bain marie with hot water to the correct water level, and turn on set at 80 degrees</li><li>Turn on FOH equipment - Greta cold section   </li><li>Tortilla press - (220)\n  </li><li>Quesadilla press\n  </li><li>Salamander\n  </li><li>Turn on FOH equipment - Greta hot section (detail on when)\n</li></ul>",
      },
      {
        type: "heading",
        content: "Perform temperature checks and maintain food safety",
        anchorId: "6789",
      },
      {
        type: "text",
        content:
          "<ul><li>Compete Food Safety Temperatures Cool room digital\n  </li><li>Compete Food Safety Temperatures Sour Cream\n  </li><li>Check date &amp; time stickers on all back up toppings\n  </li><li>Check date &amp; time stickers on all thawed items\n  </li><li>Check stock of sauce bottles ensure all have day dot stickers\n  </li><li>Vacuum seal all hot products (fillings) from last night's trade\n  </li><li>Reheat in Esmeralda\n  </li><li>Complete cooking temperatures in Food Safety Product Section\n  </li><li>Compete Food Safety Holding Temperatures Greta/Bain and back up bain marie (1 hour after placement) (Hot and cold)\n</li></ul>",
      },
      {
        type: "heading",
        content: "Perform lunch prep in accordance to build to guide recipes",
        anchorId: "6791",
      },
      {
        type: "text",
        content:
          "<p>Prepare Toppings (cold ingredients)</p>\n<ul><li>Prepare Sauces\n  </li><li>Heat up all additional hot products (fillings &amp; bases)\n</li></ul>",
      },
      {
        type: "heading",
        anchorId: "display-setup",
        content:
          "Display and product, packaging for service in accordance with planogram",
      },
      {
        type: "text",
        content:
          "<p>Set up the hot products (fillings)</p>\n<ul><li>Set up Press Area including tortillas foil, packaging &amp; gloves\n  </li><li>Place backups under Greta for including black rice tortilla and vegan products\n  </li><li>Check taco shells available in airtight container in accordance with build to guide\n  </li><li>Prepare corn chip trays for nachos and kid’s nachos in accordance with build to guide\n</li></ul>",
      },
    ],
  },
  {
    type: "standard",
    slug: "equipment-and-safe-operating-procedures",
    title: "B. Equipment and safe operating procedures",
    description:
      "This section contains important information on safe operating procedures of equipment",
    posterImage:
      "https://dph95f73vdxmz.cloudfront.net/uploads/ops/articles/_opsArticlePoster/6219/1088854-min.jpg",
    previewImage:
      "https://www.zambrero.com.au/index.php?p=actions/assets/generate-transform&transformId=272",
    category: "Foo",
    isCommon: false,
    content: [
      {
        type: "heading",
        content: "Introduction",
        anchorId: "6697",
      },
      {
        type: "text",
        content:
          "<p>Before using any piece of equipment, ensure you have read and understood the following safe operating procedures.</p>\n<p>Equipment Safe Operating Procedures can be downloaded below.</p>",
      },
      {
        type: "resource",
        anchorId: "resource",
        title: "Equipment Safe Operating Procedures",
        description: "Equipment Safe Operating Procedures",
        assetUrl:
          "https://dph95f73vdxmz.cloudfront.net/uploads/ops/resources/Equipment-Safe-Operating-Procedures-V1-15OCT18.pdf",
      },
    ],
  },
  {
    type: "standard",
    slug: "food-safety-1",
    title: "B. Food Safety",
    description:
      "Food safety is an interactive section that documents daily controls of food safety hazards associated with food handling activities of your restaurant and forms an integral part of the Zambrero Food Safety Program in line with standards in the Australia New Zealand Food Standards Code.  Activities include daily food safety records, product holding temperatures, shelf life monitoring and temperature log reporting, product receival and function for corrective action, records and issue resolution.",
    posterImage:
      "https://dph95f73vdxmz.cloudfront.net/uploads/ops/articles/_opsArticlePoster/6606/Thermometre.jpg",
    previewImage:
      "https://www.zambrero.com.au/index.php?p=actions/assets/generate-transform&transformId=366",
    category: "Bar",
    isCommon: true,
    content: [
      {
        type: "heading",
        content: "Complete holding temperatures - coolroom",
        anchorId: "6608",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "cQP9NP6lgzs",
      },
      {
        type: "text",
        content:
          "<p>Go to Holding Temperature:</p>\n<ul><li>Step 1: Select equipment</li><li>Step 2: Select temperature entry box</li><li>Step 3: Enter temperature</li></ul><p>Correct digital and internal product temperature must be below 5°C</p>",
      },
      {
        type: "heading",
        content: "Complete cooking temperatures",
        anchorId: "6612",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "9CJ0PoGS2F4",
      },
      {
        type: "text",
        content:
          "<p>Go to Product:</p>\n<ul><li>Step 1: Select hot product</li><li>Step 2: Select new batch</li><li>Step 3: Enter the destination where the product will be held</li><li>Step 4: Enter the internal temperature of the product</li><li>Step 5: Select Create batch</li></ul><p>Correct temperature of a reheated product must be above 75°C</p>",
      },
      {
        type: "heading",
        content: "Complete equipment temperatures - hot section",
        anchorId: "6615",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "_1r7BsCpufw",
      },
      {
        type: "text",
        content:
          "<p>Go to Holding Temperature:</p>\n<ul><li>Step 1: Select equipment</li><li>Step 2: Select temperature entry box</li><li>Step 3: Enter temperature</li></ul><p>Correct temperature setting for hot holding equipment is 80°C</p>\n<p>Correct temperature setting for presses is 220°C<br /></p>\n<p>Correct temperature setting for taco warmer is 50°C<br /></p>",
      },
      {
        type: "heading",
        content: "Complete holding temperatures - Greta hot section",
        anchorId: "6620",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "Lu5GXxAxPCM",
      },
      {
        type: "text",
        content:
          "<p>Go to Holding Temperature:</p>\n<ul><li>Step 1: Select greta hot section</li><li>Step 2: Select temperature entry box</li><li>Step 3: Enter temperature</li></ul><p>Correct temperature on digital display is 80°C</p>\n<p>Correct internal temperature setting for products must be above 60°C</p>",
      },
      {
        type: "heading",
        content: "Complete holding temperatures - Greta cold section",
        anchorId: "6624",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "xTTETiSiqmQ",
      },
      {
        type: "text",
        content:
          "<p>Go to Holding Temperature:</p>\n<ul><li>Step 1: Select greta hot section</li><li>Step 2: Select temperature entry box</li><li>Step 3: Enter temperature</li></ul><p>Correct digital and internal product temperature must be below 5°C</p>",
      },
      {
        type: "heading",
        content: "Complete delivery acceptance",
        anchorId: "6628",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "LyoWbPYam48",
      },
      {
        type: "text",
        content:
          "<p>Go to Deliveries:</p>\n<ul><li>Step 1: Select new delivery</li><li>Step 2: FIll in required information</li><li>Step 3: Select insert</li></ul><p>Same day submitted deliveries can be viewed by scrolling down </p>",
      },
    ],
  },
  {
    type: "standard",
    slug: "a-daily-tasks",
    title: "A. Tasks",
    description:
      "Tasks help you manage the priorities and workflow of operational activities in the restaurant each day and throughout each year. Completed tasks are recorded with live progress to help you keep on top of your restaurants activities and ensure they are completed on time. Tasks offer quick reference to the Guides section for instruction and the ability to report problems for escalation or action.",
    posterImage:
      "https://dph95f73vdxmz.cloudfront.net/uploads/ops/articles/_opsArticlePoster/6563/Task_Poster_Image.jpg",
    previewImage:
      "https://www.zambrero.com.au/index.php?p=actions/assets/generate-transform&transformId=354",
    category: "Foo",
    isCommon: true,
    content: [
      {
        type: "heading",
        content: "Completing Tasks",
        anchorId: "6559",
      },
      {
        type: "video",
        videoProvider: "youtube",
        videoId: "kzlC8HxNEGs",
      },
      {
        type: "heading",
        content: "Confirm Tasks from Previous Day",
        anchorId: "6533",
      },
      {
        type: "text",
        content:
          "<p>Step 1: Select current time period</p>\n<p>Step 2: Press the task on the tick</p>\n<p>The completed task will disappear and category progress will be updated</p>",
      },
      {
        type: "text",
        content:
          '<figure><img src="https://dph95f73vdxmz.cloudfront.net/uploads/ops/articles/Task_Resource_004.png" alt="" /></figure>',
      },
    ],
  },
];

export const mockOpsArticles = mockOpsArticlesJson.map((a) =>
  OpsArticle.unserialize(a),
);
export const mockOpsArticlePreviews = mockOpsArticlesJson.map((a) =>
  ArticlePreview.unserialize(a),
);
