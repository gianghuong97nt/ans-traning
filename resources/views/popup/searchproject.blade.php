@php
$col    = isset($col) ? $col : 'col-md-3 col-sm-3 col-xs-12';
@endphp

<div class="{{$col}} popup" data-id="project_no" data-nm="project_nm" data-search="l001" data-istable="{{ $istable or 0}}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}"
     data-option5="{{$option5 or ''}}"
     data-option6="{{$option6 or ''}}">
    <div class="input-group" style="width: 100%">
        <div style="{{ isset($istable) ? 'display: inline-block;' : 'display:table-cell'}}; width: 110px; vertical-align: middle;">
            <input maxlength="8" id="{{ $id or 'project_no' }}" type="tel" class="form-control numeric text-right left-radius project_no right-radius refer-search {{isset($class)?$class:''}}" {{isset($disabled)?'readonly':''}} style="width: 80px;" value="{{ $key or '' }}">
			<span class="input-group-btn">
				<button {{isset($disabled)?'disabled':''}} type="button" class="btn btn-primary btn-icon btn-search">
                    <i class="icon-search4"></i>
                </button>
			</span>
        </div>
        <div style="{{ isset($istable) ? 'display: none;' : 'display: table-cell;' }};vertical-align: middle;" class="input-group-text">
            @if(isset($isinputname))
                <input maxlength="50" type="text" class="form-control left-radius right-radius m-w-popup-text project_nm {{$name_class or ''}}" value="{{ $value or '' }}" id="{{$name_id or ''}}" tabindex="" style="width: 100%; border-top-right-radius: 3px!important; border-bottom-right-radius: 3px!important;">
            @else
                <span class="input-group-text project_nm {{$name_class or ''}}" id="{{$name_id or ''}}" style="{{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
				</span>
            @endif
        </div>
    </div>
</div>
