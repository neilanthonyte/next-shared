export const dualImages = (imageOneUrl: string, imageTwoUrl: string) => `
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageGroupBlock"
    style="
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      padding-top: 10px;">
  <tbody class="mcnImageGroupBlockOuter">

    <tr>
      <td valign="top"
        style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
        class="mcnImageGroupBlockInner">

        <table align="left" width="273" border="0" cellpadding="0" cellspacing="0" class="mcnImageGroupContentContainer"
          style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          <tbody>
            <tr>
              <td class="mcnImageGroupContent" valign="top"
                style="padding-left: 9px;padding-top: 0;padding-bottom: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">


                <img alt="" src="${imageOneUrl}" width="264"
                  style="max-width: 4970px;padding-bottom: 0;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;vertical-align: bottom;"
                  class="mcnImage">


              </td>
            </tr>
          </tbody>
        </table>

        <table align="right" width="273" border="0" cellpadding="0" cellspacing="0"
          class="mcnImageGroupContentContainer"
          style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          <tbody>
            <tr>
              <td class="mcnImageGroupContent" valign="top"
                style="padding-right: 9px;padding-top: 0;padding-bottom: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">


                <img alt="" src="${imageTwoUrl}" width="264"
                  style="max-width: 4574px;padding-bottom: 0;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;vertical-align: bottom;"
                  class="mcnImage">


              </td>
            </tr>
          </tbody>
        </table>

      </td>
    </tr>

  </tbody>
</table>`;
