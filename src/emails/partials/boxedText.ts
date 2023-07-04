export const boxedText = (header?: string, subtitle?: string) => {
  header = header && subtitle ? `${header}<br/>` : header || "";
  subtitle = subtitle
    ? `<span style="font-size:14px">${subtitle.toUpperCase()}</span>`
    : "";

  return `
<!--[if gte mso 9]>
      <td align="center" valign="top" ">
      <![endif]-->
  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
    style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
    class="mcnBoxedTextContentContainer">
    <tbody>
      <tr>

        <td
          style="padding-top: 9px;padding-left: 18px;padding-bottom: 9px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">

          <table border="0" cellspacing="0" class="mcnTextContentContainer" width="100%"
            style="min-width: 100% !important;background-color: #006E63;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody>
              <tr>
                <td valign="top" class="mcnTextContent"
                  style="padding: 18px;color: #F2F2F2;font-family: Helvetica;font-size: 24px;font-style: normal;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 125%;">
                  ${header} ${subtitle}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if gte mso 9]>
  </td>
  <![endif]-->

<!--[if gte mso 9]>
          </tr>
          </table>
  <![endif]-->`;
};
