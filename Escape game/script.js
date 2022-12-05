var music = document.getElementById("musicplay")
var icon=document.getElementsByTagName("i");
var currenticon = icon[0].getAttribute("class").split(' ')
var content=document.getElementsByClassName("contener")[0];

var sholve=false;

function musicplay(btn){
    // console.log(!btn.dataset.ispaly)
    if(parseInt(btn.dataset.ispaly))
    {
        music.pause()
        btn.dataset.ispaly = 0;
        icon[0].setAttribute("class","fa-solid fa-volume-xmark")

    }    
    else{
        music.play()
        btn.dataset.ispaly = 1;  
        icon[0].setAttribute("class","fa-solid fa-volume-high")
    }

}

function viduoplay(){
    content.innerHTML=""
    content.innerHTML=`<video style = 'width:100%; position: fixed; left:0; top:0;'  autoplay><source src='video2.mp4' type='video/mp4'></video>
    <button onclick="startGame()" style = ' position: fixed; left:50%; bottom:50PX'>Skip</button>`
    music.play()
}
function startGame(){
    music.play()
    icon[0].setAttribute("class","fa-solid fa-volume-high")
    content.innerHTML=""
    document.body.style.backgroundImage = "url('imgs/background2.gif')";
    content.innerHTML=`<img src="imgs/shovel.png" onclick="changeposition(this)" alt="" style='width: 150px;
    left: 39%;
    top: 63%;
    opacity: .8;
    position: absolute;'>`

}


function changeposition(shovel){
    shovel.remove();
    content.innerHTML=`<img src="imgs/shovel.png" id="shove"  alt="" style='width: 129px;
    left: 91%;
    top: 1%;
    transform: rotate(-45deg);
    opacity: 1;
    position: absolute;' onclick="this.style.opacity=.6; sholve=true; ">
    <div id='quiz1' style='
    width: 125px;
    height: 100px;
    position: absolute;
    right: 16%;
    bottom: 2%;' onclick="firstquiz()"></div>`
}

function firstquiz(){
    content.innerHTML+=`
    <div class='hide' id='garden' style='background-image: url("imgs/garden.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' onclick="addsholve(event)">
    </div>
    <button class="exit" onclick="hide(event)">X</button>
    `
}

function hide(e){
    document.getElementsByClassName("hide")[0].remove();
    e.target.remove();
}
var gardn=document.getElementById("garden");
function addsholve(e){
    var gardn=document.getElementById("garden");
    var shovel=document.getElementById("shove");
    if(sholve){
        gardn.innerHTML=`<img id="posi_sholve" src="imgs/shovel.png"  alt="" style=' width: 195px;
        left: 38%;
        top: -8%;
        position: absolute;'></img>
        <div style='width:155px; height:100px; position:absolute; right:28%; top:49%;' onclick='quize1_sol(event)'></div> `
        shovel.remove();
        var i=1 ;
        var interval = setInterval(()=>{
            document.getElementById("posi_sholve").style.top= (parseInt(document.getElementById("posi_sholve").style.top)+1)+"%"
            if(parseInt(document.getElementById("posi_sholve").style.top) == 19){
                document.getElementById("posi_sholve").remove();
                gardn.style.backgroundImage = "url('imgs/opengarden.png')";
                clearInterval(interval)
            }       
        },50)
        sholve=false; 
        document.getElementById("quiz1").remove();
    }     
}

function quize1_sol(e){ 
    content.innerHTML="";
    content.innerHTML=`<img src="imgs/boxquiz.png" alt="" style='width: 98px;
    left: 92.5%;
    top: 6%;
    transform: rotate(30deg);
    position: absolute;' onclick='showboxsol()'>
    <div id='quiz2' style='
    width: 105px;
    height: 127px;
    position: absolute;
    right: 55.7%;
    bottom: 56%;' onclick="quiz2_box()"></div>`
    e.stopPropagation()
}

function showboxsol(){
    content.innerHTML+=`<img class='hide' src="imgs/boxquiz.png" alt="" style='
    width: 770px;
    height: 464px;
    position: absolute;
    right: 30.5%;
    top: 27%;'>
    <button class="exit" onclick="hide(event)">X</button>`
    
}

