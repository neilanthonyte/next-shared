export interface IInputSuggestion {
  /**
   * A string that services will understand what to do with.
   *
   * @example
   * name="articleAuthors"
   */
  name: string;
}

export interface IInputSuggestionWithData extends IInputSuggestion {
  data: any;
}

export interface ISuggestionsValidationResponse {
  valid: boolean;
  errorMessage?: string;
}
