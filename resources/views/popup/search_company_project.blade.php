@php
$col    = isset($col) ? $col : 'col-lg-5 col-md-5 col-sm-5 col-xs-12';
@endphp
<div class="{{$col}} popup" data-search="l001" data-istable="{{ $istable or 0}}" data-nm = "project_nm" data-id = "project_no"
	 data-option1="{{$option1 or ''}}"
	 data-option2="{{$option2 or ''}}"
	 data-option3="{{$option3 or ''}}"
	 data-option4="{{$option4 or ''}}">
	<div class="input-group" >
		<input maxlength="8" type="tel" class="form-control numeric left-radius right-radius  company_cd text-right {{isset($class)?$class:''}}" {{(isset($disabled) && $disabled != '')?'readonly':''}} style="width: 65px;border-top-right-radius: 3px!important;;border-bottom-right-radius: 3px!important" value="{{ $key_02 or '' }}" id="{{ $id_02 or 'company_cd' }}">
		<span class="input-group-text" style="padding-right: 5px">-</span>
		<div class="input-group" style="width: 120px">
			<input maxlength="4" type="tel" class="form-control numeric left-radius right-radius refer-search project_no text-right {{isset($class)?$class:''}}" {{(isset($disabled) && $disabled != '')?'readonly':''}} style="width: 85px;" value="{{ $key_01 or '' }}" id="{{ $id_01 or 'project_no' }}">
			<div class="input-group-btn">
				<button {{(isset($disabled) && $disabled != '')?'disabled':''}} type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
			</div>
		</div>
		@if(isset($isinputname))
		<div class="input-group-text" style="width: 100%;{{ isset($istable) ? 'display: none;' : '' }}">
			<input maxlength="100" style="width: 100%;border-top-right-radius: 3px!important;;border-bottom-right-radius: 3px!important" class="form-control left-radius right-radius project_nm {{$name_class or ''}}" id="{{$name_id or ''}}" type="text" name="" value="{{$value or ''}}">
		</div>
		@else
		<span class="input-group-text project_nm m-w-popup-label" id="{{$display_id or ''}}" style="    padding-left: 10px; {{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
		</span>
		@endif
	</div>
</div>
