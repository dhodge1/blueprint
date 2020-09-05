export const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const replaceAll = (str, before, after) => {
  const regex = new RegExp(before, "g");
  return str.replace(regex, after);
};

export const safeString = (str) => str.trim().toLowerCase();
