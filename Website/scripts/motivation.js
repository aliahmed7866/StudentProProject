window.onload=displayQuote
function displayQuote(){
var message = new Array(12);

message[0] = "Don't be afraid of struggle, it wil bring you closer to your goal :)";
message[1] = "Success is a sum of small efforts, repeated - R Coller ";
message[2] = "Mistakes are proof that you are trying :)";
message[3] = "Work Hard | Dream Big | Never Give Up";
message[4] = "No one is perfect! That's why pencils have erasers ;)";
message[5] = "Strive for progress not perfection.";
message[6] = "It is Ok to feel tired. It is OK to take a break.";
message[7] = "No need to hurry, no need to sparkle, no need to be anybody but oneself - Virginia Woolf ";
message[8] = "If you can dream it, you can do it - Walt Disney ";
message[9] = "Doing the best at this moment puts you in the best place for the next moment - Oprah Winfrey ";
message[10] = "If You Are Working On Something That You Really Care About, You Don't Have To Be Pushed. The Vision Pulls You - Steve Jobs ";
message[11] = "A person who never made a mistake never tried anything new - Albert Einstein ";
var element = document.getElementById("motivationalQuote");
element.innerHTML=message[Math.floor(Math.random() * 12)];

}