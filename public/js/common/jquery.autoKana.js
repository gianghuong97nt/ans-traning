// Copyright (c) 2013 Keith Perhac @ DelfiNet (http://delfi-net.com)
//
// Based on the AutoRuby library created by:
// Copyright (c) 2005-2008 spinelz.org (http://script.spinelz.org/)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function ($) {
    $.fn.autoKana = function (element1, element2, passedOptions) {

        if ($(element1).val() == '') {
            $(element2).val('');
        }

        var options = $.extend(
            {
                'katakana': false
            }, passedOptions);

        var kana_extraction_pattern = new RegExp('[^ 　A-zぁあ-んー①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬1-9１２３４５６７８９ ｑｗｒｔｙｐｓｄｆｇｈｊｋｌｚｘｃｖｂｍＱＷＲＴＹＰＳＤＦＧＨＪＫＬＺＸＣＶＢＭ]', 'g'); // ｂｋ
        var kana_compacting_pattern = new RegExp('[ぁぃぅぇぉっゃゅょ]', 'g');
        var fullSize = ['ｑ', 'ｗ', 'ｒ', 'ｔ', 'ｙ', 'ｐ', 'ｓ', 'ｄ', 'ｆ', 'ｇ', 'ｈ', 'ｊ', 'ｋ', 'ｌ', 'ｚ', 'ｘ', 'ｃ', 'ｖ', 'ｂ', 'ｍ', 'Ｑ', 'Ｗ', 'Ｒ', 'Ｔ', 'Ｙ', 'Ｐ', 'Ｓ', 'Ｄ', 'Ｆ', 'Ｇ', 'Ｈ', 'Ｊ', 'Ｋ', 'Ｌ', 'Ｚ', 'Ｘ', 'Ｃ', 'Ｖ', 'Ｂ', 'Ｍ'];
        var haftSize = ['q', 'w', 'r', 't', 'y', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'ｍ', 'Q', 'W', 'R', 'T', 'Y', 'P', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'M'];

        var fullSize_kana = ['　'
            , '！'
            , '”'
            , '＃'
            , '＄'
            , '％'
            , '＆'
            , '’'
            , '（'
            , '）'
            , '＊'
            , '＋'
            , '，'
            , '−'
            , '．'
            , '／'
            , '０'
            , '１'
            , '２'
            , '３'
            , '４'
            , '５'
            , '６'
            , '７'
            , '８'
            , '９'
            , '：'
            , '；'
            , '＜'
            , '＞'
            , '？'
            , '＠'
            , 'Ａ'
            , 'Ｂ'
            , 'Ｃ'
            , 'Ｄ'
            , 'Ｅ'
            , 'Ｆ'
            , 'Ｇ'
            , 'Ｈ'
            , 'Ｉ'
            , 'Ｊ'
            , 'Ｋ'
            , 'Ｌ'
            , 'Ｍ'
            , 'Ｎ'
            , 'Ｏ'
            , 'Ｐ'
            , 'Ｑ'
            , 'Ｒ'
            , 'Ｓ'
            , 'Ｔ'
            , 'Ｕ'
            , 'Ｖ'
            , 'Ｗ'
            , 'Ｘ'
            , 'Ｙ'
            , 'Ｚ'
            , '｀'
            , 'ａ'
            , 'ｂ'
            , 'ｃ'
            , 'ｄ'
            , 'ｅ'
            , 'ｆ'
            , 'ｇ'
            , 'ｈ'
            , 'ｉ'
            , 'ｊ'
            , 'ｋ'
            , 'ｌ'
            , 'ｍ'
            , 'ｎ'
            , 'ｏ'
            , 'ｐ'
            , 'ｑ'
            , 'ｒ'
            , 'ｓ'
            , 'ｔ'
            , 'ｕ'
            , 'ｖ'
            , 'ｗ'
            , 'ｘ'
            , 'ｙ'
            , 'ｚ'
            , '｛'
            , '｜'
            , '｝'
            , '￣'
            , 'ガ'
            , 'ギ'
            , 'グ'
            , 'ゲ'
            , 'ゴ'
            , 'ザ'
            , 'ジ'
            , 'ズ'
            , 'ゼ'
            , 'ゾ'
            , 'ダ'
            , 'ヂ'
            , 'ヅ'
            , 'デ'
            , 'ド'
            , 'バ'
            , 'ビ'
            , 'ブ'
            , 'ベ'
            , 'ボ'
            , 'パ'
            , 'ピ'
            , 'プ'
            , 'ペ'
            , 'ポ'
            , 'ヴ'
            , '。'
            , '「'
            , '」'
            , '、'
            , 'ヲ'
            , 'ァ'
            , 'ィ'
            , 'ゥ'
            , 'ェ'
            , 'ォ'
            , 'ャ'
            , 'ュ'
            , 'ョ'
            , 'ッ'
            , 'ー'
            , 'ア'
            , 'イ'
            , 'ウ'
            , 'エ'
            , 'オ'
            , 'カ'
            , 'キ'
            , 'ク'
            , 'ケ'
            , 'コ'
            , 'サ'
            , 'シ'
            , 'ス'
            , 'セ'
            , 'ソ'
            , 'タ'
            , 'チ'
            , 'ツ'
            , 'テ'
            , 'ト'
            , 'ナ'
            , 'ニ'
            , 'ヌ'
            , 'ネ'
            , 'ノ'
            , 'ハ'
            , 'ヒ'
            , 'フ'
            , 'ヘ'
            , 'ホ'
            , 'マ'
            , 'ミ'
            , 'ム'
            , 'メ'
            , 'モ'
            , 'ヤ'
            , 'ユ'
            , 'ヨ'
            , 'ラ'
            , 'リ'
            , 'ル'
            , 'レ'
            , 'ロ'
            , 'ワ'
            , 'ン'
            , '゜'
            , '゛'];

        var halfSize_kana = [' '
            , '!'
            , '"'
            , '#'
            , '$'
            , '%'
            , '&'
            , ''
            , '('
            , ')'
            , '*'
            , '+'
            , ','
            , '-'
            , '.'
            , '/'
            , '0'
            , '1'
            , '2'
            , '3'
            , '4'
            , '5'
            , '6'
            , '7'
            , '8'
            , '9'
            , ':'
            , ';'
            , '<'
            , '>'
            , '?'
            , '@'
            , 'A'
            , 'B'
            , 'C'
            , 'D'
            , 'E'
            , 'F'
            , 'G'
            , 'H'
            , 'I'
            , 'J'
            , 'K'
            , 'L'
            , 'M'
            , 'N'
            , 'O'
            , 'P'
            , 'Q'
            , 'R'
            , 'S'
            , 'T'
            , 'U'
            , 'V'
            , 'W'
            , 'X'
            , 'Y'
            , 'Z'
            , '`'
            , 'a'
            , 'b'
            , 'c'
            , 'd'
            , 'e'
            , 'f'
            , 'g'
            , 'h'
            , 'i'
            , 'j'
            , 'k'
            , 'l'
            , 'm'
            , 'n'
            , 'o'
            , 'p'
            , 'q'
            , 'r'
            , 's'
            , 't'
            , 'u'
            , 'v'
            , 'w'
            , 'x'
            , 'y'
            , 'z'
            , '{'
            , '|'
            , '}'
            , '~'
            , 'ｶﾞ'
            , 'ｷﾞ'
            , 'ｸﾞ'
            , 'ｹﾞ'
            , 'ｺﾞ'
            , 'ｻﾞ'
            , 'ｼﾞ'
            , 'ｽﾞ'
            , 'ｾﾞ'
            , 'ｿﾞ'
            , 'ﾀﾞ'
            , 'ﾁﾞ'
            , 'ﾂﾞ'
            , 'ﾃﾞ'
            , 'ﾄﾞ'
            , 'ﾊﾞ'
            , 'ﾋﾞ'
            , 'ﾌﾞ'
            , 'ﾍﾞ'
            , 'ﾎﾞ'
            , 'ﾊﾟ'
            , 'ﾋﾟ'
            , 'ﾌﾟ'
            , 'ﾍﾟ'
            , 'ﾎﾟ'
            , 'ｳﾞ'
            , '｡'
            , '｢'
            , '｣'
            , '､'
            , 'ｦ'
            , 'ｧ'
            , 'ｨ'
            , 'ｩ'
            , 'ｪ'
            , 'ｫ'
            , 'ｬ'
            , 'ｭ'
            , 'ｮ'
            , 'ｯ'
            , 'ｰ'
            , 'ｱ'
            , 'ｲ'
            , 'ｳ'
            , 'ｴ'
            , 'ｵ'
            , 'ｶ'
            , 'ｷ'
            , 'ｸ'
            , 'ｹ'
            , 'ｺ'
            , 'ｻ'
            , 'ｼ'
            , 'ｽ'
            , 'ｾ'
            , 'ｿ'
            , 'ﾀ'
            , 'ﾁ'
            , 'ﾂ'
            , 'ﾃ'
            , 'ﾄ'
            , 'ﾅ'
            , 'ﾆ'
            , 'ﾇ'
            , 'ﾈ'
            , 'ﾉ'
            , 'ﾊ'
            , 'ﾋ'
            , 'ﾌ'
            , 'ﾍ'
            , 'ﾎ'
            , 'ﾏ'
            , 'ﾐ'
            , 'ﾑ'
            , 'ﾒ'
            , 'ﾓ'
            , 'ﾔ'
            , 'ﾕ'
            , 'ﾖ'
            , 'ﾗ'
            , 'ﾘ'
            , 'ﾙ'
            , 'ﾚ'
            , 'ﾛ'
            , 'ﾜ'
            , 'ﾝ'
            , 'ﾟ'
            , 'ﾞ'];

        var elName,
            elKana,
            active = false,
            timer = null,
            flagConvert = true,
            input,
            values,
            ignoreString,
            baseKana;

        elName = $(element1);
        elKana = $(element2);
        active = true;
        _stateClear();

        elName.blur(_eventBlur);
        elName.focus(_eventFocus);
        elName.keydown(_eventKeyDown);

        function start() {
            active = true;
        };

        function stop() {
            active = false;
        };

        function toggle(event) {
            var ev = event || window.event;
            if (event) {
                var el = Event.element(event);
                if (el.checked) {
                    active = true;
                } else {
                    active = false;
                }
            } else {
                active = !active;
            }
        };

        function _checkConvert(new_values) {
            if (!flagConvert) {
                if (Math.abs(values.length - new_values.length) > 1) {
                    var tmp_values = new_values.join('').replace(kana_compacting_pattern, '').split('');
                    if (Math.abs(values.length - tmp_values.length) > 1) {
                        _stateConvert();
                    }
                } else {
                    if (values.length == input.length && values.join('') != input) {
                        if (input.match(kana_extraction_pattern)) {
                            _stateConvert();
                        }
                    }
                }
            }
        };

        function _checkValue() {
            var new_input, new_values;
            new_input = elName.val()
            if (new_input == '') {
                _stateClear();
                _setKana();
            } else {
                new_input = _removeString(new_input);
                if (input == new_input) {
                    return;
                } else {
                    input = new_input;
                    if (!flagConvert) {
                        new_values = new_input.replace(kana_extraction_pattern, '').split('');
                        _checkConvert(new_values);
                        _setKana(new_values);
                    }
                }
            }
        };

        function _clearInterval() {
            clearInterval(timer);
        };

        function _eventBlur(event) {
            _clearInterval();
        };
        function _eventFocus(event) {
            _stateInput();
            _setInterval();
        };
        function _eventKeyDown(event) {
            if (flagConvert) {
                _stateInput();
            }
        };
        function _isHiragana(chara) {
            return ((chara >= 12353 && chara <= 12435) || chara == 12445 || chara == 12446);
        };
        function _removeString(new_input) {
            if (new_input.indexOf(ignoreString) !== -1) {
                return new_input.replace(ignoreString, '');
            } else {
                var i, ignoreArray, inputArray;
                ignoreArray = ignoreString.split('');
                inputArray = new_input.split('');
                for (i = 0; i < ignoreArray.length; i++) {
                    if (ignoreArray[i] == inputArray[i]) {
                        inputArray[i] = '';
                    }
                }
                return inputArray.join('');
            }
        };
        function _setInterval() {
            var self = this;
            timer = setInterval(_checkValue, 30);
        };
        function _setKana(new_values) {
            if (!flagConvert) {
                if (new_values) {
                    values = new_values;
                }
                if (active) {
                    var _val = _toKatakana(baseKana + values.join(''));
                    var reval = replaceCumulative(_val, fullSize, haftSize);
                    reval = replaceCumulative(reval, fullSize_kana, halfSize_kana);
                    elKana.val(reval);
                }
            }
        };
        function replaceCumulative(str, find, replace) {
            for (var i = 0; i < find.length; i++)
                str = str.replace(new RegExp(find[i], "g"), replace[i]);
            return str;
        };

        function _stateClear() {
            baseKana = '';
            flagConvert = false;
            ignoreString = '';
            input = '';
            values = [];
        };
        function _stateInput() {
            baseKana = elKana.val();
            flagConvert = false;
            ignoreString = elName.val();
        };
        function _stateConvert() {
            baseKana = baseKana + values.join('');
            flagConvert = true;
            values = [];
        };
        function _toKatakana(src) {
            if (options.katakana) {
                var c, i, str;
                str = new String;
                for (i = 0; i < src.length; i++) {
                    c = src.charCodeAt(i);
                    if (_isHiragana(c)) {
                        str += String.fromCharCode(c + 96);
                    } else {
                        str += src.charAt(i);
                    }
                }
                return str;
            } else {
                return src;
            }
        }
    };
})(jQuery);
