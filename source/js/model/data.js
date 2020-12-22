export default class IncomeData {
  constructor() {
    this._incomeData = {};
  }

  setData(data) {
    this._incomeData = Object.assign(this._incomeData, data);
  }

  getData() {
    return this._incomeData;
  }
}
