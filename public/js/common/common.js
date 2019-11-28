/**
 * init jquery
 *
 * @author      :   vuongvt - 2016/10/20 - create
 * @author      :   DuyTP 2017/02/09 - update: Add event back to login when session expires
 * @author      :   DuyTP 2017/03/01 - update: Only accept 00:00 ~ 23:59
 * @author      :   DuyTP 2017/04/13 - update: No need validate tel form - ( )
 * @author      :   DuyTP 2017/04/20 - update: search when press enter
 * @author      :   DuyTP 2017/05/10 - update: add placeholder「:」 for class .time

 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
$(document).ready(function () {
    /**
     * @author: VuongVT - 2016/10/26
     * @reason: init token value for all post method, show block screen and close block screen when use ajax
     */
    $(document).ajaxStart(function () {

        // show block screen
        //HungNV comment
        //callWaiting();
    });
    $(document).ajaxComplete(function () {
        // close block screen
        closeWaiting();
    });
    $(document).ajaxError(function () {
        // close block screen
        closeWaiting();
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },

        //HungNV add
        beforeSend: function () {
            if (this.loading) {
                callWaiting();
            }
        },
        success: function (res) {
            // console.log('suces');
            //removeError();
            closeWaiting();
        },
        error: function (response) {
            closeWaiting();
            return false;
        },
        // DuyTP 2017/02/09 Add event back to login when session expires
        complete: function (res) {
            if (res.status != null && res.status == 404) {
                location.href = '/';
            } else if (res.status == 409) {
                location.href = '/example';
            }
            // if (res.status != null && res.status == 401) {
            //     location.href = '/';
            // }
        }
    });

    /**
     * @author: VuongVT - 2016/10/26
     * @reason: init control's event
     */
    initControls();
    /**
     * @author: DuyTP - 2017/04/21
     * @reason: init one time control's event
     */
    initOneTimeControls();

    // Initialize mini sidebar 
    miniSidebar();
    /**
     * @author: ChinhNB - 2017/11/06
     * @reason: set size row of table when has input or not
     */
    convertTableRowSize();
    //set focus sidebar
    sidebar_holding();
    /**
     * @author: ChinhNB - 2017/11/06
     * @reason: set size row of table when has input or not
     */
    hoverTbody();
    scrollTop();
});

// Setup
function miniSidebar() {
    if ($('body').hasClass('sidebar-xs')) {
        $('.sidebar-main.sidebar-fixed .sidebar-content').on('mouseenter', function () {
            if ($('body').hasClass('sidebar-xs')) {

                // Expand fixed navbar
                $('body').removeClass('sidebar-xs').addClass('sidebar-fixed-expanded');
            }
        }).on('mouseleave', function () {
            if ($('body').hasClass('sidebar-fixed-expanded')) {

                // Collapse fixed navbar
                $('body').removeClass('sidebar-fixed-expanded').addClass('sidebar-xs');
            }
        });
    }
}

/**
 * block screen
 *
 * @author      :   vuongvt - 2016/10/20 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function callWaiting() {
    $.blockUI({
        message: '<i class="icon-spinner4 spinner"></i>',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            zIndex: 1200,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            zIndex: 1201,
            backgroundColor: 'transparent'
        }
    });
}

/**
 * unblock screen
 *
 * @author      :   vuongvt - 2016/10/20 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function closeWaiting() {
    $.unblockUI({});
}

/**
 * init validate
 *
 * @author : kyvd - 2016/08/09 - create
 * @author :
 * @params : null
 * @return : null
 * @access : public
 * @see :
 */
//update by QuyND 2017/11/16
function initValidate(obj, flag) {
    try {
        _clearErrors();
        if (flag == undefined) {
            flag = true;
        }
        $.each(obj, function (key, element) {
            //get type element
            var type = element['type'];
            //set key is id or class element
            if (element['attr']['isClass'] === true) {
                //validate by id
                key = '.' + key;
            } else {
                //validate by class
                key = '#' + key;
            }
            $(document).on('change', key, function () {
                try {
                    // check required
                    var required = element['attr']['required'];
                    if (required === true) {
                        // var msg_required = "This is a required field! ";
                        if ($(this).val() === '' || ((type === 'select' || type === 'number') && convertNumber($(this).val()) === 0)) {
                            $(this).errorStyle('必須入力です。');
                            return;
                        } else {
                            $(this).removeErrorStyle();
                        }
                    }
                    // check maxlength
                    var maxlength = element['attr']['maxlength'];
                    if (maxlength != undefined) {
                        var msg_maxlength = "データが長い過ぎです。";
                        if ($(this).val().length > maxlength) {
                            $(this).errorStyle(msg_maxlength);
                            return;
                        } else {
                            $(this).removeErrorStyle();
                        }
                    }
                    // check email
                    var isEmail = element['attr']['isEmail'];
                    if (isEmail != undefined) {
                        var msg_email = "メールアドレスとして正しくありません";
                        if (isValidEmailAddress($(this).val().trim()) != true) {
                            $(this).errorStyle(msg_email);
                            return;
                        } else {
                            $(this).removeErrorStyle();
                        }
                    }

                    //check error tab && item focus
                    //flag=false: if don't check tab error
                    if (flag) {
                        //checkCurrentError(this);
                    }
                } catch (e) {
                    alert(event + ' ' + key + ': ' + e.message);
                }
            });
            $(document).on('blur', key, function () {
                try {
                    // check required
                    var required = element['attr']['required'];
                    if (required === true) {
                        // var msg_required = "This is a required field! ";
                        if ($(this).val() === '' || ((type === 'select' || type === 'number') && convertNumber($(this).val()) === 0)) {
                            $(this).errorStyle('必須入力です。');
                            return;
                        } else {
                            $(this).removeErrorStyle();
                        }
                    }
                    // check maxlength
                    var maxlength = element['attr']['maxlength'];
                    if (maxlength != undefined) {
                        var msg_maxlength = "データが長い過ぎです。";
                        if ($(this).val().length > maxlength) {
                            $(this).errorStyle(msg_maxlength);
                            return;
                        } else {
                            $(this).removeErrorStyle();
                        }
                    }
                    // check email
                    var isEmail = element['attr']['isEmail'];
                    if (isEmail != undefined) {
                        var msg_email = "メールアドレスとして正しくありません";
                        if (isValidEmailAddress($(this).val().trim()) != true) {
                            $(this).errorStyle(msg_email);
                            return;
                        } else {
                            $(this).removeErrorStyle();
                        }
                    }

                    //check error tab && item focus
                    //flag=false: if don't check tab error
                    if (flag) {
                        //checkCurrentError(this);
                    }
                } catch (e) {
                    alert(event + ' ' + key + ': ' + e.message);
                }
            });
        });
    } catch (e) {
        alert('initValidate' + e.message);
    }
}

/**
 * validate data common
 *
 * @author        :    KienNT - 2017/02/16 - create
 * @params        :    null
 * @return        :    null
 */
function _validate(element) {
    if (!element) {
        element = $('body');
    }
    var error = 0;
    try {
        _clearErrors();
        element.find('.required:enabled:not([readonly])').each(function () {
            if ($(this).is(':visible')) {
                if (($(this).is("input") || $(this).is("textarea")) && $.trim($(this).val()) == '') {
                    $(this).errorStyle('必須入力です。');
                    error++;
                } else if ($(this).is("select") && ($(this).val() == '0' || $(this).val() == undefined)) {
                    $(this).errorStyle('必須入力です。');
                    error++;
                } else if ($(this).is("input[type=checkbox]") && !$(this).is(":checked")) {
                    $(this).errorStyle('必須入力です。');
                    error++;
                }
            }
        });

        element.find('input.email:enabled:not([readonly])').each(function () {
            if (!_validateEmail($(this).val())) {
                $(this).errorStyle('フォーマットが正しくありません。');
                error++;
            }
        });


        //
        // element.find('input.tel:enabled:not([readonly])').each(function(){

        //     if(!_validatePhoneFaxNumber($(this).val())){
        //         $(this).errorStyle(_text[21]);
        //         error++;
        //     }
        // });

    } catch (e) {
        alert('_validate: ' + e.toString());
    }
    if (error > 0) {
        return false;
    } else {
        return true;
    }
}

/**
 * Check Email
 * @param string
 * @returns {Boolean}
 */
function _validateEmail(string) {
    if (string == '') {
        return true;
    }

    string = _formatString(string);
    //var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var reg =   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var reg = /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
    if (string.match(reg)) {
        return true;
    } else {
        return false;
    }
}

/**
 * format phone, fax number
 * @param string
 * @param input
 */
function _validatePhoneFaxNumber(string) {
    try {
        string = _formatString(string);
        var reg = /^[0-9]+[-][0-9]+[-][0-9]+$/;
        if (string.match(reg) || string == '') {
            return true;
        }
        return false;
    } catch (e) {
        alert('_validatePhoneFaxNumber: ' + e);
    }
}

/**
 * check all tab eror
 *
 * @author : kyvd - 2016/08/09 - create
 * @author :
 * @return : null
 * @access : public
 * @see :
 */
// function checkAllTabError() {
// 	try {
// 		var isCheckHasError = false;
// 		//remove class tab-error
// 		$('.tab-error').removeClass('tab-error');
// 		//background tab error
// 		$('.tab-content .tab-pane').each(function() {
// 			if(!isCheckHasError){
// 				var elem = $(this).find('.item-error:first');
// 				if(elem.parents('.tab-pane').length > 0){
// 					var index = elem.parents('.tab-pane').index();
// 					index = (index - 1)/2;
// 					//mobile
// 					$('.tab-content').find('a.r-tabs-anchor').eq(index).addClass('tab-error');
// 					$('.tab-content').find('a.r-tabs-anchor').eq(index).trigger('click');
// 					//destop
// 					$('.nav-tabs').find('li').eq(index).find('a').addClass('tab-error');
// 					$('.nav-tabs').find('li').eq(index).find('a').trigger('click');
// 					isCheckHasError = true;
// 				}
// 			}
// 		});
// 		//tab error click
// 		var elem = $('.item-error:first');
// 		if(elem.parents('.tab-pane').length > 0){
// 			var index = elem.parents('.tab-pane').index();
// 		}
// 		//focus item error
// 		elem.focus();
// 		//_balloontipMouseover('', jQuery(elem));
// 	} catch (e) {
// 		alert('checkAllTabError:' + e.message);
// 	}

