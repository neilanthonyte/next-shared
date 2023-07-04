export function validateMedicareProviderNumber(number: string) {
  if (number.length > 0) {
    const locationCharacters = "0123456789ABCDEFGHJKLMNPQRTUVWXY";
    const checkCharacters = "YXWTLKJHFBA";
    const pattern =
      /^(\d{5,6})([0123456789ABCDEFGHJKLMNPQRTUVWXY])([YXWTLKJHFBA])$/;
    const providerNumber = number.toString().replace(/[^\dA-Z]/, "");
    const matches = pattern.exec(providerNumber);
    const weights = [3, 5, 8, 4, 2, 1];

    if (matches && matches.length === 4) {
      let stem = matches[1];

      if (stem.length === 5) {
        stem = `0${stem}`;
      }
      const locationCharacter = matches[2];
      const checkCharacter = matches[3];

      let sum = locationCharacters.indexOf(locationCharacter) * 6;

      weights.forEach((weight, i) => {
        sum += Number(stem.charAt(i)) * weight;
      });

      return checkCharacter === checkCharacters.charAt(sum % 11);
    }

    return false;
  }
}