function quiz2_box(){  
    content.innerHTML+=`
    <div class='hide' id='box' style='background-image: url("imgs/box.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' onclick="addsholve()">
        <span class="numbers" style='right: 59%;' onclick="setnumbers(this)">0</span>

        <span class="numbers" style='right: 50%;' onclick="setnumbers(this)">0</span>
        
        <span class="numbers" style='right: 41%;' onclick="setnumbers(this)">0</span>

        <span class="numbers" style='right: 32%;' onclick="setnumbers(this)">0</span>
    </div>
    <button class="exit" onclick="hide(event)">X</button>
    `    
}

var solve
var box=document.getElementById("box");

function setnumbers(element){
    console.log("change number")
    element.innerText = (parseInt(element.innerText))+1 
    if(parseInt(element.innerText)==10){
        element.innerText=0
    }
    
    solve = document.getElementsByClassName("numbers")
    if(solve[0].innerText==1 && solve[1].innerText==9 && solve[2].innerText==3 && solve[3].innerText==2){
        document.getElementById("box").innerHTML="";
        document.getElementById("box").style.backgroundImage = "url('imgs/openbox.png')";
        document.getElementById("box").innerHTML+=`<img id="key" src="imgs/key.png"  alt="" style='    width: 93px;
        left: 43%;
        top: 61%;
        position: absolute;
        transform: rotate(-7deg);
        opacity: 0.8;' onclick='get_key()'></img>`;
        document.body.style.backgroundImage = "url('imgs/background2_2.gif')";
    }
}

function get_key(){
    content.innerHTML=`<img id="key" src="imgs/key.png"  alt="" style='width: 118px;
    left: 92%;
    top: 3%;
    position: absolute;
    transform: rotate(-220deg);' onclick="this.style.opacity=.6; sholve=true;"></img>
    <div style='
    width: 76px;
    height: 96px;
    position: absolute;
    right: 48%;
    top: 42%;' onclick='show_boor()'></div>`;

}

function show_boor(){
    content.innerHTML+=`<div id="door" class='hide' style='background-image: url("imgs/door.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' onclick="open_door(event)">
    </div>
    <button class="exit" onclick="hide(event)">X</button>`
}

function open_door(e){
    
    if(sholve){
        document.getElementById("key").remove();  
        var door=document.getElementById("door");
        door.style.backgroundImage = "url('imgs/thedoor_open.gif')"; 
        console.log("door open");
        console.log("door open");
        var interval = setTimeout(()=>{
            
            content.innerHTML=`<div id="door" class='hide' style='background-image: url("imgs/nextdoor.png");
            background-size: cover;
            width: 843px;
            height: 536px;
            position: absolute;
            right: 30%;
            top: 27%;
            border-radius: 12px;
            overflow: hidden;' onclick='next_door()'>
            </div>
            <button class="exit" onclick="hide(event)">X</button>` 
                
        },1000)  
    }
    sholve=false;
}

function next_door(){
    console.log("nextroom")
    content.innerHTML="";
    console.log("nextroom")
    console.log("nextroom")
    document.body.style.backgroundImage ="url('imgs/next_room.gif')";
    content.innerHTML=`<div id='photo' style='
    width: 211px;
    height: 145px;
    position: absolute;
    right: 32%;
    top: 22%;' onclick='show_photo()'></div>

    <div id='massage' style='
    width: 125px;
    height: 100px;
    position: absolute;
    right: 49%;
    top: 5%;' onclick='show_massage()' ></div>
    
    <div id='table' style='
    width: 125px;
    height: 100px;
    position: absolute;
    right: 58%;
    top: 62%;
    transform: rotate(2deg);' onclick='show_table()'></div>
    
    <div id='piano' style='
    width: 125px;
    height: 100px;
    position: absolute;
    right: 87%;
    bottom: 46%;' onclick='show_piano()'></div>
    
    <div id='box2' style='
    width: 125px;
    height: 100px;
    position: absolute;
    right: 44%;
    bottom: 2%;' onclick='show_box2()'></div>
    
    <div id='floor' style=' width: 136px;
    height: 82px;
    position: absolute;
    right: 61%;
    top: 93%;' onclick='show_floor()' ></div>
    
    <div id='dog' style='
    width: 174px;
    height: 100px;
    position: absolute;
    right: 25%;
    bottom: 30%;' onclick='show_dog()'></div>`
}
function show_photo(){
    content.innerHTML+=`
    <div class='hide' style='background-image: url("imgs/photo.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' > 
    </div>
    <button class="exit" onclick="hide(event)">X</button>
    `
}

