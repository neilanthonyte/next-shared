export const appointmentDetails = () => `
<!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
<tr>
<![endif]-->
  <!--[if mso]>
<td valign="top" width="600" style="width:600px;">
<![endif]-->
  <table
    style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
    class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
    <tbody>
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
            Your appointment details:
        </td>
      </tr>
      <tr>
        <td class="mcnTextContent"
          style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #FFFFFF;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size: 22px;line-height: 125%;text-align: center;"
          valign="top">

          <div style="text-align: center; font-size:16px">
            <div>
              <font face="arial, helvetica neue, helvetica, sans-serif" color="#000000">
                <strong>Booking for</strong>: {{ patientName }}<br>
                <strong>Date/Time:</strong> {{ time }}<br>
                <!-- SINGLE PROVIDER -->
                {{^multiHcp}}
                  <strong>Booking with</strong>: {{ practitionerName }}<br>
                {{/multiHcp}}
                <!-- MULTIPLE PROVIDERS -->
                {{ #multiHcp }} 
                  {{ #practitioners }}
                    <strong>Booking with</strong>: {{ name }} ({{ start }} - {{ end }})<br>
                  {{ /practitioners }}
                {{ /multiHcp }}
                <!-- {{ #appointmentType }} -->
                <strong>Appointment type</strong>: {{ appointmentType }}</span></font>
                <!-- {{ /appointmentType }} -->
              </font>
            </div>
          </div>

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
<![endif]-->`;
