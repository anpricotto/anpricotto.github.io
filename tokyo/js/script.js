$(function(){

    var audio = document.getElementById('audio');

    // more 버튼 눌렀을 때 나타나는 정보들
    var $moreasakusa = $('#more_asakusa');
    var $moreshibuya = $('#more_shibuya');
    var $moreshinjuku = $('#more_shinjuku');

    // more 눌렀을 때 나타날 기사들 목록
    var $asakusa = [$('<div></div>').addClass('featured')
                    .append($('<div></div>').addClass('titleWrap logo4')
                        .append($('<h4>갓파바시 주방용품 거리</h4>'))
                        .append($('<span>かっぱ橋道具街</span>')))
                    .append($('<div></div>').addClass('infoWrap')
                        .append($('<p>100년 이상의 역사를 자랑하는 상점가. 약 800m의 거리에는 일본, 서양, 중화 요리용 식기, 칠기, 과자 제조용 기계, 주방용 설비기구, 식품 원재료, 포장 용품, 음식 모형 등 약 160개 가게들이 즐비하게 늘어서 있다.</p>'))
                        .append($('<img src="./images/kappabashi_kitchenware_town.jpg" alt="갓파하시 주방용품 거리 사진">')))
                    ,$('<div></div>').addClass('featured')
                    .append($('<div></div>').addClass('titleWrap logo5')
                        .append($('<h4>에도 다이토 전통 공예관</h4>'))
                        .append($('<span>江戸たいとう伝統工芸館</span>')))
                    .append($('<div></div>').addClass('infoWrap')
                        .append($('<p>약 50종류 250여 점의 전통 공예품을 상설전시. 관내 대형 디스플레이 및 스마트폰으로 전시물에 대한 자세한 해설 서비스를 제공한다. 일본어 외에 영어, 중국어(간체, 번체자), 한국어 지원. 접수처에서는 일부 전통 공예품 구입도 가능하다.</p>'))
                        .append($('<img src="./images/edo_taito.jpg" alt="에도 다이토 전통 공예관 사진">')))
                    ,$('<div></div>').addClass('featured')
                    .append($('<div></div>').addClass('titleWrap logo6')
                        .append($('<h4>아사쿠사 문화관광 센터</h4>'))
                        .append($('<span>浅草文化観光センター</span>')))
                    .append($('<div></div>').addClass('infoWrap')
                        .append($('<p>다이토구의 관광 안내 시설. 관광 안내(일본어/영어/중국어/한국어)와 티켓 판매 이외에 정보 단말기도 무료로 이용할 수 있다. 아사쿠사의 거리가 한눈에 바라보이는 전망 테라스도 인기다.</p>'))
                        .append($('<img src="./images/tour_info_center.jpg" alt="아사쿠사 문화관광 센터 사진">')))

    ];

    var $shibuya = [$('<div></div>').addClass('featured')
                    .append($('<div></div>').addClass('titleWrap logo4')
                        .append($('<h4>MIYASHITA PARK</h4>'))
                        .append($('<span>MIYASHITA PARK</span>')))
                    .append($('<div></div>').addClass('infoWrap')
                        .append($('<p>2020년 오픈한 시부야의 랜드마크. 공원·상업 시설·호텔이 하나가 된 저층 복합 시설로 일본에서 처음 문을 연 숍과 새로운 스타일로 화제가 된 숍은 물론 레스토랑도 즐비하다. 일본 각 지역의 요리를 제공하는 가게가 모여 있는 시부야 요코초도 인기. 4층에는 누구나 가볍게 스포츠를 즐길 수 있는 시부야 구립 미야시타 공원이 있다.</p>'))
                        .append($('<img src="./images/miyashita_park.jpg" alt="미야시타 공원 사진">')))
                    ,$('<div></div>').addClass('featured')
                    .append($('<div></div>').addClass('titleWrap logo5')
                        .append($('<h4>오모테산도</h4>'))
                        .append($('<span>表参道</span>')))
                    .append($('<div></div>').addClass('infoWrap')
                        .append($("<p>메이지진구 신궁의 참배로로 정비된 거리. 길 양쪽으로 느티나무가 늘어서 있어 차분한 분위기를 자아낸다. '오모테산도 힐즈'나 '도큐 플라자 오모테산도 하라주쿠'등의 복합상업시설이나 브랜드 숍, 카페, 레스토랑 등 세련된 가게가 즐비하다. </p>"))
                        .append($('<img src="./images/omotesando.jpg" alt="오모테산도 사진">')))
                    ,$('<div></div>').addClass('featured')
                        .append($('<div></div>').addClass('titleWrap logo6')
                            .append($('<h4>다케시타도리 거리</h4>'))
                            .append($('<span>竹下通り</span>')))
                        .append($('<div></div>').addClass('infoWrap')
                            .append($("<p>중, 고등학생을 중심으로 젊은이들이 넘치는 약 400m의 거리, 인기 캐릭터, 아이돌 굿즈, 저렴한 옷과 예쁜 액세서리 등을 판매하는 가게들이 틈새 없이 늘어서 있다.</p>"))
                            .append($('<img src="./images/dakeshitadori.jpg" alt="다케시타도리 사진">')))
    ];
    var $shinjuku = [$('<div></div>').addClass('featured')
                        .append($('<div></div>').addClass('titleWrap logo4')
                            .append($('<h4>하나조노진자 신사</h4>'))
                            .append($('<span>花園神社</span>')))
                        .append($('<div></div>').addClass('infoWrap')
                            .append($('<p>고층 빌딩 밀집 구역에 있는 17세기 중반에 탄생한 신사다. 매년 11월에 열리는 유명한 토리노이치 축제에는 몇십만 명의 사람들이 구마데를 사러 오는데, 길조를 비는 물건인 구마데는 운을 부른다고 여겨져 왔다. 음식을 파는 노점들도 있다.</p>'))
                            .append($('<img src="./images/hanajono.jpg" alt="하나조노진자 신사 사진">')))
];

    $moreasakusa.on('click',function(){
        // more 버튼 누르면 기사 2개씩 더 나오도록
        var splice = $asakusa.splice(0,2);

        $.each(splice,function(){
            $(this).appendTo($('#asakusaWrap'));
        });
        if ($asakusa.length == 0) {
            $moreasakusa.hide();
        }
    });

    $moreshibuya.on('click',function(){
        // more 버튼 누르면 기사 2개씩 더 나오도록
        var splice = $shibuya.splice(0,2);

        $.each(splice,function(){
            $(this).appendTo($('#shibuyaWrap'));
        });
        if ($shibuya.length == 0) {
            $moreshibuya.hide();
        }
    });

    $moreshinjuku.on('click',function(){
        // more 버튼 누르면 기사 2개씩 더 나오도록
        var splice = $shinjuku.splice(0,2);

        $.each(splice,function(){
            $(this).appendTo($('#shinjukuWrap'));
        });
        if ($shinjuku.length == 0) {
            $moreshinjuku.hide();
        }
    });

    $('#aside > ul > li > a').not('.GNBMenu').on('click',function(event){
        event.preventDefault();

        var move = $(this).attr('href');
        var moveOffsetTop = $(move).offset().top;

        $('#article').animate({scrollTop: moveOffsetTop + 300},400);

    });

    // 프로그램에서 참조하는 요소를 미리 탐색
    var $GNBMenu = $('.GNBMenu');

    // class가 GNBMenu인 요소(a요소)를 클릭하면  //-> a요소의 기본 이벤트 제거하기!
    $GNBMenu.on('click', function (event){
        event.preventDefault();

        //class가 GNBMenu인 요소의 다음에 나오는 요소가 화면에 보이는 상태라면 slideUp 효과를 준다.
        $(this).next().slideToggle();
    });

    $('#memoicon').on('dblclick', function(){
        $('#memo').show();
    });

    $('#musicicon').on('dblclick',function(){
        $('#music').show();
    });

    $('#tokyoicon').on('dblclick',function(){
        $('#page').show();
    });

    $('#recycleicon').on('dblclick', function(){
        $('#recycle').show();
    });


    $('#save').on('click',function(){
        $(this).toggleClass('on');
    });
    $('#favorite').on('click',function(){
        $(this).toggleClass('on');
    });

    // music 창 play/ pause
    $('#playmusic').on('click',function(){
        audio.play();
    });
    $('#pausemusic').on('click',function(){
        audio.pause();
    });

    $('.close').each(function(){
        $(this).on('click',function(){
            $(this).parents('.page').hide();
        });
    });

    $('#alert > button').on('click',function(){
        $('#recycle').hide();
    });

    // 시계 표시
    function setClock(){
        var dateInfo = new Date();
        var hour = modifyNumber(dateInfo.getHours());
        var min = modifyNumber(dateInfo.getMinutes());
        var ampm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour ? hour : 12; // 0시는 12로 표시

        document.getElementById("clock").innerHTML = hour + ":" + min + ' ' + ampm;
    }

    function modifyNumber(time){
        if(parseInt(time)<10){
            return "0"+ time;
        }
        else
        return time;
    }
    window.onload = function(){
        setClock();
        setInterval(setClock,1000);
    }
}); // .onready