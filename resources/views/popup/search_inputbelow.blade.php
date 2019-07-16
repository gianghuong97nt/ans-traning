{{-- search lecturer --}}
<div class="col-md-3 col-sm-3 col-xs-12 popup" data-id="city_id" data-nm="city_nm" data-search="{{ $data or ''}}" data-istable="{{ $istable or 0}}" data-multi="{{ $multi or 0 }}"
	 data-option1="{{$option1 or ''}}"
	 data-option2="{{$option2 or ''}}"
	 data-option3="{{$option3 or ''}}"
	 data-option4="{{$option4 or ''}}">
	<!-- chinhnb change style of group and width of input-->
	<div class="input-group" style="width: 100%">
		<div class="input-group" style="display: table-cell;width: 103px;">
			<input {{isset($is_disabled) && $is_disabled ?'readonly':''}} type="text" class="form-control left-radius right-radius refer-search {{isset($class)?$class:''}} {{isset($is_required) && $is_required ?'required':''}}" style="width: 68px;" value="{{ $key or '' }}" id="{{ $id or '' }}">
			<span class="input-group-btn">
				<button {{isset($is_disabled) && $is_disabled ?'disabled':''}} type="button" class="btn btn-primary btn-icon {{ isset($btn_class) ? $btn_class : 'btn-search' }} {{isset($is_required) && $is_required ?'required':''}}"><i class="icon-search4"></i></button>
			</span>
		</div>
		<!-- <div style="display: table-cell" class="allow-content"> -->
		<div style="{{ isset($istable) ? 'display: none;' : 'display: inline-block;' }};vertical-align: middle;" class="allow-content">	
			<input {{isset($is_disabled) && $is_disabled ?'readonly':''}} type="text" class="form-control left-radius right-radius refer-search city_id {{isset($class)?$class:''}} {{isset($is_required) && $is_required ?'required':''}}" value="{{ $key or '' }}" id="{{ $id_2 or '' }}">
		</div>
	</div>
</div>
