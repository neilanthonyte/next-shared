import { TColorVariants } from "../types/TColorVariants";

export const checklistGradeToColor = (grade: string): TColorVariants => {
  switch (grade) {
    case "A":
      return TColorVariants.Success;
      break;
    case "B":
      return TColorVariants.Warning;
      break;
    // case "C":
    //   return TColorVariants.Danger;
    //   break;
    // case "F":
    //   return TColorVariants.Danger;
    //   break;
  }
  return TColorVariants.Danger;
};
