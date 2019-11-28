<div class="panel-heading ">
    <h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
    <div class="no-padding">
        <div class="wmd-view-topscroll">
            <div class="scroll-div1"></div>
        </div>
        <div class="table-responsive table-custom wmd-view report_point">
            <table class="table  table-bordered table-xxs fixed-header" id="table-area" style="min-width: 1280px">
                <thead>
                    <tr class="col-table-header text-center sticky-row">
                        <th class="text-center sticky-cell" rowspan="2"style="top: 0px; left: 0px;width: 50px">No</th>
                        <th class="text-center" rowspan="2"  style="top: 0px;width: 170px">案件NO</th>
                        <th class="text-center" style="top: 0px;width: 220px">案件名</th>
                        <th class="text-center" style="top: 0px;max-width: 425px;">部材名</th>
                        <th class="text-center" style="top: 0px;width: 150px">数量</th>
                        <th class="text-center" style="top: 0px;width: 150px">実入庫数</th>
                        <th class="text-center" style="top: 0px;width: 300px">入荷元</th>
                    </tr>
                    <tr class="col-table-header text-center sticky-row">
                        <th class="text-center"  style="top: 0px;width: 220px">アイテム</th>
                        <th class="text-center"  style="top: 0px;max-width: 425px;">サイズ名</th>
                        <th class="text-center"  style="top: 0px;width: 150px">納品日</th>
                        <th class="text-center"  style="top: 0px;width: 150px">状態</th>
                        <th class="text-center"  style="top: 0px;width: 300px">備考</th>
                    </tr>
                </thead>
                <tbody>
                    @if(isset($data[0][0]['company_cd'])&&$data[0][0]['company_cd'] != '')
                    @foreach($data[0] as $row)  
                    <tr class="h-26 tr-1" tr_id ="{{$row['id']}}">
                        <td hidden>
                            <input class="company_cd"  value="{{$row['company_cd']}}" hidden="hidden">
                            <input class="project_no"  value="{{$row['project_no']}}" hidden="hidden">
                            <input class="project_dtl_no"  value="{{$row['project_dtl_no']}}" hidden="hidden">
                            <input class="specification_row_no"  value="{{$row['specification_row_no']}}" hidden="hidden">
                            <input class="order_dtl_no"  value="{{$row['order_dtl_no']}}" hidden="hidden">
                        </td>
                        <td class="text-overfollow text-center id_row" rowspan="2">{{$row['id']}}</td>
                        <td class="text-right text-overfollow company_project" title="{{$row['company_project']}}">{{$row['company_project']}}</td>
                        <td class="text-left text-overfollow project_nm" title="{{$row['project_nm']}}">{{$row['project_nm']}}</td>
                        <td class="text-left text-overfollow parts_nm"style="max-width: 425px;" title="{{$row['parts_nm']}}">{{$row['parts_nm']}}</td>
                        <td class="text-right text-overfollow arrival_qty" title="{{$row['arrival_qty']}}">{{$row['arrival_qty']}}</td>
                        <td>
                            <input  type="text" class="form-control text-right money real_arrival_qty score" real_len="11" value="{{$row['real_arrival_qty']}}">
                        </td>
                        <td>
                            <input type="text" class="form-control stock_source score" value="{{$row['stock_source']}}" maxlength="50">
                        </td>  
                        <tr class="h-26 tr-2" tr_id ="{{$row['id']}}">
                           <td></td>
                           <td class="text-left text-overfollow item_nm" title="{{$row['item_nm']}}">{{$row['item_nm']}}</td>
                           <td class="text-left text-overfollow size_nm" title="{{$row['size_nm']}}">{{$row['size_nm']}}</td>
                           <td class="text-left space-2p">
                            <input type="tel" class="form-control datepicker arrival_date score" value="{{$row['arrival_date']}}">
                        </td>
                        <td>
                            <select name="" id="" class="form-control status_div" style="width: 100%;">
                                <option value="-1"></option>
                                @foreach($data1 as $item)
                                <option value="{{$item['status_div']}}" {{$row['status_div'] == $item['status_div'] ?'selected':''}}>{{$item['name']}}</option>
                                @endforeach
                            </select>
                        </td>
                        <td>
                            <div>
                                <input class="form-control remarks score" type="text" value="{{$row['remarks']}}"  maxlength="50">
                            </div>
                        </td>
                    </tr>
                    @endforeach
                    @else
                    <tr class="disable-selection">
                       @if(isset($data[0][0]['company_cd']))
                       <td colspan="11" class="text-center">{!! trans('translates.messages.11') !!}</td>
                       @else
                       <td colspan="11" class="text-center">{!! trans('translates.messages.17') !!}</td>
                       @endif
                   </tr>
                   @endif
               </tbody>
           </table>
       </div><!--.table-responsive table-custom -->
   </div><!--.no-padding -->
</div>
