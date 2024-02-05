$(function(){

    var $html = $('html');
    // section 1 - I'm ticker롤링
    var DURATION = 2500;
    var $jobList = $('#tickerWrap > ul');

    // section 2 - About me 서랍 애니메이션/ 가상요소
    var $edu = $('.edu');
    var $school = $('.school');
    var $exp = $('.exp');
    var $info = $('.info');

    var $pseudo1 = $('<div></div>').attr({'class':'pseudooff','id':'pseudo'}).insertBefore($school);
    var $pseudo2 = $('<div></div>').attr('class','pseudooff').insertBefore($info);
    var $drawers = $('#aboutme > ul > li');
    var $dropslide = $('.dropslide');
    var $h3 = $('#aboutme > ul > li > h3');

    // 페이지 스크롤 이벤트
    var $window = $(window);
    var $sections = $('#fix > section');

    // section 4 - project 가상요소 colored circle & 서랍 애니메이션
    var $circlewrap = $('<div></div>').attr({'class':'circlewrap'}).insertAfter($('.colors > h4'));
    var $circles = $('<div></div>').attr({'class':'coloredcircle'}).appendTo($circlewrap);
    $circles.clone().insertAfter($circles);

    var $projectdrawers = $('#projects > ul > li');
    var $dropslide2 = $('.dropslide2');





    // section 5 - email 복사/ 롤링
    var $email = $('#rolling > p')
    var $emailList = $('#rolling');
    var $menu = $('#menu');
    var mql = window.matchMedia('screen and (max-width: 768px)');

    // 타이머 미리 선언
    var jobListtimer = null;
    var wheeltimer = null;
    var emailtimerMobile = null;
    var emailtimerWeb = null;


    // 새로고침하면 페이지 가장 상단으로 이동
    // $html.animate({scrollTop: 0},10);
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

        jobListtimer = window.setInterval (function(){
            if (mql.matches) {
                $jobList.css({'margin-top':'-54px','transition-duration':'400ms'});
            } else {
                $jobList.css({'margin-top':'-108px','transition-duration':'400ms'});
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


        }); // $window.onscroll

        $dropslide.hide();

        $drawers.each(function(){
            var index = $(this).index();

            $dropslide.data('drop',false);

            onoff();

            $(this).on('click',function(){

                if (!$dropslide.eq(index).data('drop')){
                    $dropslide.eq(index).slideDown().data('drop',true);
                    $h3.eq(index).off().children('.drawspan').eq(index).addClass('clip');
                } else if ($dropslide.eq(index).data('drop')){
                    $dropslide.eq(index).slideUp().data('drop',false);
                    $h3.children('.drawspan').eq(index).removeClass('clip');
                    onoff();
                }
            });

            function onoff (){
                $h3.eq(index).on({
                    mouseenter: function(){
                        $(this).children('.drawspan').addClass('clip');
                    },
                    mouseleave: function(){
                        $(this).children('.drawspan').removeClass('clip');
                    }
                });
            }
            $dropslide.on('click',function(event){
                event.stopPropagation();
            });

        }); //$drawers.each

        $edu.each(function(){
            var eduIndex = $(this).index();
            $(this).on({
                mouseenter: function(){
                    $pseudo1.eq(eduIndex).removeClass('pseudooff').addClass('pseudoon');

                },
                mouseleave: function(){
                    $pseudo1.eq(eduIndex).removeClass('pseudoon').addClass('pseudooff');
                }
            });
        });

        $exp.each(function(){
            var expIndex = $(this).index();
            $(this).on({
                mouseenter: function(){
                    $pseudo2.eq(expIndex).removeClass('pseudooff').addClass('pseudoon');
                },
                mouseleave: function(){
                    $pseudo2.eq(expIndex).removeClass('pseudoon').addClass('pseudooff');
                }
            });
        });


        // section 4 - projects
        $('#screenwrap').on('click',function(){
            $('#coverscreen').toggle();
        });

        $dropslide2.hide();
        $dropslide2.eq(0).show();

        $projectdrawers.each(function(){
            var index = $(this).index();

            $dropslide2.data('drop',false);

            $(this).on('click',function(){

                if (!$dropslide2.eq(index).data('drop')){
                    $dropslide2.eq(index).slideDown().data('drop',true);
                } else if ($dropslide2.eq(index).data('drop')){
                    $dropslide2.eq(index).slideUp().data('drop',false);
                }
            });
            $dropslide2.on('click',function(event){
                event.stopPropagation();
            });

        }); //$projectdrawers.each


        // my works - wheel
        var $wheel = $('#wheel');
        // my works 작업물 슬라이드
        // 뷰포트의 너비가 768px보다 작을때, 5000ms마다 첫번째 작업물이 마지막으로 이동한다
        if (mql.matches) {
            wheeltimer = window.setInterval(function(){
                $wheel.append($wheel.children(':first'));
                },5000);
        };

        // section 5 - 이메일 복사/ 롤링
        if (mql.matches == false) {
            $email.clone().appendTo($emailList).clone().appendTo($emailList)
            .clone().appendTo($emailList).clone().appendTo($emailList).clone().appendTo($emailList).clone().appendTo($emailList);

            window.setInterval(function(){
                $emailList.append($emailList.children(':first'));
            },5000);
        } else {
            $emailList.children('p').not(':first').remove();
        };
    }

    // function removeStyle (){
    //     window.setTimeout(function(){
    //             $sendList.removeAttr('style');
    //             $sendList.find('li:eq(0)').appendTo($sendList);
    //     },400);
    // }

}); // .onready