/**
 * 
 * I006
 *
 * @copyright       :   ANS
 * @author          :   VIETDT - 2019/07/25 - create
 * @author          :
 */
 var _obj = {
    'company_cd'           : {'type': 'text', 'attr': {'maxlength': '4',   'class': 'numeric'}}
    ,'project_no'           : {'type': 'text', 'attr': {'maxlength': '8',   'class': 'numeric'}}
    ,'project_dtl_no'       : {'type': 'select', 'attr': {'maxlength':'3',  'class': ''}}
    ,'specification_row_no' : {'type': 'select', 'attr': {'maxlength': '3', 'class': ''}}
    ,'vendor_cd'            : {'type': 'text', 'attr': {'maxlength': '8',   'class': 'numeric'}}
    ,'vendor_br_cd'         : {'type': 'text', 'attr': {'maxlength': '4',   'class': 'numeric'}}
    ,'company_project'      : {'type': 'text', 'attr': {'maxlength': '20',   'class': ''}}
    ,'delivery_date'        : {'type': 'text', 'attr': {'maxlength': '10',  'class': ''}}
    ,'order_date'           : {'type': 'text', 'attr': {'maxlength': '10',  'class': ''}}
    ,'cost_recorded_date'   : {'type': 'text', 'attr': {'maxlength': '10',  'class': ''}}
};
var change_order_amt    =   0;
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
 * @author  :   VIETDT - 2019/07/25 - create
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
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function initTrigger() {
    try {
        //auto search
        if ($('#searchFlag').val() == '1') {
            search(1);
        }
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
        $(document).on('click', '#btn-search', function() {
            try {
                search(1);
            } catch (e) {
                alert(' click #btn-search ' + e.message);
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
        //btn search
        $(document).on('click', '#btn-save', function(e) {
            try {
                e.preventDefault();
                var length_checked  =   0;
                $('.child-set').each(function(index) {
                    if($(this).prop('checked')){
                        length_checked++;
                    }
                });
                if(length_checked == 0){
                    // if(!$('#table-area').find('tbody tr td input').hasClass('child-set')){
                    //             alert(0);
                    // };
                    // if($('.disable-selection').length > 0){
                    //     jMessage(11);
                    // }
                    jMessage(25, function(r){
                        $('.child-set:first').addClass('required');
                        $('.child-set:first').focus();
                    });
                }else{
                    jMessage(1, function(r){
                        if (r) {
                            save(); 
                        }
                    });
                }
            } catch (e) {
                alert('click #btn-save ' + e.message);
            }
        });
        //child-set check all
        $(document).on('click','#child-set', function(){
            try{
                if($('#child-set').prop('checked')){
                    $('.child-set').prop('checked',true);
                }else{
                    $('.child-set').prop('checked',false);
                }       
            }catch(e){
                alert('click #child-set' + e.message);
            }
        });
        //child-set class
        $(document).on('click','.child-set', function(){
            try{
                var length_checkbox =   0;
                var length_checked  =   0;
                $('.child-set').each(function(index) {
                    length_checkbox++;
                    if($(this).prop('checked')){
                        length_checked++;
                    }
                });
                if(length_checked==length_checkbox){
                    $('#child-set').prop('checked',true);
                }else{
                    $('#child-set').prop('checked',false);
                }
            }catch(e){
                alert('click .child-set' + e.message);
            }
        });
        $(document).on('change', '#project_no', function (e) {
            try {
                e.preventDefault();
                var project_no = $(this).val();
                var company_cd = $('#company_cd').val();
                var data = {
                    'company_cd' : company_cd
                    ,    'project_no' : project_no
                };
                if (company_cd !='') {
                    refer_project(data);
                }  
            } catch (e) {
                alert('change project_no' + e.message);
            }
        });
        $(document).on('change', '#project_dtl_no', function (e) {
            try {

                var project_dtl_no  = $(this).val();
                var project_no      = $('#project_no').val();
                var company_cd      = $('#company_cd').val();
                var data = {
                    'company_cd'    : company_cd
                    ,   'project_no'    : project_no
                    ,   'project_dtl_no': project_dtl_no
                };
                if (project_no !='') {
                    refer_project_dtl_no(data);
                }  
            } catch (e) {
                alert('change project_dtl_no' + e.message);
            }
        });
        $(document).on('change', '.order_upr', function (e) {
            try {
                var tr = $(this).parents('tr');
                var order_upr = Number($(this).val());
                var order_qty = Number(tr.find('.order_qty').text().replace(/,/g,''));
                var sales_amt = tr.find('.sales_amt').val().replace(/,/g,'');
                console.log(change_order_amt);
                var order_amt = order_upr*order_qty;
                if (order_upr !='' && change_order_amt != 1) {
                 tr.find('.order_amt').val(order_amt);
                 var profit = calculateRounding(sales_amt,order_amt);
                 tr.find('.profit').text(profit);
                 tr.find('.profit').attr('title',profit);
                }
                tr.find('.child-set').prop('checked',true);
            } catch (e) {
                alert('change order_upr' + e.message);
            }
        });
        $(document).on('change', '.order_amt', function (e) {
                try {
                    var tr = $(this).parents('tr');
                    var sales_amt   =   tr.find('.sales_amt').val();
                    var order_amt   =   tr.find('.order_amt').val();
                    sales_amt = sales_amt.replace(/,/g,''); 
                    order_amt = order_amt.replace(/,/g,''); 
                    if (sales_amt !=0 ) {
                       var profit = calculateRounding(sales_amt,order_amt);
                       tr.find('.profit').text(profit);
                       tr.find('.profit').attr('title',profit);
                   }else{
                    tr.find('.profit').text('0%');
                   }
                   tr.find('.child-set').prop('checked',true);
                     change_order_amt    =   1;
               } catch (e) {
                alert('change order_upr' + e.message);
            }
        });
        $(document).on('change', '.sales_amt', function (e) {
                try {
                    var tr = $(this).parents('tr');
                    var sales_amt   =   tr.find('.sales_amt').val();
                    var order_amt   =   tr.find('.order_amt').val();
                    sales_amt = sales_amt.replace(/,/g,''); 
                    order_amt = order_amt.replace(/,/g,''); 
                    if (sales_amt !=0 ) {
                       var profit = calculateRounding(sales_amt,order_amt);
                       tr.find('.profit').text(profit);
                       tr.find('.profit').attr('title',profit);
                   }else{
                    tr.find('.profit').text('0%');
                   }
                   tr.find('.child-set').prop('checked',true);
               } catch (e) {
                alert('change order_upr' + e.message);
            }
        });
        //btn export
        $(document).on('click', '#btn-export', function() {
            try {
                 jMessage(5, function(r){
                    if (r) {
                        ExportExcel(3);
                    }
                });
            } catch (e) {
                alert(' click #btn-export ' + e.message);
            }
        });
        //btn-send
        $(document).on('click', '#btn-send', function() {
            try {
                 jMessage(5, function(r){
                    if (r) {
                        ExportExcel(2);
                    }
                });
            } catch (e) {
                alert(' click #bbtn-send ' + e.message);
            }
        });
        //btn-confirm
        $(document).on('click', '#btn-confirm', function() {
            try {
                 jMessage(5, function(r){
                    if (r) {
                        ExportExcel(1);
                    }
                });
            } catch (e) {
                alert(' click #btn-confirm ' + e.message);
            }
        });
          //btn-confirm
        $(document).on('click', '#btn-done', function() {
            try {
                 jMessage(5, function(r){
                    if (r) {
                        ExportExcelPage();
                    }
                });
            } catch (e) {
                alert(' click #btn-done ' + e.message);
            }
        });
          //btn-project
        $(document).on('click', '#btn-project', function() {
            try {
                jMessage(5, function(r){
                    if (r) {
                        ExportExcelSheet();
                    }
                });
            } catch (e) {
                alert(' click #btn-project ' + e.message);
            }
        });
         //btn csv
        $(document).on('click', '#btn-csv', function() {
            try {
                 jMessage(5, function(r){
                    if (r) {
                        ExportCsv();
                    }
                });
            } catch (e) {
                alert(' click #btn-csv ' + e.message);
            }
        });
        //btn-import-csv
        $(document).on('click', '#btn-import-csv', function() {
            try {
                $('#file').trigger('click');
            } catch (e) {
                alert(' click #btn-import ' + e.message);
            }
        });
        //file
        $(document).on('change' , '#file' , function(){
            try {
                var sizeFile =  this.files[0].size;
                if(sizeFile <= 20971520){//20MB = 40*1024*1024
                    if ($(this).val() != '') {                   
                        upload(this);
                        $("#file")[0].value = '';
                    }              
                }else{
                    // jMessage(15,function(){
                    //      $("#file")[0].value = '';
                    // });
                    $("#file")[0].value = '';
                    jError(_text[15]);
                }
            } catch (e) {
                alert(' change #file ' + e.message);
            }
        });
        $(document).on('click', '#btn-registration', function () {
            try {
                jMessage(5, function (r) {
                    if (r) {
                        ExportPDF();
                    }
                });
            } catch (e) {
            alert('click #btn-registration ' + e.message);
            }
        });
        $(document).on('click', '#btn-registration2', function () {
            try {
                jMessage(5, function (r) {
                    if (r) {
                        ExportPDF2();
                    }
                });
            } catch (e) {
            alert('click btn-registration2' + e.message);
            }
        });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}


/**
 * export pdf data 2
 *
 * @author        :    vietdt- 2019/09/11 - create
 * @params        :    null
 * @return        :    null
 */
function ExportPDF2() {
    try {
        var data = {};
        data = getData(_obj);

        $.ajax({
            type: 'POST',
            loading: true,
            url: '/export/i006Pdf2',
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


/**
 * export pdf data
 *
 * @author        :    vietdt- 2019/09/11 - create
 * @params        :    null
 * @return        :    null
 */
function ExportPDF() {
    try {
        var data = {};
        data = getData(_obj);

        $.ajax({
            type: 'POST',
            loading: true,
            url: '/export/i006Pdf',
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
/**
* upload of function
*
* @author : viedt - 2019/05/01 - create

* @see : remark
*/
function upload(event) {
    try{
        var form_data = new FormData();
        form_data.append('file', event.files[0]);
        $.ajax({
            type: 'POST',
            url: '/suplier/i006/import',
            contentType: false,
            processData: false,
            loading:true,
            data: form_data,
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        jMessage(2,function(){
                            });
                    break;
                    // Data Validate
                    case '201':
                        jMessage(37, function(){
                            downloadfileHTML(res['fileNameSave'],'発注金額入力_ERROR.csv',function () {
                                deleteFile(res['fileNameSave']);
                            });
                        });
                    break;
                    // SQL + PHP Exception
                    case '202':
                        jError(res['data'][0]['Message']);
                    break;
                    case '203':
                        jError('Erorr');
                    break;
                    case '204':
                        jMessage(res['noMsg'],function(){
                            });
                    break;
                    default:
                    break;
                }                
            }
        });
    }catch (e) {
        alert('upload ' + e.message);
    }
}
/**
 *  function export excel I006
 *
 * @author  :   VIETDT - 2019/08/27 - create
 *
 */
function ExportExcelPage()
{
    try {
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportI006page',
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
/**
 *  function export excel I006
 *
 * @author  :   VIETDT - 2019/08/27 - create
 *
 */
function ExportExcelSheet()
{
    try {
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportI006sheet',
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
/**
 *  function export excel I006
 *
 * @author  :   VIETDT - 2019/08/27 - create
 *
 */
function ExportExcel(mode)
{
    try {
        var data = getData(_obj);
        data['mode']       = mode;
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportI006',
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
// /**
//  * function refer_project
//  *
//  * @author  :   VIETDT - 2019/07/25 - create
//  * @author  :
//  *
//  */
 function ExportCsv() {
    try{
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            url: '/suplier/i006/Export',
            dataType: 'json',
            data: data,
            success: function (res) {
                    downloadfileHTML(res['fileNameSave'],'発注金額入力.csv',function () {
                        deleteFile(res['fileNameSave']);
                    });
                },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('Export ' + e.message);
    }
}
function something_happens(input) {
    input.replaceWith(input.val('').clone(true));
};
/**
 * function deleteFile
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
function deleteFile(file) {;
    try{
        var data ={};
        data['linkfile'] = file;
        $.ajax({
            type: 'POST',
            url: '/suplier/i006/deleteFile',
            dataType: 'json',
            data: data,
            success: function (res) {
            },
            error: function (res) {
            }
        });
    }catch (e) {
        alert('Export ' + e.message);
    }
}
/**
* downloadfileHTML
* @author VIETDT - 2019/07/25 - create
* @return array
*/
function downloadfileHTML(filedownload , fileNameSave, callback) {
    try {
        var link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
            link.setAttribute("href", filedownload);
            link.setAttribute("download", fileNameSave);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        if(callback){
            callback();
        }
    }catch(e){
        alert('downloadfileHTML '+e.message);
    }
}
/**
 * function refer_project
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
function refer_project(data) {
    try{
        $.ajax({
            type: 'POST',
            url: '/suplier/i006/referProject',
            dataType: 'html',
            data: data,
            async:true,
            success: function (res) {
              
                $("#project_dtl_no").empty();
                $("#project_dtl_no").append(res);
                $("#specification_row_no").empty();
                var html =  '<option value="-1"></option>';
                $('#specification_row_no').html(html);
            },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('refer_project ' + e.message);
    }
}
/**
 * function refer_project_dtl_no
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
function refer_project_dtl_no(data) {
    try{
        $.ajax({
            type: 'POST',
            url: '/suplier/i006/referProjectdtlno',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#specification_row_no").empty();
                $("#specification_row_no").append(res);
            },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('refer_project_dtl_no ' + e.message);
    }
}
/**
 * function search
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function search(_page){
    try{
        var pageSize = 50;
        var data = getData(_obj);
        data['page_size']       = pageSize;
        data['page']            = _page;
        $.ajax({
            type: 'POST',
            url: '/suplier/i006/search',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                $('.child-set:first').focus();
                change_order_amt    =   0;
                jTableFixedHeader();
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
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function save(){
    try{
        var data = gettabledata();
        var page = $('.pagination-location li.active').find('a').text();
        $.ajax({
            type: 'POST',
            url: '/suplier/i006/save',
            dataType: 'json',
            loading: true,
            data: JSON.stringify(data),
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        jMessage(2,function(){
                            search(page);
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
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function gettabledata(){
    var data = {};
    var array   =   [];
    $('.child-set').each(function(index) {
        if($(this).prop('checked')){
            list = {};
            list.id_row = $(this).parents('tr').find('.id_row').val();
            list.company_cd = $(this).parents('tr').find('.company_cd').val();
            list.project_no = $(this).parents('tr').find('.project_no').val();
            list.project_dtl_no = $(this).parents('tr').find('.project_dtl_no').val();
            list.specification_row_no = $(this).parents('tr').find('.specification_row_no').val();
            list.order_dtl_no = $(this).parents('tr').find('.order_dtl_no').val();
            list.order_upr = $(this).parents('tr').find('.order_upr').val();
            list.order_amt = $(this).parents('tr').find('.order_amt').val();
            list.sales_amt = $(this).parents('tr').find('.sales_amt').val();
            array.push(list);
        }
    });
    data.data_json = array;
    return data;
}


/**
 * function calculateRounding
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function calculateRounding(sales_amt,order_amt) {
    if (sales_amt!=order_amt){
        var profit = (sales_amt-order_amt)/sales_amt;
        profit = profit*100;
        profit = addCommas(profit);
        length_cham= profit.indexOf('.');
        if (profit != 100) {
            profit = profit.slice(0,length_cham+3);
            profit = profit+'%';
        }else{
            profit = profit+'%';
        }
    }else  {
        profit = '0%';
    }
    return profit;
}
/**
 * function validate
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function validate() {
    var _errors = 0;
    if (!_validate($('.content'))) {
        _errors++;
    }
    if (_errors > 0){
        return false;
    }
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


