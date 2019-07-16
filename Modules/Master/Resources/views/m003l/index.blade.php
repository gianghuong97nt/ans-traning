@extends('layouts.main')

@section('title')
社員マスタ一覧
@endsection

@section('button')
    {{Button::button_left(array('btn-back','btn-search'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
{{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/master/css/m003l.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/master/js/m003l.js')!!}
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
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">会社CD</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select" id="employee_id" tabindex="1"  class="form-control fix-selected select-width" style="text-align: left;">
						@if(isset($data[0]));
							@foreach($data[0] as $dt)
							<option value="{{$dt['company_cd']}}">{{$dt['company_nm']}}</option>
							@endforeach
						@endif	
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員名</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 241px;">
					<input  tabindex="2" id="employee_nm" type="text"  class="form-control">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員区分</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select" tabindex="3" id="employee_type" class="form-control fix-selected select-width" style="text-align: left;">
						@if(isset($data[1]));
							@foreach($data[1] as $dt)
							<option value="{{$dt['emp_div']}}">{{$dt['name']}}</option>
							@endforeach
						@endif	
					</select>
				</div>
			</div><!--form-group-->
			<div class="form-group fix_size">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">部課CD</label>
				@include('popup.search_company', array('key'=>$company_cd??'', 'value'=>$company_nm_2??'','col'=>'col-md-6 col-sm-5 col-xs-12','class'=>'required','id'=>'company_cd','display_id'=>'display_company_nm','tabindex' =>"4"))
			</div><!--form-group-->	
			{{-- @endif --}}
		</div><!--.panel-body -->
		<!--  -->
	</div><!--.panel panel-flat-->
	<div id="result" class="panel panel-flat">
		<div class="panel-heading ">
			<h6 class="panel-title text-bold">参照一覧</h6>
		</div>
		<div class="panel-body w-pading-top">
			<div class="w-pading-bottom">
			</div>
			<div class="no-padding">
				<div class="wmd-view-topscroll">
					<div class="scroll-div1"></div>
				</div>
				<div class="table-responsive table-custom wmd-view">
					<table class="table table-hover table-bordered table-xxs fixed-header" id="table-area" style="min-width: 1143px;">
						<thead>
							<tr class="col-table-header text-center">
								<th class="text-center" width="40px">編</th>
								<th class="text-center" width="80px">会社CD</th>
								<th class="text-center" width="15%">会社名</th>
								<th class="text-center" width="80px">社員CD</th>
								<th class="text-center" width="15%">社員名</th>
								<th class="text-center" width="15%">社員名カナ</th>
								<th class="text-center" width="120px">社員区分</th>
								<th class="text-center" width="120px">部課</th>
								<th class="text-center" width="22%">備考</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="11" class="text-center">{!! trans('translates.messages.17') !!}</td>
							</tr>
						</tbody>
					</table>
				</div><!--.table-responsive table-custom -->
			</div><!--.no-padding -->
		</div><!--.panel-body -->
	</div><!--.panel panel-flat -->
</div><!--.row form-horizontal -->
	<input type="hidden" value="{{-- {{ $searchFlag }} --}}" id="searchFlag">
	<input type="hidden" value="{{-- {{ $oldPageIndex }} --}}" id="oldPageIndex">
@stop