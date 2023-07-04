import * as _ from "lodash";

/**
 * Adds formatting to the supplied note(s).
 * @param note the note or notes to format.
 * @param useHtml optional: adds HTML formatting if true, otherwise uses plain text (default is true)
 * @param indentCount optional: how far the note should be indented (each indent is 2 spaces)
 */
export const noteToFormattedStr = (
  note: any | any[],
  useHtml = true,
  indentCount = 0,
): string => {
  if (!Array.isArray(note)) {
    return noteToFormattedStr([note], useHtml);
  }

  const indent = useHtml ? "&nbsp;&nbsp;" : "  ";
  const lineBreak = useHtml ? "<br/>" : "\n";
  const emphasise = useHtml
    ? (s: string) => `<strong>${s}</strong>`
    : (s: string) => s;

  let output: string = "";
  note.forEach((n) => {
    if (n === null) {
      return;
    }

    const indentSpaces = _.repeat(indent, indentCount);
    const isGroup = _.isArray(n.value);

    if (n.value === true) {
      n.value = "Yes";
    }
    if (n.value === false) {
      n.value = "No";
    }
    if (_.isArray(n)) {
      output += noteToFormattedStr(n, useHtml, indentCount + 1);
      return output;
    }
    output += indentSpaces;
    if (n.label) {
      const label = _.endsWith(n.label, "?") ? n.label : `${n.label}:`;
      output += emphasise(label);
    }
    if (isGroup) {
      if (n.label) {
        output += lineBreak;
      }
      output += noteToFormattedStr(n.value, useHtml, indentCount + 1);
    } else {
      output += ` ${n.value}${lineBreak}`;
    }
  });

  return output;
};
