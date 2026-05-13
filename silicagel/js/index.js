$(function(){

    var $html = $('html');
    var $window = $(window);
    var $toggle = $('.toggle');
    var $asideMenu = $('#aside-menu');
    var $image = $('#box > img');
    var $email = $('#email');

    var $checkbox = $('.checkbox > input');
    // 페이지의 인덱스
    var pageIndex = 0;

    // 스크롤 중인지 체크
    var isScrolling = false;

    // 마지막 페이지 인덱스
    var lastPageIndex = $('.page').length - 1;

    // 뷰포트 높이
    var windowHeight = $window.height();

    // 새로고침을 하면 첫 페이지로 이동
    $html.animate({scrollTop: 0},10);
    
    // 페이지 하나씩 넘어가는 효과
    // 1. 마우스 휠 버튼을 굴리면
    window.addEventListener('wheel', function(event){
        // 기본 이벤트 제거
        event.preventDefault();

        //스크롤이 진행되는 중, deltaY 값이 너무 작은 경우 무시
        if (isScrolling || Math.abs(event.deltaY) < 50) return;


        //1. 인덱스 계산
        if (event.deltaY > 0) {
            if (pageIndex >= lastPageIndex) return;
            pageIndex++;
        } else {
            if (pageIndex <= 0) return;
            pageIndex--;
        }

        //2. 계산된 인덱스로 모든 상태 업데이트
        isScrolling = true; // 플래스 제어
        updatePageStatus();

        // 애니메이션 끝날 때 쯤 플래그 해제
        this.setTimeout(function() {
            isScrolling = false;
        }, 1000) 

        // 마우스 휠이 굴러갈 땐 오버레이 이미지를 안 보이게 설정
        if ($overlay.is(':visible')){
            $overlay.hide();
        };
    },{passive: false});

    // 상태 업데이트 함수
    function updatePageStatus() {
        //A. 스크롤 할 위치를 계산
        // 뷰포트의 높이 * 이동할 페이지의 인덱스
        var posTop = windowHeight * pageIndex;
        $html.stop(true, true).animate({scrollTop: posTop}, 800);

        // A-1. 첫번째 페이지에서 h1 숨기기
        $('h1').toggleClass('hidden', pageIndex == 0);

        //B. 섹션 활성화 클래스
        $('.page').removeClass('is-active').eq(pageIndex).addClass('is-active');

        //C. newsletter 페이지가 뜬 경우, img 페이드인
        const isNewsletterPage = (pageIndex === lastPageIndex - 1);
        $image.toggleClass('fadeIn', isNewsletterPage);

        //D. asideMenu 끄기
        if ($asideMenu.is(':visible'))
            $asideMenu.hide();
    }


    // 뷰포트의 크기가 바뀌면 windowHeight를 재설정
    window.addEventListener('resize',function(){
        windowHeight = $window.height();
    });
    //------------------------------페이지 하나씩 넘어가는 효과------------------------------


    // gallery - photodump
    var $photodump = $('.photodump');

    $photodump.clone().addClass('dump2').insertAfter($photodump);
    $photodump.addClass('dump1');

    var $firstDump = $photodump.eq(0);
    var $secondDump = $photodump.eq(1);

    window.setInterval(function(){
        $firstDump.removeClass('dump1').addClass('dump2').insertAfter($secondDump);
    },10000);

    // eyesmag - 아이즈매거진 서브이미지 변경 효과
    var $fadeslide = $('.slide-fade');

    window.setInterval (function(){
        // 항상 마지막 요소를 찾아서 애니메이션 실행
        var $lastItem = $fadeslide.find('li').last();

        $lastItem.animate({'opacity':'0'},1500);

        window.setTimeout(function(){
            $lastItem.prependTo($fadeslide).css({'opacity':'1'});
        },1500);
    },3000);

    // page 5 - 코스모폴리탄 이미지 슬라이드 효과
    var $cosmoslide = $('.slide-carousel');


    window.setInterval (function(){
        $cosmoslide.css({'transform':'translateX(-20%)','transition-duration':'2000ms'});
        window.setTimeout(function () {
            $cosmoslide.removeAttr('style');
            $cosmoslide.find('li:eq(0)').appendTo($cosmoslide);
        },2000);
    },2500);

    // page 6 - 이미지 슬라이드 with indicator
    var $albumList = $('.album_slide_list');
    var $albumLength = $albumList.children().length;
    var albumIndex = 0;
    var $prev = $('.slide_prev_btn');
    var $next = $('.slide_next_btn');

    $albumList.css('width', ($albumLength * 100) + '%');
    
    // 이미지 슬라이드
    var INTERVAL = 2000;

    var timerId = window.setInterval(slideAlbum,INTERVAL);

    $albumList.on({
        mouseenter: function(){
            window.clearInterval(timerId);
        },
        mouseleave: function(){
            timerId = window.setInterval(slideAlbum,INTERVAL);
        }
    });
    // next 버튼
    $next.on({
        mouseenter: function(){
            window.clearInterval(timerId);
        },
        mouseleave: function(){
            timerId = window.setInterval(slideAlbum,INTERVAL);
        },
        click: slideAlbum
    });

    // prev 버튼
    $prev.on({
        mouseenter: function(){
            window.clearInterval(timerId);
        },
        mouseleave: function(){
            timerId = window.setInterval(slideAlbum,INTERVAL);
        },
        click: function(){
            $albumList.prepend($albumList.children(':last'))
            .css({marginLeft: '-100%'}).animate({marginLeft: 0});

            albumIndex--;
            albumIndex %= $albumLength;
            printClass();
        }
    });

    // indicator 요소 생성
    var $indicator = $('<ol></ol>').attr('id','indicator');

    $albumList.children().each(function(index){
        $('<li></li>').append('<span>' + (index + 1) + '</span>').appendTo($indicator);
    });
    $indicator.children(':first').addClass('on');

    $indicator.insertAfter($albumList);

    // indicator의 bullet을 클릭했을 때 발생하는 이벤트
    $indicator.children().on('click',function(){
        // 이미 on인 상태라면 동작하지 않게 한다.
        if ($(this).is('.on')) return;

        // albumList가 몇 칸만큼 왼쪽으로 이동하도록 한다.
        // 몇 칸인지 구한다.
        var index = $indicator.children().index(this);

        var step = index - albumIndex;

        if (step < 0 ) step += $albumLength;

        // albumList가 몇 칸만큼 왼쪽으로 이동하게 만든다.
        $albumList.animate({marginLeft: step * -100 + '%'}, function (){

            $albumList.removeAttr('style').children(':lt('+ step + ')')
            .appendTo(this);
        });

        albumIndex = index;


        // 앨범의 순서에 따라 강조되는 indicator의 순서도 바뀌도록 한다.
        printClass();

    }); // indicator.onclick 이벤트


    // 메뉴 오버레이 창 나타나는 효과
    // class가 toggle인 요소를 클릭하면
    $toggle.on('click',function(){
        // asideMenu가 서서히 나타난다.
        $asideMenu.fadeIn('100ms','linear');

        $asideMenu.on('click',function(){
            $asideMenu.fadeOut();
        });
    }); // toggle.onclick 이벤트

    // newsletter - all 버튼 동작
    $('#all').on('change',function(){
        if ($(this).is(':checked'))
            $checkbox.prop('checked',true)
        else
            $checkbox.prop('checked',false);
    }); //all - check

    // newsletter - submit 알림창 동작
    $('#box').on('submit',function(event){
        event.preventDefault();

        // 이메일 체크 정규식
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (!regExp.test($email.val())) {

            $('<div></div>').html('형식에 맞지 않는 이메일입니다.').addClass('alert').appendTo('#page4').show()
            .css({transitionDuration: '400ms', bottom: '20%',}).delay(500).fadeOut();
            $email.focus();

            return;

        } else if (!$checkbox.is(':checked')) {
            $('<div></div>').html('최소 하나의 관심사를 선택해주세요.').addClass('alert').appendTo('#page4').show()
            .css({transitionDuration: '400ms', bottom: '20%',}).delay(500).fadeOut();

            return;

        } else if (regExp.test($email.val()) && $checkbox.is(':checked')) {
            $('<div></div>').html('실제로 제출되지 않습니다.').addClass('alert').appendTo('#page4').show()
            .css({transitionDuration: '400ms', bottom: '20%',}).delay(500).fadeOut();

            $checkbox.prop('checked',false);
            $email.val('');
        };
    }); //submit

//----------------------------------------------------------------------------------------------
    // 인디케이터에 on 클래스 부여
    function printClass(){
        $indicator.children().removeClass('on').eq(albumIndex).addClass('on');
    }

    // 앨범 목록이 왼쪽으로 이동하고 첫번째 앨범은 마지막으로 이동
    function slideAlbum(){
        albumIndex++;
        albumIndex %= $albumLength;

        printClass();

        $albumList.stop().animate({ marginLeft: '-100%' }, 500, function() {
            $(this).append($(this).children(':first')).css('margin-left', 0);
        });
    }


}); // document.onready