import * as formulas from './formulas.js';
import {getWorkingDays, getLengthInCI, getParamsByDiameter} from './tech.js';
import {spawnErrorMessage} from './common.js';

export const firstCalculation = (data, resultsModel) => {
  const {annualVolume, length, density20, viscosity0, viscosity20, diameter, wall, oilTemp, pipelineCondition, aCoefMain, bCoefMain, aCoefSup, bCoefSup, pumpAmount, startGeoPoint, endGeoPoint} = data;
  const lengthCI = getLengthInCI(length, `km`);
  const paramsByDiameter = getParamsByDiameter(diameter);
  const deltaZ = formulas.getDeltaZ(startGeoPoint, endGeoPoint);

  // Визначення розрахункових величин густини, в’язкості та витрати нафти
  const tempCorrection = formulas.getTemperatureCorrection(density20);
  resultsModel.setResult({tempCorrection: +tempCorrection.toFixed(4)});

  const density = formulas.getDensity(density20, tempCorrection, oilTemp);
  resultsModel.setResult({density: +density.toFixed(1)});

  const viscosityCoef = formulas.getViscosityCoef(viscosity0, viscosity20);
  resultsModel.setResult({viscosityCoef: +viscosityCoef.toFixed(4)});

  const viscosity = formulas.getViscosity(viscosity0, viscosityCoef, oilTemp);
  resultsModel.setResult({viscosity: +viscosity.toFixed(2)});

  const workingDays = getWorkingDays(length, diameter, pipelineCondition);
  resultsModel.setResult({workingDays: +workingDays.toFixed(0)});

  const dailyVolume = formulas.getDailyVolume(annualVolume, density, workingDays);
  resultsModel.setResult({dailyVolume: +dailyVolume.toFixed(1)});

  const hourlyVolume = formulas.getHourlyVolume(dailyVolume);
  resultsModel.setResult({hourlyVolume: +hourlyVolume.toFixed(1)});

  const secondlyVolume = formulas.getSecondlyVolume(hourlyVolume);
  resultsModel.setResult({secondlyVolume: +secondlyVolume.toFixed(4)});

  // Характеристика основного обладнання нафтоперекачувальної станції
  const singleMainPumpPressure = formulas.getPumpPressure(aCoefMain, bCoefMain, secondlyVolume);
  resultsModel.setResult({singleMainPumpPressure: +singleMainPumpPressure.toFixed(1)});

  const singleSupPumpPressure = formulas.getPumpPressure(aCoefSup, bCoefSup, secondlyVolume);
  resultsModel.setResult({singleSupPumpPressure: +singleSupPumpPressure.toFixed(2)});

  const mainStationPumpPressure = formulas.getMainStationPumpPressure(singleMainPumpPressure, pumpAmount, singleSupPumpPressure);
  resultsModel.setResult({mainStationPumpPressure: +mainStationPumpPressure.toFixed(1)});

  const mainStationPressure = formulas.getMainStationPressure(mainStationPumpPressure, density);
  resultsModel.setResult({mainStationPressure: +mainStationPressure.toFixed(3)});

  // Гідравлічний розрахунок нафтопроводу
  const innerDiameter = formulas.getInnerDiameter(diameter, wall);
  const diameterCI = getLengthInCI(innerDiameter, `mm`);
  resultsModel.setResult({diameterCI: +diameterCI.toFixed(3)});

  const velosity = formulas.getVelocity(secondlyVolume, diameterCI);
  resultsModel.setResult({velosity: +velosity.toFixed(3)});

  const reynolds = formulas.getReynolds(velosity, diameterCI, viscosity);
  resultsModel.setResult({reynolds: +reynolds.toFixed(0)});

  const coefHydraulicResist = formulas.getResistCoef(reynolds, paramsByDiameter);
  resultsModel.setResult({coefHydraulicResist: +coefHydraulicResist.toFixed(4)});

  const frictionPressureLoss = formulas.getFrictionPressureLoss(coefHydraulicResist, lengthCI, diameterCI, velosity);
  resultsModel.setResult({frictionPressureLoss: +frictionPressureLoss.toFixed(1)});

  const frictionPressureLoss100 = formulas.getFrictionPressureLoss(coefHydraulicResist, 100000, diameterCI, velosity);
  resultsModel.setResult({frictionPressureLoss100: +frictionPressureLoss100.toFixed(1)});

  const frictionPressureLossAll = formulas.getFrictionPressureLossComb(frictionPressureLoss, deltaZ);
  resultsModel.setResult({frictionPressureLossAll: +frictionPressureLossAll.toFixed(1)});

  const stationPressure = formulas.getStationPressure(paramsByDiameter.pressureLimit, density, singleSupPumpPressure);
  resultsModel.setResult({stationPressure: +stationPressure.toFixed(1)});

  const stationsQuantity = formulas.getStationsQuantity(frictionPressureLossAll, stationPressure);
  resultsModel.setResult({stationsQuantity: +stationsQuantity.toFixed(2)});
  const isLooping = stationsQuantity % 1 < 0.2;
  resultsModel.setResult({isLooping});
  const stations = isLooping ? Math.floor(stationsQuantity) : Math.ceil(stationsQuantity);
  resultsModel.setResult({stations: +stations.toFixed(0)});

  if (isLooping) {
    const hydraulicTilt = formulas.getHydraulicTilt(frictionPressureLoss, lengthCI);
    resultsModel.setResult({hydraulicTilt: +hydraulicTilt.toFixed(4)});
    const coefW = formulas.getCoefW(reynolds, paramsByDiameter);
    resultsModel.setResult({coefW: +coefW.toFixed(3)});
    const loopingLength = formulas.getLoopingLength(hydraulicTilt, stationsQuantity, stations, stationPressure, coefW);
    resultsModel.setResult({loopingLength: +loopingLength.toFixed(1)});
  }

  // Уточнений гідравлічний розрахунок нафтопроводу
  let currentVolume = secondlyVolume;
  let isConditionNotSatisfies = true;
  do {
    const volCoefA = formulas.getVolumeCoef(aCoefSup, pumpAmount, stations, aCoefMain);
    resultsModel.setResult({volCoefA: +volCoefA.toFixed(1)});
    const volCoefB = formulas.getVolumeCoef(bCoefSup, pumpAmount, stations, bCoefMain);
    resultsModel.setResult({volCoefB: +volCoefB.toFixed(1)});

    const coefKappa = formulas.getCoefKappa();
    resultsModel.setResult({coefKappa: +coefKappa.toFixed(5)});

    const factVelosity = formulas.getVelocity(currentVolume, diameterCI);
    resultsModel.setResult({factVelosity: +factVelosity.toFixed(3)});

    const factReynolds = formulas.getReynolds(factVelosity, diameterCI, viscosity);
    resultsModel.setResult({factReynolds: +factReynolds.toFixed(0)});

    const resistCoef = formulas.getResistCoef(factReynolds, paramsByDiameter);
    resultsModel.setResult({resistCoef: +resistCoef.toFixed(4)});

    const factSingleMainPumpPressure = formulas.getPumpPressure(aCoefMain, bCoefMain, currentVolume);
    resultsModel.setResult({factSingleMainPumpPressure: +factSingleMainPumpPressure.toFixed(1)});

    const factSingleSupPumpPressure = formulas.getPumpPressure(aCoefSup, bCoefSup, currentVolume);
    resultsModel.setResult({factSingleSupPumpPressure: +factSingleSupPumpPressure.toFixed(2)});

    const factMainStationPumpPressure = formulas.getMainStationPumpPressure(factSingleMainPumpPressure, pumpAmount, factSingleSupPumpPressure);
    resultsModel.setResult({factMainStationPumpPressure: +factMainStationPumpPressure.toFixed(1)});

    const factMainStationPressure = formulas.getMainStationPressure(factMainStationPumpPressure, density);
    resultsModel.setResult({factMainStationPressure: +factMainStationPressure.toFixed(3)});

    const throttlePressure = formulas.getThrottlePressure(factMainStationPressure, paramsByDiameter.pressureLimit, density);
    resultsModel.setResult({throttlePressure: +throttlePressure.toFixed(2)});

    const sumThrottlePressure = formulas.getSumThrottlePressure(stations, throttlePressure);
    resultsModel.setResult({sumThrottlePressure: +sumThrottlePressure.toFixed(1)});

    const factVolume = formulas.getFactualVolume(volCoefA, volCoefB, coefKappa, resistCoef, deltaZ, sumThrottlePressure, lengthCI, diameterCI);
    resultsModel.setResult({factVolume: +factVolume.toFixed(4)});

    if (Math.abs(currentVolume - factVolume) <= 0.0001) {
      isConditionNotSatisfies = false;
    } else {
      currentVolume = factVolume;
    }
  } while (isConditionNotSatisfies);
};

