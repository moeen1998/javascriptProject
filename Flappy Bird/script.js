// background scrolling speed
var move_speed = 3;

// gravity constant value
var gravity = 0.5;

// getting the bird element
var bird = document.querySelector(".bird");

// getting the bird properties: (left, top, right, bottom, x, y, width, height).
var bird_props = bird.getBoundingClientRect();

// getting the background proprties
var background = document.querySelector(".background").getBoundingClientRect();

// getting the score element
var score_title = document.querySelector(".score-title"),
    score_value = document.querySelector(".score-value"),
    message = document.querySelector(".game-message");

// getting the logo holder to control its apperance
var logo_holder = document.querySelector(".logo-holder");

// setting the initial game state to start
var game_state = 'start';

// playback Game audio
var audio = new Audio("sounds/gameAudio.mp3");

// Add an eventlistener for key presses 
document.addEventListener('keydown', (event) => {
    // Start the game if enter key is pressed
    if(event.key == 'Enter' && game_state != 'play'){
        document.querySelectorAll(".pipe").forEach(event => {
            event.remove();
        });

        bird.style.top = '40vh';
        game_state = 'play';
        message.innerHTML = '';
        logo_holder.style.display = 'none';
        score_title.innerHTML = "Score : ";
        score_value.innerHTML = '0';
        play();
    }
});

function play(){
    function move(){
        // check if the game has ended
        if(game_state != 'play'){
            return;
        }
        audio.play();
        console.log("from the move");
        // getting all pipes element
        var pipes = document.querySelectorAll(".pipe");
        console.log(pipes);
        // getting pipes properties
        pipes.forEach((element) => {
            console.log("from the loop");
            var pipe_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            // delete the pipes if they have reched the end of the screen
            if(pipe_props.right <= 0) {
                element.remove();
            }
            else {
                // collision detection has happed between bird and pipes
                if(
                bird_props.left < pipe_props.left + pipe_props.width &&
                bird_props.left + bird_props.width > pipe_props.left &&
                bird_props.top < pipe_props.top + pipe_props.height &&
                bird_props.top + bird_props.height > pipe_props.top
                ) {
                    // setting game state to 'End'
                    game_state = 'end';
                    message.innerHTML = "Press Enter To Restart";
                    message.style.fontSize = '30px';
                    audio.pause();
                    return;
                } // no collision has occured
                else{
                    // increase the score whenever the bird pass the pipe successfully
                    if (
                        pipe_props.right < bird_props.left &&
                        pipe_props.right + move_speed >= bird_props.left &&
                        element.increase_score == '1' 
                    ) {
                        score_value.innerHTML = +score_value.innerHTML + 1;
                    }
                    element.style.left = pipe_props.left - move_speed + 'px'; 
                }
            }
            console.log("move is finished")
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
    
    var bird_down = 0;

    function apply_gravity() {
        if (game_state != 'play') {
            return;
        }
        bird_down = bird_down + gravity;
        console.log("from the gravity");
        document.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowUp' || event.key == ' ') {
                bird_down = -7;
                console.log("-7.5");
            }
        });

        // collision happened between bird and window top or bottom
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            // setting game state to 'end'
            game_state= 'end';
            message.innerHTML = "Good Luck!";
            audio.pause();
            return;
        }

        bird.style.top = bird_props.top + bird_down + 'px';
        bird_props = bird.getBoundingClientRect();
        
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);
    
    var pipe_space_seperation = 0;
    // setting constant value for the space between every two pipes
    var pipe_gap = 35;

    function create_pipe() {
        if (game_state != 'play') {
            console.log("not play");
            return;
        }

        // create new set of pipes if the distance has exceeded the predefined pipe seperation value
        if (pipe_space_seperation > 115) {
            pipe_space_seperation = 0;

            // calculate random position of pipes according to y axix
            var pipe_position = Math.floor(Math.random() * 43) + 8;
            var pipe_element  = document.createElement('div');
            pipe_element.className = 'pipe';
            pipe_element.style.top = pipe_position - 70 + 'vh';
            pipe_element.style.left = '100vw';

            // append the new pipe element created to the document
            document.body.appendChild(pipe_element);
            var pipe_div = document.createElement('div');
            pipe_div.className = 'pipe';
            pipe_div.style.top = pipe_position + pipe_gap + 'vh';
            pipe_div.style.left= '100vw';
            pipe_div.increase_score = '1';

            // append the new pipe element created to the document
            document.body.appendChild(pipe_div);
        }
        pipe_space_seperation++;
        console.log("from create pipe");
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}