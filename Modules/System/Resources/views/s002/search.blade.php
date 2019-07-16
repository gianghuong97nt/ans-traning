@if($data[0]['prg_id'] != '')
	<?php $i = 0;?>
	@foreach($data as $row)
		<tr>
			<td class="text-center prg_id">{!! $row['prg_id'] !!}</td>
			<td class="text-left text-overfollow" title="{!! $row['prg_nm'] !!}">{!! $row['prg_nm'] !!}</td>
			<td class="text-center"><input type="checkbox" class="avail_typ" {!! $row['avail_typ'] == 1?'checked':'' !!}></td>
			<td class="text-center"><input type="checkbox" class="avail_mnu_typ" {!! $row['avail_mnu_typ'] == 1?'checked':'' !!}></td>
			<td class="text-center"><input type="checkbox" class="avail_upd_typ" {!! $row['avail_upd_typ'] == 1?'checked':'' !!}></td>
			<td class="text-center"><input type="checkbox" class="avail_del_typ" {!! $row['avail_del_typ'] == 1?'checked':'' !!}></td>
			<td class="text-center"><input type="checkbox" class="avail_out_typ" {!! $row['avail_out_typ'] == 1?'checked':'' !!}></td>
			<td>
				<input type="text" class="form-control text-left text-overfollow remarks" title="{!! $row['remarks'] !!}" maxlength="100"
					   value="{!! $row['remarks'] !!}">
			</td>
		</tr>
		<?php $i = $i + 1;?>
	@endforeach
@else
	<tr>
		<td colspan="8" class="text-center">{!! trans('translates.messages.11') !!}</td>
	</tr>
@endif