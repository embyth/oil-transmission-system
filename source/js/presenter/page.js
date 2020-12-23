import IntroView from '../view/intro.js';
import IncomeView from '../view/data.js';
import ResultsView from '../view/results.js';
import StationsView from '../view/stations.js';
import {firstCalculation, secondCalculation} from '../utils/calculate.js';
import {blockBodyScroll, unblockBodyScroll, isEscKey} from '../utils/common.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition, SECTION} from '../const.js';

export default class Page {
  constructor(container, incomeDataModel, resultsModel) {
    this._contentContainer = container;
    this._incomeDataModel = incomeDataModel;
    this._resultsModel = resultsModel;

    this._isMenuOpen = false;
    this._currentSection = SECTION.INTRO;

    this._introComponent = new IntroView();
    this._incomeComponent = new IncomeView(this._incomeDataModel);
    this._stationsComponent = new StationsView(this._incomeDataModel, this._resultsModel);
    this._resultsComponent = new ResultsView(this._resultsModel);

    this._menuOpen = document.querySelector(`.hamburger`);
    this._menuClose = document.querySelector(`.site-aside__close`);
    this._menuNode = document.querySelector(`.site-aside`);
    this._overlayNode = document.querySelector(`.site-aside__overlay`);

    this._navigationButtons = document.querySelectorAll(`.site-nav__button`);

    this._handleSiteMenuOpen = this._handleSiteMenuOpen.bind(this);
    this._handleSiteMenuClose = this._handleSiteMenuClose.bind(this);
    this._hamburgerKeyDownHandler = this._hamburgerKeyDownHandler.bind(this);
    this._hamburgerClickHandler = this._hamburgerClickHandler.bind(this);
    this._navButtonsClickHandler = this._navButtonsClickHandler.bind(this);
    this._handleBeginButtonClick = this._handleBeginButtonClick.bind(this);
    this._handleNextButtonClick = this._handleNextButtonClick.bind(this);
    this._handleCalcButtonClick = this._handleCalcButtonClick.bind(this);
  }

  init() {
    render(this._contentContainer, this._introComponent, RenderPosition.BEFOREEND);
    this._introComponent.setBeginButtonClickHandler(this._handleBeginButtonClick);
    this._setPageHandlers();
  }

  _pageSectionHandler(type) {
    this._clearPage();
    this._handleNavButtonsActiveState(type);

    switch (type) {
      case SECTION.INTRO:
        render(this._contentContainer, this._introComponent, RenderPosition.BEFOREEND);
        this._introComponent.setBeginButtonClickHandler(this._handleBeginButtonClick);
        break;
      case SECTION.DATA:
        render(this._contentContainer, this._incomeComponent, RenderPosition.BEFOREEND);
        this._incomeComponent.setNextButtonClickHandler(this._handleNextButtonClick);
        break;
      case SECTION.STATIONS:
        render(this._contentContainer, this._stationsComponent, RenderPosition.BEFOREEND);
        this._stationsComponent.setCalcButtonClickHandler(this._handleCalcButtonClick);
        break;
      case SECTION.RESULTS:
        render(this._contentContainer, this._resultsComponent, RenderPosition.BEFOREEND);
        break;
    }

    this._currentSection = type;
  }

  _clearPage() {
    switch (this._currentSection) {
      case SECTION.INTRO:
        remove(this._introComponent);
        break;
      case SECTION.DATA:
        remove(this._incomeComponent);
        break;
      case SECTION.STATIONS:
        remove(this._stationsComponent);
        break;
      case SECTION.RESULTS:
        remove(this._resultsComponent);
        break;
    }
  }

  _setPageHandlers() {
    this._menuOpen.addEventListener(`click`, this._hamburgerClickHandler);
    this._overlayNode.addEventListener(`click`, this._hamburgerClickHandler);
    this._menuClose.addEventListener(`click`, this._hamburgerClickHandler);
    this._navigationButtons.forEach((button) => button.addEventListener(`click`, this._navButtonsClickHandler));
  }

  _enableNavigationButton(section) {
    [...this._navigationButtons].find((button) => button.dataset.section === section).disabled = false;
  }

  _handleBeginButtonClick() {
    this._pageSectionHandler(SECTION.DATA);
  }

  _handleNextButtonClick() {
    firstCalculation(this._incomeDataModel.getData(), this._resultsModel);
    this._enableNavigationButton(SECTION.STATIONS);
    this._pageSectionHandler(SECTION.STATIONS);
  }

  _handleCalcButtonClick() {
    secondCalculation(this._incomeDataModel.getData(), this._resultsModel);
    this._enableNavigationButton(SECTION.RESULTS);
    this._pageSectionHandler(SECTION.RESULTS);
  }

  _navButtonsClickHandler(evt) {
    evt.preventDefault();

    let type;
    if (evt.target.dataset.section) {
      type = evt.target.dataset.section;
    } else {
      type = evt.target.parentElement.dataset.section;
    }

    if (this._currentSection === type) {
      return;
    }

    this._pageSectionHandler(type);
  }

  _handleNavButtonsActiveState(type) {
    this._navigationButtons.forEach((button) => button.classList.remove(`site-nav__button--current`));

    [...this._navigationButtons].find((button) => button.dataset.section === type).classList.add(`site-nav__button--current`);
  }

  _handleSiteMenuOpen() {
    blockBodyScroll();

    this._menuNode.classList.remove(`site-aside--hidden`);
    this._overlayNode.classList.remove(`site-aside__overlay--hidden`);

    document.addEventListener(`keydown`, this._hamburgerKeyDownHandler);
  }

  _handleSiteMenuClose() {
    unblockBodyScroll();

    this._menuNode.classList.add(`site-aside--hidden`);
    this._overlayNode.classList.add(`site-aside__overlay--hidden`);

    document.removeEventListener(`keydown`, this._hamburgerKeyDownHandler);
  }

  _hamburgerKeyDownHandler(evt) {
    if (isEscKey(evt)) {
      this._isMenuOpen = false;
      this._handleSiteMenuClose();
    }
  }

  _hamburgerClickHandler(evt) {
    evt.preventDefault();

    if (this._isMenuOpen) {
      this._isMenuOpen = false;
      this._handleSiteMenuClose();
    } else {
      this._isMenuOpen = true;
      this._handleSiteMenuOpen();
    }
  }
}
