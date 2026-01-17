const container=document.querySelector(".board");
const newgame=document.querySelector(".newgame");
let p1=document.querySelector("#p1");
let p2=document.querySelector("#p2");
let winBox=document.querySelector(".win");
let winText=document.querySelector(".win-text");

p1.classList.add("active");
let val="⭕";
let board=Array(9).fill("");
const winPattern=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[6,7,8],[2,4,6]];
let done=0;

function checkWinner(board,player) {
    for (let pattern of winPattern){
        let win=true;
        for (let index of pattern) {
            if (board[index]!==player) {
                win=false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board.fill("");
    winBox.classList.add("hidden");
    winText.innerText="";
    winText.style.color="white";
    container.classList.remove("hidden");
    container.classList.add("board");
    document.querySelectorAll(".val").forEach(cell => cell.remove());
    document.querySelectorAll(".box").forEach(box => box.classList.remove("done"));
    done=0;
    val="⭕";
    p2.classList.remove("active");
    p1.classList.add("active");
}

// reset game on new game button

newgame.addEventListener("click",resetGame);

container.addEventListener("click",(e)=>{
    let box=e.target;
    if (box.classList.contains("box") && !(box.classList.contains("done"))){
        const currentPlayer = val;
        box.classList.add("done");
        done+=1;
        let head=document.createElement("h1");
        let index=Number(box.dataset.index);
        board[index]=currentPlayer;
        head.innerText=currentPlayer;
        box.append(head);
        head.classList.add("val");
        setTimeout(() => {
            if (checkWinner(board, currentPlayer)) {
                winBox.classList.remove("hidden");
                if (currentPlayer==="⭕") {
                    winText.innerText="PLAYER 1 WON 🎉🪘";
                    winBox.style.backgroundColor="#1e90ff";
                }
                else{
                    winText.innerText="PLAYER 2 WON 🎉🪘";
                    winBox.style.backgroundColor="green";
                }
                container.classList.add("hidden");
                container.classList.remove("board");
            } 
            else if (done === 9) {
                winBox.classList.remove("hidden");
                winText.innerText=" Equal Game, Match Drawn 🤝🤝"
                winText.style.color="black";
                winBox.style.backgroundColor="yellow";
                container.classList.add("hidden");
                container.classList.remove("board")
            }
        }, 100);

        if (val==="⭕") {
            val="❌";
            p1.classList.remove("active");
            p2.classList.add("active");
        }
        else{
            val="⭕";
            p2.classList.remove("active");
            p1.classList.add("active");
        }
    }
});