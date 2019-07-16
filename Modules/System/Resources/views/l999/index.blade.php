@extends('layouts.main')

@section('title')
    操作ログ履歴照会
@endsection

@section('button')
    {{Button::button_left(array('btn-search' ),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
    {!! public_url('modules/system/css/l999.css')!!}
@endsection

@section('page_javascript')
    {!! public_url('modules/system/js/l999.js')!!}
@endsection


@section('content')
    <div class="row form-horizontal">
        <!-- Search field -->
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h6 class="panel-title text-bold">検索案件</h6>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li>
                            <a data-action="collapse">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="panel-body search-condition">
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">実行日</label>
                    <div class="col-md-4 col-sm-6 col-xs-12 month-from-to">
                        <div class="">
                            <input type="tel" class="datepicker form-control" id="prs_date_fr" value="{!!isset($date_fr)?$date_fr:''!!}" >
                        </div>
                        <span>～</span>
                        <div class="">
                            <input type="tel" class="datepicker form-control" id="prs_date_to" value="{!!isset($date_to)?$date_to:''!!}" >
                        </div>
                    </div>
                </div><!--form-group-->

                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">実行ユーザー名</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input type="text" class=" form-control" id="user_nm"  placeholder="" value="">
                    </div>
                </div><!--form-group-->

                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">プログラム名称</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input type="text" class=" form-control" id="prs_prg_nm" placeholder="" value="">
                    </div>
                </div><!--form-group-->

                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">結果</label>
                    <div class="col-md-1 col-sm-1 col-xs-12">
                        <select id="prs_result" class="form-control">
                            <option value="-1"></option>
                            <option value="1">OK</option>
                            <option value="2">NG</option>
                        </select>
                    </div>
                </div><!--form-group-->

            </div>
        </div>
        <!--.col-md-12 -->
        <div class="panel panel-flat" id="result">
            <div class="panel-heading ">
                <h6 class="panel-title text-bold">参照一覧</h6>
            </div>
            <div class="panel-body w-pading-top">
                <div class="w-pading-bottom">
                </div>
                <div class="no-padding">
                    <div class="wmd-view-topscroll">
                        <div class="scroll-div1"></div>
                    </div>
                    <div class="table-responsive table-custom wmd-view">
                        <table class="table table-hover table-bordered table-xxs fixed-header" id="table-area" style="min-width: 1143px;">
                            <thead>
                            <tr class="col-table-header text-center">
                                <th class="text-center" width="110px">実行ユーザーID</th>
                                <th class="text-center" width="150px">実行ユーザー名</th>
                                <th class="text-center searchDate" width="150px" flag="ASC">実行日時 ▼</th>
                                <th class="text-center" width="110px">プログラムID</th>
                                <th class="text-center" width="150px"  >プログラム名</th>
                                <th class="text-center" width="75px" >実行モード</th>
                                <th class="text-center" width="" >キー項目</th>
                                <th class="text-center" width="45px" >結果</th>
                                <th class="text-center" width="175px" >備考</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="9" class="text-center">{!! trans('translates.messages.17') !!}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--.table-responsive table-custom -->
                </div><!--.no-padding -->
            </div>
        </div>
    </div>
    <!--.row -->
@stop
