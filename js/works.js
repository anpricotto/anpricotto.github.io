$(function(){
    var mql = window.matchMedia('screen and (max-width: 768px)');
    var $html = $('html');
    var $menu = $('#togglewrap > ul#menu');

    // 새로고침하면 페이지 가장 상단으로 이동
    $html.animate({scrollTop: 0},10);
    toggle();

    mql.addEventListener("change",function(){
        console.log('변경된 코드 실행');

        // 브라우저 화면 크기가 변하면 페이지 가장 상단으로 이동
        $html.animate({scrollTop: 0},10);

        if (mql.matches == false) {
            $menu.attr('style','display:flex');
        } else if (mql.matches) {
            $menu.attr('style','display:none');
        };
    });


    function toggle (){
        // 토글 메뉴 클릭하면 메뉴 보이도록
        $('#toggle').on('click',function(){
            if ($menu.is(':hidden')) {
                $menu.css({marginRight : '-100%'}).show().animate({display: 'block', marginRight: 20},300);
            } else if (!$menu.is(':hidden')) {
                $menu.animate({marginRight : '-100%'},300,function(){
                    $menu.hide();
                });
            };
        });
    }
}); //onready