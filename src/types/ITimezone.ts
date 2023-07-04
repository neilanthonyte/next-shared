export interface ITimezone {
  dstOffset: number;
  rawOffset: number;
  status: string;
  timeZoneId: string;
  timeZoneName: string;
}

/*
dstOffset: the offset for daylight-savings time in seconds. This will be zero if the time zone is not in Daylight Savings Time during the specified timestamp.
rawOffset: the offset from UTC (in seconds) for the given location. This does not take into effect daylight savings.
timeZoneId: a string containing the ID of the time zone, such as "America/Los_Angeles" or "Australia/Sydney". These IDs are defined by Unicode Common Locale Data Repository (CLDR) project, and currently available in file timezone.xml. When a timezone has several IDs, the canonical one is returned. In timezone.xml, this is the first alias of each timezone. For example, "Asia/Calcutta" is returned, not "Asia/Kolkata".
timeZoneName: a string containing the long form name of the time zone. This field will be localized if the language parameter is set. eg. "Pacific Daylight Time" or "Australian Eastern Daylight Time"
 */
