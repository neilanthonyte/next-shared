export enum TLayoutDirections {
  Row = "row",
  Column = "column",
}

export enum THorizontalPositions {
  Left = "left",
  Center = "center",
  Right = "right",
}

export enum ELayoutVariant {
  Standard = "standard",
  Compact = "compact",
}

// to be used with complex inputs rendering sub options
// e.g. calendar input:
// standard will show the input which will show a calendar picker on click
// inline will show the calendar picker without input
export enum EInputLayout {
  Standard = "standard",
  Inline = "inline",
}
