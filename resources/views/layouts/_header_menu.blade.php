<div class="navbar navbar-default navbar-fixed-top navbar-menu">
	<div class="col-xs-12 no-padding show-menu">
		<h3 class="screen-title">
			@yield('title')
		</h3>
		<div style="display: inline-block;float: right;">
			@yield('button')
		</div>
	</div>
	<div class="col-xs-12 no-padding hide-menu collapse">
		<div style="display: inline-block;float: right;">
			@yield('button')
		</div>
	</div>
</div>