// }

/**
 * convert number
 *
 * @author : kyvd - 2016/08/22 - create
 * @author :
 * @param  : string
 * @return : number
 * @access : public
 * @see :
 */
function convertNumber(string) {
    try {
        var num = 0;
        if (!isNaN(string) && string !== '') {
            num = parseInt(string);
        }
        return num;
    } catch (e) {
        return 0;
    }
}

/**
 * @author: VuongVT
 * @param {Object} selector
 * @param {Object} count
 */
// function hoverGroup (selector, count, colorhover) {
// 	if(typeof count == 'undefined'){
// 		count = 1;
// 	}
// 	if(typeof colorhover == 'undefined'){
// 		colorhover = '#ffff88';
// 	}

// 	var selectorTr = selector + ' tbody tr';
// 	var eq, eq0, el, color;

// 	try {
// 		$(document).on({
// 			mouseover: function(){
// 				if($(this).find('td.no-hover').length > 0){
// 					return;
// 				}
// 				eq    = $(this).index();
// 				color = $(this).css("background-color");
// 				eq0   = eq - eq%count;
// 				var x = count;
// 				while(x--){
// 					var index = eq0 + x;
// 					el  = selector + ' tbody tr:eq(' + index +')';
// 					$(el).css("background-color", colorhover);
// 					eltd  = selector + ' tbody tr:eq(' + index +') td';
// 					$(eltd).css("background-color", colorhover);
// 				}
// 			},
// 			mouseleave: function(){
// 				if($(this).find('td.no-hover').length > 0){
// 					return;
// 				}
// 				var x = count;
// 				while(x--){
// 					var index = eq0 + x;
// 					el  = selector + ' tbody tr:eq(' + index +')';
// 					eltd  = selector + ' tbody tr:eq(' + index +') td';
// 					var style = $(el).attr('style').split(";");
// 					for(var i = style.length - 1; i--;){
// 						if (style[i].indexOf("background-color") != -1) style.splice(i, 1);
// 					}
// 					style = style.join(";");
// 					$(el).attr('style', style);
// 					$(eltd).attr('style', style);
// 				}
// 			}
// 		}, selectorTr);
// 	} catch (e){
// 		console.log(e);
// 	}
// }

/**
 * getData
 *
 * @author : vuongvt - 2016/10/27 - create
 * @author :
 * @return : null
 * @access : public
 * @see :
 */
 function getData(obj) {
    try {

        var data = {};
        $.each(obj, function (key, element) {
            switch (element.type) {
                case 'text':
                if ($('#' + key).hasClass('padding-zero')) {
                    data[key] = $.trim($('#' + key).val()) == '' ? 0 : $.trim($('#' + key).val()) * 1;
                } else if ($('#' + key).hasClass('postal_code')) {
                    data[key] = $.trim($('#' + key).val()).replace('-', '');
                } else {
                    data[key] = $.trim($('#' + key).val());
                }
                if ($('#' + key).hasClass('money') || $('#' + key).hasClass('numeric')) {
                    data[key] = data[key].replace(/,/g, '');
                }
                break;
                case 'textarea':
                data[key] = $.trim($('#' + key).val());
                break;
                case 'time':
                data[key] = $.trim($('#' + key).val()).replace(':', '');
                break;
                case 'refer':
                data[key] = $.trim($('#' + key).val());
                break;
                case 'select':
                data[key] = $('#' + key).val();
                if (!data[key]) {
                    data[key] = 0;
                }
                break;
                case 'multiselect':
                if ($.isArray($('#' + key).val())) {
                    var values = $("#" + key).val();
                    data[key] = [];
                    for (var i = 0; i < values.length; i++) {
                        var obj = {};
                        obj[key] = values[i];
                        data[key].push(obj);
                    }
                } else {
                    data[key] = $('#' + key).val();
                    if (!data[key]) {
                        data[key] = 0;
                    }
                }
                break;
                case 'radiobox':
                var name = element['attr']['name'];
                data[key] = $("input[name='" + name + "']:checked").val();
                break;
                case 'checkbox':
                data[key] = false;
                if ($('#' + key).is(":checked")) {
                    data[key] = true;
                }
                break;
                case 'money':
                data[key] = $.trim($('#' + key).val()).replace(/,/g, '');
                break;
                // add by phonglv
                case 'numeric':
                data[key] = 1 * ($.trim($('#' + key).val()).replace(/,/gi, '').replace(/%/gi, ''));
                break;
                case 'title':
                data[key] = $.trim($('#' + key).text());
                break;
                case 'list':
                var array_str   =   [];
                switch(element.attr.typelist){
                    case 'checkbox':
                    $('.'+key+':checked').each(function(index,value) {
                        list = {};
                        list[key] = $(this).val();
                        array_str.push(list);
                    });
                    data[key]   =   array_str;
                    break;
                    case 'radiobox':
                    $('.'+key+':checked').each(function(index,value) {
                        list = {};
                        list[key] = $(this).val();
                        array_str.push(list);
                    });
                    data[key]   =   array_str;
                    break;
                    case 'text':
                    $('.'+key).each(function(index,value) {
                        list = {};
                        if ($('.'+key).hasClass('padding-zero')) {
                            list[key] = $.trim($(this).val()) == '' ? 0 : $.trim($(this).val()) * 1;
                        } else if ($('.'+key).hasClass('postal_code')) {
                            list[key] = $.trim($(this).val()).replace('-', '');
                        } else {
                            list[key] = $.trim($(this).val());
                        } 
                        if ($('.'+key).hasClass('money') || $('.'+key).hasClass('numeric')) {
                            list[key] = list[key].replace(/,/g, '');
                        }
                        array_str.push(list);
                    });
                    data[key]   =   array_str;
                    break;
                    default:
                    break;
                }
                break;
                default:
                break;
            }
            ;
        });
        return data;
    } catch (e) {
        alert('getData: ' + e.message);
    }
 }

/**
 * initItem
 *
 * @author : tuantv - 2017/11/22 - create
 * @author :
 * @params : null
 * @return : null
 * @access : public
 * @see :
 */
function initItem(obj) {
    try {
        // int element
        $.each(obj, function (key, element) {
            var selector = $('#' + key);
            if ($.type(element['selector']) !== 'undefined') {
                selector = $('.' + key);
            }
            if ($.type(element['attr']) !== 'undefined') {
                $.each(element['attr'], function (k, e) {
                    if (k == 'class') {
                        selector.addClass(element['attr'][k]);
                    } else {
                        selector.attr(k, e);
                    }
                });
            }
        });
        // format input
        //_formatInput();
    } catch (e) {
        alert('initItem' + e.message);
    }
}

/**
 * add responsive for pagging after search
 *
 * @author : vuongvt - 2016/10/27 - create
 * @author :
 * @params : null
 * @return : null
 * @access : public
 * @see :
 */
function addResponsivePagging() {
    // Adding toggle for Reponsive
    $('.panel-heading, .page-header-content, .panel-body, .panel-footer').has('> .heading-elements').append('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');
    // Toggle visible state of heading elements
    $('.heading-elements-toggle').on('click', function () {
        $(this).parent().children('.heading-elements').toggleClass('visible');
    });
}

/**
 * get html contiditon
 *
 * @author      :   vuongvt - 2016/10/28 - create
 * @author      :
 * @params      :   null
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function getHtmlCondition(id) {
    $('select option').each(function () {
        $(this).attr('selected', this.selected);
    });
    $(id).find('input').each(function () {
        if ($(this).is('[type="text"]') || $(this).is('[type="tel"]')) {
            $(this).attr('value', $(this).val());
            // $('.date').removeClass('hasDatepicker');    //add by longvv at 201609012
            // $('.date').next('img').remove();            //add by longvv at 201609012
        } else if ($(this).is('[type="checkbox"]')) {
            if ($(this).is(':checked')) {
                $(this).attr('checked', true);
            } else {
                $(this).removeAttr('checked');
            }
        } else if ($(this).is('[type="radio"]')) {
            if ($(this).is(':checked')) {
                $(this).attr('checked', true);
            } else {
                $(this).removeAttr('checked');
            }
        }
    });
    return $(id).html();
}

/**
 * post param into Link controller to save session param
 *
 * @author : thanhnv - 2015/12/08 - create
 * @author :
 * @param  : string - screenId
 * @param  : json object - parram
 * @return : null
 * @access : public
 * @see :
 */
function postParamToLink(fromScreenId, toScreenId, parram, referUrl, callback) {
    //try {
    if (referUrl == null) {
        return;
    }
    //debugger;
    $.ajax({
        type: 'POST',
        url: '/common/link/linksession',
        dataType: 'json',
        data: {
            'from_ScreenId': fromScreenId,
            'to_ScreenId': toScreenId,
            'param': parram
        },

        success: function (res) {
            if (referUrl != '') {
                window.location.href = referUrl;
            }
        },
        error: function (xhr, stt, err) {
            console.log(stt);
            console.log(err);
            console.log(xhr);
        }
    });
    //} catch (e) {
    //    alert('postParamToLink' + e.message);
    //}
}

/**
 * showPopup
 *
 * @author  :   vuongvt - 2016/11/04 - create
 * @author  :
 * @param   :   href,callback
 * @return  :   null
 * @access  :   public
 * @see     :
 */
function showPopup(href, callback, width, height) {
    if (width == undefined || window.innerWidth < 900) {
        width = '90%';
    }
    if (height == undefined) {
        height = '85%';
    }

    var properties = {
        href: href,
        open: true,
        iframe: true,
        fastIframe: false,
        opacity: 0.2,
        escKey: true,
        overlayClose: false,
        innerWidth: width,
        innerHeight: height,
        width: width,
        height: height,
        reposition: true,
        speed: 0,
        trapFocus: true,
        onComplete: function (res) {
            $('#colorbox-width').val(width);
            $('#colorbox-height').val(height);

        },
        onOpen: function () {
            $('body').css({
                'overflow-y': 'hidden'
            });
        },
        onClosed: function () {
            $('body').css({
                'overflow-y': 'auto'
            });
            if (callback) {
                callback();
            }
        }
    };
    $.colorbox(properties);
}

