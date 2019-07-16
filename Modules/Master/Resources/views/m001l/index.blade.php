@extends('layouts.main')

@section('title')
    会社マスタ一覧
@endsection

@section('button')
    {{Button::button_left(array('btn-back','btn-search'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
    {{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
    {!! public_url('modules/master/css/m001l.css')!!}
@endsection

@section('page_javascript')
    @include('layouts._backscript',$data_session)
    {!! public_url('modules/master/js/m001l.js')!!}
@endsection


@section('content')
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
                    <div class="form-group" >
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">会社名</label>
                        <div class="col-md-2 col-sm-2 col-xs-12" style="width: 340px;">
                            <input value="" type="text"  class="form-control" id="company_nm">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">住所</label>
                        <div class="col-md-2 col-sm-2 col-xs-12" style="width: 340px;">
                            <input value="" type="text"  class="form-control" id="company_adr" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 col-sm-2 col-xs-12 control-label">電話番号</label>
                        <div class="col-md-2 col-sm-2 col-xs-12" style="width: 220px;">
                            <input value="" type="text"  class="form-control numeric" id="company_tel" >
                        </div>
                    </div><!--form-group-->
                @endif
            </div><!--.panel-body -->
        </div><!--.panel panel-flat-->
        <div id="result" class="panel panel-flat">
            @include('master::m001l.search')
        </div><!--.panel panel-flat -->
    </div><!--.row form-horizontal -->
    <input type="hidden" value="{{ $searchFlag }}" id="searchFlag">
    <input type="hidden" value="{{ $oldPageIndex }}" id="oldPageIndex">
@stop