///WITH VALIDATION
var reference, citation; 
var surname,firstname;

function validate(value){
  if(value==''||value.toUpperCase=='UNKNOWN'){
 return 'Unknown';

}
else{
  return value;
}}
function validateName(value){

 if(value==''||value.toUpperCase=='UNKNOWN'){
  surname= 'Unknown';
  firstname='';
 }
 else{
   var name =value.split(" ");
   surname= capitalizeFirstLetter(name[name.length-1]);
   firstname=", "+value.slice(0,1).toUpperCase();
 }
}


function formatMmuHRonline(title, srcProvName, author,url,pubDate, accDate){
   validateName(author.value);
  var datePub = new Date(pubDate.value);
    var dateAcc = new Date(accDate.value);
    var dpYear = datePub.getFullYear();
    var daYear= dateAcc.getFullYear();
    var daDay=dateAcc.getDay();
   var daMonth =dateAcc.toLocaleString('default', { month: 'long' });

  reference=surname+firstname+". ("+dpYear+")" + " \'"+titleCase(title.value)+"\' "+" "+validate(titleCase(srcProvName.value)).italics()+" ["+"Online"+"] " + daDay + dateExten(daDay)+" "+daMonth+ " [Accessed on " + daDay + dateExten(daDay) +" "+ daMonth+" "+ daYear + "] "+ url.value; 
  citation="("+surname +', '+dpYear+")"     
   document.querySelector("#mmuHRref").innerHTML= "Reference: "+reference;
        document.querySelector("#mmuHRcit").innerHTML="Citation: "+citation;
        document.getElementById('copyBtn').removeAttribute('disabled');
        return false;
      }
function formatMmuHRoffline(title,srcProvName, author,pages,pubDate){
  validateName(author.value)
    var datePub = new Date(pubDate.value);
    var dpYear = datePub.getFullYear();
reference=surname+firstname+". ("+dpYear+")" + " \'"+titleCase(title.value)+"\' "+" "+titleCase(title.value)+"\' "+" "+validate(titleCase(srcProvName.value)).italics() + " pp. "+validate(pages.value);
citation="("+surname +', '+dpYear+")"
  document.querySelector("#mmuHRref").innerHTML= "Reference: "+reference; 
  document.querySelector("#mmuHRcit").innerHTML="Citation: "+citation;
  document.getElementById('copyBtn').removeAttribute('disabled');
  return false;
}

function copyReference(){
  textToCopy= "Reference: " + reference +"\n"+ "Citation: "+ citation;
  const elem = document.createElement('textarea');
  elem.style.userSelect="text";
  elem.value = textToCopy;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem); 
}
 function dateExten(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
function displayOfflineForm(){
  document.getElementById("offlineform").style.display="block";
  document.getElementById("onlineform").style.display="none";
}
function displayOnlineForm(){
  document.getElementById("offlineform").style.display="none";
  document.getElementById("onlineform").style.display="block";
}
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}