function show_dog(){
    content.innerHTML+=`
        <div class='hide' id='dog_slep' style='background-image: url("imgs/dog.png");
        background-size: cover;
        width: 843px;
        height: 536px;
        position: absolute;
        right: 30%;
        top: 27%;
        border-radius: 12px;
        overflow: hidden;' onclick="eating_dog()">
        <button class="exit" onclick="hide(event)">X</button>
        </div>
    `
}

function show_massage(){
    content.innerHTML+=`
    <div class='hide' id="getmassage" style='background-image: url("imgs/massage.png");
    background-size: cover;
    width: 816px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' onclick="get_massage()"> 
    <button class="exit" onclick="hide(event)">X</button>
    </div>
    `
}
function show_piano(){
    content.innerHTML+=`
    <div class='hide' id='openpiano' style='background-image: url("imgs/piano.png");
    background-size: cover;
    width: 854px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' onclick='open_piano()'> 
    <button class="exit" onclick="hide(event)">X</button>
    </div>
    `
}
function show_floor(){
    content.innerHTML+=`
    <div class='hide' style='background-image: url("imgs/floor.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' > 
    </div>
    <button class="exit" onclick="hide(event)">X</button>
    `
}

function show_table(){
    content.innerHTML+=`
    <div class='hide' style='background-image: url("imgs/table.png");
    background-size: cover;
    width: 889px;
    height: 777px;
    position: absolute;
    right: 30%;
    top: 9%;
    overflow: hidden;'> 
    </div>
    <button class="exit" id='button_table' onclick="hide(event)">X</button>
    `
}
function show_box2(){
    content.innerHTML+=`
    <div class='hide' id='roombox2' style='background-image: url("imgs/box2.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' > 
        <span class="photos" style='right: 67%;' >
        <img class="imges" src='imgs/circle.png' style='top: 23%;position: absolute;right: 12%;'onclick="setphotos(this)"/></span>

        <span class="photos" style='right: 50%;' >
        <img class="imges" src='imgs/circle.png' style='top: 23%;position: absolute;right: 12%;'onclick="setphotos(this)"/></span>
        
        <span class="photos" style='right: 34.5%;' >
        <img class="imges" src='imgs/circle.png' style='top: 23%;position: absolute;right: 12%;'onclick="setphotos(this)"/></span>

        <span class="photos" style='right: 18%;'>
        <img class="imges" src='imgs/circle.png' style='top: 23%;position: absolute;right: 12%;' onclick="setphotos(this)"/></span>
        <button class="exit" onclick="hide(event)">X</button>
    </div>
    
    `
}
 
var imgs;
var box2=document.getElementById("roombox2");
function setphotos(el){
    // console.log("photo")
    // console.log(el.src.match('circle.png'))
    if(el.src.match('imgs/circle.png')){
        el.src ='imgs/Heart.png'
    }else if(el.src.match('imgs/Heart.png')){
        el.src ='imgs/Star.png'
    }else if(el.src.match('imgs/Star.png')){
        el.src = 'imgs/triangle.png'
    }else{
        el.src='imgs/circle.png'
    }
    
    imgs = document.getElementsByClassName("imges");
    console.log(imgs.length);
    if(imgs[0].src.match('circle.png') && imgs[1].src.match('triangle.png') && imgs[2].src.match('Star.png') && imgs[3].src.match('Heart.png')){
        document.getElementById("roombox2").style.backgroundImage = 'url("imgs/box2_open.png")'
        document.getElementById("roombox2").innerHTML=`<div style='
        width: 158px;
        height: 155px;
        right: 20%;
        top: 57%;
        position: absolute;' onclick="fooddog()"></div>`;
        document.body.style.backgroundImage ="url('imgs/background_openedbox.gif')";
    }
    
}

function fooddog(){
    document.getElementById("roombox2").remove();
    content.innerHTML+=`<img id="food_dog" src="imgs/food_dog.png"  alt="" style='width: 113px;
    left: 92%;
    top: 3%;
    position: absolute;
    opacity: .9;' onclick="this.style.opacity=.6; sholve=true;"></img>`
    document.getElementById("photo").remove();
    document.getElementById("table").remove();
    document.getElementById("floor").remove();
    document.getElementById("box2").remove();
}

