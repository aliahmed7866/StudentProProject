window.onload=displayQuote
function displayQuote(){
var message = new Array(7);

message[0] = "Dont be afraid of struggle, it wil bring you closer to your goal :)";
message[1] = "Success is a sum of small efforts, repeated - R Coller ";
message[2] = "Mistakes are proof that you are trying :)";
message[3] = "Work Hard | Dream Big | Never Give Up";
message[4] = "No one is perfect! That's why pencils have erasers ;)";
message[5] = "Strive for progress not perfection.";
message[6] = "It is Ok to feel tired. It is OK to take a break.";
var element = document.getElementById("motivationalQuote");
element.innerHTML=message[Math.floor(Math.random() * 7)];

}