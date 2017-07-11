      // VARIABLES
      // ==========================================================================
      var correct = 0;
      var incorrect = 0;
      var noresponse = 0;
      var p = 1;
      var resp ="";
      var resp2 ="";
      var number = 30;
      var intervalId;
      var indexrandom = [];
      var bb_quiz = [{
        question:"What team did Babe Ruth play for before joining the Boston Red Sox?",
        options: ["Cincinatti Reds","Baltimore Orioles","New York yankees","Boston Braves"],
        answer: "Baltimore Orioles",
        images :'<iframe src="https://giphy.com/embed/15DpmEoqfwvMQ" width="200" height="200"></iframe>'},{
        question:"Who has played the most consecutive games of baseball, breaking Lou Gehrig's record on September 6, 1995? ",
        options: ["Moises Alou","Mark McWhire","Cal Ripken, Jr.","Barry Bonds"],
        answer: "Cal Ripken, Jr.",
        images :'<iframe src="https://giphy.com/embed/qGRPzERgvFBPG" width="200" height="200"></iframe>'},{
        question:"Who was the first Major League player to pitch a ball over 100 mph?",
        options: ["Nolan Ryan","Tom Seaver","Dwight Gooden","Roger Clement"],
        answer: "Nolan Ryan",
        images :'<iframe src="https://giphy.com/embed/PakE8WPHieq2c" width="200" height="200"></iframe>'},{
        question:"What batter claimed the MLB Triple Crown in 2012?",
        options: ["Chris Davis","Miguel Cabrera","Nolan Arenado","Ryan Braun"],
        answer: "Miguel Cabrera",
        images :'<iframe src="https://giphy.com/embed/a4ojaNOw8UisM" width="200" height="200"></iframe>'},{
        question:"What 1929 feat did Lee Richmond perform in a Major League Baseball first?",
        options: ["He had an unassisted triple play.","He pitched a perfect game.","He stole home.","He hit a grand slam."],
        answer: "He pitched a perfect game.",
        images :'<iframe src="https://giphy.com/embed/l0HlVq383tIb7wiha" width="200" height="200"></iframe>'}];

        // Functions

        var startgame = function (value){
          setvariables();
          cleanquizarea(value);
          var index = 0;
  
             index = parseInt(definerandom());
            
             resp=showanswerquestion(p,index);
           
        };


        function definerandom(){
          
            while ( indexrandom.length < bb_quiz.length) {
              var num = Math.floor(Math.random() * bb_quiz.length);
              var exis = checknumber(num);
              if (!exis){
                indexrandom[indexrandom.length] = num;
                return num;
                break;
              }
            } 
           return num;  
        };

          function checknumber(numbered) {
          var check = false;
          var lengh = indexrandom.length;
         
          // Check if a number has been used.
          for (var  k= 0; k < indexrandom.length; k++) {

             if (indexrandom[k] === numbered){
                check = true;
                return check;
                break;
             }
           }
           return check;
         };
         

          function showanswerquestion(counter,indexes){

           run(indexes);
           $("#Question").html("Question: "+counter+"/"+bb_quiz.length);
           $("#Question").append('<br>');
           $("#Question").append('<br>');
           $("#Question").append(bb_quiz[indexes].question);
           $("#Question").append('<br>');
           $("#Question").append('<br>'); 
            var ele = document.createElement("Question");
            for (var u = 0; u < bb_quiz[indexes].options.length; u++) {
               var mess = document.createTextNode(bb_quiz[indexes].options[u]);
               var radioBtn = $('<input type="radio" class="radbtn" name="rbtn" value ="'+ bb_quiz[indexes].options[u]+'"/>');
               radioBtn.appendTo('#Question');
               $("#Question").append(mess);
            }
            $("#Question").append('<br>');
            $("#Question").append('<br>');
            $("#Question").append('<button class="btn btn-default btn-lg response"><span class="glyphicon"></span><strong>NEXT</strong></button>');
    
            $(".response").on("click", function() {
              checkresult(indexes);
            });

          };

          function showresult(){

            $("#Question").empty();
            $("#Question").html("Correct Answers: "+correct);
            $("#Question").append('<br>');
            $("#Question").append('<br>');
            $("#Question").append("Incorrect Answers: "+incorrect);
            $("#Question").append('<br>');
            $("#Question").append('<br>');
            $("#Question").append("Unanswered: "+nonresponse);
            $("#Question").append('<br>');
            $("#Question").append('<br>');
            $("#Question").append('<button class="btn btn-default btn-lg again"><span class="glyphicon"></span><strong>START AGAIN?</strong></button>');
    
            $(".again").on("click", function() {
                 startgame(document);
            });

          };


          function checkresult(index2){
       
            var res = $("input:radio[name='rbtn']:checked").val();

            if (typeof(res) == 'undefined') {
              nonresponse++;
              p++;
              clearInterval(intervalId);
              number = 30;
             $("#Progress").empty();
             $("#Question").html("OUT OF TIME OR UNANSWERED");
             $("#Question").append("<br>");
             $("#Question").append("<br>");
             $("#Question").append("THE CORRECT ANSWER WAS: "+bb_quiz[index2].answer);
             $("#Question").append("<br>");
             $("#Question").append("<br>");
             $("#Question").append(bb_quiz[index2].images);
             $("#Question").append("<br>");
             $("#Question").append('<button class="btn btn-default btn-lg siguiente"><span class="glyphicon"></span><strong>NEXT</strong></button>');
    
            } else if ( res === bb_quiz[index2].answer){
                     clearInterval(intervalId);
                      number = 30;
                     $("#Progress").empty();
                     $("#Question").html("CORRECT!");
                     $("#Question").append("<br>");
                     $("#Question").append("<br>");
                     $("#Question").append(bb_quiz[index2].images);
                     $("#Question").append("<br>");
                     correct++;
                     p++;
                     $("#Question").append('<button class="btn btn-default btn-lg siguiente"><span class="glyphicon"></span><strong>NEXT</strong></button>');
                     } else{
                        incorrect++;
                        clearInterval(intervalId);
                        number = 30;
                        $("#Progress").empty();
                        $("#Question").html("INCORRECT");
                        $("#Question").append("<br>");
                        $("#Question").append("<br>");
                        $("#Question").append("THE CORRECT ANSWER WAS: "+bb_quiz[index2].answer);
                        $("#Question").append("<br>");
                        $("#Question").append(bb_quiz[index2].images);
                        $("#Question").append("<br>");
                        p++;
                        $("#Question").append('<button class="btn btn-default btn-lg siguiente"><span class="glyphicon"></span><strong>NEXT</strong></button>');
                     }
             $(".siguiente").on("click", function() {
                if (p > bb_quiz.length){
                 cleanquizarea("");
                 showresult();
                }
                else {
                 showanswerquestion(p,definerandom());
                }
             });

          };


          function run(indexes) {
             
             intervalId = setInterval(decrement,1000);
      
             function decrement() {
      
              number--;

              $("#Progress").html("Time Remaining: "+number+" Seconds");

              if (number === 0) {
                  clearInterval(intervalId);
                  checkresult(indexes);
              }
                return number;
              }

          };

        function setvariables(){
          correct = 0;
          incorrect = 0;
          nonresponse = 0;
          p=1;
          number=30;
          resp ="";
          resp2 ="";
          indexrandom = [];
        };
         
        function cleanquizarea(value){
           $(value).remove();
        };

    // MAIN PROCESS
    
     $(document).ready(function(){
        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/images/charge.mp3");
        audioElement.play();

        $(".play-ball-button").on("click", function() {
           audioElement.pause();
           startgame(this);
        });

     });

    