module( 'ui', {

	setup: function () {	
	
		$.fx.off = true;

		$( '#fv-scenarios' ).remove();
		$( '#tests' ).remove();
		
		$( 'body' ).append( '<div id="tests">' ).append( '<div id="fv-scenarios">' );
	
		$( '#tests' )
		.append( 
		
			fitnesse.ui.scenario_library( 			
			{ scenarios: 
                        ['Add Farms','Remove Backup','Check Services','Add File','Restore Site','Restore Site Collection', 
                         'Stop Services','Restart Lab','Check SQL Server','Check AD'] }		
			)
		)
        .append(
		
		    fitnesse.ui.complex_scenario ( {scenario: { name: 'Check Registry', calls: [ 'Call SQL', 'Revert Lab' ] } } ),
            fitnesse.ui.complex_scenario ( {scenario: { name: 'Restore DB', calls: [ 'Check SQL Server', 'Check AD' ] } } ),
            fitnesse.ui.complex_scenario ( {scenario: { name: 'Restore Web Application', calls: [ 'Restore Site Collection', 'Restore Site' ] } } ),
            fitnesse.ui.complex_scenario ( {scenario: { name: 'Restore Farm', calls: [ 'Check Services', 'Restore Web Application', 'Restore DB', 'call PowerShell' ] } } )
            
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
	
	equal( $( '#fv-header' ).length, 1, 'header of Scenario Panel');
	equal( $( '#fv-header' ).find( '.fv-view' ).length, 4, 'views of Scenario Panel' );
	
	toggle_scenarios();	
	
	equal( $( '#fv-header' ).length, 0,  'Scenario Panel should be hidden' );
	
});

test( 'switching between views', function () {

    var check_view = function (id,num,msg) {
        deepEqual( $( id ).find('span:eq(0)').text().match( /\d*$/ )[0], num, msg );
    };
	
	check_view( '#fv-view-all', "14", 'number of discovered scenarios' );
    check_view( '#fv-view-used', "11", 'number of used scenarios' );
    check_view( '#fv-view-unused', "3", 'number of unused scenarios' );
    
    var click_view = function (id, num,msg) {
    
        $( id ).click();	
        equal( $( '.fv-scenario' ).length, num, msg );   
        ok( $( id ).hasClass( 'fv-selected-view' ), 'appropriate view must be selected'  );
        equal( $( '.fv-selected-view' ).length, 1, 'just one view is selected' ) 
        
    };
    
    var check_scenario = function (arr) {
        
        $('.fv-scenario' ).each( function (i) {
            i < arr.length && deepEqual( $(this).text(), arr[i], "right scenario name" );
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
	deepEqual( $( '.fv-selected-scenario' ).length, 1, 'selected just one scenario'  );
	
});


test ( 'showing scenario', function () {

	$( '#fv-view-unused' ).click();
    $( '#fv-view-used' ).click();
	
    $( '.fv-scenario:eq(1)' ).click();
    
    deepEqual( $( '.fv-selected-table' ).length, 1, 'just one scenario selected' );
    deepEqual( $( '.fv-selected-row' ).length, 2, 'selected rows' );
    
    ok( $( 'td:contains(Add File)' ).closest( 'table' ).hasClass( 'fv-selected-table' ), 'selected scenario'  );
    ok( $( 'td:contains(Add File)' ).closest( 'tr' ).hasClass( 'fv-selected-row' ), 'selected row'  );    
    
});

test ( 'showing function', function () {

	$( '#fv-view-unused' ).click();
    $( '#fv-view-funcs' ).click();
	
    $( '.fv-scenario:eq(1)' ).click();
    
    deepEqual( $( '.fv-selected-table' ).length, 0, 'no scenario tables selected' );
    deepEqual( $( '.fv-selected-row' ).length, 2, 'selected rows with function' );    
	
	deepEqual( $($( '.fv-selected-row' )[0]).closest( 'table' ).find( 'tr:eq(0)' ).find( 'td:eq(1)' ).text(), "Restore Farm", "function shown in scenario" );
	deepEqual( $($( '.fv-selected-row' )[1]).closest( 'table' ).find( 'tr:eq(0)' ).find( 'td:eq(0)' ).text(), "Script", "function shown in script" );
    
});


test ( 'show all used functions', function () {

	$( '#fv-view-unused' ).click();
    $( '#fv-view-funcs' ).click();

	deepEqual( $( '#fv-view-funcs .fv-show-all' ).css( 'display' ), 'inline', 'should be visible' );		
	deepEqual( $( '#fv-view-unused .fv-show-all' ).css( 'display' ), 'none', 'should be hidden' );		
	
	$( '#fv-view-funcs .fv-show-all').click();
	
	deepEqual( $( '.fv-selected-row' ).length, 3, 'selected rows' );
	
	$.each( ['call PowerShell', 'call PowerShell', 'Call Python'], function(i,v) { 
		deepEqual( $( '.fv-selected-row td').eq(i).text(), v, 'selected function' );
	});	
	
});


test ( 'show all on scenarios', function () {

	$( '#fv-view-funcs' ).click();
	
	function check( id, rows, tables ) {
	
		$( id ).click();
		$( '.fv-show-all').click();
	
		deepEqual( $( '.fv-selected-row' ).length, rows, 'selected rows for ' + id  );
		deepEqual( $( '.fv-selected-table' ).length, tables, 'selected scenarios for ' + id );
	
	}
	
	check( '#fv-view-used' , 12, 11 );	
	check( '#fv-view-unused', 0, 3 );	
	check( '#fv-view-all', 12, 14);
	
});















