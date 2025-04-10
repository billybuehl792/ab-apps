export const RegexPattern = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /^(1|)?(\d{3})(\d{3})(\d{4})$/,
  ZIP_CODE: /^\d{5}(?:[-\s]\d{4})?$/,
};
