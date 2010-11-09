var onRequest = function (request, sender, sendResponse) { 
    
    chrome.pageAction.show(sender.tab.id);
    sendResponse({});
    
}

chrome.extension.onRequest.addListener(onRequest);

function handlePageIconClick(tab) {
    chrome.tabs.sendRequest(tab.id, { name: "toggle" }, function(){});
}

chrome.pageAction.onClicked.addListener(handlePageIconClick);