<div class="panel-heading">
    <h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
    <div class="w-pading-bottom">
        @if(isset($paging['totalRecord'])&&$paging['totalRecord'] != 0)
            <div class="w-pading-search-top">
                <label style="margin-top: 5px;display: inline-block;">{{ Paging::showText($paging) }}</label>
                <div class=" text-right" style="display: inline-block;float: right;">
                    <nav aria-label="Page navigation">
                        {!!Paging::show($paging,0)!!}
                    </nav>
                </div>
            </div>
        @endif
    </div>
    <div class="no-padding">
        <div class="table-responsive table-custom">
            <table class="table table-hover table-bordered table-xxs" id="table-area">
                <thead>
                <tr class="col-table-header text-center">
                    <th class="text-center" width="100px">会社名</th>
                    <th class="text-center">社員CD</th>
                    <th class="text-center" width="25%">社員名</th>
                    <th class="text-center" width="22%">社員区分</th>
                    <th class="text-center" width="22%">部課名</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['company_nm'])&&$data[0][0]['company_nm'] != '')
                    @foreach($data[0] as $row)
                        <tr row_data="{{json_encode($row)}}" emp_cd = {!! $row['emp_cd'] !!}>
                            <td class="text-center text-overfollow">{!! $row['company_nm'] !!}</td>
                            <td class="text-center" title="{!! $row['emp_cd'] !!}">{!! $row['emp_cd'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['emp_nm']!!}">{!! $row['emp_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['name'] !!}">{!! $row['name'] !!}</td>
                            <td class="text-center" title="{!! $row['section_nm'] !!}">{!! $row['section_nm'] !!}</td>
                        </tr>
                    @endforeach
                @else
                    @if($searchFlag == 0)
                        <tr class="no-data disable-selection">
                            <td colspan="5" class="text-center">{!! trans('translates.messages.17') !!}</td>
                        </tr>
                    @else
                        <tr class="no-data disable-selection">
                            <td colspan="5" class="text-center">{!! trans('translates.messages.11') !!}</td>
                        </tr>
                    @endif
                @endif
                </tbody>
            </table>
        </div><!--.table-responsive table-custom -->
    </div><!--.no-padding -->
    <div class="w-pading-top">
        @if(isset($paging['totalRecord'])&&$paging['totalRecord'] != 0)
            <div class="w-pading-search-top">
                <div class=" text-right" style="display: inline-block;float: right;">
                    <nav aria-label="Page navigation">
                        {!!Paging::show($paging,0)!!}
                    </nav>
                </div>
            </div>
        @endif
    </div>
</div><!--.panel-body -->
