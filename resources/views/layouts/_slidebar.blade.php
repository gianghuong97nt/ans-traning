<div class="sidebar sidebar-main sidebar-fixed">
	<div class="sidebar-content">
		<!-- Main navigation -->
		<div class="sidebar-category sidebar-category-visible">
			<div class="category-content no-padding">
				<ul class="navigation navigation-main navigation-accordion">
					<!-- Main -->
					@php($group='0')
					@foreach (Session::get('sidebar_data') as $sidebar_item)
					@if(isset($sidebar_item['prg_id'])&&$sidebar_item['prg_id']!='')
					@if($group!=$sidebar_item['prg_group'])
					<li>
						<a href="#"><i class="icon-copy"></i> <span>{{$sidebar_item['name']}}</span></a>
							<ul>
								@foreach (Session::get('sidebar_data') as $sidebar_item1)
								@if($sidebar_item['prg_group']==$sidebar_item1['prg_group']&&$sidebar_item1['avail_mnu_typ']=='1')
								<li><a href="{{$sidebar_item1['prg_url']}}">{{$sidebar_item1['prg_nm']}}</a></li>
								@endif
								@endforeach
							</ul>
					</li>
					@php($group=$sidebar_item['prg_group'])
					@endif
					@endif
					@endforeach
				</ul>
			</div>
		</div>
		<!-- /main navigation -->
	</div>
</div>
<!-- /main sidebar