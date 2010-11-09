var toggle_scenarios = function () {
    
    if ( $( '#fv-scenarios' ).children().length !== 0 ) {
        
        $( '#fv-scenarios' ).hide();
        $( '#fv-scenarios' ).empty();    
        return;
        
    }
    
    var res = parse_calls();
    show_list(res, res.scenario_calls ); 
    
    $( '#fv-scenarios' ).show();    
};

var show_list = function (res, list) {

    $( '#fv-scenarios' ).empty();    
    sortBy( list, 'name' );    
    
    $( '#fv-scenarios' ).append( $( fitnesse.viewer.scenarios( { scenarios : res.scenario_calls, all_scenarios : scenarios(), functions: res.func_calls, list:  list } ) ) );    
    
    var all = all_scenarios();
    
    $( '.fv-scenario' ).hover( function () { show_scenario(all, $(this)); }, hide_scenario );        
    $( '.fv-view' ).click( function () { toggle_view( $(this) ) } );
	
	$( '.fv-scenario' ).click( function() { open_scenario( all, $(this) ); } );
}

var open_scenario = function(all, $el) {	

	var gif = '/files/images/collapsableOpen.gif'

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
	
	table.css( 'background-color', 'lightgreen' );
	
	var x = table.offset().top - 100;   
    $('html,body').animate( {scrollTop: x}, 500);

}


var toggle_view = function ($el) {

    var res = parse_calls();

    switch ($el.attr( 'id' )) {
    
        case 'fv-view-all':
        
            var arr = [];
            $.each( all_scenarios(), function (x) { arr.push( {name : x} ) } );

            show_list(res, arr );         
            
            break;
            
        case 'fv-view-used':
        
            show_list(res, res.scenario_calls ); 
            break;
            
        case 'fv-view-funcs':
        
            show_list(res, res.func_calls ); 
            break;
    
    };
}

var show_scenario = function (all, $el) {

    var obj = all[ $el.text() ];

    if ( !obj ) {
        return;
    }
    
    var $parent = $( '#fv-scenarios' );
    
    $( document.body ).append( $( fitnesse.viewer.scenario() ) );
    
    var $def = $( '.fv-scenario-def:eq(0)' );
    
    $def.find( 'table' ).append( $( obj.definition ) );    
    $def.css( 'top', $el.position().top + $el.height() * 1.5 );
    
};

var hide_scenario = function () {
    
    $( document.body ).find( '.fv-scenario-def' ).remove();

};