$(function(){
    // section 1 - I'm ticker롤링
    var DURATION = 2500;
    var $jobList = $('#tickerWrap > ul');
    // 페이지 스크롤 이벤트
    var $window = $(window);
    var $sections = $('#fix > section');
    // section 5 - email ticker롤링
    var $sendList = $('#email > h3 > div > ul');
    // section 5 - email 복사/ 롤링
    var $email = $('#email > div > p')
    var $emailList = $('#email > div');
    var $menu = $('#menu');
    var mql = window.matchMedia('screen and (max-width: 768px)');

    // 타이머 미리 선언
    var jobListtimer = null;
    var wheeltimer = null;
    var emailtimerMobile = null;
    var emailtimerWeb = null;



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

    // 처음에는 보이지 않도록 설정
    $sections.css('opacity', '0').data('appear', false);

    execute();

    // $window.on('resize',function(){
    //     window.clearTimeout(timer);
    //     window.clearTimeout(wheeltimer);
    //     window.clearTimeout(emailtimerMobile);
    //     window.clearTimeout(emailtimerWeb);
    //     timer = window.setTimeout(execute,DELAY);
    // });

    mql.addEventListener("change",function(){
        execute();

        window.clearInterval(jobListtimer);
        window.clearInterval(wheeltimer);
        window.clearInterval(emailtimerMobile);
        window.clearInterval(emailtimerWeb);
    });

    function execute(){
        console.log('변경된 코드 실행');

        jobListtimer = window.setInterval (function(){
            if (mql.matches) {
                $jobList.css({'margin-top':'-54px','transition-duration':'400ms'});
            } else {
                $jobList.css({'margin-top':'-144px','transition-duration':'400ms'});
            }
            window.setTimeout(function () {
                $jobList.removeAttr('style');
                $jobList.find('li:eq(0)').appendTo($jobList);
            },400);
        },DURATION);


        $sections.eq(0).css({marginTop: 600, opacity: 0}).data('appear',true);
        if (mql.matches) {
            $sections.eq(0).animate({marginTop: 50, opacity: '1'},700);
        } else {
            $sections.eq(0).animate({marginTop: 100, opacity: '1'},700);
        }

        // 스크롤 이벤트
        $window.on('scroll',function(){
            var viewport = $window.height();
            var scrollTop = $window.scrollTop();
            // 뷰포트 높이+ 스크롤 된 높이 (+ 50px 위)
            var border = viewport + scrollTop - 50;


            $sections.each(function(){
                var itemTop = $(this).offset().top;

                if (!$(this).is(':animated')) {
                    if (itemTop <= border && !$(this).data('appear')) {
                        if (mql.matches) {
                            // 뷰포트 너비가 768px 보다 좁을 때
                            $(this).css('margin-top', 300).data('appear', true).animate({ marginTop: 100, opacity: 1 }, 700);
                        }
                        else {
                            // 뷰포트 너비가 768px 보다 넓을 때
                            $(this).css('margin-top', 600).data('appear', true).animate({ marginTop: 200, opacity: 1 }, 700);
                        };
                    } else if (itemTop > border && $(this).data('appear')) {
                        $(this).data('appear', false).animate({ marginTop: 0, opacity: 0 }, 10);
                    };
                };
            });
        });

        var $wheel = $('#wheel');
        // my works 작업물 슬라이드
        // 뷰포트의 너비가 768px보다 작을때, 5000ms마다 첫번째 작업물이 마지막으로 이동한다
        if (mql.matches) {
            wheeltimer = window.setInterval(function(){
                $wheel.append($wheel.children(':first'));
                },5000);
        };

        // section 5 - email 롤링
        if (mql.matches) {
            emailtimerMobile= window.setInterval (function(){
                $sendList.css({'margin-top':'-55px','transition-duration':'400ms'});
                removeStyle();
                },DURATION);
        } else {
            emailtimerWeb = window.setInterval (function(){
                $sendList.css({'margin-top': '-120px','transition-duration':'400ms'});
                removeStyle();
                },DURATION);
        };

        // section 5 - 이메일 복사/ 롤링
        if (mql.matches == false) {
            $email.clone().appendTo($emailList).clone().appendTo($emailList);

            window.setInterval(function(){
                $emailList.append($emailList.children(':first'));
            },5000);
        } else {
            $emailList.children('p').not(':first').remove();
        };
    }

    function removeStyle (){
        window.setTimeout(function(){
                $sendList.removeAttr('style');
                $sendList.find('li:eq(0)').appendTo($sendList);
        },400);
    }

}); // .onready