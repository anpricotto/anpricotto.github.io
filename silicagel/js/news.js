$(function(){

    var $toggle = $('#toggle');
    var $overlay = $('#overlay');
    var $more = $('#more');

    // more 눌렀을 때 나타날 기사들 목록
    var $articles = [$('<li></li>').append($('<p></p>').html('2023.08.19<br>[Saturday]').addClass('date'))
                  .append($('<p></p>').html('새 싱글 앨범 [Tik Tak Tok] 발매').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.07.20<br>[Thursday]').addClass('date'))
                  .append($('<p></p>').html('Silica Gel CHEERING KIT 온라인 판매').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.07.19<br>[Wednesday]').addClass('date'))
                  .append($('<p></p>').html('실리카겔의 정규 1집 [실리카겔] 바이닐 발매').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.06.23<br>[Friday]').addClass('date'))
                  .append($('<p></p>').html('[실리카겔] 바이닐 발매 기념 팝업').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.06.19<br>[Monday]').addClass('date'))
                  .append($('<p></p>').html('2023 실리카겔 단독공연 &lt;Machine Boy&gt; Playlist 유튜브 공개').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.05.04<br>Thursday').addClass('date'))
                  .append($('<p></p>').html('실리카겔 EP [Machine Boy] 수록곡 &apos;Budland&apos; M/V 공개').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.05.01<br>Monday').addClass('date'))
                  .append($('<p></p>').html('2023 실리카겔 단독공연 &lt;Machine Boy&gt; 앵콜공연').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.04.30<br>Sunday').addClass('date'))
                  .append($('<p></p>').html('2023 실리카겔 단독공연 : &lt;Machine Boy&gt;').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.04.25<br>Tuesday').addClass('date'))
                  .append($('<p></p>').html('실리카겔 Silica Gel EP [Machine Boy] 발매').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))

    ,$('<li></li>').append($('<p></p>').html('2023.04.11<br>Tuesday').addClass('date'))
                  .append($('<p></p>').html('&apos;Mercurial&apos; 제작 다큐멘터리 [THE MERCURIAL PROJECT DOCUMENTARY FILM] 공개').addClass('title'))
                  .append($('<button></button>').append('<span>more</span>').addClass('more'))];


    $more.on('click',function(){
        // more 버튼 누르면 기사 5개씩 더 나오도록
        var articleSplice = $articles.splice(0,5);

        $.each(articleSplice,function(){
            $(this).appendTo('#news');
        });
        if ($articles.length == 0) {
            $more.hide();
        }
    });


    // $more.on('click',function(){
    //     $('#news').append(article1, article2, article3, article4, article5);
    //     $(this).hide();

    // });


    // 메뉴 오버레이 창 나타나는 효과
    // id가 toggle인 요소를 클릭하면
    $toggle.on('click',function(){
        // id가 overlay인 요소가 서서히 나타난다.
        $overlay.fadeIn('100ms','linear');

        $overlay.on('click',function(){
            $overlay.fadeOut();
        });
    }); // toggle.onclick 이벤트
}); // document.onready