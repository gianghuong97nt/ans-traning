
@extends('layouts.main')

@section('title')
    ダッシュボード
    @endsection

    @section('button')
    {{Button::button_left(array('btn-config','btn-change-pass'))}}

    @endsection

    @section('stylesheet')
    {!! public_url('modules/system/css/db001.css')!!}
    @endsection

    @section('page_javascript')
    {!! public_url('modules/system/js/db001.js')!!}
    @endsection

    @section('content')
            <!-- Main content -->
    <div class="row form-horizontal">
        <input type="hidden" id="datas" value=""/>
        <!-- Search field -->
        <div class="panel panel-flat">
            <div class="panel-body">
                <div class="col-md-12 label_bookmark">機能ブックマーク</div>
                <div class="col-md-12 bookmark">
                    <ul>
                        @for($i = 1;$i<=10;$i++)
                            <li>
                                <a
                                    @if(isset($data[$i]['prg_url']) && $data[$i]['prg_url'] !='')
                                     href="{!! $data[$i]['prg_url'] !!}"
                                   @endif
                                >
                                    <span class="bookmark_cd">{!! $i!!}</span><span class="bookmark_nm text-overfollow" maxlength="30">{!!isset($data[$i])?trim($data[$i]['prg_nm']," "):''!!}</span>
                                </a>
                            </li>
                        @endfor
                    </ul>
                </div>
            </div>
        </div><!--.col-md-12 -->
    </div><!--.row -->

@endsection


