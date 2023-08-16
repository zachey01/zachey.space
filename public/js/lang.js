const lang = navigator.language || navigator.userLanguage;

let translateText;

if (lang === "ru-RU" || lang === "ru") {
  translateText = {
    mainSubtitle:
      "Фуллстэк разработчик, веб дизайнер, разработчик Telegram ботов",
    skills: "Скиллы",
    home: "Главная",
    blog: "Блог",
    portfolio: "Портфолио",
    contacts: "Контакты",
    lang: "ru",
  };
} else if (lang === "uk-UK" || lang === "uk") {
  translateText = {
    mainSubtitle: "Фулстек розробник, вебдизайнер, розробник Telegram-ботів",
    skills: "Скіли",
    home: "Головна",
    blog: "Блог",
    portfolio: "Портфоліо",
    contacts: "Контакти",
    lang: "ua",
  };
} else {
  translateText = {
    mainSubtitle: "Fullstack developer, web designer, Telegram bot developer",
    skills: "Skills",
    home: "Home",
    blog: "Blog",
    portfolio: "Portfolio",
    contacts: "Contacts",
    lang: "en",
  };
}
