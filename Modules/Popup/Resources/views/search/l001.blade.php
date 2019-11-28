@extends('layouts.popup')

@section('title')
案件一覧
@endsection

@section('button')
{{Button::button_left(array('btn-search'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/popup/css/l001.css')!!}
@endsection

@section('page_javascript')
{!! public_url('modules/popup/js/l001.js')!!}

@endsection

@section('content')
<!-- Main content -->
<div class="row form-horizontal">
	<!-- Search field -->
	<div class="panel panel-flat">
		<div class="panel-heading">
			<h6 class="panel-title text-bold">案件一覧</h6>
			<div class="heading-elements">
				<ul class="icons-list">
					<li><a data-action="collapse"></a></li>
				</ul>
			</div>
		</div>
		<div class="panel-body search-condition">
			@if (isset($oldConditionSearchHtml))
			{!! $oldConditionSearchHtml !!}
			@else
			<div>
				<div class="col-md-12" style="padding-left: 0px">
					<div class="col-md-6" style="padding-left: 0px">
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label ">利用会社</label>
							<div class="col-md-8 col-sm-8 col-xs-12 " style="padding-left: 0px">
								<div class="form-group" >
									<div class="col-md-8 col-sm-10 col-xs-12">
										<label class="radio-inline"><input type="radio" name="optradio" id="order1">グループ内受注</label>
										<label class="radio-inline"><input type="radio" name="optradio" id="order2">直接受注</label>
									</div>
								</div>
							</div>
						</div>	
					</div>
				</div>
				<div class="col-md-12" style="padding-left: 0px ;" >
					<div class="col-md-6" style="padding-left: 0px">			
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先</label>
							@include('popup.search_customer',array('id'=>'client_cd','name_id'=>'client_nm'))
						</div>

					</div>
					<div class="col-md-6" style="padding-left: 0px">	
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先名</label>
							<div class="col-md-6 col-sm-6 col-xs-12 ">
								<input class="form-control client_nm" id="client_nm" maxlength="50">
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12" style="padding-left: 0px">
					<div class="col-md-6" style="padding-left: 0px">			
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label">担当者</label>
							@include('popup.search_empcd')
						</div>

					</div>
					<div class="col-md-6" style="padding-left: 0px">	
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label">担当者名</label>
							<div class="col-md-6 col-sm-6 col-xs-12 ">
								<input class="form-control emp_nm" id="emp_nm" maxlength="30">
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12" style="padding-left: 0px">
					<div class="col-md-6" style="padding-left: 0px">			
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label">案件NO</label>
							<div class="col-md-3 col-sm-3 col-xs-12 ">
								<input class="form-control project_no numeric" id="project_no" style="text-align: left;width: 100px;" maxlength="8">
							</div>
						</div>
					</div>
					<div class="col-md-6" style="padding-left: 0px">	
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label">案件名</label>
							<div class="col-md-6 col-sm-6 col-xs-12 ">
								<input class="form-control project_nm" id="project_nm"maxlength="100">
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12" style="padding-left: 0px">
					<div class="col-md-6" style="padding-left: 0px">			
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12  control-label ">確度</label>
							<div class="col-md-3 col-sm-3 col-xs-12 ">
								<select type="select" id="confirm_per" class="form-control " style="text-align: left;width: 100px;" maxlength="1">
									<option value="-1"></option>
									@if(isset($data2))
									@foreach($data2[0] as $item)
									<option value="{{$item['number_cd']}}">{{$item['name']}}</option>
									@endforeach
									@endif
								</select>
							</div>
						</div>
					</div>
					<div class="col-md-6" style="padding-left: 0px">	
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12  control-label ">状態</label>
							<div class="col-md-3 col-sm-3 col-xs-12 ">
								<select type="select" id="full_payment_div" class="form-control " style="text-align: left;width: 100px;" maxlength="1">
									<option value="-1"></option>
									@if(isset($data2))
									@foreach($data2[1] as $item)
									<option value="{{$item['number_cd']}}">{{$item['name']}}</option>
									@endforeach
									@endif
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12" style="padding-left: 0px">
					<div class="col-md-6" style="padding-left: 0px">			
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12  control-label ">受注確定</label>
							<div class="col-md-3 col-sm-3 col-xs-12 ">
								<select type="select" id="sales_status_div" class="form-control " style="text-align: left;width: 100px;" maxlength="1">
									<option value="-1"></option>
									@if(isset($data2))
									@foreach($data2[2] as $item)
										<option value="{{$item['number_cd']}}">{{$item['name']}}</option>
									@endforeach
									@endif
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12" style="padding-left: 0px">
					<div class="col-md-6" style="padding-left: 0px">			
						<div class="form-group">
							<label class="col-md-4 col-sm-4 col-xs-12 control-label">売上計上月</label>
							<div class="col-md-6 col-sm-6 col-xs-12 date-from-to form-group" >
								<div class="" style="display: inline-block">
									<input  type="tel" class="month form-control charac_special" id="sales_recorded_date_fr">
								</div>
								<span>～</span>
								<div class="" style="display: inline-block">
									<input  type="tel" class="month form-control charac_special" id="sales_recorded_date_to">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			@endif
		</div><!--.panel-body -->
	</div><!--.panel panel-flat -->
	<div id="result" class="panel panel-flat">
		@include('popup::search.searchl001')
	</div>
</div><!--.row -->
<input type="hidden" value="{{ $data["searchFlag"] }}" id="searchFlag">
@endsection
