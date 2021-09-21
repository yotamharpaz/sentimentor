
const playButton = document.getElementById("submit");
playButton.addEventListener("click", () => textCheck().catch(() => {
    stopLoading();
    document.getElementById("err").style.display = "block"
}))

async function textCheck(){
    startLoading();

    const inputText = JSON.stringify(document.getElementById("textInput").value);

    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"     
        },
        body: JSON.stringify({ "text": inputText})
    }).catch( () => {
        stopLoading();
        document.getElementById("err").style.display = "block"   
    });

    catResponse(response);

    const answer = await response.json();

    const textPolarityElem = document.getElementById("polarity");
    textPolarityElem.textContent = answer.result.polarity;

    const textTypeElem = document.getElementById("type");
    textTypeElem.textContent = answer.result.type;

    colorClassByPolarity(answer.result.polarity);

    stopLoading();
}

function colorClassByPolarity(polarity) {
    const elem = document.getElementById("answer")
    if(polarity > 0){
        elem.style.color = "green"
        elem.style.background = "none"
    }else if(polarity === 0) {
       elem.style.color = "grey"
       elem.style.background = "white";
    }else{
        elem.style.color = "red";
        elem.style.background = "none"
        
    }

}
function stopLoading() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("answer").style.display = "block";
}

function startLoading() {
document.getElementById("err").style.display = "none";
document.getElementById("loader").style.display = "block";
document.getElementById("answer").style.display = "none";
}

async function catResponse(response){
document.getElementById("httpCat").src = `https://http.cat/${response.status}`;
}
  
   