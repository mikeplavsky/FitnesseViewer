if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length ) {

chrome.extension.sendRequest( { name: "showPageAction" }, function(){} );

document.body.insertBefore( $( '<div id="fv-scenarios" style="display:none;width:200px;">' )[0] );

chrome.extension.onRequest.addListener(

    function ( request, sender, sendResponse ) {
    
        toggle_scenarios();    
        sendResponse( {} );        
    }
);

};




