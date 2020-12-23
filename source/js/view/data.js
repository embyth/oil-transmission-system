import AbstractView from './abstract.js';

const createIncomeDataTemplate = (data) => {
  const {annualVolume, length, density20, viscosity0, viscosity20, diameter, wall, oilTemp, pipelineCondition, aCoefMain, bCoefMain, aCoefSup, bCoefSup, pumpAmount, startGeoPoint, endGeoPoint} = data;

  return (
    `<section id="income-data" class="income-data">
      <div class="section__container">
        <h2 class="section-heading">Вихідні дані для розрахунку</h2>

        <fieldset class="data__fieldset">
          <div class="data__fieldset-replacer">
            <div class="data__container">

              <div class="data__item">
                <label for="density20" class="data__label">Густина нафти за температури 20&nbsp;<sup>o</sup>С</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">ρ<sub>20</sub></dfn>
                  <input type="number" class="data__input data__input--density20" id="density20" placeholder="836.1"
                    min="100" max="1000" step="0.01" autocomplete="off" required value="${density20 ? density20 : ``}">
                  <span class="data__input--dimension">кг/м<sup>3</sup></span>
                </div>
              </div>

              <div class="data__item">
                <label for="viscosity" class="data__label">В'язкість нафти</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">ν<sub>0</sub></dfn>
                  <input type="number" class="data__input data__input--viscosity" id="viscosity" placeholder="38.4"
                    min="1" max="100" step="0.01" autocomplete="off" required value="${viscosity0 ? viscosity0 : ``}">
                  <span class="data__input--dimension">сСт</span>
                </div>
              </div>

              <div class="data__item">
                <label for="viscosity20" class="data__label">В'язкість нафти за температури
                  20&nbsp;<sup>o</sup>С</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">ν<sub>20</sub></dfn>
                  <input type="number" class="data__input data__input--viscosity20" id="viscosity20"
                    placeholder="19.35" min="1" max="100" step="0.01" autocomplete="off" required value="${viscosity20 ? viscosity20 : ``}">
                  <span class="data__input--dimension">сСт</span>
                </div>
              </div>

              <div class="data__item">
                <label for="length" class="data__label">Довжина трубопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">L</dfn>
                  <input type="number" class="data__input data__input--length" id="length" placeholder="530" min="50"
                    max="2000" step="0.1" autocomplete="off" required value="${length ? length : ``}">
                  <span class="data__input--dimension">км</span>
                </div>
              </div>

              <div class="data__item">
                <label for="diameter" class="data__label">Діаметр нафтопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">d</dfn>
                  <input type="number" class="data__input data__input--diameter" id="diameter" placeholder="720"
                    min="219" max="1220" step="1" autocomplete="off" required value="${diameter ? diameter : ``}">
                  <span class="data__input--dimension">мм</span>
                </div>
              </div>

              <div class="data__item">
                <label for="wall" class="data__label">Товщина стінки трубопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">δ</dfn>
                  <input type="number" class="data__input data__input--wall" id="wall" placeholder="8" min="2"
                    max="20" step="0.1" autocomplete="off" required value="${wall ? wall : ``}">
                  <span class="data__input--dimension">мм</span>
                </div>
              </div>

              <div class="data__item">
                <label for="capacity" class="data__label">Річний обсяг перекачування</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">M</dfn>
                  <input type="number" class="data__input data__input--capacity" id="capacity" placeholder="14.1"
                    min="1" max="30" step="0.01" autocomplete="off" required value="${annualVolume ? annualVolume : ``}">
                  <span class="data__input--dimension">млн. т/рік</span>
                </div>
              </div>

              <div class="data__item">
                <label for="oil-temp" class="data__label">Температура грунту на осі прокладання трубопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">t<sub>min</sub></dfn>
                  <input type="number" class="data__input data__input--oil-temp" id="oil-temp" placeholder="1.8"
                    min="0" max="20" step="0.01" autocomplete="off" required value="${oilTemp ? oilTemp : ``}">
                  <span class="data__input--dimension"><sup>o</sup>C</span>
                </div>
              </div>

              <div class="data__item">
                <label for="pipeline-cond" class="data__label">Гориста, болотиста місцевість проходження траси</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">x</dfn>
                  <input type="number" class="data__input data__input--pipeline-cond" id="pipeline-cond"
                    placeholder="22" min="0" max="100" step="0.1" autocomplete="off" required value="${pipelineCondition ? pipelineCondition : ``}">
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="pump-amount" class="data__label">Кількість працюючих основних насосів</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">r</dfn>
                  <input type="number" class="data__input data__input--pump-amount" id="pump-amount" placeholder="3"
                    min="1" max="6" step="1" autocomplete="off" required value="${pumpAmount ? pumpAmount : ``}">
                  <span class="data__input--dimension">шт</span>
                </div>
              </div>

              <div class="data__item">
                <label for="a-coef" class="data__label">Коефіцієнт а математичної моделі для основного насосу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">а</dfn>
                  <input type="number" class="data__input data__input--a-coef" id="a-coef" placeholder="286.8"
                    min="50" max="500" step="0.1" autocomplete="off" required value="${aCoefMain ? aCoefMain : ``}">
                  <span class="data__input--dimension">м</span>
                </div>
              </div>

              <div class="data__item">
                <label for="b-coef" class="data__label">Коефіцієнт b математичної моделі для основного насосу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">b</dfn>
                  <input type="number" class="data__input data__input--b-coef" id="b-coef" placeholder="119.2"
                    min="10" max="400" step="0.01" autocomplete="off" required value="${bCoefMain ? bCoefMain : ``}">
                  <span class="data__input--dimension">с<sup>2</sup>/м<sup>5</sup></span>
                </div>
              </div>

              <div class="data__item">
                <label for="a-coef-sup" class="data__label">Коефіцієнт а математичної моделі для підпірного
                  насосу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">а<sub>п</sub></dfn>
                  <input type="number" class="data__input data__input--a-coef-sup" id="a-coef-sup" placeholder="113.8"
                    min="50" max="500" step="0.1" autocomplete="off" required value="${aCoefSup ? aCoefSup : ``}">
                  <span class="data__input--dimension">м</span>
                </div>
              </div>

              <div class="data__item">
                <label for="b-coef-sup" class="data__label">Коефіцієнт b математичної моделі для підпірного
                  насосу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">b<sub>п</sub></dfn>
                  <input type="number" class="data__input data__input--b-coef-sup" id="b-coef-sup" placeholder="67.4"
                    min="10" max="400" step="0.01" autocomplete="off" required value="${bCoefSup ? bCoefSup : ``}">
                  <span class="data__input--dimension">с<sup>2</sup>/м<sup>5</sup></span>
                </div>
              </div>

              <div class="data__item">
                <label for="start-geopoint" class="data__label">Геодезична позначка початку нафтопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">z<sub>п</sub></dfn>
                  <input type="number" class="data__input data__input--start-geopoint" id="start-geopoint"
                    placeholder="24" step="0.1" autocomplete="off" required value="${startGeoPoint ? startGeoPoint : ``}">
                  <span class="data__input--dimension">м</span>
                </div>
              </div>

              <div class="data__item">
                <label for="end-geopoint" class="data__label">Геодезична позначка кінця нафтопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">z<sub>к</sub></dfn>
                  <input type="number" class="data__input data__input--end-geopoint" id="end-geopoint"
                    placeholder="79" step="0.1" autocomplete="off" required value="${endGeoPoint ? endGeoPoint : ``}">
                  <span class="data__input--dimension">м</span>
                </div>
              </div>

              <div class="data__item">
                <button class="button button--primary data__button data__button--next" type="button">Далі</button>
              </div>

            </div>
          </div>
        </fieldset>

      </div>
    </section>`
  );
};