/**
 * Convert Full-width to Half-width Characters
 *
 * @param string
 * @returns string
 */
function _formatString(string) {
    try {
        string = $.textFormat(string, '9');
        string = $.textFormat(string, '@');
        string = $.textFormat(string, 'a');
        string = $.textFormat(string, 'A');
        return string;
    } catch (e) {
        alert('_formatString: ' + e);
    }
}

/**
 * padZeroLeft
 *
 * @author : viettd - 2015/10/02 - create
 * @author :
 * @param :
 *            $data
 * @param :
 *            $max
 * @return : null
 * @access : public
 * @see :
 */
function padZeroLeft($data, $max) {
    try {
        var length = $max - $data.length; // alert(length);
        var zero = '';
        if (length == $max) {
            return '';
        }
        for (var i = 0; i < length; i++) {
            zero = zero + '0';
        }
        return zero + $data;
    } catch (e) {
        alert('padZeroLeft' + e.message);
    }
}

/**
 * padZeroRight
 *
 * @author  : vuongvt - 2016/11/14 - create
 * @author  :
 * @param   : $data
 * @param   : $max
 * @return  : null
 * @access  : public
 * @see :
 */
function padZeroRight($data, $max) {
    try {
        var length = $max - $data.length; // alert(length);
        var zero = '';
        if (length == $max) {
            return '';
        }
        for (var i = 0; i < length; i++) {
            zero = zero + '0';
        }
        return $data + zero;
    } catch (e) {
        alert('padZeroRight' + e.message);
    }
}

/**
 * Check Time
 *
 * @param string
 * @returns {Boolean}
 */
function _validateTime(string) {
    // string = _formatString(string);
    var reg = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]|[2][4]:[0][0]$/;
    if (string.match(reg) || string == '') {
        return true;
    } else {
        return false;
    }
}

/**
 * validate email
 *
 * @author      :   vuongvt - 2016/10/26 - create
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

/**
 * Check Email
 * @param string
 * @returns {Boolean}
 */
function _validateEmail(string) {
    if (string == '') {
        return true;
    }

    string = _formatString(string);
    //var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var reg =   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var reg = /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
    if (string.match(reg)) {
        return true;
    } else {
        return false;
    }
}

/**
 * init all controls event
 *
 * @author  :   vuongvt - 2016/11/04 - create
 * @author  :
 * @param   :   href,callback
 * @return  :   null
 * @access  :   public
 * @see     :
 */
function initOneTimeControls() {
    //init focus first item
    _focusFirstItem();

    //init enter key search
    _enterKeySearch();

    //btn search
    $(document).on('click', '.btn-search', function () {
        var data = {};
        var parent = $(this).parents('.popup');
      
        var input = parent.find('input');
        var btn = input.attr('tabindex');
        data.search = parent.data('search');
        data.istable = parent.data('istable');
        data.multi = parent.data('multi');
        data.btnid = btn;
        if (parent.data('search') == 'p002') {
            showPopup('/popup/search/' + data.search + '?' + _setGetPrams(data), function () {
                input.focus();
            }, '40%', '40%');
        }
        if (parent.data('search') == 'lm002' || parent.data('search') == 'l001') {
            //get local id
            if ($('#company_cd').length) {
                data.company_cd = $('#company_cd').val() == '' ? 0 : $('#company_cd').val();
            }
            showPopup('/popup/search/' + data.search + '?' + _setGetPrams(data), function () {
                input.focus();
            });

        } else {
            showPopup('/popup/search/' + data.search + '?' + _setGetPrams(data), function () {
                // parent.find('input:first').focus(); vietdt edit 2019/0
                 parent.find('input:enabled:visible:not([readonly]):first').focus();
            });
        }
    });

    //Ans AnhDt: Added - 2017-12-13
    $(document).on('blur', 'input.postal_code', function (e) {
        var _temp = $(this).val();
        if (_temp.indexOf('-') == -1) {
            if (_temp != '') {
                var _first = _temp.substring(0, 3);
                var _last = _temp.substring(3, 7);
                $(this).val(_first + '-' + _last);
            }
        } else {
            if (_temp != '') {
                var _first = _temp.substring(0, 3);
                var _last = _temp.substring(4, 8);
                var _sperator = _temp.substring(3, 4);
                if ($.isNumeric(_first) && $.isNumeric(_last) && _sperator == '-') {
                    $(this).val(_first + '-' + _last);
                } else {
                    $(this).val('');
                }
            }
        }
    });

    $(document).on('focus', 'input.postal_code', function (e) {
        var _temp = $(this).val().replace('-', '');
        $(this).val(_temp);
        $(this).select();
    });

    $(document).on('blur', 'input.amount, input.rate, input.percentage', function (event) {
        var item = $(this);
        var value = item.val().replace(/,/gi, '');
        if (value != '') {
            if ($.isNumeric(value)) {
                value = addCommas(value);
                if (value == 0) {
                    item.val('0');
                } else {
                    item.val(value);
                }
            } else {
            }
        }
    });

    $("input.amount").on("focus", function () {
        $(this).select();
    });
    //End AnhDt

    //refer search
    $(document).on('change', '.refer-search', function () {
        var _paras = {};
        var parent = $(this).parents('.popup');
        var temp_elem = $(this);
        var _key = parent.data('search');
        //var nm = parent.data('nm');
        var istable = parent.data('istable');
        var refer_item = parent.data('refer_item');
        _paras.key = _key;
        _paras.value = $(this).val();
        _paras.option1 = parent.data('option1');
        _paras.option2 = parent.data('option2');
        _paras.option3 = parent.data('option3');
        _paras.option4 = parent.data('option4');
        var nm = parent.data('nm');
        var id = parent.data('id');
        if (istable == '1') {
            parent = $(this).parents('tr');
        }
        $.post('/common/refername', _paras, function (res) {
            if (istable) {
                if (res[id] == '') {
                    temp_elem.val('');
                }
                parent.find('.' + nm).text(res[nm]);
                parent.find('.' + nm).val(res[nm]);
                parent.find('.' + nm).prop('title', res[nm]);
            } else {
                if (res[id] == '') {
                    temp_elem.val('');
                }
                parent.find('.' + nm).text(res[nm]);
                parent.find('.' + nm).val(res[nm]);
                parent.find('.' + nm).prop('title', res[nm]);
            }
            // trigger custom change
            temp_elem.trigger(_key + 'change');
            console.log(_key + 'change');
            parent.find('.' + nm).trigger(_key + 'change');
        });
    });
    $(document).on('change', '.refer-search-1', function () {

        var parent = $(this).parents('.popup');
        var nm = parent.data('nm');
        var id = parent.data('id');
        var temp_elem = $(this);
        var _key = parent.data('search');
        var istable = parent.data('istable');
        if (parent.find('.refer-search-1').eq(0).val() != '' && parent.find('.refer-search-1').eq(1).val() != '') {

            var _paras = {};
            //var nm = parent.data('nm');
            var refer_item = parent.data('refer_item');
             _paras.key = _key;
            //* KienNT modified 2018/02/01 CHÚ Ý : vì có 2 item key chính nên các option phụ sẽ bị đẩy lùi xuống 1 vị trí
            _paras.value = parent.find('.refer-search-1').eq(0).val();
            _paras.option1 = parent.find('.refer-search-1').eq(1).val();
            _paras.option2 = parent.data('option1');
            _paras.option3 = parent.data('option2');
            _paras.option4 = parent.data('option3');
            // console.log(_paras);
            if (istable == '1') {
                parent = $(this).parents('tr');
            }

            $.post('/common/refername', _paras, function (res) {

                if (istable) {
                    if (res[id] == '') {
                        temp_elem.val('');
                    }
                    //console.log('aaaa');
                    console.log(parent.length);
                    parent.find('.' + nm).text(res[nm]);
                    parent.find('.' + nm).val(res[nm]);
                    parent.find('.' + nm).prop('title', res[nm]);
                } else {
                    if (res[id] == '') {
                        temp_elem.val('');
                    }
                    if ($.inArray(parent.find('.' + nm + ":visible").prop("tagName"), ["INPUT", "SELECT"]) != -1) {
                        parent.find('.' + nm).val(res[nm]);
                    } else {
                        parent.find('.' + nm).text(res[nm]);
                        parent.find('.' + nm).prop('title', res[nm]);
                    }
                }
                // trigger custom change
                temp_elem.trigger(_key + 'change');
                parent.find('.' + nm).trigger(_key + 'change');
            });
        } else {
            if (istable == '1') {
                parent = $(this).parents('tr');
            }
            if ($.inArray(parent.find('.' + nm + ":visible").prop("tagName"), ["INPUT", "SELECT"]) != -1) {
                parent.find('.' + nm).val('');
            } else {
                parent.find('.' + nm).text('');
                parent.find('.' + nm).prop('title', '');
            }
            // trigger custom change
            temp_elem.trigger(_key + 'change');
            parent.find('.' + nm).trigger(_key + 'change');
        }
    });

}
/**
 * init all controls event
 *
 * @author  :   vuongvt - 2016/11/04 - create
 * @author  :
 * @param   :   href,callback
 * @return  :   null
 * @access  :   public
 * @see     :
 */
