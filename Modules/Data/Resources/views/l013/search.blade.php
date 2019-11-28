<div class="panel-heading ">
    <h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
    <div class="no-padding">
        <div class="table-responsive table-custom wmd-view">
            <table class="table table-hover table-bordered table-xxs fixed-header" id="table-area" style="min-width: 1143px;">
                <thead>
                <tr class="col-table-header text-center">
                    <th class="text-center project_no">NO</th>
                    <th class="text-center cost_data_rpt_date">変換</th>
                    <th class="text-center company_cd">伝票No</th>
                    <th class="text-center purchase_recorded_date" >仕入日</th>
                    <th class="text-center vendor_nm">仕入先</th>
                    <th class="text-center item_nm">内容</th>
                    <th class="text-center cost_qty">数量</th>
                    <th class="text-center cost_upr">単価</th>
                    <th class="text-center cost_amt">仕入金額</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['project_no'])&&$data[0][0]['project_no'] != '')
                    <?php $i = 1 ?>
                    @foreach($data[0] as $row)
                        <tr>
                            <td class="text-center project_no" row_no = {{ $row['row_no'] }} specification_row_no= {{$row['specification_row_no']}}
                            order_dtl_no= {{$row['order_dtl_no']}} project_no={{$row['project_no']}}>{{ $i }}</td>
                            <td class="text-center cost_data_rpt_date">{!!isset($row['cost_data_rpt_date']) ? $row['cost_data_rpt_date'] : ''  !!}</td>
                            <td class="text-overfollow company_cd">{!!isset($row['project_no']) && $row['company_cd'] ? $row['company_cd'].'-'.$row['project_no'] : ''  !!}</td>
                            <td class="text-center purchase_recorded_date">{!!isset($row['purchase_recorded_date']) ? $row['purchase_recorded_date'] : ''  !!}</td>
                            <td class="text-overfollow vendor_nm">{!!isset($row['vendor_nm']) ? $row['vendor_nm'] : ''  !!}</td>
                            <td class="text-overfollow item_nm">{!!isset($row['item_nm']) ? $row['item_nm'] : ''  !!}</td>
                            <td class="cost_qty money">{!!isset($row['cost_qty']) ? number_format($row['cost_qty']) : ''  !!}</td>
                            <td class="money cost_upr">{!!isset($row['cost_upr']) ? number_format($row['cost_upr']) : ''  !!}</td>
                            <td class="money cost_amt">{!!isset($row['cost_amt']) ? number_format($row['cost_amt']) : ''  !!}</td>
                            <?php $i++; ?>
                        </tr>
                    @endforeach
                @else
                    <tr class="no-data">
                        <td colspan="9" class="text-center">
                            {{ !isset($data[0][0]['project_no'])  ? trans('translates.messages.17') : trans('translates.messages.11') }}
                        </td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div>
    </div>
</div>
