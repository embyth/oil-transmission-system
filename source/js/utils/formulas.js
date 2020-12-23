import {PIPE_ROUGHNESS, END_SUPPORT} from '../const.js';

export const getDeltaZ = (startGeoPoint, endGeoPoint) => {
  return endGeoPoint - startGeoPoint;
};

export const getTemperatureCorrection = (density20) => {
  return 1.825 - 0.001315 * density20;
};

export const getDensity = (density20, temperatureCorrection, oilTemp) => {
  return density20 - temperatureCorrection * (oilTemp - 20);
};

export const getViscosityCoef = (viscosity0, viscosity20) => {
  return 1 / (20 - 0) * Math.log(viscosity0 / viscosity20);
};

export const getViscosity = (viscosity0, viscosityCoef, oilTemp) => {
  return viscosity0 * Math.exp(-viscosityCoef * (oilTemp - 0));
};

export const getDailyVolume = (annualVolume, density, workingDays) => {
  return (1.07 * annualVolume * Math.pow(10, 9)) / (density * workingDays);
};

export const getHourlyVolume = (dailyVolume) => {
  return dailyVolume / 24;
};

export const getSecondlyVolume = (hourlyVolume) => {
  return hourlyVolume / 3600;
};

export const getPumpPressure = (aCoef, bCoef, volume) => {
  return aCoef - bCoef * Math.pow(volume, 2);
};

export const getMainStationPumpPressure = (singleMainPumpPressure, pumpAmount, singleSupPumpPressure) => {
  return singleSupPumpPressure + pumpAmount * singleMainPumpPressure;
};

export const getMainPumpPressureTogather = (pumpAmount, singleMainPumpPressure) => {
  return pumpAmount * singleMainPumpPressure;
};

export const getMainStationPressure = (mainStationPumpPressure, density) => {
  return (density * 9.81 * mainStationPumpPressure) * Math.pow(10, -6);
};

export const getInnerDiameter = (diameter, wall) => {
  return (diameter - 2 * wall);
};

export const getVelocity = (volume, diameter) => {
  return (4 * volume) / (Math.PI * Math.pow(diameter, 2));
};

export const getReynolds = (velosity, diameter, viscosity) => {
  return (velosity * diameter) / (viscosity * Math.pow(10, -6));
};

export const getCoefHydraulicResistLam = (reynolds) => {
  return 64 / reynolds;
};

export const getCoefHydraulicResistTrans = (reynolds) => {
  return (0.16 * reynolds - 13) * Math.pow(10, -4);
};

export const getCoefHydraulicResistBlazius = (reynolds) => {
  return 0.3164 / Math.pow(reynolds, 0.25);
};

export const getCoefHydraulicResistMix = (reynolds, coefB) => {
  return coefB + 1.7 / Math.pow(reynolds, 0.5);
};

export const getResistCoef = (reynolds, paramsByDiameter) => {
  const {reynoldsFirstPassingNumber, reynoldsSecondPassingNumber, reynoldsCoefB} = paramsByDiameter;

  if (reynolds <= 2000) {
    return getCoefHydraulicResistLam(reynolds);
  } else if (reynolds > 2000 && reynolds <= 2800) {
    return getCoefHydraulicResistTrans(reynolds);
  } else if (reynolds > 2800 && reynolds < reynoldsFirstPassingNumber) {
    return getCoefHydraulicResistBlazius(reynolds);
  } else if (reynolds > reynoldsFirstPassingNumber && reynolds < reynoldsSecondPassingNumber) {
    return getCoefHydraulicResistMix(reynolds, reynoldsCoefB);
  } else {
    return 0;
  }
};

export const getCoefHydraulicResistAfter = (reynolds) => {
  return 1 / Math.pow((1.8 * Math.log10(reynolds) - 1.5), 2);
};

export const getCoefHydraulicResistLast = (reynolds, diameter) => {
  return 0.11 * Math.pow((68 / reynolds + PIPE_ROUGHNESS / diameter), 0.25);
};

