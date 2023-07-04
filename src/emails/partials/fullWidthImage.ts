export interface IFullWidthImage {
  imageUrl: string;
  linkToUrl?: string;
}

export const fullWidthImage = ({ imageUrl, linkToUrl }: IFullWidthImage) => {
  const imageHtml = linkToUrl
    ? `<a href="${linkToUrl}" target="_blank">
          <img alt=""
          src="${imageUrl}"
          style="max-width: 5000px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
          class="mcnImage" width="564" align="middle">
        </a>`
    : `<img alt=""
        src="${imageUrl}"
        style="max-width: 5000px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
        class="mcnImage" width="564" align="middle">`;

  return `
<table class="mcnImageBlock" style="
    min-width: 100%;
    border-collapse: collapse;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;"
  width="100%" cellspacing="0" cellpadding="0" border="0">
  <tbody class="mcnImageBlockOuter">
    <tr>
      <td class="mcnImageBlockInner" valign="top" style="
          mso-line-height-rule: exactly;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;">
        <table class="mcnImageContentContainer"
          style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
          <tbody>
            <tr>
              <td class="mcnImageContent"
                style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                valign="top">
                ${imageHtml}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
};