function eating_dog(){
    if(sholve){
        document.getElementById("food_dog").remove();  
        var dogup=document.getElementById("dog_slep");
        dogup.style.backgroundImage = "url('imgs/dogup.gif')"; 

        var interval = setTimeout(()=>{
            dogup.style.backgroundImage = "url('imgs/dog_go.png')";
            dogup.innerHTML+=`<img src="imgs/pianokey.png" style='width: 100px;
            position: absolute;
            right: 45%;
            top: 28%;
            transform: rotate(-18deg);
            opacity: .8;' onclick='get_keypiano()'/>`
                
        },3300)    
    }
    sholve=false;

}

function get_keypiano(){
    document.getElementById("dog_slep").remove();
    document.getElementById("dog").remove();
    content.innerHTML+=`<img id="key_piano" src="imgs/pianokey.png"  alt="" style='width: 113px;
    left: 92%;
    top: 3%;
    position: absolute;
    opacity: 1;' onclick="this.style.opacity=.6; sholve=true;"></img>`
    document.body.style.backgroundImage ="url('imgs/background_dogup.gif ')";
}

function open_piano(){
    if(sholve){
        document.getElementById("key_piano").remove();  
        var pianoopen=document.getElementById("openpiano");
        pianoopen.style.backgroundImage = "url('imgs/piano_opening.gif')"; 
        var interval = setTimeout(()=>{
            pianoopen.style.backgroundImage = "url('imgs/piano_open.png')";
            pianoopen.innerHTML+=`<img src="imgs/sticke.png" style='width: 610px;
            position: absolute;
            right: 17%;
            top: -11%;' onclick='get_stike()'/>`
                
        },1000)  
    }
    sholve=false;
}

function get_stike(){
    document.getElementById("openpiano").remove();
    document.getElementById("piano").remove();
    content.innerHTML+=`<img id="sticke" src="imgs/sticke.png"  alt="" style='width: 194px;
    left: 90%;
    top: 2%;
    position: absolute;
    opacity: 1;
    transform: rotate3d(1, 1, 1, 45deg);' onclick="this.style.opacity=.6; sholve=true;"></img>`
    document.body.style.backgroundImage ="url('imgs/background_pianoopen.gif')";
}

function get_massage(){
    if(sholve){
        document.getElementById("sticke").remove();  
        var getmass=document.getElementById("getmassage");
        getmass.style.backgroundImage = "url('imgs/massagedown.gif')"; 
        console.log("dogup");
        console.log("dogup");
        var interval = setTimeout(()=>{
            document.getElementById("getmassage").remove();
            document.getElementById("massage").remove();
            document.body.style.backgroundImage ="url('imgs/massageon_table.gif')";
            content.innerHTML=`<div style='
            width: 69px;
            height: 59px;
            position: absolute;
            right: 53%;
            bottom: 32%;' onclick='getmassage_fromdown()' ></div>`  
        },1400)  
    }
    sholve=false;
}

function getmassage_fromdown(){
    document.body.style.backgroundImage ="url('imgs/massagehold.gif')";
    content.innerHTML=`
    <div style='
    width: 119px;
    height: 95px;
    position: absolute;
    right: 2%;
    bottom: 86%;' onclick='hold_massage()' ></div>
    `
}

function hold_massage(){
    content.innerHTML+=`
    <div class='hide' id="massage_opened" style='background-image: url("imgs/showmassage.png");
            background-size: cover;
            width: 854px;
            height: 536px;
            position: absolute;
            right: 30%;
            top: 27%;
            border-radius: 12px;
            overflow: hidden;' onclick='openmassage()'>    
    </div>
    <button class="exit" onclick="hide(event)">X</button> 
    `
}
function openmassage(){
    content.innerHTML=`
    <div class='hide' style='background-image: url("imgs/massage_opened.png");
            background-size: cover;
            width: 854px;
            height: 536px;
            position: absolute;
            right: 30%;
            top: 27%;
            border-radius: 12px;
            overflow: hidden;' onclick='get_CD()'>    
    </div>
    <button class="exit" onclick="hide(event)">X</button> 
    `
}

