$(function(){

    var $html = $('html');
    var $window = $(window);
    //section별 aside 요소
    var $aside = $('.aside');
    var $toggle = $('.toggle');
    var $overlay = $('#overlay');
    var $image = $('#box > img');
    var $loadPage = $('#loadPage');
    var $logoblack = $('#logoblack');
    var $logowhite = $('#logowhite');
    var $email = $('#email');

    var $checkbox = $('.checkbox > input');
    // 페이지의 인덱스
    var pageIndex = 0;

    // 마지막 페이지 인덱스
    var lastPageIndex = $('.page').length - 1;

    // 뷰포트 높이
    var windowHeight = $window.height();


    // 새로고침을 하면 첫 페이지로 이동
    $html.animate({scrollTop: 0},10);

    // 초기 로딩화면
    // 로딩화면이 보여지는 동안 스크롤이 안 보이도록 (뒤의 요소들이 보이지 않도록) 설정한다.
    // 5000ms에 걸쳐 #logowhite가 회전, 40배로 커진다. → css animation으로 처리// 4000초가 되었을 때 사라지도록 함.
    // 4000ms가 지나면 #loadPage의 배경색이 변한다.
    // 동시에 #logowhite는 보이지 않게 설정한다.
    // #logoblack이 40배 크기에서 1배 크기로 4000ms에 걸쳐 줄어든다.
    // 시간이 지난 후 #loadPage는 사라진다.

    // $loadPage.on('click',function(){
    //     $(this).hide();
    // });
    // $loadPage.hide();
    // $('#page').show();
    $('#page').hide();
    window.setTimeout(function(){
        // #logowhite은 보이지 않게 설정한다.
        $logowhite.css('display','none');
        // #logowhite가 30배 크기에서 1배 크기로 3000ms에 걸쳐 줄어든다.
        $logoblack.show().css('animation','logoblack 2000ms');
        // 4000ms가 지나면 #loadPage의 배경색이 변한다.
        $loadPage.css({backgroundColor:'#fff',transitionDuration: '1000ms'});


        window.setTimeout(function(){
            $loadPage.hide();
            $('#page').show();
        },3000)
    },4000);


    // 페이지 하나씩 넘어가는 효과
    // 1. 마우스 휠 버튼을 굴리면
    window.addEventListener('wheel', function(event){
        // 기본 이벤트 제거
        event.preventDefault();

        // 마우스 휠이 굴러갈 땐 오버레이 이미지를 안 보이게 설정
        if ($overlay.is(':visible')){
            $overlay.hide();
        };

        // 스크롤이 진행되는 도중에 발생한 wheel 이벤트는 무시
        if ($html.is(':animated')) return;

        // 이동할 페이지의 인덱스를 계산
        // 1.1. 마우스 휠 버튼을 아래쪽으로 굴릴 경우
        if(event.deltaY > 0) {
            // 마지막 페이지일 경우 이벤트 종료
            if (pageIndex >= lastPageIndex) return;
            console.log ('pageIndex =' + pageIndex);
            console.log('lastPageIndex = ' + lastPageIndex);
            // 1.2. 다음 페이지로 스크롤 한다.
            pageIndex++;

            // 첫 페이지를 제외하고 (-1), 각 페이지의 aside 요소를 오른쪽에서 왼쪽으로 보이도록 슬라이드
            $aside.eq(pageIndex - 1).not('.asideMove').addClass('asideMove');
            // 지나간 페이지의 aside 요소는 다시 숨김
            $aside.eq(pageIndex - 2).removeClass('asideMove').css('transition','transform 1000ms');

            // 만약 마지막 페이지라면(푸터가 보일 때), 마지막에서 2번째 페이지의 aside는 사라지지 않게 한다.
            if (pageIndex == lastPageIndex)
                $aside.eq(pageIndex - 2).addClass('asideMove');

        }
        // 1.3. 마우스 휠 버튼을 위쪽으로 굴릴 경우
        else if (event.deltaY <= 0) {
            // 첫 페이지일 경우 이벤트 종료
            if (pageIndex <= 0) return;
            console.log ('pageIndex =' + pageIndex);
            console.log('lastPageIndex = ' + lastPageIndex);
            // 1.4. 이전 페이지로 스크롤 한다.
            pageIndex--;

            // 첫 페이지를 제외하고 (-1), 각 페이지의 aside 요소를 오른쪽에서 왼쪽으로 보이도록 슬라이드
            $aside.eq(pageIndex - 1).not('.asideMove').addClass('asideMove');
            $aside.eq(pageIndex).removeClass('asideMove');
        };

        // 스크롤 할 위치를 계산
        //  뷰포트의 높이 * 이동할 페이지의 인덱스
        var posTop = windowHeight * pageIndex;

        // 계산한 위치로 스크롤
        $html.animate ({scrollTop: posTop});

        // newsletter 페이지가 뜬 경우, img들이 서서히 나타나도록 한다.(스크롤을 내렸을 때만)
        if (posTop == windowHeight * (lastPageIndex - 1))
            {if (event.deltaY <= 0) return;
            $image.addClass('fadeIn');
        } else {
            $image.removeClass('fadeIn');
        };
    },{passive: false});

    // 뷰포트의 크기가 바뀌면 windowHeight를 재설정
    window.addEventListener('resize',function(){
        windowHeight = $window.height();
    });
    //------------------------------페이지 하나씩 넘어가는 효과------------------------------


    // page 2 - 이미지 슬라이드 with indicator
    var $albumList = $('#albumList > ul');
    var $albumLength = $albumList.children().length;
    var albumIndex = 0;
    var $prev = $('#prev');
    var $next = $('#next');

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
        // id가 overlay인 요소가 서서히 나타난다.
        $overlay.fadeIn('100ms','linear');

        $overlay.on('click',function(){
            $overlay.fadeOut();
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

        $albumList.animate({marginLeft: '-100%'},function(){
            $albumList.removeAttr('style').children(':first').appendTo(this)
        });
    }


}); // document.onready