let options=document.querySelectorAll(".option");
let userScore=document.querySelector("#user-score");
let compScore=document.querySelector("#comp-score");
let msg=document.querySelector("#msg");
let newGame=document.querySelector("#new-game");


let user=0;
let comp=0;

const drawGame=()=>{
    msg.innerText="Game Draw, Play again";
    msg.style.backgroundColor="#3B4953";
}

const getCompChoice=()=>{
    const select=["Rock", "Paper", "Scissor"];
    let selectIdx=Math.floor(Math.random() * 3);
    return select[selectIdx];
}

const showWinner=(userWin, compChoice, userChoice)=>{
    if(userWin){
        user++;
        userScore.innerText=user;
        msg.innerText=`You Win, Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";
    }
    else{
        comp++;
        compScore.innerText=comp;
        msg.innerText=`You Lost, ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor="red";
    }
}

const playGame=(userChoice)=>{
    const compChoice=getCompChoice();
    if(userChoice===compChoice){
        drawGame();
    }
    else{
        let userWin=true;
        if(userChoice==="Paper"){
            userWin=compChoice==="Scissor"? false:true;
        }
        else if(userChoice==="Scissor"){
            userWin=compChoice==="Rock"? false:true;
        }
        else{
            userWin=compChoice==="Paper"? false:true;
        }
        showWinner(userWin, compChoice, userChoice);
    }
}

options.forEach((choice)=>{
    choice.addEventListener("click", ()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    })
})

newGame.addEventListener("click", ()=>{
    msg.innerText="Play Your Move";
    msg.style.backgroundColor="#3B4953";
    user=0;
    comp=0;
    userScore.innerText=user;
    compScore.innerText=comp;
})

