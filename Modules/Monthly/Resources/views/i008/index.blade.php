@extends('layouts.main')

@section('title')
予算設定
@endsection

@section('button')
{{Button::button_left(array('btn-save','btn-print','btn-csv','btn-export','btn-import','btn-save'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
{!! public_url('modules/monthly/css/i008.css')!!}
@endsection
@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/monthly/js/i008.js')!!}
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
        <div class="form-group">
            <label class="col-md-2 col-sm-2 col-xs-12 control-label ">会社</label>
            @include('popup.search_company', array('data'=>'lm001','key'=>$company_cd,'col'=>'col-md-4 col-sm-5 col-xs-12','value'=>$company_nm,'display_id'=>'display_company_nm'))
        </div>
        <div class="form-group">
            <label class="col-md-2 col-sm-2 col-xs-12 control-label ">部課</label>
            @include('popup.search_section', array('col'=>'col-md-4 col-sm-5 col-xs-12','id'=>'section_cd','display_id'=>'display_section_nm'
            ))
        </div>
        <div class="form-group">
            <label class="col-md-2 col-sm-2 col-xs-12 control-label ">担当者</label>
            @include('popup.search_empcd', array('col'=>'col-md-4 col-sm-5 col-xs-12','id'=>'emp_cd','display_id'=>'display_emp_nm'))
        </div>
        <div class="form-group">
            <div class="col-md-5 col-sm-3 col-xs-12 ">
            </div>
            <label class="col-md-2 col-sm-2 col-xs-12 control-label ">部門売上予算計</label>
            <div class="col-md-3 col-sm-3 col-xs-12">
                <input id="sum_sales" value="{!!isset($data)?$data[1]['sum_sales']:''!!}" type="tel" class=" form-control" readonly="readonly" style="width: 340px">    
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-5 col-sm-3 col-xs-12">
            </div>
            <label class="col-md-2 col-sm-2 col-xs-12 control-label">部門利益予算計</label>
            <div class="col-md-3 col-sm-3 col-xs-12">
                <input value="{!!isset($data)?$data[1]['sum_gross']:''!!}" id="sum_gross" type="tel" class=" form-control" readonly="readonly" style="width: 340px">    
            </div>
        </div>
    </div><!--.panel-body -->
</div><!--.panel panel-flat-->
<div  class="panel panel-flat">
    <div class="panel-heading ">
        <h6 class="panel-title text-bold">部課</h6>
    </div>
    <div class="panel-body ">
        <div class="form-group">
            <label class="col-md-2 col-sm-2 col-xs-12 control-label">該当年度</label>
            <div class="col-md-3 col-sm-3 col-xs-12">
                <input value="" type="" class=" form-control" id="estimate_ym"  style="width: 116px">    
            </div>
        </div>
        <div id="result" class="panel panel-flat">
            @include('monthly::i008.search')
        </div><!--.panel panel-flat -->
    </div>
</div><!--.panel panel-flat -->
</div><!--.row form-horizontal -->

@stop
