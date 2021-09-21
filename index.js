async function textCheck(){
    // remove data
    // create cool loading spinner
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
     colorClassByPolarity(answer.result.polarity)
}

function colorClassByPolarity(polarity) {
    const elem = document.getElementById("answer")
    if(polarity > 0){
        elem.classList.remove("bad");
        elem.classList.remove("natural");
        elem.classList.add("good")

    }else if(polarity === 0) {
        elem.classList.remove("bad");
        elem.classList.remove("good");
        elem.classList.add("natural");
    }else{
        elem.classList.remove("natural");
        elem.classList.remove("good");
        elem.classList.add("bad");
    }

}
