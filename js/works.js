$(function(){
    var $menu = $('#menu');
    var $heart = $('#heart');

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

    // sns로고의 heart 클릭하면 하트 효과 나오도록
    $heart.on('click',function(){
        $('<img>').attr({src:'../images/footer_heart.png'}).appendTo($('#footer > ul > li:last-child'))
        .addClass('hearts')
        .animate({top: '-10px', scale: 0.8, opacity: 0},500);
    });
}); //onready