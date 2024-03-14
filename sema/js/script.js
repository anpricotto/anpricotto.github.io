$(function(){
    var $slide = $('#slide > ul');
    var INTERVAL = 2500;
    var DURATION = 500;


    window.setInterval(function(){
        $slide.css({'margin-left':'-100%','transition-duration':'500ms'});

        window.setTimeout(function(){
            $slide.removeAttr('style');
            $slide.find('li:eq(0)').appendTo($slide);
        },DURATION);
    },INTERVAL);

}); // .onready