//import { countryList } from './codes';








const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");



for(let select of dropdown){
    for( currCode in countryList ){
        const newOpt = document.createElement("option");
        newOpt.innerHTML=currCode;
        newOpt.value=currCode;
        select.append(newOpt);

    }
    select.addEventListener("click",(evt)=> {
        updateFlag(evt.target);
    })

    
}

const updateFlag =(element) =>{
const code=element.value;
const country=countryList[code];
let newSrc = `https://flagsapi.com/${country}/shiny/64.png`;

const imgElement=element.parentElement.querySelector('img');

imgElement.src=newSrc;
}




const updateExchangeRate= async () =>{

    let amount = document.querySelector("form input");
    let amountVal = amount.value;
    if(amountVal ==="" || amountVal < 1 ){
        amountVal.value="1";
        amountVal = 1;

    }

    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();
    
//const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()} /${toCurr.value.toLowerCase()} .json`
const URL = `${BASE_URL}/${fromCurrency}.json`;

try{
    let response = await fetch(URL);
    if(!response.ok){
        throw new Error("Currency data not found. Please check the currency codes.");  
    }
    let data = await response.json();
    
        
    // Extract exchange rate from nested JSON structure
    if (data[fromCurrency] && data[fromCurrency][toCurrency]) {
        let exchangeRate = data[fromCurrency][toCurrency];
        let final = exchangeRate * amountVal;
        //console.log(`Exchange rate: 1 ${fromCurrency.toUpperCase()} = ${exchangeRate} ${toCurrency.toUpperCase()}`);
        msg.innerText = `${amountVal} ${fromCurrency.toUpperCase()} = ${final} ${toCurrency.toUpperCase()}`;
    } else {
        throw new Error("Invalid currency conversion pair.");
    } 
    
}
catch (error) {
    console.error("Error fetching data:", error.message);
}


}






btn.addEventListener("click",async (evt) =>{
    evt.preventDefault();
   

    updateExchangeRate();



});

window.addEventListener("load", () => {
    updateExchangeRate();
  });




