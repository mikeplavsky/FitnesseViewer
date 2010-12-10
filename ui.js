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
    list.sort();
    
    var all = create_array( core.all_scenarios() ).length;
    var used = res.scenario_calls.length;
    
    $( '#fv-scenarios' ).append( $( fitnesse.viewer.scenarios({ 
                        
                          all_scenarios : all,   
                          scenarios : used,
                          unused_scenarios : all - used, 
                          functions: res.func_calls.length,                          
                          list:  list 
                        
                        })));    
    
    var all = core.all_scenarios();
	
	$( '.fv-view' ).click( function () { toggle_view( $(this) ) } );	
	$( '.fv-scenario' ).click( function() { open_scenario( all, $(this) ); } );
	
	$( '.fv-selected-table, .fv-selected-row' ).removeClass( 'fv-selected-table fv-selected-row' );	
    
	$( '#' + id ).addClass( 'fv-selected-view' );    
	
	$( '.fv-show-all' ).hide();
	$( '#' + id ).find( '.fv-show-all' ).show();
    
};

var expand_all_scenarios = function () {

    $( '.fv-selected-table, .fv-selected-scenario, .fv-selected-row' ).removeClass( 'fv-selected-table fv-selected-scenario fv-selected-row' );
    
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

    $( '.hidden' ).removeClass( 'hidden' );

}

var position_to_obj = function (obj) {

    var x = obj.offset().top - 100;	
	$('body').animate( {scrollTop: x}, 500);        

}

var open_scenario = function(all, $el) {	

	expand_all_scenarios();
	
	$el.addClass( 'fv-selected-scenario' );

	var sc = all[ $el.text() ];
	
	function highlight_rows(obj) {
		
		obj.back_links && $.each( obj.back_links, function () {
			$( this.td ).parent().addClass( 'fv-selected-row' ); 
		});		
		
	}
	
	if (sc) {
    
		sc.table.addClass( 'fv-selected-table');
		
		position_to_obj( sc.table );  		
		highlight_rows(sc);
		
	}
	else { 
	
		var f = core.parse_calls.res.funcs[ $el.text() ];
		
		if ( f.back_links ) {
		
			var x = f.back_links[0].td;
			
			$.each( f.back_links, function () {
				if ( this.td.offset().top < x.offset().top ) {
					x = this.td;
				};
			});
			
			position_to_obj( x );
			highlight_rows(f);
		}
	}

};


var toggle_view = function ($el) {
    "use strict"

	var res = core.parse_calls();
	var id = $el.attr( 'id' );
	
	switch (id) {
    
        case 'fv-view-all':
        
            var arr = [];
            $.each( core.all_scenarios(), function (x) { arr.push( x ) } );

            show_list(res, arr, id );         
            
            break;
            
        case 'fv-view-used':
        
            show_list(res, res.scenario_calls, id ); 
            break;
            
        case 'fv-view-unused':
        
            var arr = [];
            
            $.each( core.all_scenarios(), function (x) {                 
                (res.scenario_calls.indexOf(x) == -1) && arr.push( x )                 
            });

            show_list(res, arr, id );   
            
            break;
            
        case 'fv-view-funcs':
        
            show_list(res, res.func_calls, id ); 
            break;
    
    };
};

var hide_scenario = function () {
    
    $( document.body ).find( '.fv-scenario-def' ).remove();

};