/**
 * 
 * I001
 *
 * @copyright       :   ANS
 * @author          :   ANS-ASIA VIETDT - 2019/08/06 - create
 * @author          :
 */
var _obj = {
        'client_cd'         : {'type': 'text', 'attr': {'maxlength': '8'    , 'class': ''}}
    ,  'client_nm'          : {'type': 'text', 'attr': {'maxlength': '50'    , 'class': ''}}
    ,  'emp_cd'             : {'type': 'text', 'attr': {'maxlength': '8'    , 'class': ''}}
    ,  'emp_nm'             : {'type': 'text', 'attr': {'maxlength': '30'    , 'class': ''}}
    ,  'project_no'         : {'type': 'text', 'attr': {'maxlength': '8'    , 'class': ''}}
    ,  'project_nm'         : {'type': 'text', 'attr': {'maxlength': '100'    , 'class': ''}}
    , 'confirm_per'         : {'type': 'select', 'attr' : {'maxlength': '8'  , 'class': ''}}
    , 'full_payment_div'    : {'type': 'select', 'attr' : {'maxlength': '8'  , 'class': ''}}
    , 'sales_status_div'    : {'type': 'select', 'attr' : {'maxlength': '8'  , 'class': ''}}
    ,  'sales_recorded_date_fr'             : {'type': 'text', 'attr': {'maxlength': '8'    , 'class': ''}}
    ,  'sales_recorded_date_to'             : {'type': 'text', 'attr': {'maxlength': '8'    , 'class': ''}}   
};
$(document).ready(function () {
    try {
        initialize();
        initItem(_obj);
        initEvents();
        initTrigger();
    } catch (e) {
        alert('ready: ' + e.message);
    }
});
/**
 * initTrigger
 *
 * @author      : ANS-ASIA VIETDT - 2019/08/06 - create
 */
function initTrigger() {
    try {
        if($('#searchFlag').val()=='1'){
            search(1);
        }
        $('#order1').prop( "checked", true );
    } catch (e) {
        alert('iniTrigger' + e.message);
    }
}
/**
 * initialize
 *
 * @author      : ANS-ASIA VIETDT - 2019/08/06 - create
 */
function initialize() {
    try {

    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
/**
 * initEvents
 *
 * @author      : ANS-ASIA VIETDT - 2019/08/06 - create
 */
function initEvents() {
    try {
        
        // select page in pagination
        $(document).on('click', '.pagination-location li a', function () {
            try {
                var page = 1*$(this).attr('page');
                search(parseInt(page, 10));
            } catch (e) {
                alert('.pagination li' + e.message);
            }
        });
        //click search button
        $(document).on('click', '#btn-search', function() {
            try {
                search(1);
            } catch (e) {
                alert('Eror #btn-search ' + e.message);
            }
        });
          $(document).on('change', '#client_cd', function (e) {
            try {
                e.preventDefault();
                var client_cd = $(this).val();
                var data = {
                    'client_cd' : client_cd
                };
                refer_client(data);

            } catch (e) {
                alert('change project_no' + e.message);
            }
        });
        //get data from table refer into popup control
        $(document).on('dblclick', '#table-area tr:not(.disable-selection)', function () {
            transfer($(this));
        });

        $(document).on('touchstart', '#table-area tr:not(.disable-selection)', function () {
            transfer($(this));
        });
        //catch event when enter key is pressed
        $(document).on('keydown', function(e) {
            if (e.which == 13) {
                search(1);
            }
        });
        $(document).on('keypress', 'input', function () {
            try {
                return blockSpecialChar(event);
            } catch (e) {
                alert('special characters' + e.message);
            }
        });
         $(document).on('click', '#btn-close-popup', function () {
            try {
                 parent.$.colorbox.close();
            } catch (e) {
                alert('btn-close-popup' + e.message);
            }
        });

    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
/**
 * search
 *
 * @author      : VIETDT - 2019/08/06 - create
 */
//search data to fill into the table
function search(page){
    try{
        var data = {};
        data = getData(_obj,true);
        if($('#order1').is(":checked")){
            data['order'] = 1;
        }else if($('#order2').is(":checked")){
            data['order'] = 2;
        }else{
            data['order'] = 0;
        }
        var pageSize = 50;
        data['page_size'] = pageSize;
        data['page'] = page;
        data['company_cd'] = $("#company_cd").val();

        //debugger;
        $.ajax({
            type: 'POST',
            url: '/popup/search/l001/search',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                tabIndex();
                //$("#company_nm").focus();
            },
            // Ajax error
            error: function (res) {
            }
        });
    }
    catch(e){
        alert('search: ' + e.message);
    }
    
}
/**
 * function refer_client
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function refer_client(data) {
    try{
        $.ajax({
            type: 'POST',
            url: '/popup/search/l001/refer_client',
            dataType: 'data',
            data: data,
            async:true,
            success: function (res) {
                $('#client_nm').text(res[0][0]['client_nm']);
                
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
 * tabIndex
 *
 * @author      : VIETDT - 2019/08/06 - create
 */
//set tabindex for control
function tabIndex(){
    $(".tabId ul").attr("tabindex","4");
    $(".tb-tabId thead tr th:first").attr("tabindex","5");
}
/**
 * transfer
 *
 * @author      : VIETDT - 2019/08/06 - create
 */
//transfer data from popup to popup control
function transfer(element) {
      try {
        var row_obj = (typeof element.attr('row_data')!='undefined')?JSON.parse(element.attr('row_data')):{};
        var company_cd = row_obj.company_cd;
        var project_no = row_obj.project_no;
        var project_nm = row_obj.project_nm;
        parent.$("#project_no").val(project_no);
        parent.$("#project_nm").text(project_nm);
        parent.$('#project_no').trigger('change');
        parent.$.colorbox.close();
    } catch (e) {
        alert('transfer' + e.message);
    }
}