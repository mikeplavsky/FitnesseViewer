module( 'ui', {

	setup: function () {	

		$( '#fv-scenarios' ).remove();
		$( '#tests' ).remove();
		
		$( 'body' ).append( '<div id="tests">' ).append( '<div id="fv-scenarios">' );
	
		$( '#tests' )
		.append( 
		
			fitnesse.ui.scenario_library( 			
			{ scenarios: 
                        ['Add Farms','Remove Backup','Check Services','Add File','Restore Site','Restore Site Collection', 
                         'Stop Services','Restart Lab','Check SQL Server','Check AD','Check Registry'] }		
			)
		)
        .append(
            
            fitnesse.ui.complex_scenario ( {scenario: { name: "Restore DB", calls: [ 'Check SQL Server', 'Check AD' ] } } ),
            fitnesse.ui.complex_scenario ( {scenario: { name: "Restore Web Application", calls: [ 'Restore Site Collection', 'Restore Site' ] } } ),
            fitnesse.ui.complex_scenario ( {scenario: { name: "Restore Farm", calls: [ 'Check Services', 'Restore Web Application', 'Restore DB' ] } } )
            
        )
		.append(
		
			fitnesse.ui.scripts( 			
			{ scripts: [
			
					[["Add Farms"],["Remove Backup"]],
					[["Add File"]],
					[["call PowerShell"],["Call Python"]],
                    [["Add File"]],
                    [["Restore Farm"]]
					
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
	equals( $( '#fv-header' ).find( '.fv-view' ).length, 4, 'views of Scenario Panel' );
	
	toggle_scenarios();	
	
	equals( $( '#fv-header' ).length, 0,  'Scenario Panel should be hidden' );
	
});

test( 'switching between views', function () {

    var check_view = function (id,num,msg) {
        same( $( id ).text().match( /\d*$/ )[0], num, msg );
    };
	
	check_view( '#fv-view-all', "14", 'number of discovered scenarios' );
    check_view( '#fv-view-used', "11", 'number of used scenarios' );
    check_view( '#fv-view-unused', "3", 'number of unused scenarios' );
    
    var click_view = function (id, num,msg) {
    
        $( id ).click();	
        equals( $( '.fv-scenario' ).length, num, msg );   
        ok( $( id ).hasClass( 'fv-selected-view' ), 'appropriate view must be selected'  );
        equals( $( '.fv-selected-view' ).length, 1, 'just one view is selected' ) 
        
    };
    
    var check_scenario = function (arr) {
        
        $('.fv-scenario' ).each( function (i) {
            i < arr.length && same( $(this).text(), arr[i], "right scenario name" );
        });
    
    };
    
    click_view( '#fv-view-all', 14, 'all discovered scenarios' );    
    check_scenario( ['Add Farms', 'Add File', 'Check AD', 'Check Registry' ] );
	
	click_view('#fv-view-used', 11, 'used scenarios' );    
    check_scenario( ['Add Farms', 'Add File', 'Check AD', 'Check SQL Server' ] );
    
    click_view( '#fv-view-unused', 3, 'unused scenarios' );
    check_scenario( ['Check Registry', 'Restart Lab', 'Stop Services' ] );
	
	click_view( '#fv-view-funcs', 2, 'used functions' );
    check_scenario( ['Call Python', 'call PowerShell' ] );
	
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


















