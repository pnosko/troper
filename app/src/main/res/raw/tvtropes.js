try {

	//global variable for async
	var propertag = propertag || {};
	propertag.cmd = propertag.cmd || [];

	//Set Options
	(function(win, document) {

		var ad_code_domain = "global.proper.io" || "global.proper.io"; // domain to load ad code from
		var session_persistent = 1; // User keeps same version id throughout session
		var last_release_ts = "2021-09-23 12:33:56";  // Last time a file was released from split test
		var publisher = "tvtropes";
		var proper_ad_block_message = 0; // Flag if proper ad block message should be enabled

		var cookie_name = "proper_rtp_split_test";
		var cookieData  = {
			"version_id": null, // Session version id
			"release_ts": null  // Time this cookie was set
		}

		/**
		 * Rtp Files.
		 *
		 * If One Version:
		 *
		 * { version_id: config }
		 *
		 * If Split version:
		 *
		 * { version_id: rtp_version_id }
		 */

		// List of rtp files
		var rtp_files = {"9159":{"domain":"tvtropes.org","floors":{"mobile":{"sizes":{"400x300":1,"640x480":1,"sticky_horizontal":1},"backup":0.1},"desktop":{"sizes":{"400x300":1,"640x480":1,"sticky_horizontal":1},"backup":0.1}},"schain":{"ver":"1.0","nodes":[{"hp":1,"asi":"proper.io","sid":"e5961777-eb92-11e9-a488-69e3386c7506"}],"complete":1},"bidders":{"s2s":{"xandr_s2s":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["19522226"],"300x250":["14118420","5701986"]}],"desktop":[{"728x90":["5701670"],"160x600":["5701931","6052230"],"300x250":["5701931","6052230"],"300x600":["5701931","6052230"]}]}},"gumgum_s2s":{"enabled":true,"site_id":"20a29e19","tag_ids":{"mobile":[{"sticky_horizontal":["1"]}],"desktop":[{"sticky_horizontal":["1"]}]}},"beeswax_s2s":{"enabled":true,"site_id":"tvtropes","tag_ids":{"mobile":[{"320x50":["mobile-3"],"300x250":["mobile-1","mobile-2"]}],"desktop":[{"728x90":["desktop-3"],"160x600":["desktop-1","desktop-2"],"300x250":["desktop-1","desktop-2"],"300x600":["desktop-1","desktop-2"]}]}},"pubmatic_s2s":{"enabled":true,"tag_ids":{"desktop":[{"728x90":["2934118"],"160x600":["2934121"],"300x250":["2934119"],"300x600":["2934120"]},{"728x90":["2934118"],"160x600":["2934121"],"300x250":["2934119"],"300x600":["2934120"]}]}},"mediagrid_s2s":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["5765"],"300x250":["5763","5764"]}],"desktop":[{"728x90":["5762"],"160x600":["5760","5761"],"300x250":["5760","5761"],"300x600":["5760","5761"]}]}},"aol_instream_s2s":{"test":false,"enabled":true,"tag_ids":{"desktop":[{"640x480":["1"]}]}},"aol_outstream_s2s":{"enabled":true,"tag_ids":{"mobile":[{"400x300":["1"]}],"desktop":[{"640x480":["1"]}]}},"verizon_media_s2s":{"test":false,"enabled":true,"site_id":"8a96901a01757566150f67e5baff004b","tag_ids":{"mobile":[{"320x50":["8a96901a01757566150f67eadb1c007e-3"],"300x250":["8a96901a01757566150f67eadb1c007e-1","8a96901a01757566150f67eadb1c007e-2"]}],"desktop":[{"728x90":["8a969d8c01757566111467eada750096-3"],"160x600":["8a969d8c01757566111467eada750096-1","8a969d8c01757566111467eada750096-2"],"300x250":["8a969d8c01757566111467eada750096-1","8a969d8c01757566111467eada750096-2"],"300x600":["8a969d8c01757566111467eada750096-1","8a969d8c01757566111467eada750096-2"]}]}},"xandr_outstream_s2s":{"enabled":true,"tag_ids":{"mobile":[{"400x300":["21368946"]}],"desktop":[{"640x480":["21368940"]}]}}},"header":{"a9":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["mobile-3"],"300x250":["mobile-1","mobile-2"],"native_horizontal":[]},{"320x50":["group-13"],"300x250":[]},{"320x50":["group-3"]},{"320x50":["group-13"]}],"desktop":[{"728x90":["desktop-3"],"160x600":["desktop-1","desktop-2"],"300x250":["desktop-1","desktop-2"],"300x600":["desktop-1","desktop-2"],"970x250":["group-3"]},{"728x90":["group-13"],"300x250":[],"300x600":[],"970x250":["group-13"]}]}},"aol":{"enabled":false,"tag_ids":{"mobile":[{"320x50":["3603526"],"300x250":["3967664","4735757"]},{"320x50":["3603526"],"300x250":[]},{"320x50":["3603526"]},{"320x50":["3603526"]}],"desktop":[{"728x90":["3580931"],"160x600":["4735755","4735759"],"300x250":["3580930","3588863"],"300x600":["3580929","3588864"]},{"728x90":["3588865"],"300x250":[],"300x600":[]}]}},"emx":{"enabled":true,"site_id":"77676","tag_ids":{"mobile":[{"320x50":["320x50-1"],"300x250":["300x250-1","300x250-2"]}],"desktop":[{"728x90":["728x90-1"],"160x600":["160x600-1","160x600-2"],"300x250":["300x250-1","300x250-2"],"300x600":["300x600-1","300x600-2"],"sticky_horizontal":[]}]}},"index":{"enabled":true,"site_id":"172921","tag_ids":{"mobile":[{"320x50":["320x50-1"],"300x250":["300x250-1","300x250-2"]},{"320x50":["320x50-1"],"300x250":[]},{"320x50":["320x50-1"]},{"320x50":["320x50-1"]}],"desktop":[{"728x90":["728x90-1","728x90-2"],"160x600":["160x600-1","160x600-2"],"300x250":["300x250-1","300x250-2"],"300x600":["300x600-1","300x600-2"],"970x250":["970x250-1"]},{"728x90":["728x90-11"],"300x250":[],"300x600":[],"970x250":["970x250-11"]}]}},"kargo":{"enabled":true,"tag_ids":{"mobile":[{"300x250":["_xtXzoBC7up"],"sticky_horizontal":["_sXhTBVhUIV"]}]}},"openx":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["541069635"],"300x250":["541069636"],"336x280":["541069636"],"640x480":["543539910"]},{"320x50":["541069635"],"300x250":[],"336x280":["541069637"]},{"320x50":["541069635"]},{"320x50":["541069635"]}],"desktop":[{"728x90":["541069632"],"160x600":["541069631"],"300x250":["541069631"],"300x600":["541069631"],"336x280":["541069631"],"970x250":["541069632"]},{"728x90":["541069634"],"300x250":[],"300x600":[],"336x280":["541069633"],"970x250":["541069634"]}]}},"teads":{"enabled":true,"site_id":"92715","tag_ids":{"mobile":[{"320x50":[],"native_horizontal":["100454-1","100454-2"]},{"320x50":[],"336x280":[],"native_horizontal":[]}],"desktop":[{"728x90":[],"160x600":[],"300x250":[],"300x600":[],"970x250":[],"native_horizontal":["100454-1"]},{"728x90":[],"160x600":[],"300x250":[],"300x600":[],"native_horizontal":[]}]}},"mantis":{"enabled":true,"site_id":"586ee720d636f29f4412a1a1","tag_ids":{"mobile":[{"320x50":["tvtropes_mobile-3"],"300x250":["tvtropes_mobile-1","tvtropes_mobile-2"]},{"320x50":["tvtropes_sticky_ad"],"300x250":[]},{"320x50":["tvtropes_sticky_ad"]},{"320x50":["tvtropes_sticky_ad"]}],"desktop":[{"728x90":["tvtropes_desktop-3"],"160x600":["tvtropes_desktop-1","tvtropes_desktop-2"],"300x250":["tvtropes_desktop-1","tvtropes_desktop-2"],"300x600":["tvtropes_desktop-1","tvtropes_desktop-2"]},{"728x90":["tvtropes_728x90-11"],"300x250":[],"300x600":[]}]}},"sonobi":{"enabled":true,"site_id":"0decfc28685a550d1d32","tag_ids":{"mobile":[{"320x50":["mobile-3"],"300x250":["mobile-1","mobile-2"]}],"desktop":[{"728x90":["desktop-3"],"970x90":[],"160x600":["desktop-1","desktop-2"],"300x250":["desktop-1","desktop-2"],"300x600":["desktop-1","desktop-2"]}]}},"rubicon":{"enabled":true,"site_id":"14415","tag_ids":{"mobile":[{"320x50":["1708124"],"300x250":["1708122"],"336x280":["1708122"]},{"320x50":["1708128"],"300x250":[],"336x280":["1708126"]},{"320x50":["1708124"]},{"320x50":["1708128"]}],"desktop":[{"728x90":["1708090"],"160x600":["1708090","1708108"],"300x250":["1708090","1708108"],"300x600":["1708090","1708108"],"336x280":[],"970x250":["1708090"]},{"728x90":["1708090"],"300x250":[],"300x600":[]}]}},"appnexus":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["5701987"],"300x250":["6583459","6583460"]},{"320x50":["5701987"],"300x250":[]},{"320x50":["5701987"]},{"320x50":["5701987"]}],"desktop":[{"728x90":["5701487"],"160x600":["5701939","5701696"],"300x250":["5701939","5701696"],"300x600":["5701939","5701696"],"970x250":["5701487"]},{"728x90":["5701939"],"300x250":[],"300x600":[]}]}},"medianet":{"enabled":true,"site_id":"","tag_ids":{"mobile":[{"320x50":["mobile-3"],"300x250":["mobile-1","mobile-2"]}],"desktop":[{"728x90":["desktop-3"],"970x90":["desktop-1","desktop-2"],"160x600":["desktop-1","desktop-2"],"300x250":["desktop-1","desktop-2"],"300x600":["desktop-1","desktop-2"]}]}},"pubmatic":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["mobile-3"],"300x250":["mobile-1","mobile-2"]},{"320x50":["1"],"300x250":[]},{"320x50":["1"]},{"320x50":["1"]}],"desktop":[{"728x90":["desktop-3"],"160x600":["desktop-1","desktop-2"],"300x250":["desktop-1","desktop-2"],"300x600":["desktop-1","desktop-2"]},{"728x90":["1"],"300x250":[],"300x600":[]}]}},"adyoulike":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["f36fb337711daf33310567200e336bfd"],"300x250":["d26c94ddc81a11cb228b900e195aed22","4888d5ae0f0f66f5d493f84ff1ffaca9"]}],"desktop":[{"728x90":["2324353af8ed7bdc3e475adc931fd93c"],"300x250":["05aa506f3ad11a597c41ef2d877233e9","1cc840a8cfa6c4ff7201c872c956b2b0"],"300x600":["4718e7c5c35d04bbe0827ac82248cadc","d155b306c220f7b5a28857027c3e2239"]}]}},"rhythmone":{"enabled":false},"mediaforce":{"test":false,"enabled":false,"site_id":"Proper_1","tag_ids":{"mobile":[{"320x50":["proper_1"],"300x250":["proper_1"]}],"desktop":[{"728x90":["proper_1"],"160x600":["proper_1"],"300x250":["proper_1"]}]}},"revcontent":{"test":true,"enabled":true,"tag_ids":{"mobile":[{"300x250":["1"]},{"300x250":[]}],"desktop":[{"160x600":[],"300x250":["1"],"300x600":[]},{"160x600":[],"300x250":[]}]}},"triplelift":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["TVTropes_ROS_hdx-3"],"300x250":["TVTropes_ROS_hdx-1","TVTropes_ROS_hdx-2"],"native_horizontal":["tvtropes_content_1_mobile_300x250","tvtropes_content_2_mobile_300x250","tvtropes_content_3_mobile_300x250"]},{"320x50":["TVTropes_ROS_hdx-13"],"300x250":[],"native_horizontal":[]},{"320x50":["TVTropes_ROS_hdx"]},{"320x50":["TVTropes_ROS_hdx"]}],"desktop":[{"728x90":["tvtropes_ros_hdx-3","tvtropes_ros_hdx-4"],"160x600":["tvtropes_ros_hdx-1","tvtropes_ros_hdx-2"],"300x250":["tvtropes_ros_hdx-1","tvtropes_ros_hdx-2"],"300x600":["tvtropes_ros_hdx-1","tvtropes_ros_hdx-2"],"970x250":["tvtropes_ros_hdx"],"native_horizontal":[]},{"728x90":["tvtropes_ros_hdx-14"],"160x600":[],"300x250":[],"300x600":[]}]}},"aol_instream":{"test":false,"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"site_id":"Proper","tag_ids":{"mobile":[{"400x300":["1"]}],"desktop":[{"640x480":["1"]}]}},"districtmdmx":{"enabled":true,"site_id":"116950","tag_ids":{"mobile":[{"320x50":["mobile-3"],"300x250":["mobile-1","mobile-2"],"sticky_horizontal":[]},{"320x50":["group-13"],"300x250":[]},{"320x50":["group-3"]},{"320x50":["group-13"]}],"desktop":[{"728x90":["desktop-3"],"160x600":["desktop-1","desktop-2"],"300x250":["desktop-1","desktop-2"],"300x600":["desktop-1","desktop-2"],"970x250":["group-3"]},{"728x90":["group-12"],"300x250":[],"300x600":[]}]}},"ix_outstream":{"enabled":true,"site_id":"627929-627930","tag_ids":{"mobile":[{"400x300":["mobile-1"]}],"desktop":[{"640x480":["desktop-1"]}]}},"sharethrough":{"enabled":true,"tag_ids":{"mobile":[{"native_horizontal":["gy92vnnjq3waiuw4axys793m","yVmLRq1dRXU9gfJYs96UyESJ"]},{"native_horizontal":[]}],"desktop":[{"728x90":["tmpyjrdb6pKWjV3LQhBSKfB5"],"160x600":["Lt6ECKF36srj51m1pkKEPfFg"],"300x250":["d_YPQ65ker6z9AaKlId8sQ","anVhQY5kir6yv-aKkGJozW"],"native_horizontal":[]}]}},"emx_outstream":{"enabled":true,"site_id":"137211","tag_ids":{"mobile":[{"400x300":["mobile-1"]}],"desktop":[{"640x480":["desktop-1"]}]}},"rubicon_video":{"test":false,"enabled":false,"site_id":""},"openx_instream":{"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"site_id":"543539909","tag_ids":{"mobile":[{"400x300":["1"]}],"desktop":[{"640x480":["1"]}]}},"spotx_instream":{"test":false,"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"site_id":"266847-266848","tag_ids":{"mobile":[{"400x300":["1"]}],"desktop":[{"640x480":["1"]}]}},"openx_outstream":{"enabled":true,"tag_ids":{"mobile":[{"400x300":["543888124"]}],"desktop":[{"640x480":["543888123"]}]}},"spotx_outstream":{"enabled":true,"site_id":"312763-312764","tag_ids":{"mobile":[{"400x300":["mobile-1"]}],"desktop":[{"640x480":["desktop-1"]}]}},"rubicon_instream":{"test":false,"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"site_id":"14415","tag_ids":{"mobile":[{"400x300":["1420672"]}],"desktop":[{"640x480":["1420672"]}]}},"sonobi_outstream":{"enabled":true,"tag_ids":{"mobile":[{"400x300":["ee1ff0932634fb963397"]}],"desktop":[{"640x480":["ecde6c51251a96e1353d"]}]}},"pubmatic_instream":{"test":false,"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"tag_ids":{"mobile":[{"400x300":["tvtropes_instream_desktop"]}],"desktop":[{"640x480":["tvtropes_instream_desktop"]}]}},"rubicon_outstream":{"enabled":true,"site_id":"14415","tag_ids":{"mobile":[{"400x300":["1708122"]}],"desktop":[{"640x480":["1708090"]}]}},"thirtythreeacross":{"enabled":true,"tag_ids":{"mobile":[{"320x50":["aVjRgK5kir6yv-aKkGJozW"],"300x250":["d_YPQ65ker6z9AaKlId8sQ","anVhQY5kir6yv-aKkGJozW"],"sticky_horizontal":[]},{"320x50":["aVjRgK5kir6yv-aKkGJozW"],"300x250":[]},{"320x50":["aVjRgK5kir6yv-aKkGJozW"]},{"320x50":["aVjRgK5kir6yv-aKkGJozW"]}],"desktop":[{"728x90":["cU_Paa5ker6yX8aKkv7mNO","d0WwbY5ker6yX8aKkv7mNO"],"160x600":["dpSaWw5ker6z9AaKlId8sQ","dAPLKe5ker6z9AaKlId8sQ"],"300x250":["dpSaWw5ker6z9AaKlId8sQ","dAPLKe5ker6z9AaKlId8sQ"],"300x600":["dpSaWw5ker6z9AaKlId8sQ","dAPLKe5ker6z9AaKlId8sQ"],"970x250":["cU_Paa5ker6yX8aKkv7mNO"],"sticky_horizontal":[]},{"728x90":["d0WwbY5ker6yX8aKkv7mNO"],"300x250":[],"300x600":[]}]}},"appnexus_outstream":{"enabled":true,"tag_ids":{"mobile":[{"400x300":["9002345"]}],"desktop":[{"640x480":["9002343"]}]}},"pubmatic_outstream":{"enabled":true,"tag_ids":{"mobile":[{"400x300":["mobile-1"]}],"desktop":[{"640x480":["desktop-1"]}]}},"rhythmone_instream":{"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"site_id":"65933","tag_ids":{"mobile":[{"400x300":["1"]}],"desktop":[{"640x480":["1"]}]}},"amazon_tam_instream":{"test":false,"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"tag_ids":{"mobile":[{"400x300":["instream_1"]}],"desktop":[{"640x480":["instream_1"]}]}},"beachfront_instream":{"test":false,"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"site_id":"ec66364a-4224-43d5-aa2f-934e6b95502e","tag_ids":{"mobile":[{"400x300":["1"]}],"desktop":[{"640x480":["1"]}]}},"beachfront_outstream":{"enabled":true,"site_id":"84e8bfdb-79af-43e9-e3c7-30dfafb700f8","tag_ids":{"mobile":[{"400x300":["mobile-1"]}],"desktop":[{"640x480":["desktop-1"]}]}},"districtmdmx_instream":{"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"enabled":true,"site_id":"581843","tag_ids":{"mobile":[{"400x300":["tvtropes_instream_1"]}],"desktop":[{"640x480":["tvtropes_instream_1"]}]}},"thirtythreeacross_outstream":{"enabled":true,"tag_ids":{"mobile":[{"400x300":["dW3cq4Fgir64oTaKj0P0Le"]}],"desktop":[{"640x480":["dsFBPwFgir64kCaKj0P0Le"]}]}}}},"refresh":{"mobile":{"max":10,"enabled":1,"interval":62000,"exclude_dfp":0,"inview_interval":10000},"desktop":{"max":10,"enabled":1,"interval":62000,"exclude_dfp":0,"inview_interval":10000}},"userIds":{"identityAdapters":{"id5id":{"name":"id5Id","config":{"enabled":true},"storage":{"name":"id5id","type":"localstorage","expiresInDays":90,"refreshInSeconds":28800}},"publink":{"name":"pubLink","config":{"enabled":true},"storage":{"name":"publink","type":"cookie","expiresInDays":30}},"sharedid":{"name":"sharedId","config":{"enabled":true},"storage":{"name":"sharedid","type":"cookie","expiresInDays":30,"refreshInSeconds":86400}},"fabrickid":{"name":"fabrickId","config":{"apiKey":"2333587448","enabled":true},"storage":{"name":"fabrickId","type":"cookie","expiresInDays":7}},"pubcommonid":{"name":"pubCommonId","config":{"enabled":true},"storage":{"name":"_pubcid","type":"localstorage","expiresInDays":365}},"identitylink":{"name":"identityLink","config":{"enabled":true,"urlParameter":""},"storage":{"name":"idl_env","type":"cookie","expiresInDays":30}},"verizonmediaid":{"name":"verizonMediaId","config":{"enabled":true},"storage":{"name":"connectid","type":"localstorage","expiresInDays":15}}}},"ad_slots":{"video":{"tvtropes_instream_1":{"floors":{"mobile":{"backup":1},"desktop":{"backup":1}},"number":1,"sticky":false,"lazyload":{"device_specific":false},"video_player":"tvtropes_instream_1","resolution_size_map":{"0":["400x300"],"1024":["640x480"]}}},"display":{"tvtropes_oop":{"number":11,"sticky":false,"refresh":{"mobile":{"enabled":false},"desktop":{"enabled":false}},"lazyload":{"mobile":{"enabled":false},"desktop":{"enabled":false},"device_specific":false},"resolution_size_map":{"0":["1x1"],"768":["1x1"]}},"tvtropes_ad_1":{"number":2,"sticky":false,"refresh":{"mobile":{"enabled":false},"desktop":{"enabled":false}},"lazyload":{"mobile":{"enabled":true},"desktop":{"enabled":true,"fetchMarginPercent":10,"renderMarginPercent":10},"device_specific":true},"resolution_size_map":{"0":[],"768":["728x90"],"1000":["728x90","970x90"]}},"tvtropes_ad_2":{"number":3,"sticky":false,"lazyload":{"mobile":{"enabled":true},"desktop":{"enabled":true},"device_specific":true},"resolution_size_map":{"0":[],"981":["160x600","300x250","300x600"]}},"tvtropes_ad_3":{"number":4,"sticky":false,"lazyload":{"mobile":{"enabled":true},"desktop":{"enabled":true},"device_specific":true},"resolution_size_map":{"0":[],"981":["160x600","300x250","300x600"]}},"tvtropes_ad_4":{"number":5,"sticky":false,"resolution_size_map":{"0":[],"981":["160x600","300x250","300x600","native_horizontal"]}},"tvtropes_ad_5":{"number":6,"sticky":false,"lazyload":{"mobile":{"fetchMarginPercent":1,"renderMarginPercent":1},"desktop":{"fetchMarginPercent":1,"renderMarginPercent":1}},"video_player":"tvtropes_display_outstream","video_enabled":true,"resolution_size_map":{"0":[],"768":["300x250","native_horizontal","640x480"],"1190":["300x250","728x90","native_horizontal","640x480"]}},"tvtropes_sticky_ad":{"brand":true,"number":1,"sticky":true,"refresh":{"mobile":{"max":20,"enabled":true,"interval":32000,"inview_interval":-1},"desktop":{"max":20,"interval":32000,"inview_interval":-1},"device_specific":true},"lazyload":{"mobile":{"enabled":false},"desktop":{"enabled":false},"device_specific":false},"position":"right","close_btn":true,"sticky_settings":{"brand":true,"position":"right"},"resolution_size_map":{"0":["320x50","sticky_horizontal"],"768":["728x90","sticky_horizontal"],"1000":["728x90","970x90","sticky_horizontal"],"1570":["728x90","970x90","sticky_horizontal"]}},"tvtropes_mobile_ad_1":{"number":7,"sticky":false,"refresh":{"mobile":{"enabled":false},"desktop":{"enabled":false},"device_specific":false},"lazyload":{"mobile":{"enabled":false,"fetchMarginPercent":25,"renderMarginPercent":25},"desktop":{"enabled":false},"device_specific":false},"resolution_size_map":{"0":["300x250","fluid","native_horizontal"],"768":[]}},"tvtropes_mobile_ad_2":{"number":8,"sticky":false,"refresh":{"mobile":{"enabled":true},"desktop":{"enabled":true}},"lazyload":{"mobile":{"fetchMarginPercent":25,"renderMarginPercent":25}},"resolution_size_map":{"0":["300x250","fluid","native_horizontal"],"768":[]}},"tvtropes_mobile_ad_3":{"number":9,"sticky":false,"refresh":{"mobile":{"enabled":true},"desktop":{"enabled":true}},"lazyload":{"mobile":{"fetchMarginPercent":25,"renderMarginPercent":25}},"video_player":"tvtropes_display_outstream","video_enabled":true,"resolution_size_map":{"0":["300x250","fluid","native_horizontal","400x300"],"768":[]}},"tvtropes_mobile_ad_4":{"number":10,"sticky":false,"refresh":{"mobile":{"enabled":true},"desktop":{"enabled":true}},"lazyload":{"mobile":{"fetchMarginPercent":5,"renderMarginPercent":5}},"resolution_size_map":{"0":["300x250","fluid","native_horizontal"],"768":[]}},"tvtropes_dynamic_sticky_ad":{"brand":true,"number":12,"sticky":true,"dynamic":{"mobile":{"enabled":true,"cssselector":".proper-dynamic-sticky","cssplacement":"append"},"desktop":{"enabled":true,"cssselector":".proper-dynamic-sticky","cssplacement":"append"}},"refresh":{"mobile":{"max":20,"enabled":true,"interval":32000,"inview_interval":-1},"desktop":{"max":20,"interval":32000,"inview_interval":-1},"device_specific":true},"lazyload":{"mobile":{"enabled":false},"desktop":{"enabled":false},"device_specific":false},"position":"right","close_btn":true,"sticky_settings":{"brand":true,"position":"right"},"resolution_size_map":{"0":["320x50","sticky_horizontal"],"768":["728x90","sticky_horizontal"],"1000":["728x90","970x90","sticky_horizontal"],"1570":["728x90","970x90","sticky_horizontal"]}}}},"auctions":{"mobile":{"max":"20","rounds":4,"timeout":"30000"},"desktop":{"max":"20","rounds":2,"timeout":"30000"},"resolution_size_map":{"0":["1x1","320x50","sticky_horizontal","300x250","fluid","native_horizontal","400x300"],"768":["1x1","728x90","300x250","native_horizontal","640x480","sticky_horizontal"],"981":["160x600","300x250","300x600","native_horizontal"],"1000":["728x90","970x90","sticky_horizontal"],"1024":["640x480"],"1190":["300x250","728x90","native_horizontal","640x480"],"1570":["728x90","970x90","sticky_horizontal"]}},"extra_js":"properSpecialOps = (typeof window.properSpecialOps !== 'undefined') ? window.properSpecialOps : {};","lazyload":{"mobile":{"enabled":true,"fetchMarginPercent":50,"renderMarginPercent":50},"desktop":{"enabled":true,"fetchMarginPercent":15,"renderMarginPercent":15},"device_specific":true},"mcm_type":"mcm","extra_css":".proper-ad-unit.ad-sticky:not(.for-mobile):not(.sticky-left):not(.sticky-right):not([class*='sticky-corner-']) .inner-right{position:inherit} .proper-ad-unit.ad-sticky.for-mobile .close{display:block !important} .proper-ad-unit.ad-sticky:not(.for-mobile):not(.sticky-left):not(.sticky-right):not([class*='sticky-corner-']) .close{display:block !important}","site_name":"tvtropes","adlightning":{"enabled":false,"clientId":"properio","reportAd":false},"dfp_per_slot":0,"isolated_urls":["\/pmwiki\/article_history.php?article=characters.siivagunner","\/pmwiki\/pmwiki.php\/main\/bdsm","\/pmwiki\/posts.php?discussion=13364155950a44080100&page=1","\/pmwiki\/posts.php?discussion=15225473120a58522900&page=1","\/relatedsearch.php?term=main\/comediclolicon"],"video_players":{"tvtropes_instream_1":{"player_settings":{"autoplay":true,"backfill":false,"video_id":"","video_type":"instream","backfill_id":"","device_type":"desktop","dfp_ad_unit":"tvtropes_instream_1","video_click":"overlay","small_player":"never","video_ad_gap":35000,"number_of_ads":5,"send_ga_events":true,"physical_ad_gap":30000,"ad_failure_limit":5,"no_ads_no_player":true,"small_player_bottom":100}},"tvtropes_display_outstream":{"player_settings":{"autoplay":true,"backfill":false,"video_id":"","video_type":"outstream","backfill_id":"","dfp_ad_unit":"","small_player":"never","number_of_ads":3,"ad_failure_limit":5,"no_ads_no_player":true,"small_player_bottom":100}}},"report_ad_tool":false,"sandbox_iframe":1,"sandbox_options":["allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts"],"rtp_file_version":9159,"domain_protection":1,"rtp_file_revision":"1.81.0","additional_domains":[],"traffic_percentage":1}};

		// Traffic Percentages
		var traffic_percentages = {"9159":1};
		var getVersionId = weightedRandom(traffic_percentages);

		function run() {
			// Init version id
			var version_id   = null,
				clear_cookie = false,
				config 		 = null;

			// Check for clear cookie flag
			var get_vars = getUrlParameters(window.location.search.substring(1));
			if(typeof get_vars["vselect_clear"] !== "undefined" && get_vars["vselect_clear"] == 1) {
				clear_cookie = true;
			}
			// Check for version id in url
			if(typeof get_vars["vselect"] !== "undefined" && get_vars["vselect"] && rtp_files[get_vars["vselect"]]) {
				version_id = get_vars["vselect"];
			}

			// Check for session persistent
			if(session_persistent) {
				// Get cookie data
				getSplitTestCookie();

				// Convert dates
				d1 = new Date(cookieData['release_ts']);
				d2 = new Date(last_release_ts);

				// Check if cookie data is out of date
				if(d1 < d2 || !cookieData['version_id'] || !rtp_files[cookieData['version_id']] || version_id || clear_cookie) {
					cookieData['version_id'] = version_id || getVersionId();  // Generate version id based on traffic share
					cookieData['release_ts'] = last_release_ts;   // Update release ts
				}
				// Set new cookie data
				setSplitTestCookie();

				version_id = cookieData['version_id'];
			} else {
				// Generate version id based on traffic share
				version_id = version_id || getVersionId();
			}

			// Check if proper ad block message should be enabled
			activateAdBlockMsg();

			var versions = Object.keys(rtp_files);
			// Find and Activate Config Object.
			if (rtp_files[version_id]) {
				if (versions.length == 1) {
					var config = rtp_files[version_id];
					activatePayload(config.rtp_file_revision);
					activateConfig(config);
				} else {
					var payload_name = rtp_files[version_id];
					activatePayload(payload_name);
					fetchConfig(version_id, function (config) {
						activateConfig(config);
					});
				}
			}
		}

		/**
		 * Activate the Config Object.
		 *
		 * @param {object} config RtpJ Config Object.
		 */
		function activateConfig(config) {
			propertag.cmd.unshift(function () {
				ProperMedia.ad_project.set_options(config);
			});
		}

		/**
		 * Add event listener of ad blockers to show proper ad block message
		 */
		function activateAdBlockMsg() {
			if(proper_ad_block_message) {
				window.addEventListener("proper-ad-bidders-blocked", loadProperMessage);
			}
		}

		/**
         * Load Proper Ad Block Message
         */
        function loadProperMessage() {

            function showProperMessage() {
                try {
                    var ProperMediaMessage = window.ProperMediaMessage || {};
                    ProperMediaMessage.project.show_shield_message('', publisher);
                } catch(e) {
                    console.error(e);
                }
            }

            if(
                !window.ProperMediaMessage ||
                !window.ProperMediaMessage.project ||
                !window.ProperMediaMessage.show_shield_message
            ) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://propermessage.io/design/assets/bundle-message.js";
                script.onload = showProperMessage;
                document.getElementsByTagName("head")[0].appendChild(script);
            } else {
                showProperMessage()
            }
        }

		/**
		 * Grab the Config from the remote server.
		 *
		 * @param {*} version_id The Version Id to fetch.
		 * @param {*} callback Function that will be passed the parsed config.
		 */
		function fetchConfig(version_id, callback) {
			var req = new XMLHttpRequest();

			var listener = function () {
				var config = safeJsonParse(this.responseText);
				if(typeof callback == 'function') {
					callback(config);
				}
			};

			req.addEventListener("load", listener);
			req.open("GET", "https://" + ad_code_domain + "/config/" + publisher + "." + version_id + '.json');
			req.send();
		}

		/**
		 * Activate the Payload!
		 *
		 * @param {string} payload_name The Payload Release Name.
		 */
		function activatePayload(payload_name) {
			// Main ad code file
			var script = document.createElement("script");

			script.onerror = function() {
				payload_loaded = false;
                // Payload was blocked, trigger this event
                var event = new CustomEvent('proper-ad-bidders-blocked', {});
                window.dispatchEvent(event);
            }

        	payload_loaded = true;
			var payload = 'https://' + ad_code_domain + '/payloads/' + payload_name + '.js';
			script.type = "text/javascript";
			script.src = payload;
			document.getElementsByTagName("head")[0].appendChild(script);
		}

		// Weighted Random @see https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number
		function weightedRandom(spec) {
			if (!spec) {
				return function() {};
			}

			var ids = Object.keys(spec);

			if (ids.length == 1) {
				return function () { return ids[0] };
			}

			var i, j, table = [];
			for (i in spec) {
				// The constant 10 below should be computed based on the
				// weights in the spec for a correct and optimal table size.
				// E.g. the spec {0:0.999, 1:0.001} will break this impl.
				for (j=0; j<spec[i]*10; j++) {
					table.push(i);
				}
			}
			return function() {
				return table[Math.floor(Math.random() * table.length)];
			}
		}

		function getSplitTestCookie() {
			// Get cookie value
			var cookie_string_value = getCookieValue(cookie_name) || '{}';

			// Set settion object
			var cookieSplitTestData = safeJsonParse(cookie_string_value) || {};
			cookieData = {
				"version_id": cookieSplitTestData['version_id'] || null,
				"release_ts": cookieSplitTestData['release_ts'] || null
			}
		}

		function setSplitTestCookie() {
			// stringify data
			var encoded_cookie_value = JSON.stringify(cookieData);
			// save session cookie
			setCookieValue(encoded_cookie_value);
		}

		function getCookieValue(a) {
			var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
			return b ? b.pop() : undefined;
		}

		function setCookieValue(value) {
			document.cookie = cookie_name + "=" + value + "; path=/;";
		}

		function getUrlParameters(url) {
			var data = decodeURIComponent(url).split('&');
			var res = {};
			for (var i = 0; i < data.length; i++) {
				var parm = data[i].split('=');
				res[parm[0]] = parm[1];
			}
			return res;
		}

		/**
		 * safeJSONParse
		 *
		 * Makes an attempt to parse a JSON safely, but might fail miserably.
		 *
		 * @param {String} the json
		 *
		 * @returns {JSON|null} JSON is parsed, Null if not.
		 *
		 */
		function safeJsonParse(json) {
			try {
				return JSON.parse(json);
			} catch(e) {
				console.error(e);
			}
			return null;
		}

		/**
         * CustomEvent polyfill for IE
         */
        if(!window.CustomEvent !== "function" ) {
            window.CustomEvent = function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: null };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }
		};

		// Placeholder for Google Funding Choices.
		try {
	(function(){/*


		Copyright The Closure Library Authors.
		SPDX-License-Identifier: Apache-2.0
	   */
	   'use strict';var g=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}},l=this||self,m=/^[\w+/_-]+[=]{0,2}$/,p=null,q=function(){},r=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";
	   if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},u=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a};var v=function(a,b){Object.defineProperty(l,a,{configurable:!1,get:function(){return b},set:q})};var y=function(a,b){this.b=a===w&&b||"";this.a=x},x={},w={};var aa=function(a,b){a.src=b instanceof y&&b.constructor===y&&b.a===x?b.b:"type_error:TrustedResourceUrl";if(null===p)b:{b=l.document;if((b=b.querySelector&&b.querySelector("script[nonce]"))&&(b=b.nonce||b.getAttribute("nonce"))&&m.test(b)){p=b;break b}p=""}b=p;b&&a.setAttribute("nonce",b)};var z=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^+new Date).toString(36)};var A=function(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)},B=function(a){this.a=a||l.document||document};B.prototype.appendChild=function(a,b){a.appendChild(b)};var C=function(a,b,c,d,e,f){try{var k=a.a,h=A(a.a,"SCRIPT");h.async=!0;aa(h,b);k.head.appendChild(h);h.addEventListener("load",function(){e();d&&k.head.removeChild(h)});h.addEventListener("error",function(){0<c?C(a,b,c-1,d,e,f):(d&&k.head.removeChild(h),f())})}catch(n){f()}};var ba=l.atob("aHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vaW1hZ2VzL2ljb25zL21hdGVyaWFsL3N5c3RlbS8xeC93YXJuaW5nX2FtYmVyXzI0ZHAucG5n"),ca=l.atob("WW91IGFyZSBzZWVpbmcgdGhpcyBtZXNzYWdlIGJlY2F1c2UgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlIGlzIGludGVyZmVyaW5nIHdpdGggdGhpcyBwYWdlLg=="),da=l.atob("RGlzYWJsZSBhbnkgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlLCB0aGVuIHJlbG9hZCB0aGlzIHBhZ2Uu"),ea=function(a,b,c){this.b=a;this.f=new B(this.b);this.a=null;this.c=[];this.g=!1;this.i=b;this.h=c},F=function(a){if(a.b.body&&!a.g){var b=
	   function(){D(a);l.setTimeout(function(){return E(a,3)},50)};C(a.f,a.i,2,!0,function(){l[a.h]||b()},b);a.g=!0}},D=function(a){for(var b=G(1,5),c=0;c<b;c++){var d=H(a);a.b.body.appendChild(d);a.c.push(d)}b=H(a);b.style.bottom="0";b.style.left="0";b.style.position="fixed";b.style.width=G(100,110).toString()+"%";b.style.zIndex=G(2147483544,2147483644).toString();b.style["background-color"]=I(249,259,242,252,219,229);b.style["box-shadow"]="0 0 12px #888";b.style.color=I(0,10,0,10,0,10);b.style.display=
	   "flex";b.style["justify-content"]="center";b.style["font-family"]="Roboto, Arial";c=H(a);c.style.width=G(80,85).toString()+"%";c.style.maxWidth=G(750,775).toString()+"px";c.style.margin="24px";c.style.display="flex";c.style["align-items"]="flex-start";c.style["justify-content"]="center";d=A(a.f.a,"IMG");d.className=z();d.src=ba;d.style.height="24px";d.style.width="24px";d.style["padding-right"]="16px";var e=H(a),f=H(a);f.style["font-weight"]="bold";f.textContent=ca;var k=H(a);k.textContent=da;J(a,
	   e,f);J(a,e,k);J(a,c,d);J(a,c,e);J(a,b,c);a.a=b;a.b.body.appendChild(a.a);b=G(1,5);for(c=0;c<b;c++)d=H(a),a.b.body.appendChild(d),a.c.push(d)},J=function(a,b,c){for(var d=G(1,5),e=0;e<d;e++){var f=H(a);b.appendChild(f)}b.appendChild(c);c=G(1,5);for(d=0;d<c;d++)e=H(a),b.appendChild(e)},G=function(a,b){return Math.floor(a+Math.random()*(b-a))},I=function(a,b,c,d,e,f){return"rgb("+G(Math.max(a,0),Math.min(b,255)).toString()+","+G(Math.max(c,0),Math.min(d,255)).toString()+","+G(Math.max(e,0),Math.min(f,
	   255)).toString()+")"},H=function(a){a=A(a.f.a,"DIV");a.className=z();return a},E=function(a,b){0>=b||null!=a.a&&0!=a.a.offsetHeight&&0!=a.a.offsetWidth||(fa(a),D(a),l.setTimeout(function(){return E(a,b-1)},50))},fa=function(a){var b=a.c;var c="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];b=c?c.call(b):{next:g(b)};for(c=b.next();!c.done;c=b.next())(c=c.value)&&c.parentNode&&c.parentNode.removeChild(c);a.c=[];(b=a.a)&&b.parentNode&&b.parentNode.removeChild(b);a.a=null};var ia=function(a,b,c,d,e){var f=ha(c),k=function(n){n.appendChild(f);l.setTimeout(function(){f?(0!==f.offsetHeight&&0!==f.offsetWidth?b():a(),f.parentNode&&f.parentNode.removeChild(f)):a()},d)},h=function(n){document.body?k(document.body):0<n?l.setTimeout(function(){h(n-1)},e):b()};h(3)},ha=function(a){var b=document.createElement("div");b.className=a;b.style.width="1px";b.style.height="1px";b.style.position="absolute";b.style.left="-10000px";b.style.top="-10000px";b.style.zIndex="-10000";return b};var K={},L=null;var M=function(){},N="function"==typeof Uint8Array,O=function(a,b){a.b=null;b||(b=[]);a.j=void 0;a.f=-1;a.a=b;a:{if(b=a.a.length){--b;var c=a.a[b];if(!(null===c||"object"!=typeof c||Array.isArray(c)||N&&c instanceof Uint8Array)){a.g=b-a.f;a.c=c;break a}}a.g=Number.MAX_VALUE}a.i={}},P=[],Q=function(a,b){if(b<a.g){b+=a.f;var c=a.a[b];return c===P?a.a[b]=[]:c}if(a.c)return c=a.c[b],c===P?a.c[b]=[]:c},R=function(a,b,c){a.b||(a.b={});if(!a.b[c]){var d=Q(a,c);d&&(a.b[c]=new b(d))}return a.b[c]};
	   M.prototype.h=N?function(){var a=Uint8Array.prototype.toJSON;Uint8Array.prototype.toJSON=function(){var b;void 0===b&&(b=0);if(!L){L={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),d=["+/=","+/","-_=","-_.","-_"],e=0;5>e;e++){var f=c.concat(d[e].split(""));K[e]=f;for(var k=0;k<f.length;k++){var h=f[k];void 0===L[h]&&(L[h]=k)}}}b=K[b];c=[];for(d=0;d<this.length;d+=3){var n=this[d],t=(e=d+1<this.length)?this[d+1]:0;h=(f=d+2<this.length)?this[d+2]:0;k=n>>2;n=(n&
	   3)<<4|t>>4;t=(t&15)<<2|h>>6;h&=63;f||(h=64,e||(t=64));c.push(b[k],b[n],b[t]||"",b[h]||"")}return c.join("")};try{return JSON.stringify(this.a&&this.a,S)}finally{Uint8Array.prototype.toJSON=a}}:function(){return JSON.stringify(this.a&&this.a,S)};var S=function(a,b){return"number"!==typeof b||!isNaN(b)&&Infinity!==b&&-Infinity!==b?b:String(b)};M.prototype.toString=function(){return this.a.toString()};var T=function(a){O(this,a)};u(T,M);var U=function(a){O(this,a)};u(U,M);var ja=function(a,b){this.c=new B(a);var c=R(b,T,5);c=new y(w,Q(c,4)||"");this.b=new ea(a,c,Q(b,4));this.a=b},ka=function(a,b,c,d){b=new T(b?JSON.parse(b):null);b=new y(w,Q(b,4)||"");C(a.c,b,3,!1,c,function(){ia(function(){F(a.b);d(!1)},function(){d(!0)},Q(a.a,2),Q(a.a,3),Q(a.a,1))})};var la=function(a,b){V(a,"internal_api_load_with_sb",function(c,d,e){ka(b,c,d,e)});V(a,"internal_api_sb",function(){F(b.b)})},V=function(a,b,c){a=l.btoa(a+b);v(a,c)},W=function(a,b,c){for(var d=[],e=2;e<arguments.length;++e)d[e-2]=arguments[e];e=l.btoa(a+b);e=l[e];if("function"==r(e))e.apply(null,d);else throw Error("API not exported.");};var X=function(a){O(this,a)};u(X,M);var Y=function(a){this.h=window;this.a=a;this.b=Q(this.a,1);this.f=R(this.a,T,2);this.g=R(this.a,U,3);this.c=!1};Y.prototype.start=function(){ma();var a=new ja(this.h.document,this.g);la(this.b,a);na(this)};
	   var ma=function(){var a=function(){if(!l.frames.googlefcPresent)if(document.body){var b=document.createElement("iframe");b.style.display="none";b.style.width="0px";b.style.height="0px";b.style.border="none";b.style.zIndex="-1000";b.style.left="-1000px";b.style.top="-1000px";b.name="googlefcPresent";document.body.appendChild(b)}else l.setTimeout(a,5)};a()},na=function(a){var b=Date.now();W(a.b,"internal_api_load_with_sb",a.f.h(),function(){var c;var d=a.b,e=l[l.btoa(d+"loader_js")];if(e){e=l.atob(e);
	   e=parseInt(e,10);d=l.btoa(d+"loader_js").split(".");var f=l;d[0]in f||"undefined"==typeof f.execScript||f.execScript("var "+d[0]);for(;d.length&&(c=d.shift());)d.length?f[c]&&f[c]!==Object.prototype[c]?f=f[c]:f=f[c]={}:f[c]=null;c=Math.abs(b-e);c=1728E5>c?0:c}else c=-1;0!=c&&(W(a.b,"internal_api_sb"),Z(a,Q(a.a,6)))},function(c){Z(a,c?Q(a.a,4):Q(a.a,5))})},Z=function(a,b){a.c||(a.c=!0,a=new l.XMLHttpRequest,a.open("GET",b,!0),a.send())};(function(a,b){l[a]=function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];l[a]=q;b.apply(null,d)}})("__d3lUW8vwsKlB__",function(a){"function"==typeof window.atob&&(a=window.atob(a),a=new X(a?JSON.parse(a):null),(new Y(a)).start())});}).call(this);


	   window.__d3lUW8vwsKlB__("WyI3ZmQ1M2QyNTZhY2Y5NWYxIixbbnVsbCxudWxsLG51bGwsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2YvQUdTS1d4VTZQUFp6OHQwX2pXNFNlMmE3TmtTb3MzS1pWZm9nd19hWXJPN2JscjgwWFNtamFCdWUtWkhDd1R0QjdWbkIwNlV2WkVNNDRYWWRJMHl2VTI1ZjlMOFx1MDAzZCJdCixbMjAsImRpdi1ncHQtYWQiLDEwMCwiTjJaa05UTmtNalUyWVdObU9UVm1NUVx1MDAzZFx1MDAzZCIsW251bGwsbnVsbCxudWxsLCJodHRwczovL3d3dy5nc3RhdGljLmNvbS8wZW1uL2YvcC83ZmQ1M2QyNTZhY2Y5NWYxLmpzP3VzcXBcdTAwM2RDQVEiXQpdCiwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vbC9BR1NLV3hXTFhiZnF2cjlUSmRjTVNtdUhiOFg0WW4tdFUyRjZnZTU0OVBCWV9GQzQyWUV0LXM5cXRvLTc5SkhNTDlCeEYtRmZCNzNGaWV1cHpLTnp2M2pXP2FiXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2wvQUdTS1d4Vml0em80RURzR0drOEY3elhfYUlhUTE4NGlfdFRXMmxYbUc1TkhpNkVENFlYd0RncUZwa2tYOHhiOWNWaE8yYm1QdXFRNm1yZFBuMzZ6cmZrbD9hYlx1MDAzZDJcdTAwMjZzYmZcdTAwM2QxIiwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vbC9BR1NLV3hVUHQ4VFh6RThUa1ZPdHA3cXRDYTVHZVB2YWxsQ0dJd3FBdVJuN0pEaUxLc3R5aHVGcmd2OV9BV1FmMnotY2xnSEh2ZHp2cDNnaEdPNmFwZmE1P3NiZlx1MDAzZDIiXQo=");
} catch (e) {
	console.error(e);
}


		run();

	})(window, document);
} catch (e) {
	console.error(e);
	if(typeof TraceKit !== "undefined") {
		TraceKit.report(e); //error with stack trace gets normalized and sent to subscriber
	}
}
