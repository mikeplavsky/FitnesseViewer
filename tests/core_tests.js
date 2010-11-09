module( 'core ', {

	setup : function() {
		
		$( '#tests' ).remove();
		$( 'body' ).append( '<div id="tests">' );
		
	}
	
});

var table = function () {
        
        var res = $( '<table>' );
        
        $.each( arguments, function (i,v) {
            res.append( v);
        });        
        
        return res;
        
};

test( 'discovery of scenarios', function () {

    $( '#tests' )
    
    .append( table( '<td>scenario' ) )
    .append( table( '<td>scenario', '<td>' ) )
    .append( table( '<td>' ) );
    
    
    var len = scenarios().length;
    equals( len, 2, 'found scenarios'	);
    
});

test( 'getting scenario names', function () {

    $( '#tests' )
    .append( table( '<td>scenario<td>first' ) )
    .append( table( '<td>scenario<td>create<td><td>farm' ) );
    
    var all = scenarios();
    
    var name = scenario_name( all.eq( 0 ) );
    equals( name, 'first', 'simple name: one cell' );
    
    name = scenario_name( all.eq( 1 ) );
    equals( name, 'create farm', 'scenario name scattered through several cells'	);
});


test( 'getting all script tables', function() {

    $( '#tests' )
    
    .append( table( '<td>script' ) )
    .append( table( '<td>Script' ) )
    .append( table( '<td>script' ) );

    var len = scripts().length;
    equals( len, 3, 'found scripts' ); 
});


test( 'getting all scenario calls', function () {
    
    $( '#tests' )
    
    .append( table(
            
            '<tr><td>script',            
            '<tr><td>reject<td>create<td><td>farm',
            '<tr><td>check<td>super farm',
            '<tr><td>Ensure<td>delete farm',
            '<tr><td>show<td>backup farm' 
            
            )
    )
    .append( 
    
        table(
        
            '<tr><td>script',   
            '<tr><td>restore<td><td>results',
            '<tr><td>restore;<td><td>results',
            '<tr><td>Start<td>get data',            
            '<tr><td>$super=<td>get data' )            
    );

    var scenarios = page_calls();
    
    equals( 7, scenarios.length, 'number of calls'	);    
    
    equals( scenarios[ 0 ], 'create farm', 'reject should be skipped' );
    equals( scenarios[ 1 ], 'super farm', 'check should be skipped' );
    equals( scenarios[ 2 ], 'delete farm', 'ensure should be skipped' );
    equals( scenarios[ 3 ], 'backup farm', 'show should be skipped' );
    
    equals( scenarios[ 4 ], 'restore results', 'two cells' );
    equals( scenarios[ 5 ], 'restore', '; at the end' );     
    equals( scenarios[ 6 ], 'get data', 'symbol should be skipped' );
    
});

test( 'getting scenario name and definition', function () {

    var table1 = table( '<tbody><tr id=""><td>scenario</td><td>create one</td></tr><tr><td>one</td></tr></tbody>' );
    var table2 = table( '<tr><td>scenario</td><td>create</td><td>P1</td><td>two</td></tr><tr><td>two</td></tr>' );

    $( '#tests' )    
    .append( table1  )
    .append( table2  );
    

    var all = all_scenarios();
    
    equals( all[ 'create one' ].name, 'create one', 'first scenario name' );    
    equals( all[ 'create two' ].name, 'create two', 'second scenario name' );

    equals( all[ 'create one' ].definition, table1[0].innerHTML, 'first scenario definition' );   
});


test( 'getting if call is scenario or function call', function () {

    $( '#tests' )
    .append( table( '<td>Scenario<td>Add Farm' ) )
    .append( table( '<td>Scenario<td>Create Site' ) )
    
    .append( table( '<td>Create Site' ) )
    
    .append( table( '<td>�reate Doc Lib' ) )
    .append( table( '<td>�reate Document' ) )
    .append( table( '<td>�reate List' ) )
    .append( table( '<td>�reate List Item' ) );

    var res = parse_calls();
    
    equals( res.scenario_calls.length, 1, 'scenario calls' );    
    equals( res.func_calls.length, 4, 'function calls' );    

});


test( 'parsing of query tables', function () {
    
    $( '#tests' )   
    
    .append( table( '<tr><td>Query:Add Farm' ) )
    .append( table( '<tr><td>Query:' ) )
    .append( table( '<tr><td>Query:Create<td>Site' ) )
    
    
    .append( table( '<tr><td>Subset Query:Add Farm' ) )
    .append( table( '<tr><td>Ordered Query:Add Farm' ) );
    
    
    var all = query_tables();
    
    equals( all.length, 4, 'found query tables' ); 
    
    equals( all[0], 'Add Farm', 'first query table call' );     
    equals( all[1], 'Create', 'second query table call' );     
});


test( 'parsing of decision tables', function () {

    $( '#tests' )
    
    .append( table( '<tr><td>Add Farm' ) )
    .append( table( '<tr><td>Add<td><td>Farm To MMC' ) )
    
    .append(table( '<tr><td>tear down' ) )
    .append(table( '<tr><td>script' ) )
    .append(table( '<tr><td>comment' ) )
    .append(table( '<tr><td>Import' ) )
    .append(table( '<tr><td>Setup' ) )
    .append(table( '<tr><td>scenario' ) )
    
    .append( table( '<tr><td><input>Wow!' ))
    .append( table( '<tr><td>' ))
    
    .append(table( '<tr><td>Query:create it' ) );
    
    var all = decision_tables();
    
    equals( all.length, 2, 'found decision tables' );
    
    equals( all[0], 'Add Farm', 'simple name' );
    equals( all[1], 'Add Farm To MMC', 'several cells name' );
    
});


test( 'sorting array of objects by given attribute', function () {
    
    var arr = [ { name: 'Boris', order: 0 }, {name : 'Adam', order: 2 }, {name: 'Lem', order: 1 } ];
    
	sortBy( arr, 'name' );    
    equals( arr[0].name, 'Adam', 'sorting by name' );    
	
	sortBy( arr, 'order' );
	equals( arr[0].name, 'Boris', 'sorting by order' );    
});


test( 'convert object into simple array, attributes are lost!', function () {

    var map = {a:10, b: 20, attr: 12 };
    var res = create_array( map );
    
    same( [10,20,12], res, 'final array' );
    
});

function show_big_list() {

    $( 'body' ).append( '<div id="fv_scenarios" style="display:none;width:200px;">' ); 
    
    var res = parse_calls();
    
    var arr = [];    
    for (var i = 0; i < 40; ++i ) {
        arr.push( { name : "long name scenario should be wrapped" + i } );
    }
    
    var arr = [ { name: 'InstallSiteAdminConsolewithparamsandInstallSiteAdminConsolewithparamsand' }, {name : 'Add Farm by SiteAdmin Console' }, {name: 'Lem'} ];
    
    show_list(res, arr ); 
    
    $( '#fv_scenarios' ).show();
    
    console.log( res );
    
}






















