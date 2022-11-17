const inputArr = [];
//TODO: change onclick to addEventListner
//const savetodb = document.getElementById("savetodb");
//savetodb.addEventListener("click", storeValues());
//console.log(savetodb);
console.log("test");
function storeValues() {
    console.log("save to db clicked");
    const pageOneContents = document.getElementsByClassName('page1');
//    console.log(pageOneContents[0].value)
    for (const element of pageOneContents){
        inputArr.push({key: element.id, value: element.value});
    }
    callAPI(inputArr);
}
// define the callAPI function that takes a first name and last name as parameters
//function callAPI = (fName,lName)=>{s
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
            .then(result => alert(JSON.parse(result).body))
            .catch(error => console.log('error', error));
        });
};

//TODO: fix the result message popping multiple times, fix the doulbe saving issue
////<!--            var raw = JSON.stringify({"fName":fName,"lName":lName});-->
//    // create a JSON object with parameters for API call and store in a variable
//    var requestOptions = {
//        method: 'POST',
//        headers: myHeaders,
//        body: raw,
//        redirect: 'follow'
//    };
//    // make API call with parameters and use promises to get response
//    fetch("https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
//    .then(response => response.text())
//    .then(result => alert(JSON.parse(result).body))
//    .catch(error => console.log('error', error));
//}

//var generatePDF = ()=>{
//    var requestOptions = {
//        method: 'GET',
//        redirect: 'follow'
//    };
//    fetch("https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
//    .then(response => response.text())
//    .then(result => alert(JSON.parse(result).body))
//    .catch(error => console.log('error', error));
//};