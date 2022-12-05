var canvas = document.getElementById("mario");
var cont = document.getElementsByClassName("cont")[0];
var c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 567;

console.log(cont)

var image = new Image()
image.src = "images/spriteRunRight.png"
image.onload=()=>{
    // c.drawImage(image,0,0,200,400);
    
    c.drawImage(image,70,0,220,400,0,0,177,400)
}
// c.drawImage(image,0,0,200,400)


// cont.appendChild(image);
// c.drawImage(img,
//     177*0,
//     0,
//     177,
//     400,
//     0,
//     0,
//     200,
//     400);
    
    // console.log("img",image)
    // c.fillRect(0,0,100p,100)
    c.drawImage(image, 0, 0)
    // c.font = '48px serif';
    // c.fillText("moeen",50,50)
   
    console.log("img",image)

// class Input{
//     constructor(game){
//         this.game= game
//         window.addEventListener("keydown",(e)=>{
//             if(this.game.keys)
//             console.log("add",this.game.keys)
//             this.game.keys.push(e.key)
//         })
//         window.addEventListener("keyup",(e)=>{
//             console.log("removing")
//             this.game.keys.splice(this.game.keys.indexOf(e.key),1)
//         })
//     }

// }
// class Player{
//     constructor(game){
//         this.game = game
//         this.x = 0
//         this.y = 0
//         this.speedX = 4
//         this.speedY = 0
//         this.img = new Image()
//         this.img.src = "images/spriteStandRight.png"
//         this.width = 66
//         this.height = 150
//     }
//     update(){
//         // if()
//     }
//     draw(context){
//         context.drawImage(this.img,this.x,this.y,this.width,this.height)
//     }
// }
// class Game{
//     constructor(){
//         this.input = new Input(this)
//         this.keys = []
//         this.player = new Player(this)
//     }
// }
// var game = new Game();