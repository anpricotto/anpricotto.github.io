$(function(){
    var $exp = $('.exp');
    var $info = $('.info');
    var $pseudo = $('<div></div>').attr('class','pseudooff').insertBefore($info);
    var $drawers = $('#aboutme > ul > li');
    var $dropslide = $('.dropslide');
    var $h3 = $('#aboutme > ul > li > h3');

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

    });

    $exp.each(function(){
        var index = $(this).index();
        $(this).on({
            mouseenter: function(){
                $pseudo.eq(index).removeClass('pseudooff').addClass('pseudoon');
            },
            mouseleave: function(){
                $pseudo.eq(index).removeClass('pseudoon').addClass('pseudooff');
            }
        });
    });

}); // .onready