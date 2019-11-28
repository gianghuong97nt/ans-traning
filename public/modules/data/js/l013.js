var _obj = {
    'cost_recorded_date_fr'	    : {'type': 'text', 'attr': {'maxlength': '10'	 , 'class': '' , 'tabindex': '3'}}
    , 'cost_recorded_date_to'	: {'type': 'text', 'attr': {'maxlength': '10'	 , 'class': '' , 'tabindex': '4'}}
    , 'vendor_cd'	    : {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': 'numeric' , 'tabindex': '5'}}
    , 'vendor_br_cd'	: {'type': 'text', 'attr': {'maxlength': '4'	 , 'class': 'numeric' , 'tabindex': '6'}}
    , 'closing_date'	: {'type': 'text', 'attr': {'maxlength': '2'	 , 'class': '' , 'tabindex': '8'}}
    , 'vendor_nm'	    : {'type': 'text', 'attr': {'maxlength': '100'	 , 'class': '' , 'tabindex': '9'}}
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

        $(document).on('click', '#btn-export', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        //exportData();
                        exportL013(1);
                    }

                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });
        $(document).on('click', '#btn-export2', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        //exportData();
                        exportL013(2);
                    }

                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });
        $(document).on('click', '#btn-export3', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        //exportData();
                        exportL013(3);
                    }
                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });

        $(document).on('click', '#btn-export4', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        exportL013Paginate();
                    }
                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });

        $(document).on('click', '#btn-export5', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        export5();
                    }
                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });
        $(document).on('click', '#btn-export6', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        ExportPDF();
                    }
                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });

        $(document).on('click', '#btn-export7', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        ExportPDF2();
                    }
                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });

        $(document).on('click', '#btn-import-csv', function() {
            try {
                $('#import-data').val('');
                $('#import-data').trigger('click');
            } catch (e) {
                alert('Error #btn-import-csv' + e.message);
            }
        });

        $(document).on('change', '#import-data', function() {
            try {
                if($(this).val() != '') {
                    var max =  39 * 512; // 20MB
                    if (this.files && this.files[0].size < max) {
                        uploadFile(this);
                    } else {
                        jMessage(15,function(){
                        });
                    }
                }
            } catch (e) {
                alert('Error #import-data' + e.message);
            }
        });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

