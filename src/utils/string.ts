String.prototype.toCapitalized = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toTitleCase = function (): string {
  return this.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};

String.prototype.truncate = function (length?: number, append: string = "...") {
  if (!length) return this.toString();
  return `${this.slice(0, length)}${this.length > length ? append : ""}`;
};