function initControls() {
    //DuyTP 2017/05/10 - update: add placeholder「:」 for class .time
    //init placeholder for class time
    $('.time').prop('placeholder', 'hh:mm');
    $('.second').prop('placeholder', 'hh:mm:ss');

    //button login
    $(document).on('click', '#logout-link', function () {
        try {
            var _url = '/logout';

            $.ajax({
                type: 'POST',
                url: _url,
                dataType: 'json',
                success: function (res) {
                    location.href = '/';
                },
                // Ajax error
                error: function (res) {
                    location.href = '/';
                },
            });
        } catch (e) {
            alert('search' + e.message);
        }
    });

    $(document).on('click', '#btn-logout', function () {
        $.ajax({
            type: 'POST',
            url: '/logout',
            dataType: 'json',
            loading: false,
            data: {
                url: window.location.pathname,
            },
            success: function (res) {
                location.href = '/';
            },
            // Ajax error
            error: function (res) {
            }
        });
    })

    //dynamically set tab index
    _setTabIndex();

    //format datepicker
    _formatDatepicker();

    //format yearmonth picker
    _formatYearMonthPicker();

    //auto format date items when lose focus
    _autoFormattingDate("input.datepicker");
    _autoFormattingMonth("input.month");

    /**
     * @author: VuongVT - 2016/10/26
     * @reason: init for numeric control (positive and negative)
     */

        //HungNV comment 2017/01/24
        //$(".numeric").autoNumeric('init', {vMax: '999999999', vMin: '-999999999'});
    $(document).on('keydown', 'input.numeric:enabled', function (e) {
        if (e.keyCode == 229
            || !(      (e.keyCode > 47 && e.keyCode < 58)
            || (e.keyCode > 95 && e.keyCode < 106)
                //////////// PERIOD SIGN ////////////////////////////////////////////////////////////////
            || ((e.keyCode == 190 || e.keyCode == 110) && $(this).val().indexOf('.') === -1)
            || e.keyCode == 173
            || e.keyCode == 109
            || e.keyCode == 189
            || e.keyCode == 116
            || e.keyCode == 46
            || e.keyCode == 37
            || e.keyCode == 39
            || e.keyCode == 36
            || e.keyCode == 35
            || e.keyCode == 8
            || e.keyCode == 9
            || e.keyCode == 13)
        ) {
            e.preventDefault();
            return false;
        }
        // if (e.keyCode == 229) {
        // 	var val = $(this).val();
        // 	var newValue = convertKana($('#fullsize_number').val(), 'h');
        //        $(this).val(newValue);
        //        return false;
        // }
        // if (	!(      (e.keyCode > 47 && e.keyCode < 58)
        // 			||  (e.keyCode > 95 && e.keyCode < 106)
        // 			//////////// PERIOD SIGN ////////////////////////////////////////////////////////////////
        // 			||  ((e.keyCode == 190 || e.keyCode == 110) && $(this).val().indexOf('.') === -1)
        // 			||  e.keyCode == 173
        // 			||  e.keyCode == 109
        // 			||  e.keyCode == 189
        // 			||  e.keyCode == 116
        // 			||  e.keyCode == 46
        // 			||  e.keyCode == 37
        // 			||  e.keyCode == 39
        // 			|| e.keyCode == 36
        // 			|| e.keyCode == 35
        // 			||  e.keyCode == 8
        // 			||  e.keyCode == 9
        // 			||  e.keyCode == 13)
        // ){
        // 		e.preventDefault();
        // 		return false;
        // }

        // debugger;
        var negativeEnabled = $(this).attr('negative');
        if (
            e.keyCode != 116
            && e.keyCode != 46
            && e.keyCode != 35
            && e.keyCode != 36
            && e.keyCode != 37
            && e.keyCode != 39
            && e.keyCode != 8
            && e.keyCode != 9
            && e.keyCode != 173
            && e.keyCode != 189
            && e.keyCode != 109
            && ($(this).get(0).selectionEnd - $(this).get(0).selectionStart) < $(this).val().length
        ) {
            // DEFAULT PARAMS (NUMERIC (10, 0))
            var ml = 10;
            var dc = 0;
            if (parseInt($(this).attr('maxlength')) * 1 > 2) {
                ml = 1 * $(this).attr('maxlength') - 1;
            }
            if (parseInt($(this).attr('decimal')) > 0) {
                dc = 1 * $(this).attr('decimal');
                if (dc >= ml - 1) {
                    dc = 0;
                }
            }
            var it = (ml - (dc > 0 ? (dc + 1) : 0));

            // CURRENT STATES
            var val = $(this).val();
            var negative = val.indexOf('-') > -1;
            var selectionStart = $(this).get(0).selectionStart;
            var selectionEnd = $(this).get(0).selectionEnd;
            if (negative) {
                val = val.substring(1);
                selectionStart--;
                selectionEnd--;
            }
            // OUTPUT STATES
            var destSelectionStart = undefined;
            var destSelectionEnd = undefined;
            var destVal = undefined;

            // SKIP PERIOD KEY WHEN DECIMAL = 0
            if (dc == 0 && (e.keyCode == 190 || e.keyCode == 110)) {
                e.preventDefault();
            }
            // EXCEED THE ACCEPTED NUMBER OF INTEGERS
            if (val.match(new RegExp('[0-9]{' + it + '}')) && selectionStart <= it) {
                // PERIOD DOES NOT EXIST
                if (val.indexOf('.') === -1) {
                    // PERIOD KEY NOT RECEIVED (USER FORGETS TO TYPE PERIOD)
                    // DECIMAL > 0
                    if (e.keyCode != 190 && e.keyCode != 110 && dc > 0) {
                        e.preventDefault();
                        var output = val.substring(0, selectionStart)
                            + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode - 48 : e.keyCode)
                            + val.substring(selectionStart);
                        // INSERT PERIOD
                        destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                    }
                    // PERIOD EXISTS
                    // CARET STARTS NEXT TO THE PERIOD
                } else if (
                    selectionStart == val.indexOf('.')
                ) {
                    // EXCEED THE ACCEPTED NUMBER OF DECIMALS
                    if (val.match(new RegExp('\\.[0-9]{' + dc + '}$'))) {
                        e.preventDefault();
                    } else {
                        // JUMP TO THE NEXT POSITION THEN INSERT THE DIGIT
                        destSelectionStart = selectionStart + 1;
                    }
                    // CARET STARTS BEFORE THE PERIOD AND NOTHING HIGHLIGHTED
                } else if (
                    selectionStart < val.indexOf('.')
                    && selectionStart == selectionEnd
                ) {
                    e.preventDefault();
                    // CARET STARTS BEFORE THE PERIOD AND ENDS AFTER THE PERIOD (HIGHLIGHTS OVER THE PERIOD)
                } else if (
                    selectionEnd > val.indexOf('.')
                    && selectionStart < val.indexOf('.')
                ) {
                    e.preventDefault();
                    var output = val.substring(0, selectionStart)
                        + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode - 48 : e.keyCode)
                        + val.substring(selectionEnd);
                    destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                    destSelectionStart = selectionStart + 1;
                    destSelectionEnd = selectionStart + 1;
                }
                // INTEGERS CAN BE ADDED BUT...
                // EXCEED THE ACCEPTED NUMBER OF DECIMALS
            } else if (val.match(new RegExp('\\.[0-9]{' + dc + '}$'))) {
                // PERIOD EXISTS
                // CARET STARTS AFTER THE PERIOD
                if (val.indexOf('.') != -1 && selectionStart > val.indexOf('.')) {
                    e.preventDefault();
                }
            }

            // CARET RESULT
            if (destVal && negative) {
                destVal = '-' + destVal;
            }
            if (destVal) {
                $(this).val(destVal);
            }
            if (negative && destSelectionStart) {
                destSelectionStart++;
            }
            if (destSelectionStart) {
                $(this).get(0).selectionStart = destSelectionStart;
            }
            if (negative && destSelectionEnd) {
                destSelectionEnd++;
            }
            if (destSelectionEnd) {
                $(this).get(0).selectionEnd = destSelectionEnd;
            }
        } else if (
            e.keyCode == 173
            || e.keyCode == 109
            || e.keyCode == 189
        ) {
            e.preventDefault();

            if (negativeEnabled) {
                var val = $(this).val();
                var negative = val.indexOf('-') > -1;
                if (negative) {
                    {
                        $(this).val(val.substring(1));
                    }
                } else {
                    $(this).val('-' + val);
                }
            }
        }

        // fix maxlenght
        val = $(this).val();
        if ($(this).attr('fixed') != undefined && val.indexOf('-') > -1) {
            f_maxlenght = (parseInt($(this).attr('maxlengthfixed')) + 1) + '';

            if (val.length <= f_maxlenght)
                $(this).attr('maxlength', f_maxlenght);
            else
                $(this).attr('maxlength', f_maxlenght);
        }
        else if ($(this).attr('maxlength') > $(this).attr('maxlengthfixed')) {
            $(this).attr('maxlength', $(this).attr('maxlengthfixed'));
        }


    });

    /**
     * @author: KienNT - 2017/02/23
     * @reason: init for numeric control (decimal) example numeric(5,2)
     */
    $(document).on('keydown', 'input.money', function (event) {
        //var ctrlDown = event.ctrlKey||event.metaKey; // Mac support
        if (
            (    !(    (event.keyCode > 47 && event.keyCode < 58)  // 0 ~ 9
                    || (event.keyCode > 95 && event.keyCode < 106) // numpad 0 ~ numpad 9
                    || event.keyCode == 116 	// F5
                    || event.keyCode == 46 	// del
                    || event.keyCode == 35 	// end
                    || event.keyCode == 36 	// home
                    || event.keyCode == 37		//　←
                    || event.keyCode == 39		// →
                    || event.keyCode == 8		// backspace
                    || event.keyCode == 9		// tab
                    || event.keyCode == 188	// ,
                    || event.keyCode == 189	// -
                    || event.keyCode == 109	// numpad -
                    || event.keyCode == 173	// - (firefox only)
                    || event.keyCode == 190	// .
                    || event.keyCode == 110	// numpad .
                    || (event.shiftKey && event.keyCode == 35) // shift + end
                    || (event.shiftKey && event.keyCode == 36) // shift + home
                    || event.ctrlKey // allow all ctrl combination
                )
            )
            || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude Shift + [0~9]
        )
            event.preventDefault();
    });

    $(document).on('keypress', '.money', function (event) {
        // debugger;
        var $this = $(this);
        var decimal_len = (typeof $this.attr('decimal_len') === 'undefined') ? 0 : (1 * $this.attr('decimal_len'));
        var real_len = (typeof $this.attr('real_len') === 'undefined') ? 0 : (1 * $this.attr('real_len'));
        var negative = (typeof $this.attr('negative') === 'undefined') ? 0 : (1 * $this.attr('negative'));

        if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
            (((event.which != 45 && event.which < 48) || event.which > 57) &&
            (event.which != 0 && event.which != 8))) {
            event.preventDefault();
        }

        var text = $(this).val();
        var str_real = text;
        var str_decimail = '';
        if (text.indexOf('.') != -1) {
            str_real = text.substring(0, $this.val().indexOf('.'));
            str_decimail = text.substring($this.val().indexOf('.') + 1, text.length);
        }
        if ((event.which == 46) && (text.indexOf('.') == -1)) {
            setTimeout(function () {
                if ($this.val().substring($this.val().indexOf('.')).length > decimal_len + 1) {
                    $this.val($this.val().substring(0, $this.val().indexOf('.') + decimal_len + 1));
                }
            }, 1);
        }
        // out of decimal
        if ((text.indexOf('.') != -1) &&
            (text.substring(text.indexOf('.')).length > decimal_len) &&
            (event.which != 0 && event.which != 8) &&
            ($(this)[0].selectionStart >= text.length - 2)) {
            event.preventDefault();
        }

        // out of real
        var selectionText = '';
        if (window.getSelection) {
            selectionText = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            selectionText = document.selection.createRange().text;
        }
        if (
            (((str_real.length >= real_len) && (event.which != 0 && event.which != 8 && event.which != 46) && (text.indexOf('.') == -1)) ||
            ((str_real.length >= real_len) && (event.which != 0 && event.which != 8) && (text.indexOf('.') != -1) && ($(this)[0].selectionStart <= text.indexOf('.')))) && selectionText == ''
        ) {
            event.preventDefault();
        }

        // negative
        if ((negative != 1 || text.indexOf('-') > -1) && (event.which == 45)) {
            event.preventDefault();
        } else if (text.indexOf('-') == -1 && event.which == 45 && negative == 1) {
            $this.val(text);
        }


    });

    //format money
    $(document).on('blur', 'input.money:not([readonly])', function (event) {
        var item = $(this);
        var value = item.val().replace(/,/gi, '');
//		value = value * 1;
        if (value != '') {
            if ($.isNumeric(value)) {
                value = addCommas(value * 1);
                item.val(value);
            } else {
                item.val('');
            }
        }
    });

    //remove format on focus
    $(document).on('focus', 'input.money', function () {
        $(this).val($(this).val().replace(/,/g, ''));
        $(this).select();
    });
    // END : KienNT add format numeric 2017/02/23


    /**
     * @author: VuongVT - 2016/10/26
     * @reason: init for numeric control (decimal)
     */
    // $(".numeric-decimal").autoNumeric('init', {aDec: '.', vMax: '999999999.00', vMin: '-999999999.00'});

    /***************************************START REGION**************************************************/
    /******************************************************************************************************
     * @author: VuongVT - 2016/10/10
     * @reason: popup jquery function
     *****************************************************************************************************/
        // button close popup
    $(document).on('dblclick', '#btn-close-popup', function () {
        parent.$.colorbox.close();
    });

    // close colobox Cm0120i
    $(document).on('click', '#btn-cancel', function () {
        parent.$.colorbox.close();
    });

    //Configure colorbox call back to resize with custom dimensions
    $.colorbox.settings.onLoad = function () {
        colorboxResize();
    }

    // Customize colorbox dimensions
    var colorboxResize = function (resize) {
        var width = $('#colorbox-width').val();
        var height = $('#colorbox-height').val();

        if (width == undefined || window.innerWidth < 900) {
            width = '90%';
        }
        if (height == undefined) {
            height = '85%';
        }

        $.colorbox.settings.height = height;
        $.colorbox.settings.width = width;

        //if window is resized while lightbox open
        if (resize) {
            $.colorbox.resize({
                'height': height,
                'width': width
            });
        }
    }

    //In case of window being resized
    $(window).resize(function () {
        colorboxResize(true);
    });

    /*********************************************END REGION**********************************************/

    /***************************************START REGION**************************************************
     * @author: VuongVT - 2016/11/14
     * @reason: time control
     *
     *****************************************************************************************************/
    $(document).on('keydown', 'input.time, input.second', function (event) {
        // var ctrlDown = event.ctrlKey||event.metaKey; //
        // Mac support
        if ((!((event.keyCode > 47 && event.keyCode < 58) // 0 ~
                    // 9
                || (event.keyCode > 95 && event.keyCode < 106) // numpad
                    // 0 ~
                    // numpad
                    // 9
                || event.keyCode == 116 // F5
                || event.keyCode == 46 // del
                || event.keyCode == 35 // end
                || event.keyCode == 36 // home
                || event.keyCode == 37 // ←
                || event.keyCode == 39 // →
                || event.keyCode == 8 // backspace
                || event.keyCode == 9 // tab
                || event.keyCode == 188 // ,
                || event.keyCode == 190 // .
                || event.keyCode == 110 // numpad .
                || (event.shiftKey && event.keyCode == 35) // shift
                    // +
                    // end
                || (event.shiftKey && event.keyCode == 36) // shift
                    // +
                    // home
                || event.ctrlKey // allow all ctrl combination
                || event.keyCode == 229 // ten-key processing
            ))
            || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude
        )
            event.preventDefault();
    });

    // input blur time
    /* DuyTP 2016/12/19 fix format when input */
    $(document).on('blur', 'input.time', function () {
        var string = '';
        // if ($(this).val().length==1){
        //     string  = padZeroRight($(this).val(), 3);
        //     string  = padZeroLeft(string, 4);
        // }else{
        //     string = padZeroRight($(this).val(), 4);
        // }
        string = padZeroLeft($(this).val(), 4);

        // var reg1 = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]|[2][4]:[0][0]$/;
        // var reg2 = /^(([0-1][0-9])|(2[0-3]))[0-5][0-9]|[2][4][0][0]$/;

        var reg1 = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/;// DuyTP 2017/03/01 only accept 00:00 ~ 23:59
        var reg2 = /^(([0-1][0-9])|(2[0-3]))[0-5][0-9]$/;// DuyTP 2017/03/01 only accept 00:00 ~ 23:59

        // var reg3 = /^[2][4][0][0]$/;
        if (string.match(reg1)) {
            $(this).val(string);
        } else if (string.match(reg2)) {
            // if($(this).val().length <=2){
            //     $(this).val( string.substring(2) + ':' + string.substring(0, 2));
            // }else if($(this).val().length ==3){
            //     $(this).val( string.substring(2) + ':' + string.substring(0, 1));
            // }else{
            //     $(this).val( string.substring(0, 2) + ':' + string.substring(2));
            // }
            $(this).val(string.substring(0, 2) + ':' + string.substring(2));

        } else {
            $(this).val('');
        }
        if (!_validateTime($(this).val())) {
            $(this).val('');
        }
    });

    //remove format on focus
    $(document).on('focus', 'input.time, input.second', function () {
        $(this).val($(this).val().replace(/:/g, ''));
        $(this).select();
    });

    // input blur second DuyTP 2017/02/13
    $(document).on('blur', 'input.second', function () {
        var string = '';
        // if ($(this).val().length==1){
        //     string  = padZeroRight($(this).val(), 3);
        //     string  = padZeroLeft(string, 4);
        // }else{
        //     string = padZeroRight($(this).val(), 4);
        // }
        string = padZeroLeft($(this).val(), 6);

        var reg1 = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
        var reg2 = /^(?:2[0-3]|[01][0-9])[0-5][0-9][0-5][0-9]$/;

        if (string.match(reg1)) {
            $(this).val(string);
        } else if (string.match(reg2)) {
            // if($(this).val().length <=2){
            //     $(this).val( string.substring(2) + ':' + string.substring(0, 2));
            // }else if($(this).val().length ==3){
            //     $(this).val( string.substring(2) + ':' + string.substring(0, 1));
            // }else{
            //     $(this).val( string.substring(0, 2) + ':' + string.substring(2));
            // }
            $(this).val(string.substring(0, 2) + ':' + string.substring(2, 4) + ':' + string.substring(4));

        } else {
            $(this).val('');
        }
        // if (!_validateTime($(this).val())) {
        //     $(this).val('');
        // }
    });

    // input method for tel class
    $(document).on('keydown', 'input.tel, input.postal_code', function (event) {
        // var ctrlDown = event.ctrlKey||event.metaKey; //
        // Mac support
        if ((!((event.keyCode > 47 && event.keyCode < 58) // 0 ~
                    // 9
                || (event.keyCode > 95 && event.keyCode < 106) // numpad
                    // 0 ~
                    // numpad
                    // 9
                || event.keyCode == 116 // F5
                || event.keyCode == 46 // del
                || event.keyCode == 35 // end
                || event.keyCode == 36 // home
                || event.keyCode == 37 // ←
                || event.keyCode == 39 // →
                || event.keyCode == 8 // backspace
                || event.keyCode == 9 // tab
                || event.keyCode == 189 // -
                || event.keyCode == 109 // numpad -
                || event.keyCode == 173 // - (firefox only)
                    ///|| event.keyCode == 107 // numpad +
                    //|| (event.shiftKey && event.keyCode == 187) // shift
                    // +
                    // add
                || (event.shiftKey && event.keyCode == 35) // shift
                    // +
                    // end
                || (event.shiftKey && event.keyCode == 36) // shift
                    // +
                    // home
                || event.ctrlKey // allow all ctrl combination
                || event.keyCode == 229 // ten-key processing
            ))
            || (event.shiftKey && (event.keyCode > 47
            && event.keyCode < 58 || event.keyCode == 189)) // exlcude
        // Shift
        // +
        // [0~9]
        )
            event.preventDefault();
    });

    //input method for date class
    $(document).on('keydown', 'input.datepicker, input.month', function (event) {
        if (
            (   !(  (event.keyCode > 47 && event.keyCode < 58)  // 0 ~ 9
                    || (event.keyCode > 95 && event.keyCode < 106) // numpad 0 ~ numpad 9
                    || event.keyCode == 116    // F5
                    || event.keyCode == 46     // del
                    || event.keyCode == 35     // end
                    || event.keyCode == 36     // home
                    || event.keyCode == 37     //　←
                    || event.keyCode == 39     // →
                    || event.keyCode == 8      // backspace
                    || event.keyCode == 9      // tab
                    || event.keyCode == 191    // forward slash
                    || event.keyCode == 111    // divide
                    || (event.shiftKey && event.keyCode == 35) // shift + end
                    || (event.shiftKey && event.keyCode == 36) // shift + home
                    || event.ctrlKey // allow all ctrl combination
                )
            )
            || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude Shift + [0~9]
        )
            event.preventDefault();
    });

    //remove format on focus
    $(document).on('focus', 'input.datepicker, input.month', function () {
        $(this).val($(this).val().replace(/\//g, ''));
        $(this).select();
    });

    // blur tel
    $(document).on('blur', 'input.tel', function () {
        try {
            var string = $(this).val();
            var reg2 = /^[0-9-]+$/;
            if (!string.match(reg2)) {
                $(this).val('');
            }
        } catch (e) {
            alert(e.message);
        }
    });

    //// blur postal_code
    //$(document).on('blur', 'input.postal_code', function () {
    //    var string = $(this).val();
    //    if (!_validateZipCd($(this).val())) {
    //        $(this).val('');
    //    }
    //});

    //keyup ten-key
    $(document).on('keyup',
        'input.tel, input.number, input.numeric, input.money, input.rate, input.percentage, input.postal_code, input.time, input.datepicker, input.month', function (e) { //2016/03/30 sangtk add postal_code_en
            // if (e.keyCode != 48 && e.keyCode != 49 && e.keyCode != 50 && e.keyCode != 51 && e.keyCode != 52 && e.keyCode != 53 && e.keyCode != 54 && e.keyCode != 55 && e.keyCode != 56 && e.keyCode != 57) {
            // 	var noSbcRegex = /[^\x00-\x7E]+/g;
            // 	var target = $(this);
            // 	try {
            // 	 	if(target.val().match(noSbcRegex))  {
            // 			 target.val( target.val().replace(noSbcRegex, '') );
            // 		}
            // 	} catch (e) {
            // 		alert(e.message);
            // 	}
            // }
        });
    // 2017/05/29: VuongVT: Edit for input full-size
    $(document).on('change',
        'input.tel, input.number, input.numeric, input.rate, input.percentage, input.postal_code, input.time, input.datepicker, input.month', function (e) { //2016/03/30 sangtk add postal_code_en
            var newValue = convertKana($(this).val(), 'h', false);
            $(this).val(newValue);
        });

    $(document).on('change', 'input.money', function (e) { //2016/03/30 sangtk add postal_code_en
        var newValue = convertKana($(this).val(), 'h', true);

        $(this).val(newValue);
    });
    //2017/05/29: End edit

    //esc to clear errors
    $("body").keydown(function (e) {
        if (e.keyCode === 27) {
            //$('.error-tip-mesage').hide();
            _clearErrors();
        }
    });

    if (parent.jQuery && parent.jQuery.colorbox) {
        jQuery(document).bind('keydown', function (e) {
            if (e.keyCode === 27) {
                e.preventDefault();
                parent.jQuery.colorbox.close();
            }
        });
    }
    /*********************************************END REGION**********************************************/

}

/**
 * add comma function
 * @param    nStr
 * @return    str
 */
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';

    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

/**
 * check all checkbox
 *
 * @author      :   duytp - 2016/11/22 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function checkAll(checkID) {
    //check, uncheck All
    $(document).on('click', '#' + checkID, function () {

        var isChecked = $('#' + checkID).is(":checked");

        $('.' + checkID).each(function () {
            if (isChecked) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }

        });

    });

    //check, uncheck one -> all ?
    $(document).on('click', '.' + checkID, function () {

        var isChecked = $(this).is(":checked");

        if (isChecked) {
            var allRowIsChecked = true;
            $('.' + checkID + ':visible').each(function () {
                if (!$(this).is(":checked")) {
                    allRowIsChecked = false;
                }
            });
            if (allRowIsChecked == true) {
                $('#' + checkID).prop('checked', true);
            }
            $(this).prop('checked', true);
        } else {
            $('#' + checkID).prop('checked', false);
        }

    });

}

/**
 * ADD NEW ROW TO TABLE
 *
 * @author      : tannq@ans-asia - 2016/11/28 - created
 * @param       : config.button: attibute event update row [class/html tag/html attributes] | attribute data-target required = id table
 * @param       : config.html : this call from file blade template or read from js
 * @param       : config.buttonRemove: event remove row
 * @return      : null
 * @access      : public
 * @see         : init
 */
function addNewRowToTable(config, callback) {
    // if define var not found return error log
    "use strict";

    // Example of config
    // var config = {
    //     button: '[data-target="#table-area"]', ##### class or id ....
    //     html:html,
    // };

    // Begin event update
    $(config.button).on('click', function (e) {
        e.preventDefault();
        var table = $(this).data('target'); // call id table
        var tbody = table + ' tbody';
        var html = config.html;
        var $this = $(this);
        if (typeof callback === "function") {
            if (callback($this) && typeof callback($this) === 'string') {
                html = callback($this);
            }
        }
        if (html) {
            if (isEmptyHtml($(tbody))) {
                $(tbody).html(html);
                return;
            }
            $(tbody + " tr:last").after(html);
            initControls();
        }
        //console.log(1);
        // disable event default

    });


}


/**
 * Check empty content in html tag
 *
 * @author      :   tannq@ans-asia - 2016/11/28 - created
 * @param       :   el: [$('#id')] ...
 * @access      :   public
 * @see         :   init
 */
function isEmptyHtml(el) {
    return !$.trim(el.html())
}

/**
 * Clear all red items. Call when no error detected.
 */
function _clearErrors() {
    $('.error-item').removeErrorStyle();
    $('.error-item').removeClass('error-item').removeAttr('index');
    $('.error-tip-mesage').remove();
    $('.space-error').empty();
    $('.textbox-error').removeErrorStyle();
    $('.row-error').removeClass('row-error');
}


/**
 * focus first item on form
 */
function _focusFirstItem() {
    $('input:enabled:visible:not([readonly]), select:enabled:not([readonly]), textarea:enabled:not([readonly])').first().focus();
    // $(':input:enabled:not([readonly]):visible:first').focus();
}

/**
 * format datepicker
 */
function _formatDatepicker() {

    $(".datepicker").each(function () {
        try {
            if ($(this).hasClass('hasDatepicker')) {
                if ($('#ui-datepicker-div').length > 0)
                    $('#ui-datepicker-div').remove();
                $(this).next('img').remove();
                $(this).removeClass('hasDatepicker');
                $(this).datepicker("destroy");
            }
        } catch (e) {
            console.log('dapicker destroy ' + e.message);
        }
    });

    // // destroy old date picker
    // $('#ui-datepicker-div').remove();
    // $('.hasDatepicker').next('img').remove();
    // $('.hasDatepicker').removeClass('hasDatepicker');
    // // end destroy

    $(".datepicker:not(:disabled):not([readonly]):visible").datepicker({
        showOn: "button",
        buttonImage: "/images/calendar-icon.ico",
        buttonText: '日付を選択してください',
        buttonImageOnly: true,
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        onSelect: function (d, i) {
            if (d !== i.lastVal) {
                $(this).change();
            }
            $(this).focus();
        }
    });
    $(".datepicker:disabled, .datepicker[readonly]").datepicker({
        showOn: "button",
        buttonImage: "/images/calendar-icon.ico",
        buttonText: '日付を選択してください',
        buttonImageOnly: true,
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        disabled: true,
        onSelect: function () {
            $(this).focus();
        }
    });

}
/**
 * format year month picker
 */
function _formatYearMonthPicker() {
    // destroy month picker
    $(".month").each(function () {
        try {
            $(this).next().remove();
            $(this).next().remove();
        } catch (e) {
            console.log('dapicker destroy ' + e.message);
        }
    });
    // end destroy
    if ($('input.month') && $('input.month').length > 0) {
        $('input.month').each(function () {
            if ($(this).is('[readonly]') || $(this).is('[disabled]')) {
                $.appendYmpicker($(this), "", "", true);
            } else {
                $.appendYmpicker($(this));
            }
        });
    }

}
/**
 * format datepicker on lose focus
 */

function _autoFormattingDate(target) {
    $(target).focusout(function () {
        var string = $(this).val();
        if (string.length == 8) {
            string = string.substring(0, 4) + '/' + string.substring(4, 6) + '/' + string.substring(6);
        }
        var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[13578]|1[02])[\/.]31|((19|[2-9][0-9])[0-9]{2}[\/.](01|0[3-9]|1[0-2])[\/.](29|30))|((19|[2-9][0-9])[0-9]{2}[\/.](0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8]))|((((19|[2-9][0-9])(04|08|[2468][048]|[13579][26]))|2000)[\/.](02)[\/.]29)$/;
        if (string.match(reg)) {
            $(this).val(string);
        } else {
            $(this).val('');
        }
    });
}
/**
 *
 * format year month on lose focus
 */
