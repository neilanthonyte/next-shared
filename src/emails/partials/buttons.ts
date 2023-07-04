export interface IButton {
  label: string;
  // the template field to show
  fieldName?: string;
  url: string;
  variant?: "primary" | "secondary";
}

const getBaseButtonHtml = (b: IButton) => `<tr>
<td align="center" valign="middle" class="mcnButtonContent"
  style="
    font-family: Arial;
    font-size: 16px;
    mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    padding-bottom: 5px;">
  <a class="mcnButton " title="Complete your appointment details"
    href="${b.url}"
    target="_self"
    style="
      background-color: ${b.variant === "primary" ? "#006F63" : "#fff"};
      color: ${b.variant === "primary" ? "#fff" : "#006F63"};
      border-radius: 6px;
      border: 2px solid #006F63;
      padding: 18px;
      font-weight: bold;
      letter-spacing: normal;
      line-height: 100%;
      text-align: center;
      text-decoration: none;
      mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      display: block;">${b.label}</a>
</td>
</tr>`;

export const buttons = (buttons: IButton[]) => {
  const buttonsHtml = buttons.map((b) =>
    b.fieldName
      ? `<!-- {{ #${b.fieldName} }} -->
          ${getBaseButtonHtml(b)}
         <!-- {{ /${b.fieldName} }} -->`
      : getBaseButtonHtml(b),
  );

  return `
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock"
  style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
  <tbody class="mcnButtonBlockOuter">
    <tr>
      <td
        style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
        valign="top" align="center" class="mcnButtonBlockInner">
        <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer"
          style="
            border-collapse: separate !important;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;">
          <tbody>
            ${buttonsHtml.join("")}
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
};
