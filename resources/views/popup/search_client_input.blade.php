@php
$col    = isset($col) ? $col : 'col-lg-5 col-md-5 col-sm-5 col-xs-12';
@endphp

<div class="{{$col}} popup" data-search="lm004" data-istable="{{ $istable or 0}}" data-nm = "client_nm" data-id = "client_cd"
	 data-option1="{{$option1 or ''}}"
	 data-option2="{{$option2 or ''}}"
	 data-option3="{{$option3 or ''}}"
	 data-option4="{{$option4 or ''}}">
	<div class="input-group" >
		<input maxlength="8" type="tel" class="form-control numeric left-radius right-radius refer-search-1 client_cd text-right {{isset($class)?$class:''}}" {{isset($disabled)?'readonly':''}} style="width: 80px;border-top-right-radius: 3px!important;;border-bottom-right-radius: 3px!important" value="{{ $key_01 or '' }}" id="{{ $id_01 or '' }}">
		<span class="input-group-text" style="padding-right: 5px">-</span>
		<div class="input-group" style="width: 80px">
			<input maxlength="4" type="tel" class="form-control numeric left-radius right-radius refer-search-1 client_br_cd text-right {{isset($class)?$class:''}}" {{isset($disabled)?'readonly':''}} style="width: 50px;" value="{{ $key_02 or '' }}" id="{{ $id_02 or '' }}">
			<div class="input-group-btn">
				<button {{isset($disabled)?'disabled':''}} type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
			</div>
		</div>
		<div class="input-group-text" style="width: 100%;{{ isset($istable) ? 'display: none;' : '' }}">
			<input maxlength="100" style="width: 100%;border-top-right-radius: 3px!important;;border-bottom-right-radius: 3px!important" class="form-control left-radius right-radius client_nm {{$name_class or ''}}" id="{{$name_id or ''}}" type="text" name="" value="{{$value or ''}}">
		</div>
	</div>
</div>
