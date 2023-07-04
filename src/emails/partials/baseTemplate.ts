import { baseRow } from "./baseRow";
import { footer } from "./footer";

export const baseTemplate = (body: string[]) => `
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!-- NAME: SALE ANNOUNCEMENT -->
  <!--[if gte mso 15]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <style type="text/css">
    p {
      margin: 10px 0;
      padding: 0;
    }

    table {
      border-collapse: collapse;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      display: block;
      margin: 0;
      padding: 0;
    }

    img,
    a img {
      border: 0;
      height: auto;
      outline: none;
      text-decoration: none;
    }

    body,
    #bodyTable,
    #bodyCell {
      height: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .mcnPreviewText {
      display: none !important;
    }

    #outlook a {
      padding: 0;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    table {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    p,
    a,
    li,
    td,
    blockquote {
      mso-line-height-rule: exactly;
    }

    a[href^="tel"],
    a[href^="sms"] {
      color: inherit;
      cursor: default;
      text-decoration: none;
    }

    p,
    a,
    li,
    td,
    body,
    table,
    blockquote {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    #bodyCell {
      padding: 10px;
    }

    .templateContainer {
      max-width: 600px !important;
    }

    a.mcnButton {
      display: block;
    }

    .mcnImage,
    .mcnRetinaImage {
      vertical-align: bottom;
    }

    .mcnTextContent {
      word-break: break-word;
    }

    .mcnTextContent img {
      height: auto !important;
    }

    .mcnDividerBlock {
      table-layout: fixed !important;
    }

    body,
    #bodyTable {
      background-color: #ffffff;
    }

    #bodyCell {
      border-top: 0;
    }

    .templateContainer {
      border: 0;
    }

    h1 {
      color: #ffffff;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 60px;
      font-style: normal;
      font-weight: bold;
      line-height: 125%;
      letter-spacing: normal;
      text-align: center;
    }

    h2 {
      color: #202020;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 22px;
      font-style: normal;
      font-weight: bold;
      line-height: 125%;
      letter-spacing: normal;
      text-align: center;
    }

    h3 {
      color: #606060;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: normal;
      line-height: 125%;
      letter-spacing: normal;
      text-align: center;
    }

    h4 {
      color: #202020;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: bold;
      line-height: 125%;
      letter-spacing: normal;
      text-align: center;
    }

    #templatePreheader {
      background-color: #006e63;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
    }

    #templatePreheader .mcnTextContent,
    #templatePreheader .mcnTextContent p {
      color: #606060;
      font-family: Helvetica;
      font-size: 12px;
      line-height: 100%;
      text-align: left;
    }

    #templatePreheader .mcnTextContent a,
    #templatePreheader .mcnTextContent p a {
      color: #606060;
      font-weight: normal;
      text-decoration: underline;
    }

    #templateHeader {
      background-color: #transparent;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 9px;
      padding-bottom: 9px;
    }

    #templateHeader .mcnTextContent,
    #templateHeader .mcnTextContent p {
      color: #ffffff;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 22px;
      line-height: 125%;
      text-align: center;
    }

    #templateHeader .mcnTextContent a,
    #templateHeader .mcnTextContent p a {
      color: #ffffff;
      font-weight: normal;
      text-decoration: underline;
    }

    #templateBody {
      background-color: #ffffff;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 9px;
      padding-bottom: 9px;
    }

    #templateBody .mcnTextContent,
    #templateBody .mcnTextContent p {
      color: #606060;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 16px;
      line-height: 150%;
      text-align: left;
    }

    #templateBody .mcnTextContent a,
    #templateBody .mcnTextContent p a {
      color: #82a4a6;
      font-weight: normal;
      text-decoration: underline;
    }

    #templateColumns {
      background-color: #ffffff;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 0;
      padding-bottom: 40px;
    }

    #templateColumns .columnContainer .mcnTextContent,
    #templateColumns .columnContainer .mcnTextContent p {
      color: #606060;
      font-family: Georgia;
      font-size: 16px;
      line-height: 150%;
      text-align: left;
    }

    #templateColumns .columnContainer .mcnTextContent a,
    #templateColumns .columnContainer .mcnTextContent p a {
      color: #82a4a6;
      font-weight: normal;
      text-decoration: underline;
    }

    #templateFooter {
      background-color: #006e63;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 30px;
      padding-bottom: 30px;
    }

    #templateFooter .mcnTextContent,
    #templateFooter .mcnTextContent p {
      color: #ffffff;
      font-family: Helvetica;
      font-size: 12px;
      line-height: 150%;
      text-align: center;
    }

    #templateFooter .mcnTextContent a,
    #templateFooter .mcnTextContent p a {
      color: #ffffff;
      font-weight: normal;
      text-decoration: underline;
    }

    @media only screen and (min-width: 768px) {
      .templateContainer {
        width: 600px !important;
      }
    }

    @media only screen and (max-width: 480px) {

      body,
      table,
      td,
      p,
      a,
      li,
      blockquote {
        -webkit-text-size-adjust: none !important;
      }
    }

    @media only screen and (max-width: 480px) {
      body {
        width: 100% !important;
        min-width: 100% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      #bodyCell {
        padding-top: 10px !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .columnWrapper {
        max-width: 100% !important;
        width: 100% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcnRetinaImage {
        max-width: 100% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcnImage {
        width: 100% !important;
      }
    }

    @media only screen and (max-width: 480px) {

      .mcnCartContainer,
      .mcnCaptionTopContent,
      .mcnRecContentContainer,
      .mcnCaptionBottomContent,
      .mcnTextContentContainer,
      .mcnBoxedTextContentContainer,
      .mcnImageGroupContentContainer,
      .mcnCaptionLeftTextContentContainer,
      .mcnCaptionRightTextContentContainer,
      .mcnCaptionLeftImageContentContainer,
      .mcnCaptionRightImageContentContainer,
      .mcnImageCardLeftTextContentContainer,
      .mcnImageCardRightTextContentContainer,
      .mcnImageCardLeftImageContentContainer,
      .mcnImageCardRightImageContentContainer {
        max-width: 100% !important;
        width: 100% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcnBoxedTextContentContainer {
        min-width: 100% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcnImageGroupContent {
        padding: 9px !important;
      }
    }

    @media only screen and (max-width: 480px) {

      .mcnCaptionLeftContentOuter .mcnTextContent,
      .mcnCaptionRightContentOuter .mcnTextContent {
        padding-top: 9px !important;
      }
    }

    @media only screen and (max-width: 480px) {

      .mcnImageCardTopImageContent,
      .mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,
      .mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent {
        padding-top: 18px !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcnImageCardBottomImageContent {
        padding-bottom: 9px !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcnImageGroupBlockInner {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcnImageGroupBlockOuter {
        padding-top: 9px !important;
        padding-bottom: 9px !important;
      }
    }

    @media only screen and (max-width: 480px) {

      .mcnTextContent,
      .mcnBoxedTextContentColumn {
        padding-right: 18px !important;
        padding-left: 18px !important;
      }
    }

    @media only screen and (max-width: 480px) {

      .mcnImageCardLeftImageContent,
      .mcnImageCardRightImageContent {
        padding-right: 18px !important;
        padding-bottom: 0 !important;
        padding-left: 18px !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .mcpreview-image-uploader {
        display: none !important;
        width: 100% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      h1 {
        font-size: 30px !important;
        line-height: 125% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      h2 {
        font-size: 20px !important;
        line-height: 125% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      h3 {
        font-size: 16px !important;
        line-height: 125% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      h4 {
        font-size: 16px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width: 480px) {

      .mcnBoxedTextContentContainer .mcnTextContent,
      .mcnBoxedTextContentContainer .mcnTextContent p {
        font-size: 14px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width: 480px) {
      #templatePreheader {
        display: block !important;
      }
    }

    @media only screen and (max-width: 480px) {

      #templatePreheader .mcnTextContent,
      #templatePreheader .mcnTextContent p {
        font-size: 14px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width: 480px) {

      #templateHeader .mcnTextContent,
      #templateHeader .mcnTextContent p {
        font-size: 16px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width: 480px) {

      #templateBody .mcnTextContent,
      #templateBody .mcnTextContent p {
        font-size: 16px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width: 480px) {

      #templateColumns .columnContainer .mcnTextContent,
      #templateColumns .columnContainer .mcnTextContent p {
        font-size: 16px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width: 480px) {

      #templateFooter .mcnTextContent,
      #templateFooter .mcnTextContent p {
        font-size: 14px !important;
        line-height: 150% !important;
      }
    }
  </style>
</head>

<body style="
      height: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      background-color: #ffffff;
    ">
  <center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #ffffff;
        ">
      <tbody>
        <tr>
          <td align="center" valign="top" id="bodyCell" style="
                mso-line-height-rule: exactly;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                height: 100%;
                margin: 0;
                padding: 10px;
                width: 100%;
                border-top: 0;
              ">
            <!-- BEGIN TEMPLATE // -->
            <!--[if (gte mso 9)|(IE)]>
						<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
						<tr>
						<td align="center" valign="top" width="600" style="width:600px;">
						<![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%;
                  border: 0;
                  max-width: 600px !important;
                ">
              <tbody>
                ${(body || []).join("\n")}
                ${baseRow(footer(), {
                  id: "templateFooter",
                  variant: "primary",
                })}
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]>
						</td>
						</tr>
						</table>
						<![endif]-->
            <!-- // END TEMPLATE -->
          </td>
        </tr>
      </tbody>
    </table>
  </center>
  <script type="text/javascript" src="/4Ekfl9qF3cEXkSiXag/iYSOtJzrhEuu/CjgEQVEoKw8/aD/hOeAgOEFo"></script>
</body>
</html>`;
