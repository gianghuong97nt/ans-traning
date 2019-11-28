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
                    <th class="text-center" style="width:200px" >仕入先CD</th>
                    <th class="text-center" style="width:100px">仕入先名</th>
                    <th class="text-center" style="width:300px">仕入先名カナ</th>
                    <th class="text-center" style="width:300px">支店CD</th>
                    <th class="text-center" style="width:500px">支店名</th>
                    <th class="text-center" style="width:500px">支店名カナ</th>
                    <th class="text-center" style="width:500px">会社名</th>
                    <th class="text-center" style="width:500px">仕入先区分</th>
                    <th class="text-center" style="width:500px">締日</th>
                    <th class="text-center" style="width:500px">備考</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['vendor_cd']) && $data[0][0]['vendor_cd'] != '')
                    @foreach($data[0] as $row)
                        <tr row_data="{{json_encode($row)}}" vendor_cd = {!! $row['vendor_cd'] !!}>
                            <td class="text-right">{!! $row['vendor_cd'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['vendor_nm'] !!}">{!! $row['vendor_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['vendor_kn_nm']!!}">{!! $row['vendor_kn_nm'] !!}</td>
                            <td class="text-right" title="{!! $row['vendor_br_cd'] !!}">{!! $row['vendor_br_cd'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['vendor_br_nm'] !!}">{!! $row['vendor_br_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['vendor_br_kn_nm'] !!}">{!! $row['vendor_br_kn_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['company_nm'] !!}">{!! $row['company_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['vendor_div_nm'] !!}">{!! $row['vendor_div_nm'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['closing_date_nm'] !!}">{!! $row['closing_date_nm'] !!}</td>
                            <td class="text-overfollow"></td>
                        </tr>
                    @endforeach
                @else
                    <tr class="no-data">
                        <td colspan="9" class="text-center">
                            {{ !isset($data[0][0]['vendor_cd'])  ? trans('translates.messages.17') : trans('translates.messages.11') }}
                        </td>
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
