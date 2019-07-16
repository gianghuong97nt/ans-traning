@extends('layouts.main')

@section('title')
    期中担当者変更入力
@endsection

@section('button')
    {{Button::button_left(array('btn-search','btn-save'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
    {{Information::information_right(array('registation_info','update_info'))}}
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
                    <div class="form-group" >
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">案件名</label>
                        <div class="col-md-2 col-sm-2 col-xs-12 col-lg-6">
                            <input class="form-control" id="project_nm" style="width: 500px">
                        </div>
                    </div>
                    <div class="form-group" >
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">得意先</label>
                        <div class="col-md-3 col-sm-3 col-xs-12 popup-from-to">
                            <div class="popup"  data-istable="0" data-multi="0" style="width: 100px;">
                                <div class="input-group">
                                    <input  class="form-control text-right w-item2 left-radius right-radius charac_special"
                                    style="width: 100px;border-radius: 3px" id="client_cd">
                                </div>
                            </div>
                            <span class="" style="margin-left: 4px; margin-right: 4px;">～</span>
                            <div class="popup" data-istable="0" data-multi="0" style="width: 100px;">
                                <div class="input-group">
                                    <input type="text" class="form-control left-radius right-radius charac_special" id="client_br_cd" style="width: 70px">
                                    <span class="input-group-btn" style="margin-left: -1px!important;">
                                        <button type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">担当者</label>
                        <div class="col-md-3 col-sm-3 col-xs-12 popup-from-to">
                            <div class="popup" >
                                <div class="input-group">
                                    <input type="text" class="form-control left-radius right-radius charac_special" id="emp_cd" style="width: 70px">
                                    <span class="input-group-btn" style="margin-left: -1px!important;">
								        <button type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
							        </span>
                                </div>
                            </div>
                        </div>
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
                @endif
            </div><!--.panel-body -->
        </div><!--.panel panel-flat-->
        <div id="result" class="panel panel-flat">
            @include('monthly::i009.search')
        </div><!--.panel panel-flat -->
    </div><!--.row form-horizontal -->
    <input type="hidden" value="{{ $searchFlag }}" id="searchFlag">
    <input type="hidden" value="{{ $oldPageIndex }}" id="oldPageIndex">
@stop