export const getWorkingDays = (length, diameter, pipelineCondition) => {
  if (length <= 250) {
    if (diameter <= 820) {
      return 357;
    } else {
      return 355;
    }
  } else if (length > 255 && length <= 500) {
    if (diameter <= 820 && pipelineCondition <= 30) {
      return 356;
    } else if (diameter <= 820 && pipelineCondition > 30) {
      return 355;
    } else if (diameter > 820 && pipelineCondition <= 30) {
      return 353;
    } else {
      return 351;
    }
  } else if (length > 500 && length <= 700) {
    if (diameter <= 820 && pipelineCondition <= 30) {
      return 354;
    } else if (diameter <= 820 && pipelineCondition > 30) {
      return 352;
    } else if (diameter > 820 && pipelineCondition <= 30) {
      return 351;
    } else {
      return 349;
    }
  } else {
    if (diameter <= 820 && pipelineCondition <= 30) {
      return 352;
    } else if (diameter <= 820 && pipelineCondition > 30) {
      return 350;
    } else if (diameter > 820 && pipelineCondition <= 30) {
      return 349;
    } else {
      return 345;
    }
  }
};

export const getLengthInCI = (value, currentDem) => {
  switch (currentDem) {
    case `mm`:
      return value * Math.pow(10, -3);
    case `km`:
      return value * Math.pow(10, 3);
    default:
      return value;
  }
};

export const getParamsByDiameter = (diameter) => {
  const params = {};

  switch (diameter) {
    case 108:
      params.rey1 = 6;
      params.rey2 = 400;
      params.reyB = 180;
      params.Plimit = 9.8;
      break;
    case 159:
      params.rey1 = 10;
      params.rey2 = 700;
      params.reyB = 164;
      params.Plimit = 9.8;
      break;
    case 219:
      params.rey1 = 13;
      params.rey2 = 1000;
      params.reyB = 157;
      params.Plimit = 9.8;
      break;
    case 273:
      params.rey1 = 16;
      params.rey2 = 1200;
      params.reyB = 151;
      params.Plimit = 8.3;
      break;
    case 325:
      params.rey1 = 18;
      params.rey2 = 1600;
      params.reyB = 147;
      params.Plimit = 7.4;
      break;
    case 377:
      params.rey1 = 28;
      params.rey2 = 1800;
      params.reyB = 143;
      params.Plimit = 6.4;
      break;
    case 426:
      params.rey1 = 56;
      params.rey2 = 2500;
      params.reyB = 134;
      params.Plimit = 6.4;
      break;
    case 530:
      params.rey1 = 73;
      params.rey2 = 3200;
      params.reyB = 130;
      params.Plimit = 6.1;
      break;
    case 630:
      params.rey1 = 90;
      params.rey2 = 3900;
      params.reyB = 126;
      params.Plimit = 5.5;
      break;
    case 720:
      params.rey1 = 100;
      params.rey2 = 4500;
      params.reyB = 124;
      params.Plimit = 6.1;
      break;
    case 820:
      params.rey1 = 110;
      params.rey2 = 5000;
      params.reyB = 123;
      params.Plimit = 5.9;
      break;
    case 920:
      params.rey1 = 115;
      params.rey2 = 5500;
      params.reyB = 122;
      params.Plimit = 5.9;
      break;
    case 1020:
      params.rey1 = 120;
      params.rey2 = 6000;
      params.reyB = 121;
      params.Plimit = 5.9;
      break;
    case 1220:
      params.rey1 = 125;
      params.rey2 = 6800;
      params.reyB = 120;
      params.Plimit = 5.5;
      break;
  }

  return {
    reynoldsFirstPassingNumber: params.rey1 * Math.pow(10, 3),
    reynoldsSecondPassingNumber: params.rey2 * Math.pow(10, 3),
    reynoldsCoefB: params.reyB * Math.pow(10, -4),
    pressureLimit: params.Plimit,
  };
};

