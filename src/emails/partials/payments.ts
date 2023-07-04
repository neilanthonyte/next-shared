export const payments = () => `
<!-- {{ #paymentsTotal }} -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
  style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
  <tbody class="mcnTextBlockOuter">
    <tr>
      <td class="mcnTextContent"
        style="
            padding-top: 10px;
            padding-right: 18px;
            padding-bottom: 15px;
            padding-left: 18px;
            mso-line-height-rule: exactly;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            word-break: break-word;
            font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
            font-size: 22px;
            line-height: 125%;
            text-align: center;
            font-size: 30px;
            color: 006f63;"
            valign="top">
          Payment information
      </td>
    </tr>
  </tbody>
</table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock"
  style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
  <tbody class="mcnTextBlockOuter">
    <tr>
      <td valign="top" class="mcnTextBlockInner"
        style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <div style="padding:20px;">
          <table
            style="width: 100%;font-family: Helvetica;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <thead>
              <tr style="color:#0c5c50">
                <th style="text-align:left">Description</th>
                <th style="text-align:right">Charge</th>
              </tr>
            </thead>
            <tbody>
              <!-- {{ #payments }} -->
              <tr style="border-top:1px solid #ddd;border-bottom:1px solid #ddd;">
                <td
                  style="text-align: left;padding: 10px 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  {{ description }}</td>
                <td
                  style="text-align: right;padding: 10px 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  {{ amount }}</td>
              </tr>
              <!-- {{ /payments }} -->
              <tr style="border-top:1px solid #ddd;border-bottom:1px solid #ddd;">
                <td
                  style="text-align: left;padding: 10px 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                </td>
                <td
                  style="text-align: right;padding: 10px 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  Total: {{ paymentsTotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock"
  style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
  <tbody class="mcnTextBlockOuter">
    <tr>
      <td valign="top" class="mcnTextBlockInner"
        style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      </td>
    </tr>
  </tbody>
</table>
<!-- {{ /paymentsTotal }} -->`;
