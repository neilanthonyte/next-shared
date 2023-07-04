```
{{ patientName }}</h2>
Your appointment with {{practitionerName}} has been successfully booked for
{{time}}.

{{^multiHcp}}
{{practitionerName}}
{{/multiHcp}}

{{ #multiHcp }}
{{ #practitioners }}
{{ name }}<br /> {{ start }} - {{ end }}<br>
{{ /practitioners }}<br>
{{ /multiHcp }}

Next Practice {{ locationName }}</h3>
{{ locationAddress.streetAddress }}<br>
{{ locationAddress.suburb }}
{{ locationAddress.state }},
{{ locationAddress.postcode }}

<!-- {{ #manageAppointmentUrl }} -->
<!-- {{ /manageAppointmentUrl }} -->

<!-- {{ #telehealthUrl }} -->
<!-- {{ /telehealthUrl }} -->

<!-- {{ #cancelAppointmentUrl }} -->
<!-- {{ /cancelAppointmentUrl }} -->

<!-- {{ #payments }} -->
{{ description }}</td>
{{ amount }}</td>
<!-- {{ /payments }} -->

<!-- {{ #paymentsTotal }} -->
Total: {{ paymentsTotal }}</td>
<!-- {{ /paymentsTotal }} -->

<!-- {{ #patientAccessCode }} -->
<!-- {{ /patientAccessCode }} -->

<!-- {{ #locationAppointmentMessage}} -->
{{locationAppointmentMessage}}<br>
<!-- {{ /locationAppointmentMessage}} -->

<!-- {{ #practitionerAppointmentMessage}} -->
{{practitionerAppointmentMessage}}
<!-- {{ /practitionerAppointmentMessage}} -->
```