function export5() {
    try {
        var data = {};
        data.status = $('#status').val();
        data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val();
        data.cost_recorded_date_to = $('#cost_recorded_date_to').val();
        if($('#cost_recorded_date_fr').val() != ''){
            data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val() + '/01';
        }
        if($('#cost_recorded_date_to').val() != ''){
            data.cost_recorded_date_to = $('#cost_recorded_date_to').val() + '/01';
        }
        data.vendor_cd         = $('#vendor_cd').val();
        data.vendor_br_cd      = $('#vendor_br_cd').val();
        data.closing_date      = $('#closing_date').val();
        data.vendor_nm         = $('#vendor_nm').val();
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/l013ExcelExport5',
            dataType: 'json',
            data: data,
            success: function (res) {
                console.log(res);
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

function ExportPDF() {
    try {
        var data = {};
        data.status = $('#status').val();
        data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val();
        data.cost_recorded_date_to = $('#cost_recorded_date_to').val();
        if($('#cost_recorded_date_fr').val() != ''){
            data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val() + '/01';
        }
        if($('#cost_recorded_date_to').val() != ''){
            data.cost_recorded_date_to = $('#cost_recorded_date_to').val() + '/01';
        }
        data.vendor_cd         = $('#vendor_cd').val();
        data.vendor_br_cd      = $('#vendor_br_cd').val();
        data.closing_date      = $('#closing_date').val();
        data.vendor_nm         = $('#vendor_nm').val();
        $.ajax({
            type: 'POST',
            loading: true,
            url: '/export/l013PDFExport',
            dataType: 'json',
            data: data,
            success: function (res) {
                switch (res['status']) {
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

function ExportPDF2() {
    try {
        var data = {};
        data.status = $('#status').val();
        data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val();
        data.cost_recorded_date_to = $('#cost_recorded_date_to').val();
        if($('#cost_recorded_date_fr').val() != ''){
            data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val() + '/01';
        }
        if($('#cost_recorded_date_to').val() != ''){
            data.cost_recorded_date_to = $('#cost_recorded_date_to').val() + '/01';
        }
        data.vendor_cd         = $('#vendor_cd').val();
        data.vendor_br_cd      = $('#vendor_br_cd').val();
        data.closing_date      = $('#closing_date').val();
        data.vendor_nm         = $('#vendor_nm').val();
        $.ajax({
            type: 'POST',
            loading: true,
            url: '/export/l013PDFExport2',
            dataType: 'json',
            data: data,
            success: function (res) {
                console.log(res)
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

function exportL013Paginate() {
    try {
        var data = {};
        data.status = $('#status').val();
        data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val();
        data.cost_recorded_date_to = $('#cost_recorded_date_to').val();
        if($('#cost_recorded_date_fr').val() != ''){
            data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val() + '/01';
        }
        if($('#cost_recorded_date_to').val() != ''){
            data.cost_recorded_date_to = $('#cost_recorded_date_to').val() + '/01';
        }
        data.vendor_cd         = $('#vendor_cd').val();
        data.vendor_br_cd      = $('#vendor_br_cd').val();
        data.closing_date      = $('#closing_date').val();
        data.vendor_nm         = $('#vendor_nm').val();

        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/l013excelPaginate',
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
function exportL013(btn)
{
    try {
        var data = {};
        data.status = $('#status').val();
        data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val();
        data.cost_recorded_date_to = $('#cost_recorded_date_to').val();
        if($('#cost_recorded_date_fr').val() != ''){
            data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val() + '/01';
        }
        if($('#cost_recorded_date_to').val() != ''){
            data.cost_recorded_date_to = $('#cost_recorded_date_to').val() + '/01';
        }
        data.vendor_cd         = $('#vendor_cd').val();
        data.vendor_br_cd      = $('#vendor_br_cd').val();
        data.closing_date      = $('#closing_date').val();
        data.vendor_nm         = $('#vendor_nm').val();
        data.btn               = btn
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/l013excel',
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

function search(){
    try{
        var data = {};
        data.status = $('#status').val();
        data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val();
        data.cost_recorded_date_to = $('#cost_recorded_date_to').val();
        if($('#cost_recorded_date_fr').val() != ''){
            data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val() + '/01';
        }
        if($('#cost_recorded_date_to').val() != ''){
            data.cost_recorded_date_to = $('#cost_recorded_date_to').val() + '/01';
        }
        data.vendor_cd         = $('#vendor_cd').val();
        data.vendor_br_cd      = $('#vendor_br_cd').val();
        data.closing_date      = $('#closing_date').val();
        data.vendor_nm         = $('#vendor_nm').val();
        $.ajax({
            type: 'POST',
            url: '/data/l013/search',
            dataType: 'html',
            loading: true,
            data: data,
            success: function (res) {
                $("#result").empty();
                $("#result").append(res);
                if($('#table-area tbody tr.no-data').length >0){
                    $('#cost_recorded_date_fr').focus();
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

/**
 *  function export Sales Achievement L004
 *
 * @author  :   TuanTV - 2018/02/09 - create
 *
 */

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

function exportData() {
    try{
        var data = {};
        data.status = $('#status').val();
        data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val();
        data.cost_recorded_date_to = $('#cost_recorded_date_to').val();
        if($('#cost_recorded_date_fr').val() != ''){
            data.cost_recorded_date_fr = $('#cost_recorded_date_fr').val() + '/01';
        }
        if($('#cost_recorded_date_to').val() != ''){
            data.cost_recorded_date_to = $('#cost_recorded_date_to').val() + '/01';
        }
        data.vendor_cd         = $('#vendor_cd').val();
        data.vendor_br_cd      = $('#vendor_br_cd').val();
        data.closing_date      = $('#closing_date').val();
        data.vendor_nm         = $('#vendor_nm').val();
        $.ajax({
            type: 'POST',
            url: '/data/l013/export',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                if(res['result'] === 'not data') {
                    jMessage(11,function(){
                    });
                }else {
                    var filename = '/download/'+res['filename'];
                    var d = new Date();
                    downloadfileHTML(filename,'弥生用仕入データ一覧照会'+d.getTime()+'.csv');
                }
            },
            error: function (res) {
            }
        });
    }catch (e) {
        alert('#btn-print ' + e.message);
    }
}

function downloadfileHTML(filedownload , fileNameSave) {
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
        // if(callback){
        //     callback();
        // }
    }catch(e){
        alert('downloadfileHTML '+e.message);
    }
}

function uploadFile(file) {
    var form_data = new FormData();
    form_data.append('file', file.files[0]);
    $.ajax({
        type: 'POST',
        url: '/data/l013/uploadFile',
        dataType: 'json',
        loading: true,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res['error'] === 'error scv') {
                debugger;
                jMessage(58,function(){
                });
            }
            //Sai dinh dang
            else if (res['error'] === 'error column') {
                debugger;
                jMessage(59,function(){
                });
            }
            //Validate
            else if (res['filename'] !== '') {
                var filename = '/download/'+res['filename'];
                jMessage(37,function(){
                    var d = new Date();
                    downloadfileHTML(filename,'弥生用仕入データ一覧照会'+d.getTime()+'.csv');
                });
            }
            else {
                //Success
                jMessage(2,function(){
                });
            }
        },
        error: function (res) {
        }
    });
}
