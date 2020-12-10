# :oil_drum: Розрахунок пропускної здатності магістрального нафтопроводу за умов заданого розташування нафтоперекачувальних станцій

[![Build status][travis-image]][travis-url] [![Dependency status][dependency-image]][dependency-url]

Розрахунок режимів експлуатації нафтопроводу передбачає визначення тисків нафти на виході нафтоперекачувальних станцій, підпорів перед ними і продуктивності нафтопроводу за умов, що відрізняються від розрахункових. Розв’язується також питання про регулювання режимів роботи нафтопроводу з метою забезпечення проектних режимів його роботи.

Код: [Ростислав Мінюков](https://github.com/embyth/)

Методика розрахунку: “Нормы технологического проектирования магистральных нефтепроводов” (ВНТП 2-86)

[**Онлайн-розрахунок**](https://embyth.github.io/oil-transmission-system/)

---

## Зміст

- [:oil_drum: Розрахунок пропускної здатності магістрального нафтопроводу за умов заданого розташування нафтоперекачувальних станцій](#oil_drum-розрахунок-пропускної-здатності-магістрального-нафтопроводу-за-умов-заданого-розташування-нафтоперекачувальних-станцій)
  - [Зміст](#зміст)
  - [Структура проекту](#структура-проекту)

---

## Структура проекту

```bash
.
├── build/            # директорія сборки проекту (генерується автоматично)
├── dist/             # директорія проекту для архівування (генерується автоматично)
├── gulp/             # директорія задач Gulp
├── source/           # директорія вихідних файлів проекту
│   ├── fonts/        # директорія шрифтів
│   ├── img/          # директорія картинок
│   ├── js/           # директорія JavaScript файлів
│   ├── sass/         # директорія стилів
│   └── index.html    # головний файл розмітки
├── .babelrc          # конфігурація Babel
├── .browserslistrc   # конфігурація browserslist
├── .editorconfig     # конфігурація Editor config
├── .eslintignore     # виключення ESlint
├── .eslintrc.yml     # конфігурація ESLint
├── .gitattributes    # файл Git attributes
├── .gitignore        # файл Git ignore
├── .npmrc            # конфігурація npm
├── .stylelintrc.json # конфігурація stylelint
├── .travis.yml       # конфігураціяTravis CI
├── gulpfile.js       # концігурація Gulp
├── webpack.config.js # конфігурація Webpack
├── package.json      # файл npm залежностей та налаштування проекту
├── package-lock.json # npm lock-file
└── README.md         # документація
```

---

[travis-image]: https://travis-ci.org/embyth/oil-transmission-system.svg?branch=master
[travis-url]: https://travis-ci.org/embyth/oil-transmission-system
[dependency-image]: https://david-dm.org/embyth/oil-transmission-system/dev-status.svg?style=flat-square
[dependency-url]: https://david-dm.org/embyth/oil-transmission-system?type=dev
