import DataModel from './model/data.js';
import ResultsModel from './model/results.js';
import PagePresenter from './presenter/page.js';

const contentContainer = document.querySelector(`#site-content`);

const dataModel = new DataModel();
const resultsModel = new ResultsModel();
const pagePresenter = new PagePresenter(contentContainer, dataModel, resultsModel);

pagePresenter.init();
