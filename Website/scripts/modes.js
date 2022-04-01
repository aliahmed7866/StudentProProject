    
var darkModeBtn= document.querySelector('#modeBtn');
var revertModeBtn= document.querySelector('#revertModeBtn'); 
darkModeBtn.addEventListener("click", changeModes);
revertModeBtn.addEventListener("click", revertMode);


function changeModes(){
    document.body.style.backgroundColor="#333333";
    document.getElementById('modeBtn').style.display="none";
    document.getElementById('revertModeBtn').style.display="block"

}
function revertMode(){
    document.body.style.backgroundColor="#f2f2f2";
    document.getElementById('modeBtn').style.display="block";
    document.getElementById('revertModeBtn').style.display="none";
}
function slider(){
    document.getElementById("intro").style.animation="slider 2s ease-in-out forwards";
}