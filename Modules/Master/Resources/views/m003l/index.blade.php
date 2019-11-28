@extends('layouts.main')

@section('title')
社員マスタ一覧
@endsection

@section('button')
    {{Button::button_left(array('btn-back','btn-search'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('information')
{{Information::information_right(array('registation_info','update_info'))}}
@endsection

@section('stylesheet')
{!! public_url('modules/master/css/m003l.css')!!}
@endsection

@section('page_javascript')
@include('layouts._backscript',$data_session)
{!! public_url('modules/master/js/m003l.js')!!}
@endsection


@section('content')
<div class="row form-horizontal">
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
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">会社CD</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select" id="company_cd" tabindex="1"  class="form-control fix-selected select-width" style="text-align: left;">
						<option value="-1"></option>
						@if(isset($data[0]));
							@foreach($data[0] as $dt)
							<option value="{{$dt['company_cd']}}">{{$dt['company_nm']}}</option>
							@endforeach
						@endif	
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員名</label>
				<div class="col-md-2 col-sm-2 col-xs-12" style="width: 241px;">
					<input tabindex="2" id="emp_nm" type="text"  class="form-control">
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">社員区分</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select type="select" tabindex="3" id="emp_div" class="form-control fix-selected select-width" style="text-align: left;">
						<option value="-1"></option>
						@if(isset($data[1]));
							@foreach($data[1] as $dt)
							<option value="{{$dt['number_cd']}}">{{$dt['name']}}</option>
							@endforeach
						@endif	
					</select>
				</div>
			</div><!--form-group-->
			<div class="form-group fix_size">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label">部課CD</label>
				@include('popup.search_section', array('key'=>$company_cd??'', 'value'=>$company_nm_2??'','col'=>'col-md-6 col-sm-5 col-xs-12','class'=>'','id'=>'section_cd','display_id'=>'display_section_nm','tabindex' =>"4"))
			</div><!--form-group-->	
            @endif
            </div><!--.panel-body -->
        </div><!--.panel panel-flat-->
        <div id="result" class="panel panel-flat">
            @include('master::m003l.search')
        </div><!--.panel panel-flat -->
    </div><!--.row form-horizontal -->
    <input type="hidden" value="{{ $searchFlag }}" id="searchFlag">
    <input type="hidden" value="{{ $oldPageIndex }}" id="oldPageIndex">
@stop