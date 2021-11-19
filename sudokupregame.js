let warning = document.getElementById("introWarning");
function enterLevels(username ,password) {
    if(id("userName").value == username && id("userPass").value == password) {
        window.location = "sudokuLevel.html" + "#" + username;
        
    } else{
        warning.hidden = false;
    };
}



function tryAgain() {
    window.location.href = "sudokuIntro.html";
}


getInfo();
function getInfo(){
    username = window.location.hash.substring(1);
    id("welcome_user").textContent += " " + username;
}



function id(id){
    return document.getElementById(id);
}