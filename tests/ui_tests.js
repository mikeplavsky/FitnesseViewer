module( 'ui', {

	setup: function () {	

		$( '#fv-scenarios' ).remove();
		$( '#tests' ).remove();
		
		$( 'body' ).append( '<div id="tests">' ).append( '<div id="fv-scenarios">' );
	
		$( '#tests' )
		.append( 
		
			fitnesse.ui.scenario_library( 			
			{ scenarios: [{name: "Add Farms" },{name: "Remove Backup"},{name: "Check Services" }, {name: "Add File" }] }		
			)
		)
		.append(
		
			fitnesse.ui.scripts( 			
			{ scripts: [
			
					[["Add Farms"],["Remove Backup"]],
					[["Add File"]],
					[["call PowerShell"],["Call Python"]]
					
				]} 		
			)
		
		);

	
	} 

});

test( 'when clicking adress bar icon scenarios ui is either shown or hidden', function () {
	
	toggle_scenarios();	
	
	equals( $( '#fv-header' ).length, 1, 'header of Scenario Panel');
	equals( $( '#fv-header' ).find( '.fv-view' ).length, 3, 'views of Scenario Panel' );
	
	toggle_scenarios();	
	
	equals( $( '#fv-header' ).length, 0,  'Scenario Panel should be hidden' );
	
});

test( 'switching between views', function () {
	
	toggle_scenarios();
	ok( $( '#fv-view-all' ).text().match( /4/ ), 'number of discovered scenarios' );
	
	$( '#fv-view-all' ).click();
	equals( $( '.fv-scenario' ).length, 4, 'all discovered scenarios' );
	
	$( '#fv-view-used' ).click();
	equals( $( '.fv-scenario' ).length, 3, 'used scenarios' );
	
	$( '#fv-view-funcs' ).click();
	equals( $( '.fv-scenario' ).length, 2, 'used functions' );
	
});


















