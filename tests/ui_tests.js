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
					[["call PowerShell"],["Call Python"]],
                    [["Add File"]],
					
				]} 		
			)
		
		);
        
        delete fitnesse.viewer.core.all_scenarios.res;
        delete core.parse_calls.res;
        
        toggle_scenarios();	
	
	} 

});

test( 'when clicking adress bar icon scenarios ui is either shown or hidden', function () {
	
	equals( $( '#fv-header' ).length, 1, 'header of Scenario Panel');
	equals( $( '#fv-header' ).find( '.fv-view' ).length, 3, 'views of Scenario Panel' );
	
	toggle_scenarios();	
	
	equals( $( '#fv-header' ).length, 0,  'Scenario Panel should be hidden' );
	
});

test( 'switching between views', function () {
	
	ok( $( '#fv-view-all' ).text().match( /4/ ), 'number of discovered scenarios' );
	
	$( '#fv-view-all' ).click();
	
	equals( $( '.fv-scenario' ).length, 4, 'all discovered scenarios' );
	ok( $( '#fv-view-all' ).hasClass( 'fv-selected-view' ), 'view all must be selected'  );
	
	$( '#fv-view-used' ).click();
	equals( $( '.fv-scenario' ).length, 3, 'used scenarios' );
	equals( $( '.fv-selected-view' ).length, 1, 'just one view is selected' ) 
	ok( $( '#fv-view-used' ).hasClass( 'fv-selected-view' ), 'view used must be selected'  );
	
	$( '#fv-view-funcs' ).click();
	equals( $( '.fv-scenario' ).length, 2, 'used functions' );
	
});


test( 'scenario selection', function () {

	$( '#fv_view_all' ).click();

	$( '.fv-scenario:eq(0)' ).click();
	
	ok( $( '.fv-scenario:eq(0)' ).hasClass( 'fv-selected-scenario' ), 'sceanario is selected on click'  );	
	same( $( '.fv-selected-scenario' ).length, 1, 'selected just one scenario'  );
	
});


test ( 'showing scenario', function () {

    $( '#fv_view_used' ).click();
    $( '.fv-scenario:eq(1)' ).click();
    
    same( $( '.fv-selected-table' ).length, 1, 'just one scenario selected' );
    same( $( '.fv-selected-row' ).length, 2, 'selected rows' );
    
    ok( $( 'td:contains(Add File)' ).closest( 'table' ).hasClass( 'fv-selected-table' ), 'selected scenario'  );
    ok( $( 'td:contains(Add File)' ).closest( 'tr' ).hasClass( 'fv-selected-row' ), 'selected row'  );    
    
});


















