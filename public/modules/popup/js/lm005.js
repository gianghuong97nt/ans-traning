var btnid = $('#btnid').attr('btnid').trim();
var istable = $('#istable').attr('istable').trim();
var _obj = {
    'vendor_nm'          : {'type': 'text', 'attr': {'maxlength': '50'    , 'class': ''}}
    ,    'vendor_div'    : {'type': 'select', 'attr': {'maxlength': '1'    , 'class': ''}}
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
        search(1);
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

        $(document).on('click', '#btn-close-popup', function () {
            parent.$.colorbox.close();
        });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
//search data to fill into the table
function search(page){
    try{
        var data = {};
        data = getData(_obj);
        var pageSize = 50;
        data['page_size'] = pageSize;
        data['page'] = page;
        $.ajax({
            type: 'POST',
            url: '/popup/search/lm005/getdata',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                if($('#table-area tbody tr.no-data').length >0){
                    $('#vendor_nm').focus();
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
        var row_obj = (typeof element.attr('row_data')!='undefined')?JSON.parse(element.attr('row_data')):{};
        var parents = {};
        //locate calling source
        if (istable  == 1) {
            parents = parent.$('.refer-search-1[tabindex=' + btnid + ']').parents('tr');
        } else {
            parents = parent.$('.refer-search-1[tabindex=' + btnid + ']').parents('.popup');
        }
        for(var cl in row_obj){
            if($.inArray(parents.find('.' + cl+":visible").prop("tagName"), ["INPUT", "SELECT"]) != -1) {
                parents.find('.' + cl).val(row_obj[cl]).trigger('lm005change');
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
