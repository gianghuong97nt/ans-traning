var _obj = {
      'company_cd'		    : {'type': 'text', 'attr': {'maxlength': '4'	 , 'class': 'required' , 'tabindex': '1'}}
    , 'section_cd'		    : {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': 'required' , 'tabindex': '2'}}
    , 'emp_cd'		        : {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': 'required' , 'tabindex': '3'}}
    , 'estimate_ym'         : {'type': 'text', 'attr': {'maxlength': '4'     , 'class': 'required' , 'tabindex': '3'}}
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
        $("#company_cd").focus();
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
        //refer-sectioncd
        //
        $(document).on('lm001change', '#company_cd', function() {
            try {
                var $company_cd_new =   $("#company_cd").val();
                $("#section_cd").parents(".popup").data("option1",$company_cd_new);
                $("#emp_cd").parents(".popup").data("option1",$company_cd_new);

                $("#section_cd").val("");
                $(".section_nm").html("");
                $(".emp_nm").html("");
                $("#emp_cd").val("");
            } catch (e) {
                alert('Error #btn-search ' + e.message);
            }
        });
        $(document).on('change', '#estimate_ym,#section_cd,#emp_cd,#company_cd', function() {
            try {
                    if ($("#company_cd").val() != '' && $("#section_cd").val() != '' && $("#emp_cd").val() != '' && $("#estimate_ym").val() != ''){
                        search();
                        searchSum();
                    }
                // }
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('click', '#btn-csv', function() {

            try {
                 var status = 1;
                 exportI008(1);
                
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('click', '#btn-export', function() {
            try {
                 $status = 2;
                 exportI008(2);
                
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('click', '#btn-import-csv', function() {
            try {
                 $status = 3;
                 exportI008(3);
                
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('click', '#btn-print', function() {
            try {
                 exportI008_Plus();
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('click', '#btn-delivery', function() {
            try {
                 exportI008_SheetEx();
                
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('click', '#btn-approve-estimate', function() {
            try {
                 exportI008_PDFFind();
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
         $(document).on('change', '.sales_estimate_amt', function() {
            try {
                var percent = 0;
                var sales_estimate_amt_row = $(this).val();
                var gross_estimate_amt_row = $(this).closest('tr').find('.gross_estimate_amt').val();
                if((sales_estimate_amt_row == 0 && gross_estimate_amt_row !='') || (sales_estimate_amt_row == 0 && gross_estimate_amt_row =='') || (sales_estimate_amt_row == 0 && gross_estimate_amt_row ==0)){
                    percent = 0 ;
                    $(this).closest('tr').find('.profit').text(String(percent)+'%');
                }
                else if( sales_estimate_amt_row != '' && gross_estimate_amt_row !=''){  
                    sales_estimate_amt_row = sales_estimate_amt_row.replace(/,/g,'');  
                    gross_estimate_amt_row = gross_estimate_amt_row.replace(/,/g,'');         
                    percent = parseFloat(gross_estimate_amt_row*1 / sales_estimate_amt_row*1);
                    percent = Math.floor(percent * 10000)/100; 
                    $(this).closest('tr').find('.profit').text(String(percent)+'%');
                }

                var sum_sales_estimate_amt = 0;
                $('.sales_estimate_amt').each(function(){
                    var sales_estimate_amt = $(this).val();
                    sales_estimate_amt = sales_estimate_amt.replace(/,/g,''); 
                    sum_sales_estimate_amt =  sum_sales_estimate_amt + sales_estimate_amt*1;
                });
                $('#sum_sales').val(String(sum_sales_estimate_amt).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('change', '.gross_estimate_amt', function() {
            try {
                var sales_estimate_amt_row = $(this).closest('tr').find('.sales_estimate_amt').val();
                var gross_estimate_amt_row = $(this).val();
                if((sales_estimate_amt_row == 0 && gross_estimate_amt_row !='') || (sales_estimate_amt_row == 0 && gross_estimate_amt_row =='' )|| (sales_estimate_amt_row == 0 && gross_estimate_amt_row ==0)){
                    percent = 0 ;
                    $(this).closest('tr').find('.profit').text(String(percent)+'%');
                }
                else if( sales_estimate_amt_row != '' && gross_estimate_amt_row !=''){   
                    sales_estimate_amt_row = sales_estimate_amt_row.replace(/,/g,'');  
                    gross_estimate_amt_row = gross_estimate_amt_row.replace(/,/g,'');         
                    var percent = parseFloat(gross_estimate_amt_row*1 / sales_estimate_amt_row*1);
                    percent = Math.floor(percent * 10000)/100; 
                    $(this).closest('tr').find('.profit').text(String(percent)+'%');
                }
                var sum_gross_estimate_amt = 0;
                $('.gross_estimate_amt').each(function(){
                    var gross_estimate_amt = $(this).val();
                    gross_estimate_amt = gross_estimate_amt.replace(/,/g,''); 
                    sum_gross_estimate_amt =  sum_gross_estimate_amt + gross_estimate_amt*1;
                });
                $('#sum_gross').val(String(sum_gross_estimate_amt).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('change', 'table tbody tr td input', function() {
            try {
                 $(this).closest('tr').addClass('change_data');
            } catch (e) {
                alert('Error #btn-save ' + e.message);
            }
        });
        $(document).on('click', '#btn-save', function() {
            try {
                if(_validate()){
                jMessage(1, function(r){
                    if(r) {
                        save();
                    }
                });
            }
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
//lay du lieu table -> save bang json
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
//export excel
function exportL004()
{
    try {
        var data = [];
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exampleexcel',
            dataType: 'json',
            data: data,
            success: function (res) {
                switch (res['status']){
                    // Success
                    case 200:
                        location.href = '/export/excel/download?real_filename='+res['filename']+'&filename='+encodeURI(res['download_filename']);
                        break;
                    case 203:
                        jError(_text[11]);
                        break;
                    default:
                        jError(_text[36]);
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('search' + e.message);
    }
}
//export pdf-find
function exportI008_PDFFind()
{
    try {
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/find_i008pdf',
            dataType: 'json',
            data: data,
            success: function (res) {
                switch (res['status']){
                    // Success
                    case 200:
                        window.open('/download/' + res['filename']);
                        break;
                    case 203:
                        jError(_text[11]);
                        break;
                    default:
                        jError(_text[36]);
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('search' + e.message);
    }
}
//export excel
function exportI008_Plus()
{
    try {
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportI008_plus',
            dataType: 'json',
            data: data,
            success: function (res) {
                switch (res['status']){
                    // Success
                    case 200:
                        location.href = '/export/excel/download?real_filename='+res['filename']+'&filename='+encodeURI(res['download_filename']);
                        break;
                    case 203:
                        jError(_text[11]);
                        break;
                    default:
                        jError(_text[36]);
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('search' + e.message);
    }
}
//export excel
function exportI008_SheetEx()
{
    try {
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportI008_SheetEx',
            dataType: 'json',
            data: data,
            success: function (res) {
                switch (res['status']){
                    // Success
                    case 200:
                        location.href = '/export/excel/download?real_filename='+res['filename']+'&filename='+encodeURI(res['download_filename']);
                        break;
                    case 203:
                        jError(_text[11]);
                        break;
                    default:
                        jError(_text[36]);
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('search' + e.message);
    }
}
//export excel
function exportI008(status)
{
    try {
        var data = {};
        data.company_cd  = $("#company_cd").val();
        data.section_cd  = $("#section_cd").val();
        data.emp_cd      = $("#emp_cd").val();
        data.estimate_ym = $("#estimate_ym").val();
        data.status      =  status;
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportI008',
            dataType: 'json',
            data: data,
            success: function (res) {
                switch (res['status']){
                    // Success
                    case 200:
                        location.href = '/export/excel/download?real_filename='+res['filename']+'&filename='+encodeURI(res['download_filename']);
                        break;
                    case 203:
                        jError(_text[11]);
                        break;
                    default:
                        jError(_text[36]);
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('search' + e.message);
    }
}
//search ket qua tim kiem theo cac dieu kien tren man hinh
function search(){
     try{
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            url: '/monthly/i008/result',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                $('table .emp_cd:first').focus();
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
//refer tong
function searchSum(){
     try{
        var data = {};
        data.company_cd  = $("#company_cd").val();
        data.section_cd  = $("#section_cd").val();
        data.emp_cd      = $("#emp_cd").val();
        data.estimate_ym = $("#estimate_ym").val();
        $.ajax({
            type: 'POST',
            url: '/monthly/i008/sum',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                $("#sum_sales").val(res[0][0].sum_sales);
                $("#sum_gross").val(res[0][0].sum_gross);
            },
            // Ajax error
            error: function (res) {
            },
        });
    }catch (e) {
        alert('#btn-search ' + e.message);
    }
}
//thuc hien chuc nang save
function save(){
    try{
        var data = gettabledata();
        $.ajax({
            type: 'POST',
            url: '/monthly/i008/save',
            dataType: 'json',
            loading: true,
            data: $.extend({}, data),
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        jMessage(2,function(){
                            search();
                            searchSum();
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
        // alert(offset + '-' +offsetTable )
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
/**
 * function gettabledata
 *
 * @author  :   nghianm - 2019/07/25 - create
 * @author  :
 *
 */
 function gettabledata(){
    var data = {};
    var array   =   [];
    $('#table-area tbody tr').each(function(index) {
        list = {};
        if($(this).find('.sales_estimate_amt').val() != '' || $(this).find('.gross_estimate_amt').val() !='' || $(this).hasClass('change_data')){
            list.month = $(this).find('.month').val();
            list.sales_estimate_amt = $(this).find('.sales_estimate_amt').val();
            list.gross_estimate_amt = $(this).find('.gross_estimate_amt').val();
            array.push(list);
        }
    });
    data.data_json = array;
    data.company_cd     = $('#company_cd').val();
    data.section_cd     = $('#section_cd').val();
    data.emp_cd         = $('#emp_cd').val();
    data.estimate_ym    = $('#estimate_ym').val();
    return data;
}