WellsFargoAPI = (function() {
  function WellsFargoAPI() {
    this.rates = [
      {term: 10, rate: 4.125, cost: 1275.00},
      {term: 15, rate: 4.275, cost: 1375.00},
      {term: 20, rate: 4.391, cost: 1475.00},
      {term: 30, rate: 4.411, cost: 1575.00}
    ];
  }

  WellsFargoAPI.prototype.getRateAndCostForTerm = function(term) {
      response = this.rates.filter(function(rate) { return rate.term === term })[0];
      return response;
  };
  return WellsFargoAPI;
})();
