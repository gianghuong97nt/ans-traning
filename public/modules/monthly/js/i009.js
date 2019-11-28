var _obj = {
    'project_nm'		    : {'type': 'text', 'attr': {'maxlength': '100'	 , 'class': '' , 'tabindex': '1'}}
    , 'client_cd'		    : {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': 'numeric' , 'tabindex': '2'}}
    , 'client_br_cd'		: {'type': 'text', 'attr': {'maxlength': '4'	 , 'class': 'numeric' , 'tabindex': '3'}}
    , 'emp_cd'		        : {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': 'numeric' , 'tabindex': '4'}}
    , 'sales_recorded_date_fr'	: {'type': 'text', 'attr': {'maxlength': '7'	 , 'class': '' , 'tabindex': '7'}}
    , 'sales_recorded_date_to'	: {'type': 'text', 'attr': {'maxlength': '7'	 , 'class': '' , 'tabindex': '8'}}
};
$(document).ready(function () {
    try {
        initialize();
        initEvents();
    } catch (e) {
        alert('ready: ' + e.message);
    }
});
function initialize() {
    try {
        initItem(_obj);
        $('#btn-save').addClass('disable');
        jTableFixedHeader();
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
function initEvents() {
    try {
        //btn search
        $(document).on('click', '#btn-search', function() {
            try {
                search();
            } catch (e) {
                alert('Error #btn-search ' + e.message);
            }
        });
        //btn search
        $(document).on('click', '#btn-save', function() {
            try {
                jMessage(1, function(r){
                    if(r) {
                        save();
                    }
                });
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('keydown', '.emp_cd2', function (e) {
            if (e.keyCode == 13) {
                $('#refer-search').trigger('change');
            }
        });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
function search(){
    try{
        var data = {};
        data.project_nm     = $('#project_nm').val();
        data.client_cd      = $('#client_cd').val();
        data.client_br_cd   = $('#client_br_cd').val();
        data.emp_cd         = $('#emp_cd').val();
        data.sales_recorded_date_fr = $('#sales_recorded_date_fr').val();
        data.sales_recorded_date_to = $('#sales_recorded_date_to').val();
        if($('#sales_recorded_date_fr').val() != ''){
            data.sales_recorded_date_fr = $('#sales_recorded_date_fr').val() + '/01';
        }
        if($('#sales_recorded_date_to').val() != ''){
            data.sales_recorded_date_to = $('#sales_recorded_date_to').val() + '/01';
        }
        $.ajax({
            type: 'POST',
            url: '/monthly/i009/search',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                if($('#table-area tbody tr.no-data').length >0){
                    $('#project_nm').focus();
                    $('#btn-save').addClass('disable');
                }else {
                    $('#btn-save').removeClass('disable');
                    $('table .emp_cd:first').focus();
                    _setTabIndex();
                    jTableFixedHeader();
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('#btn-search ' + e.message);
    }
}

function getAllDataTable(target_table){
    var data=[];
    var j = 0;
    target_table.find('tbody tr:visible').each(function(i){
        var element={};
        if($(this).find('.emp_cd').val() != $(this).closest('tr').find('.empcd_old').text()){
            element['id']   = i+1;
            element['project_no']   =  $(this).find('.project_no').attr('project_no');
            element['emp_cd']  =  $(this).find('.emp_cd').val();
            data[j]=element;
            j++;
        }
    });
    return data;
}

function save(){
    try{
        var data = {};
        data = getAllDataTable($('#table-area'));
        $.ajax({
            type: 'POST',
            url: '/monthly/i009/save',
            dataType: 'json',
            loading: true,
            data: $.extend({}, data),
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        jMessage(2,function(){
                            search();
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
                    case '204':
                        jMessage(36,function(){
                        });
                        break;
                    default:
                        break;
                }
            }
        });
    }catch (e) {
        alert('#btn-search ' + e.message);
    }
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
