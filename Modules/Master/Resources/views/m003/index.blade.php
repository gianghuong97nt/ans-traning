@extends('layouts.main')

@section('title')
社員マスタ一覧
@endsection

@section('button')
    {{Button::button_left(array('btn-list','btn-save','btn-delete'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
{{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/master/css/m003l.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/master/js/m003.js')!!}
@endsection

@section('content')

<div class="row form-horizontal">
	<!-- Search field -->
	<div class="panel panel-flat">
		<div class="panel-heading">
			<h6 class="panel-title text-bold">検索案件</h6>
			<div class="heading-elements">
				<ul class="icons-list">
					<li><a data-action="collapse"></a></li>
				</ul>
			</div>
		</div>
		<div class="panel-body search-condition">
			{{-- @if (isset($oldConditionSearchHtml))
					{!! $oldConditionSearchHtml !!}
			@else --}}
			<div class="form-group" >
				<label class="col-md-2 col-sm-2 col-xs-12 control-label ">会社CD</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select" id="m003l_id" tabindex="1" class="form-control fix-selected select-width required" style="text-align: left;">
						@if(isset($data[0]));
							@foreach($data_company as $dt)
								<option value="{{$dt['company_nm']}}" >{{$dt['company_nm']}}</option>
							@endforeach
						@endif	
					</select>
				</div>
			</div>
			<div class="form-group" >
				<label class="col-md-2 col-sm-2 col-xs-12 control-label ">社員CD</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select" id="m003l_id" class="form-control fix-selected select-width required" style="text-align: left;">
						<option value="2">{{$data[0][0]['emp_cd']}}</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員名</label>
				<div class="col-md-2 c ol-sm-2 col-xs-12" style="width: 241px;">
					<input value="{{$data[0][0]['emp_nm']}}" type="text"  class="form-control" id="user_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員名カナ</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 241px;">
					<input value="{{$data[0][0]['emp_kn_nm']}}" type="text"  class="form-control" id="user_kn_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員名略称</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 241px;">
					<input value="{{$data[0][0]['emp_ab_nm']}}" type="text"  class="form-control" id="user_ab_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員区分</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select"  class="form-control fix-selected select-width" style="text-align: left;">
						@if(isset($data[0]));
							@foreach($data[0] as $dt)
								<option value="{{$dt['emp_div']}}">{{$dt['name']}}</option>
							@endforeach
						@endif	
					</select>
				</div>
			</div><!--form-group-->
			<div class="form-group fix_size">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">部課CD</label>
				@include('popup.search_company', array('key'=>$company_cd??'', 'value'=>$company_nm_2??'','col'=>'col-md-6 col-sm-5 col-xs-12','class'=>'required','id'=>'company_cd','display_id'=>'display_company_nm'))
			</div><!--form-group-->	
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">備考</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 400px;">
					<input value="{{$dt['remarks']}}" type="text"  class="form-control" id="user_remarnm">
				</div>
			</div>
			{{-- @endif --}}
		</div><!--.panel-body -->
		<!--  -->
	</div><!--.panel panel-flat-->
	
</div><!--.row form-horizontal -->
	<input type="hidden" value="{{-- {{ $searchFlag }} --}}" id="searchFlag">
	<input type="hidden" value="{{-- {{ $oldPageIndex }} --}}" id="oldPageIndex">
@stop