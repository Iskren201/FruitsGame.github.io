//jquery.js
var playing = false;
var score;
var trialsLeft;
var step;
var action; 
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
$(function(){
    

    
$("#startreset").click(function(){

    //we are playing
    if(playing == true){

       
        location.reload();
    }else{

        //we are not playing
        playing = true; 

        //set score to 0
        score = 0; 
        $("#scorevalue").html(score);

        //show trials left 
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        
        $("#gameOver").hide();

        
        $("#startreset").html("Reset Game");

       
        startAction();
    }
});

    
//slice a fruit
    
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); 

    $("#slicesound")[0].play();
    
    //stop fruit
    clearInterval(action);
    
   
    $("#fruit1").hide("explode", 500); 
    
   
    setTimeout(startAction, 800);
});
 



    
function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){
    
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); 
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    
    //generate a random step
    step = 1+ Math.round(5*Math.random()); // change step
    
    
    action = setInterval(function(){
        
       
        $("#fruit1").css('top', $("#fruit1").position().top + step);                              
    
       
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
           
            if(trialsLeft > 1 ){
                //generate a fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                
                step = 1+ Math.round(5*Math.random()); // change step
                
                
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                playing = false; 
                $("#startreset").html("Start Game"); 
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

// generate a random fruit

function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] +'.png');   
}



function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});