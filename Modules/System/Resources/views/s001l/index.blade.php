@extends('layouts.main')

@section('title')
ユーザーマスタ一覧
@endsection

@section('button')
    {{Button::button_left(array('btn-back','btn-search'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
{{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/system/css/s001l.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/system/js/s001l.js')!!}
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
			@if (isset($oldConditionSearchHtml))
					{!! $oldConditionSearchHtml !!}
			@else
			<div class="form-group" >
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">ユーザーID</label>
				<div class="col-md-3 col-sm-3 col-xs-12" style="width: 300px;">
					<input value="" type="tel"  class="form-control "  style="width: 100px;display: inline-block;" id="user_id_fr">
					<span>～</span>
					<input value="" type="tel"  class="form-control "  style="width: 100px;display: inline-block;" id="user_id_to">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">ユーザー名</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 241px;">
					<input value="" type="text"  class="form-control" id="user_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">ユーザー区分</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select" id="user_div" class="form-control fix-selected " style="text-align: left;">
						<option value="-1"></option>
						@foreach($data2[0] as $item)
							<option 
									value="{{$item['number_cd']}}">{{$item['name']}}
							</option>
						@endforeach
					</select>
				</div>
			</div><!--form-group-->
			@endif
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
								<th class="text-center" width="80px">ユーザーID</th>
								<th class="text-center" width="20%">ユーザー名</th>
								<th class="text-center" width="20%">ユーザー名カナ</th>
								<th class="text-center" width="100px">ユーザー区分</th>
								<th class="text-center" width="200px">社員名</th>
								<th class="text-center">備考</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="7" class="text-center">{!! trans('translates.messages.17') !!}</td>
							</tr>
						</tbody>
					</table>
				</div><!--.table-responsive table-custom -->
			</div><!--.no-padding -->
		</div><!--.panel-body -->
	</div><!--.panel panel-flat -->
</div><!--.row form-horizontal -->
	<input type="hidden" value="{{ $searchFlag }}" id="searchFlag">
	<input type="hidden" value="{{ $oldPageIndex }}" id="oldPageIndex">
@stop