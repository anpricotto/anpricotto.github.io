$(function(){
    // send me 롤링
    var DURATION = 2500;
    var $sendList = $('#sendlist > ul');
    var $menu = $('#menu');


    var mql = window.matchMedia('screen and (max-width: 768px)');
    var timer = null;


    // 토글 메뉴 클릭하면 메뉴 보이도록
    $('#toggle').on('click',function(){
        if ($menu.is(':hidden') && !$menu.is(':animated')) {
            $menu.css({marginRight : '-100%'}).show().animate({marginRight: 20},300);
        } else {
            $menu.animate({marginRight : '-100%'},300,function(){
                $menu.hide();
            });
        };
    });

    execute();

    // $window.on('resize',function(){
    //     window.clearTimeout(timer);
    //     timer = window.setTimeout(execute,DELAY);
    // });

    // execute(mql);

    // mql.addEvnetListener('change',execute);
    // mql.removeEventListener("change", execute);

    mql.addEventListener("change",function(){
        execute();
        window.clearInterval(timer);
    });

    function execute (){
        console.log('변경된 코드 실행');

        timer = window.setInterval (function(){
            if (mql.matches) {
                $sendList.css({'margin-top':'-32px','transition-duration':'400ms'});
            } else {
                $sendList.css({'margin-top':'-48px','transition-duration':'400ms'});
            }
            window.setTimeout(function () {
                $sendList.removeAttr('style');
                $sendList.find('li:eq(0)').appendTo($sendList);

            },500);
        },DURATION);

        if (mql.matches) {
            // 모바일 환경에서는 planet 이미지 변경
            $('#planet > img').attr({src:'../images/contact_mobile_planet.png'});
        } else {
            // 웹 환경에서는 다시 planet 이미지 변경
            $('#planet > img').attr({src:'../images/contact_planet.png'});
        };
    }


}); // .onready