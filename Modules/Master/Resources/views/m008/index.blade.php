@extends('layouts.main')

@section('title')
価格マスタ
@endsection

@section('button')
{{Button::button_left(array('btn-save'),(isset($permission[$route])?$permission[$route]:[]))}}
@endsection

@section('stylesheet')
{!! public_url('modules/master/css/m008.css')!!}
@endsection

@section('page_javascript')
{!! public_url('modules/master/js/m008.js')!!}
@endsection


@section('content')
<div class="row form-horizontal">
	<!-- Search field -->
	<div class="panel panel-flat">
		<div class="panel-heading">
			<h6 class="panel-title text-bold">
				基本情報
			</h6>
			<div class="heading-elements">
				<ul class="icons-list">
					<li>
						<a data-action="collapse">
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="panel-body">
			<div class="form-group">
				<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">種別</label>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<select name="" id="type_div" class="form-control required">
						<option value="-1"></option>
						@foreach($data2[0] as $item)
						<option 
						value="{{$item['number_cd']}}">{{$item['name']}}
					</option>
					@endforeach
				</select>
			</div>
		</div><!--form-group-->
	</div>
	<!--.col-md-12 -->
</div>
<div class="panel panel-flat" id="result">
	<div class="panel-heading">
		<h6 class="panel-title text-bold">
			明細
		</h6>
	</div>
	<div class="panel-body w-pading-top">
		<div class="w-pading-bottom">
		</div>
		<div class="no-padding">
			<div class="wmd-view-topscroll">
				<div class="scroll-div1"></div>
			</div>
			<div class="table-responsive table-custom wmd-view">
				<table class="table table-hover table-bordered table-xxs w-ipad fixed-header" id="table-data" style="min-width: 1143px;">
					@include('master::m008.search')
				</table>
				<table id="table-hidden" hidden>
					<tbody>
						<tr class="">
							<td><input type="text" class="form-control text-left type1 required" maxlength="20" ></td>
							<td><input type="text" class="form-control text-left type2 required" maxlength="30" ></td>
							<td><input type="text" class="form-control text-left size required" maxlength="10" ></td>
							<td>
								<input type="tel" class="form-control money range_st required" real_len="9" decimal_len="2" negative="1" >
							</td>
							<td>
								<input type="tel" class="form-control money range_ed required" real_len="9" decimal_len="2" negative="1" >
							</td>
							@foreach($data3[0] AS $row)
							<td {{$row['number_cd']===''?'hidden':''}}>
								<input type="tel" class="form-control money colum_{{$row['number_cd']}}"  real_len="9" decimal_len="2" negative="1" >
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
				</table>
			</div>
		</div>
	</div>
</div>
</div>
<!--.row -->

@stop
@section('_registration_footer')
<div id="registration_footer">
	@include('layouts._registration_footer')
</div>
@stop
