@extends('layouts.main')

@section('title')
    弥生用仕入データ一覧照会
@endsection

@section('button')
    {{Button::button_left(array('btn-export'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
    {!! public_url('modules/data/css/r003.css')!!}
@endsection

@section('page_javascript')
    @include('layouts._backscript',$data_session)
    {!! public_url('modules/data/js/r003.js')!!}
@endsection

@section('content')
    <div class="row form-horizontal">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h6 class="panel-title text-bold">加工書</h6>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a data-action="collapse"></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body search-condition">
                <div class="form-group">
                    <label class="col-md-2 col-sm-2 col-xs-12 control-label">案件NO</label>
                    @include('popup.search_company_project',array('display_id'=>'project_nm', 'key_02' => $company_cd ,'option1' => $company_cd))
                </div>
            </div>
        </div>
    </div>
@stop