function _autoFormattingMonth(target) {
    $(target).focusout(function () {
        var string = $(this).val();
        if (string.length == 6) {
            string = string.substring(0, 4) + '/' + string.substring(4, 6);
        }
        var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[1-9]|1[0-2])$/;
        if (string.match(reg)) {
            $(this).val(string);
        } else {
            $(this).val('');
        }
    });

}
/**
 *
 * prepare param to send to colorbox
 */
function _setGetPrams(obj) {
    var param = '';
    $.each(obj, function (key, element) {
        param += '&' + key + '=' + encodeURI(element);
    });
    return param.slice(1);
}

/**
 * Display Error Item
 * @author  Canh - 2015/05/28 - update
 * @param Array error
 * @returns {Boolean}
 */
function _showError(error) {
    var flag = true;
    var messageError = ['71', '72', '73', '292', '437', '438', '456', '457'];
    var msgDuplicatedRow = '';
    var errorFirst = '';
    // console.log(error);
    for (var i in error) {

        if (error[i].Data == 1) {
            jError(_text[error[i].Code]);
        } else if (error[i].Data.indexOf('#') != -1) {
            if ($.inArray(error[i].Code, messageError) != -1) {// case message inclusde data dynamic
                var replace_obj = {};
                var msg = _text[error[i].Code];
                replace_obj = JSON.parse(htmlEntities(error[i].Message));
                for (var key in replace_obj) {
                    msg = msg.replace(key, replace_obj[key]);
                }
                $(error[i].Data).errorStyle(msg);
            } else {
                $(error[i].Data).errorStyle(_text[error[i].Code]);
                flag = false;
            }
        } else if (error[i].Data.indexOf('.') != -1) {
            if (error[i].Code == -1) {
                $(error[i].Data).eq(error[i].Id - 1).errorStyle(error[i].Message);
            } else {
                $(error[i].Data).eq(error[i].Id - 1).errorStyle(_text[error[i].Code]);
            }
            /*$(error[i].Data).eq(error[i].Id - 1).errorStyle(_text[error[i].Code]);*/
            //end update
            flag = false;
        }
    }
    return flag;
}


