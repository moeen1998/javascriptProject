var gamestatus = false
var game
var monkey
var monkeyPosition = -1;
var numbers = Math.floor((Math.random()*10)+10);
var letters=[];
var chararr = Array("a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" , "i" , "j" , "k" ,"l" , "m" , "n" , "o" , "p" , "q" , "r" , "s" , "t" , "u" , "v" , "w" , "x" , "y" , "z");
var imgs;
var interval;

window.onload=function (){
    
    window.scrollTo({top:0,left:0, behavior: 'smooth'})
    
    game = document.getElementsByClassName("game")[0];
    
    for (var i=0;i<numbers;i++)
    {
        var randImg=Math.floor(Math.random()*26);
        var divImg=document.createElement("div");
        
        divImg.style.width= 2570/numbers+"px";
        divImg.style.textAlign="center";
        divImg.style.position="relative";
        divImg.style.height="100vh";
        divImg.style.padding="0px 10px"
        divImg.classList.add("child")
        
        var img=new Image();
        img.src="imgs/"+ chararr[randImg] +".png"
        img.style.position="absolute";
        img.style.left="10px"
        img.style.top=Math.floor((Math.random()*100)+15)+"px";
        img.classList.add("childImg")
        letters.push(chararr[randImg]);
        
        divImg.appendChild(img);
        game.appendChild(divImg);
        
    }
    gamestatus = true   
}

document.addEventListener("keydown",(e)=>{
    var divs = document.getElementsByClassName("child")
    imgs = document.getElementsByClassName("childImg")
    monkey = document.getElementById("monkey")
    var end = document.getElementsByClassName("end")[0]
    if(monkeyPosition < numbers -2 && gamestatus){
        console.log(monkeyPosition , numbers)
        if(e.key == letters[monkeyPosition + 1]){
            if(interval){
                stopmove(divs[monkeyPosition])
            }
            monkeyPosition++;
            startmove(imgs[monkeyPosition])
            monkey.remove()
            divs[monkeyPosition].appendChild(monkey)
            monkey.style.position = "absolute"
            monkey.style.left = "0px"
            monkey.style.top = parseInt(imgs[monkeyPosition].style.top)+150+"px"
            window.scrollBy({top: 0, left: (2570/numbers)-50, behavior: 'smooth'})
        }
    }
    else{
        if(interval){
            stopmove(divs[monkeyPosition])
        }
        monkey.remove();
        end.appendChild(monkey)
        monkey.style.position = "absolute"
        monkey.style.left ="60px"
        monkey.style.top = "460px"
        var win = document.createElement("p")
        textwin = document.createTextNode("Congrats")
        win.appendChild(textwin)
        win.style.position = "fixed"
        win.style.left = "45%"
        win.style.top = "40%"
        win.style.color = "#000"
        win.style.fontSize = "40px"
        win.style.fontWeight = "bolder"
        win.style.fontStyle = "italic"
        document.body.appendChild(win)
        window.scrollBy((2570/numbers)-50,0)
    }    
})

function startmove(img){
    interval = setInterval(()=>{
        if(parseInt(img.style.top) < 250){
            img.style.top = parseInt(img.style.top)+5+"px";
            monkey.style.top = parseInt(monkey.style.top)+5+"px";
        }
        else{
            game.innerText=""
            var lose = document.createElement("p")
            losingText = document.createTextNode("You Lose")
            lose.appendChild(losingText)
            game.appendChild(lose)
            lose.style.textAlign = "center"
            lose.style.paddingTop = "30%"
            lose.style.color = "#000"
            lose.style.fontSize = "40px"
            lose.style.fontWeight = "bolder"
            lose.style.fontStyle = "italic"
            game.style.width = "68.5%"
            document.getElementsByClassName("container")[0].style.width = "100%"
            lose.style.height = "100vh"
            
            clearInterval(interval)
            gamestatus = false
        }
    },100)
}

function stopmove(el){
    clearInterval(interval)
}

