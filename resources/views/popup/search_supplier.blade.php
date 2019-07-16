@php
$col    = isset($col) ? $col : 'col-lg-3 col-md-3 col-sm-3 col-xs-12';
@endphp
<div class="{{$col}} popup" data-nm="supplier_nm" data-id="supplier_cd" data-search="lm006" data-istable="{{ $istable or 0}}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}">
	<div class="input-group" style="{{isset($isinputname)?'width:320px':'width: 100%'}};display: inline-block">
		<div style="display:inline-block; width: 110px; vertical-align: middle;">
			<input maxlength="8" type="tel" class="form-control numeric left-radius right-radius refer-search supplier_cd text-right {{isset($class)?$class:''}}" {{isset($disabled)?'readonly':''}} style="width: 80px;" value="{{ $key or '' }}" id="{{ $id or '' }}">
			<span class="input-group-btn">
				<button type="button" {{isset($disabled)?'disabled':''}} class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
			</span>
		</div>
		<div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;' }};vertical-align: middle;max-width: 180px">
			@if(isset($isinputname))
				<input maxlength="50" style="border-bottom-right-radius: 3px;border-top-right-radius: 3px" type="text" class="form-control left-radius right-radius m-w-popup-text supplier_nm {{$name_class or ''}}" value="{{ $value or '' }}" id="{{$name_id or ''}}" tabindex="">
			@else
				<span class="input-group-text supplier_nm {{$name_class or ''}}" id="{{$name_id or ''}}" style="{{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
				</span>
			@endif
		</div>
	</div>
</div>
