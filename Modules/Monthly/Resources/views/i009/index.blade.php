@extends('layouts.main')

@section('title')
    期中担当者変更入力
@endsection

@section('button')
    {{Button::button_left(array('btn-search','btn-save'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
    {!! public_url('modules/monthly/css/i009.css')!!}
@endsection

@section('page_javascript')
    @include('layouts._backscript',$data_session)
    {!! public_url('modules/monthly/js/i009.js')!!}
@endsection

@section('content')
    <div class="row form-horizontal">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h6 class="panel-title text-bold">基本情報</h6>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a data-action="collapse"></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body search-condition">
                <div class="form-group" >
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">案件名</label>
                    <div class="col-md-6 col-sm-2 col-xs-12">
                        <input class="form-control" id="project_nm">
                    </div>
                </div>
                <div class="form-group" >
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">得意先</label>
                    @include('popup.search_client', array('data'=>'lm004', 'value' => '','display_id' =>'client_nm',
                    'id_01' => 'client_cd', 'id_02' => 'client_br_cd', 'key_01' => '', 'key_02' => '','option1'=>$company_cd))
                </div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label ">担当者</label>
                    @include('popup.search_empcd', array('data'=>'lm003','col'=>'col-md-4 col-sm-5 col-xs-12'))
                </div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">売上年月</label>
                    <div class="col-md-4 col-sm-6 col-xs-12 date-from-to">
                        <div class="" style="display: inline-block">
                            <input  type="tel" class="month form-control charac_special" id="sales_recorded_date_fr">
                        </div>
                        <span>～</span>
                        <div class="" style="display: inline-block">
                            <input  type="tel" class="month form-control charac_special" id="sales_recorded_date_to">
                        </div>
                    </div>
                </div>
            </div><!--.panel-body -->
        </div><!--.panel panel-flat-->
        <div id="result" class="panel panel-flat">
            @include('monthly::i009.search')
        </div><!--.panel panel-flat -->
    </div><!--.row form-horizontal -->
@stop
