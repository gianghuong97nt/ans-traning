@extends('layouts.main')

@section('title')
発注金額入力
@endsection

@section('button')
{{Button::button_left(array('btn-registration2','btn-registration','btn-project','btn-done','btn-confirm','btn-send','btn-export','btn-import','btn-csv','btn-search','btn-save'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
{{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/suplier/css/i006.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/suplier/js/i006.js')!!}
@endsection


@section('content')
<div class="row form-horizontal">
    <!-- Search field -->
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
            @if (isset($oldConditionSearchHtml))
            {!! $oldConditionSearchHtml !!}
            @else 
            <div class="col-md-12" style="padding-left: 0px">
                <div class="col-md-6" style="padding-left: 0px">
                    <div class="form-group" >
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">案件NO</label>
                        @include('popup.search_company_project',array('display_id'=>'project_nm', 'key_02' => $data['company_cd'] ,'option1' => $data['company_cd'],'disabled1'=>'readonly'))
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">アイテム</label>
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <select type="select" id="project_dtl_no" class="form-control fix-selected " style="text-align: left;">
                                @include('suplier::i006.select')   
                            </select>
                        </div>
                    </div> 
                    <div class="form-group">
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">パーツ</label>
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <select type="select" id="specification_row_no" class="form-control fix-selected " style="text-align: left;">
                                @include('suplier::i006.select')   
                            </select>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">仕入先</label>
                        @include('popup.search_vendor', array('display_id'=>'vendor_nm', 'option1' => $data['company_cd']))
                    </div>
                </div>
            </div>
            <div class="col-md-12" style="padding-left: 0px">
                <div class="col-md-6" style="padding-left: 0px">
                   <div class="form-group" >
                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">発注NO</label>
                    <div class="col-md-4 col-sm-4 col-xs-12 ">
                        <input class="form-control" id="company_project" >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">発注納期</label>
                    <div class="col-md-4 col-sm-6 col-xs-12 date-from-to">
                        <div class="" style="display: inline-block">
                            <input  type="tel" class="datepicker form-control charac_special" id="delivery_date">
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-md-6" style="padding-left: 0px">
               <div class="form-group">
                <label class="col-md-4 col-sm-4 col-xs-12 control-label">発注日</label>
                <div class="col-md-4 col-sm-6 col-xs-12 date-from-to">
                    <div class="" style="display: inline-block">
                        <input  type="tel" class="datepicker form-control charac_special" id="order_date">
                    </div>

                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 col-sm-4 col-xs-12 control-label">仕入月</label>
                <div class="col-md-4 col-sm-6 col-xs-12 date-from-to">
                    <div class="" style="display: inline-block">
                        <input  type="tel" class="month form-control charac_special" id="cost_recorded_date">
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endif
</div><!--.panel-body -->
</div><!--.panel panel-flat-->
<div id="result" class="panel panel-flat">
    @include('suplier::i006.search')
</div><!--.panel panel-flat -->
<input type="hidden" value="{{ $data["searchFlag"] }}" id="searchFlag">
<form id="aaa">
    <input type="file" id="file" accept=".csv"  capture="camera" style="display: none"/>
</form>
</div><!--.row form-horizontal -->
@stop