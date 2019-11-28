@extends('layouts.main')

@section('title')
入庫一覧
@endsection

@section('button')
{{Button::button_left(array('btn-search','btn-save'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
{{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/suplier/css/l010.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/suplier/js/l010.js')!!}
@endsection


@section('content')
<div class="row form-horizontal">
    <!-- Search field -->
    <div class="panel panel-flat">
        <div class="panel-heading">
            <h6 class="panel-title text-bold">検索条件</h6>
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
                         @include('popup.search_company_project',array('display_id'=>'project_nm', 'key_02' => $data ,'option1' => $data))
                        <input type="text" id="company_cd" hidden="hidden" value="{{$data}}">
                    </div>
                    <div class="form-group" >
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">部材名</label>
                        <div class="col-md-6 col-sm-6 col-xs-12 ">
                            <input class="form-control" id="content" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label lb-required">入荷予定日</label>
                        <div class="col-md-6 col-sm-6 col-xs-12 date-from-to form-group" >
                            <div class="" style="display: inline-block">
                                <input  type="tel" class="datepicker form-control charac_special" id="delivery_date_fr">
                            </div>
                            <span>～</span>
                            <div class="" style="display: inline-block">
                                <input  type="tel" class="datepicker form-control charac_special required" id="delivery_date_to">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" style="padding-left: 0px">
                    <div class="form-group" >
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">案件名</label>
                        <div class="col-md-6 col-sm-6 col-xs-12 ">
                            <input class="form-control" id="project_nm2" >
                        </div>
                    </div>
                    <div class="form-group" >
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">納品先名</label>
                        <div class="col-md-6 col-sm-6 col-xs-12 ">
                            <input class="form-control" id="delivery_nm" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-sm-4 col-xs-12 control-label">納品日</label>
                        <div class="col-md-6 col-sm-6 col-xs-12 date-from-to form-group" >
                            <div class="" style="display: inline-block">
                                <input  type="tel" class="datepicker form-control charac_special" id="arrival_date_fr">
                            </div>
                            <span>～</span>
                            <div class="" style="display: inline-block">
                                <input  type="tel" class="datepicker form-control charac_special " id="arrival_date_to">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @endif
        </div><!--.panel-body -->
    </div><!--.panel panel-flat-->
    <div id="result" class="panel panel-flat">
        @include('suplier::l010.search')
    </div><!--.panel panel-flat -->
</div><!--.row form-horizontal -->
@stop