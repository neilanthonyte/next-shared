export const locationDetails = () => `
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
            Where to find us
        </td>
      </tr>
      <tr>
        <td class="mcnTextContent"
          style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #FFFFFF;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size: 22px;line-height: 125%;text-align: center;"
          valign="top">

          <div style="text-align: center;font-size:16px;">
            <div>
            </h3>
              <font face="arial, helvetica neue, helvetica, sans-serif" color="#000000">
                <!-- {{ #locationName }} -->
                  <strong>Clinic:</strong> Next Practice {{ locationName }}<br>
                <!-- {{ /locationName }} -->
                <!-- {{ #locationAddress }} -->
                  <strong>Address:</strong> {{ locationAddress.streetAddress }}, {{ locationAddress.suburb }}, {{ locationAddress.state }} {{ locationAddress.postcode }}<br>
                <!-- {{ /locationAddress }} -->
                <!-- {{ #locationContactPhone }} -->
                  <strong>Phone:</strong> {{ locationContactPhone }}<br>
                <!-- {{ /locationContactPhone }} -->
                <strong>Appointment fees:</strong> Check the fees page of the website<br><br>
                <em>If you are feeling unwell please contact the clinic to reschedule to Telehealth or cancel your appointment.</em><br>
                <!-- {{ #locationAppointmentMessage}} -->
                <br>
                <strong>Before you arrive</strong><br>
                {{locationAppointmentMessage}}<br>
                <!-- {{ /locationAppointmentMessage}} -->
                <!-- {{ #practitionerAppointmentMessage}} -->
                <br>
                <strong>When visiting {{ practitionerName }}</strong><br>
                {{practitionerAppointmentMessage}}<br>
                <!-- {{ /practitionerAppointmentMessage}} -->
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
