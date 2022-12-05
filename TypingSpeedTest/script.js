// define variables
var typing_text = document.querySelector(".typing-text p"),
    input_field = document.querySelector(".input-field"),
    mistake_tag = document.querySelector(".mistake span"),
    timer_tag   = document.querySelector(".time span"),
    wpm_tag     = document.querySelector(".wpm span"),
    cpm_tag     = document.querySelector(".cpm span"),
    try_again_btn = document.querySelector("button");

var timer, 
    max_time = 120,
    time_left = max_time, 
    char_index  = mistakes = is_typing = 0;

var match_audio = new Audio("assets/match.mp3"),
    mismatch_audio = new Audio("assets/missmatch.mp3");

function random_Paragraph(){
    // getting random number and making it always less than the paragraphs list length
    var random_index = Math.floor(Math.random() * paragraphs.length);
    // empty the text element before adding new paragraph
    typing_text.innerHTML = "";
    // getting random item from the paragraph list and splitting all characters of it
    // then, adding each character inside a span, and adding this span inside the p element
    paragraphs[random_index].split("").forEach(letter => {
        var span_tag = `<span>${letter}</span`;
        typing_text.innerHTML += span_tag;
    });

    // setting underline under the first character by default
    typing_text.querySelectorAll("span")[0].classList.add('active');
    // focusing on the input field when keydown or when click
    document.addEventListener('keydown', () => input_field.focus());
    typing_text.addEventListener('click', () => input_field.focus());
}
function srart_Typing(){
    const characters = typing_text.querySelectorAll("span");
    var typed_char = input_field.value.split("")[char_index];

    // continue typing only if the user has typed less than total characters and timed is greater than 0
    if(char_index < characters.length -1 && time_left > 0){
        // once the timer is started, it will never restart again whenever a key is being clicked
        if(!is_typing){
            timer = setInterval(start_Timer, 1000);
            is_typing = true;
        }
        
        // if the user did not enter any character, or press backspace 
        // then remove the correct and incorrect classes
        if(typed_char == null){
            // decreament the character index in order to back to the previos one
            char_index--; 
            
            // decreased the mistakes counter if the user ereased the missmatched character
            if(characters[char_index].classList.contains("incorrect")){
                mistakes--;
            }
            characters[char_index].classList.remove('correct','incorrect');
        }
        else{
            // whenever the user typed a matched character add class 'correct' to 
            // the span tag of the character, otherwise add 'incorrect' class 
            // and increase the mistakes counter
            if(characters[char_index].innerText === typed_char){
                characters[char_index].classList.add("correct");
                match_audio.play();
                console.log("correct");
            }
            else{
                mistakes++;
                characters[char_index].classList.add("incorrect");
                mismatch_audio.play();
                console.log("incorrect");
            }
            char_index++;
        }
        // first, removing active class from each span
        // and then, adding it to the current span only
        characters.forEach(letter => letter.classList.remove('active'));
        characters[char_index].classList.add('active');

        // showing the mistakes
        console.log(mistakes);
        mistake_tag.innerText = mistakes;
        // showing the number of correct characters per minute, 
        cpm_tag.innerText = char_index - mistakes; 
        // to count the number of words per minute:
        // first -> subtract the total mistakes from the total typed characters
        // second-> divide it by 5 (assuming that: one word = 5 charachters)
        // third -> divide the output again by the subtraction of time left fron max time
        // last  -> multiply the output with 60. (which is number of seconds in a minute)
        var wpm = Math.round((((char_index - mistakes) / 5) / (max_time - time_left)) * 60);
        // if wpm value is 0 or empty or infinity, then setting its value to 0
        if(wpm < 0 || wpm == null || wpm === Infinity){
            wpm = 0;
        }
        wpm_tag.innerText = wpm;     
    }
    else{
        input_field.value = "";
        clearInterval(timer);
    }    
}

function start_Timer(){
    // if the time left is greater than 0 then decreament the time left 
    // otherwise clear the timer
    if(time_left > 0){
        time_left--;
        timer_tag.innerHTML = time_left;
    }
    else{
        clearInterval(timer);
    }
}
function resrart_Game(){
    // calling the paragraph load function and
    // resetting the variables and elements values to default
    random_Paragraph();
    input_field.value = "";
    clearInterval(timer);
    time_left = max_time;
    char_index  = mistakes = is_typing = 0;
    mistake_tag.innerHTML = mistakes;
    timer_tag.innerHTML = time_left;
    cpm_tag.innerHTML = 0;
    wpm_tag.innerHTML = 0;
}

random_Paragraph();
input_field.addEventListener('input', srart_Typing);
try_again_btn.addEventListener('click', resrart_Game);