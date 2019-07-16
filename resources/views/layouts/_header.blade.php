<div class="navbar navbar-default navbar-fixed-top header-highlight">
	<div class="navbar-header">
		<a class="navbar-brand" href="/system/db001"></a>
		<label class="navbar-brand-name">メニュー</label>
		<ul class="nav navbar-nav visible-xs-block">
			<li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
			<li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
		</ul>
	</div>

	<div class="navbar-collapse collapse" id="navbar-mobile">
		<ul class="nav navbar-nav">
			<li class="" style="display: flex;">
				<a class="sidebar-control sidebar-main-toggle hidden-xs" style="padding-top: 15px;float: left;">
					<i class="icon-paragraph-justify3" style="margin-right: 5px"></i>
				</a>
				<a class="" style="padding-top: 7px;float: left;" href="/system/db001">
					<img src="/images/logo.png" style="max-height: 28px">
				</a>
			</li>			
		</ul>

		<ul class="nav navbar-nav navbar-right">
			<li class="dropdown" style="display: block;">
				<a class="dropdown-toggle" data-toggle="dropdown" style="padding-top: 13px;min-height: 46px">
					<i class="positon-left glyphicon glyphicon-user" style="float: left;padding-top: 3px;height: 20px"></i>
					<span class="header-resp" style="float: left;padding-top: 0px;height: 20px"
						title="<?php if (Session::get('user_id')) {
							echo Session::get('user_id');
							echo ":";
							echo Session::get('user_name');}?>">
							<?php if (Session::get('user_id')) {
								echo Session::get('user_id');
								echo ":";
								echo Session::get('user_name');
							}?> 
					</span>
					<i class="caret sub-user-info-show2" style="float: right;padding-top: 1px"></i>
				</a>
				<ul class="dropdown-menu dropdown-menu-right dropdown-info">
					<li><a href="#"><i class="icon-user-plus"></i> My profile</a></li>
					<li><a href="#"><i class="icon-coins"></i> My balance</a></li>
					<li><a href="#"><i class="icon-comment-discussion"></i> Messages</a></li>
					<li class="divider"></li>
					<li><a href="/master/changepassword"><i class="icon-user-lock"></i> Change password</a></li>
					<li>
						{{--<a href="{{ url('/logout') }}" id="logout-link"--}}
						   {{--onclick="event.preventDefault();--}}
								 {{--document.getElementById('logout-form').submit();">--}}
							{{--<i class="icon-switch2"></i>Logout--}}
						{{--</a>--}}
						{{--<form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">--}}
							{{--{{ csrf_field() }}--}}
						{{--</form>--}}
					</li>
				</ul>
			</li>
			<li class="dropdown dropdown-user" style="padding-top: 1px">
				<a id="btn-logout" class="">
					<i class="positon-left glyphicon glyphicon-log-out"></i>
					<span>Log out</span>
				</a>
			</li>			
		</ul>
	</div>
</div>