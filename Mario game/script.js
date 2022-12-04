// import platform from "./images/platform.png"
var canvas=document.getElementsByTagName("canvas")[0];
// console.log(platform);
var c=canvas.getContext("2d");


//----------------------------------------------------------the images section-----------------------------------------------------
//paltform image the ground
var image= new Image();
image.src = "images/platform.png";

//background hills
var hills=new Image();
hills.src="images/hills.png"

//bakground sky
var background=new Image();
background.src="images/background.png"

// the steps that the player stand on
var smallPlatform=new Image();
smallPlatform.src="images/platformSmallTall.png"

//the Running position to left 
var marioRunLeft= new Image();
marioRunLeft.src="images/spriteRunLeft.png";

//run right image
var marioRunRight= new Image();
marioRunRight.src="images/spriteRunRight.png";

//stand left 
var marioStandLeft= new Image();
marioStandLeft.src="images/spriteStandLeft.png";

//stand right
var marioStandRight= new Image();
marioStandRight.src="images/spriteStandRight.png";

//----------------------------------------------------------the images section-----------------------------------------------------




// console.log(image.style.width)
 canvas.width=1024;
 canvas.height=567;


//landding speed
var gravity=1.5;

class Player {
    
    constructor()
    {
       this.speed=10
        this.position=
        {
           x:100,
           y:100
        }
        this.velocity=
        {
            x:0,
            y:0
        }
////////////////////////////////////
        this.width=66
        this.height=150
 
///////////////////
        this.image=marioStandRight

        this.frmes=0
        this.sprite={
          stand:{
            right:marioStandRight,
            left:marioStandLeft,
            cropWidth:177,
            width:66
          },
          run:{
            right:marioRunRight,
            left:marioRunLeft,
            cropWidth:340,
            width:120.875
          }
        }
    
       

        this.currentMario=this.sprite.stand.right
        this.cuerrentCrop=177
/////////////////////////////////////////////////////////////////
    }
    draw()
    {
     
        c.drawImage(this.currentMario,
            this.cuerrentCrop*this.frmes,
            0,
            this.cuerrentCrop,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }

    update()
    {
       this.frmes++;
       if(this.frmes > 28) this.frmes=0;

       this.draw()
       this.position.y += this.velocity.y
       this.position.x += this.velocity.x
       
       if(this.position.y + this.height + this.velocity.y <= canvas.height)
       {
        this.velocity.y += gravity
       }
//////////////////////////////////////////
       else
       {
        init();

        // this.velocity.y=0
       }
    }
}



class Platform
{
    constructor( {x,y},width,height,img )
      {
        this.position=
        {
            x,
            y
            
        }
        //   علشان الوقوف بتاع الشخصيه
    /////////////////////////////////////////////////////////////////////
        this.img=img
        this.width=width  //580
        this.height=height   //125
       //////////////////////////////////////////////////////////////////
      }
    draw()
    { 
        // c.fillStyle="blue"
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)    
        c.drawImage(this.img,this.position.x,this.position.y)
        // c.drawImage(this.img,70,0,220,400,0,0,177,400)
        // console.log("draw")

    }
}

class CreateObject
{
    constructor( {x,y},img,width,height )
      {
        this.position=
        {
            x,
            y
            
        }
        this.imag= img
        this.width=width  //580
        this.height=height   //125
       
      }
    draw()
    { 
        // c.fillStyle="blue"
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)    
        c.drawImage(this.imag,this.position.x,this.position.y)
    }
}

var moveOut=0;


var player = new Player();
//////////////////////////////////////////////////////////////////////////////////////////
var platforms=[];
var createObject=[]
////////////////////////////////////////////////////////////////////////////////////////////////////

var keys=
{
    right:{ pressed :false },
    left :{ pressed:false  }
}


