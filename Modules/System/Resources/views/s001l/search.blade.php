<div class="panel-heading ">
	<h6 class="panel-title text-bold">参照一覧</h6>
</div>
<div class="panel-body w-pading-top">
	<div class="w-pading-bottom">
		@if($paging['totalRecord'] != 0)
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
					<tr class="col-table-header text-center">
						<th class="text-center" width="40px">編</th>
						<th class="text-center" width="80px">ユーザーID</th>
						<th class="text-center" width="20%">ユーザー名</th>
						<th class="text-center" width="20%">ユーザー名カナ</th>
						<th class="text-center" width="100px">ユーザー区分</th>
						<th class="text-center" width="200px">社員名</th>
						<th class="text-center">備考</th>
					</tr>
				</thead>
				<tbody>
				 @if($data[0][0]['user_id'] != '')
                        @foreach($data[0] as $row)	
							<tr>
								<td class="text-center ">
									<a class="link_section" 
										user_id={!! $row['user_id'] !!}
										emp_cd={!! $row['emp_cd'] !!}>
										<i class="fa fa-pencil fa-lg"></i>
									</a>
								</td>
								<td class="text-center text-overfollow" title="{!! $row['user_id'] !!}">{!! $row['user_id'] !!}</td>
								<td class="text-overfollow" title="{!! $row['user_nm'] !!}">{!! htmlentities($row['user_nm']) !!}</td>
								<td class="text-overfollow" title="{!! $row['user_kn_nm'] !!}">{!! $row['user_kn_nm'] !!}</td>
								<td class="text-center text-overfollow" title="{!! $row['user_div'] !!}">{!! htmlentities($row['name']) !!}</td>
								<td class="text-overfollow" title="{!! $row['emp_nm'] !!}">{!! htmlentities($row['emp_nm']) !!}</td>
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
<div class="w-pading-top">
	@if($paging['totalRecord'] != 0)
	<label style="margin-top: 5px;display: inline-block;">{{ Paging::showText($paging) }}</label>
	<div class=" text-right" style="display: inline-block;float: right;">
		<nav aria-label="Page navigation">
			{!!Paging::show($paging,0)!!}
		</nav>
	</div>
	@endif
</div>
</div><!--.panel-body -->