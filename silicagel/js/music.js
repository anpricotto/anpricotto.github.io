$(function(){

    var $window = $(window);
    var $toggle = $('#toggle');
    var $overlay = $('#overlay');

    var $nav = $('.nav > ul > li > a');

    // 메뉴 오버레이 창 나타나는 효과
    // id가 toggle인 요소를 클릭하면
    $toggle.on('click',function(){
        // id가 overlay인 요소가 서서히 나타난다.
        $overlay.fadeIn('100ms','linear');

        $overlay.on('click',function(){
            $overlay.fadeOut();
        });
    }); // toggle.onclick 이벤트


    // nav 요소의 ul > li > a 요소를 클릭했을 때 해당 콘텐츠의 위치에서 400px 위로 이동하도록
    $nav.on('click',function(event){
        event.preventDefault();

        var move = $(this).attr('href');
        var moveOffsetTop = $(move).offset().top;

        $('html').animate({scrollTop: moveOffsetTop - 200},400);

    });

    // MORE 버튼 누르면 숨겨진 콘텐츠 나타난다.
    $('#more').on('click',function(){
        $('.hide').css({display:'grid', opacity: 0}).animate({opacity: 1},'100ms');
        // more 버튼은 사라지도록 한다.
        $(this).hide();
    });
}); // document.onready