/**
 * validate zip code
 *
 * @param string
 * @returns {boolean}
 */
function _validateZipCd(postal_code) {
    try {
        postal_code = _formatString(postal_code);
        var reg1 = /^[0-9]{3}-[0-9]{4}$/;
        var reg2 = /^[0-9]{3}[0-9]{4}$/;
        //
        if (postal_code.match(reg1) || postal_code.match(reg2) || postal_code == '') {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        alert('_validateZipCd: ' + e);
    }
}

/**
 * htmlEntities
 *
 * @param string
 * @returns string
 */
function htmlEntities(str) {
    if (str == undefined) {
        str = '';
    }
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

/**
 * KienNT init common auto complete
 * @param selector
 * @param type
 * @param callback
 */
function initAutoCompleteSingle(selector, type, callback) {
    $(selector).each(function () {
        var main_selecttor = $(this);
        var parent = $(this).parents('.single-auto-complete');
        var id = type + '_id';
        var url = '';
        if (type == "employee") {
            url = '/common/getallemployee';
        } else if (type == "group") {
            url = '/common/getallgroup';
        } else if (type == "school_building") {
            url = '/common/getallschoolbuilding';
        } else if (type == "school") {
            url = '/common/getallschool';
        } else if (type == "student") {
            url = '/common/getallstudent';
        } else if (type == "employee_group") {
            url = '/common/getallemployeegroup';
        } else if (type == "lecturer") {
            url = '/common/getalllecturer';
        } else if (type == "service") {
            url = '/common/getallservice';
            main_selecttor.blur(function () {
                if (!checkInt($(this).val())) {
                    $(this).val('')
                }
            });
        } else if (type == "service2") {
            url = '/common/getallservice2';
            main_selecttor.blur(function () {
                if (!checkInt($(this).val())) {
                    $(this).val('')
                }
            });
        } else if (type == "service3") {
            url = '/common/getallservice3';
            main_selecttor.blur(function () {
                if (!checkInt($(this).val())) {
                    $(this).val('')
                }
            });
        } else if (type == "staff") {
            url = '/common/getallstaff';
        }

        //if (!main_selecttor.hasClass('refer-search')) {
        //    main_selecttor.change(function () {
        //        $.post('/common/refername', {key: id, value: $(this).val()}, function (res) {
        //            console.log(res);
        //            for (var key in res) {
        //                if (key == id && res[key] == '') {
        //                    $(main_selecttor).val('');
        //                    parent.find('.display_info').val('');
        //                    parent.find('.display_info').text('');
        //                } else {
        //                    if (typeof parent.find('.' + key) != 'undefined') {
        //                        parent.find('.' + key).text(htmlEntities(res[key]));
        //                        parent.find('.' + key).val(htmlEntities(res[key]));
        //                    }
        //                }
        //            }
        //            if (typeof callback != 'undefined') {
        //                callback();
        //            }
        //        });
        //    });
        //}

        $(main_selecttor).autocomplete({
            source: url,
            minLength: 0,
            autoFocus: false,
            delay: 100,
            select: function (event, ui) {
                event.preventDefault();
                $(main_selecttor).val(ui.item[id]);
                for (var res_key in ui.item) {
                    if (typeof parent.find('.' + res_key)) {
                        parent.find('.' + res_key).val(ui.item[res_key]);
                        parent.find('.' + res_key).text(ui.item[res_key]);
                    }
                }
                //only trigger when control on table
                if (typeof $(main_selecttor).parents('.popup').data('istable') != 'undefined' && $(main_selecttor).parents('.popup').data('istable') == 1) {
                    $(main_selecttor).trigger('change');
                }

                $(main_selecttor).focus();
                if (typeof callback != 'undefined') {
                    callback();
                }
            }
        }).on('compositionstart', function (e) {
            $(main_selecttor).autocomplete('disable');
        }).on('compositionend', function (e) {
            $(main_selecttor).autocomplete('enable').autocomplete('search');
        });

    });
}

function checkInt(str) {
    return !isNaN(str);
}
/**
 * KienNT
 * init auto complete set common
 */
function initAutoCompleteCoporationSet() {
    $('.coporation-set').each(function () {
        var coporation = $(this).find('.coporation_id');
        var company = $(this).find('.company_id');
        var division = $(this).find('.division_id');


    });
}

/**
 * KienNT
 * init auto complete set common
 */
function initAutoCompleteBlockSet() {
    $('.block-set').each(function () {

    });
}

/**
 * @param _id : id of selector
 * @param _url : to post
 * @param _callback : function after get post result, existed : function call when data existed.....
 */
function initSwitchData(_id, _url, obj, _callback) {
    $(document).on('change', '#' + _id, function () {
        var val = $(this).val();
        var _data = {value: val};
        $.ajax({
            type: 'post',
            url: _url,
            dataType: 'json',
            loading: true,
            data: _data,
            success: function (res) {
                //if exists data -> edit
                if (res['data'][0][0][_id] != '') {
                    var data = res['data'][0][0];
                    fillData(data, obj);
                    $("#mode").val('U');
                    $('#btn-delete').show();
                    if (typeof _callback['existed'] != 'undefined')
                        _callback['existed'](res);
                } else { //else add new
                    $("#mode").val('A');
                    $('#btn-delete').hide();
                    clearData(obj, _callback['except_id']);
                    if (typeof _callback['not_existed'] != 'undefined')
                        _callback['not_existed'](res);
                }
                if (typeof _callback['all'] != 'undefined')
                    _callback['all'](res);

                $('#' + _id).focus();
            },
            // Ajax error
            error: function (res) {
            }

        });
    });
}

/**
 * function fillData
 *
 * @author    : DuyTP - 2017/02/02 - create
 * @params    : data - object
 * @return    : null
 */
function fillData(data, _obj) {
    _clearErrors();
    $.each(_obj, function (key, element) {
      
        switch (element.type) {
            case 'text':
                $('#' + key).val((typeof (data[key]) == 'undefined') ? '' : data[key]);
                break;
            case 'textarea':
                $('#' + key).val((typeof (data[key]) == 'undefined') ? '' : data[key]);
                break;
            case 'time':
                $('#' + key).val((typeof (data[key]) == 'undefined') ? '' : data[key]);
                break;
            case 'refer':
                $('#' + key).val((typeof (data[key]) == 'undefined') ? '' : data[key]);
                break;
            case 'select':
                $('#' + key).find('option[value="' + data[key] + '"]').prop('selected', true);
                break;
            case 'multiselect':

                break;
            case 'radiobox':
                var name = element['attr']['name'];
                $("input[name='" + name + "'][value='" + data[key] + "']").prop('checked', true);
                break;
            case 'checkbox':
                $('#' + key).prop('checked', data[key] == '1');
                break;
            case 'display':
                $('#' + key).text(data[key]);
                $('#' + key).val(data[key]);
                break;
            default:
                break;
        }
        ;
    });
}

/**
 * function clearData
 *
 * @author    : HungNV - 2017/01/23 - create
 * @params    : data - object
 * @return    : null
 */
 function clearData(_obj, except_key) {
    _clearErrors();
    if (Array.isArray(except_key)) {
        $.each(_obj, function (key, element) {
            if (except_key.indexOf(key) < 0) {
                switch (element.type) {
                    case 'text':
                    $('#' + key).val('');
                    break;
                    case 'textarea':
                    $('#' + key).val('');
                    break;
                    case 'time':
                    $('#' + key).val('');
                    break;
                    case 'refer':
                    $('#' + key).val('');
                    break;
                    case 'select':
                    $('#' + key).val('-1');
                    break;
                    case 'multiselect':

                    break;
                    case 'radiobox':
                    break;
                    case 'checkbox':
                    $('#' + key).prop('checked', false);
                    break;
                    case 'display':
                    {
                        $('#' + key).text('');
                        $('#' + key).val('');
                    }
                    break;
                    case 'list':
                    switch(element.attr.typelist){
                        case 'checkbox':
                        $('.'+key).each(function(index,value){
                            $(this).prop('checked',false);
                        });
                        break;
                        default:
                        break;

                    }
                    default:
                    break;
                }
                ;
            }
        });
    } else {
        $.each(_obj, function (key, element) {
            if (typeof except_key == 'undefined') {
                except_key = 'khong xac dinh';
            }
            if (key != except_key) {
                switch (element.type) {
                    case 'text':
                    $('#' + key).val('');
                    break;
                    case 'textarea':
                    $('#' + key).val('');
                    break;
                    case 'time':
                    $('#' + key).val('');
                    break;
                    case 'refer':
                    $('#' + key).val('');
                    break;
                    case 'select':
                    $('#' + key).val('0');
                    break;
                    case 'multiselect':

                    break;
                    case 'radiobox':
                    break;
                    case 'checkbox':
                    $('#' + key).prop('checked', false);
                    break;
                    case 'display':
                    {
                        $('#' + key).text('');
                        $('#' + key).val('');
                    }
                    break;
                    case 'list':
                    switch(element.attr.typelist){
                        case 'checkbox':
                        $('.'+key).each(function(index,value){
                            $(this).prop('checked',false);
                        });
                        break;
                        default:
                        break;
                    }
                    default:
                    break;
                }
                ;
            }
        });
    }
 }

/**
 * function clearData
 *
 * @author    : KienNT - 2017/07/25 - create
 * @params    : data - object
 * @return    : null
 */
function clearDataSearch(_obj, is_default, div_result, _callback, _colspan) {
    if (typeof _colspan == 'undefined') {
        _colspan = 0;
    }
    if (typeof is_default == 'undefined') {
        is_default = false;
    }
    if (typeof div_result == 'undefined') {
        div_result = '#result';
    }
    $.each(_obj, function (key, element) {
        switch (element.type) {
            case 'text':
                $('#' + key).val('');
                break;
            case 'textarea':
                $('#' + key).val('');
                break;
            case 'time':
                $('#' + key).val('');
                break;
            case 'refer':
                $('#' + key).val('');
                break;
            case 'select':
                $('#' + key).val('-1');
                break;
            case 'multiselect':

                break;
            case 'radiobox':
                break;
            case 'checkbox':
                $('#' + key).prop('checked', false);
                break;
            case 'display':
            {
                $('#' + key).text('');
                $('#' + key).val('');
            }
                break;
            default:
                break;
        }
        ;
    });
    if (is_default) {
        if (_colspan != 0) {
            var colspan = _colspan;
        } else {
            var colspan = $(div_result).find('table thead tr:first th').length;
        }
        var html = '<tr><td class="text-center" colspan="' + colspan + '">' + _text[17] + '</td></tr>';
        $(div_result).find('table tbody').html(html);
        $(div_result).find('.w-pading-search-top').remove();
        $(div_result).find('.w-pading-search-bottom').remove();
    }

    if (typeof _callback != 'undefined') {
        _callback();
    }

    _focusFirstItem();
}

/**
 * function enterKeySearch
 *
 * @author    : DuyTP - 2017/04/20 - create
 * @params    : data - object
 * @return    : null
 */
function _enterKeySearch() {
    //init enter search
    $(document).on('keydown', '.content', function (e) {
        var focus_item = $('body').find('input:focus');
        if (e.keyCode == 13
            && focus_item.attr('id') != 'paggging-number'
            && !focus_item.hasClass('report_point')
            && !focus_item.hasClass('score')
            && !focus_item.hasClass('average_score')
            && !focus_item.hasClass('perfect_score')) {
            $('#btn-search').trigger('click');
        }
    });
}

/**
 * function dynamically set tabindex
 * @author: DuyTP - 2016/12/16 - create
 * @author: DuyTP - 2017/02/09 - update
 *
 */
function _setTabIndex() {
    $(":input").each(function (i) {
        $(this).attr('tabindex', i + 1);
    });
    $('input[disabled], input[readonly], textarea[disabled], textarea[readonly], select[disabled]').attr('tabindex', '-1');
}

$(".mail").keyup(function () {
    var VAL = this.value;
    // Regex for matching ALL Japanese common & uncommon Kanji
    var email = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$');

    if (email.test(VAL)) {
        alert('Great, you entered an E-Mail-address');
    }
});

/**
 * function check regex for character
 * @author: VuongVT - 2016/12/16 - create
 *
 */
function isMatchCharacter(target) {
    // Regex for matching ALL Japanese common & uncommon Kanji
    var allJapaneseCommon = /^[一-龯]/;
    // Regex for matching Hirgana or Katakana or basic punctuation (、。’)
    var allHiraganaOrKatakana = /^[ぁ-んァ-ン]/;
    // var symbolsAndPunctuation = /^[\x3000-\x303F]/;
    // Regex for matching Hirgana or Katakana and random other characters
    var allHiraganaOrKatakanaAndOther = /^[ぁ-んァ-ン！：／]/;
    // Regex for matching full-width Letters (zenkaku 全角)
    var fullwidthLetter = /^[Ａ-ｚ]/;
    // Regex for matching hafl-width Letters (zenkaku 全角)
    var halfwidthLetter = /^[A-z]/;
    // Regex for matching half-width (hankaku) Katakana codespace characters (this is an old character set so the order is inconsistent with the hiragana)
    var halfwidthkatakanaOldcharacter = /^[ｦ-ﾟ]/;
    // Regex for matching full-width (zenkaku) Katakana codespace characters (includes non phonetic characters)
    var halfwidthkatakana = /^[ァ-ヶ]/;
    // Regex for matching Hiragana codespace characters (includes non phonetic characters)
    var hiraganaCodeSpace = /^[ぁ-ゞ]/;
    if (target.match(allJapaneseCommon) || target.match(allHiraganaOrKatakana)
        || target.match(allHiraganaOrKatakanaAndOther) || target.match(fullwidthLetter)
        || target.match(halfwidthkatakanaOldcharacter) || target.match(halfwidthkatakana)
        || target.match(hiraganaCodeSpace)
        || target.match(halfwidthLetter)) {
        return true;
    } else {
        return false;

    }
}

/**
 * function convert from hiragana number
 * @author: VuongVT - 2016/12/16 - create
 *
 */
function convertKana(target, type, isMoney) {
    try {
        var newTarget = "";
        for (var i = 0, len = target.length; i < len; i++) {
            if (isMatchCharacter(target[i])) {
                newTarget = "";
                break;
            } else {
                newTarget = newTarget + target[i];
            }
        }
        var _deleteStack = '';
        var katakana = new Array('0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', ',', '');
        var hiragana = new Array('０', '１', '２', '３', '４', '５', '６', '７',
            '８', '９', '、', '　');
        //
        if (type === 'h') {
            newTarget = _formatConvert(newTarget, hiragana, katakana);
            _deleteStack += katakana.join('');
        } else if (type === 'f') {
            newTarget = _formatConvert(newTarget, katakana, hiragana);
            _deleteStack += hiragana.join('');
        }

        if (isMoney == false && (newTarget.indexOf("．") >= 0 || newTarget.indexOf(".") >= 0 || newTarget.indexOf("・") >= 0)) {
            return "";
        }

        if (isMoney == false) {
            newTarget = newTarget.replace("，", "");
            newTarget = newTarget.replace("．", "");
        } else {
            newTarget = newTarget.replace("．", ".");
        }
        newTarget = newTarget.replace(",", "");
        newTarget = newTarget.replace("。", "");

        return newTarget;
    } catch (e) {
        alert("C");
        return ('');
    }
}

function _formatConvert(target, original, format, escape) {
    try {
        var object = null;
        var i = 0;
        var len = original.length;
        //
        if (escape === true) {
            for (i = 0; i < len; i++) {
                object = new RegExp(_formatConvertEscapeCheck(original[i]),
                    'gm');
                target = target.replace(object, format[i]);
            }
        } else {
            for (i = 0; i < len; i++) {
                object = new RegExp(original[i], 'gm');
                target = target.replace(object, format[i]);
            }
        }
        delete (object);
        return (target);
    } catch (e) {
        return ('');
    }
}

function _formatConvertEscapeCheck(character) {
    try {
        var escape = '\\/^$*+-?{|}[].()';
        var i = 0;
        var len = escape.length;
        for (i = 0; i < len; i++) {
            if (character.indexOf(escape[i], 0) !== -1) {
                return ('\\' + character);
            }
        }
        return (character);
    } catch (e) {
        return ('');
    }
}
/**
 * @author: Chinhnb
 * @param fix height of row
 */
function convertTableRowSize() {
    $('.table').each(function () {
        if ($(this).find('tbody tr input').length) {
            $(this).find('tbody tr input').parents('tbody').find('tr').addClass('h-30');
        }
        else {
            if ($(this).find('tbody tr td button').length) {
                $(this).find('tbody tr td button').css({'line-height': '1.5', 'padding': '0px 6px'})
            }
            $(this).find('tbody tr').addClass('h-26');
        }
    });
}


/**

 * @author: BaoNC
 * @param {Object} selector
 * @param {Object} count
 */
function hoverGroup(selector, count, colorhover) {

    if (typeof count == 'undefined') {
        count = 1;
    }
    if (typeof colorhover == 'undefined') {
        colorhover = '#f8f8f8';
    }


    var selectorTr = selector + ' tbody tr';
    var eq, eq0, el, color;
    try {
        $(selectorTr).die('mouseover');
        $(selectorTr).die('mouseleave');
        $(document).on({
            mouseover: function () {
                if ($(this).find('td.no-hover').length > 0) {
                    return;
                }
                eq = $(this).index();
                color = $(this).css("background-color");
                eq0 = eq - eq % count;
                var x = count;
                while (x--) {
                    var index = eq0 + x;
                    el = selector + ' tbody tr:eq(' + index + ')';
                    $(el).css("background-color", colorhover);
                    eltd = selector + ' tbody tr:eq(' + index + ') td';
                    $(eltd).css("background-color", colorhover);
                }
            },
            mouseleave: function () {
                if ($(this).find('td.no-hover').length > 0) {
                    return;
                }
                var x = count;
                while (x--) {
                    var index = eq0 + x;
                    el = selector + ' tbody tr:eq(' + index + ')';
                    eltd = selector + ' tbody tr:eq(' + index + ') td';
                    var style = $(el).attr('style').split(";");
                    for (var i = style.length - 1; i--;) {
                        if (style[i].indexOf("background-color") != -1) style.splice(i, 1);
                    }
                    style = style.join(";");
                    $(el).attr('style', style);
                    $(eltd).attr('style', style);
                }
            }
        }, selectorTr);
    } catch (e) {
        console.log(e);
    }
}

function log(msg) {
    console.log(msg);
}

/*Chinhnb- set focus sidebar*/

function sidebar_holding() {
    $('.sidebar-fixed .sidebar-category-visible li li a').each(function () {
        if (window.location.href == (this.href)) {
            $(this).closest("li").addClass("active");
            $(this).closest("ul").css("display", "block");
            $(this).closest("li").parent().parent().addClass("active");
        }
    })
}

/**
 * @author: Chinhnb
 * @param hover
 */
function hoverTbody() {
    $('.sticky-table table').each(function () {
        if (typeof $(this).find('tbody tr td[rowspan]').val() != 'undefined') {
            $(this).addClass('hover-tbody');
        }
    });

    $(".hover-tbody tbody").hover(
        function () {
            $(this).find('td').css('background-color', '#f8f8f8');
        }, function () {
            $(this).find('td').css('background-color', '');
        });
}
/**
 * @author: Chinhnb
 * @param back to top button effect
 */
function scrollTop() {
    $('.scroll-top').on('click', function () {
        var body = $("html, body");
        body.stop().animate({scrollTop: 0}, 500, 'swing', function () {
        });
    })
}
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
});

function blockSpecialChar(e){
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}