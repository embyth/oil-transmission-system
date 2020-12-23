import AbstractView from './abstract.js';

const createLoopingResultsTemplate = (results) => {
  const {isLooping, hydraulicTilt, loopingLength} = results;

  return (
    `${isLooping
      ? `<tr class="data__table-row">
          <td class="data__table-cell data__table-cell--parameter">Гідравлічний нахил в трубопроводі</td>
          <td class="data__table-cell data__table-cell--marking">i</td>
          <td class="data__table-cell data__table-cell--value">${hydraulicTilt}</td>
          <td class="data__table-cell data__table-cell--dimension"></td>
        </tr>
        <tr class="data__table-row">
          <td class="data__table-cell data__table-cell--parameter">Необхідна довжина лупінга</td>
          <td class="data__table-cell data__table-cell--marking">x</td>
          <td class="data__table-cell data__table-cell--value">${loopingLength}</td>
          <td class="data__table-cell data__table-cell--dimension">м</td>
        </tr>`
      : ``}`
  );
};

const createPipelineCapicityResultsTemplate = (results) => {
  const {stations, stationVolume} = results;

  let template = (
    `<tr class="data__table-row">
      <td class="data__table-cell data__table-cell--parameter">Cередня швидкість руху нафти в поперечному перерізі</td>
      <td class="data__table-cell data__table-cell--marking">W</td>
      <td class="data__table-cell data__table-cell--value">${results[0].velosityFact}</td>
      <td class="data__table-cell data__table-cell--dimension">м/c</td>
    </tr>
    <tr class="data__table-row">
      <td class="data__table-cell data__table-cell--parameter">Число Рейнольдса</td>
      <td class="data__table-cell data__table-cell--marking">Re</td>
      <td class="data__table-cell data__table-cell--value">${results[0].reynoldsFact}</td>
      <td class="data__table-cell data__table-cell--dimension"></td>
    </tr>
    <tr class="data__table-row">
      <td class="data__table-cell data__table-cell--parameter">Еквівалентна шорсткість трубопроводу</td>
      <td class="data__table-cell data__table-cell--marking">ε</td>
      <td class="data__table-cell data__table-cell--value">${results[0].coefEpsilon}</td>
      <td class="data__table-cell data__table-cell--dimension"></td>
    </tr>
    <tr class="data__table-row">
      <td class="data__table-cell data__table-cell--parameter">Перше перехідне число Рейнольдса</td>
      <td class="data__table-cell data__table-cell--marking">Re<sub>I</sub></td>
      <td class="data__table-cell data__table-cell--value">${results[0].reynoldsFirst}</td>
      <td class="data__table-cell data__table-cell--dimension"></td>
    </tr>
    <tr class="data__table-row">
      <td class="data__table-cell data__table-cell--parameter">Друге перехідне число Рейнольдса</td>
      <td class="data__table-cell data__table-cell--marking">Re<sub>II</sub></td>
      <td class="data__table-cell data__table-cell--value">${results[0].reynoldsSecond}</td>
      <td class="data__table-cell data__table-cell--dimension"></td>
    </tr>
    <tr class="data__table-row">
      <td class="data__table-cell data__table-cell--parameter">Коефіцієнт гідравлічного опору</td>
      <td class="data__table-cell data__table-cell--marking">λ</td>
      <td class="data__table-cell data__table-cell--value">${results[0].resistCoefFact}</td>
      <td class="data__table-cell data__table-cell--dimension"></td>
    </tr>
    <tr class="data__table-row">
      <td class="data__table-cell data__table-cell--parameter">Продуктивність трубопроводу при даному режимі роботи</td>
      <td class="data__table-cell data__table-cell--marking">Q<sub>тр</sub></td>
      <td class="data__table-cell data__table-cell--value">${stationVolume}</td>
      <td class="data__table-cell data__table-cell--dimension">м<sup>3</sup>/с</td>
    </tr>`
  );

  for (let station = 0; station < stations; station++) {
    let stationFrom;
    let stationTo;
    if (station === 0) {
      stationFrom = `ГНПС-1`;
      stationTo = `НПС-2`;
    } else if (station === stations - 1) {
      stationFrom = `НПС-${station + 1}`;
      stationTo = `КП`;
    } else {
      stationFrom = `НПС-${station + 1}`;
      stationTo = `НПС-${station + 2}`;
    }

    template += (
      `<tr class="data__table-row data__table-row--station">
        <td colspan="4">${stationFrom} - ${stationTo}</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Максимально допустимий тиск на виході ${stationFrom}</td>
        <td class="data__table-cell data__table-cell--marking">h<sub>max${stationFrom}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].maxAllowablePressure}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Мінімально допустимий тиск на вході ${stationTo}</td>
        <td class="data__table-cell data__table-cell--marking">h<sub>min${stationTo}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].minAllowablePressure}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Напір, що створюють основні насоси</td>
        <td class="data__table-cell data__table-cell--marking">h<sub>о</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].stationMainPumpPressureTogather}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Напір, що створює підпірний насос</td>
        <td class="data__table-cell data__table-cell--marking">h<sub>п</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].stationSupPumpPressure}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Cумарні втрати напору на прогоні між ${stationFrom} та ${stationTo}</td>
        <td class="data__table-cell data__table-cell--marking">h<sub>w${station + 1}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].sumPressureLoss}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Напір, що створює ${stationFrom}</td>
        <td class="data__table-cell data__table-cell--marking">Н<sub>${stationFrom}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].stationPumpPressure}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Величина підпору на вході в ${stationTo}</td>
        <td class="data__table-cell data__table-cell--marking">h<sub>п${stationTo}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].outletSupport}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Перевищення величини підпору на вході у ${stationTo}</td>
        <td class="data__table-cell data__table-cell--marking">Δh<sub>${stationTo}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].exceedingSupport}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Напір на виході станції ${stationFrom}</td>
        <td class="data__table-cell data__table-cell--marking">Н<sub>${stationFrom}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].stationOutletPumpPressureFull}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr class="data__table-row">
        <td class="data__table-cell data__table-cell--parameter">Напір на виході станції ${stationFrom} за умови максимально допустимого напору</td>
        <td class="data__table-cell data__table-cell--marking">Н'<sub>${stationFrom}</sub></td>
        <td class="data__table-cell data__table-cell--value">${results[station].stationOutletPumpPressure}</td>
        <td class="data__table-cell data__table-cell--dimension">м</td>
      </tr>`
    );
  }

  return template;
};

