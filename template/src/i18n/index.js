import en from "./en.json";

export default (langCode = "en") => {
  if (langCode === "en") {
    return en;
  }
};
