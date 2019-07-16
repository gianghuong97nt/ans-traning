@extends('layouts.popup')

@section('title')
	会社検索
@endsection

@section('button')
	{{Button::button_left(array('btn-search','btn-refresh'))}}
@endsection

@section('stylesheet')
	{!! public_url('modules/popup/css/lm001.css')!!}
@endsection

@section('page_javascript')
	{!! public_url('modules/popup/js/lm001.js')!!}

@endsection

@section('content')
<div id="btnid" class="hidden" btnid="{{ $data["btnid"] }}"></div>
<div id="istable" class="hidden" istable="{{ $data["istable"] }}"></div>
<div id="puredata" class="hidden" puredata="{{ $data["puredata"] }}"></div>
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
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">会社名</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="" type="tel" id="company_nm" class=" form-control" tabindex="5" >
				</div>
			</div>
			@endif
		</div><!--.panel-body -->
	</div><!--.panel panel-flat -->
	<div id="result" class="panel panel-flat">
		@include('popup::search.searchlm001')
	</div>
</div><!--.row -->
<input type="hidden" value="{{ $data["searchFlag"] }}" id="searchFlag">
@endsection
