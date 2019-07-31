@extends('layouts.popup')

@section('title')
    会社検索
@endsection

@section('button')
    {{Button::button_left(array('btn-search','btn-refresh'))}}
@endsection

@section('stylesheet')
    {!! public_url('modules/popup/css/lm003.css')!!}
@endsection

@section('page_javascript')
    {!! public_url('modules/popup/js/lm003.js')!!}

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
                @if (isset($oldConditionSearchHtml))
                    {!! $oldConditionSearchHtml !!}
                @else
                    <div class="form-group">
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">社員名(カナ)</label>
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <input value="" type="tel" id="emp_nm" class=" form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">社員区分</label>
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <select class="form-control" id="emp_div" style="width: 110px">
                                <option></option>
                                @foreach($emp_divs[0] as $emp_div)
                                <option value="{{$emp_div['emp_div']}}">{{$emp_div['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="form-group fix_size">
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label ">部課CD</label>
                        @include('popup.search_section', array('data'=>'lm003','key'=>'', 'col'=>'col-md-4 col-sm-5 col-xs-12',
                        'value'=>'','id'=>'section_cd','name_id'=>'display_emp_nm'))
                    </div>
                @endif
            </div>
        </div>
        <div id="result" class="panel panel-flat">
            @include('popup::search.searchlm003')
        </div>
    </div>
    <input type="hidden" value="{{ $searchFlag }}" id="searchFlag">
@endsection
