import AbstractView from './abstract.js';

const createIntroTemplate = () => {
  return (
    `<section id="intro" class="intro">
      <div class="section__container">
        <h1 class="site-heading">Розрахунок пропускної здатності магістрального нафтопроводу</h1>

        <p class="intro__text">
          Розрахунок режимів експлуатації нафтопроводу передбачає визначення тисків нафти на виході
          нафтоперекачувальних станцій,
          підпорів перед ними і продуктивності нафтопроводу за умов, що відрізняються від розрахункових. Розв’язується
          також
          питання про регулювання режимів роботи нафтопроводу з метою забезпечення проектних режимів його роботи.
        </p>

        <div class="intro__buttons">
          <a class="button button--secondary intro__button intro__button--info"
            href="https://github.com/embyth/oil-transmission-system#readme" target="_blank">Інформація</a>
          <button class="button button--primary intro__button intro__button--begin" type="button">Почати</button>
        </div>
      </div>
    </section>`
  );
};

export default class Intro extends AbstractView {
  constructor() {
    super();

    this._beginButtonClickHandler = this._beginButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createIntroTemplate();
  }

  setBeginButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.intro__button--begin`).addEventListener(`click`, this._beginButtonClickHandler);
  }

  _beginButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }
}
