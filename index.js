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
    });

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
    }else if(polarity === 0) {
       elem.style.color = "grey"
    }else{
        elem.style.color = "red";
    }

}
function stopLoading() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("answer").style.display = "block";
  }

  function startLoading() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("answer").style.display = "none";
  }
