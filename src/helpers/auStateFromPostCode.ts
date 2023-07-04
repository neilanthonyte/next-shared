// determine AU state based on postcode
// eg 2020 = NSW
export function auStateFromPostCode(postcode: string): string {
  const postCodeNumeric = parseInt(postcode);
  if (postCodeNumeric) {
    if (
      (postCodeNumeric >= 1000 && postCodeNumeric <= 2599) ||
      (postCodeNumeric >= 2619 && postCodeNumeric <= 2899) ||
      (postCodeNumeric >= 2921 && postCodeNumeric <= 2999)
    ) {
      return "NSW";
    } else if (
      (postCodeNumeric >= 200 && postCodeNumeric <= 299) ||
      (postCodeNumeric >= 2600 && postCodeNumeric <= 2618) ||
      (postCodeNumeric >= 2900 && postCodeNumeric <= 2920)
    ) {
      return "ACT";
    } else if (
      (postCodeNumeric >= 3000 && postCodeNumeric <= 3999) ||
      (postCodeNumeric >= 8000 && postCodeNumeric <= 8999)
    ) {
      return "VIC";
    } else if (
      (postCodeNumeric >= 4000 && postCodeNumeric <= 4999) ||
      (postCodeNumeric >= 9000 && postCodeNumeric <= 9999)
    ) {
      return "QLD";
    } else if (postCodeNumeric >= 5000 && postCodeNumeric <= 5999) {
      return "SA";
    } else if (
      (postCodeNumeric >= 6000 && postCodeNumeric <= 6797) ||
      (postCodeNumeric >= 6800 && postCodeNumeric <= 6999)
    ) {
      return "WA";
    } else if (postCodeNumeric >= 7000 && postCodeNumeric <= 7999) {
      return "TAS";
    } else if (postCodeNumeric >= 800 && postCodeNumeric <= 999) {
      return "NT";
    }
  }
  return "";
}
