window.onload=function(){
    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", storeValues);
}
console.log("scripts.js loaded");
function storeValues() {
    const inputArr = [];
    console.log("save to db clicked");
    const pageOneContents = document.getElementsByClassName('page1');
    for (const element of pageOneContents){
        inputArr.push({key: element.id, value: element.value});
    }
    callAPI(inputArr);
}
// define the callAPI function that takes a first name and last name as parameters
function callAPI(arr) {
    console.log(arr);
    // instantiate a headers object
    var myHeaders = new Headers();
//    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
//    // using built in JSON utility package turn object to string and store in a variable
    arr.forEach(element => {
        var raw = JSON.stringify({"key": element.key,"value": element.value});
        var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch("https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
        .then(response => response.text())
//        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
    });
//    alert("Successfully saved to the database")
};

async function generatePDF(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var downloadURL;
    try{
        let response = await fetch("https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev", requestOptions);
        let data = await response.text();
        downloadURL = JSON.parse(data).url;
        alert(JSON.parse(data).body);
    }catch(error){
    console.log(error);
    }
    window.location.assign(downloadURL);
};