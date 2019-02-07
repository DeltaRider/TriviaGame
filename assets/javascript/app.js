var time = 40;
var timeOn = true;
var ranNum = Math.floor(Math.random() * 4);
var letters = ["A. ","B. ","C. ","D. "];
var options = [];
var correctAnswer;
var timeInterval
var right = 0;
var wrong = 0;
var questions = 0;
var preguntas = 10;

function out(){
    $(".popup-overlay, .popup-content").removeClass("active");
}

function countTime(){
    if (time === 0){
        $('#time').addClass('hidden');
        $('#question').addClass('hidden');
        $('#answers').addClass('hidden');
        $(".popup-overlay, .popup-content").addClass("active");
        $('.timeout').append(`<h5 id="pop">You didn't guess in time!
        <br><br>The answer was ${correctAnswer}!</h5>`);
        timeOn = false;
        time = 40;
        clearInterval(timeInterval);
        options = [];
        wrong++;
        questions++;
        ranNum = Math.floor(Math.random() * 4);
        setTimeout(qCheck, 3000);
    } else if (timeOn == true){
        time--;
        $('#time').text("Time Remaing: " + time);
    }
}

function gameOn(){
        timeOn = true;
        timeInterval = setInterval(countTime, 1000);
        setInterval(timeInterval);
        $('#start').addClass('hidden');
        $('#trivia').html(`<h3 id="time">Time Remaing: ${time}</h3>
            <h4 id="question"></h4>
            <div id="answers">
            </div>
            <!--Creates the popup body-->
            <div class="popup-overlay">
                <!--Creates the popup content-->
                <div class="popup-content">
                    <div class="timeout"></div>     
                </div>
            </div><!--End of popup-->
        `);
        var qurl = "https://opentdb.com/api.php?amount=1&type=multiple"
        $.ajax({
            url: qurl,
            method: 'GET'
        }).then(function(response){
            $('#question').html(response.results[0].question);
            correctAnswer = response.results[0].correct_answer;
            options.push(response.results[0].incorrect_answers);
            options[0].splice(ranNum, 0, correctAnswer);
            for(var i=0; i<4; i++){
                $('#answers').append(`<div id="choices"><span>${letters[i]}</span>${options[0][i]}</div>`);
            }
        }); 
}

$('#start').on('click', function(){
    gameOn();
});

    $(document).on('click', '#choices', function(){
        var word = $(this).text();
        var needVal = word.split(". ");
        if (needVal[1] == correctAnswer){
            $('#time').addClass('hidden');
            $('#question').addClass('hidden');
            $('#answers').addClass('hidden');
            $(".popup-overlay, .popup-content").addClass("active");
            $('.timeout').append(`<h5 id="pop">That is correct!
            <br><br>${correctAnswer} is the right answer!</h5>`);
            timeOn = false;
            clearInterval(timeInterval);
            right++;
            questions++;
            options = [];
            time = 40;
            ranNum = Math.floor(Math.random() * 4);
            setTimeout(qCheck, 3000); 
        } else {
            $('#time').addClass('hidden');
            $('#question').addClass('hidden');
            $('#answers').addClass('hidden');
            $(".popup-overlay, .popup-content").addClass("active");
            $('.timeout').append(`<h5 id="pop">WRONG!
            <br><br>The answer was ${correctAnswer}!</h5>`);
            timeOn = false;
            clearInterval(timeInterval);
            wrong++;
            questions++;
            options = [];
            time = 40;
            ranNum = Math.floor(Math.random() * 4);
            setTimeout(qCheck, 3000);
        }
    });

function qCheck(){
    if (questions == preguntas){
        $('#time').addClass('hidden');
        $('#question').addClass('hidden');
        $('#answers').addClass('hidden');
        $(".popup-overlay, .popup-content").addClass("active");
        $('.timeout').html(`<h5 id="pop">Game Over!
        <br><br>Correct: ${right}  |  Incorrect: ${wrong}</h5>
        <br><br><button class="lilbutt" id="again">Play Again</button>`);
    } else gameOn();
}

$(document).on('click','#again', function(){
    questions = 0;
    right = 0;
    wrong = 0;
    options = [];
    time = 40;
    gameOn();
});

{/* <button class="lilbutt" id="reset">Change Settings</button> */}