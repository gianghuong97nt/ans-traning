/**
 * Tosmac Project
 *
 * DB001 controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   tuantv - 2017/12/07 - create
 * @author          :
 */

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

    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

function initEvents() {
    try {
        $(document).on('click','input', function() {
            try {
                $(this).css('height','40px');
                $(this).css('margin-top','1px');
            } catch (e) {
                alert('searchDate : ' + e.message);
            }
        });

        $(document).on('click','.bookmark_cd', function(e) {
            e.preventDefault();
        });

        $(document).on('click','#btn-config', function() {

            try {
                var url = '/popup/search/p001';
                //var width  = '650px';
                //var height  = '570px';
                showPopup(url,function(){
                    location.href= "/system/db001";
                 /*
                    var a = $("#datas").data();
                    $.ajax({
                        type: 'GET',
                        url: '/system/db001/refer_bookmark',
                        dataType: 'JSON',
                        loading: false,
                        data: data,
                        success: function (res) {
                            $('.bookmark').empty();
                            $('.bookmark').append(res.content);
                        },
                        // Ajax error
                        error: function (res) {
                        }
                    });*/
                });
            } catch (e) {
                alert('searchDate : ' + e.message);
            }
        });

        $(document).on('click','#btn-change-pass', function() {
            try {
                var url = '/popup/search/p002';
                var width  = '600px';
                var height  = '253px';
                showPopup(url,function(){},width,height);
            } catch (e) {
                alert('searchDate : ' + e.message);
            }
        });
    } catch (e) {
        alert('initialize: ' + e.message);
    }
}
