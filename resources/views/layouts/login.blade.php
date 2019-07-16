<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf-token" content="{{ csrf_token() }}" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>@yield('title')</title>

	<!-- Global stylesheets -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
	{!! public_url('css/icons/icomoon/styles.css')!!}
	{!! public_url('css/icons/fontawesome/css/font-awesome.min.css')!!}
	{!! public_url('css/bootstrap.css')!!}
	{!! public_url('css/core.css')!!}
	{!! public_url('css/components.css')!!}
	{!! public_url('css/colors.css')!!}
	{!! public_url('css/jquery.alerts.css')!!}
	{!! public_url('css/colorbox.css')!!}
	{!! public_url('css/animate.css')!!}
	{!! public_url('modules/auth/css/login.css')!!}
	@yield('stylesheet')
	<!-- /global stylesheets -->

	<!-- Core JS files -->
	{!! public_url('js/core/libraries/jquery.min.js')!!}
	{!! public_url('js/core/libraries/jquery_ui/jquery-ui.min.js')!!}
	{!! public_url('js/core/libraries/bootstrap.min.js')!!}
	{!! public_url('js/plugins/loaders/blockui.min.js')!!}
	{!! public_url('js/plugins/ui/nicescroll.min.js')!!}
	{!! public_url('js/plugins/ui/drilldown.js')!!}
	{!! public_url('js/plugins/ui/moment/moment.min.js')!!}
	{!! public_url('js/common/jquery.utility.js')!!}
{{--	{!! Html::script('assets/js/common/jquery.validate.js')!!}--}}
	{!! public_url('js/core/app.js')!!}
	{!! public_url('js/common/jquery.alerts.js')!!}
	{!! public_url('js/common/jquery.colorbox.js')!!}
	{!! public_url('js/plugins/pickers/datepicker/bootstrap-datepicker.min.js')!!}
	{!! public_url('locales/bootstrap-datepicker.ja.min.js')!!}
	{{-- jquery format number --}}
	{!! public_url('js/plugins/forms/inputs/autoNumeric-min.js')!!}

	<!-- common jquery for Souei -->
	{!! public_url('js/message/msg.js')!!}
	{!! public_url('js/common/common.js')!!}
	<!-- /core JS files -->
		
</head>

<body class="login-container login-cover">

	<!-- Page container -->
	<div class="page-container">

		<!-- Page content -->
		<div class="page-content">
			<!-- Main content -->
			@yield('content')
			<!-- /main content -->

		</div>
		<!-- /page content -->

	</div>
	<!-- /page container -->

</body>

</html>
<!-- form's Jquery -->
@yield('page_javascript')
<!-- /form's  Jquery -->
