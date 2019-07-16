<div class="navbar navbar-default navbar-fixed-bottom bottom-content navbar-copyright" style="z-index: 0">	
	<div class="" id="">
		<ul class="nav navbar-nav bot-info" style="float:right">
			<li class="registation_info" style="width:350px;margin-right: 10px;">
				<label class="lb-type" style="padding-right: 15px;">登録 :</label>
				<label class="lb-userid">{{(isset($createUpdate['cre_user']) && $createUpdate['cre_user'] != '')? $createUpdate['cre_user'].':' :''}}</label>
				<label class="lb-username" title = "{{isset($createUpdate['cre_user_nm'])?$createUpdate['cre_user_nm']:''}}">{{isset($createUpdate['cre_user_nm'])?$createUpdate['cre_user_nm']:''}}</label>
				<label class="lb-time">{{(isset($createUpdate['cre_date']) && $createUpdate['cre_date'] != '')? '['.$createUpdate['cre_date'].']':''}}</label>
			</li>
			<li class="update_info" style="width:350px;margin-right: 20px;">
				<label class="lb-type" style="padding-right: 15px;">更新 :</label>
				<label class="lb-userid">{{(isset($createUpdate['upd_user']) && $createUpdate['upd_user'] != '')?$createUpdate['upd_user'].':':''}}</label>
				<label class="lb-username" title = "{{isset($createUpdate['upd_user_nm'])?$createUpdate['upd_user_nm']:''}}">{{isset($createUpdate['upd_user_nm'])?$createUpdate['upd_user_nm']:''}}</label>
				<label class="lb-time">{{(isset($createUpdate['upd_date']) && $createUpdate['upd_date'] != '')? '['.$createUpdate['upd_date'].']':''}}</label>
			</li>
		</ul>
	</div>
</div>