function init(){
 player = new Player();
 platforms=[new Platform( {x:-1,y:470},580,125,image ),
    new Platform( {x:580-3, y:470},580,125,image ),
   new Platform( {x:(580*2)+150, y:470},580,125,image),
   new Platform( {x:(580*3)+500, y:470},580,125,image ),
   new Platform({x:1900,y:200},580,125,image),
   new Platform({x:3800,y:290},580,125,image),
   new Platform({x:(580*5),y:245},580,125,image),

   new Platform({x:(580*6)+700,y:470},580,125,image),
   new Platform({x:(580*7)+250,y:470},580,125,image)];
 createObject=[new CreateObject( {x:-1,y:-1},background,11643,732 ),new CreateObject({x:-1,y:-1},hills,7545,592 )]
 moveOut=0
}


function animate()
{
    requestAnimationFrame(animate)
    c.fillStyle="white"
    c.fillRect(0,0,canvas.width,canvas.height)

    createObject.forEach(createObject => {
        createObject.draw();
    });
    
    platforms.forEach(platform => {
        platform.draw();
    });
  
    player.update();
   
    if(keys.right.pressed && player.position.x < 400)
    {
        player.velocity.x = player.speed;
    }
    else if( (keys.left.pressed && player.position.x > 100) || (keys.left.pressed && moveOut==0 &&player.position.x>0) )
    {
        player.velocity.x = -player.speed;
    }
    else
    {
        player.velocity.x = 0;

        if(keys.right.pressed)
        {
            moveOut += player.speed;
            platforms.forEach((platform )=>{
                platform.position.x -= player.speed;
            });

            createObject.forEach((createObject) => {
                createObject.position.x -= player.speed *.66;
            });
           
        }
        else if(keys.left.pressed && moveOut>0)
        {
            moveOut -=player.speed;

            platforms.forEach((platform) =>{
                platform.position.x += player.speed; 
            });
            createObject.forEach((createObject) =>{
            createObject.position.x += player.speed *.66;
            });
            
        }
    }

  // platfotm collision
  platforms.forEach((platform) => {
  if(player.position.y + player.height <= platform.position.y &&
        player.position.y +player.velocity.y +player.height >=platform.position.y &&
        player.position.x +player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width)  
        {
            player.velocity.y=0;
        }
    })


    //winning
    if(moveOut > (580*7)+150)
    {
        player.currentMario = marioStandRight
        player.cuerrentCrop = 177
        player.width = 66
        keys.right.pressed = false 
        keys.left.pressed = false 
        player.velocity.x = 0
        player.velocity.y = 0
        player.speed =0

        c.fillStyle = "red"
        c.font = "65px arial"
        c.fillText("Congrats You Win",canvas.width*.5 -250,canvas.height*.5)
        console.log("win");
    }
    if(player.position.y >canvas.height){
        init()
    }
}

init()
animate() 

addEventListener("keydown",(e)=>{
    // console.log(e.keyCode)
    switch(e.keyCode)
    {
        case 39:
            keys.right.pressed=true
            player.currentMario = player.sprite.run.right
            player.cuerrentCrop = player.sprite.run.cropWidth
            player.width=player.sprite.run.width
            // console.log("right")
           
            break;
        case 40:
            // console.log("down")
            break;
        case 37:
           keys.left.pressed=true;
           player.currentMario = player.sprite.run.left
           player.cuerrentCrop = player.sprite.run.cropWidth
           player.width=player.sprite.run.width
            // console.log("left")
            break;
        case 32:

            // console.log("up")
            player.velocity.y -=20;
            if(player.position.y - 30 <= 0){
                player.velocity.y =0;
                player.position.y=0
            }
            break;
        default:                 
    }
    // console.log(keys.right.pressed)
})

addEventListener("keyup",(e)=>{
    // console.log(keyCode)
    switch(e.keyCode)
    {
        case 39:
            player.velocity.x = 0
            keys.right.pressed=false

            player.currentMario = marioStandRight
            player.cuerrentCrop = 177
            player.width = 66
            // console.log("right")
            break;
        case 40:
            // console.log("down")
            break;
        case 37:
           keys.left.pressed=false
           player.velocity.x = 0

           
           player.currentMario = marioStandLeft
           player.cuerrentCrop = 177
           player.width = 66
            // console.log("left")
            break;
        case 32:

            // console.log("up")
            break;
        default:                 
    }
   
})

