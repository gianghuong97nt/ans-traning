/**
 * TOSMAC PROJECT
 *  master-m008
 *
 * @copyright       :   ANS-ASIA
 * @author          :   VIETDT - 2019/07/05 - create
 * @author          :
 */
var _obj = {
        'type_div'			: {'type': 'text', 'attr': {'maxlength': '1',   'class': 'required'	, 'tabindex': '1'}}
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
 * @author  :   ans-asia VIETDT - 2019/07/05 - create
 * @author  :
 *
 */
function initialize() {
    try {
        initItem(_obj);

        //
        jTableFixedHeader();

    } catch (e) {
        alert('initialize: ' + e.message);
    }
}

/**
 * function initEvents
 *
 * @author  :   ans-asia VIETDT - 2019/07/05 - create
 * @author  :
 *
 */
function initEvents() {
    try {
        
        //save button
        $(document).on('click', '#btn-save', function() {
            try {
                jMessage(1,function(r){
                    if(r){
                        if(!fnc_check()){
                            $('#type_div').errorStyle('必須入力です。');
                        }else{
                            if(validate()) {
                                save();
                            }
                        }
                    }
                })
            } catch (e) {
                alert('#btn-save ' + e.message);
            }
        });
        //add
        $(document).on('click','.btn-add',function(){
            try{


                var type_div = $('#type_div').val();
                var html = $('#table-hidden tbody').html();
       
                 if(type_div != 4){
                    $('#table-data tbody:last ').append(html);
                    $('#table-data tbody tr').addClass('tr-list');
                    $('.range_st').attr('readonly','readonly');
                    $('.range_ed').attr('readonly','readonly');
                     _setTabIndex();
                }else{

                    $('#table-data tbody:last ').append(html);
                    $('#table-data tbody tr').addClass('tr-list');
                    $('.range_st').removeAttr('readonly');
                    $('.range_ed').removeAttr('readonly');
                     _setTabIndex();
     
                }
                 $('.type1').focus();
                
            }catch(e){
                alert('.btn-add'+e.message);
            }
        });
        //delete
        $(document).on('click','.btn-delete2',function(){
            try{
                    $(this).parents('tr').remove();
            }catch(e){
                alert('btn-delete2'+e.message)
            }
        });
        //type_div  refer data
        $(document).on('change','#type_div',function(){
            try{
                var type_div = $("#type_div").val();
                //
                search(type_div,function(){
               
                });

            }catch (e){
                alert('change type_div: ' + e.message);
            }
        });
    } catch (e) {
        alert('initEvents: ' + e.message);
    }
}

/**
 * function save
 *
 * @author  :   ans-asia VIETDT - 2019/07/05 - create
 * @author  :
 *
 */
function save(){
    try {
        var data = {};
   
        data = getDataSave();
        var type_div = $('#type_div').val();
        data.type_div = type_div;
        $.ajax({
            type: 'POST',
            url: '/master/m008/save',
            dataType: 'json',
            loading: true,
            data: JSON.stringify(data),
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        jMessage(2,function(){
                            search(type_div,function(){
                                $(".type1:first").focus();
                            });
                        });
                        break;
                    // Data Validate
                    case '201':
                 
                            // $('.tr-list').each(function(index){
                           //  var _this = $(this);
                           //  $.each(res['data'][0],function(){
                           //      console.log(this.Code);
                           //      if(this.Id == (index +1)){
                           //          if(this.code == 39){ 
                           //              _this.find('.required').errorStyle(_text[this.Code]);
                           //          }
                           //          else{
                           //              _this.find('.range_st').errorStyle(_text[this.Code]);
                           //              _this.find('.range_ed').errorStyle(_text[this.Code]);


                           //          } 
                           //      }
                           //  })
                           // })      
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
 * function search
 *
 * @author  :   ANS-ASIA VIETDT - 2019/07/05 - create
 * @author  :
 *
 */
function search(type_div, callback) {
    try {
        var data = {};
        data['type_div'] = type_div;
        $.ajax({
            type: 'POST',
            url: '/master/m008/search',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                $("#table-data").empty();
                $("#table-data").append(res.data);
                $("#table-data tbody tr:first").find('.avail_typ').focus();
                $('#registration_footer').html(res.createUpdate);
                if (matchMedia) {
                    const mq = window.matchMedia("(max-width: 1024px)");
                    mq.addListener(WidthChange);
                    WidthChange(mq);
                }
                _setTabIndex();
                jTableFixedHeader();
                 $('.type1').focus();
            }
        });
    } catch (e) {
        alert('search ' + e.message);
    }
}

// tuan create - media query change
function WidthChange(mq) {
    if (mq.matches) {
        //$('.w-ipad').css('width','1145px');
    } else {
        // window width is less than 500px
    }
}

/**
 * get data
 *
 * @author  :   ANSS-ASIA VIETDT - 2019/07/05 - create
 * @author  :
 *
 */
function getDataSave() {
    try {
        var data={};
        array_str   = [];

        $('.tr-list').each(function (index, value) {
            list ={};
            list.type1 = $(this).find('.type1').val();
            list.type2 = $(this).find('.type2').val();
            list.size = $(this).find('.size').val();
            list.range_st = $(this).find('.range_st').val();
            list.range_ed = $(this).find('.range_ed').val();
            list.cost_1 = $(this).find('.colum_1').val();
            list.cost_2 = $(this).find('.colum_2').val();
            list.cost_3= $(this).find('.colum_3').val();
            list.cost_4 = $(this).find('.colum_4').val();
            list.cost_5 = $(this).find('.colum_5').val();
            list.cost_6 = $(this).find('.colum_6').val();
            list.mode = $(this).find('.mode').val();
            array_str.push(list);
        });
        data.table = array_str;
        return data;
        //
    } catch (e) {
        alert('getDataSave ' + e.message);
    }
}

function fnc_check(){
    //
    var flag      = false;
    var type_div  =  $('#type_div').val();
    if(type_div != -1){
        flag = true;
    }
    //
    return flag;
}

function validate() {
    var _errors = 0;
    if (!_validate($('.content'))) {
        _errors++;
    }
    if (_errors > 0)
        return false;

    return true;
}

// /**
//  * validate function
//  *
//  * @author        :    ANS-ASIA VIETDT - 2019/07/05 - create
//  * @author        :
//  */

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
            _he = 127;
        } else {
            $('.scroll-div1').css({
                'overflow-x':'auto',
                'display':'none'
            });
            //
            _he = 109;
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