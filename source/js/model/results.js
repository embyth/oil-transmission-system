export default class ResultsData {
  constructor() {
    this._results = {};
  }

  setResult(result) {
    this._results = Object.assign(this._results, result);
  }

  getResults() {
    return this._results;
  }
}
