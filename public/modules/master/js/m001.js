/**
 * TOSMAC PROJECT
 * user master-s001
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/19 - create
 * @author          :
 */
var _obj = {
      'company_cd'			: {'type': 'text', 'attr': {'maxlength': '4',   'class': 'required numeric'				, 'tabindex': '1'}}
    , 'company_nm'		    : {'type': 'text', 'attr': {'maxlength': '50',   'class': ''	        , 'tabindex': '2'}}
    , 'company_kn_nm'		: {'type': 'text', 'attr': {'maxlength': '50',   'class': ''	        , 'tabindex': '3'}}
    , 'company_ab_nm'		: {'type': 'text', 'attr': {'maxlength': '30',  'class': ''			    , 'tabindex': '4'}}
    , 'company_zip'			: {'type': 'text', 'attr': {'maxlength': '7',  'class': 'postal_code'			, 'tabindex': '5'}}
    , 'company_adr_1'		: {'type': 'text', 'attr': {'maxlength': '100',  'class': ''		    , 'tabindex': '6'}}
    , 'company_adr_2'		: {'type': 'text', 'attr': {'maxlength': '100',  'class': ''		    , 'tabindex': '7'}}
    , 'company_tel'	        : {'type': 'text', 'attr': {'maxlength': '20',  'class': 'tel'			    , 'tabindex': '8'}}
    , 'company_fax'			: {'type': 'text', 'attr': {'maxlength': '20',   'class': 'tel'		    , 'tabindex': '9'}}
    , 'company_url'			: {'type': 'text', 'attr': {'maxlength': '255', 'class': ''						, 'tabindex': '10'}}
    , 'company_en_nm'		: {'type': 'text', 'attr': {'maxlength': '50', 'class': ''						, 'tabindex': '11'}}
    , 'company_en_ab_nm'	: {'type': 'text', 'attr': {'maxlength': '30', 'class': ''						, 'tabindex': '12'}}
    , 'prefectures_en'		: {'type': 'text', 'attr': {'maxlength': '20', 'class': ''						, 'tabindex': '13'}}
    , 'city_en'			    : {'type': 'text', 'attr': {'maxlength': '30', 'class': ''						, 'tabindex': '14'}}
    , 'town_en'			    : {'type': 'text', 'attr': {'maxlength': '30', 'class': ''						, 'tabindex': '15'}}
    , 'chome_address_en'	: {'type': 'text', 'attr': {'maxlength': '30', 'class': ''						, 'tabindex': '16'}}
    , 'company_en_tel'		: {'type': 'text', 'attr': {'maxlength': '20', 'class': 'tel'						, 'tabindex': '17'}}
    , 'company_en_fax'		: {'type': 'text', 'attr': {'maxlength': '20', 'class': 'tel'						, 'tabindex': '18'}}
    , 'remarks'			    : {'type': 'text', 'attr': {'maxlength': '100', 'class': ''						, 'tabindex': '19'}}
};

