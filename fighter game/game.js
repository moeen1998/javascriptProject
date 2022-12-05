const canavas=document.querySelector('canvas');
const c =canavas.getContext('2d')
const gravity=0.7
canavas.width=1024;
canavas.height=576;
c.fillRect(0,0,canavas.width,canavas.height)
const background =new sprit({
    position:{
        x:0,
        y:0
    },
    imageSrc:'./img/background.png'
})
let shop =new sprit({
    position:{
        x:600,
        y:130
    },
   imageSrc:'./img/shop.png',
    scale:2.75,
    frameMax:6
})


const player =new fighter({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,    
        y:0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc:'./img/samuraiMack/Idle.png',
    frameMax:8,
    scale:2.5,
    offset:{
       x:215,
       y:157
     },
     sprites:{
        idle:{
            imageSrc:'./img/samuraiMack/Idle.png',
            frameMax:8
        },
        run:{
            imageSrc:'./img/samuraiMack/Run.png',
            frameMax:8,
            
        },
        jump:{
            imageSrc:'./img/samuraiMack/Jump.png',
            frameMax:2,
        },
        fall:{
            imageSrc:'./img/samuraiMack/Fall.png',
            frameMax:2,
        },
        attack1:{
            imageSrc:'./img/samuraiMack/Attack1.png',
            frameMax:6,
        },
        takehit:{
            imageSrc:'./img/samuraiMack/Take Hit - white silhouette.png',
            frameMax:4
        },
        death:{
            imageSrc:'./img/samuraiMack/Death.png',
            frameMax:6

        }
     },
     attackBox:{
        offset:{
            x:165,
            y:50
        },
        width:165,
        height:50
    }
})
const enemy =new fighter({
    position:{
        x:400,
        y:100
        },
        velocity:{
            x:0,
            y:0
        },
        offset:{
            x:-50,
            y:0
        },
    color :'blue',
    imageSrc:'./img/kenji/Idle.png',
    frameMax:4,
    scale:2.5,
    offset:{
       x:215,
       y:167
     },
     sprites:{
        idle:{
            imageSrc:'./img/kenji/Idle.png',
            frameMax:4
        },
        run:{
            imageSrc:'./img/kenji/Run.png',
            frameMax:8,
            
        },
        jump:{
            imageSrc:'./img/kenji/Jump.png',
            frameMax:2,
        },
        fall:{
            imageSrc:'./img/kenji/Fall.png',
            frameMax:2,
        },
        attack1:{
            imageSrc:'./img/kenji/Attack1.png',
            frameMax:4,
        },
        takehit:{
            imageSrc:"./img/kenji/Take hit.png",
            frameMax:3
        },
        death:{
            imageSrc:'./img/kenji/Death.png',
            frameMax:7
        }
     },
    attackBox:{
        offset:{
            x:-170,
            y:50
        },
        width:170,
        height:50
    }
})

const keys={
    a:{
        pressed: false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed :false
    },
    ArrowRight:{
        pressed :false
    }
}
function rectangularCollision({rectangle1,rectangle2}){
    return(rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x && 
        rectangle1.attackbox.position.x <= rectangle2.position.x+rectangle2.width && 
        rectangle1.attackbox.position.y + rectangle1.attackbox.height>=rectangle2.position.y && 
        rectangle1.attackbox.position.y<=rectangle2.position.y+rectangle2.height )
}
function determindWinner({player,enemy,timerId})
{ 
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display='flex'
    if(player.health ==enemy.health)
    {
        document.querySelector('#displayText').innerHTML='Tie'
    }
    else if(player.health>enemy.health)
    {
        document.querySelector('#displayText').innerHTML='player 1 wins'
    }
    else if(player.health<enemy.health)
    {
        document.querySelector('#displayText').innerHTML='player 2 wins'
    }
}
let lastkey
let timerId
let timer =60

