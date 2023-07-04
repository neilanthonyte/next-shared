export interface IPagination {
  pageIndex?: number;
  pageCount?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

/**
 * @param {any[]} list
 * @param {IPagination} pagination
 */
export interface IPaginated<IModel = any> {
  // TODO: Convert all IPaginated usages to accept the Model interface as an argument for better typing
  list?: IModel[];
  pagination?: IPagination;
}
