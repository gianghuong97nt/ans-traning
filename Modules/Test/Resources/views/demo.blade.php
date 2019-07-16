@extends('layouts.main')

@section('title')
demo
@endsection

@section('button')
	<button id="r001_test">Export Excel R001</button>
	<button id="r004_test">Export Excel R004</button>
	<button id="r009_test">Export Excel R009</button>
{{Button::button_left(array('btn-back', 'btn-preview','btn-export','btn-save','btn-delete','btn-print','btn-search','btn-refresh','btn-add-new','btn-order'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/test/css/demo.css')!!}
@endsection

@section('page_javascript')
{!! public_url('modules/test/js/demo.js')!!}
@endsection


@section('content')

<div class="row form-horizontal">
	<!-- Search field -->
	<div class="panel panel-flat">
		<div class="panel-heading">
			<h5 class="panel-title text-bold">demo</h5>
			<div class="heading-elements">
				<ul class="icons-list">
					<li><a data-action="collapse"></a></li>
				</ul>
			</div>
		</div><!--panel-heading-->
		<div class="panel-body">
			<div class="form-group">
				<button type="button" class="blue btn btn-primary ">
					.btn-primary
				</button>
				<button type="button" class="btn btn-success">
					.btn-success
				</button>
				<button type="button" class="btn btn-danger	">
					.btn-danger
				</button>
				<button type="button" class="btn btn-warning">
					.btn-warning
				</button>
			</div><!--form-group-->
			<div class="form-group">
				<button type="button" class="btn btn-default" onclick="jSuccess('こんにちは');">
					popup-success
				</button>
				<button type="button" class="btn btn-default" onclick="jWarning('こんにちは');">
					popup-warning
				</button>
				<button type="button" class="btn btn-default " onclick="jConfirm('こんにちは');">
					popup-confirm
				</button>
				<button type="button" class="btn btn-default" onclick="jError('こんにちは');">
					popup-error
				</button>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">input</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="nbc2831000" type="tel" class=" form-control">	
				</div>
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">input[readonly]</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="PDF" type="tel" class=" form-control" readonly="readonly">	
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">.required</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="nbc2831000" type="tel" class=" form-control required">	
				</div>
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">input[placeholder]</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input type="tel" class=" form-control" placeholder="入力してください">	
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.numeric</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="123456" type="tel" class="form-control numeric">	
				</div>
			</div><!--form-group-->	

			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.money</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="123,123,123.23" type="tel" class="form-control money" real_len="9" decimal_len="2" negative="1">	
				</div>
			</div><!--form-group-->	

			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.time</label>
				<div class="col-md-1 col-sm-1 col-xs-12">
					<input value="23:32" type="tel" class="form-control time" style="width: 60px;">	
				</div>
			</div><!--form-group-->	

			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.time-from-to</label>
				<div class="col-md-3 col-sm-3 col-xs-12 time-from-to">
					<input value="" type="tel" class="form-control time" style="">	
					<span class="" style="">～</span>
					<input value="" type="tel" class="form-control time" style="">	
				</div>
			</div><!--form-group-->	
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.second</label>
				<div class="col-md-1 col-sm-1 col-xs-12">
					<input value="23:32:55" type="tel" class="form-control second" style="width: 80px;">	
				</div>
			</div><!--form-group-->	

			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.second-from-to</label>
				<div class="col-md-3 col-sm-3 col-xs-12 second-from-to">
					<input value="" type="tel" class="form-control second" style="">	
					<span class="" style="">～</span>
					<input value="" type="tel" class="form-control second" style="">	
				</div>
			</div><!--form-group-->	
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.datepicker</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="2017/09/19" type="tel" class="datepicker form-control">
				</div>
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.datepicker[readonly]</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="2017/09/19" type="tel" class="datepicker form-control" readonly="readonly">
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.month</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="2017/09" type="tel" class="month form-control">
				</div>
				<label class="col-md-2 col-sm-2 col-xs12 control-label">.month[readonly]</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="2017/09" type="tel"  class=" month form-control" readonly="readonly" >
				</div>
			</div><!--form-group-->

			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.date-from-to</label>
				<div class="col-md-4 col-sm-6 col-xs-12 date-from-to">
					<input value="2017/09/19" type="tel" class="datepicker form-control">
					<span class="">～</span>
					<input value="2017/09/19" type="tel" class="datepicker form-control">
				</div>
			</div><!--form-group-->	
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.month-from-to</label>
				<div class="col-md-4 col-sm-6 col-xs-12 month-from-to">
					<div class="">
						<input value="2017/09" type="tel" class="month form-control">
					</div>
					<span>～</span>
					<div class="">
						<input value="2017/09" type="tel" class="month form-control">
					</div>
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.popup</label>
				@include('popup.search_normal', array('data'=>'l001','key'=>'code', 'value'=>'name'))
				<label class="col-md-2 col-sm-2 col-xs-12 control-label required">.popup[disabled]</label>
				@include('popup.search_normal', array('data'=>'l001','key'=>'search', 'value'=>'XXXX', 'is_disabled'=>1))
			</div><!--form-group-->	
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.案件No</label>
				@include('popup.searchproject', array('data'=>'l001','key'=>'code', 'value'=>'name'))
			</div>
			<div class="form-group">
					<label class="col-md-2 col-sm-2 col-xs-12 control-label text-right">popup 2 input</label>
					@include('popup.search_2input', array('data'=>'l001','value'=>'XXXXXXXXX','value_2'=>'YYYYYYYYYYY'))
				</div><!-- end/.form-group -->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label required">.popup-from-to</label>
				{{-- search city --}}
				<div class="col-md-3 col-sm-3 col-xs-12 popup-from-to">
					<div class="popup" data-id="city_id" data-nm="city_nm" data-search="city" data-istable="0" data-multi="0" style="width: 100px;">
						<div class="input-group">
							<input type="text" class="form-control left-radius right-radius refer-search city_id" value="" id="" style="width: 68px">
							<span class="input-group-btn" style="margin-left: -1px!important;">
								<button type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
							</span>
							<span class="input-group-text text-overfollow m-w-popup-label city_nm" id="" title=""></span>
						</div>
					</div>
					<span class="" style="margin-left: 4px; margin-right: 4px;">～</span>
					{{-- search city --}}
					<div class="popup" data-id="city_id" data-nm="city_nm" data-search="city" data-istable="0" data-multi="0" style="width: 100px;">
						<div class="input-group">
							<input type="text" class="form-control left-radius right-radius refer-search city_id" value="" id="" style="width: 68px">
							<span class="input-group-btn" style="margin-left: -1px!important;">
								<button type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
							</span>
							<span class="input-group-text text-overfollow m-w-popup-label city_nm" id="" title=""></span>
						</div>
					</div>
				</div>
			</div><!--form-group-->

			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">radio</label>
				<div class="col-md-8 col-sm-10 col-xs-12">
					<label class="radio-inline"><input type="radio" name="optradio">Option 1</label>
					<label class="radio-inline"><input type="radio" name="optradio">Option 2</label>
					<label class="radio-inline"><input type="radio" name="optradio">Option 3</label>
					<label class="radio-inline"><input type="radio" name="optradio">Option 4</label>
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">checkbox</label>
				<div class="col-md-8 col-sm-10 col-xs-12">
					<label class="checkbox-inline"><input type="checkbox">Option 1</label>
					<label class="checkbox-inline"><input type="checkbox" >Option 2</label>
					<label class="checkbox-inline"><input type="checkbox" >Option 3</label>
					<label class="checkbox-inline"><input type="checkbox" >Option 4</label>
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">select</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select name="" id="" class="form-control">
						<option value="">option 1</option>
						<option value="">option 2</option>
						<option value="">option 3</option>
						<option value="">option 4</option>
					</select>
				</div>
			</div><!--form-group-->
			
			
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">percent</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input type="text" class="form-control right-radius money" real_len="3" style="width: 70px; display: inline;">
					<span class="">%</span>
				</div><!--col-md-2-->
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">percent from to</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input type="text" class="form-control right-radius money" real_len="3" style="width: 70px; display: inline;">
					<span class="">%</span>
					<span class="" style="">～</span>
					<input type="text" class="form-control right-radius money" real_len="3" style="width: 70px; display: inline;">
					<span class="">%</span>
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label" for="customer_nm">popup search 2</label>
				@include('popup.search_normal', array('data'=>'l001','key'=>'712', 'istable'=>1))
				<label class="col-md-2 col-sm-2 col-xs-12 control-label" for="customer_nm">popup search name</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input type="text" class="form-control " value="">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">Textarea</label>
				<div class="col-md-4 col-sm-6 col-xs-12">
					<textarea name="" id="" cols="30" rows="6" class="form-control" style="resize: none;">Today. i will tell you about myself</textarea>
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">.tel</label>
				<div class="col-md-4 col-sm-6 col-xs-12">
					<input type="tel" class="form-control tel" value="">
				</div>
			</div><!--form-group-->
		</div>	<!--.panel-body-->
	</div><!--.panel panel-flat-->
	<div id="result" class="panel panel-flat">
		<div class="panel-heading ">
			<h6 class="panel-title text-bold">参照一覧</h6>
		</div>
		<div class="panel-body w-pading-top">
			<div class="w-pading-bottom">
				<label style="margin-top: 5px;display: inline-block;">383件の結果から1～50件を表示する</label>
				<div class=" text-right" style="display: inline-block;float: right;">
					<nav aria-label="Page navigation">
						<ul class="pagination">
							<li>
								<a href="#" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">5</a></li>
							<li>
								<a href="#" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="no-padding">
				<div class="table-responsive table-custom">
					<table class="table table-hover table-bordered table-xxs" id="table-area">
						<thead>
							<tr class="col-table-header text-center">
								<th class="text-center">案件CD</th>
								<th class="text-center">案件名</th>
								<th class="text-center">得意先CD</th>
								<th class="text-center">得意先名</th>
								<th class="text-center">納品予定日</th>
								<th class="text-center">案件ステータス</th>
								<th class="text-center">売上計上日</th>
							</tr>
						</thead>
						<tbody>
							@for ($i = 0; $i <= 10; $i++)
							<tr>
								<td class="text-center">AXX5</td>
								<td class="">Item NameItem NameItem Name</td>
								<td class="text-center">CDCODE</td>
								<td class="">name</td>
								<td class="text-center">2017/12/12</td>
								<td class="">delivery</td>
								<td class="text-center">2017/09/19</td>
							</tr>
							@endfor
						</tbody>
					</table>
				</div><!--.table-responsive table-custom -->
			</div><!--.no-padding -->
		</div><!--.panel-body -->
	</div><!--.panel panel-flat -->
	<div class="panel panel-flat" id="result">
		<div class="panel-heading ">
			<h6 class="panel-title text-bold">参照一覧</h6>
		</div>
		<div class="panel-body w-pading-top">
			<div class="w-pading-bottom">
				<label style="margin-top: 5px;display: inline-block;">383件の結果から1～50件を表示する</label>
				<div class=" text-right" style="display: inline-block;float: right;">
					<nav aria-label="Page navigation">
						<ul class="pagination">
							<li>
								<a href="#" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">5</a></li>
							<li>
								<a href="#" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="no-padding">
				<div class="table-responsive table-custom ">
					<div class="table-responsive">
						<table class="table table-hover table-bordered table-xxs" id="table-data">
							<thead>
								<tr class="col-table-header text-center">
									<th class="text-center" rowspan="2" width="2%">No</th>
									<th class="text-center" rowspan="2" width="2%"></th>
									<th class="text-center" rowspan="2" width="5%">MLT</th>
									<th class="text-center" colspan="2" width="20%">部課</th>
									<th class="text-center" width="10%">便種別</th>
									<th class="text-center" width="20%">引取先</th>
									<th class="text-center" width="10%" colspan="2">引取日</th>
									<th class="text-center" rowspan="2" width="5%">数量</th>
									<th class="text-center" rowspan="2" width="8%">単価</th>
									<th class="text-center" rowspan="2" width="10%">金額</th>
									<th class="text-center" rowspan="2">粗利</th>
								</tr>
								<tr class="col-table-header text-center">
									<th class="text-center" colspan="2">協力会社</th>
									<th class="text-center">内容</th>
									<th class="text-center">納入先</th>
									<th class="text-center" colspan="2">納入日</th>
								</tr>
							</thead>
							@for ($i = 1; $i <= 8; $i++)
							<tbody class="<?php if ( $i == 1 ) { echo 'selected'; } ?>">
								<tr>
									<td class="text-center">  00{{$i}} </td>
									<td rowspan="2"></td>
									<td >
										<div>
											<input class="form-control" tabindex="-1" type="text" value="">
										</div>
									</td>	
									<td width="7%">@include('popup.search_normal', array('data'=>'l001','key'=>'712', 'istable'=>1))</td>
									<td>XXXXXXXXXXXXX</td>
									<td>
										<select name="" id="" class="form-control" style="width: 100%;" tabindex-data="7">
											<option value="">横特便</option>
											<option value="">横特便</option>
											<option value="">横特便</option>
										</select>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td class="numeric">1</td>
									<td></td>
									<td class="numeric">5,189</td>
									<td class="numeric">398</td>
								</tr>
								<tr>
									<td><div class="text-center" style="color: red;">済 </div></td>
									<td></td>
									<td>90004-000</td>
									<td>アクセスブロジェクト</td>
									<td>P LS~52J 軽</td>
									<td></td>
									<td class="text-center">2016/05/30</td>
									<td width="30px"></td>
									<td></td>
									<td class="text-left"></td>
									<td class="text-right">3,205</td>
									<td class="text-right">7.49%</td>
								</tr>
							</tbody>
							@endfor
						</table><!-- /.table -->
					</div>
				</div>
			</div>
		</div>
	</div><!--.row form-horizontal -->
<div class="panel panel-flat" id="result">
		<div class="panel-heading ">
			<h6 class="panel-title text-bold">参照一覧</h6>
		</div>
		<div class="panel-body w-pading-top">
			<div class="w-pading-bottom">
				<label style="margin-top: 5px;display: inline-block;">383件の結果から1～50件を表示する</label>
				<div class=" text-right" style="display: inline-block;float: right;">
					<nav aria-label="Page navigation">
						<ul class="pagination">
							<li>
								<a href="#" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">5</a></li>
							<li>
								<a href="#" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="no-padding">
				<div class="table-responsive table-custom ">
					<div class="table-responsive sticky-table sticky-headers sticky-ltr-cells" >
						<table class="table table-hover table-bordered table-xxs" style="min-width: 2000px" id="table-data">
							<thead>
								<tr class="col-table-header text-center sticky-row">
									<th class="text-center sticky-cell" rowspan="2" width="2%">No</th>
									<th class="text-center sticky-cell" rowspan="2" width="2%"></th>
									<th class="text-center" rowspan="2" width="5%">MLT</th>
									<th class="text-center" colspan="2" width="20%">部課</th>
									<th class="text-center" width="10%">便種別</th>
									<th class="text-center" width="20%">引取先</th>
									<th class="text-center" width="10%" colspan="2">引取日</th>
									<th class="text-center" rowspan="2" width="5%">数量</th>
									<th class="text-center" rowspan="2" width="8%">単価</th>
									<th class="text-center" rowspan="2" width="10%">金額</th>
									<th class="text-center" rowspan="2">粗利</th>
								</tr>
								<tr class="col-table-header text-center sticky-row">
									<th class="text-center" colspan="2">協力会社</th>
									<th class="text-center">内容</th>
									<th class="text-center">納入先</th>
									<th class="text-center" colspan="2">納入日</th>
								</tr>
							</thead>
							@for ($i = 1; $i <= 8; $i++)
							<tbody class="<?php if ( $i == 1 ) { echo 'selected'; } ?>">
								<tr>
									<td class="text-center sticky-cell">  00{{$i}} </td>
									<td rowspan="2" class="sticky-cell"></td>
									<td >
										<div>
											<input class="form-control" tabindex="-1" type="text" value="">
										</div>
									</td>	
									<td width="7%">@include('popup.search_normal', array('data'=>'l001','key'=>'712', 'istable'=>1))</td>
									<td>XXXXXXXXXXXXX</td>
									<td>
										<select name="" id="" class="form-control" style="width: 100%;" tabindex-data="7">
											<option value="">横特便</option>
											<option value="">横特便</option>
											<option value="">横特便</option>
										</select>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td class="numeric">1</td>
									<td></td>
									<td class="numeric">5,189</td>
									<td class="numeric">398</td>
								</tr>
								<tr>
									<td class="sticky-cell"><div class="text-center " style="color: red;">済 </div></td>
									<td></td>
									<td>90004-000</td>
									<td>アクセスブロジェクト</td>
									<td>P LS~52J 軽</td>
									<td></td>
									<td class="text-center">2016/05/30</td>
									<td width="30px"></td>
									<td></td>
									<td class="text-left"></td>
									<td class="text-right">3,205</td>
									<td class="text-right">7.49%</td>
								</tr>
							</tbody>
							@endfor
						</table><!-- /.table -->
					</div>
				</div>
			</div>
		</div>
	</div><!--.row form-horizontal -->

	<div class="panel panel-flat" id="result">
		<div class="panel-heading ">
			<h6 class="panel-title text-bold">参照一覧</h6>
		</div>
		<div class="panel-body w-pading-top">
			<div class="w-pading-bottom">
				<label style="margin-top: 5px;display: inline-block;">383件の結果から1～50件を表示する</label>
				<div class=" text-right" style="display: inline-block;float: right;">
					<nav aria-label="Page navigation">
						<ul class="pagination">
							<li>
								<a href="#" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">5</a></li>
							<li>
								<a href="#" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="no-padding">
				<div class="table-responsive table-custom">

					<table class="table table-hover table-bordered table-xxs" id="table-area" style="min-width: 1280px">
						<thead>
						<tr class="col-table-header text-center">
							<th class="text-center" width="32px"><button class="btn btn-default btn-primary btn-add-tbody">+</button> </th>
							<th class="text-center" width="50px">工程</th>
							<th class="text-center">発注No</th>
							<th class="text-center" width="70px">アイテム</th>
							<th class="text-center" rowspan="2" width="150px">内容</th>
							<th class="text-center" colspan="2" >加工日</th>
							<th class="text-center" width="105px">仕入月</th>
							<th class="text-center" colspan="2">発注担当者</th>
							<th class="text-center" colspan="2">納品先</th>
							<th class="text-center" colspan="4">備考</th>
						</tr>
						<tr class="col-table-header text-center">
							<th class="text-center"><input type="checkbox" id="child-set"></th>
							<th class="text-center" width="50px">状態</th>
							<th class="text-center" width="140px">発注日</th>
							<th class="text-center" width="70px">バーツ</th>
							<th class="text-center" width="140px">納品日</th>
							<th class="text-center" width="45px">時間</th>
							<th class="text-center" colspan="3">仕入先</th>
							<th class="text-center" width="35px">数量</th>
							<th class="text-center" width="65px">単価</th>
							<th class="text-center" width="80px">発注金額</th>
							<th class="text-center" width="80px">売上金額</th>
							<th class="text-center" width="80px">利益額</th>
							<th class="text-center" width="80px">利益率(%)</th>
						</tr>
						</thead>
						@for ($i = 0; $i <= 2; $i++)
							<tbody>
							<tr>
								<td class="text-center space-2p" rowspan="2"><input type="checkbox" class="child-set"></td>
								<td class="text-space"><input type="tel" class="form-control" value="材料"></td>
								<td class="text-space numeric">000059750</td>
								<td class="text-space"><input type="tel" class="form-control" value="本生産"></td>
								<td class="text-space"><input type="tel" class="form-control" value="xxxxxxxxx"></td>
								<td class="text-center space-2p" colspan="2">
									<input type="tel" class="form-control datepicker" value="2016/05/28">
								</td>
								<td class="text-center space-2p">
									<input type="tel" class="form-control month" value="2016/05" style="width:70px!important">
								</td>
								<td class="text-center space-2p">
									@include('popup.search_normal', array('data'=>'l001','key'=>'712', 'istable'=>'1'))</td>
								<td class="text-space"><input data-toggle="tooltip" type="tel" class="form-control" value="XXXXXXXXX"></td>
								<td colspan="2" class="space-2p">
									<input type="text" class="form-control" value="ナルシマ">
								</td>
								<td colspan="4" class="space-2p">
									<input type="text" class="form-control" value="ナルシマ">
								</td>
							</tr>
							<tr>
								<td class="text-space" >仕入済</td>
								<td class="text-center space-2p">
									<input type="tel" class="form-control datepicker" value="2016/05/28">
								</td>
								<td class="text-space"><input type="tel" class="form-control" value="ゴンドラ"></td>
								<td class="text-space"><input type="tel" class="form-control" value="600mmX800mm 11kg Y"></td>
								<td class="text-center space-2p">
									<input type="tel" class="form-control datepicker" value="2016/05/28">
								</td>
								<td class="space-2p">
									<input value="23:32" type="tel" class="form-control text-space time" style="width: 45px;">
								</td>
								<td class="text-center space-2p">
									@include('popup.search_normal', array('data'=>'l001','key'=>'712', 'istable'=>'1'))
								</td>
								<td colspan="2" class="text-space">
									<div class="line-col">
										<input type="tel" class="form-control" value="XXXXXXXXXXXX">
									</div>
								</td>
								<td colspan="1" class="space-2p" >
									<input type="text" class="numeric form-control  text-space" style="width: 35px;" value="123">
								</td>
								<td class="space-2p">
									<input type="text" class="money form-control  text-space" value="610,323" real_len="9" >
								</td>
								<td class="space-2p">
									<input type="text" class="money form-control  text-space" value="1,210,323" real_len="9" >
								</td>
								<td class="space-2p">
									<input type="text" class="money form-control  text-space" value="1,210,323" real_len="9" >
								</td>
								<td class="text-right space-2p">
									123,123

								</td>
								<td class="text-right space-2p">
									100
								</td>
							</tr>
							</tbody>
						@endfor
					</table>
				</div><!--.table-responsive table-custom -->
				<table class="table-add" style="display: none;">
					<tbody>
					<tr>
						<td class="text-center space-2p" rowspan="2"><input type="checkbox" class="child-set"></td>
						<td class="text-space"><input type="tel" class="form-control"></td>
						<td class="text-space numeric"><input type="tel" class="form-control" ></td>
						<td class="text-space"><input type="tel" class="form-control" ></td>
						<td class="text-space"><input type="tel" class="form-control" ></td>
						<td class="text-center space-2p" colspan="2">
							<input type="tel" class="form-control datepicker" >
						</td>
						<td class="text-center space-2p">
							<input type="tel" class="form-control month" style="width:70px!important">
						</td>
						<td class="text-center space-2p">
							@include('popup.search_normal', array('data'=>'l001','key'=>'', 'istable'=>'1'))</td>
						<td class="text-space"><input type="tel" class="form-control" ></td>
						<td colspan="2" class="space-2p">
							<input type="text" class="form-control"  >
						</td>
						<td colspan="4" class="space-2p">
							<input type="text" class="form-control"  >
						</td>
					</tr>
					<tr>
						<td class="text-space" ><input type="text" class="form-control"></td>
						<td class="text-center space-2p" width="120px">
							<input type="tel" class="form-control datepicker" >
						</td>
						<td class="text-space"><input type="tel" class="form-control" ></td>
						<td class="text-space"><input type="tel" class="form-control" ></td>
						<td class="text-center space-2p">
							<input type="tel" class="form-control datepicker" >
						</td>
						<td class="space-2p">
							<input value="00:00" type="tel" class="form-control text-space time" style="width: 45px;">
						</td>
						<td class="text-center space-2p">
							@include('popup.search_normal', array('data'=>'l001','key'=>'', 'istable'=>'1'))</td>
						<td colspan="2" class="text-space">
							<div class="line-col">
								<input type="tel" class="form-control" >
							</div>
						</td>
						<td colspan="1" class="space-2p" >
							<input type="text" class="numeric form-control  text-space" style="width: 35px;" >
						</td>
						<td class="space-2p">
							<input type="text" class="money form-control  text-space"  real_len="9" >
						</td>
						<td class="space-2p">
							<input type="text" class="money form-control  text-space"  real_len="9" >
						</td>
						<td class="space-2p">
							<input type="text" class="money form-control  text-space"  real_len="9" >
						</td>
						<td class="text-right space-2p">
						</td>
						<td class="text-right space-2p">
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>



	</div><!--.row form-horizontal -->




</div><!--.row form-horizontal -->

@stop