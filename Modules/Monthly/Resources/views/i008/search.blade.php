<div class="no-padding">
        <div class="table-responsive table-custom wmd-view">
            <table class="table table-hover table-bordered table-xxs " id="table-area" style="min-width: 1143px;">
                <thead>
                    <tr class="col-table-header text-center">
                        <th class="text-center" style="min-width: 110px">月</th>
                        <th class="text-center" style="min-width: 220px">売上予算</th>
                        <th class="text-center" style="min-width: 220px">利益予算</th>
                        <th class="text-center" style="min-width: 250px">利益率</th>
                    </tr>
                </thead>
                <tbody>
                    @if(isset($data[0]))
                        @foreach($data[0] as $row)
                        <tr company_cd = {{-- {!! $row['company_cd'] !!} --}}>
                            <td class="text-center project_no" project_no ={{$row['month']}} >{{$row['month']}}
                                <input class="month" type="hidden"  value="{!!isset($row['month'])?$row['month']:'' !!}" style="width: 100%">

                            </td>
                            <td class="text-left " >
                                <input type="text" class="form-control money order_upr score sales_estimate_amt" real_len="11" maxlength="11"  value="{!!isset($row['sales_estimate_amt'])?$row['sales_estimate_amt']:''   !!}" style="width: 100%">
                            </td>
                            <td><input type="text" class="form-control money order_upr score gross_estimate_amt" real_len="11" maxlength="11" value="{!!isset($row['gross_estimate_amt'])?$row['gross_estimate_amt']:''   !!}"  style="width: 100%"></td>
                            <td class="text-center profit numeric" >{!!(isset($row['percent']) && $row['percent']!='')?$row['percent']:''  !!}</td>
                        </tr>
                        @endforeach
                        @else
                        <tr class="no-data">
                            <td colspan="9" class="text-center">
                                {{ !isset($data[0][0]['sales_estimate_amt']) ? trans('translates.messages.17') : trans('translates.messages.11') }}
                            </td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div><!--.table-responsive table-custom -->
 </div><!--.no-padding -->
