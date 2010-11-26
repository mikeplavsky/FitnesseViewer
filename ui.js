goog.require( 'fitnesse.viewer.core');

var core = fitnesse.viewer.core;

var toggle_scenarios = function () {
    
    if ( $( '#fv-scenarios' ).children().length !== 0 ) {
        
        $( '#fv-scenarios' ).hide();
        $( '#fv-scenarios' ).empty();    
        return;
        
    }
    
    var res = core.parse_calls();
    show_list(res, res.scenario_calls, 'fv-view-used' ); 
    
    $( '#fv-scenarios' ).show();    
};

var show_list = function ( res, list, id ) {

    $( '#fv-scenarios' ).empty();    
    sortBy( list, 'name' );    
    
    $( '#fv-scenarios' ).append( $( fitnesse.viewer.scenarios( { scenarios : res.scenario_calls, all_scenarios : create_array( core.all_scenarios() ), functions: res.func_calls, list:  list } ) ) );    
    
    var all = core.all_scenarios();
    
    $( '.fv-view' ).click( function () { toggle_view( $(this) ) } );	
	$( '.fv-scenario' ).click( function() { open_scenario( all, $(this) ); } );
	
	$( '.fv-selected-table, .fv-selected-row' ).removeClass( 'fv-selected-table fv-selected-row' );	
    
	$( '#' + id ).addClass( 'fv-selected-view' );
    
};

var open_scenario = function(all, $el) {	

	$( '.fv-selected-table, .fv-selected-scenario, .fv-selected-row, .hidden' ).removeClass( 'fv-selected-table fv-selected-scenario fv-selected-row hidden' );
	
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
	
    var sc = all[ $el.text() ];
    
	var table = sc.table.addClass( 'fv-selected-table');
	var x = table.offset().top - 100;
	
	$('body').animate( {scrollTop: x}, 500);    
    
    sc.back_links && $.each( sc.back_links, function () {
        $( this.td ).parent().addClass( 'fv-selected-row' ); 
    });

};


var toggle_view = function ($el) {

	var res = core.parse_calls();
	var id = $el.attr( 'id' );

    switch (id) {
    
        case 'fv-view-all':
        
            var arr = [];
            $.each( core.all_scenarios(), function (x) { arr.push( {name : x} ) } );

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