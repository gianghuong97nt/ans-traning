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
						<th class="text-center" width="60px">得意先CD</th>
						<th class="text-center" width="160px">得意先名</th>
						<th class="text-center" width="160px">得意先名カナ</th>
						<th class="text-center" width="60px">支店CD</th>
						<th class="text-center" width="160px">支店名</th>
						<th class="text-center" width="160px">支店名カナ</th>
						<th class="text-center" width="100px">会社名</th>
						<th class="text-center" width="160px">得意先区分</th>
						<th class="text-center" width="80px">締日</th>
						<th class="text-center">備考</th>
					</tr>
				</thead>
				<tbody>
					@if($data[0][0]['client_cd'] != '')
					@foreach($data[0] as $row)	
					<tr>
						<td class="text-center ">
							<a class="link_section" 
								client_cd={!! $row['client_cd'] !!}
								client_br_cd={!! $row['client_br_cd'] !!}
								company_cd={!! $row['company_cd'] !!}>
							
								<i class="fa fa-pencil fa-lg"></i>
							</a>
						</td>
						<td class="text-overfollow" title="{!! $row['client_cd'] !!}">{!! $row['client_cd'] !!}</td>
						<td class="text-overfollow" title="{!! $row['client_nm'] !!}">{!! htmlentities($row['client_nm']) !!}</td>
						<td class="text-overfollow" title="{!! $row['client_kn_nm'] !!}">{!! htmlentities($row['client_kn_nm']) !!}</td>
						<td class="text-overfollow" title="{!! $row['client_br_cd'] !!}">{!! $row['client_br_cd'] !!}</td>
						<td class="text-overfollow" title="{!! $row['client_br_nm'] !!}">{!! htmlentities($row['client_br_nm']) !!}</td>
						<td class="text-overfollow" title="{!! $row['client_br_kn_nm'] !!}">{!! htmlentities($row['client_br_kn_nm']) !!}</td>
						<td class="text-overfollow" title="{!! $row['company_nm'] !!}">{!! htmlentities($row['company_nm']) !!}</td>
						<td class="text-overfollow" title="{!! $row['client_class_div_nm'] !!}">{!! htmlentities($row['client_class_div_nm']) !!}</td>
						<td class="text-overfollow text-center" title="{!! $row['closing_date_nm'] !!}">{!! htmlentities($row['closing_date_nm']) !!}</td>
						<td class="text-overfollow" title="{!! $row['remarks'] !!}">{!! htmlentities($row['remarks']) !!}</td>
					@endforeach
					@else
					<tr>
						<td colspan="11" class="text-center">{!! trans('translates.messages.11') !!}</td>
					</tr>
					@endif
				</tbody>
			</table>
		</div><!--.table-responsive table-custom -->
	</div><!--.no-padding -->
</div><!--.panel-body -->