$(document).ready(function () {
    try {
        initialize();
        initEvents();
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
        // Nếu company_cd trống thì ẩn btn delete
        if ($('#company_cd').val()=='') {
            $('#btn-delete').addClass('disable');
        }
        // Nếu company_cd khác rỗng thì thuộc tính redonly mang giá trị là true focus vào company_nm
        if ($('#company_cd').val()!='') {
            $('#company_cd').trigger('change');
            $('#company_cd').prop('readonly',true);
            $('#company_nm').focus();
        }
        else{
            $('#company_cd').focus();
        }
        //auto refer katakana
        // $.fn.autoKana('#company_nm', '#company_kn_nm', {
        //     katakana: true  //true：カタカナ、false：ひらがな（デフォルト）
        // });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
/**
 * function initEvents
 *
 * @author  :   chinhnb - 2017/12/19 - create
 * @author  :
 *
 */
function initEvents() {
    try {
        //btn list
        $(document).on('click', '#btn-list', function() {
            try {
                back();
            } catch (e) {
                alert('.btn-list' + e.message);
            }
        });
        //delete button
        $(document).on('click', '#btn-delete', function() {
            try {
                jMessage(3, function(r){
                    if(r) {
                        if (validate(_obj)) {
                            del();
                        }
                    }
                });
            } catch (e) {
                alert('.btn-delete' + e.message);
            }
        });
        //save button
        $(document).on('click', '#btn-save', function() {
            try {
                jMessage(1, function(r){
                    if(r) {
                        if (validate(_obj)) {
                            save();
                        }
                    }
                });
            } catch (e) {
                alert('#btn-save ' + e.message);
            }
        });

        $(document).on('blur', '#company_cd', function() {
            try {
                referCompany();
            } catch (e) {
                alert('#btn-save ' + e.message);
            }
        });


    } catch (e) {
        alert('initEvents: ' + e.message);
    }
}

function referCompany() {
    try {
        var data = {};
        data.company_cd = $('#company_cd').val();
        // console.log(data.company_cd);
        $.ajax({
            type: 'POST',
            url: '/master/m001/refer',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                if (res.data[0][0]['company_cd'] != '') {
                    var data = res.data[0][0];
                    //
                    fillData(data,_obj);
                    $('#company_cd').attr('readonly', true);
                    $('#registration_footer').html(res.createUpdate);
                    $('#btn-delete').removeClass('disable');
                }else {
                    clearData(_obj,['company_cd']);
                    $('#btn-delete').addClass('disable');
                    $('#registration_footer').html(res.createUpdate);
                }
                //
                $('#mode').val(res.mode);
                // if (callback != undefined) {
                //     callback();
                // }
            }
        });
    } catch (e) {
        alert('Eror function save ' + e.message);
    }
}

/**
 * save function
 *
 * @author        :    ANS-CHINHNB - 2017/12/11 - create
 * @author        :
 */
function save(){
    try {
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            url: '/master/m001/save',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                console.log(res['data']);
                debugger;
                switch (res['status']) {
                    // Success
                    case '200':
                        jMessage(2,function(){
                            var company_cd = res['data'][0]['company_cd'];
                            // alert(res['data'][0]['company_cd']);
                            window.location.href = '/master/m001?company_cd='+company_cd;
                            // $('#company_nm').focus();
                            // $('#company_cd').attr('readonly', true);
                            // $('#registration_footer').html(res.createUpdate);
                            // $('#btn-delete').removeClass('disable');
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
    } catch (e) {
        alert('Eror function save ' + e.message);
    }
}

/**
 * delete function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/11 - create
 * @author        :
 */
function del() {
    try {
        var data = {};
        data.company_cd = $("#company_cd").val();
        //debugger;
        $.ajax({
            type: 'POST',
            url: '/master/m001/delete',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                switch (res['status']) {
                    case '200':
                        jMessage(4,function(){
                            location.href = "/master/m001";
                        });
                        break;
                    case '201':
                        jMessage(9,function(){
                            $('#company_cd').focus();
                        });

                        break;
                    case '202':
                        jError(res['data'][0]['Message']);
                        break;
                    default:
                        break;
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('Eror function del ' + e.message);
    }
}


/**
 * back function
 *
 * @author        :    ANS-CHINHNB - 2017/12/19 - create
 * @author        :
 */
function back() {

    // set điều kiện để search còn không thì ở lại trang
    if (_is_from_search == '1') {
        _back_data['search_flag'] = '1';
        _back_data['message_search_condition'] = getHtmlCondition('#back-search-condition');
        var objRefer = {
            init_data: _back_data,
            back_link: _back_data['back_link']
        };
        //
        postParamToLink(_back_screen, 'detail', objRefer, _back_link);
    } else {
        location.href = '/master/m001l';
    }

}

/**
 * validate function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/19 - create
 * @author        :
 */
function validate() {
    var _errors = 0;
    if (!_validate($('.content'))) {
        _errors++;
    }
    if (_errors > 0)
        return false;

    return true;
}


