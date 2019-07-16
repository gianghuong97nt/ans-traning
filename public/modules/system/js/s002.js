/**
 * TOSMAC PROJECT
 * user master-s002
 *
 * @copyright       :   ANS-ASIA
 * @author          :   BINHNN - 2017/12/21 - create
 * @author          :
 */
var _obj = {
        'user_div'			: {'type': 'text', 'attr': {'maxlength': '1',   'class': 'required'	, 'tabindex': '1'}}
};

$(document).ready(function () {
    try {
        initialize();
        initEvents();
    } catch (e) {
        alert('ready: ' + e.message);
    }
});

/**
 * function initialize
 *
 * @author  :   ans-asia binhnn - 2017/12/21 - create
 * @author  :
 *
 */
function initialize() {
    try {
        initItem(_obj);
        //
        jTableFixedHeader();
        //
        //var user_div =  $("#user_div").val();
        //search(user_div);

    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

/**
 * function initEvents
 *
 * @author  :   ans-asia binhnn - 2017/12/21 - create
 * @author  :
 *
 */
function initEvents() {
    try {
        //
        $(document).on('click','#avail_typ,#avail_mnu_typ,#avail_upd_typ,#avail_del_typ,#avail_out_typ',function() {
            //
            try {
                var count = $('#table-data tbody tr').length;
                var value = $(this).is(':checked');
                var item = $(this).attr('id');
                //
                fnc_checked(value,count,item);
                //
            } catch (e) {
                alert('click checked ' + e.message);
            }
        });

        $(document).on('click','.avail_typ,.avail_mnu_typ,.avail_upd_typ,.avail_del_typ,.avail_out_typ',function() {
            try {
                var $this = $(this),
                    $type = $this.attr('class'),
                    $checkbox = $('#table-data tbody tr').find('.'+$type).length,
                    $checkboxChecked = $('#table-data tbody tr').find('.'+$type+':checked').length;
                //
                if($checkbox==$checkboxChecked) {
                    $('#'+$type).attr('checked','checked');
                } else {
                    $('#'+$type).removeAttr('checked');
                }
            } catch (e) {
                alert('click checked ' + e.message);
            }
        });

        //save button
        $(document).on('click', '#btn-save', function() {
            try {
                if (!fnc_check()){
                    jMessage(23, function(r){
                        if(r) {
                            $('#user_div').focus();
                        }
                    });
                }else{
                    jMessage(1, function(r){
                        if(r) {
                            //
                            if (validate(_obj)) {
                                save();
                            }
                        }
                    });
                }
            } catch (e) {
                alert('#btn-save ' + e.message);
            }
        });
        //user_div  refer data
        $(document).on('change','#user_div',function(){
            try{
                var user_div = $("#user_div").val();
                //
                search(user_div,function(){
                    $('#user_div').focus();
                });
            }catch (e){
                alert('change type_div: ' + e.message);
            }
        });
    } catch (e) {
        alert('initEvents: ' + e.message);
    }
}

/**
 * function save
 *
 * @author  :   ans-asia binhnn - 2017/12/21 - create
 * @author  :
 *
 */
function save(){
    try {
        var data = {};
        var user_div = $('#user_div').val();
        //
        data.user_div = user_div
        data.mode = $("#mode").val();
        data.rows = getDataSave();
        //
        $.ajax({
            type: 'POST',
            url: '/system/s002/save',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        jMessage(2,function(){
                            search(user_div,function(){
                                $("#table-data tbody tr:first").find('.avail_typ').focus();
                            });
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
    } catch (e) {
        alert('Eror function save ' + e.message);
    }
}

/**
 * function search
 *
 * @author  :   ANS-ASIA BINHNN - 2017/12/26 - create
 * @author  :
 *
 */
function search(user_div, callback) {
    try {
        var data = {};
        data['user_div'] = user_div;
        //
        $.ajax({
            type: 'POST',
            url: '/system/s002/search',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                $("#table-data tbody").empty();
                $("#table-data tbody").append(res.data);
                //
                var cnt             = res.data_chk[0]['cnt'];
                var avail_typ       = res.data_chk[0]['avail_typ'];
                var avail_mnu_typ   = res.data_chk[0]['avail_mnu_typ'];
                var avail_upd_typ   = res.data_chk[0]['avail_upd_typ'];
                var avail_del_typ   = res.data_chk[0]['avail_del_typ'];
                var avail_out_typ   = res.data_chk[0]['avail_out_typ'];
                //
                if(avail_typ == cnt){
                    $("#avail_typ").attr('checked','checked');
                }else{
                    $("#avail_typ").attr('checked',false);
                }
                if(avail_mnu_typ == cnt){
                    $("#avail_mnu_typ").attr('checked','checked');
                }else{
                    $("#avail_mnu_typ").attr('checked',false);
                }
                if(avail_upd_typ == cnt){
                    $("#avail_upd_typ").attr('checked','checked');
                }else{
                    $("#avail_upd_typ").attr('checked',false);
                }
                if(avail_del_typ == cnt){
                    $("#avail_del_typ").attr('checked','checked');
                }else{
                    $("#avail_del_typ").attr('checked',false);
                }
                if(avail_out_typ == cnt){
                    $("#avail_out_typ").attr('checked','checked');
                }else{
                    $("#avail_out_typ").attr('checked',false);
                }
                //
                $("#mode").val(res.mode);
                //
                $("#table-data tbody tr:first").find('.avail_typ').focus();
                $('#registration_footer').html(res.createUpdate);
                // tuan create 2018/03/29- media query, show on ipad
                if (matchMedia) {
                    const mq = window.matchMedia("(max-width: 1024px)");
                    mq.addListener(WidthChange);
                    WidthChange(mq);
                }
                //
                jTableFixedHeader();
            }
        });
    } catch (e) {
        alert('search ' + e.message);
    }
}

// tuan create - media query change
function WidthChange(mq) {
    if (mq.matches) {
        //$('.w-ipad').css('width','1145px');
    } else {
        // window width is less than 500px
    }
}

/**
 * get data
 *
 * @author  :   ANSS-ASIA BINHNN - 2017/12/26 - create
 * @author  :
 *
 */
function getDataSave() {
    try {
        var data={};
        //
        $('#table-data tbody tr').each(function (i, row) {
            var $row = $(row);
            var row_value = {};
            //
            row_value['prg_id']          = $row.find('.prg_id').text();
            row_value['avail_typ']      = ($row.find('.avail_typ').is(':checked') == true)?1:0;
            row_value['avail_mnu_typ'] = ($row.find('.avail_mnu_typ').is(':checked') == true)?1:0;
            row_value['avail_upd_typ'] = ($row.find('.avail_upd_typ').is(':checked') == true)?1:0;
            row_value['avail_del_typ'] = ($row.find('.avail_del_typ').is(':checked') == true)?1:0;
            row_value['avail_out_typ'] = ($row.find('.avail_out_typ').is(':checked') == true)?1:0;
            row_value['remarks']        = $row.find('.remarks').val();
            //
            data[i] = row_value;
        });
        return data;
        //
    } catch (e) {
        alert('getDataSave ' + e.message);
    }
}

function fnc_check(){
    //
    var flag      = true;
    var user_div  =  $('#user_div').val();
    var avail_typ = $("#table-data tbody tr:first").find('.avail_typ').val();
    //
    if( avail_typ == undefined && user_div != -1){
        flag = false;
    }
    //
    return flag;
}

function fnc_checked(value,count,item){
    if(count > 0) {
        if(value == false){
            $('#table-data').find('.'+item+'').removeAttr('checked');
        }else{
            $('#table-data').find('.'+item+'').attr('checked','checked');
        }
    }
}

/**
 * validate function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/19 - create
 * @author        :
 */
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
            _he = 127;
        } else {
            $('.scroll-div1').css({
                'overflow-x':'auto',
                'display':'none'
            });
            //
            _he = 109;
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