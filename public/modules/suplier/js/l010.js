/**
 * 
 * L010
 *
 * @copyright       :   ANS
 * @author          :   VietDT - 2019/08/13 - create
 * @author          :
 */
 var _obj = {
    'company_cd'            : {'type': 'text', 'attr': {'maxlength': '4',   'class': 'numeric'}}
    ,       'project_no'            : {'type': 'text', 'attr': {'maxlength': '8',   'class': 'numeric'}}
    ,       'content'               : {'type': 'text', 'attr': {'maxlength':'50',   'class': ''}}
    ,       'delivery_date_fr'      : {'type': 'text', 'attr': {'maxlength': '10',  'class': ''}}
    ,       'delivery_date_to'      : {'type': 'text', 'attr': {'maxlength': '10',  'class': 'required'}}
    ,       'project_nm2'            : {'type': 'text', 'attr': {'maxlength':'100', 'class': ''}}
    ,       'delivery_nm'           : {'type': 'text', 'attr': {'maxlength':'50', 'class': ''}}
    ,       'arrival_date_fr'       : {'type': 'text', 'attr': {'maxlength': '10',  'class': ''}}
    ,       'arrival_date_to'       : {'type': 'text', 'attr': {'maxlength': '10',  'class': ''}}
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

/**
 * function initialize
 *
 * @author  :   VietDT - 2019/08/13 - create
 * @author  :
 *
 */
 function initialize() {
    try {
        initItem(_obj);
        //Fixed
        jTableFixedHeader();
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

/**
 * function initTrigger
 *
 * @author  :   VietDT - 2019/08/13 - create
 * @author  :
 *
 */
 function initTrigger() {
    try {
        //auto search
        // if ($('#searchFlag').val() == '1') {
        //     search(1);
        // }
    } catch (e) {
        alert('iniTrigger' + e.message);
    }
}
/**
 * function initEvents
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */

 function initEvents() {
    try {

        //btn search
        $(document).on('click', '#btn-search', function(e) {
            try {
                e.preventDefault();
                if (_validate($('#delivery_date_to').closest('div'))) {
                    search();
                }         
            } catch (e) {
                alert(' click btn-search ' + e.message);
            }
        });
        // btn save
        $(document).on('click', '#btn-save', function(e) {
            try {
                e.preventDefault();
                jMessage(1, function(r){
                    if (r) {
                        save(); 
                    }
                });
            } catch (e) {
                alert('click btn-save ' + e.message);
            }
        });


    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
/**
 * function search
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function search(){
    try{
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            url: '/suplier/l010/search',
            dataType: 'html',
            loading: true,

            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                initControls();
                 // _formatDatepicker();
                 // _autoFormattingDate("input.datepicker");
                 jTableFixedHeader();
                 $('.real_arrival_qty:first').focus();
                 hovertable();
             },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('search ' + e.message);
    }

}

/**
 * function save
 *
 * @author  :   VIETDT - 2019/08/15 - create
 * @author  :
 *
 */
 function save(){
    try{
        var data = gettabledata();
        $.ajax({
            type: 'POST',
            url: '/suplier/l010/save',
            dataType: 'json',
            loading: true,
            data: JSON.stringify(data),
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                    jMessage(2,function(){
                        $('.real_arrival_qty:first').focus();
                    });
                    break;
                    // Data Validate
                    case '201':
                    if (typeof res['data'] != 'undefined') {
                        _showError(res['data']);
                    }
                    break;
                    // SQL + PHP Exception
                    case '202':
                    jError(res['data'][0]['Message']);
                    break;
                    case '203':
                    jError('Erorr');
                    break;
                    default:
                    break;
                }
            }
        });
    }catch (e) {
        alert('save ' + e.message);
    }

}
/**
 * function gettabledata
 *
 * @author  :   VIETDT - 2019/08/15 - create
 * @author  :
 *
 */
 function gettabledata(){
    var data = {};
    var array   =   [];
    $('.tr-1').each(function(index) {
        list = {};
        tr_first = $(this);
        tr_second = $(this).next();
        list.id_row                 = tr_first.find('.id_row').text();
        list.company_cd             = tr_first.find('.company_cd').val();
        list.project_no             = tr_first.find('.project_no').val();
        list.project_dtl_no         = tr_first.find('.project_dtl_no').val();
        list.specification_row_no   = tr_first.find('.specification_row_no').val();
        list.order_dtl_no           = tr_first.find('.order_dtl_no').val();
        list.parts_nm               = tr_first.find('.parts_nm').text();
        list.arrival_qty            = tr_first.find('.arrival_qty').text();
        list.real_arrival_qty       = tr_first.find('.real_arrival_qty').val();
        list.stock_source           = tr_first.find('.stock_source').val();
        list.item_nm                = tr_second.find('.item_nm').text();
        list.size_nm                = tr_second.find('.size_nm').text();   
        list.arrival_date           = tr_second.find('.arrival_date').val();
        list.status_div             = tr_second.find('.status_div').val();
        list.remarks                = tr_second.find('.remarks').val();
        array.push(list);
    });


    data.data_json = array;
    return data;
}
/**
 * function hovertable
 *
 * @author  :   VIETDT - 2019/08/16 - create
 * @author  :
 *
 */
 // function hovertable(){
 //     $('#table-area tbody tr.tr-1').hover(function() {
 //        $(this).addClass('hover');
 //        $(this).next().addClass('hover');
 //    }, function() {
 //        $(this).removeClass('hover');
 //        $(this).next().removeClass('hover');
 //    });
 //     $('#table-area tbody tr.tr-2').hover(function() {
 //        $(this).addClass('hover');
 //        $(this).prev().addClass('hover');

 //    }, function() {
 //        $(this).removeClass('hover');
 //        $(this).prev().removeClass('hover');
 //    });
 // }
 function hovertable(){
     $('#table-area tbody tr').hover(function() {
        var tr_id = $(this).attr('tr_id');
        $('[tr_id='+tr_id+']').addClass('hover');
    }, function() {
        var tr_id = $(this).attr('tr_id');
        $('[tr_id='+tr_id+']').removeClass('hover');
    });
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


