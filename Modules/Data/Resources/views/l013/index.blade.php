@extends('layouts.main')

@section('title')
    弥生用仕入データ一覧照会
@endsection

@section('button')
    {{Button::button_left(array('btn-search','btn-export','btn-export2','btn-export3','btn-export4', 'btn-export5', 'btn-export6','btn-export7', 'btn-import'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
    {!! public_url('modules/data/css/l013.css')!!}
@endsection

@section('page_javascript')
    @include('layouts._backscript',$data_session)
    {!! public_url('modules/data/js/l013.js')!!}
@endsection

@section('content')
    <div class="row form-horizontal">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h6 class="panel-title text-bold">弥生用仕入データ一覧照会</h6>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a data-action="collapse"></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body search-condition">
                <div class="form-group" >
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">処理日付</label>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <select class="form-control required" id="status">
                            <option value="0"></option>
                            <option value="1" selected>未作成</option>
                            <option value="2">作成済</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">仕入月</label>
                    <div class="col-md-4 col-sm-6 col-xs-12 date-from-to">
                        <div class="" style="display: inline-block">
                            <input  type="tel" class="month form-control" value="{{ htmlspecialchars($last_month) }}" id="cost_recorded_date_fr">
                        </div>
                        <span>～</span>
                        <div class="" style="display: inline-block">
                            <input  type="tel" class="month form-control" value="{{ htmlspecialchars($last_month) }}" id="cost_recorded_date_to">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label ">仕入先</label>
                    @include('popup.search_vendor', array('data'=>'lm005', 'value' => '','display_id' =>'client_nm', 'option1'=>$company_cd))
                </div>
                <div class="form-group" >
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">作成日</label>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 popup">
                        <input type="text" class="form-control" id="closing_date" style="width: 40px">
                    </div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">仕入先名</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input type="text" class="form-control" id="vendor_nm">
                    </div>
                </div>
                <input type="file" id="import-data" style="display:none;" accept=".csv">
            </div>
        </div>
        <div id="result" class="panel panel-flat">
            @include('data::l013.search')
        </div>
    </div>
@stop
