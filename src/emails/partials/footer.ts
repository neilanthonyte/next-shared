export const footer = (showSubscribe: boolean = false) => {
  const genericFooter = `
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock"
  style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
  <tbody class="mcnFollowBlockOuter">
    <tr>
      <td align="center" valign="top"
        style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
        class="mcnFollowBlockInner">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer"
          style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          <tbody>
            <tr>
              <td align="center"
                style="padding-left: 9px;padding-right: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                  style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                  class="mcnFollowContent">
                  <tbody>
                    <tr>
                      <td align="center" valign="top"
                        style="padding-top: 9px;padding-right: 9px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                          <tbody>
                            <tr>  
                              <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;">
                                Copyright&nbsp;© Next Practice 2020<br>All rights reserved
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

      </td>
    </tr>
  </tbody>
</table>`;

  const subscribe = `
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
  style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
  <tbody class="mcnTextBlockOuter">
    <tr>
      <td valign="top" class="mcnTextBlockInner"
        style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <!--[if mso]>
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
      <tr>
      <![endif]-->
        <!--[if mso]>
      <td valign="top" width="600" style="width:600px;">
      <![endif]-->
        <table align="left" border="0" cellpadding="0" cellspacing="0"
          style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
          width="100%" class="mcnTextContentContainer">
          <tbody>
            <tr>

              <td valign="top" class="mcnTextContent"
                style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #FFFFFF;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;">

                <em>Copyright ©Next Practice2020 | All rights reserved.</em><br>
                Want to change how you receive these emails?<br>
                You can <a href="*|UPDATE_PROFILE|*"
                  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #FFFFFF;font-weight: normal;text-decoration: underline;">update
                  your preferences</a> or <a href="*|UNSUB|*"
                  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #FFFFFF;font-weight: normal;text-decoration: underline;">unsubscribe
                  from this list</a>.<br>
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]>
      </td>
      <![endif]-->

        <!--[if mso]>
      </tr>
      </table>
      <![endif]-->
      </td>
    </tr>
  </tbody>
</table>`;
  return `${genericFooter} ${showSubscribe ? subscribe : ""}`;
};

const socialIcons = () => `
<table align="center" border="0" cellpadding="0" cellspacing="0"
  style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
  <tbody>
    <tr>
      <td align="center" valign="top"
        style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <!--[if mso]>
          <table align="center" border="0" cellspacing="0" cellpadding="0">
          <tr>
          <![endif]-->

        <!--[if mso]>
              <td align="center" valign="top">
              <![endif]-->


        <table align="left" border="0" cellpadding="0" cellspacing="0"
          style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          <tbody>
            <tr>
              <td valign="top"
                style="padding-right: 10px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                class="mcnFollowContentItemContainer">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                  class="mcnFollowContentItem"
                  style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <tbody>
                    <tr>
                      <td align="left" valign="middle"
                        style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0"
                          width=""
                          style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <tbody>
                            <tr>

                              <td align="center" valign="middle" width="24"
                                class="mcnFollowIconContent"
                                style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <a href="https://www.facebook.com/NextPracticeErina/"
                                  target="_blank"
                                  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img
                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-facebook-48.png"
                                    alt="Facebook"
                                    style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                                    height="24" width="24" class=""></a>
                              </td>


                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <!--[if mso]>
              </td>
              <![endif]-->

        <!--[if mso]>
              <td align="center" valign="top">
              <![endif]-->


        <table align="left" border="0" cellpadding="0" cellspacing="0"
          style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          <tbody>
            <tr>
              <td valign="top"
                style="padding-right: 0;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                class="mcnFollowContentItemContainer">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                  class="mcnFollowContentItem"
                  style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <tbody>
                    <tr>
                      <td align="left" valign="middle"
                        style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0"
                          width=""
                          style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <tbody>
                            <tr>

                              <td align="center" valign="middle" width="24"
                                class="mcnFollowIconContent"
                                style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <a href="https://nextpracticehealth.com/locations/nsw-erina"
                                  target="_blank"
                                  style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img
                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-link-48.png"
                                    alt="Website"
                                    style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                                    height="24" width="24" class=""></a>
                              </td>


                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <!--[if mso]>
              </td>
              <![endif]-->

        <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
      </td>
    </tr>
  </tbody>
</table>`;
