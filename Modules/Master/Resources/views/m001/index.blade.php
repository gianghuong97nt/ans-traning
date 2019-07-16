@extends('layouts.main')

@section('title')
	会社マスタ
@endsection

@section('button')
	{{Button::button_left(array('btn-list','btn-save','btn-delete'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
	{!! public_url('modules/master/css/m001.css')!!}
@endsection

@section('page_javascript')
	@include('layouts._backscript',$data_session)
	{!! public_url('modules/master/js/m001.js')!!}
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
					<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">会社CD</label>
					<div class="col-md-3 col-sm-3 col-xs-12">
						<input value="{!! isset($data[0][0]['company_cd'])?$data[0][0]['company_cd']:'' !!}" type="text"
							   class="form-control required fix-selected numeric" id="company_cd"
						<?php if($data[0][0]['company_cd']!='') echo 'readonly';  ?>
						>
					</div>
				</div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">会社名</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_nm'])?$data[0][0]['company_nm']:'' !!}" type="text"
                               class="form-control" id="company_nm" >
                    </div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">会社名（英）</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_en_nm'])?$data[0][0]['company_en_nm']:'' !!}" type="text"
                               class="form-control" id="company_en_nm" >
                    </div>
                </div>
				<div class="form-group">
					<label class="col-md-2 col-sm-2 col-xs-12 control-label ">会社名カナ</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_kn_nm'])?$data[0][0]['company_kn_nm']:'' !!}" type="text"
                               class="form-control" id="company_kn_nm" >
                    </div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">会社名略称（英）</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_en_ab_nm'])?$data[0][0]['company_en_ab_nm']:'' !!}" type="text"
                               class="form-control" id="company_en_ab_nm" >
                    </div>
				</div><!--form-group-->
				<div class="form-group">
					<label class="col-md-2 col-sm-2 col-xs-12 control-label ">会社名略称</label>
					<div class="col-md-3 col-sm-3 col-xs-12">
						<input value="{!! isset($data[0][0]['company_ab_nm'])?$data[0][0]['company_ab_nm']:'' !!}" type="text"
							   class="form-control " id="company_ab_nm" >
					</div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">都道府県（英）</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['prefectures_en'])?$data[0][0]['prefectures_en']:'' !!}" type="text"
                               class="form-control" id="prefectures_en" >
                    </div>
				</div>
				<div class="form-group">
					<label class="col-md-2 col-sm-2 col-xs-12 control-label">郵便番号</label>
					<div class="col-md-3 col-sm-3 col-xs-12">
						<input value="{!! isset($data[0][0]['company_zip'])?$data[0][0]['company_zip']:'' !!}" type="tel"
							   class="form-control" id="company_zip" >
					</div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">市区町村（英）</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['city_en'])?$data[0][0]['city_en']:'' !!}" type="text"
                               class="form-control" id="city_en" >
                    </div>
				</div>
				<div class="form-group">
					<label class="col-md-2 col-sm-2 col-xs-12 control-label">住所</label>
					<div class="col-md-3 col-sm-3 col-xs-12">
						<input value="{!! isset($data[0][0]['company_adr_1'])?$data[0][0]['company_adr_1']:'' !!}" type="text"
							   class="form-control" id="company_adr_1" >
					</div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">町域（英）</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['town_en'])?$data[0][0]['town_en']:'' !!}" type="text"
                               class="form-control" id="town_en" >
                    </div>
				</div>
				<div class="form-group">
					<label class="col-md-2 col-sm-2 col-xs-12 control-label" style="visibility:hidden"></label>
					<div class="col-md-3 col-sm-3 col-xs-12">
						<input value="{!! isset($data[0][0]['company_adr_2'])?$data[0][0]['company_adr_2']:'' !!}" type="text"
							   class="form-control" id="company_adr_2" >
					</div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">丁目番地（英）</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['chome_address_en'])?$data[0][0]['chome_address_en']:'' !!}" type="text"
                               class="form-control " id="chome_address_en" >
                    </div>
				</div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">TEL</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_tel'])?$data[0][0]['company_tel']:'' !!}" type="text"
                               class="form-control fix-selected-1"
                               style="display: inline-block;" id="company_tel" >
                    </div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">TEL(英)</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_en_tel'])?$data[0][0]['company_en_tel']:'' !!}" type="text"
                               class="form-control fix-selected-1"
                               style="display: inline-block;" id="company_en_tel" >
                    </div>
                </div><!--form-group-->
				<div class="form-group">
					<label class="col-md-2 col-sm-2 col-xs-12 control-label">FAX</label>
					<div class="col-md-3 col-sm-3 col-xs-12">
						<input value="{!! isset($data[0][0]['company_fax'])?$data[0][0]['company_fax']:'' !!}" type="text"
							   class="form-control fix-selected-1"
							   style="display: inline-block;" id="company_fax" >
					</div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">FAX(英)</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_en_fax'])?$data[0][0]['company_en_fax']:'' !!}" type="text"
                               class="form-control fix-selected-1"
                               style="display: inline-block;" id="company_en_fax">
                    </div>
				</div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">URL</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input value="{!! isset($data[0][0]['company_url'])?$data[0][0]['company_url']:'' !!}" type="text"
                               class="form-control" id="company_url">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">備考</label>
                    <div class="col-md-3 col-sm-3 col-xs-12 col-lg-6">
                        <input value="{!! isset($data[0][0]['remarks'])?$data[0][0]['remarks']:'' !!}" type="text"
                               class="form-control " id="remarks" style="width: 740px" >
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