const createResultsTemplate = (results) => {
  const {tempCorrection, density, viscosityCoef, viscosity, workingDays, dailyVolume, hourlyVolume, secondlyVolume} = results;
  const {singleMainPumpPressure, singleSupPumpPressure, mainStationPumpPressure, mainStationPressure} = results;
  const {diameterCI, velosity, reynolds, coefHydraulicResist, frictionPressureLoss, frictionPressureLoss100, frictionPressureLossAll, stationPressure, stationsQuantity, stations} = results;
  const {volCoefA, volCoefB, coefKappa, factVelosity, factReynolds, resistCoef, factSingleMainPumpPressure, factSingleSupPumpPressure, factMainStationPumpPressure, factMainStationPressure, sumThrottlePressure, factVolume} = results;

  const loopingResultsTemplate = createLoopingResultsTemplate(results);
  const pipelineCapicityResultsTemplate = createPipelineCapicityResultsTemplate(results);

  return (
    `<section id="results" class="results">
      <div class="section__container">
        <h2 class="section-heading">Результати розрахунку пропускної здатності магістрального нафтопроводу</h2>

        <div class="data__container data__container--results">
          <table class="data__table data__table--results">
            <thead class="data__table-head">
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Параметр</td>
                <td class="data__table-cell data__table-cell--marking">Позначення</td>
                <td class="data__table-cell data__table-cell--value">Значення</td>
                <td class="data__table-cell data__table-cell--dimension">Розмірність</td>
              </tr>
            </thead>
            <tbody class="data__table-body">
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Визначення розрахункових величин густини, в’язкості та витрати нафти</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Температурна поправка</td>
                <td class="data__table-cell data__table-cell--marking">α</td>
                <td class="data__table-cell data__table-cell--value">${tempCorrection}</td>
                <td class="data__table-cell data__table-cell--dimension">кг/(м<sup>3</sup>·<sup>о</sup>С)</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Густина нафти за температури перекачування
                </td>
                <td class="data__table-cell data__table-cell--marking">ρ<sub>t</sub></td>
                <td class="data__table-cell data__table-cell--value">${density}</td>
                <td class="data__table-cell data__table-cell--dimension">кг/м<sup>3</sup></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт крутизни віскограми</td>
                <td class="data__table-cell data__table-cell--marking">U</td>
                <td class="data__table-cell data__table-cell--value">${viscosityCoef}</td>
                <td class="data__table-cell data__table-cell--dimension">1/<sup>о</sup>C</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">В'язкість нафти за температури перекачування
                </td>
                <td class="data__table-cell data__table-cell--marking">ν</td>
                <td class="data__table-cell data__table-cell--value">${viscosity}</td>
                <td class="data__table-cell data__table-cell--dimension">м<sup>2</sup>/с</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Розрахункове число робочих днів трубопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">N</td>
                <td class="data__table-cell data__table-cell--value">${workingDays}</td>
                <td class="data__table-cell data__table-cell--dimension">діб</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Добовий об'єм перекачування</td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>доб</sub></td>
                <td class="data__table-cell data__table-cell--value">${dailyVolume}</td>
                <td class="data__table-cell data__table-cell--dimension">м<sup>3</sup>/добу</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Годинна продуктивність нафтопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>год</sub></td>
                <td class="data__table-cell data__table-cell--value">${hourlyVolume}</td>
                <td class="data__table-cell data__table-cell--dimension">м<sup>3</sup>/год</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Секундна продуктивність нафтопроводу</td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>сек</sub></td>
                <td class="data__table-cell data__table-cell--value">${secondlyVolume}</td>
                <td class="data__table-cell data__table-cell--dimension">м<sup>3</sup>/с</td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Характеристика основного обладнання нафтоперекачувальної станції</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Напір що створює один основний насос при заданій продуктивності</td>
                <td class="data__table-cell data__table-cell--marking">h</td>
                <td class="data__table-cell data__table-cell--value">${singleMainPumpPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Напір що створює один підпірний насос при заданій продуктивності</td>
                <td class="data__table-cell data__table-cell--marking">h<sub>п</sub></td>
                <td class="data__table-cell data__table-cell--value">${singleSupPumpPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Напір, що створює головна нафтоперекачувальна станція</td>
                <td class="data__table-cell data__table-cell--marking">Н<sub>гнпс</sub></td>
                <td class="data__table-cell data__table-cell--value">${mainStationPumpPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Тиск, що створює головна нафтоперекачувальна станція</td>
                <td class="data__table-cell data__table-cell--marking">Р<sub>гнпс</sub></td>
                <td class="data__table-cell data__table-cell--value">${mainStationPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Проектний гідравлічний розрахунок нафтопроводу</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Внутрішній діаметр трубопроводу</td>
                <td class="data__table-cell data__table-cell--marking">d</td>
                <td class="data__table-cell data__table-cell--value">${diameterCI}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Швидкість рідини в трубопроводі</td>
                <td class="data__table-cell data__table-cell--marking">W</td>
                <td class="data__table-cell data__table-cell--value">${velosity}</td>
                <td class="data__table-cell data__table-cell--dimension">м/с</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Число Рейнольдса</td>
                <td class="data__table-cell data__table-cell--marking">Re</td>
                <td class="data__table-cell data__table-cell--value">${reynolds}</td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт гідравлічного опору</td>
                <td class="data__table-cell data__table-cell--marking">λ</td>
                <td class="data__table-cell data__table-cell--value">${coefHydraulicResist}</td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Втрати напору на тертя по довжині
                  трубопроводу</td>
                <td class="data__table-cell data__table-cell--marking">h<sub>τ</sub></td>
                <td class="data__table-cell data__table-cell--value">${frictionPressureLoss}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Втрати напору на ділянці довжиною 100 км</td>
                <td class="data__table-cell data__table-cell--marking">h<sub>ф</sub></td>
                <td class="data__table-cell data__table-cell--value">${frictionPressureLoss100}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Загальні втрати напору</td>
                <td class="data__table-cell data__table-cell--marking">Н<sub>заг</sub></td>
                <td class="data__table-cell data__table-cell--value">${frictionPressureLossAll}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Напір, що створює проміжна станція</td>
                <td class="data__table-cell data__table-cell--marking">Н<sub>ст</sub></td>
                <td class="data__table-cell data__table-cell--value">${stationPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Розрахункова кількість проміжних
                  перекачувальних станцій</td>
                <td class="data__table-cell data__table-cell--marking">n<sub>р</sub></td>
                <td class="data__table-cell data__table-cell--value">${stationsQuantity}</td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Кількість проміжних
                  перекачувальних станцій</td>
                <td class="data__table-cell data__table-cell--marking">n</td>
                <td class="data__table-cell data__table-cell--value">${stations}</td>
                <td class="data__table-cell data__table-cell--dimension">шт</td>
              </tr>
              ${loopingResultsTemplate}
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Уточнений гідравлічний розрахунок нафтопроводу</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт А математичної моделі сумарної напірної характеристики всіх НПС</td>
                <td class="data__table-cell data__table-cell--marking">А</td>
                <td class="data__table-cell data__table-cell--value">${volCoefA}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт B математичної моделі сумарної напірної характеристики всіх НПС</td>
                <td class="data__table-cell data__table-cell--marking">B</td>
                <td class="data__table-cell data__table-cell--value">${volCoefB}</td>
                <td class="data__table-cell data__table-cell--dimension">c<sup>2</sup>/м<sup>5</sup></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Параметр æ</td>
                <td class="data__table-cell data__table-cell--marking">æ</td>
                <td class="data__table-cell data__table-cell--value">${coefKappa}</td>
                <td class="data__table-cell data__table-cell--dimension">c<sup>2</sup>/м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Швидкість руху нафти</td>
                <td class="data__table-cell data__table-cell--marking">W</td>
                <td class="data__table-cell data__table-cell--value">${factVelosity}</td>
                <td class="data__table-cell data__table-cell--dimension">м/с</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Число Рейнольдса</td>
                <td class="data__table-cell data__table-cell--marking">Re</td>
                <td class="data__table-cell data__table-cell--value">${factReynolds}</td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт гідравлічного опору</td>
                <td class="data__table-cell data__table-cell--marking">λ</td>
                <td class="data__table-cell data__table-cell--value">${resistCoef}</td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Напір, що створює один основний насос</td>
                <td class="data__table-cell data__table-cell--marking">h</td>
                <td class="data__table-cell data__table-cell--value">${factSingleMainPumpPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Напір, що створює один підпірний насос</td>
                <td class="data__table-cell data__table-cell--marking">h<sub>п</sub></td>
                <td class="data__table-cell data__table-cell--value">${factSingleSupPumpPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Напір, що створює ГНПС</td>
                <td class="data__table-cell data__table-cell--marking">H<sub>гнпс</sub></td>
                <td class="data__table-cell data__table-cell--value">${factMainStationPumpPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Тиск, що створює ГНПС</td>
                <td class="data__table-cell data__table-cell--marking">H<sub>гнпс</sub></td>
                <td class="data__table-cell data__table-cell--value">${factMainStationPressure}</td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Сумарний напір, що дроселюється на виході всіх станцій</td>
                <td class="data__table-cell data__table-cell--marking">h'<sub>др</sub></td>
                <td class="data__table-cell data__table-cell--value">${sumThrottlePressure}</td>
                <td class="data__table-cell data__table-cell--dimension">м</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Уточненна фактична пропускна здатності</td>
                <td class="data__table-cell data__table-cell--marking">Q</td>
                <td class="data__table-cell data__table-cell--value">${factVolume}</td>
                <td class="data__table-cell data__table-cell--dimension">м<sup>3</sup>/c</td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Пропускна здатність магістрального нафтопроводу</td>
              </tr>
              ${pipelineCapicityResultsTemplate}
            </tbody>
          </table>
        </div>
      </div>
    </section>`
  );
};

export default class Results extends AbstractView {
  constructor(resultsModel) {
    super();

    this._resultsModel = resultsModel;
  }

  getTemplate() {
    return createResultsTemplate(this._resultsModel.getResults());
  }
}
