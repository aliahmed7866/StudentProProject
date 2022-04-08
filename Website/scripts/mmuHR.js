///WITH VALIDATION
//declaring global variables
var reference, citation;
var surname, firstname;

// this is to check and replace blank unknown fields with Unknown
function validate(value) {
    if (value == '' || value.toUpperCase == 'UNKNOWN') {
        return 'Unknown';
    } else { // returning the original value if the value is not blank or unknown
        return value;
    }
}

//this validation function is for names only, this caters to out output formatting requirements
function validateName(value) {
    if (value == '' || value.toUpperCase == 'UNKNOWN') { //checking if value i blank or unknown, if this is the case, the assign Unknown to surname and nothing to the first name
        surname = 'Unknown';
        firstname = '';
    } else { // otherwise, split the name using the space as a splitting point
        var name = value.split(" ");
        // taking the last value of the name and assigning it to the surname variable
        surname = titleCase(name[name.length - 1]);
        //only having the first letter of the firstname in the firstname variable as this is the MMU harvard way, and dding a comma before it to help with text format
        firstname = ", " + value.slice(0, 1).toUpperCase();
    }
}

////function for formatting online resource references
function formatMmuHRonline(title, srcProvName, author, url, pubDate, accDate) {
    validateName(author.value);
    var datePub = new Date(pubDate.value);
    var dateAcc = new Date(accDate.value);
    var dpYear = datePub.getFullYear();
    var daYear = dateAcc.getFullYear();
    var daDay = dateAcc.getDay();
    var daMonth = dateAcc.toLocaleString('default', {
        month: 'long'
    }); // turns the moth number from the date into the month name

    reference = surname + firstname + ". (" + dpYear + ")" + " \'" + titleCase(title.value) + "\' " + " " + validate(titleCase(srcProvName.value)).italics() + " [" + "Online" + "] " + daDay + dateExtend(daDay) + " " + daMonth + " [Accessed on " + daDay + dateExtend(daDay) + " " + daMonth + " " + daYear + "] " + url.value;
    citation = "(" + surname + ', ' + dpYear + ")"
    document.querySelector("#mmuHRref").innerHTML = "Reference: " + reference;
    document.querySelector("#mmuHRcit").innerHTML = "Citation: " + citation;
    document.getElementById('copyBtn').removeAttribute('disabled'); // this enables the copy to clipboard button that has been disabled using the disabled attribute inside th HTML element
    return false;
}
//function for formatting offline resource references
function formatMmuHRoffline(title, srcProvName, author, pages, pubDate) {
    validateName(author.value)
    var datePub = new Date(pubDate.value);
    var dpYear = datePub.getFullYear(); // retrieving the year from the date when the source was published 
    reference = surname + firstname + ". (" + dpYear + ")" + " \'" + titleCase(title.value) + "\' " + " " + titleCase(title.value) + "\' " + " " + validate(titleCase(srcProvName.value)).italics() + " pp. " + validate(pages.value); //mmu harvard referencing format
    citation = "(" + surname + ', ' + dpYear + ")" //mmu harvard citation format
    document.querySelector("#mmuHRref").innerHTML = "Reference: " + reference;
    document.querySelector("#mmuHRcit").innerHTML = "Citation: " + citation;
    document.getElementById('copyBtn').removeAttribute('disabled'); // this enables the copy to clipboard button that has been disabled using the disabled attribute inside th HTML element
    return false; // stops page from reloading
}

// this function copies the reference and citation to the clipboard
function copyReference() {
    textToCopy = "Reference: " + reference + "\n" + "Citation: " + citation;
    const elem = document.createElement('textarea');
    elem.style.userSelect = "text";
    elem.value = textToCopy;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}

// this function adds the relevant date extension (st, nd, rd, th) based on the date of the month (e.g. 1st and 22nd)
function dateExtend(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

//function to display offline form fields, triggered by the radio buttons
function displayOfflineForm() {
    document.getElementById("offlineform").style.display = "block"; //this display offline form
    document.getElementById("onlineform").style.display = "none"; //this hides online form
}
//function to display online form fields, triggered by the radio buttons
function displayOnlineForm() {
    document.getElementById("offlineform").style.display = "none";
    document.getElementById("onlineform").style.display = "block";
}

// function for turning a string into title case, capitalisation of the first letter of each word in a string
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}