var time = 30;
var timeOn = true;
var correct = Math.floor(Math.random() * 4)

function out(){
    $(".popup-overlay, .popup-content").removeClass("active");
}

function countTime(){
    if (time === 0){
        timeOn = false;
        $('#time').addClass('hidden');
        $(".popup-overlay, .popup-content").addClass("active");
    } else if (timeOn == true){
        time--;
        $('#time').text("Time Remaing: " + time);
    }
}
setInterval(countTime, 1000);

    $('#start').on('click', function(){
        $('#start').addClass('hidden');
        $('#trivia').html(`<h3 id="time">Time Remaing: ${time}</h3>
            <h4 id="question"></h4>
            <h5 id="a"></h5>
            <h5 id="b"></h5>
            <h5 id="c"></h5>
            <h5 id="d"></h5>
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
            var qArr = ["a","b","c","d"];
            var ranQ = qArr[correct];
            var letter = $(`#${ranQ}`);
            letter.html(response.results[0].correct_answer);
        }); 
    });

   

    // var qurl = "https://opentdb.com/api.php?amount=10&type=multiple"
    //     $.ajax({
    //         url: qurl,
    //         method: 'GET'
    //     }).then(function(response){
    //         $('question').html(response.results[1].question);
    //     }); 