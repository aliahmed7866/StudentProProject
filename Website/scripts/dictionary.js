///WITH VALIDATION
function getDef(){
    var word=document.getElementById("wordInput").value;
    var definitionsContainer=document.getElementById("definitions");
    var respCard=document.getElementById('respCard').classList;
    var regexp = /[a-zA-Z]/;
    if(regexp.test(word)){
    const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if(xhr.status == 404){
        var resp=JSON.parse(this.responseText);
        definitionsContainer.innerHTML='Sorry, we could not find this word. Please make sure that the spellings are correct :)';
        respCard.remove("bg-success");
        respCard.add("bg-danger");
    }
	else if (this.readyState === this.DONE) {
        respCard.add("bg-success");
       respCard.remove("bg-danger");
		var resp=JSON.parse(this.responseText);
        console.log(resp);
        document.getElementById("wordOutput").innerHTML= "Word: " +word ;
            definitionsContainer.innerHTML="";
        for(i=0; i<resp.definitions.length; i++){
           let a= document.createElement("li");
           a.innerHTML=resp.definitions[i].definition+ " ("+resp.definitions[i].partOfSpeech+")";
           definitionsContainer.append(a)
              }
        
	}
  
 
});

xhr.open("GET", 'https://wordsapiv1.p.rapidapi.com/words/'+word+'/definitions');
xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
xhr.setRequestHeader("X-RapidAPI-Key", "4f80490d25msh133ceb32ae5ae53p191d07jsnc13a0a1d0105");

xhr.send(data);
    }
    else{
        respCard.remove("bg-success");
        respCard.add("bg-danger");
        definitionsContainer.innerHTML='Please Enter a valid word. The word must only contain english alphabets :)';
    }
}