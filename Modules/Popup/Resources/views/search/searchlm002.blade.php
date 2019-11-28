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
                    <th class="text-center" width="10%">会社名</th>
                    <th class="text-center" width="20%">部課CD</th>
                    <th class="text-center" width="20%">部課名</th>
                    <th class="text-center" width="20%">部課名略称</th>
                    <th class="text-center" width="30%">備考</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['section_cd'])&&$data[0][0]['section_cd'] != '')
                    @foreach($data[0] as $row)
                        <tr row_data="{{json_encode($row)}}" section_cd = {!!isset($row['section_cd'])?$row['section_cd']:'' !!}>
                            <td class="text-center text-overfollow">{!! $row['company_nm'] !!}</td>
                            <td class="text-overfollow" title="{{-- {!! $row['section_cd'] !!} --}}">{!! $row['section_cd'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['section_nm']!!}">{!! $row['section_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['section_ab_nm']!!}">{!! $row['section_ab_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['remarks'] !!}">{!! $row['remarks'] !!}</td>
                        </tr>
                    @endforeach
                @else
                    <tr class="disable-selection">
                        @if(isset($data[0][0]['company_cd']))
                            <td colspan="4" class="text-center">{!! trans('translates.messages.11') !!}</td>
                        @else
                            <td colspan="4" class="text-center">{!! trans('translates.messages.17') !!}</td>
                        @endif
                    </tr>
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
