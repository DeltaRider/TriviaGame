var time = 20;
var timeOn = true;
var ranNum = Math.floor(Math.random() * 4);
var letters = ["A. ","B. ","C. ","D. "];
var options = [];
var correctAnswer;
var timeInterval = setInterval(countTime, 1000);

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
        clearInterval(timeInterval);
    } else if (timeOn == true){
        time--;
        $('#time').text("Time Remaing: " + time);
    }
}
setInterval(timeInterval);

    $('#start').on('click', function(){
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
    });