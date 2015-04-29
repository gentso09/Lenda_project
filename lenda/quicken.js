QuickenAPI = (function() {
	function QuickenAPI() {
		this.rates = getQuickenRates();		
	}

	function getQuickenRates() {
	  // Fake AJAX call to Quicken
	  return rates = [ 
	    {term: 10, rate: 4.075, cost: 950.00},
	    {term: 15, rate: 4.130, cost: 1000.00},
	    {term: 20, rate: 4.223, cost: 1050.00},
	    {term: 30, rate: 4.397, cost: 1100.00}
	  ];
	};
  
  	QuickenAPI.prototype.getRateAndCostForTerm = function(term) {
    	response = this.rates.filter(function(rate) { return rate.term === term })[0];
    	return response;
  };

  return QuickenAPI;
})();
