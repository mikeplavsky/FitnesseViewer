goog.provide( 'fitnesse.viewer.core' );

var core = fitnesse.viewer.core;

core.scenarios = function () {    
    return $( 'table' ).find( 'td:eq(0)' ).filter( function () { return $(this).text().match( /^scenario$/i ); }  );    
};

core.get_name = function ($row) {
    
    var res = [];
    
    $row.each( function ( i ) {
        res[i] = $(this).text();
    }        
    );    
    
    return res.join( ' ' ).replace( /[_|_$]/g, '' ).replace( / {2,}/g, ' ' ).trim();
};

core.scenario_name = function(sc) {
    
    return core.get_name( sc.parent().find( 'td:odd' ) );
};

core.all_scenarios = function() {
    
    var res = {};
    
    core.scenarios().each( function () {
    
        var name = core.scenario_name( $(this) );
		
        if (!res[name])  {
            res[name] = {};
        }
        
        var s = res[name];
        
        s.name = name;
        s.definition = $(this).closest( 'table' ).html();
		
		s.table = $(this).closest( 'table' );
		s.parent = $(this).closest( 'div' );
        
    });
    
    return res;
};

core.scripts = function () {

    return $( 'table' ).filter( function() {         
            return $(this).find( 'td:eq(0)').filter( function () { return $(this).text().match( /^script$/i );   } ).length !== 0;         
        });    
    
};


core.getQuery = function (text) {
    return text.match( /^(?:Subset|Ordered)? *Query:(.+)/i );
};

core.query_tables = function () {

    var res = [];   

    $( 'table' ).each( function() {         
    
        $(this).find( 'td:eq(0)').each( function() {                
            
            var m = core.getQuery( $(this).html() );                
            m && res.push( { name: m[1], td : $(this) } );
                        
        });         
            
    });
        
    return res;        

};

core.decision_tables = function () {

    var ts = $( 'table' ).filter( function() {         
    
            return $(this).find( 'td:eq(0)').filter( function() {                
            
                var text = $(this).html();
                return ! text.match( /^(comment|script|scenario|import|setup|tear ?down)$/i ) && 
                        text !== "" &&
                        ! core.getQuery( text ) &&
                        ! text.match( /[<>]/ );                
            }).length !== 0;         
            
        }).find( 'td:eq(0)' );
        
    var res = [];    
    ts.each( function () {    
        res.push( { name: core.get_name( $(this).parent().find( 'td:even' ) ), td: $(this) } );    
    }
    );    

    return res;        
    
};

core.script_scenarios = function (scr) {

    var $tr = scr.find( 'tr:eq(0)' ).nextAll();
    
    var res = [];
    
    $tr.each( function () {    
    
        var $td0 = $(this).find( 'td:eq(0)' );
        var text = $td0.html()
        
        if ( text.match( ';$' ) ) {
        
            res.push( {name: text.slice(0,-1), td: $td0 } );
                        
        }
        else if ( text.match( /^start$/i ) ) {}
        else {
        
            var selector =  text.match( '^[\$].*=$' ) || text.match( /^(show|check|reject|ensure)$/i ) ? 'td:odd' : 'td:even';  
            res.push( { name: core.get_name( $(this).find( selector ) ), td: $td0 } );       
        
        }
        
    });
    
    return res;
    
};

core.parse_calls = function () {
    
    var all = core.all_scenarios();
    
    var arr = {};
    var funcs = {};
    
    var parser = function(i,v) {
	
		if ( all[v.name] ) {
            arr[v.name] = { name : v.name };       
        }
        else {
            funcs[v.name] = { name : v.name };
        }
    }

    $.each( core.page_calls(), parser );    
    $.each( core.decision_tables(), parser);    
    $.each( core.query_tables(), parser);
    
    return { scenario_calls: create_array( arr ), func_calls: create_array( funcs) };
};

core.page_calls = function () {

    var all = core.scripts();    
    res = [];    
    
    all.each( function () {
    
        var sns = core.script_scenarios( $(this) );
        
        $.each( sns, function (i,val) {
            res.push( val );
        }                
        );    
    }    
    );
    
    return res;
    
};

















