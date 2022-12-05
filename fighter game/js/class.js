class sprit{
    constructor({position,imageSrc,scale=1,frameMax=1,offset={x:0,y:0}}){
        this.position= position
        this.width=50
        this.height=150
        this.image=new Image()
        this.image.src=imageSrc
        this.scale=scale
        this.frameMax=frameMax
        this.frameCurrent=0
        this.frameElapsed=0
        this.frameHold=5
        this.offset=offset
    }
    draw(){
        c.drawImage(
            this.image,
            this.frameCurrent*(this.image.width/this.frameMax),
            0,
            this.image.width/this.frameMax,
            this.image.height,
            this.position.x-this.offset.x,
            this.position.y-this.offset.y,
            (this.image.width/this.frameMax)*this.scale,
            this.image.height*this.scale
            )
    }
    animateFrame(){
        this.frameElapsed++
        if((this.frameElapsed % this.frameHold)==0){
        if(this.frameCurrent<this.frameMax-1){
        this.frameCurrent++
        }else{
            this.frameCurrent=0
        }
     }
    }
    update(){
        this.draw()
        this.animateFrame()
    }
}
class fighter extends sprit{
    constructor({position,velocity,color='red', imageSrc,scale=1,frameMax=1,offset={x:0,y:0},sprites,
    attackBox={offset:{},width:undefined,height:undefined}}){
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        })

        
        this.velocity= velocity
        this.width=50
        this.height=150
        this.lastkey
        this.attackbox={
            position:{
                x:this.position.x,
                y:this.position.y
            },
            offset:attackBox.offset,
            width: attackBox.width,
            height:attackBox.height,
        }
        this.color=color
        this.isAttacking
        this.health=100
        this.frameCurrent=0
        this.frameElapsed=0
        this.frameHold=5
        this.sprites=sprites
        this.dead=false
        for (const sprit in this.sprites){
            sprites[sprit].image=new Image()
            sprites[sprit].image.src= sprites[sprit].imageSrc
        }
        
    }
    update(){
        this.draw()
        if(!this.dead)
        this.animateFrame()

        //attackbox
        this.attackbox.position.x=this.position.x + this.attackbox.offset.x
        this.attackbox.position.y=this.position.y+this.attackbox.offset.y
        //draw attackbox
        //c.fillRect(this.attackbox.position.x,this.attackbox.position.y,this.attackbox.width,this.attackbox.height)

        this.position.x +=this.velocity.x
        this.position.y +=this.velocity.y
        //gravity fun
        if(this.position.y+this.height+this.velocity.y>=canavas.height-96){
            this.velocity.y=0
            this.position.y=330
        }
        else this.velocity.y +=gravity
        //console.log(this.position.y);
    }
    attack(){
        this.switchSprit('attack1')
        this.isAttacking=true
        setTimeout(()=>{
            this.isAttacking=false
      },1000)
    }
    takehit(){
        
        this.health -=20
        if(this.health<=0){
            this.switchSprit('death')
        }
        else{
            this.switchSprit('takehit')
        }

    }
    switchSprit (sprit) {
         if(this.image==this.sprites.death.image){
            if(this.frameCurrent===this.sprites.death.frameMax-1)
            this.dead=true
        return
         }
        //overriding all over other animations with attack animation
        if(this.image==this.sprites.attack1.image && this.frameCurrent<this.sprites.attack1.frameMax-1) 
        return
        // override when fighter gets hit 
        if(this.image==this.sprites.takehit.image&&this.frameCurrent<this.sprites.takehit.frameMax-1)
        return
        switch(sprit){
            case 'idle':
                if(this.image!==this.sprites.idle.image){
                this.image=this.sprites.idle.image
                this.frameMax=this.sprites.idle.frameMax
                this.frameCurrent=0
                }
                break;
            case 'run':
                if(this.image!==this.sprites.run.image){
                this.image=this.sprites.run.image
                this.frameMax=this.sprites.run.frameMax
                this.frameCurrent=0
                }
                break;
            case 'jump':
                if(this.image !==this.sprites.jump.image){
               this.image=this.sprites.jump.image
               this.frameMax=this.sprites.jump.frameMax
               this.frameCurrent=0
                }
                break;
            case 'fall':
                if(this.image !==this.sprites.fall.image){
                this.image=this.sprites.fall.image
                this.frameMax=this.sprites.fall.frameMax
                this.frameCurrent=0
                }
                break;
            case 'attack1':
                if(this.image !==this.sprites.attack1.image){
                this.image=this.sprites.attack1.image
                this.frameMax=this.sprites.attack1.frameMax
                this.frameCurrent=0
                }
                break;

                case 'takehit':
                if(this.image !==this.sprites.takehit.image){
                this.image=this.sprites.takehit.image
                this.frameMax=this.sprites.takehit.frameMax
                this.frameCurrent=0
                }
                break;
                case 'death':
                if(this.image !==this.sprites.death.image){
                this.image=this.sprites.death.image
                this.frameMax=this.sprites.death.frameMax
                this.frameCurrent=0
                }
                break;
        }
    }
}