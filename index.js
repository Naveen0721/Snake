let gameboard=document.querySelector("#gameboard");
let contxt=gameboard.getContext("2d");
let scoretxt=document.querySelector("#score");
let resetbtn=document.querySelector("#reset");
const gamewidth=gameboard.width;
const gameheight=gameboard.height;
const snakecolor="lightblue";
const foodcolor="red";
const boardbackground="white";
const snakeboarder="black";
let running=false;
const unitsize=25;
let foodx;
let foody;
let xvelocity=unitsize;
let yvelocity=0;
let score=0;
window.addEventListener("keydown",changedirection);
resetbtn.addEventListener("click",restart);
let snake=[
    {x:0,y:0},{x:unitsize,y:0},{x:unitsize*2,y:0},{x:unitsize*3,y:0},{x:unitsize*4,y:0}
]
startgame();


function startgame()
{
    running=true;
    scoretxt.textContent=score;
    createfood();
    drawfood();
    nextTick();

};



function nextTick()
{
    
    if(running)
    {// console.log("fdvfdgnfhgd");
        setTimeout(()=>
        {
            clearBoard();
            drawfood();
            movesnake();
            drawsnake();
            checkGameover();
            nextTick();
        },100);
    }

    else{
        displaygameover();
    }
};

function movesnake()
{
    const head={
        x: snake[0].x +xvelocity,y:snake[0].y+yvelocity
    };
    
    snake.unshift(head);
    // snake.forEach((part)=>
    // {
    //     console.log(part.x," and ",part.y);
    // })
    if(snake[0].x==foodx && snake[0].y==foody)
    {
        createfood();
        score+=1;
        scoretxt.textContent=score;

    }
    else{
        pop=snake.pop();
        // console.log("pop",pop);
    }
}
function clearBoard()
{
    contxt.fillStyle=boardbackground;
    contxt.fillRect(0,0, gamewidth,gameheight);
};


function createfood()
{
    function randomfood(min,max)
    {
        return Math.floor((Math.random()*(max-min)+min)/unitsize)*unitsize
    }

    foodx=randomfood(0,gamewidth-unitsize);
    foody=randomfood(0,gamewidth-unitsize);
    console.log(foodx,"   ",foody);

}

function drawfood()
{
    contxt.fillStyle=foodcolor;
    contxt.fillRect(foodx, foody, unitsize , unitsize)
}

function drawsnake()
{
    contxt.fillStyle=snakecolor;
    contxt.strokeStyle=snakeboarder;
    snake.forEach(snakepart =>
        {
            contxt.fillRect(snakepart.x,snakepart.y,unitsize,unitsize)
            contxt.strokeRect(snakepart.x,snakepart.y,unitsize,unitsize)
        })

}

function checkGameover()
{
    switch(true)
    {
        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x>=gamewidth):
        running=false;
        break;
        case(snake[0].y<0):
        running=false;
        break;
        case(snake[0].y>=gameheight):
        running=false;
        break;
    }
    // for(let i=1;i<snake.length;i+=1)
    // {
    //     if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
    //     {
    //         running=false;
    //     }
    // }

}

function displaygameover()
{
    contxt.font="50px Permanent Marker";
    contxt.fillStyle="black";
    contxt.textAlign="center"
    contxt.fillText("Game Over!!!" ,gamewidth/2,gameheight/2)
    running=false;

}

function changedirection(event)
{
    const keypressed=event.keyCode;
    const up=38;
    const down=40;
    const right=39;
    const left=37;

    const goingup=(yvelocity==-unitsize)
    const goingdown=(yvelocity==unitsize)
    const goingleft=(xvelocity==-unitsize)
    const goingright=(xvelocity==unitsize)

    switch(true)
    {
        case(keypressed==left && !goingright):
        xvelocity=-unitsize;
        yvelocity=0;
        break;

        case(keypressed==right && !goingleft):
        xvelocity=unitsize;
        yvelocity=0;
        break;

        case(keypressed==up && !goingdown):
        xvelocity=0;
        yvelocity=-unitsize;
        break;

        case(keypressed==down && !goingup):
        xvelocity=0;
        yvelocity=unitsize;
        break;
    

    
    }
    
   
    

}

function restart()
{
    xvelocity=unitsize;
    yvelocity=0;
    score=0;
    snake=[
        {x:0,y:0},{x:unitsize,y:0},{x:unitsize*2,y:0},{x:unitsize*3,y:0},{x:unitsize*4,y:0}
    ]
    startgame();
    
}