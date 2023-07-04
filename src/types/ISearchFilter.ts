export interface ISearchFilter {
  title: string;
  options: {
    [key: string]: string;
  };
  value: string;
}
