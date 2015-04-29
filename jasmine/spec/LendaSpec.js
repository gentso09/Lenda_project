describe("Lenda", function() {

  var lenda;
  var quicken;
  var wells;
  var balance;
  var rate;
  var term;

  beforeEach(function() {
    lenda   = new LendaAPI();
    quicken = new QuickenAPI();
    wells   = new WellsFargoAPI();

    balance = 100000;
    rate    = .05;
    term    = 30;
  });

  it("should have zero payment with zero balance", function() {
    balance = 0;
    var pmt = monthly_payment( balance, rate, term );
    expect(pmt).toEqual(0);
  });

  it("should have monthly payment of $536.82 for 30-year 5% $100,000 mortgage", function() {
    balance = 100000;
    rate    = .05;
    term    = 30;
    var pmt     = monthly_payment( balance, rate, term );
    var diff    = Math.abs( pmt - 536.82 );
    expect(diff).toBeLessThan(0.01);
  });

  it("should see smaller monthly payment for longer mortgage terms", function() {
    terms     = [ 10, 15, 20, 30 ];
    var prev  = monthly_payment( balance, rate, terms[ 0 ] );
    var err   = false;

    for( i = 1; i < terms.length; i++ ) {
      curr = monthly_payment( balance, rate, terms[ i ] );
      if( curr >= prev ) {
        err = true;
        break;
      };
    };
    
    expect(err).toEqual(false);
  });

  it("for Lenda: should not see lower rate AND lower closing cost with longer mortgage term", function() {
    var terms = [ 10, 15, 20, 30 ];
    var prev  = lenda.getRateAndCostForTerm( terms[ 0 ] );

    var err = false;
    for( i = 1; i < terms.length; i++ ) {
      curr = lenda.getRateAndCostForTerm( terms[ i ] );
      if( curr.cost < prev.cost && curr.rate < prev.rate ) {
        err = true;
        break;
      };
    };
    expect(err).toEqual(false);
  });

  it("for Wells: should not see lower rate AND lower closing cost with longer mortgage term", function() {
    var terms = [ 10, 15, 20, 30 ];
    var prev  = wells.getRateAndCostForTerm( terms[ 0 ] );

    var err = false;
    for( i = 1; i < terms.length; i++ ) {
      curr = wells.getRateAndCostForTerm( terms[ i ] );
      if( curr.cost < prev.cost && curr.rate < prev.rate ) {
        err = true;
        break;
      };
    };
    expect(err).toEqual(false);
  });


  it("for Quicken: should not see lower rate AND lower closing cost with longer mortgage term", function() {
    var terms = [ 10, 15, 20, 30 ];
    var prev  = quicken.getRateAndCostForTerm( terms[ 0 ] );

    var err = false;
    for( i = 1; i < terms.length; i++ ) {
      curr = quicken.getRateAndCostForTerm( terms[ i ] );
      if( curr.cost < prev.cost && curr.rate < prev.rate ) {
        err = true;
        break;
      };
    };
    expect(err).toEqual(false);
  });

});