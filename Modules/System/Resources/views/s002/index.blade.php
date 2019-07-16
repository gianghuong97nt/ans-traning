@extends('layouts.main')

@section('title')
権限設定マスタ
@endsection

@section('button')
{{Button::button_left(array('btn-save'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
{!! public_url('modules/system/css/s002.css')!!}
@endsection

@section('page_javascript')
{!! public_url('modules/system/js/s002.js')!!}
@endsection


@section('content')
<div class="row form-horizontal">
	<!-- Search field -->
	<div class="panel panel-flat">
		<div class="panel-heading">
			<h6 class="panel-title text-bold">
				基本情報
			</h6>
			<div class="heading-elements">
				<ul class="icons-list">
					<li>
						<a data-action="collapse">
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="panel-body">
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">ユーザー区分</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select name="" id="user_div" class="form-control required">
						<option value="-1"></option>
						@foreach($CMB[0] as $row)
							<option value="{!! $row['number_cd'] !!}">{!! $row['name'] !!}</option>
						@endforeach
					</select>
				</div>
			</div><!--form-group-->
		</div>
	<!--.col-md-12 -->
	</div>
	<div class="panel panel-flat" id="result">
		<div class="panel-heading">
			<h6 class="panel-title text-bold">
				明細
			</h6>
		</div>
		<div class="panel-body w-pading-top">
			<div class="w-pading-bottom">
			</div>
			<div class="no-padding">
				<div class="wmd-view-topscroll">
					<div class="scroll-div1"></div>
				</div>
				<div class="table-responsive table-custom wmd-view">
					<table class="table table-hover table-bordered table-xxs w-ipad fixed-header" id="table-data" style="min-width: 1143px;">
					<thead>
						<tr class="col-table-header text-center">
							<th class="text-center" rowspan="2" width="100px">メニューID</th>
							<th class="text-center" rowspan="2" width="300px">メニュー名</th>
							<th class="text-center" colspan="5">権限</th>
							<th class="text-center w-i35px" rowspan='2'>備考</th>
						</tr>
						<tr class="col-table-header text-center">
							<th class="text-center" width="100px">
								<div class="inline">
									<label class="w-item-label">
										<input id="avail_typ" type="checkbox" name="" value="1" tabindex="">
										<i class="margin-left-5px"></i>
										<span class="span-label light-weight">機能利用</span>
									</label>
								</div>
							</th>
							<th class="text-center" width="120px">
								<div class="inline">
									<label class="w-item-label">
										<input id="avail_mnu_typ" type="checkbox" name="" value="1" tabindex="">
										<i class="margin-left-5px"></i>
										<span class="span-label light-weight">メニュー表示</span>
									</label>
								</div>
							</th>
							<th class="text-center" width="100px">
								<label class="w-item-label">
									<input id="avail_upd_typ" type="checkbox" name="" value="1" tabindex="">
									<i class="margin-left-5px"></i>
									<span class="span-label light-weight">登録・修正</span>
								</label>
							</th>
							<th class="text-center" width="100px">
								<label class="w-item-label">
									<input id="avail_del_typ" type="checkbox" name="" value="1" tabindex="">
									<i class="margin-left-5px"></i>
									<span class="span-label light-weight">削除</span>
								</label>
							</th>
							<th class="text-center" width="100px">
								<label class="w-item-label">
									<input id="avail_out_typ" type="checkbox" name="" value="1" tabindex="">
									<i class="margin-left-5px"></i>
									<span class="span-label light-weight">出力</span>
								</label>
							</th>
						</tr>
					</thead>
						<tbody class="">
							<tr>
								<td colspan="8" class="text-center">{!! trans('translates.messages.17') !!}</td>
							</tr>
						</tbody>
					</table>
					<!-- /.table -->
				</div>
			</div>
		</div>
	</div>
</div>
<!--.row -->
	<input type="hidden" id="mode" value="" >
@stop
@section('_registration_footer')
	<div id="registration_footer">
		@include('layouts._registration_footer')
	</div>
@stop
