$(function(){ 

    var row = 0;
    var column = 0;
    var dynamicButton = '';
    var temp = 0;
    var recordControl = 0;
    var musicBox = ['a1.wav','a2.wav','a3.wav','a4.wav','a5.wav','a6.wav','a7.wav','a8.wav','a9.wav','a10.wav','a11.wav','a12.wav'];
    var musicRecurd = [];
    var btnColor = [];

    function createMusicBox(){

        for (var i = 0; i < row; i++) {
            dynamicButton += '<div>';   

            for (var j = 0; j < column; j++) {
                temp++;
                dynamicButton += '<button class="dynamicBtn" id="btn' + temp +'">'+ temp +'<span class="glyphicon glyphicon-music"></button>';          
            }
            dynamicButton += '</div>';          
        }
          $('#container').html(dynamicButton);
    }

    function randomize(){
        for (var j = 0; j <= temp; j++) {
            btnColor[j] = randomColors();
            $('#btn' + j).css({"background-color": btnColor[j], "width":"70px", "height":"50px"});       
        }    
    }

    function randomColors(){
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function play(num) {
        var audio;

        if(num <= 11){
            audio = new Audio(musicBox[num]);
            if(recordControl === 1){
                musicRecurd.push(musicBox[num]);
            }
        }
        else {
            var num2 = num % 12;
            audio = new Audio(musicBox[num2]);
            if(recordControl === 1){
                musicRecurd.push(musicBox[num2]);
            }
        }
        audio.play();
    }

    function rowAndColumnControl(){
        if(isNaN(row) && isNaN(column)){
            alert("Lütfen sayı giriniz !");
            return true;
        }else if(row <= 11 && column <=12){
            return false;
        }
        else {
            alert("Row alanı en fazla 11, column alanı is 12 olmalıdır...");
            return true;
        }
    }

    $('#create').on("click", function(){

        row = 0;
        column = 0;
        dynamicButton = '';
        
        row = parseInt($('#row').val());
        column = parseInt($('#column').val());

        $('#row').val("");
        $('#column').val("");

        if(rowAndColumnControl() === false){
            createMusicBox();
            randomize();

            $(".dynamicBtn").bind({
                click:function(){ 
                    
                    var input = $(this).text();
        
                    $('#btn' + input).css({"background-color": randomColors()});

                    play(parseInt(input));
                }
            });

            $( ".dynamicBtn" )
            .mouseover(function() {
                var input = $(this).text();
                $('#btn' + input).css({"background-color": randomColors()});
            })
            .mouseout(function() {
                var input = $(this).text();
                $('#btn' + input).css({"background-color": btnColor[input]});
            });

        }else {
            row = 0;
            column = 0;
        }

    });

    $("#listenMusic").hide();
    $('#record').click(function(){

        if(dynamicButton === ''){
            alert("Önce müzik kutusunu oluşturunuz!");
        }else{

            if(recordControl === 0){
                $("#listenMusic").hide();
                $(this).css('background-color', "red");
                $(this).html('<i class="glyphicon glyphicon-record"></i>');
                recordControl++;
            }else{
                $(this).css('background-color', "blue");
                $(this).html('<i class="glyphicon glyphicon-stop"></i>');
                $("#listenMusic").show();
                recordControl = 0;
            }
        }

    });

    $('#listenMusic').click(function(){
        var audio;
        for (var j = 0; j < musicRecurd.length; j++) {
            audio = "";
            audio = new Audio(musicRecurd[j]);
            audio.play();
        }
        musicRecurd = [];
    });

});