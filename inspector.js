if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {

chrome.extension.sendRequest( { name: "showPageAction" }, function(){} );

document.body.insertBefore( $( '<div id="fv-scenarios" style="display:none;">' )[0], document.body.firstChild );

chrome.extension.onRequest.addListener(

    function ( request, sender, sendResponse ) {
    
        toggle_scenarios();    
        sendResponse( {} );        
    }
);

};




