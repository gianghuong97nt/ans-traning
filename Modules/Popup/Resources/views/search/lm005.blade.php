@extends('layouts.popup')

@section('title')
    得意先検索
@endsection

@section('button')
    {{Button::button_left(array('btn-search','btn-refresh'))}}
@endsection

@section('stylesheet')
    {!! public_url('modules/popup/css/lm005.css')!!}
@endsection

@section('page_javascript')
    {!! public_url('modules/popup/js/lm005.js')!!}
@endsection

@section('content')
    <div id="btnid" class="hidden" btnid="{{ $data["btnid"] }}"></div>
    <div id="istable" class="hidden" istable="{{ $data["istable"] }}"></div>
    <div id="puredata" class="hidden" puredata="{{ $data["puredata"] }}"></div>
    <!-- Main content -->
    <div class="row form-horizontal">
        <!-- Search field -->
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h6 class="panel-title text-bold">検索案件</h6>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a data-action="collapse"></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body search-condition">
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">社員名(カナ)</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <input type="tel" id="vendor_nm" class=" form-control">
                    </div>
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">社員区分</label>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <select class="form-control" id="vendor_div" style="width: 110px">
                            <option></option>
                            @foreach($vendor_divs[0] as $vendor_div)
                                <option value="{{$vendor_div['vendor_div']}}">{{$vendor_div['name']}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div id="result" class="panel panel-flat">
            @include('popup::search.searchlm005')
        </div>
    </div>
@endsection
