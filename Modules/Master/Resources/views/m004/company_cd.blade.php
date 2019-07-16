	<div class="col-md-8 col-sm-8 col-xs-12 ">
		<div class="form-group">
			@foreach($company_cd as $item )
			<div class="col-md-2 col-sm-2 col-xs-12" style="padding-left: 0px ;padding-right:0px">
				<label class="w-item-label text-overfollow">
					<input class="company_cd " type="checkbox" name="" value="{{$item['number']??''}}" {{$item['checkFlg']??''}}>
					<i class="margin-left-5px"></i>
					<span class="span-label light-weight" title="{{$item['name']??''}}">{{$item['name']??''}}</span>
				</label>
			</div>
			@endforeach
		</div>
	</div>
