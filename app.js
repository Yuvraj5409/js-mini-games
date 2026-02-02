const BASE_URL="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_aeTkq8ZGY1KkoVpkT6btBucXRvDLBiNYui6tK4jq";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCur= document.querySelector(".from select");
const toCur= document.querySelector(".to select");
const result= document.querySelector("form .msg");

for(let select of dropdowns){
    for(curCode in countryList){
        const newOption=document.createElement("option");
        newOption.innerText=curCode;
        newOption.value=curCode;
        if(select.name==="from" && curCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && curCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag= (element)=>{
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
    let amtVal= parseFloat(amount.value);
    if(isNaN(amtVal) || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const response= await fetch(BASE_URL);
    const datas= await response.json();
    const rates= datas.data;
    const fromRate= rates[fromCur.value];
    const toRate= rates[toCur.value];
    const finalRate= (amtVal/fromRate)*toRate;
    result.innerText=`${amtVal} ${fromCur.value} = ${finalRate} ${toCur.value}`;
})