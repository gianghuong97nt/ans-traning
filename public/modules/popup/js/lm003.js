var btnid = $('#btnid').attr('btnid').trim();
var istable = $('#istable').attr('istable').trim();
var _obj = {
      'emp_nm'          : {'type': 'text', 'attr': {'maxlength': '30'    , 'class': ''}}
 ,    'emp_div'         : {'type': 'text', 'attr': {'maxlength': '2'    , 'class': ''}}
 ,    'section_cd'      : {'type': 'text', 'attr': {'maxlength': '8'    , 'class': 'numeric'}}
};
$(document).ready(function () {
    try {
        initItem(_obj);
        initEvents();
        initTrigger();
    } catch (e) {
        alert('ready: ' + e.message);
    }
});

function initTrigger() {
    try {
        if($('#searchFlag').val()==1){
            search(1);
        }
    } catch (e) {
        alert('iniTrigger' + e.message);
    }
}

function initEvents() {
    try {
        //refresh search condition
        $(document).on('click', '#btn-refresh', function() {
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
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
//search data to fill into the table
function search(page){
    try{
        var data = {};
        data = getData(_obj,true);
        var pageSize = 50;
        data['page_size'] = pageSize;
        data['page'] = page;
        //debugger;
        $.ajax({
            type: 'POST',
            url: '/popup/search/lm003/getdata',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                if($('#table-area tbody tr.no-data').length >0){
                    $('#emp_nm').focus();
                }
                tabIndex();
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

//set tabindex for control
function tabIndex(){
    $(".tabId ul").attr("tabindex","4");
    $(".tb-tabId thead tr th:first").attr("tabindex","5");
}

//transfer data from popup to popup control
function transfer(element) {
    try {
        debugger;
        var row_obj = (typeof element.attr('row_data')!='undefined')?JSON.parse(element.attr('row_data')):{};
        var parents = {};
        //locate calling source
        if (istable  == 1) {
            parents = parent.$('.refer-search[tabindex=' + btnid + ']').parents('tr');
        } else {
            parents = parent.$('.refer-search[tabindex=' + btnid + ']').parents('.popup');
        }
        for(var cl in row_obj){
            if($.inArray(parents.find('.' + cl+":visible").prop("tagName"), ["INPUT", "SELECT"]) != -1) {
                parents.find('.' + cl).val(row_obj[cl]).trigger('lm003change');
            } else {
                parents.find('.' + cl).text(row_obj[cl]);
                parents.find('.' + cl).attr('title',row_obj[cl]);
            }
        }
        parent.$.colorbox.close();
    } catch (e) {
        alert('transfer' + e.message);
    }
}
