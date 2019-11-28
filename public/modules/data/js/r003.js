var _obj = {
    'company_cd'	    : {'type': 'tel', 'attr': {'maxlength': '8'	 , 'class': '' , 'tabindex': '3'}}
    , 'project_no'	    : {'type': 'tel', 'attr': {'maxlength': '8'	 , 'class': '' , 'tabindex': '4'}}
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
        $(document).on('click', '#btn-export', function() {
            try {
                jMessage(5, function(r){
                    if(r) {
                        exportR003();
                    }
                });
            } catch (e) {
                alert('Error #btn-export' + e.message);
            }
        });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

function exportR003() {
    try {
        var data = {};
        data.company_cd = $('#company_cd').val();
        data.project_no  = $('#project_no ').val();
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/r003ExcelExport',
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
