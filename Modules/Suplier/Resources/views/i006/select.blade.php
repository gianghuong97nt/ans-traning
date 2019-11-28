<option value="-1"></option>
@if(isset($data2)&&$data2[1][0]['number_no'] != '')
	@foreach($data2[1] as $item)
		<option value="{{$item['number_no']}}">{{$item['name']}}</option>
	@endforeach
@endif