@php
$col    = isset($col) ? $col : 'col-lg-3 col-md-3 col-sm-3 col-xs-12';
@endphp
<div class="{{$col}} popup" data-search="ls003" data-istable="{{ $istable or 0}}" data-nm = "prg_nm" data-id = "prg_id"
	 data-option1="{{$option1 or ''}}"
	 data-option2="{{$option2 or ''}}"
	 data-option3="{{$option3 or ''}}"
	 data-option4="{{$option4 or ''}}">
	<div class="input-group" >
		<input type="text" class="form-control left-radius right-radius refer-search prg_id {{isset($class)?$class:''}}" style="width: 68px;" value="{{ $key or '' }}" id="{{ $id or '' }}">
		<span class="input-group-btn">
			<button type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
		</span>
		<span class="input-group-text prg_nm" id="{{$display_id or ''}}" style="{{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
		</span>
	</div>
</div>
