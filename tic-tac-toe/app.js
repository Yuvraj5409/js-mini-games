let boxes= document.querySelectorAll(".box");
let rstBtn= document.querySelector("#rst-btn");
let newGame= document.querySelector("#new-game");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");

let turnO= true;
let count=0;

const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]  
];

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    count=0;
    msgContainer.classList.add("hide");
    newGame.innerText="New Game";
}

boxes.forEach((box) =>{
    box.addEventListener("click", ()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
            box.classList.add("oColor");
            box.classList.remove("xColor");
        }
        else{
            box.innerText="X";
            turnO=true;
            box.classList.add("xColor");
            box.classList.remove("oColor");
        }
        box.disabled = true;
        count++;

        checkWinner();
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner= (winner)=>{
    msg.innerText=`Congratulations\nWinner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=() =>{
    for(let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!=="" && pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return;
        }
    }

    if(count===9){
        msg.innerText="Match Draw";
        newGame.innerText="Play again";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

rstBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
