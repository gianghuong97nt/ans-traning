@extends('layouts.main')

@section('title')
先行仕入リスト出力
@endsection

@section('button')
    {{Button::button_left(array('btn-csv2'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
{{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/project/css/l007.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/project/js/l007.js')!!}
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

			<div class="form-group" >
				<label class="col-md-2 col-sm-2 col-xs-12 control-label ">作表区分</label>
				<div class="col-md-2 col-sm-2 col-xs-12" >
					<select type="select" id="company_cd" tabindex="1" class="form-control fix-selected select-width" style="text-align: left;width: 111px !important;">
						<option value="-1"></option>
						@if(isset($data))
							@foreach($data as $dt)
								<option value="{{$dt['company_cd']}}">{{$dt['company_nm']}}</option>	
							@endforeach
						@endif	
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">売上予定月</label>
				<div class="col-md-2 c ol-sm-2 col-xs-12">
					<input value="" type="tel" class="month form-control" style="width: 111px !important;" id="sales_recorded_date">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label ">部署名</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 241px;">
					<input value="" type="text"  class="form-control required" id="section_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">担当者名(カナ)</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 241px;">
					<input value="" type="text"  class="form-control required" id="emp_nm">
				</div>
			</div>
		</div><!--.panel-body -->
		<!--  -->
	</div><!--.panel panel-flat-->
</div><!--.row form-horizontal -->
@stop
