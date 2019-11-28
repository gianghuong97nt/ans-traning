<div class="panel-heading ">
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
        <div class="wmd-view-topscroll">
            <div class="scroll-div1"></div>
        </div>
        <div class="table-responsive table-custom wmd-view">
            <table class="table table-hover table-bordered table-xxs fixed-header" id="table-area" style="min-width: 1143px;">
                <thead>
                    <tr class="col-table-header text-center" style="width: 100%">
                        <th class="text-center" style="width: 40px">NO</th>
                        <th class="text-center" style="width: 35px">
                            <input id="child-set" type="checkbox">      
                        </th>
                        <th class="text-center" style="width: 180px">工程</th>
                        <th class="text-center" style="width: 150px">発注NO</th>
                        <th class="text-center">内容</th>
                        <th class="text-center" style="width: 80px">数量</th>
                        <th class="text-center" style="width: 120px">単価</th>
                        <th class="text-center" style="width: 120px">発注金額</th>
                        <th class="text-center" style="width: 120px">売上金額</th>
                        @if(isset($data[0][0]['order_dtl_no'])&&$data[0][0]['order_dtl_no'] != '')
                            <th  colspan="2" class="text-center" >仕入先</th>
                        @else 
                            <th style="width: 200px"  class="text-center" >仕入先</th>
                        @endif
                        <th class="text-center" style="width: 80px">利益率</th>
                    </tr>
                </thead>
                <tbody>
                    @if(isset($data[0][0]['order_dtl_no'])&&$data[0][0]['order_dtl_no'] != '')
                    @foreach($data[0] as $row)  
                    <tr>
                        <td class="text-overfollow text-center id_row">{{$row['id']}}</td>
                        <td class="text-center space-2p">
                            <input class="child-set"  type="checkbox"{{$row['sales_status_div']!=4 &&$row['cost_status_div']!=3?'':'hidden="hidden"'}}>
                            <input class="company_cd"  value="{{$row['company_cd']}}" hidden="hidden">
                            <input class="project_no"  value="{{$row['project_no']}}" hidden="hidden">
                            <input class="project_dtl_no"  value="{{$row['project_dtl_no']}}" hidden="hidden">
                            <input class="specification_row_no"  value="{{$row['specification_row_no']}}" hidden="hidden">
                            <input class="order_dtl_no"  value="{{$row['order_dtl_no']}}" hidden="hidden">

                        </td>
                        <td class="text-overfollow text-center detail_type_div_name" title="{{$row['detail_type_div_name']??''}}">{{$row['detail_type_div_name']}}</td>
                        <td class="text-overfollow numeric order_no" title="{{$row['order_no']??''}}">{{$row['order_no']}}</td>
                        <td class="text-overfollow contents " title="{{$row['contents']??''}}">{{$row['contents']}}</td>
                        <td class="text-overfollow numeric order_qty" title="{{$row['order_qty']??''}}">{{$row['order_qty']}}</td>
                        <td>
                            <input type="text" class="form-control money order_upr score" real_len="11"{{$row['sales_status_div']!=4 && $row['cost_status_div']!=3?'':'readonly="readonly"'}} maxlength="11"  value="{{$row['order_upr']}}">
                        </td>
                        <td>
                            <input type="text" class="form-control money order_amt score" real_len="11"{{$row['sales_status_div']!=4 && $row['cost_status_div']!=3?'':'readonly="readonly"'}} maxlength="11" order_amt="{{$row['order_amt']}}" value="{{$row['order_amt']}}">
                        </td>
                        <td>
                            <input type="text" class="form-control money sales_amt score" real_len="11"{{$row['sales_status_div']!=4 && $row['cost_status_div']!=3?'':'readonly="readonly"'}} maxlength="11" value="{{$row['sales_amt']}}">
                        </td>
                        <td  style="width: 100px" class="numeric vendor text-overfollow" title="{{$row['vendor']}}">{{$row['vendor']}} </td>
                        <td  style="width: 120px" class="vendor_nm text-overfollow" title="{{$row['vendor_nm']}}">{{$row['vendor_nm']}}</td>
                        <td class="profit numeric text-overfollow" title="{{$row['profit']}}">{{$row['profit']}}</td>
                    </tr> 
                    @endforeach
                    @else
                    <tr class="disable-selection">
                         @if(isset($data[0][0]['order_dtl_no']))
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
