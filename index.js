async function textCheck(){
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
    document.getElementById("polarity").textContent = answer.result.polarity;
    document.getElementById("type").textContent = answer.result.type;
}