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
                    <th class="text-center" width="80px">案件NO</th>
                    <th class="text-center" width="170px">案件名</th>
                    <th class="text-center" width="80px">得意先CD</th>
                    <th class="text-center" >得意先名</th>
                    <th class="text-center" width="80px">担当者CD</th>
                    <th class="text-center" width="170px">担当者名</th>
                    <th class="text-center" width="150px">グロス売上</th>
                    <th class="text-center" width="100px">確度</th>
                    <th class="text-center" width="100px">状態</th>
                    <th class="text-center" width="120px">受注確定</th>
                    <th class="text-center" width="80px">売上計上月</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['company_cd'])&&$data[0][0]['company_cd'] != '')
                    @foreach($data[0] as $row)
                        <tr row_data="{{json_encode($row)}}" company_cd = {{$row['company_cd']}}>
                            <td class="text-right" project_dtl_no="{{$row['project_dtl_no']}}">{{$row['project_no']}}</td>
                            <td class="text-left " item_nm="{{$row['item_nm']}}">{{$row['project_nm']}}</td>
                            <td class="text-right " >{{$row['client_cd']}}</td>
                            <td class="text-left " >{{$row['client_nm']}}</td>
                            <td class="text-right " >{{$row['emp_cd']}}</td>
                            <td class="text-left " >{{$row['emp_nm']}}</td>
                            <td class="text-right " >{{$row['gross_sales_amt']}}</td>
                            <td class="text-center " >{{$row['confirm_per_nm']}}</td>
                            <td class="text-center " >{{$row['full_payment_div_mn']}}</td>
                            <td class="text-center " >{{$row['sales_status_div_mn']}}</td>
                            <td class="text-center " >{{$row['sales_recorded_date']}}</td>
                        </tr>
                    @endforeach
                @else
                    <tr class="disable-selection">
                            <td colspan="11" class="text-center">{!! trans('translates.messages.11') !!}</td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div><!--.table-responsive table-custom -->
    </div><!--.no-padding -->
</div><!--.panel-body -->