function get_CD(){
    content.innerHTML="";
    document.body.style.backgroundImage ="url('imgs/CD_get.gif')";
    content.innerHTML=`
    <div style='
    width: 107px;
    height: 85px;
    position: absolute;
    left: 4%;
    top: 29%;' onclick='go_toroom3()' ></div> `
}
function go_toroom3(){
    document.body.style.backgroundImage = "url('imgs/room_three.gif')";
    content.innerHTML=`
   
    <img src="imgs/handle.png"  alt="" style='width: 98px;
    left: 25%;
    bottom: 13%;
    opacity: .7;
    position: absolute;
    transform: rotate(-56deg);' onclick="position_ofhandlechange(this)">
    `
}

function position_ofhandlechange(handle){
    handle.remove();
    content.innerHTML+=`<img src="imgs/handle.png" id="handle"  alt="" style='width: 108px;
    left: 92%;
    top: 23%;
    transform: rotate(-64deg);
    opacity: 1;
    position: absolute;' onclick="this.style.opacity=.6; sholve=true; ">
    <div id="arrow2" style='
    width: 93px;
    height: 82px;
    position: absolute;
    right: 28%;
    top: 37%;' onclick='final_stage()' ></div> `
}

function final_stage(){
    document.getElementById("arrow2").remove();
    document.body.style.backgroundImage = "url('imgs/lastdoor.png')";
    document.getElementById("handle").style.top='4%';
    document.getElementById("handle").style.left='93%';
    content.innerHTML+=`
    <div id='divto_openhandelkey' style='width: 89px;
    height: 100px;
    position: absolute;
    right: 31%;
    top: 59%;' onclick='open_finaldoor()' ></div>
    `
}
function open_finaldoor(){
    content.innerHTML+=`
    <div class='hide' id="handlykey" style='background-image: url("imgs/handle_key.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' onclick='put_handle()'> 
    <button class="exit"  onclick="hide(event)">X</button>
    </div> 
    `
}

function put_handle(){
    if(sholve){
    document.getElementById("handlykey").style.backgroundImage = "url('imgs/handle_puted.png')"; 
    document.getElementById("handle").remove();
    document.getElementById("divto_openhandelkey").remove();
    content.innerHTML+=`<div id='div_showbox3' style='width: 213px;
            height: 116px;
            position: absolute;
            right: 40%;
            top: 82%;' onclick='show_box3()' ></div> 
            <div style='width: 89px;
            height: 100px;
            position: absolute;
            right: 31%;
            top: 59%;' onclick='open_finaldoor2()' ></div>` 
    }
    sholve=false;    
}
function open_finaldoor2(){
    content.innerHTML+=`
    <div class='hide' id="handly_naleskey" style='background-image: url("imgs/handle_puted.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;' onclick='put_nails()'> 
    <button class="exit"  onclick="hide(event)">X</button>
    </div> 
    `
}
function show_box3(){
    content.innerHTML+=`
    <div class='hide' id='box3' style='background-image: url("imgs/box3.png");
    background-size: cover;
    width: 843px;
    height: 536px;
    position: absolute;
    right: 30%;
    top: 27%;
    border-radius: 12px;
    overflow: hidden;'> 
    <img src="imgs/nail.png" style='position: absolute;
    left: 200px;
    top: 304px;
    opacity: .7;' onclick='get_nails()'>
    <button class="exit"  onclick="hide(event)">X</button>
    </div> 
    `
}
function get_nails(){
    document.getElementById("box3").remove();
    document.getElementById("div_showbox3").remove();
    content.innerHTML+=`<img src="imgs/nail.png" alt="" style='width: 108px;
    left: 93%;
    top: 4%;
    opacity: 1;
    position: absolute;' onclick="this.style.opacity=.6; sholve=true; ">`
}
function put_nails(){
    if(sholve){
        content.innerHTML="";
        document.body.style.backgroundImage ="url('imgs/the_end.png')"; 
        setTimeout(() => {
            document.body.innerHTML+=`
            <h2 style='position: absolute;
            font-family: Arial;
            font-size: 150px;
            animation: fadeIn 5s;
            top: 33%;
            left: 33%;
            color: white;
            font-size: 109px;
            '>END GAME<h2>` 
        },1000);
    }
    sholve=false;  
}









