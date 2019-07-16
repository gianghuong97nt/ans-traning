@extends('layouts.main')
@section('title')
TEST
@endsection
@section('content')
<div class="form-group col-md-12">
	<label class="col-md-2 col-sm-2 col-xs-12 control-label lb-required">得意先</label>
	@include('popup.search_client')
</div>
@endsection