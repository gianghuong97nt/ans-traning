<div class="panel-heading ">
    <h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
    <div class="no-padding">
        <div class="table-responsive table-custom wmd-view">
            <table class="table table-hover table-bordered table-xxs fixed-header" id="table-area" style="min-width: 1143px;">
                <thead>
                <tr class="col-table-header text-center">
                    <th class="text-center" style="min-width: 70px">案件NO</th>
                    <th class="text-center" style="min-width: 290px">案件名</th>
                    <th class="text-center" style="min-width: 290px">得意先名</th>
                    <th class="text-center" >売上年月</th>
                    <th colspan="2" class="text-center" style="min-width: 480px; max-width: 480px">担当者</th>
                    <th colspan="2" class="text-center" style="min-width: 480px; max-width: 480px">新担当者</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['project_no'])&&$data[0][0]['project_no'] != '')
                    @foreach($data[0] as $row)
                        <tr company_cd = {!! $row['company_cd'] !!}>
                            <td class="text-right project_no" project_no ={{$row['project_no']}} >
                                {!!isset($row['project_no'])?$row['project_no']:''  !!}</td>
                            <td class="text-left " >{!!isset($row['project_nm'])?$row['project_nm']:''   !!}</td>
                            <td class="text-overfollow">{!! isset($row['client_nm'])?$row['client_nm']:''  !!}</td>
                            <td class="text-center" >{!!isset($row['sales_recorded_date'])?$row['sales_recorded_date']:''  !!}</td>
                            <td class="text-right empcd_old" style="width: 140px;">{!!isset($row['emp_cd'])?$row['emp_cd']:''  !!}</td>
                            <td class="text-overfollow" style="width: 340px;">{!!isset($row['emp_nm'])?$row['emp_nm']:'' !!}</td>
                            <td style="width: 140px">
                                @include('popup.search_empcd', array('data'=>'lm003','key'=>$row['emp_cd'],'istable' => '1', 'col'=>'col-md-4 col-sm-5 col-xs-12',
                                'value'=>$row['emp_nm'],'name_id'=>'display_emp_nm', 'class'=>'emp_cd2 score'))
                            </td>
                            <td class="text-left text-overfollow w-160px emp_nm" title="{!! $row['emp_nm'] !!}">{!! htmlentities($row['emp_nm']) !!}</td>
                        </tr>
                    @endforeach
                @else
                    <tr class="no-data">
                        <td colspan="9" class="text-center">
                            {{ !isset($data[0][0]['project_no']) ? trans('translates.messages.17') : trans('translates.messages.11') }}
                        </td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div><!--.table-responsive table-custom -->
    </div><!--.no-padding -->
</div>
