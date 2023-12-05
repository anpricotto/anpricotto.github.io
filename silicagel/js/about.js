$(function(){

    var $window = $(window);
    var $toggle = $('#toggle');
    var $overlay = $('#overlay');
    var $members = $('.member');

    // 메뉴 오버레이 창 나타나는 효과
    // id가 toggle인 요소를 클릭하면
    $toggle.on('click',function(){
        // id가 overlay인 요소가 서서히 나타난다.
        $overlay.fadeIn('100ms','linear');

        $overlay.on('click',function(){
            $overlay.fadeOut();
        });
    }); // toggle.onclick 이벤트

    $members.data('slide',false);

    // scroll되는 위치에 따라 멤버 정보가 옆에서 나타나도록
    $window.on('scroll',function(){
        var viewport = $window.height();
        var scrollTop = $window.scrollTop();

        var border = viewport + scrollTop - 100;

        
        $members.each(function(){
            var itemTop = $(this).offset().top;

            // 현재 요소가 animate인 상태가 아닐 경우
            if (!$(this).is(':animated')) {
                // itemTop이 border보다 클 경우,
                if(itemTop <= border && !$(this).data('slide')) {
                    // 홀수번째 요소는 왼쪽에서 오른쪽으로 이동하고
                    if($(this).index() % 2 == 0) {
                        $(this).data('slide',true).animate({marginLeft: 0, opacity:1},1000)}
                    // 짝수번째 요소는 오른쪽에서 왼쪽으로 이동한다.
                    else if ($(this).index() % 2 !== 0) {
                        $(this).data('slide',true).animate({marginRight: 0, opacity:1},1000)};
                } else if (itemTop > border && $(this).data('slide'))
                    if($(this).index() % 2 == 0) {
                        $(this).data('slide',false).animate({'margin-left':'-50%', opacity: 0},1000)}
                    else if ($(this).index() % 2 !== 0) {
                        $(this).data('slide',false).animate({'margin-right':'-50%', opacity: 0},1000)
                };
            }; 

        });

    });


}); // document.onready