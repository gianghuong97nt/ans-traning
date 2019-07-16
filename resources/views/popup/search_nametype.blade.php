@php
$col    = isset($col) ? $col : 'col-md-3 col-sm-3 col-xs-12';
@endphp

<div class="{{$col}} popup" data-id="number_cd" data-nm="name" data-search="lm101" data-istable="{{ $istable or 0}}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}">
    <div class="input-group" style="width: 100%">
        <div style="display:inline-block; width: 110px; vertical-align: middle;">
            <input maxlength="8" id="{{ $id or 'number_cd' }}" type="tel" class="form-control numeric text-right left-radius number_cd right-radius refer-search {{isset($class)?$class:''}}" {{isset($disabled)?'readonly':''}} style="width: 80px;" value="{{ $key or '' }}">
			<span class="input-group-btn">
				<button {{isset($disabled)?'disabled':''}} type="button" class="btn btn-primary btn-icon btn-search">
                    <i class="icon-search4"></i>
                </button>
			</span>
        </div>
        <div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;' }};vertical-align: middle;">
            <span class="input-group-text name {{$name_class or ''}}" id="{{$name_id or ''}}" style="{{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
			</span>
        </div>
    </div>
</div>
