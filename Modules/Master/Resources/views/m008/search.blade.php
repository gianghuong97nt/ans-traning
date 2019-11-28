<?php
	isset($data3[0])?$cost = $data3[0]:NULL;
	isset($data[2])?$cost = $data[2]:NULL;

?>

<thead>
	<tr class="col-table-header text-center">
		<th class="text-center" width="">種類</th>
		<th class="text-center" width="">銘柄、面、品名</th>
		<th class="text-center" width="">サイズ</th>
		<th class="text-center" width="9%">MIN</th>
		<th class="text-center" width="9%">MAX</th>

		@foreach($cost AS $row)
		<th class="text-center" width="9%" number_cd="{{isset($row['number_cd'])?$row['number_cd']:''}}" {{$row['number_cd']===''?'hidden':''}}>{{isset($row['name'])?$row['name']:''}}</th>
		@endforeach

		<th class="text-center" width="32px">
			<button class="btn btn-default btn-primary btn-add" style="width:26px;" >+</button> 
		</th>
	</tr>
</thead>
@if(isset($data))
@if($data[3][0]['type_div'] !='')
@foreach($data[0] as $row)
<tbody>
	<tr class="tr-list">
		<td><input type="text" class="form-control text-left type1 required" maxlength="20" value="{{$row['type1']}}"></td>
		<td><input type="text" class="form-control text-left type2 required" maxlength="30" value="{{$row['type2']}}"></td>
		<td><input type="text" class="form-control text-left size required" maxlength="10" value="{{$row['size']}}"></td>
		<td>
			<input type="tel" class="form-control money range_st required" real_len="9" decimal_len="2" negative="1"value="{{$data[3][0]['type_div']!=4?'':$row['range_st']}}" {{$data[3][0]['type_div'] != 4?'readonly':''}}>
		</td>
		<td>
			<input type="tel" class="form-control money range_ed required" real_len="9" decimal_len="2" negative="1"value="{{$data[3][0]['type_div']!=4?'':$row['range_ed']}}"  {{$data[3][0]['type_div'] != 4?'readonly':''}}>
		</td>

		@foreach($cost AS $row2)
		<td {{$row2['number_cd']===''?'hidden':''}}>
			<input type="tel" class="form-control money colum_{{$row2['number_cd']}}" real_len="9" decimal_len="2" negative="1" value="{{$row[$row2['number_cd']]}}" >
		</td>
		@endforeach


		<td hidden>
			<input type="tel" class="mode" value="1">
		</td>
		<td class="text-center">
			<button class="btn btn-default btn-danger btn-delete2" style="width:26px;">x</button> 
		</td>
	</tr>
@endforeach
@else
	<tr class="tr-list">
		<td><input type="text" class="form-control text-left type1 required " maxlength="20" ></td>
		<td><input type="text" class="form-control text-left type2 required" maxlength="30" ></td>
		<td><input type="text" class="form-control text-left size required" maxlength="10" ></td>
		<td>
			<input type="tel" class="form-control money range_st required" real_len="9" decimal_len="2" negative="1"  {{$data[3][0]['type_div'] != 4?'readonly="readonly"':''}}>
		</td>
		<td>
			<input type="tel" class="form-control money range_ed required" real_len="9" decimal_len="2" negative="1"  {{$data[3][0]['type_div'] != 4?'readonly="readonly"':''}}>
		</td>


		@foreach($cost AS $row)
		<td {{$row['number_cd']===''?'hidden':''}}>
			<input type="tel" class="form-control money colum_{{$row['number_cd']}}" real_len="9" decimal_len="2" negative="1" >
		</td>
		@endforeach


		<td hidden>
			<input type="tel" class="mode" value="0">
		</td>
		<td class="text-center">
			<button class="btn btn-default btn-danger btn-delete2" style="width:26px;">x</button> 
		</td>					
	</tr>
</tbody>
@endif
@else
<tr class="tr-list">
		<td><input type="text" class="form-control text-left type1 required " maxlength="20" ></td>
		<td><input type="text" class="form-control text-left type2 required" maxlength="30" ></td>
		<td><input type="text" class="form-control text-left size required" maxlength="10" ></td>
		<td>
			<input type="tel" class="form-control money range_st required" real_len="9" decimal_len="2" negative="1" readonly="readonly">
		</td>
		<td>
			<input type="tel" class="form-control money range_ed required" real_len="9" decimal_len="2" negative="1"  readonly="readonly">
		</td>


		@foreach($cost AS $row)
		<td {{$row['number_cd']===''?'hidden':''}}>
			<input type="tel" class="form-control money colum_{{$row['number_cd']}}" real_len="9" decimal_len="2" negative="1" >
		</td>
		@endforeach


		<td hidden>
			<input type="tel" class="mode" value="0">
		</td>
		<td class="text-center">
			<button class="btn btn-default btn-danger btn-delete2" style="width:26px;">x</button> 
		</td>					
	</tr>
@endif