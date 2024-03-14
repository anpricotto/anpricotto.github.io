$(function(){

    var audio = document.getElementById('audio');


    $('#aside > ul > li > a').on('click',function(event){
        event.preventDefault();

        var move = $(this).attr('href');
        var moveOffsetTop = $(move).offset().top;

        console.log ()
        $('#article').animate({scrollTop: moveOffsetTop + 200},400);

    });


    $('#memoicon').on('dblclick', function(){
        $('#memo').show();
    });

    $('#musicicon').on('dblclick',function(){
        $('#music').show();
    });

    $('#tokyoicon').on('dblclick',function(){
        $('#page').show();
    });

    $('#recycleicon').on('dblclick', function(){
        $('#recycle').show();
    });


    $('#save').on('click',function(){
        $(this).toggleClass('on');
    });
    $('#favorite').on('click',function(){
        $(this).toggleClass('on');
    });

    // music 창 play/ pause
    $('#playmusic').on('click',function(){
        audio.play();
    });
    $('#pausemusic').on('click',function(){
        audio.pause();
    });

    $('.close').each(function(){
        $(this).on('click',function(){
            $(this).parents('.page').hide();
        });
    });

    $('#alert > button').on('click',function(){
        $('#recycle').hide();
    });

    // 시계 표시
    function setClock(){
        var dateInfo = new Date();
        var hour = modifyNumber(dateInfo.getHours());
        var min = modifyNumber(dateInfo.getMinutes());
        var ampm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour ? hour : 12; // 0시는 12로 표시

        document.getElementById("clock").innerHTML = hour + ":" + min + ' ' + ampm;
    }

    function modifyNumber(time){
        if(parseInt(time)<10){
            return "0"+ time;
        }
        else
        return time;
    }
    window.onload = function(){
        setClock();
        setInterval(setClock,1000);
    }
}); // .onready