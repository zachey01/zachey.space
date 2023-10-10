const lang = navigator.language || navigator.userLanguage;

let translateText;

if (lang === "ru-RU" || lang === "ru") {
  translateText = {
    mainSubtitle:
      "Фуллстэк разработчик, веб дизайнер, Source Engine mapper, 3D Художник",
    skills: "Скиллы",
    home: "Главная",
    blog: "Блог",
    portfolio: "Портфолио",
    contacts: "Контакты",
    lang: "ru",
  };
} else if (lang === "uk-UK" || lang === "uk") {
  translateText = {
    mainSubtitle:
      "Фулстек розробник, веб дизайнер, Source Engine mapper, 3D Художник",
    skills: "Скіли",
    home: "Головна",
    blog: "Блог",
    portfolio: "Портфоліо",
    contacts: "Контакти",
    lang: "ua",
  };
} else {
  translateText = {
    mainSubtitle:
      "Fullstack Developer, Web Designer, Source Engine mapper, 3D Artist",
    skills: "Skills",
    home: "Home",
    blog: "Blog",
    portfolio: "Portfolio",
    contacts: "Contacts",
    lang: "en",
  };
}
