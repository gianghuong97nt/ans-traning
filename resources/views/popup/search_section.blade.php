@php
$col    = isset($col) ? $col : 'col-md-3 col-sm-3 col-xs-12';
@endphp

<div class="{{$col}} popup" data-id="section_cd" data-nm="section_nm" data-search="lm002" data-istable="{{ $istable or 0}}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}">
    <div class="input-group" style="width: 100%">
        <div style="{{ isset($istable) ? 'display: inline-block;' : 'display:table-cell'}}; width: 110px; vertical-align: middle;">
            <input maxlength="8" id="{{ $id or 'section_cd' }}" type="tel" class="form-control numeric text-right left-radius section_cd right-radius refer-search {{isset($class)?$class:''}}" {{(isset($disabled) && $disabled != '')?'readonly':''}} style="width: 80px;" value="{{ $key or '' }}">
			<span class="input-group-btn">
				<button {{(isset($disabled) && $disabled != '')?'disabled':''}} type="button" class="btn btn-primary btn-icon btn-search">
                    <i class="icon-search4"></i>
                </button>
			</span>
        </div>
        <div style="{{ isset($istable) ? 'display: none;' : 'display: table-cell;' }};vertical-align: middle;" class="input-group-text">
            @if(isset($isinputname))
                <input maxlength="50" type="text" class="form-control left-radius right-radius m-w-popup-text section_nm {{$name_class or ''}}" value="{{ $value or '' }}" id="{{$name_id or ''}}" tabindex="" style="width: 100%; border-top-right-radius: 3px!important; border-bottom-right-radius: 3px!important;">
            @else
                <span class="input-group-text section_nm {{$name_class or ''}}" id="{{$name_id or ''}}" style="{{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
				</span>
            @endif
        </div>
    </div>
</div>
