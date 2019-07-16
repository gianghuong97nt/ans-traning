@php
$is_return_text = isset($is_return_text) ? $is_return_text : 0;
$col    = isset($col) ? $col : 'col-md-4 col-sm-4 col-xs-12';
@endphp
{{-- search lecturer --}}
<div class="{{$col}} popup" data-id="city_id" data-nm="city_nm" data-search="{{ $data or ''}}"
     data-istable="{{ $istable or 0}}" data-multi="{{ $multi or 0 }}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}">
    <!-- chinhnb change style of group and width of input-->
    <div class="input-group" style="width: 100%">
        <!-- <div style="display: table-cell;width: 100px;"> -->
        <div style="display:inline-block; vertical-align: middle; " class="allow-content w-private">
            <input {{isset($is_disabled) && $is_disabled ?'readonly':''}}
                   type="tel"
                   class="form-control numeric text-right w-item1 {{isset($class)?$class:''}} {{isset($is_required) && $is_required ?'required':''}}"
                   name="w-item1"
                   style="width: 100px;float: left;border-radius: 3px"
                   value="{{ $key_01 or '' }}"
                   id="{{ $id_01 or '' }}"
                   maxlength="{{ $maxlength_01 or '8' }}"
            >
			<span class="input-group-text" style="width: 16px;float: left;padding-top: 3px">
				-
			</span>
            <input {{isset($is_disabled) && $is_disabled ?'readonly':''}}
                   type="tel"
                   class="form-control numeric text-right w-item2 left-radius {{isset($class)?$class:''}} {{isset($is_required) && $is_required ?'required':''}}"
                   name="w-item2"
                   style="width: 68px;float: left;"
                   value="{{$key_02 or '' }}"
                   id="{{$id_02 or '' }}"
                   maxlength="{{ $maxlength_02 or '4' }}"
            >
			<span class="input-group-btn">
				<button {{isset($is_disabled) && $is_disabled ?'disabled':''}}
                        type="button"
                        class="btn btn-primary btn-icon {{ isset($btn_class) ? $btn_class : 'btn-search' }} {{isset($is_required) && $is_required ?'required':''}}">
                    <i class="icon-search4"></i></button>
			</span>
        </div>
        <div style="display:inline-block; vertical-align: middle;" class="allow-content">
            @if($is_return_text==0)
                <div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;' }};vertical-align: middle;"
                     class="allow-content">
            <span class="input-group-text text-overfollow m-w-popup-label"
                  id="{{$display_id or ''}}" title="{{ $value or '' }}"
                  style="float: left;{{ isset($istable) ? 'display: none;' : 'padding-left: 3px' }}">{{ $value or '' }}
            </span>
                </div>
            @else
                <div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;' }};vertical-align: middle;width: inherit;"
                     class="allow-content {{isset($class)?$class:''}}">
                    <input {{isset($is_disabled) && $is_disabled ?'readonly':''}} type="text"
                           class="form-control left-radius right-radius m-w-popup-text {{isset($class)?$class:''}} {{isset($is_required_text) && $is_required_text ?'required':''}}"
                           value="{{ $value or '' }}"
                           id="{{ $display_id or '' }}">
                </div>
            @endif
        </div>
    </div>
</div>
