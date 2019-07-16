{{-- search lecturer --}}
<div class=" {{ $col_md or 'col-md-3' }} {{ $col_sm or 'col-sm-3' }} {{ $col_xs or 'col-xs-12' }} popup" data-id="city_id" data-nm="city_nm" data-search="{{ $data or ''}}"
     data-refer_item="{{$refer_item or ''}}"
     data-istable="{{ $istable or 0}}" data-multi="{{ $multi or 0 }}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}">
    <!-- chinhnb change style of group and width of input-->
    <div class="input-group" style="width: 100%">
        <!-- <div style="display: table-cell;width: 100px;"> -->
        <div style="display:inline-block; width: 100px; vertical-align: middle;" class="allow-content">
            <input {{isset($is_disabled) && $is_disabled ?'readonly':''}}
                   type="tel"
                   class="form-control numeric text-right left-radius right-radius refer-search {{isset($class)?$class:''}} {{isset($is_required) && $is_required ?'required':''}}"
                   style="width: 50px;"
                   value="{{ $key or '' }}"
                   id="{{ $id or '' }}"
                   maxlength="{{ $maxlength or '' }}">
			<span class="input-group-btn">
				<button {{isset($is_disabled) && $is_disabled ?'disabled':''}}
                        type="button"
                        class="btn btn-primary btn-icon {{ isset($btn_class) ? $btn_class : 'btn-search' }} {{isset($is_required) && $is_required ?'required':''}}">
                    <i class="icon-search4"></i></button>
			</span>
        </div>
        <div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;' }};vertical-align: middle;"
             class="allow-content">
            @if(!isset($is_return_text) || $is_return_text==0)
                <span class="input-group-text text-overfollow m-w-popup-label city_nm"
                      id="{{$display_id or ''}}"
                      title="{{ $value or '' }}"
                      style="padding-left: 0px;{{ isset($istable) ? 'display: none;' : 'padding-left: 3px' }}">{{ $value or '' }}
                </span>
            @else
                <input maxlength="50" {{isset($is_disabled) && $is_disabled ?'readonly':''}} type="text"
                       class="form-control left-radius right-radius m-w-popup-text {{ $display_class or '' }} {{ $display_required or '' }}" value="{{ $value or '' }}"
                       id="{{ $display_id or '' }}">
            @endif
        </div>
    </div>
</div>
