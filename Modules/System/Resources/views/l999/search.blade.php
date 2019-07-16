<div class="panel-heading">
    <h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
    <div class="w-pading-bottom tabId">
        @if($paging['totalRecord'] != 0)
            <label style="margin-top: 5px;display: inline-block;">{{ Paging::showText($paging) }}</label>
            <div class=" text-right" style="display: inline-block;float: right;">
                <nav aria-label="Page navigation ">
                    {!!Paging::show($paging,0)!!}
                </nav>
            </div>
        @endif
    </div>

    <div class="no-padding">
        <div class="wmd-view-topscroll">
            <div class="scroll-div1"></div>
        </div>
        <div class="table-responsive table-custom wmd-view">
            <table class="table table-hover table-bordered table-xxs tb-tabId fixed-header" id="table-area" style="min-width: 1143px;">
                <thead>
                    <tr class="col-table-header text-center">
                        <th class="text-center" width="110px">実行ユーザーID</th>
                        <th class="text-center" width="150px">実行ユーザー名</th>
                        <th class="text-center searchDate" width="150px" flag="{!! $w_text['w_flag'] !!}">{!! $w_text['w_text'] !!}</th>
                        <th class="text-center" width="110px">プログラムID</th>
                        <th class="text-center" width="150px"  >プログラム名</th>
                        <th class="text-center" width="75px" >実行モード</th>
                        <th class="text-center" width="" >キー項目</th>
                        <th class="text-center" width="45px" >結果</th>
                        <th class="text-center" width="175px" >備考</th>
                    </tr>
                </thead>
                <tbody>
                @if($data[0][0]['prs_date'] != '')
                    @foreach($data[0] as $row)
                        <tr>
                            <td class="text-center text-overfollow" title="{!! $row['prs_user_id'] !!}">{!! $row['prs_user_id'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['prs_user_nm'] !!}">{!! htmlentities($row['prs_user_nm']) !!}</td>
                            <td class="text-center text-overfollow" title="{!! $row['prs_date']!!}">{!! htmlentities($row['prs_date']) !!}</td>
                            <td class="text-center text-overfollow" title="{!! $row['prs_prg'] !!}">{!! htmlentities($row['prs_prg']) !!}</td>
                            <td class="text-overfollow" title="{!! $row['prs_prg_nm'] !!}">{!! htmlentities($row['prs_prg_nm']) !!}</td>
                            <td class="text-overfollow" title="{!! $row['prs_mode'] !!}">{!! htmlentities($row['prs_mode']) !!}</td>
                            <td class="text-overfollow" title="{!! $row['prs_key'] !!}">{!! htmlentities($row['prs_key']) !!}</td>
                            <td class="text-center text-overfollow" title="{!! $row['prs_result'] !!}">{!! htmlentities($row['prs_result']) !!}</td>
                            <td class="text-overfollow" title="{!! $row['remarks'] !!}">{!! htmlentities($row['remarks']) !!}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td colspan="11" class="text-center">{!! trans('translates.messages.11') !!}</td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div><!--.table-responsive table-custom -->
    </div><!--.no-padding -->
    <div class="w-pading-top">
        @if($paging['totalRecord'] != 0)
            <label style="margin-top: 5px;display: inline-block;">{{ Paging::showText($paging) }}</label>
            <div class=" text-right tabIdFooter" style="display: inline-block;float: right;">
                <nav aria-label="Page navigation">
                    {!!Paging::show($paging,0)!!}
                </nav>
            </div>
        @endif
    </div>
</div><!--.panel-body -->
