/**
 * This RegEx is used for doing a "like" match for finding Fhir extension url or Fhir identifier system
 * from next-connect. Next-connect in development environments can sometimes have different combination of URLs
 * like "connect.dev.aws.nextpracticeclinics.com" or "connect-octo-demo.nextpracticclinics.com"
 */
export const connectLikeUrlRegexTemplate = "(?<=connect)(.*)(<?.com)";
