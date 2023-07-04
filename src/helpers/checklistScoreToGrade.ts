export const checklistScoreToGrade = (score: number) => {
  let label: string = "-";
  if (score > 0.9) {
    label = "A";
  } else if (score > 0.8) {
    label = "B";
  } else if (score > 0.7) {
    label = "C";
  } else if (score > 0.6) {
    label = "D";
  } else {
    label = "F";
  }
  return label;
};
