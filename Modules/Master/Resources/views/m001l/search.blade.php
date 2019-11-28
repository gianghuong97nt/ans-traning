<div class="panel-heading ">
    <h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
    <div class="w-pading-bottom">
        @if(isset($data[1][0]['totalRecord'])&&$paging['totalRecord'] != 0)
            <div class="w-pading-search-top">
                <label style="margin-top: 5px;display: inline-block;">{{ Paging::showText($paging) }}</label>
                <div class=" text-right" style="display: inline-block;float: right;" tabindex="4">
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
                <tr class="col-table-header text-center">
                    <th class="text-center" width="60px">編</th>
                    <th class="text-center" width="60px">会社CD</th>
                    <th class="text-center" width="200px">会社名</th>
                    <th class="text-center" width="300px">住所</th>
                    <th class="text-center" width="100px">TEL</th>
                    <th class="text-center" width="100px">FAX</th>
                    <th class="text-center" width="300px">備考</th>
                </tr>
                </thead>
                <tbody>
                @if(isset($data[0][0]['company_cd']) && $data[0][0]['company_cd']!='')
                    @foreach($data[0] as $row)
                        <tr>
                            <td tabindex="5" class="text-center ">
                                <a class="link_section" id="btn-edit"
                                   company_cd={!! $row['company_cd'] !!} >

                                    <i class="fa fa-pencil fa-lg"></i>
                                </a>
                            </td>
                            {{--htmlentities se hien thi cac bieu tuong --}}
                            {{--vi du muon giu lai 5 dau cach ban chi su dung htmtentities, trong khi do
                             trinh duyet bt se loai bo 4 dau cach--}}
                            <td class="text-right " title="{!! $row['company_cd'] !!}">{!! $row['company_cd'] !!}</td>
                            <td class="text-overfollow" title="{!! $row['company_nm'] !!}">{!! htmlentities($row['company_nm']) !!}</td>
                            <td class="text-overfollow" title="{!! $row['company_adr'] !!}">
                                {!! $row['company_adr'] !!}</td>
                            <td class="text-right" title="{!! $row['company_tel'] !!}">{!! htmlentities($row['company_tel']) !!}</td>
                            <td class="text-right" title="{!! $row['company_fax'] !!}">{!! htmlentities($row['company_fax']) !!}</td>
                            <td class="text-overfollow" title="{!! $row['remarks'] !!}">{!! htmlentities($row['remarks']) !!}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td colspan="9" class="text-center">{!! trans('translates.messages.11') !!}</td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div><!--.table-responsive table-custom -->
    </div><!--.no-padding -->
</div>