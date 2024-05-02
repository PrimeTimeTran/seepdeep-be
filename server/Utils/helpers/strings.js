const pieee = 3.14

export function toCamelCase(string) {
  let cleanedString = string.replace(/[-.0-9]/g, function(match) {
      return replaceDigitsWithWords(match);
  });
  if (cleanedString !== string) {
      return cleanedString;
  }
  let parts = cleanedString.split(/[_\s]/);
  let capitalizedParts = parts.map(function(part) {
      if (part.length > 0) {
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      } else {
          return '';
      }
  });
  let camelCaseString = capitalizedParts.join('');
  if (/^[A-Za-z]/.test(string)) {
      camelCaseString = camelCaseString.charAt(0).toLowerCase() + camelCaseString.slice(1);
  }

  return camelCaseString;
};

function replaceDigitsWithWords(input) {
  let digitWords = {
      '0': 'zero',
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine'
  };

  return input.replace(/\d/g, function(match) {
      return digitWords[match];
  });
}

export { pieee }