export const secondCalculation = (data, resultsModel) => {
  const {aCoefMain, bCoefMain, aCoefSup, bCoefSup} = data;
  const {lengths, geoPoints, pumpUnits, pressureMinLimits, pressureMaxLimits} = data;
  const {density, stations, diameterCI, viscosity} = resultsModel.getResults();

  // Пропускна здатність магістрального нафтопроводу
  const kappa = formulas.getCoefKappa();

  let iteration = 0;
  let countingVolume = 0.1;
  let isCondition = true;
  do {
    iteration++;
    countingVolume += 0.0001;

    if (iteration > 100000) {
      spawnErrorMessage(`Розрахунок увійшов у нескінченний цикл! Спробуйте знайти помилку або змініть вихідні дані!`);
      throw new Error(`Розрахунок увійшов у нескінченний цикл!`);
    }

    for (let station = 0; station < stations; station++) {
      const stationResults = {};

      const maxAllowablePressure = formulas.getAllowablePressure(pressureMaxLimits[station], density);
      stationResults.maxAllowablePressure = +maxAllowablePressure.toFixed(1);

      const minAllowablePressure = formulas.getAllowablePressure(pressureMinLimits[station], density);
      stationResults.minAllowablePressure = +minAllowablePressure.toFixed(1);

      const velosityFact = formulas.getVelocity(countingVolume, diameterCI);
      stationResults.velosityFact = +velosityFact.toFixed(4);

      const reynoldsFact = formulas.getReynolds(velosityFact, diameterCI, viscosity);
      stationResults.reynoldsFact = +reynoldsFact.toFixed(0);

      const coefEpsilon = formulas.getCoefEpsilon(diameterCI);
      stationResults.coefEpsilon = +coefEpsilon.toFixed(7);

      const reynoldsFirst = formulas.getReynoldsFirstNum(coefEpsilon);
      stationResults.reynoldsFirst = +reynoldsFirst.toFixed(0);

      const reynoldsSecond = formulas.getReynoldsSecondNum(coefEpsilon);
      stationResults.reynoldsSecond = +reynoldsSecond.toFixed(0);

      let resistCoefFact;
      if (reynoldsFact <= 2320) {
        resistCoefFact = formulas.getCoefHydraulicResistLam(reynoldsFact);
      } else if (reynoldsFact > 2320 && reynoldsFact < reynoldsFirst && reynoldsFact < Math.pow(10, 5)) {
        resistCoefFact = formulas.getCoefHydraulicResistBlazius(reynoldsFact);
      } else if (reynoldsFact > 2320 && reynoldsFact < reynoldsFirst && reynoldsFact > Math.pow(10, 5)) {
        resistCoefFact = formulas.getCoefHydraulicResistAfter(reynoldsFact);
      } else {
        resistCoefFact = formulas.getCoefHydraulicResistLast(reynoldsFact, diameterCI);
      }
      stationResults.resistCoefFact = +resistCoefFact.toFixed(5);

      const sumPressureLoss = formulas.getPumpPressureLoss(kappa, resistCoefFact, lengths[station], diameterCI, countingVolume, geoPoints[station], geoPoints[station + 1]);
      stationResults.sumPressureLoss = +sumPressureLoss.toFixed(1);

      const stationMainPumpPressure = formulas.getPumpPressure(aCoefMain, bCoefMain, countingVolume);
      stationResults.stationMainPumpPressure = +stationMainPumpPressure.toFixed(1);

      const stationMainPumpPressureTogather = formulas.getMainPumpPressureTogather(pumpUnits[station], stationMainPumpPressure);
      stationResults.stationMainPumpPressureTogather = +stationMainPumpPressureTogather.toFixed(1);

      const stationSupPumpPressure = formulas.getPumpPressure(aCoefSup, bCoefSup, countingVolume);
      stationResults.stationSupPumpPressure = +stationSupPumpPressure.toFixed(1);

      let stationPumpPressure = formulas.getMainStationPumpPressure(stationMainPumpPressure, pumpUnits[station], stationSupPumpPressure);
      if (stationPumpPressure >= maxAllowablePressure) {
        stationPumpPressure = maxAllowablePressure;
      }
      stationResults.stationPumpPressure = +stationPumpPressure.toFixed(1);

      const outletSupport = formulas.getOutletSupport(stationPumpPressure, sumPressureLoss);
      stationResults.outletSupport = +outletSupport.toFixed(1);

      const exceedingSupport = formulas.getExceedingSupport(outletSupport, minAllowablePressure);
      stationResults.exceedingSupport = +exceedingSupport.toFixed(1);

      let stationOutletPumpPressure;
      if (station === 0) {
        stationOutletPumpPressure = formulas.getMainStationPumpPressure(stationMainPumpPressure, pumpUnits[station], stationSupPumpPressure);
      } else {
        const previousStationOutletSupport = resultsModel.getResults()[station - 1].outletSupport;
        stationOutletPumpPressure = formulas.getStationOutletPumpPressure(stationMainPumpPressureTogather, previousStationOutletSupport);
      }
      stationResults.stationOutletPumpPressureFull = +stationOutletPumpPressure.toFixed(1);
      if (stationOutletPumpPressure >= maxAllowablePressure) {
        stationOutletPumpPressure = maxAllowablePressure;
      }
      stationResults.stationOutletPumpPressure = +stationOutletPumpPressure.toFixed(1);

      resultsModel.setResult({[station]: stationResults});

      if (exceedingSupport <= 0.1 && exceedingSupport >= -0.1) {
        isCondition = false;
        resultsModel.setResult({stationVolume: +countingVolume.toFixed(4)});
        break;
      }
    }
  } while (isCondition);
};
