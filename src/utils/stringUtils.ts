/**
 * @method toTitleCase
 * @param {string} inputString Text string to convert to title case.
 * @description Converts camel case, pascal case, snake case, and screaming snake case to title case.
 * @example
 * const string1 = `CatsDogsMoreDogs`;
 * const string2 = `catsDogsMoreDogs`;
 * const string3 = `cats_Dogs_More_Dogs`
 * const string4 = `CATS_DOGS_MORE_DOGS`
 *
 * console.log(toTitleCase(string1)); // --> "Cats Dogs More Dogs"
 * console.log(toTitleCase(string2)); // --> "Cats Dogs More Dogs"
 * console.log(toTitleCase(string3)); // --> "Cats Dogs More Dogs"
 * console.log(toTitleCase(string4)); // --> "Cats Dogs More Dogs"
 */
const toTitleCase = (inputString: string) =>
  inputString
    .trim()
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase();
    });

const isAlphaNumeric = (str: string) => /[a-z0-9]/gi.test(str[str.length - 1]);

export { toTitleCase };
