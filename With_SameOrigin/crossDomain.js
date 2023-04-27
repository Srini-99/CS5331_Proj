var MessageSender = function(args) {
    args = args || {};
    var targetWindow = args.targetWindow;
    var targetDomain = args.targetDomain || "*";
    var ready = false;
    var sendMessage = function(message) {
        targetWindow.postMessage(message, targetDomain);
    }
    return {
        "sendMessage": sendMessage
    }
}
var MessageReceiver = function (args) {
    args = args || {};
    
    var validOrigin = args.validOrigin || window.location.origin;
    var defaultMsgProcessor = function (e) {
      //this will not be called if callback is applied on the receiver page
            alert("The message is test:\n'" + e.data + "'");
       
    }
    var msgProcessor = args.callback || defaultMsgProcessor;
    var processMessage = function (e) {
        if (validOrigin == "*" || validOrigin == e.origin) {
            msgProcessor(e);
        }
    };
    var startListening = function (onStartCallback) {
       
            if (window.addEventListener) {
                window.addEventListener("message", processMessage, false);
            } else {
                attachEvent("onmessage", processMessage);
            }
           
            if (onStartCallback) onStartCallback();
        
    }

    return {
        "start": startListening
        
    };
};
