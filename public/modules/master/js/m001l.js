var _obj = {
      'company_nm'		    : {'type': 'text', 'attr': {'maxlength': '50'	 , 'class': '' , 'tabindex': '1'}}
    , 'company_adr'		    : {'type': 'text', 'attr': {'maxlength': '100'	 , 'class': '' , 'tabindex': '2'}}
    , 'company_tel'			: {'type': 'text', 'attr': {'maxlength': '20'	 , 'class': '' , 'tabindex': '3'}}
};
$(document).ready(function () {
    try {
        initialize();
        initEvents();
        initTrigger();
    } catch (e) {
        alert('ready: ' + e.message);
    }
});

function initialize() {
    try {
        initItem(_obj);
        //Fixed
        jTableFixedHeader();
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

function initTrigger() {
    try {
        //auto search
        if ($('#searchFlag').val() == '1') {
            var _page = 1 * $('#oldPageIndex').val();
            search(_page);
        }
    } catch (e) {
        alert('iniTrigger' + e.message);
    }
}

function initEvents() {
    try {
        //btn back --> quay trở lại trang ban đầu
        $(document).on('click', '#btn-back', function() {
            try {
                // trả về url của trang duoc len ket den trang nay
                var referrer = document.referrer;
                //trả về giá trị đầu tiên của mảng indexOf
                if (referrer.indexOf("m001") >= 0){
                    //gọi link được tham chiếu đến
                    fnc_refer_link(0,0);
                }else{
                    window.location.href = '/master/m001';
                }
            } catch (e) {
                alert('.btn-back' + e.message);
            }
        });
        //btn search
        $(document).on('click', '#btn-search', function() {
            try {
                search(1);
            } catch (e) {
                alert('Eror #btn-search ' + e.message);
            }
        });

        // pagging click event
        $(document).on('click', '.pagination-location li a', function () {
            try {
                var page = $(this).attr('page');
                    search(parseInt(page, 10));
            } catch (e) {
                alert('.pagination li' + e.message);
            }
        });
        $(document).on('click', '#btn-edit', function () {
            try {
                var company_cd = $(this).attr('company_cd');
                fnc_refer_link(company_cd);
            } catch (e) {
                alert('btn-edit' + e.message);
            }
        });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

function search(_page){
    try{
        var pageSize = 50;
        //
        var data = getData(_obj);
        data['page_size']		= pageSize;
        data['page']			= _page;
        $.ajax({
            type: 'POST',
            url: '/master/m001l/search',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                //
                jTableFixedHeader();
            },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('#btn-search ' + e.message);
    }
}
// Link tới một đưỡng dẫn khác
function fnc_refer_link(_company_cd){
    try {
        var objRefer = {
            init_data : {
                'company_cd' : _company_cd
            },
            back_data : {
                    'search_flag'				: '1'
                ,	'message_search_condition'	: getHtmlCondition('.search-condition')
                ,	'pageIndex'					: (($('.pagination:first li.active a').length > 0) ? $.trim($('.pagination:first li.active a').text()) : '1')
            },
            back_link : '/master/m001l',
            back_screen : __screen
        };
        postParamToLink('M001', 'detail', objRefer, '/master/m001');
    } catch (e) {
        alert('fnc_refer_link:' + e.message);
    }
}

function validate() {
    var _errors = 0;
    if (!_validate($('.content'))) {
        _errors++;
    }
    if (_errors > 0)
        return false;

    return true;
}
// Fixed header
function jTableFixedHeader(){

    var _he = 0;
    var containerWrapTarget   = $('#result > .panel-heading'),
        scrolltableTarget     = $('.wmd-view-topscroll'),
        pagingTarget          = $('.w-pading-top > .w-pading-bottom');

    //
    $(".wmd-view-topscroll").scroll(function(){
        $(".wmd-view").scrollLeft($(".wmd-view-topscroll").scrollLeft());
    });

    $(".wmd-view").scroll(function(){
        $(".wmd-view-topscroll").scrollLeft($(".wmd-view").scrollLeft());
    });

    fixWidth();

    $(window).resize(function(){
        fixWidth();
    });

    function fixWidth() {
        var w = $('.wmd-view .table').outerWidth(true);
        if(w < 1144) {
            $('.scroll-div1').css({
                'overflow-x':'scroll',
                'display':'block',
            });
            _he = 157;
        } else {
            $('.scroll-div1').css({
                'overflow-x':'auto',
                'display':'none'
            });
            //
            _he = 139;
        }
        //
        $(".wmd-view-topscroll .scroll-div1").width(w);
    }
    //

    scrollFix();

    //
    if($('.header-menu').length > 0) {
        var offset = $('.header-menu').offset().top;
        var offsetTable = $('.fixed-header').offset().top;
        //alert(offset + '-' +offsetTable )
        if(offset > offsetTable)
        {
            $('.fixed-header thead tr th').css({
                'position':'relative',
                'background':'rgb(0, 103, 151)',
                'outline':'.5px solid #ddd',
                'z-index':'22',
                'top':((offset - offsetTable)+_he)+'px',
            });
            containerWrapTarget.css({
                'position':'relative',
                'background':'rgb(0, 103, 151)',
                'outline':'.5px solid #ddd',
                'z-index':'22',
                'top':((offset - offsetTable)+_he)+'px',
            });
            pagingTarget.css({
                'position':'relative',
                'background':'rgb(255, 255, 255)',
                //'outline':'.5px solid #ddd',
                'z-index':'22',
                'top':((offset - offsetTable)+_he)+'px',
            });
            scrolltableTarget.css({
                'position':'relative',
                'background':'rgb(0, 0, 0)',
                'z-index':'22',
                'top':((offset - offsetTable)+_he)+'px',
            });
        }
    }

    function scrollFix() {
        $(window).scroll(function(){
            var offset = $('.page-content').offset().top;
            var offsetTable = $('.fixed-header').offset().top;
            var scrollTop = $(window).scrollTop();
            // alert((offsetTable - offset) + ' '+ scrollTop);
            // alert((scrollTop-(offsetTable - offset)));
            if(scrollTop > (offsetTable - offset-_he)) {
                if($('body').width() < 1253) {
                    $('.fixed-header thead tr th').css({
                        'position':'relative',
                        'background':'rgb(0, 103, 151)',
                        'z-index':'22',
                        'outline':'.5px solid #ddd',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                    containerWrapTarget.css({
                        'position':'relative',
                        'background':'rgb(0, 103, 151)',
                        'z-index':'22',
                        'outline':'.5px solid #ddd',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                    pagingTarget.css({
                        'position':'relative',
                        'background':'rgb(255, 255, 255)',
                        'z-index':'22',
                        //'outline':'.5px solid #ddd',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                    scrolltableTarget.css({
                        'position':'relative',
                        'z-index':'22',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                } else {
                    $('.fixed-header thead tr th').css({
                        'position':'relative',
                        'background':'rgb(0, 103, 151)',
                        'outline':'.5px solid #ddd',
                        'z-index':'22',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                    containerWrapTarget.css({
                        'position':'relative',
                        'background':'rgb(0, 103, 151)',
                        'outline':'.5px solid #ddd',
                        'z-index':'22',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                    pagingTarget.css({
                        'position':'relative',
                        'background':'rgb(255, 255, 255)',
                        //'outline':'.5px solid #ddd',
                        'z-index':'22',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                    scrolltableTarget.css({
                        'position':'relative',
                        'z-index':'22',
                        'top':(scrollTop-(offsetTable - offset)+_he)+'px',
                    });
                }
            } else {
                $('.fixed-header thead tr th').css({
                    'position':'relative',
                    'top':(0)+'px'
                });
                containerWrapTarget.css({
                    'position':'relative',
                    'top':(0)+'px'
                });
                pagingTarget.css({
                    'position':'relative',
                    'top':(0)+'px'
                });
                scrolltableTarget.css({
                    'position':'relative',
                    'top':(0)+'px'
                });
            }
        })
    }

}
