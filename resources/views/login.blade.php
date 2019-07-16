@extends('layouts.login')

@section('title')
	ログイン
@endsection


@section('stylesheet')
{!! public_url('modules/login/css/login.css')!!}
@endsection

@section('page_javascript')
{!! public_url('modules/login/js/login.js')!!}
@endsection


@section('content')

	<div class="content-wrapper">

		<!-- Form with validation -->
		<form autocomplete="off">
			{{-- {!! csrf_field() !!} --}}
			<div class="login-form">
				<div class="text-center">
					<div class=""><img src="images/tosgroup_logo.png" style="width: 235px;"></div>
					<h6 class="slogan-text" style="margin-bottom: 17px;"><small><strong>Performance, Creation, Support</strong></small></h6>
					<h5 class="content-group"><small><strong>TOSGROUP CORE SYSTEM</strong></small></h5>
				</div>

				<div class="form-group ">
					<input type="text" class="form-control login-input "  name="name" id="user_id" placeholder="ログインID" value="<?php if(isset($_COOKIE['user_id'])){
						echo($_COOKIE['user_id']);
					} ?>">
				</div>

				<div class="form-group " >
					<input type="password" class="form-control login-input " name="password" id="password" placeholder="パスワード" value="<?php if(isset($_COOKIE['password'])){
						echo($_COOKIE['password']);
					} ?>">
				</div>
				<div class="form-group" style="padding-bottom: 17px;">
					<button type="button" id="btn_login" class="btn bg-blue btn-block btn-login-size">ログイン <i class="icon-arrow-right14 position-right"></i></button>
				</div>
				<div class="text-center">
					<label class="checkbox-inline"><input type="checkbox" <?php if(isset($_COOKIE['password'])){
						echo 'checked';
					} ?> tabindex="56" id="remember_me">ログイン状態を保存する</label>
				</div>

			</div>
		</form>
		<!-- /form with validation -->

	</div>

@endsection

