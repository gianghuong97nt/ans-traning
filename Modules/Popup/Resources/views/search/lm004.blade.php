@extends('layouts.popup')

@section('title')
得意先検索
@endsection

@section('button')
{{Button::button_left(array('btn-search','btn-refresh'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/popup/css/lm004.css')!!}
@endsection

@section('page_javascript')
{!! public_url('modules/popup/js/lm004.js')!!}

@endsection

@section('content')
{{-- <div id="btnid" class="hidden" btnid="{{ $data["btnid"] }}"></div>
<div id="istable" class="hidden" istable="{{ $data["istable"] }}"></div>
<div id="puredata" class="hidden" puredata="{{ $data["puredata"] }}"></div> --}}
<!-- Main content -->
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
			@if (isset($oldConditionSearchHtml))
			{!! $oldConditionSearchHtml !!}
			@else
			<div class="col-md-12" style="padding-left: 0px;">
				<div class="col-md-6" style="padding-left: 0px;">
					<div class="form-group" >
						<div class="form-group">
							<label class="col-md-3 col-sm-3 col-xs-12 control-label">得意先名(カナ)</label>
							<div class="col-md-6 col-sm-6 col-xs-12" style="width: 300px;">
								<input value="" type="text"  class="form-control" id="client_nm" >
							</div>
						</div>
					</div> 
				</div>
				<div class="col-md-6" class="col-md-6" style="padding-left: 0px;">
					<div class="form-group">
						<label class="col-md-3 col-sm-3 col-xs-12 control-label">得意先支店名(カナ)</label>
						<div class="col-md-6 col-sm-6 col-xs-12" style="width: 300px;">
							<input value="" type="text"  class="form-control" id="client_br_nm" >
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12" style="padding-left: 0px;">
				<div class="col-md-6" style="padding-left: 0px;">
					<div class="form-group">
						<label class="col-md-3 col-sm-3 col-xs-12 control-label">住所</label>
						<div class="col-md-6 col-sm-6 col-xs-12" style="width: 300px;">
							<input value="" type="text"  class="form-control" id="adr" >
						</div>
					</div>
				</div>
				<div class="col-md-6" class="col-md-6" style="padding-left: 0px;">
					<div class="form-group">
						<label class="col-md-3 col-sm-3 col-xs-12 control-label">得意先区分</label>
						<div class="col-md-2 col-sm-2 col-xs-12">
							<select type="select" id="client_div" class="form-control fix-selected " style="text-align: left;">
								<option value="-1"></option>
								@foreach($dataCombo[0] as $item)
								<option 
								value="{{$item['number_cd']}}">{{$item['name']}}
							</option>
							@endforeach
						</select>
					</div>
				</div>
			</div>
			@endif
		</div><!--.panel-body -->
	</div><!--.panel panel-flat -->
	<div id="result" class="panel panel-flat">
		@include('popup::search.searchlm004')
	</div>
</div><!--.row -->
<input type="hidden" value="{{ $data["searchFlag"] }}" id="searchFlag">
@endsection
