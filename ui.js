var toggle_scenarios = function () {
    
    if ( $( '#fv-scenarios' ).children().length !== 0 ) {
        
        $( '#fv-scenarios' ).hide();
        $( '#fv-scenarios' ).empty();    
        return;
        
    }
    
    var res = parse_calls();
    show_list(res, res.scenario_calls, 'fv-view-used' ); 
    
    $( '#fv-scenarios' ).show();    
};

var show_list = function ( res, list, id ) {

    $( '#fv-scenarios' ).empty();    
    sortBy( list, 'name' );    
    
    $( '#fv-scenarios' ).append( $( fitnesse.viewer.scenarios( { scenarios : res.scenario_calls, all_scenarios : create_array( all_scenarios() ), functions: res.func_calls, list:  list } ) ) );    
    
    var all = all_scenarios();
    
    $( '.fv-view' ).click( function () { toggle_view( $(this) ) } );	
	$( '.fv-scenario' ).click( function() { open_scenario( all, $(this) ); } );
	
	$( '.fv-selected-table' ).removeClass( 'fv-selected-table' );	
	$( '#' + id ).addClass( 'fv-selected-view' );
};

var open_scenario = function(all, $el) {	

	$( '.fv-selected-table, .fv-selected-scenario' ).removeClass( 'fv-selected-table fv-selected-scenario' );		
	
	$el.addClass( 'fv-selected-scenario' );

	var gif = '/files/images/collapsableOpen.gif';

	$( 'div[class=hidden]' )
	.attr( 'class', 'collapsable' )
	.find( 'img' )
		.attr( 'src',  gif )
	.end()
	.each(
		
		function () {
			$(this).prevAll( 'a' ).find( 'img' ).attr( 'src', gif );			
		}
		
	);		
	
	var table = all[$el.text()].table;
	var x = table.offset().top - 100;
	
	table.addClass( 'fv-selected-table');
	$('body').animate( {scrollTop: x}, 500);    

};


var toggle_view = function ($el) {

	var res = parse_calls();
	var id = $el.attr( 'id' );

    switch (id) {
    
        case 'fv-view-all':
        
            var arr = [];
            $.each( all_scenarios(), function (x) { arr.push( {name : x} ) } );

            show_list(res, arr, id );         
            
            break;
            
        case 'fv-view-used':
        
            show_list(res, res.scenario_calls, id ); 
            break;
            
        case 'fv-view-funcs':
        
            show_list(res, res.func_calls, id ); 
            break;
    
    };
};

var hide_scenario = function () {
    
    $( document.body ).find( '.fv-scenario-def' ).remove();

};