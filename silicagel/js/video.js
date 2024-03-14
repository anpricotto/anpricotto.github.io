$(function(){

    var $toggle = $('#toggle');
    var $overlay = $('#overlay');
    var $more = $('#more');

    var $videos = [
        $('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/DIPxnt5vnhU?feature=oembed",
            title: '실리카겔 (Silica Gel) - T + Tik Tak Tok (feat. So!YoON!) [MV]',frameborder:'0'})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/9s_G8Dv25uI?si=slEcNcE7Gd5TCTG3",
            title: '실리카겔 (Silica Gel) - Budland [MV]',frameborder:'0'})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/0CZJZDPyAZY",
            title: '실리카겔 (Silica Gel) - Realize [MV]',frameborder:'0'})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/Re1neDPgExQ",
            title: "실리카겔 (Silica Gel) - Mercurial [MV]", frameborder:'0'})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/JaIMSzE5yLA",
            title: "실리카겔 (Silica Gel) - NO PAIN [MV]", frameborder:'0'})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/1tbrUM0yYLU",
            title: "실리카겔 (Silica Gel) - I'MMORTAL (feat. sogumm) [MV]", frameborder:'0'})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/aU-zmH3lrk4?list=PLl_H1_8vbaJnsyJHSgXHs7Gv4qc0kMbLn",
            title: "실리카겔 (Silica Gel) - Desert Eagle [MV] [ENG]", frameborder: "0"})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/ZCIeIY275Ow?list=PLl_H1_8vbaJnsyJHSgXHs7Gv4qc0kMbLn",
            title: "실리카겔 (Silica Gel) - S G T A P E - 01 [Visualizer]", frameborder: "0"})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/JrrQR3HCGqw?list=PLl_H1_8vbaJnsyJHSgXHs7Gv4qc0kMbLn",
            title: "실리카겔 (Silica Gel) - &#39;Hibernation&#39; [Visualizer]", frameborder: "0"})
        ,$('<iframe></iframe>').addClass('iframe').attr({width: "100%", height: "800px", src: "https://www.youtube.com/embed/C8RdxCK7Uts?list=PLl_H1_8vbaJnsyJHSgXHs7Gv4qc0kMbLn",
            title: "실리카겔 (Silica Gel) -  Kyo181 [MV]", frameborder: "0"})
    ];

    $more.on('click',function(){
        // more 버튼 누르면 비디오 2개씩 더 나오도록
        var videoSplice = $videos.splice(0,2);

        $.each(videoSplice, function(){
            $(this).appendTo('#iframewrap');
        });

        if ($videos.length == 0) {
            $more.hide();
        };
    });

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