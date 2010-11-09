var create_array = function (map) {
    
    var res = [];
    $.each( map, function (n,v) { res.push( v ); } );    
    
    return res;
    
};

var sortBy = function (arr,attr) {

    arr.sort( function (a,b) {  
        
        if ( a[attr] === b[attr] ) return 0;
        else if (a[attr] > b[attr] ) return 1;
        else return -1;
        
    });

}