export const getFrictionPressureLoss = (resistCoef, length, diameter, velosity) => {
  return resistCoef * length / diameter * Math.pow(velosity, 2) / (2 * 9.81);
};

export const getFrictionPressureLossComb = (frictionPressureLoss, dz) => {
  return 1.02 * frictionPressureLoss + dz + END_SUPPORT;
};

export const getStationPressure = (pressureLimit, density, singleSupPumpPressure) => {
  return (pressureLimit * Math.pow(10, 6)) / (density * 9.81) - singleSupPumpPressure;
};

export const getStationsQuantity = (frictionPressureLossAll, stationPressure) => {
  return frictionPressureLossAll / stationPressure;
};

export const getHydraulicTilt = (frictionPressureLoss, lengthCI) => {
  return frictionPressureLoss / lengthCI;
};

export const getCoefW = (reynolds, paramsByDiameter) => {
  const {reynoldsFirstPassingNumber, reynoldsSecondPassingNumber} = paramsByDiameter;

  if (reynolds <= 2800) {
    return 0.5;
  } else if (reynolds > 2800 && reynolds < reynoldsFirstPassingNumber) {
    return 0.297;
  } else if (reynolds > reynoldsFirstPassingNumber && reynolds < reynoldsSecondPassingNumber) {
    return 0.272;
  } else {
    return 0.25;
  }
};

export const getLoopingLength = (hydraulicTilt, stationsQuantity, stations, stationPressure, coefW) => {
  return ((stationsQuantity - stations) * stationPressure) / (1.02 * hydraulicTilt * (1 - coefW));
};

export const getVolumeCoef = (coefSup, pumpAmount, stations, coefMain) => {
  return coefSup + pumpAmount * stations * coefMain;
};

export const getCoefKappa = () => {
  return 1.02 * 8 / (Math.pow(Math.PI, 2) * 9.81);
};

export const getThrottlePressure = (mainStationPressure, pressureLimit, density) => {
  if (mainStationPressure > pressureLimit) {
    return ((mainStationPressure - pressureLimit) * Math.pow(10, 6)) / (density * 9.81);
  } else {
    return 0;
  }
};

export const getSumThrottlePressure = (stations, throttlePressure) => {
  return stations * throttlePressure;
};

export const getFactualVolume = (volCoefA, volCoefB, coefKappa, resistCoef, deltaZ, sumThrottlePressure, lengthCI, diameterCI) => {
  return Math.sqrt((volCoefA - deltaZ - END_SUPPORT - sumThrottlePressure) / (volCoefB + coefKappa * resistCoef * (lengthCI / Math.pow(diameterCI, 5))));
};

export const getAllowablePressure = (pressureLimit, density) => {
  return (pressureLimit * Math.pow(10, 6)) / (density * 9.81);
};

export const getCoefEpsilon = (diameter) => {
  return (2 * PIPE_ROUGHNESS) / (diameter * Math.pow(10, 3));
};

export const getReynoldsFirstNum = (coefEps) => {
  return 59.5 / Math.pow(coefEps, 8 / 7);
};

export const getReynoldsSecondNum = (coefEps) => {
  return (665 - 765 * Math.log10(coefEps)) / coefEps;
};

export const getPumpPressureLoss = (coefKappa, resistCoef, length, diameter, volume, z1, z2) => {
  return coefKappa * resistCoef * ((length * Math.pow(10, 3)) / Math.pow(diameter, 5)) * Math.pow(volume, 2) + (z2 - z1);
};

export const getOutletSupport = (stationPumpPressure, sumPressureLoss) => {
  return stationPumpPressure - sumPressureLoss;
};

export const getExceedingSupport = (outletSupport, minAllowablePressure) => {
  return outletSupport - minAllowablePressure;
};

export const getStationOutletPumpPressure = (stationMainPumpPressureTogather, outletSupport) => {
  return stationMainPumpPressureTogather + outletSupport;
};
