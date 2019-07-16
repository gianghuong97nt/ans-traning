@php
$col    = isset($col) ? $col : 'col-lg-3 col-md-3 col-sm-3 col-xs-12';
@endphp
<div class="{{$col}} popup" data-nm="slip_nm" data-id="slip_no" data-search="lf009" data-istable="{{ $istable or 0}}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}">
	<div class="input-group" style="width: 100%">
		<div style="display: inline-block;vertical-align: middle;width: 110px">
			<input maxlength="8" type="tel" class="form-control numeric left-radius right-radius refer-search slip_no text-right {{isset($class)?$class:''}}" {{isset($disabled)?'readonly':''}} style="width: 80px;" value="{{ $key or '' }}" id="{{ $id or '' }}">
			<span class="input-group-btn">
				<button type="button" {{isset($disabled)?'disabled':''}} class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
			</span>
		</div>
		<div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;' }}">
			@if(isset($isinputname))
				<input maxlength="50" type="text" class="form-control left-radius right-radius m-w-popup-text slip_nm {{$name_class or ''}}" value="{{ $value or '' }}" id="{{$name_id or ''}}" tabindex="">
			@else
				<span class="input-group-text slip_nm {{$name_class or ''}}" id="{{$name_id or ''}}" style="{{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
				</span>
			@endif
		</div>
	</div>
</div>
