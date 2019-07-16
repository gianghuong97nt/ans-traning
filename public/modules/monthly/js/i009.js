/**
 * TOSMAC PROJECT
 * user master-m001l
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/19 - create
 * @author          :
 */
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
        initTrigger();
    } catch (e) {
        alert('ready: ' + e.message);
    }
});

/**
 * function initialize
 *
 * @author  :   chinhnb - 2017/12/18 - create
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
 * @author  :   chinhnb - 2017/12/18 - create
 * @author  :
 *
 */
function initTrigger() {
    try {
        //auto search
        if ($('#searchFlag').val() == '1') {
            search();
        }
    } catch (e) {
        alert('iniTrigger' + e.message);
    }
}

/**
 * function initEvents
 *
 * @author  :   chinhnb - 2017/12/18 - create
 * @author  :
 *
 */

function initEvents() {
    try {

        //btn search
        $(document).on('click', '#btn-search', function() {
            try {
                search();
            } catch (e) {
                alert('Eror #btn-search ' + e.message);
            }
        });

        //btn search
        $(document).on('click', '#btn-save', function() {
            try {
                if($('#table-area tbody tr.no-data').length >0){
                    jError('Do not save. Not record');

                }else{
                    jMessage(1, function(r){
                        if(r) {
                            if (validate(_obj)) {
                                save();
                            }
                        }
                    });
                }

            } catch (e) {
                alert('Eror #btn-save ' + e.message);
            }
        });


        $(document).on('keypress', '.charac_special', function () {
            try {
                return blockSpecialChar(event);
            } catch (e) {
                alert('special characters' + e.message);
            }
        });


        // $(document).on('change', '.emp_cd', function() {
        //     try {
        //         $(this).closest('td').addClass('changeEmp_cd');
        //         $(this).closest('tr').find('company_cd');
        //         var emp_cd = $(this).val();
        //         refer(emp_cd);
        //     } catch (e) {
        //         alert('Eror #btn-save ' + e.message);
        //     }
        // });

        // $(document).on('change', '.emp_cd', function() {
        //     try {
        //         var emp = $(this).parents('.emp_cd');
        //         $(this).closest('.input-group').addClass('test-td');
        //         refer(emp);
        //     } catch (e) {
        //         alert('Eror #btn-save ' + e.message);
        //     }
        // });


    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

function refer(element) {
    try{
        var data    = {};
        data.emp_cd = element.find('.emp_cd_edit').val();

        $.ajax({
            type: 'POST',
            url: '/monthly/i009/refer',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                // console.log(res);
                // var abc = element.find('.test-td');
                // alert(abc.attr('abc'));
                // abc.find('.emp_cd_edit').val(res['emp_cd']);
                element.find('.emp_cd_edit').val(1);
                element.find('.emp_nm_edit').text(res['emp_nm']);
            },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('refer employee_cd ' + e.message);
    }
}

function search(){
    try{
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            url: '/monthly/i009/search',
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

function getAllDataTable(target_table){
    var data=[];
    target_table.find('tbody tr:visible').each(function(i){
        var element={};
        // element['company_cd']   =  $(this).attr('company_cd');
        element['project_no']   =  $(this).find('.project_no').attr('project_no');
        element['emp_cd']  =  $(this).find('.emp_cd').val();
        data[i]=element;
    });
    return data;
}

function save(){
    try{
        var data = {};
        data = getAllDataTable($('#table-area'));
        // console.log(data);
        // debugger;
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
                            // window.location.reload();
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
        alert('#btn-search ' + e.message);
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


