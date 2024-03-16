$(function(){

    // 프로그램에서 참조하는 요소를 미리 탐색
    var $GNBMenu = $('.GNBMenu');
    //1. class가 GNBMenu인 요소(a요소)를 클릭하면  //-> a요소의 기본 이벤트 제거하기!
    $GNBMenu.on('mouseover', function (event){
        event.preventDefault();

        //class가 GNBMenu인 요소의 다음에 나오는 요소가 화면에 보이는 상태라면 display:none 스타일 속성을 준다.
        $GNBMenu.next(':visible').css('display','none');
        //4. click 이벤트가 발생한 요소의 다음에 나오는 요소가 화면에 안 보이는 상태라면 display: block 스타일 속성을 준다.
        $(this).next(':hidden').css('display','block');
    });

}); // .onready