export default class Income extends AbstractView {
  constructor(incomeDataModel) {
    super();

    this._incomeDataModel = incomeDataModel;

    this._nextButtonClickHandler = this._nextButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createIncomeDataTemplate(this._getData());
  }

  _getData() {
    return this._incomeDataModel.getData();
  }

  setNextButtonClickHandler(callback) {
    this._callback.nextClick = callback;
    this.getElement().querySelector(`.data__button--next`).addEventListener(`click`, this._nextButtonClickHandler);
  }

  _nextButtonClickHandler(evt) {
    evt.preventDefault();

    this._incomeDataModel.setData(this._collectData());

    if (!this.isUserDataValid()) {
      this.shake();
      return;
    }

    this._callback.nextClick();
  }

  _collectData() {
    return {
      annualVolume: +this.getElement().querySelector(`#capacity`).value,
      length: +this.getElement().querySelector(`#length`).value,
      density20: +this.getElement().querySelector(`#density20`).value,
      viscosity0: +this.getElement().querySelector(`#viscosity`).value,
      viscosity20: +this.getElement().querySelector(`#viscosity20`).value,
      diameter: +this.getElement().querySelector(`#diameter`).value,
      wall: +this.getElement().querySelector(`#wall`).value,
      oilTemp: +this.getElement().querySelector(`#oil-temp`).value,
      pipelineCondition: +this.getElement().querySelector(`#pipeline-cond`).value,
      aCoefMain: +this.getElement().querySelector(`#a-coef`).value,
      bCoefMain: +this.getElement().querySelector(`#b-coef`).value,
      aCoefSup: +this.getElement().querySelector(`#a-coef-sup`).value,
      bCoefSup: +this.getElement().querySelector(`#b-coef-sup`).value,
      pumpAmount: +this.getElement().querySelector(`#pump-amount`).value,
      startGeoPoint: +this.getElement().querySelector(`#start-geopoint`).value,
      endGeoPoint: +this.getElement().querySelector(`#end-geopoint`).value,
    };
  }
}
