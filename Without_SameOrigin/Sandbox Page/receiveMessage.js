function receiveMessage(event){
        
    // Create a new paragraph element with the comment text
    var newComment = document.createElement("p");
    newComment.innerHTML = event.data;
    console.log(logs);

    var sender = event.source;

    var commentSection = document.getElementById("commentSection");

    setTimeout(() => {

    if (logs.indexOf("Alert() found.") === -1 && logs.indexOf("Eval() found." === -1)){
      console.log("Inside if");
      console.log(logs);

      // Append the newcomment value
      commentSection.appendChild(newComment);
  
      // Post back the message
      sender.postMessage(newComment,"*");
  
      } else {
        console.log("Inside else");
        console.log(logs);
        
        logs = logs.replace(/\n/g, "<br>");
        var logsEle = document.createElement("p");
        logsEle.innerHTML = logs;
  
        console.log(logsEle)
  
      // Append the logs value
      commentSection.appendChild(logsEle);
  
      // Post back the message
      sender.postMessage(logsEle,"*");
      }
    }, 250);

}