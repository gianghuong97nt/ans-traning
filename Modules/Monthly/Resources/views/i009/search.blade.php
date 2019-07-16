<div class="panel-heading ">
    <h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
    <div class="no-padding">
        <div class="wmd-view-topscroll">
            <div class="scroll-div1"></div>
        </div>
        <div class="table-responsive table-custom wmd-view">
            <table class="table table-hover table-bordered table-xxs fixed-header" id="table-area" style="min-width: 1143px;">
                <thead>
                <tr class="col-table-header text-center">
                    <th class="text-center" style="width: 5%">案件NO</th>
                    <th class="text-center" style="width: 20%">案件名</th>
                    <th class="text-center" style="width: 20%">得意先名</th>
                    <th class="text-center" style="width: 5%">売上年月</th>
                    <th colspan="2" class="text-center" style="width: 20%">担当者</th>
                    <th colspan="2" class="text-center" style="width: 530px">新担当者</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['project_no'])&&$data[0][0]['company_cd'] != '')
                    @foreach($data[0] as $row)
                        <tr company_cd = {!! $row['company_cd'] !!}>
                            <td class="text-right project_no" project_no ={{$row['project_no']}} >
                                {!!isset($row['project_no'])?$row['project_no']:''  !!}</td>
                            <td class="text-left " >{!!isset($row['project_nm'])?$row['project_nm']:''   !!}</td>
                            <td class="text-overfollow">{!! isset($row['client_nm'])?$row['client_nm']:''  !!}</td>
                            <td class="text-overfollow" >{!!isset($row['sales_recorded_date_to'])?$row['sales_recorded_date_to']:''  !!}</td>
                            <td class="text-right" >{!!isset($row['emp_cd'])?$row['emp_cd']:''  !!}</td>
                            <td class="text-overfollow" >{!!isset($row['emp_nm'])?$row['emp_nm']:'' !!}</td>
                            <td class=" form-group">
                                <div class="input-group" style="display: inline-block; width: 100px" >
                                    <input type="text" class="form-control left-radius right-radius text-right emp_cd"
                                           value="{!!isset($row['emp_cd'])?$row['emp_cd']:'' !!}" style="width: 68px">
                                    <span class="input-group-btn" style="margin-left: -1px!important;">
                                        <button type="button" class="btn btn-primary btn-icon btn-search"><i class="icon-search4"></i></button>
                                    </span>
                                </div>

                            </td>
                            <td class="form-group">
                                <span class=" emp_nm text-overfollow" style="display:inline-block; width: 430px">
                                    {!!isset($row['emp_nm'])?$row['emp_nm']:'' !!}
                                </span>

                            </td>
                        </tr>
                    @endforeach
                @else
                    <tr class="no-data">
                        <td colspan="9" class="text-center">{!! trans('translates.messages.11') !!}</td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div><!--.table-responsive table-custom -->
    </div><!--.no-padding -->
</div>