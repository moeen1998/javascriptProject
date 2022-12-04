window.addEventListener("load",()=>{
    var canvas = document.getElementById("can")
    var poard = canvas.getContext("2d")
    canvas.width = 1850
    canvas.height = 790

    //track user input arrow keys and fire functions 
    class InputHandler{
        constructor(game){
            this.game = game
            window.addEventListener("keydown",(e)=>{
                if(( (e.key === "ArrowUp")||(e.key === "ArrowDown") ) && (this.game.keys.indexOf(e.key) === -1)){
                    // add this key to the array 
                    this.game.keys.push(e.key)
                    // this.game.player.speedY = -0.5
                }
                else if(e.key === " ")
                    this.game.player.shoot();
                else if(( (e.key === "ArrowRight")||(e.key === "ArrowLeft") ) && (this.game.keys.indexOf(e.key) === -1)){
                    this.game.keys.push(e.key)
                }
                // console.log("e.key")
                // console.log(this.game.keys)
            })
            window.addEventListener("keyup",(e)=>{
                //check if this key is exist or not
                if(this.game.keys.indexOf(e.key) > -1){
                    //remove this key from the array
                    this.game.keys.splice(this.game.keys.indexOf(e.key),1)
                    // this.game.player.speedY = 0
                }
                // console.log(e.key)
            })
        }
    }
    // handle player fire that kill the enemy
    class Projectile{
        constructor(game,x,y){
            this.game = game
            this.x = x 
            this.y = y
            this.width = 12
            this.height = 4
            this.speed = 5
            this.markedForDeletion = false
        }
        update(){
            // change the position of the projectile 
            this.x += this.speed
            // remove the projectile prfore it go out the screen 
            if(this.x > this.game.width * 0.9) 
                this.markedForDeletion = true
        }
        draw(context){
            context.fillStyle="yellow"
            context.fillRect(this.x,this.y,this.width,this.height)
        }
    }
    // the position and the caracteistics of player
    class Player{
        constructor(game){
            this.game = game
            this.width = 170
            this.height = 220
            this.x = 20
            this.y = 200
            this.speedX = 0
            this.speedY = 0
            //moving speed
            this.maxSpeed = 5
            this.projectiles = []
            this.img = new Image()
            this.img.src = "imgs/hero2.png"

        }
        update(){
            //the user press up 
            if( this.game.keys.includes("ArrowUp") ) 
                this.speedY = - this.maxSpeed
            // the user press down 
            else if( this.game.keys.includes("ArrowDown") ) 
                this.speedY = this.maxSpeed

            else if( this.game.keys.includes("ArrowLeft") ) 
                this.speedX = - this.maxSpeed

            else if( this.game.keys.includes("ArrowRight") ) 
                this.speedX = this.maxSpeed
            // if the user relase the key he press it will be removed frm the array so it will be empty and stop moving
            else {
                this.speedX = 0
                this.speedY = 0

            }

            if(this.y > this.game.height - this.height ){
                this.speedY = 0
                this.y = this.game.height - this.height  
            } 
            else if(this.y < 0){
                this.y = 0
                this.speedY = 0;
            }
            if(this.x > this.game.width - this.width ){
                this.speedX = 0
                this.x = this.game.width - this.width  
            } 
            else if(this.x < 0){
                this.x = 0
                this.speedX = 0;
            }
            this.x += this.speedX
            this.y += this.speedY
            //update the position of the projectile 
            this.projectiles.forEach((projectile) => {
                projectile.update()
            })
            //check which rojectile should be removed 
            this.projectiles = this.projectiles.filter(projectile=>!projectile.markedForDeletion)
        }
        draw(context){
            context.drawImage(this.img,this.x,this.y,this.width,this.height)
            // context.fillStyle="black"
            // context.fillRect(this.x,this.y,this.width,this.height)
            
            // draw the projectiles shooooots 
            this.projectiles.forEach((projectile) => {
                projectile.draw(context)
            })
        }
        shoot(){
            // amo section
            if(this.game.amo > 0){
                this.projectiles.push(new Projectile(this.game,this.x+ this.width - 70,this.y + 120))
                this.game.amo--
            }
        }
    }

    // the fire from enemies 
    class Particle{
        constructor(game,x,y,speed){
            this.game = game
            this.x = x 
            this.y = y
            this.width = 12
            this.height = 4
            this.speed = speed
            this.markedForDeletion = false
        }
        update(){
            // change the position of the particle the speed is negative from the enemy class so + will decrease the position in x axies 
            this.x += (this.speed * 1.5)
            // remove the projectile prfore it go out the screen 
            if(this.x < this.game.player.width) 
                this.markedForDeletion = true
        }
        draw(context){
            context.fillStyle="red"
            context.fillRect(this.x,this.y,this.width,this.height)
        }
    }

    // enemy poition and ......
    class Enemy{
        constructor(game){
            this.game = game 
            this.x = this.game.width
            //from -.5 to -1.5  the speeeed and it is negative to move left not right
            this.speedX = Math.random()* -1.5 - 0.5
            this.markedForDeletion = false
            this.img = new Image()
        }
        update(){
            this.x += this.speedX;
            if(this.x + this.width < 0 ) 
                this.markedForDeletion = true
        }
        draw(context){
            this.game.particles.forEach((part) => {
                part.draw(context)
            })
            // draw the enemy
            context.drawImage(this.img,this.x,this.y,this.width,this.height)
            // context.drawImage(this.img,0,0,this.width,this.height,this.x,this.y,this.width,this.height )
            // drow the health of enemy
            context.fillStyle="blue"
            context.font= "25px fangsong"
            context.fillText(this.health,this.x,this.y)
        }
        enemyFire(){
            this.game.particles.push(new Particle(this.game,this.x,this.y + 20,this.speedX))
        }
        
    }
    //first type of enemeies
    class Horse extends Enemy{
        constructor(game){
            super(game)
            this.width = 200
            this.height = 150
            this.health = 3
            // to specify the position of the enemy and this enemy will appear in the center of 90% from the page
            this.y = (Math.random() * (this.game.height *.7 - this.height))+this.game.height *.1
            this.score = this.health
            this.img.src = "imgs/horse.png"
        }
        
    }
    //second type of enemeies
    class Croco extends Enemy{
        constructor(game){
            super(game)
            this.width = 150
            this.height = 150
            this.health = 2
            // to specify the position of the enemy and this enemy will appear in the center of 80% from the page
            this.y = (Math.random() * (this.game.height *.8 - this.height)) + this.game.height * .05
            this.score = this.health
            this.img.src = "imgs/croco.png"
        }
    }
    //last type of enemeies
    class Croco2 extends Enemy{
        constructor(game){
            super(game)
            this.width =  170
            this.height = 170
            this.health = 5
            // to specify the position of the enemy and this enemy will appear in the center of 80% from the page
            this.y = Math.random() * (this.game.height *.9 - this.height) + 20
            this.score = this.health
            this.img.src = "imgs/croco2.png"
        }
    }

    // score, shoots, timer and  the messages 
    class UI{
        constructor(game){
            this.game = game
            this.color = "yellow"
        }
        draw(context){
            //timer
            let timeAfterFormating = (this.game.gameTime * 0.001).toFixed(1)
            context.fillStyle = "white"
            context.fillText( "Time: "+timeAfterFormating, 20,110)

            // the score section 
            context.fillStyle = "aqua"
            context.font= "25px fangsong" 
            context.fillText("Your Score: "+this.game.score,20,30)

            //the amo data
            context.fillStyle = "green"
            // if the amo is less than 10 make the color red
            if(this.game.amo <= 10)
                context.fillStyle = "red"
            context.font= "25px fangsong" 
            //display the count of amo
            context.fillText(this.game.amo,20,70)
            context.fillStyle = this.color
            //draw the bar of shoots you have
            for(let i=0;i<this.game.amo;i++){
                context.fillRect( 55 + 5 *i ,50 ,3 ,20 )
            }
            if(this.game.gameOver){
                context.textAlign= "center"
                let message1,message2
                if(this.game.score >= this.game.winningScore){
                    message1 = "You Win"
                    message2 = " Will Done!!"
                }
                else{
                    message1 = "You Lose"
                    message2 = "Good Luk Next Time"
                }
                context.font = "80px fangsong"
                context.fillText(message1,this.game.width * 0.5, (this.game.height * 0.5) -50)
                context.font = "30px fangsong"
                context.fillText(message2,this.game.width * 0.5, this.game.height * 0.5 )
            }
        }
    }
    //display all data here
    class Game{
        constructor(width,height){
            this.width = width
            this.height = height
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.ui = new UI(this)
            this.keys=[]
            this.amo = 20
            //timer and amount of amo
            this.maxAmo = 55
            this.amoTimer = 0
            this.amoInterval = 600
            //enemies array 
            this.enemies = []
            this.enemyTimer = 0
            this.enemyInterval = 3000
            this.gameOver = false
            this.score = 0
            // winning score 
            this.winningScore = 100
            // the time 
            this.gameTime = 0 
            this.timeLimit = 120000;
            //fire and interval to fire from enemies
            this.particles =[]
            this.enemyPowerTime = 0
            this.enemyPowerInterval = 10000
        }
        update(deltaTime){
            this.player.update()

            //amo check
            if(this.amoTimer > this.amoInterval){
                if(this.amo<this.maxAmo)
                    this.amo++
                this.amoTimer = 0
            }
            else{
                this.amoTimer += deltaTime
            }

            // update the particles shooooots
            this.particles.forEach((part) => {
                part.update()
            })
            //check collision between the palyer and the fire from the enemies
            this.particles.forEach(part => {
                if(this.checkCollision(this.player , part)){
                    part.markedForDeletion = true
                    this.gameOver = true
                }    
            });

            this.enemies.forEach(enemy =>{
                // update the enemy positin 
                enemy.update()
            
                //make the enemies fire 
                if(this.enemyPowerTime > this.enemyPowerInterval){
                    enemy.enemyFire()
                    this.enemyPowerTime = 0
                }
                else{
                    this.enemyPowerTime += deltaTime
                }
                
                //see if the enemy touch the player or not if true remove the enemy
                if(this.checkCollision(this.player , enemy)){
                    enemy.markedForDeletion = true
                    this.gameOver = true
                }
                // loop throght projectiles to see if there is any collession between them and the enemy
                this.player.projectiles.forEach(projectile=>{
                    if(this.checkCollision(projectile,enemy)){
                        //remove this projectile 
                        projectile.markedForDeletion = true
                        // decrease the health of the enemy 
                        enemy.health--
                        if(enemy.health <= 0){
                            enemy.markedForDeletion = true
                            this.score += enemy.score
                            if(this.score >= this.winningScore){
                                this.gameOver = true;
                            }
                        }
                        //enemy.markedForDeletion= true
                    }
                })
            })
            //check the interval that the player play and if the time is finished or not
            if(this.gameTime >= this.timeLimit){
                this.gameOver = true
            }
            else{
                this.gameTime += deltaTime
            }
            
            // filter the enemies and the particles
            this.enemies = this.enemies.filter(enemy=>!enemy.markedForDeletion)
            this.particles = this.particles.filter(part=>!part.markedForDeletion)
            
            // adding enemy or not yet
            if(this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy()
                this.enemyTimer = 0 
            }
            else{
                this.enemyTimer += deltaTime
            }

        }
        draw(context){
            
            this.player.draw(context)
            this.enemies.forEach(enemy=>{
                enemy.draw(context)
            })
            this.ui.draw(context)
        }
        addEnemy(){
            // create new enemy and the constructor expecting the game as a prameter so i sen this keyword 
            let enem = Math.round(Math.random() * 2)+1
            switch (enem) {
                case 1:
                    this.enemies.push( new Horse(this))
                    break;
                case 2:
                    this.enemies.push( new Croco(this))                
                    break;
                case 3:
                    this.enemies.push( new Croco2(this))
                    break;
                default:
                    this.enemies.push( new Horse(this))
                    break;
            }
        }
        checkCollision(rect1 , rect2){
            return(
                //if the rectangles touches each other 
                // rect1.x < rect2.x + rect2.width &&
                // the rectangle doesn't go out the screen
                rect1.x + rect1.width > rect2.x &&
                // the rectangles is over each other in y axces from top 
                rect1.y < rect2.y + rect2.height &&
                //the rectangle over each other from bottom 
                rect1.height + rect1.y > rect2.y
            )
        }
    }
    const game = new Game(canvas.width,canvas.height)
    let lastTime = 0
    // animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        //delete the old drow and make new one in each loop 
        poard.clearRect(0,0,canvas.width,canvas.height)
        game.update(deltaTime)
        game.draw(poard)
        if(!game.gameOver)
            requestAnimationFrame(animate)
    }
    animate(0)

})