function decreaseTimer()
{
    if(timer > 0){
        timerId=setTimeout(decreaseTimer,1000)
        timer--;
        document.querySelector('#timer').innerHTML= timer
        }
        if(timer==0){
      
       determindWinner({player,enemy})
   
}
}
decreaseTimer()

 function animate()
 {
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canavas.width,canavas.height)
    background.update()
    shop.update()
    c.fillStyle='rgba(255,255,255,0.15)'
    c.fillRect(0,0,canavas.width,canavas.height)
    player.update()
    enemy.update()

    player.velocity.x=0
    enemy.velocity.x=0

    //player movement
    if(keys.a.pressed && player.lastkey=='a'){
        player.velocity.x=-5
        player.switchSprit('run')
    }
   else if(keys.d.pressed && player.lastkey=='d'){
    player.velocity.x=5
    player.switchSprit('run')
   }else{
    player.switchSprit('idle')
   }
   //jump
   if(player.velocity.y<0){
    player.switchSprit('jump')
   }else if(player.velocity.y>0){
    player.switchSprit('fall')
   }
   //enmy movement
   if(keys.ArrowLeft.pressed && enemy.lastkey=='ArrowLeft'){
    enemy.velocity.x=-5
    enemy.switchSprit('run')
  } else if(keys.ArrowRight.pressed && enemy.lastkey=='ArrowRight'){
    enemy.velocity.x=5
    enemy.switchSprit('run')
  }else{
   enemy.switchSprit('idle')
   }
   //jump
   if(enemy.velocity.y<0){
    enemy.switchSprit('jump')
   }else if(enemy.velocity.y>0){
    enemy.switchSprit('fall')
   }


//detect for collision & enemy hits

    if(rectangularCollision({
        rectangle1:player,
        rectangle2:enemy

    })&&
    player.isAttacking &&player.frameCurrent ===4
    ){
    enemy.takehit()
    player.isAttacking =false
    //enemy.health -=10
    //document.querySelector('#enemyhealth').style.width=enemy.health +'%'
    gsap.to('#enemyhealth',{
        width:enemy.health +'%'
    })
  }
  //if player misses
  if(player.isAttacking&&player.frameCurrent===4){
    player.isAttacking=false
  }

 
  if(rectangularCollision({
    rectangle1:enemy,
    rectangle2:player

})&&
enemy.isAttacking && enemy.frameCurrent===2
){
player.takehit()
enemy.isAttacking = false
//player.health -=10
//document.querySelector('#playerhealth').style.width=player.health +'%'
gsap.to('#playerhealth',{
    width:player.health +'%'
})
}
//if player misses
if(enemy.isAttacking&&enemy.frameCurrent===2){
    enemy.isAttacking=false
  }
//end game based on health
if(enemy.health<=0||player.health<=0)
{
    determindWinner({player,enemy,timerId})

}
 }
 animate();
window.addEventListener('keydown',(event)=>{
    if(!player.dead){
    switch(event.key){
        case 'd':
            keys.d.pressed=true
            player.lastkey='d'
            break;
        case 'a':
           keys.a.pressed=true
          player.lastkey='a'
            break;
        case 'w':
            keys.w.pressed=true
            player.velocity.y= -20
            break;
        case ' ':
            player.attack()
            break;
    }
}
if(!enemy.dead){
 switch(event.key){
    case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastkey='ArrowRight'
            break;
        case 'ArrowLeft':
           keys.ArrowLeft.pressed=true
           enemy.lastkey='ArrowLeft'
            break;
        case 'ArrowUp':
           
           enemy.velocity.y= -20
            break;

        case 'ArrowDown':
            enemy.attack()
            break;
 }
}
})
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed=false
            break;
        case 'a':
            keys.a.pressed=false
            break;
        // case 'w':
        //     keys.w.pressed=false
        //     lastkey='w'
        //     break;
    }
    //enemy keys
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break;
        // case 'ArrowUp'
        //     keys.ArrowUp.pressed=false
        //     lastkey='w'
        //     break;
    }
})