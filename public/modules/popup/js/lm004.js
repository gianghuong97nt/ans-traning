
var _obj = {
    'client_nm'         : {'type': 'text',  'attr': {'maxlength': '50'   , 'class': ''}}
,   'client_br_nm'      : {'type': 'text',  'attr': {'maxlength': '50'   , 'class': ''}}
,   'adr'               : {'type': 'text',  'attr': {'maxlength': '200'  , 'class': ''}}
,   'client_div'        : {'type': 'select','attr': {'maxlength': '1'    , 'class': ''}}
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
 * @author      : ANS-ASIA VIETDT - 2019/06/11 - create
 */
function initTrigger() {
    try {
        if($('#searchFlag').val()=='1'){
            search(1);
        }
    } catch (e) {
        alert('iniTrigger' + e.message);
    }
}
/**
 * initialize
 *
 * @author      : ANS-ASIA VIETDT - 2019/06/11 - create
 */
function initialize() {

}
/**
 * initEvents
 *
 * @author      : ANS-ASIA VIETDT - 2019/06/11 - create
 */
function initEvents() {
    try {
        //refresh search condition
        $(document).on('dblclick', '#btn-refresh', function() {
            try {
                clearDataSearch(_obj,true,'#result')
            } catch (e) {
                alert('.btn-back' + e.message);
            }
        });
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
           $(document).on('click', '#btn-close-popup', function () {
            parent.$.colorbox.close();
        });

    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
/**
 * search
 *
 * @author      : ANS-ASIA VIETDT - 2019/06/11 - create
 */
//search data to fill into the table
function search(page){
    try{
        var data = {};
        data = getData(_obj);
        var pageSize = 50;
        data['page_size'] = pageSize;
        data['page'] = page;
        //debugger;
        $.ajax({
            type: 'POST',
            url: '/popup/search/lm004/getdata',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
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
 * transfer
 *
 * @author      : ANS-ASIA VIETDT - 2019/06/11 - create
 */
//transfer data from popup to popup control
function transfer(element) {
    try {
        var row_obj = (typeof element.attr('row_data')!='undefined')?JSON.parse(element.attr('row_data')):{};
        var client_cd = row_obj.client_cd;
        var client_nm = row_obj.client_nm;
        var client_br_cd = row_obj.client_br_cd;
        var client_br_nm = row_obj.client_br_nm;
        parent.$("#client_cd").val(client_cd);
        parent.$("#client_nm").text(client_nm+' '+client_br_nm);
        parent.$("#client_br_cd").val(client_br_cd);
        parent.$.colorbox.close();
    } catch (e) {
        alert('transfer' + e.message);
    }
}