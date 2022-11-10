///WITH VALIDATION
function getDef() {
    var word = document.getElementById("wordInput").value; //getting the word that user has input in the text field and assigning it to a variable
    var wordOutput = document.getElementById("wordOutput");
    wordOutput.innerHTML = "Word: " +word;
    var definitionsContainer = document.getElementById("definitions");

    var respCard = document.getElementById('respCard').classList;
    var regexp = /[a-zA-Z]/; // regular expression to ensure that the word only has letters.
    if (regexp.test(word)) { //testing the word and proceeding to start API interaction
        const data = null;

        const xhr = new XMLHttpRequest(); // initiating a XMLHttpRequest, this is a JS tool that allows us to interact with API (e.g. send and get data)
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() { // this operates when the request has been made and server has responded
            if (xhr.status == 404) { // if the server has returned 404, meaning that the word could not be found
                definitionsContainer.innerHTML = 'Sorry, we could not find this word. Please make sure that the spellings are correct :)'; //putting and displaying an error message in the definitions html element
                respCard.remove("bg-success"); // removing the class responsible for green color of the result card
                respCard.add("bg-danger"); //adding class responsible for making the card red, to create an error/warning like display
            } else if (this.readyState === this.DONE) { //else if the request is successful
                respCard.add("bg-success"); //add class responsible for green color of the result box
                respCard.remove("bg-danger"); //removing the red color class as that is for displaying error messages
                var resp = JSON.parse(this.responseText);
                console.log(resp); //see this response for better understanding of the response
                definitionsContainer.innerHTML = "";
                //creating list element containing the result definitions 
                for (i = 0; i < resp.definitions.length; i++) {
                    let a = document.createElement("li");
                    a.innerHTML = resp.definitions[i].definition + " (" + resp.definitions[i].partOfSpeech + ")";
                    definitionsContainer.append(a); //appending the the li element into the ul element of the webpage
                }

            }


        });
        //opening the get request and inserting the query word in the url
        xhr.open("GET", 'https://wordsapiv1.p.rapidapi.com/words/' + word + '/definitions');
        xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
        xhr.setRequestHeader("X-RapidAPI-Key", "API key goes here");
        // sending the request
        xhr.send(data);
    } else { // if the word entered in the text field is not alphabetical, display the error message below
        respCard.remove("bg-success");
        respCard.add("bg-danger");
        definitionsContainer.innerHTML = 'Please Enter a valid word. The word must only contain english alphabets :)';
    }
}
