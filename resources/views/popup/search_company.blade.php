@php
$col    = isset($col) ? $col : 'col-md-3 col-sm-3 col-xs-12';
@endphp

<div class="{{$col}} popup" data-nm="company_nm" data-id="company_cd" data-search="lm001" data-istable="{{ $istable or 0}}"
     data-option1="{{$option1 or ''}}"
     data-option2="{{$option2 or ''}}"
     data-option3="{{$option3 or ''}}"
     data-option4="{{$option4 or ''}}">
	<div class="input-group" style="width: 100%">
		<div style="display: inline-block;vertical-align: middle;width: 110px;">
			<input maxlength="4" type="text" class="form-control left-radius right-radius refer-search company_cd text-right numeric {{isset($class)?$class:''}}" style="width: 80px;"
				   value="{{ $key or '' }}" id="{{ $id or 'company_cd' }}" company_cd="">
			<span class="input-group-btn">
				<button type="button" class="btn btn-primary btn-icon btn-search" tabindex="5"><i class="icon-search4"></i></button>
			</span>
		</div>
		<div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;vertical-align: middle;' }}">
			<span class="input-group-text company_nm" id="{{$display_id or ''}}" style="{{ isset($istable) ? 'display: none;' : '' }}">{{ $value or '' }}
			</span>
		</div>
	</div>
</div>
