export type TBlogTarget = "foyer" | "companion" | "locationBlog" | "globalBlog";

/**
 * Examples:
 *
 * Network blog:
 *  location = none
 *  target = globalBlog
 *  shared = true
 *
 * Manager editor:
 *  location = current location
 *  target = none
 *  shared = no (only location articles)
 *
 * Foyer:
 *  location = current location
 *  target = foyer
 *  shared = true
 *
 * Broken: (no location, no shared - so nothing?)
 *  location = none
 *  target = none
 *  shared = false
 */
export interface IBlogFilter {
  // an article can be limited to only show on a particular target, e.g. companion
  target?: TBlogTarget;
  // should the shared global articles be shown?
  includeShared?: boolean;
  // should it be limited to a specific location
  locationSlug?: string;
}
