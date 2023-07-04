import { isValidEmailAddress } from "next-shared/src/helpers/isValidEmailAddress";

export function emailMask(email: string) {
  // validate the input string is an email
  if (!isValidEmailAddress(email)) {
    throw new Error("Invalid email parameter");
  }

  // this should return a masked value with all but the first and last character of the recipient
  // name replaced with asterisks (*), and all but the first letter of the domain name similarly
  // replaced, e.g. 'john.doe@example.com' becomes 'j******e@e******.com'. Further top level domains
  // (e.g. 'john.doe@example.com.au') are left intact ('j******e@e******.com.au').  Note the asterisk
  // count matches the letters replaced--if more secure masking is required, consider a different regex.

  // return email.replace(/(?<=^[^@]+)[^@](?=[^@])|(?<=@[^.]+)[^.](?=[^])/g, "*");

  // The above does not work with React Native because lookbehind are not supported by some version of javascript
  const split = email.split("@");
  const name = split[0];
  const provider = split[1].split(".");
  const providerName = provider[0];
  const providerRest = provider.splice(1, split.length);

  const maskedName = [
    name.replace(
      new RegExp(`(.)(.{0,${name.length - 2}})(.)`),
      (_, part1, part2, part3) => part1 + "*".repeat(part2.length) + part3,
    ),
  ];

  const maskedProviderName = providerName.replace(
    new RegExp(`(.)(.{0,${name.length - 2}})`),
    (_, part1, part2) => part1 + "*".repeat(part2.length),
  );

  return [[maskedName, maskedProviderName].join("@"), ...providerRest].join(
    ".",
  );
}
