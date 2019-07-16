@extends('layouts.main')

@section('title')
得意先マスタ
@endsection

@section('button')
{{Button::button_left(array('btn-list','btn-save','btn-delete'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
{!! public_url('modules/master/css/m004.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/master/js/m004.js')!!}
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
			<div class="col-md-12" style="padding-left: 0px">
				<div class="col-md-6" style="padding-left: 0px">
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label lb-required">利用会社</label>
						<div id="htmlcompany_cd">
							@include('master::m004.company_cd')
						</div>
						
					</div>	
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label lb-required">得意先CD</label>
						<div class="col-md-3 col-sm-3 col-xs-12">
							<input value="{{isset($data[0][0]['client_cd'])?$data[0][0]['client_cd']:''}}" type="text" class="form-control  fix-selected" id="client_cd">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label lb-required">得意先支店CD</label>
						<div class="col-md-3 col-sm-3 col-xs-12">
							<input value="{{isset($data[0][0]['client_br_cd'])&&$data[0][0]['client_br_cd']!=''?$data[0][0]['client_br_cd']:'0'}}" type="text"
							class="form-control fix-selected" id="client_br_cd"
							
							>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">ユーザー名</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_nm'])?$data[0][0]['client_nm']:''}}" type="tel" 
							class="form-control" id="client_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先名カナ</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_kn_nm'])?$data[0][0]['client_kn_nm']:''}}" type="tel" 
							class="form-control" id="client_kn_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先名略称</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_ab_nm'])?$data[0][0]['client_ab_nm']:''}}" type="tel" 
							class="form-control" id="client_ab_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先支店名</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_br_nm'])?$data[0][0]['client_br_nm']:''}}" type="tel" 
							class="form-control" id="client_br_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先支店名カナ</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_br_kn_nm'])?$data[0][0]['client_br_kn_nm']:''}}" type="tel" 
							class="form-control" id="client_br_kn_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先支店名略称</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_br_ab_nm'])?$data[0][0]['client_br_ab_nm']:''}}" type="tel" 
							class="form-control" id="client_br_ab_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">諸口区分</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="client_div" class="form-control " style="text-align: left;width: 160px;">
								<option value="-1"></option>
								@foreach($dataCombo[0] as $item)
								<option  {{$data[0][0]['client_div']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">産業分類区分</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="industrial_class_div" class="form-control " style="text-align: left;width: 100px;">
								<option value="-1"></option>
								@foreach($dataCombo[1] as $item)
								<option  {{$data[0][0]['industrial_class_div']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">得意先分類区分</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="client_class_div" class="form-control " style="text-align: left;width: 100px;">
								<option value="-1"></option>
								@foreach($dataCombo[2] as $item)
								<option  {{$data[0][0]['client_class_div']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">締日</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="closing_date" class="form-control " style="text-align: left;width: 100px;">
								<option value="-1"></option>
								@foreach($dataCombo[3] as $item)
								<option  {{$data[0][0]['closing_date']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">回収サイト</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="collenction_site" class="form-control " style="text-align: left;width: 100px;">
								<option value="-1"></option>
								@foreach($dataCombo[4] as $item)
								<option  {{$data[0][0]['collenction_site']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">回収日</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="collenction_date" class="form-control " style="text-align: left;width: 100px;">
								<option value="-1"></option>
								@foreach($dataCombo[5] as $item)
								<option  {{$data[0][0]['collenction_date']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">回収方法区分</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="collenction_method_div" class="form-control " style="text-align: left;width: 100px;">
								<option value="-1"></option>
								@foreach($dataCombo[6] as $item)
								<option  {{$data[0][0]['collenction_method_div']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label ">手形金額</label>
						<div class="col-md-3 col-sm-3 col-xs-12">
							<input value="{{isset($data[0][0]['bill_payable_amt'])?$data[0][0]['bill_payable_amt']:''}}" type="text"
							class="form-control numeric" id="bill_payable_amt">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">手形サイト</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="bill_payable_site" class="form-control " style="text-align: left;width: 100px;">
								<option value="-1"></option>
								@foreach($dataCombo[7] as $item)
								<option  {{$data[0][0]['bill_payable_site']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
				</div>
				<div class="col-md-6" style="padding-left: 0px" >
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">郵便番号</label>
						<div class="col-md-2 col-sm-2 col-xs-12">
							<input value="{{isset($data[0][0]['zip'])?$data[0][0]['zip']:''}}" type="tel" 
							class="form-control" id="zip">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">住所</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['adr1'])?$data[0][0]['adr1']:''}}" type="tel" 
							class="form-control" id="adr1">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 "></label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['adr2'])?$data[0][0]['adr2']:''}}" type="tel" 
							class="form-control" id="adr2">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">部署名</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['section_nm'])?$data[0][0]['section_nm']:''}}" type="tel" 
							class="form-control" id="section_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">得意先担当者</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_emp_nm'])?$data[0][0]['client_emp_nm']:''}}" type="tel" 
							class="form-control" id="client_emp_nm">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">電話番号</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_tel'])?$data[0][0]['client_tel']:''}}" type="tel" 
							class="form-control" id="client_tel">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">FAX</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['client_fax'])?$data[0][0]['client_fax']:''}}" type="tel" 
							class="form-control" id="client_fax">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12  control-label ">価格パターンCD</label>
						<div class="col-md-3 col-sm-3 col-xs-12 ">
							<select type="select" id="cost_pattern_cd" class="form-control " style="text-align: left;width: 140px;">
								<option value="-1"></option>
								@foreach($dataCombo[8] as $item)
								<option  {{$data[0][0]['cost_pattern_cd']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
								</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">帳票タイプ</label>
						<div class="col-md-2 col-sm-2 col-xs-12">
							<input value="{{isset($data[0][0]['report_kbn'])?$data[0][0]['report_kbn']:''}}" type="tel" 
							class="form-control" id="report_kbn">
						</div>
					</div>
					

				</div>
			</div>
			<div class="col-md-12" style="padding-left: 0px">
				<div class="col-md-6" style="padding-left: 0px"> 
					<div class="form-group">
						<label class="col-md-4 col-sm-4 col-xs-12 control-label">備考</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input value="{{isset($data[0][0]['remarks'])?$data[0][0]['remarks']:''}}" type="tel" 
							class="form-control" id="remarks">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--.row -->
@stop
<div id="registration_footer">
	@include('layouts._registration_footer')
</div>
