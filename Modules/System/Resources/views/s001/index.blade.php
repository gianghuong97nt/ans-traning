@extends('layouts.main')

@section('title')
ユーザーマスタ
@endsection

@section('button')
{{Button::button_left(array('btn-list','btn-save','btn-delete'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
{!! public_url('modules/system/css/s001.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/system/js/s001.js')!!}
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
				<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">ユーザーID</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="{!! isset($data[0][0]['user_id'])?$data[0][0]['user_id']:'' !!}" type="text"
					 class="form-control required fix-selected" id="user_id"
					 <?php if($data[0][0]['user_id']!='') echo 'readonly';  ?> 
					 >
				</div>
			</div>
			<div class="form-group fix_size">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">会社CD</label>
				@include('popup.search_company', array('key'=>$company_cd, 'value'=>$company_nm_2,'col'=>'col-md-4 col-sm-5 col-xs-12','class'=>'required','id'=>'company_cd','display_id'=>'display_company_nm'))
			</div><!--form-group-->	
			<div class="form-group fix_size">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">社員CD</label>
				@include('popup.search_empcd', array('data'=>'lm003','key'=>$emp_cd, 'col'=>'col-md-4 col-sm-5 col-xs-12','value'=>$emp_nm,'class'=>'required','id'=>'emp_cd','name_id'=>'display_emp_nm'))
			</div><!--form-group-->	
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">パスワード</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="{!! isset($data[0][0]['password'])?$data[0][0]['password']:'' !!}" type="password" 
					class="form-control required" id="password">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">ユーザー名</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="{!! isset($data[0][0]['user_nm'])?$data[0][0]['user_nm']:'' !!}" type="tel" 
					class="form-control" id="user_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">ユーザー名カナ</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="{!! isset($data[0][0]['user_kn_nm'])?$data[0][0]['user_kn_nm']:'' !!}" type="text" 
					class="form-control" id="user_kn_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">ユーザー名略称</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="{!! isset($data[0][0]['user_ab_nm'])?$data[0][0]['user_ab_nm']:'' !!}" type="text" 
					class="form-control" id="user_ab_nm">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12  control-label lb-required">ユーザー区分</label>
				<div class="col-md-3 col-sm-3 col-xs-12 ">
					<select type="select" id="user_div" class="form-control required" style="text-align: left;width: 160px;">
						<option value="-1"></option>
						@foreach($data2[0] as $item)
							<option  {{$data[0][0]['user_div']==$item['number_cd']?'selected':''}}
									value="{{$item['number_cd']}}">{{$item['name']}}
							</option>
						@endforeach
					</select>
				</div>
			</div><!--form-group-->
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">最終ログイン時</label>
				<div class="col-md-3 col-sm-3 col-xs-12">
					<input value="{!! isset($data[0][0]['last_login_date'])?$data[0][0]['last_login_date']:'' !!}" type="text"
					 class="form-control fix-selected-1 text-center" readonly="readonly" 
					 style="display: inline-block;" id="last_login_date">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">備考</label>
				<div class="col-md-6 col-sm-6 col-xs-12">
					<textarea class="form-control" rows="3" id="remarks">{!! isset($data[0][0]['remarks'])?$data[0][0]['remarks']:'' !!}</textarea>
				</div>
			</div>
		</div>
	<!--.col-md-12 -->
	</div>
</div>
<!--.row -->
<input type="hidden" id="mode" value="{{$mode}}" >
@stop
<div id="registration_footer">
	@include('layouts._registration_footer')
</div>
