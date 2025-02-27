let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;


document.getElementById("img1").src = `./images/${randomNumber1}.png`;

const player2=document.getElementById("img2").src = `./images/${randomNumber2}.png`;


if(randomNumber1==6 && randomNumber2 != 6){
    const player1 = document.getElementById("player");
    player1.innerText = `Player 1 won match`
}
else if(randomNumber2==6 && randomNumber1 != 6){
    const player1 = document.getElementById("player");
    player1.innerText = `Player 2 won match`

}
else if( randomNumber1==randomNumber2){
    const player1 = document.getElementById("player");
    player1.innerText = `Draw!`

}