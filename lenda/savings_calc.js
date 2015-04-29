monthly_payment = function( loan_amount, annual_interest_rate, term ) {
	var monthly_interest_rate = annual_interest_rate / 12;
	var payment               = loan_amount * monthly_interest_rate * Math.pow( 1 + monthly_interest_rate, 12 * term ) / ( Math.pow( 1 + monthly_interest_rate, 12 * term ) - 1 );
	return payment;
}

savings_calc = function( old_monthly_payment, new_monthly_payment, total_payments) {
	var savings = ( old_monthly_payment - new_monthly_payment ) * total_payments;
	return savings;
}

populate_savings = function( balance, rem_term, new_term, pmt ) {
	// canon-ize variables
	rate 	/= 100;
	new_term = parseInt( new_term );

    // calculate Lenda payment
	var lenda     = new LendaAPI();
    var response  = lenda.getRateAndCostForTerm( parseInt( new_term ) );
    var lenda_pmt = monthly_payment( balance, response.rate / 100, new_term );

	document.getElementById( 'lenda_rate' 		  ).value = response.rate;
	document.getElementById( 'lenda_closing_cost' ).value = response.cost;
	document.getElementById( 'lenda_pmt'		  ).value = lenda_pmt;
	document.getElementById( 'lenda_savings'	  ).value = savings_calc( pmt, lenda_pmt, rem_term * 12 );

    // calculate Quicken payment
    var quicken     = new QuickenAPI();
    response	    = quicken.getRateAndCostForTerm( parseInt( new_term ) );
    var quicken_pmt = monthly_payment( balance, response.rate / 100, new_term );

	document.getElementById( 'quicken_rate' 	    ).value = response.rate;
	document.getElementById( 'quicken_closing_cost' ).value = response.cost;
	document.getElementById( 'quicken_pmt'		    ).value = quicken_pmt;
	document.getElementById( 'quicken_savings'	    ).value = savings_calc( pmt, quicken_pmt, rem_term * 12 );

    // calculate Wells payment
    var wells     = new WellsFargoAPI();
    response	  = wells.getRateAndCostForTerm( parseInt( new_term ) ); 
    var wells_pmt = monthly_payment( balance, response.rate / 100, new_term );

	document.getElementById( 'wells_rate'    	    ).value = response.rate;
	document.getElementById( 'wells_closing_cost'   ).value = response.cost;
	document.getElementById( 'wells_pmt'		    ).value = wells_pmt;
	document.getElementById( 'wells_savings'	    ).value = savings_calc( pmt, wells_pmt, rem_term * 12 );

	return;
}