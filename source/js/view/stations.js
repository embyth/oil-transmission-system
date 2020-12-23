import AbstractView from './abstract.js';
import {getRandomNumber} from '../utils/common.js';

const createStationRowsTemplate = (data, results) => {
  const {lengths = [], geoPoints = [], pumpUnits = [], pressureMinLimits = [], pressureMaxLimits = []} = data;
  const {stations} = results;

  let template = ``;
  for (let station = 0; station < stations; station++) {
    const stationName = (station === 0) ? `ГНПС-1` : `НПС-${station + 1}`;
    const isMainStation = station === 0;

    template += (
      `<tr class="data__table-row">
        <td class="data__table-cell data__table-cell--station">
          ${stationName}
        </td>
        <td class="data__table-cell data__table-cell--length">
          <input type="number" class="data__table-input data__table-input--length" placeholder="${getRandomNumber(100, 150)}"
            autocomplete="off" min="10" max="160" step="0.1" required value="${lengths[station] ? lengths[station] : ``}">
          <dfn class="data__input--definition">L<sub>${stationName}</sub></dfn>
          <span class="data__input--dimension">км</span>
        </td>
        <td class="data__table-cell data__table-cell--geo-point">
          <input type="number" class="data__table-input data__table-input--geo-point" placeholder="${getRandomNumber(-20, 100)}"
            autocomplete="off" step="0.01" required value="${geoPoints[station] ? geoPoints[station] : ``}">
          <dfn class="data__input--definition">z<sub>${stationName}</sub></dfn>
          <span class="data__input--dimension">м</span>
        </td>
        <td class="data__table-cell data__table-cell--pump-quant">
          <input type="number" class="data__table-input data__table-input--pump-quant" placeholder="3"
            autocomplete="off" min="1" max="6" step="1" required value="${pumpUnits[station] ? pumpUnits[station] : ``}">
          <dfn class="data__input--definition">r<sub>${stationName}</sub></dfn>
          <span class="data__input--dimension">шт</span>
        </td>
        <td class="data__table-cell data__table-cell--min-pressure">
          <input type="number" class="data__table-input data__table-input--min-pressure" ${isMainStation ? `` : `placeholder="0.4"`}
            autocomplete="off" min="0.1" max="2" step="0.001" ${isMainStation ? `disabled` : `required`} value="${pressureMinLimits[station - 1] ? pressureMinLimits[station - 1] : ``}">
          <dfn class="data__input--definition">P<sub>min(доп)</sub></dfn>
          <span class="data__input--dimension">МПа</span>
        </td>
        <td class="data__table-cell data__table-cell--max-pressure">
          <input type="number" class="data__table-input data__table-input--max-pressure" placeholder="6.1"
            autocomplete="off" min="1" max="10" step="0.001" required value="${pressureMaxLimits[station] ? pressureMaxLimits[station] : ``}">
          <dfn class="data__input--definition">P<sub>max(доп)</sub></dfn>
          <span class="data__input--dimension">МПа</span>
        </td>
      </tr>`
    );
  }

  template += (
    `<tr class="data__table-row">
      <td class="data__table-cell data__table-cell--station">
        КП
      </td>
      <td class="data__table-cell data__table-cell--length">
        <input type="number" class="data__table-input data__table-input--length"
          autocomplete="off" min="10" max="160" step="0.1" disabled>
        <dfn class="data__input--definition">L<sub>КП</sub></dfn>
        <span class="data__input--dimension">км</span>
      </td>
      <td class="data__table-cell data__table-cell--geo-point">
        <input type="number" class="data__table-input data__table-input--geo-point" placeholder="${getRandomNumber(-50, 150)}"
          autocomplete="off" step="0.01" required value="${geoPoints[stations] ? geoPoints[stations] : ``}">
        <dfn class="data__input--definition">z<sub>КП</sub></dfn>
        <span class="data__input--dimension">м</span>
      </td>
      <td class="data__table-cell data__table-cell--pump-quant">
        <input type="number" class="data__table-input data__table-input--pump-quant"
          autocomplete="off" min="1" max="6" step="1" disabled>
        <dfn class="data__input--definition">r<sub>КП</sub></dfn>
        <span class="data__input--dimension">шт</span>
      </td>
      <td class="data__table-cell data__table-cell--min-pressure">
        <input type="number" class="data__table-input data__table-input--min-pressure" placeholder="0.25"
          autocomplete="off" min="0.1" max="2" step="0.001" required value="${pressureMinLimits[stations - 1] ? pressureMinLimits[stations - 1] : ``}">
        <dfn class="data__input--definition">P<sub>min(доп)</sub></dfn>
        <span class="data__input--dimension">МПа</span>
      </td>
      <td class="data__table-cell data__table-cell--max-pressure">
        <input type="number" class="data__table-input data__table-input--max-pressure"
          autocomplete="off" min="1" max="10" step="0.001" disabled>
        <dfn class="data__input--definition">P<sub>max(доп)</sub></dfn>
        <span class="data__input--dimension">МПа</span>
      </td>
    </tr>`
  );

  return template;
};

const createStationsDataTemplate = (data, results) => {
  const stationsRowsTemplate = createStationRowsTemplate(data, results);

  return (
    `<section id="income-stations" class="income-stations">
      <div class="section__container">
        <h2 class="section-heading">Вихідні дані для станцій нафтопроводу</h2>

        <fieldset class="data__fieldset">
          <div class="data__fieldset-replacer">
            <div class="data__container data__container--stations">
              <table class="data__table data__table--stations">
                <thead class="data__table-head">
                  <tr>
                    <td class="data__table-cell data__table-cell--station">Станція</td>
                    <td class="data__table-cell data__table-cell--length">Довжина прилеглої ділянки</td>
                    <td class="data__table-cell data__table-cell--geo-point">Геодезична позначка станції</td>
                    <td class="data__table-cell data__table-cell--pump-quant">Кількість одночасно працюючих основних
                      насосів</td>
                    <td class="data__table-cell data__table-cell--min-pressure">Мінімально допустимий тиск на
                      вході</td>
                    <td class="data__table-cell data__table-cell--max-pressure">Максимально допустимий тиск на
                      виході</td>
                  </tr>
                </thead>

                <tbody class="data__table-body">
                  ${stationsRowsTemplate}
                </tbody>
              </table>
            </div>
            <button class="button button--primary data__button data__button--calc" type="button">Розрахувати</button>
          </div>
        </fieldset>

      </div>
    </section>`
  );
};

export default class StationsIncome extends AbstractView {
  constructor(incomeDataModel, resultsModel) {
    super();

    this._incomeDataModel = incomeDataModel;
    this._resultsModel = resultsModel;
    this._calcButtonClickHandler = this._calcButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createStationsDataTemplate(this._getData(), this._getResults());
  }

  _getData() {
    return this._incomeDataModel.getData();
  }

  _getResults() {
    return this._resultsModel.getResults();
  }

  setCalcButtonClickHandler(callback) {
    this._callback.calcClick = callback;
    this.getElement().querySelector(`.data__button--calc`).addEventListener(`click`, this._calcButtonClickHandler);
  }

  _calcButtonClickHandler(evt) {
    evt.preventDefault();

    this._incomeDataModel.setData(this._collectData());

    if (!this.isUserDataValid()) {
      this.shake();
      return;
    }

    this._callback.calcClick();
  }

  _collectData() {
    const {stations} = this._getResults();

    const lengths = [];
    const geoPoints = [];
    const pumpUnits = [];
    const pressureMinLimits = [];
    const pressureMaxLimits = [];

    const lengthInputs = this.getElement().querySelectorAll(`.data__table-input--length`);
    const geoInputs = this.getElement().querySelectorAll(`.data__table-input--geo-point`);
    const pumpQuantityInputs = this.getElement().querySelectorAll(`.data__table-input--pump-quant`);
    const minPressureInputs = this.getElement().querySelectorAll(`.data__table-input--min-pressure`);
    const maxPressureInputs = this.getElement().querySelectorAll(`.data__table-input--max-pressure`);

    for (let station = 0; station < stations; station++) {
      lengths.push(+lengthInputs[station].value);
      geoPoints.push(+geoInputs[station].value);
      pumpUnits.push(+pumpQuantityInputs[station].value);
      pressureMinLimits.push(+minPressureInputs[station + 1].value);
      pressureMaxLimits.push(+maxPressureInputs[station].value);
    }

    geoPoints.push(+geoInputs[stations].value);

    return {
      lengths,
      geoPoints,
      pumpUnits,
      pressureMinLimits,
      pressureMaxLimits,
    };
  }
}
