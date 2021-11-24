(()=>{var e={285:e=>{e.exports="$(document).ready(function(){
    // Check if our ad-free-visited cookie has been created
    if(cookies.read('ad-free-visited') == 1){
        console.log(\"ads removed because of the cookie\");
        live_ads = 0;
    }

    // Try to show the proper player
    lazy_load(\"#proper_player_insert_div\", // Query
              \"once\", // How long event listener should last (\"forever\" or \"once\")
              500, // Pixels
              0, // Time
              \"on\", // Status
              show_proper_player // Callback
              );

    // Testing Clean Creative redirect blocker code; only display to non-logged in users and if service is enabled in $config object
    if( (live_ads==1) && !(donation >= 95)) {
      // Track in case of fake click
      setTimeout(request_log_check, 30000);

    if(cleanCreativeEnabled) {
        $.ajax({
            url: 'https://d1il9t8pu4dsoj.cloudfront.net/script.js',
            dataType:'script',
            cache: true,
            timeout: 2000,
            complete: function(data) {
            downloadAdScripts(img_domain);
            }
        });
    }
    else {
        downloadAdScripts(img_domain);

    }
    }

    if (adsRemovedWith) {
        ga('send', 'event', 'ad-free', adsRemovedWith, 'removed', {'nonInteraction': 1});
    }

    (function(a,c,d,e){if(!a[c]){var b=a[c]={};b[d]=[];b[e]=function(a){b[d].push(a)}}})(window,'Scroll','_q','do'); // shows the scroll toolbar at the bottom
    Scroll.config = {
        detected: document.cookie.indexOf(\"scroll0=\") > -1
        // other scroll.com configuration keys can go here
    };
    $.ajax({
        dataType: \"script\",
        url:\"https://static.scroll.com/js/scroll.js\",
        cache: true,
        timeout: 5000
    });

    //get PHP GET variables
    var $_GET=[];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});

    // duplicate action bar to the bottom
    if (document.getElementById(\"action-bar-top\")) {
        var bar = document.getElementById(\"action-bar-top\").getElementsByClassName( 'actions-wrapper' )[0];
        var cln = bar.cloneNode(true);

        if(cln.children.length == 3){
            cln.children[0].id = \"bottom_main_list\";
            cln.children[1].id = \"bottom_more_button\";
            cln.children[2].id = \"bottom_more_list\";
            cln.children[1].setAttribute(\"onClick\", \"toggle_more_menu('bottom')\");
        }else if(cln.children.length == 2){
            cln.children[0].id = \"bottom_main_list\";
            cln.children[1].id = \"bottom_more_list\";
        }
        document.getElementById(\"action-bar-bottom\").appendChild(cln);
    }

    //duplicate action bar to the mobile-action-bar holder
    if(document.getElementById(\"mobile-actions-bar\")){
      var bar = document.getElementById(\"action-bar-top\").getElementsByClassName( 'page-actions' )[0];
      var cln = bar.cloneNode(true);

      document.getElementById(\"mobile-actions-bar\").appendChild(cln);
    }

    $(document).on('click', function(event) {
        var more_menu1 = document.getElementById(\"top_more_list\");
        if (more_menu1 && more_menu1.value != '') {
            if(!$(event.target).closest('#top_more_button').length && more_menu1.classList.contains('display')){
                more_menu1.classList.toggle(\"hidden_more_list\");
                more_menu1.classList.toggle(\"display\");

                var menu_button = document.getElementById(\"top_more_button\");
                menu_button.classList.toggle(\"is-open\");
            }
        }
        var more_menu2 = document.getElementById(\"bottom_more_list\");
        if (more_menu2 && more_menu2.value != '') {
            if (!$(event.target).closest('#bottom_more_button').length && more_menu2.classList.contains('display')) {
                more_menu2.classList.toggle(\"hidden_more_list\");
                more_menu2.classList.toggle(\"display\");

                var menu_button = document.getElementById(\"bottom_more_button\");
                menu_button.classList.toggle(\"is-open\");
            }
        }
    });

    //GENERAL: kill spans with hardcoded font-sizes
    $('span[style*=font-size]').attr('style','');
    //FORUMS: add class to any youtube iframe parent
    $('center > iframe[title*=video]').parent().addClass('video-holder');

    //GENERAL: Kill all hover menus (if active, and click occurs outside)
    $('html').click(function() {
        $('.active[data-kill-on=\"click-outside\"], .hover-menu.active').removeClass('active');
    });

    //GENERAL: prevent default on all dead-buttons (<a> that dont go anywhere);
    $('.dead-button').click(function(e){  e.preventDefault();  });

    $('.hover-menu, .hover-menu-toggle, *[data-hover-menu-target]').click(function(event){
        event.stopPropagation();
    });

    //GENERAL: init mobile-menu toggles
    $('.mobile-menu-toggle-button').click(function(e){
        e.preventDefault();
        $('header#main-header-bar').toggleClass('mobile-menu-active');
    });

    //GENERAL: setup elements using \"data-click-toggle\" (with no target) to toggle a class on click
    $('body').on('click','*[data-click-toggle]:not([data-click-toggle-target])', function(e){ e.preventDefault();
        $(this).toggleClass( $(this).data('click-toggle') );
    });


    //GENERAL: setup elements using \"data-click-toggle\" (WITH a target) to toggle a class on another element on click
    $('body').on('click','*[data-click-toggle][data-click-toggle-target]',function(e){ e.preventDefault();
        e.stopPropagation();
        var target = $(this).data('click-toggle-target');
        if(target.indexOf(',') > -1){ //<-- Multiple targets
            var targets = target.split(\",\");
            for(var t in targets){
                $('#' + targets[t] ).toggleClass( $(this).data('click-toggle') );
            }
        } else {
            $('#' + target ).toggleClass( $(this).data('click-toggle') );
        }
    });

    //GENERAL: setup elements using \"data-click-toggle-exclusive\" to disable the class on all the siblings of the target
    $('body').on('click','*[data-click-toggle-exclusive]',function(e){ e.preventDefault();
        $('#' + $(this).data('click-toggle-target')).siblings().removeClass( $(this).data('click-toggle') );
        $('#' + $(this).data('click-toggle-target')).addClass( $(this).data('click-toggle') );
        $('.exclusive-toggle-active').removeClass('exclusive-toggle-active');
        $(this).addClass('exclusive-toggle-active');
    });

    //GENERAL: hover-menu / click-menu activation (header, user-avatar click menu)
    $('.hover-menu-toggle').unbind().click(function(){
        $( '#' + $(this).data('hover-menu-target') ).toggleClass('active');
    });
    //GENERAL: init scroll-to-top button
    $('.scroll-to-top').click(function(){ $('html, body').animate({scrollTop : 0},500);  });

    //GENERAL: init site-wide announcement banners
    $('body').on('click','a.kill-announcement-button',function(e){ e.preventDefault();
        $('a.kill-announcement-button').remove();
        $('.announcement-banner').addClass('dead');
        cookies.create('kill-announcement-banner','true',1,'/');
    });

    //GENERAL - USER PREFS: init any display toggles
    $('body').on('click','.display-toggles > li',function(e){ e.preventDefault();

        var toggle      = $(this).children('.display-toggle');

        var body_class  = '';
        var pref = '';

        //SIDEBAR AND MOBILE MENU OPTIONS
        if(toggle.hasClass('wide-load')) {
            body_class = \"wide-load\";
        } else if(toggle.hasClass('sticky-header')) {
            body_class = \"sticky-header\";
        } else if(toggle.hasClass('night-vision')) {
            body_class = \"night-vision\";
        } else if(toggle.hasClass('show-spoilers')) {
            body_class = \"show-spoilers\";
        }

        //PROFILE PAGE OPTIONS
        else if(toggle.hasClass('folders-open')) {
            body_class = \"folders-open\";
        } else if(toggle.hasClass('lefthand-sidebar')) {
            body_class = \"lefthand-sidebar\";
        } else if(toggle.hasClass('highlight-links')) {
            body_class = \"highlight-links\";
        } else if(toggle.hasClass('forum-gingerbread')) {
            body_class = \"forum-gingerbread\";
        } else if(toggle.hasClass('shared-avatars')) { //shared avatars is the only toggle that affects the DB
            body_class = \"shared-avatars\";
            pref = 'accept_share';
            var val = (!toggle.hasClass('active')) ? 1 : 0;
        } else if(toggle.hasClass('new-search')) {
            body_class = \"new-search\";
            pref = 'new_search';
            var val = (!toggle.hasClass('active')) ? 1 : 0;
        } else if(toggle.hasClass('stop-auto-play-video')) {
            body_class = \"stop-auto-play-video\";
            pref = 'stop_auto_play_video';
            var val = (!toggle.hasClass('active')) ? 1 : 0;
        }

        if(pref == 'accept_share' || pref == 'new_search' || pref == 'stop_auto_play_video') {
            $.ajax({
                type: 'POST',
                url: '/ajax/toggle_user_prefs.php',
                data: {
                    'pref': pref,
                    'value': val
                }
            });

            $('form.search').submit(function(e){

                if(cookies.read('new-search') == 'true') {
                    // e.preventDefault();
                    $(this).attr('action', \"/pmwiki/elastic_search_result.php\");
                }
            });
        }

        //just for random toggles, not found in sidebar or profile page (ie. wysiwyg editor toggle)
        if(toggle.attr('data-toggle')){
            toggle.toggleClass('active');
        }

        $('.display-toggle.' + body_class ).toggleClass('active');
        $('#user-prefs').toggleClass(body_class);
        if( $('#user-prefs').hasClass(body_class)){
            cookies.create(body_class,'true',300,'/');
        } else {
            cookies.remove(body_class);
            //if spoilers, kill all revealed spoilers
            if(body_class === \"show-spoilers\"){ $('.spoiler').removeClass('off'); }
        }

    });

    // Switch the nav search to the new Elastic Search
    // if the cookie is set
    $('form.search').submit(function(e){

        if(cookies.read('new-search') == 'true') {
            // e.preventDefault();
            $(this).attr('action', \"/pmwiki/elastic_search_result.php\");
        }
    });

    //special code for the desktop-on-mobile-toggle cookie link
    $('body').on('click','#desktop-on-mobile-toggle > a',function(e){ e.preventDefault();
      var body_class = \"desktop-on-mobile\";
      if( $('#user-prefs').hasClass(body_class) ){
          cookies.remove(body_class);
      } else {
          cookies.create(body_class,'true',300,'/');
      }
      location.reload();
    });


    //FANCY TABLES
    //for handling how tables change at mobile resolution
    $('#main-article table').wrap('<div class=\"table-wrapper\"></div>');
    $('#main-article table > thead > tr:first-of-type > th').each(function(){
        var ta = $(this).data('align');
        var ma = $(this).data('mobile-align');
        var condense = $(this).data('condense');
        var mw = $(this).data('mobile-width');
        var mo = $(this).data('mobile-order');
        var mh = $(this).data('mobile-full-height');
        var ww = $(this).data('word-wrap');
        var mr = $(this).data('mobile-margin');
        var ts = $(this).data('font-size');
        var off = $(this).data('toggle-off'); //set to: tablet, mobile, tiny

        if(mh) {
            var position = $(this).position();
            //var mh_leftmargin = 100 * ( position.left / $(this).closest('thead').width() );
            var im = ( $(this).data('inner-margin') ) ? $(this).data('inner-margin') : 0;
        }

        var i = $(this).index();

        $(this).closest('table').children().children().each(function(){
            if(off) $(this).children().eq(i).addClass(off+\"-off\");
            if(ta) $(this).children().eq(i).attr('data-align',ta).css('text-align',ta);
            if(ma) $(this).children().eq(i).addClass('mobile-align-' + ma);
            if(ts) $(this).not( $('thead tr') ).children().eq(i).addClass('font-'+ts);
            if(ww) $(this).children().eq(i).wrapInner('<span class=\"no-wrap\"></span>');
            if(condense) $(this).children().eq(i).addClass('condensed').wrapInner('<span class=\"wrapper\"></span>');
            if(mw) $(this).children().eq(i).addClass('mobile-width-' + mw);
            if(mo) $(this).children().eq(i).addClass('mobile-order-' + mo);
            if(mr) $(this).children().eq(i).addClass('mobile-margin-right-' + mr);
            if(mh) $(this).children().eq(i).addClass('full-height-wrapper').wrapInner('<span class=\"mobile-full-height mobile-margin-left-'+ im +' mobile-width-'+ mw +'\"><span class=\"vertical-middle\"></span></span>');
        });
    });

    //AUTOSIZE TEXTAREAs
    //COPY/PASTE from stackexchange: for autoheight control of textareas
    var span = $('<span>').css('display','inline-block')
                          .css('word-break','break-all')
                          .css('white-space','pre-wrap')
                          .appendTo('body').css('visibility','hidden').css('display','none');
    function initSpan(textarea){
      span.text(textarea.text())
          .width(textarea.width())
          .css('font',textarea.css('font'));
    }
    function autoHeight(textarea){
        var text = textarea.val();
        span.text(text);
        textarea.height(text ? 60 + span.height() : '1.1em');
    }

    $('textarea.auto-height').on({
        input: function(){
           autoHeight($(this));
        },
        focus: function(){
           initSpan($(this));
        },
        keypress: function(e){
           if(e.which == 13){
                autoHeight($(this));
           }
        }
    });

    $('textarea.auto-height').each(function(e){
        initSpan($(this));
        autoHeight($(this));

    });

    //add retro-folders class to all article-contents
    //$(\"div#main-container div#main-content #main-entry .article-content\").addClass('retro-folders');

    //HEADER: activate mobile search toggle
    $('body').on('click','.mobile-search-toggle', function(e){ e.preventDefault();
        $(\"#main-header-bar\").toggleClass( 'mobile-search-active' );
        if($(\"#main-header-bar\").hasClass('mobile-search-active')){
            $(\"#search-box .search-box\").focus();
        }
    });

    //ARTICLE PAGE & FORUMS: Edit button
    $('body').on('click','.article-edit-button',function(e){

        // For if we want to turn editing back off
        if(tvtropes_config.pause_editing == 1){
            e.preventDefault();
            alert(tvtropes_config.pause_editing_msg);
        }
        // Editing is still on
        else{
            if( $(this).attr('data-groupname') && $(this).attr('data-title') ){
                e.preventDefault();
                check_troper_lock( $(this).data('groupname'), $(this).data('title'), $(this).attr('href') );
            }
        }
    });

    //ARTICLE PAGE & FORUMS: Spoilers
    $('.spoiler').on('click',function(){
        $(this).toggleClass('off');
    });

    //ARTICLE PAGE & FORUMS: IF show all folders is toggled on
    if( $(\"#user-prefs\").hasClass('folders-open') ){

      $('.folderlabel').addClass('is-open');

    }

    //ARTICLE PAGE & FORUMS: move open/close toggle inside <h2>EXAMPLES
    if( !$('#main-article').hasClass('retro-folders') && $( 'div.folderlabel[onclick=\"toggleAllFolders();\"]' ).length) {

        if( $('h2:contains(\"Examples\")').length ){
            $('h2:contains(\"Examples\")').addClass('examples-header');
            $('div.folderlabel[onclick=\"toggleAllFolders();\"]').removeClass('folderlabel').addClass('toggle-all-folders-button').appendTo($('h2:contains(\"Examples\")'));
        }else{
            $('div.folderlabel[onclick=\"toggleAllFolders();\"]').wrap(\"<span class='folder-button-wrapper'></span>\").removeClass('folderlabel').addClass('toggle-all-folders-button');
        }

    }else{
      $('#main-article.retro-folders *[onclick*=\"toggleAllFolders()\"]').addClass('toggle-all-folders-button');
    }
    //ARITCLE PAGE: hide notes & setup toggle notes with pointers on hover
    $('*[isnote=\"true\"]').css('display','none').addClass('font-s');
    $('*[onclick*=\"togglenote\"]').css('cursor','pointer');

    //activate toggle all folder dropdowns
    $('body').on('click','.toggle-all-folders-button',function(e){ e.preventDefault();
        if( $(this).hasClass('is-open') ){
            $('.folderlabel, .toggle-all-folders-button').removeClass('is-open');
        }else{
            $('.folderlabel, .toggle-all-folders-button').addClass('is-open');
        }
    });


    //GENERAL - FORMS: Check for hidden buttons that should only appear when the form is changed/updated
    $(\"button.hidden-save-button\").closest('.column-box').addClass('with-hidden-button').closest('form').on('change keypress paste focus textInput input',function(){

        $(this).addClass('show-save-button');

    });

    //GENERAL - FORMS: Reset buttons
    $('*[data-reset-form-onclick]').click(function(e){
        //$( '#' + $(this).data('reset-form-onclick') ).find(\"input[type='checkbox']\").reset();
        $(\"#browse-form input\").removeAttr('checked').removeAttr('selected');
    });

    //GENERAL: Form Validation
    $('body').on('submit','form.validate',function(e){ e.preventDefault();

        var target;
        var error_message = '';

        //validate all email forms
        $(this).find('input[validate-type=\"email\"]').each(function(i){

            if( /(.+)@(.+){2,}\\.(.+){2,}/.test( $(this).val()) == false){
                error_message = \"Whoops, please double check your email.\";
                target = $(this);
                return false;
            }

        });

        //if errors, display them and DO NOT send the form
        if(error_message.length > 0){
            throw_error($(this),error_message,target);
            return;
        }

        //no errors, everything is OK, send the form
        if($(this).attr('data-ajax-get')){

            var form = $(this);

            $.get( form.data('ajax-get') + \"?\" + form.serialize(), function(results) { eval(results); clear_form(form); });

        }else{

            $(this).get(0).submit();

        }

    });

    //Remove \".error\" class on input elements with errors
    $('body').on('change keypress paste textInput input','form *.error',function(){
        $(this).removeClass('error');
    });

    //GENERAL: Clear/reset forms
    var clear_form = function(e){ e.find(\"input[type=text], textarea\").val(\"\"); }

    //GENERAL: Form, return error message
    var throw_error = function(form,message,element){

        //no message, die
        if(!message.length) return;

        if(element.length) element.addClass('error');

        //create the reply message box, if it doesn't exist
        if(form.hasClass('modal-replies')){

            show_modal('alert',encodeURIComponent(message));

        }else{

            if(form.children('.message').length == 0 ){
                form.prepend('<div class=\"message error gutter-top\">'+message+'</div>');
            }else{
                form.children('.message').addClass('error').html(message);
            }

        }


    }

    //GENERAL: Copy url to clipboard button
    $('*[data-copy-url]').on('click',function(e){
        var $temp = $(\"<input>\");
        $(\"body\").prepend($temp);
        $temp.val( $(\"#\" + $(this).data('copy-url') ).text() ).select();
        document.execCommand(\"copy\");
        $temp.remove();


    });

    //ARTICLE PAGE: Toggle extra subpage links
    $('.subpage-toggle-button').click(function(){

        $(this).toggleClass('active');
        $('.tucked').toggleClass('untucked');

    });

    //ARTICLE PAGE: Toggle all folders button
    $('.folderlabel:not(.toggle-all-folders-button)').click(function(){
        $(this).toggleClass('is-open').parent().toggleClass('is-open');
    });

    //LAUNCH PAD - check height:
    if($(\"#launch-pad-draft-window\").height() >= 1200){
        $(\"#launch-pad-draft-window\").removeClass('active');
    }

    //COMPONENT
    //hover/click menu actions
    $('*[data-hover-menu-target]').click(function(e){

        e.preventDefault();

        $('.hover-menu:not(#'+ $(this).data('hover-menu-target') +')').removeClass('active');

        $( '#' + $(this).data('hover-menu-target') ).toggleClass('active'); /*.mouseleave(function(){
            $(this).removeClass('active');
        });*/
    });

    //call a modals from a div on the page (moslty just for alert/success/failure messages) (this method is a little dated, now using php cookies to drive popup alerts on page loads)
    $('*[data-call-modal]').each( function(i){
        //show_modal('alert-red','test');
        show_modal( $(this).data('call-modal'), $(this).html() );
    });
    //init all modal buttons
    $('body').on('click','*[data-modal-target]',function(e){

        //get modal and message
        var modal = $(this).data('modal-target');
        var msg = $(this).data('modal-vars');

        //skip modal and go straight to link
        if(modal==\"allow\") return;

        //don't allow link since we are showing a modal instead
        e.preventDefault();

        //add support for alert tags
        if(modal.substring(0,6)==\"alert-\") {

            //message array
            var msgArr = {
              \"alert-banned\" : \"Your permissions for this area have been suspended. Please visit <a href='/pmwiki/pmwiki.php/Administrivia/WhatToDoIfYouAreSuspended'>this page</a> for more details.\",
              \"alert-bounced\" : \"This account has committed severe or repeated violations of our rules and is permanently denied access to many of the account features of the site. If you feel that this may be an error, please <a href=\\\"/pmwiki/contact.php\\\">contact the mods</a>.\",
              \"alert-denied\" : \"Your account was denied by a moderator. If you believe this was done in error please <a href=\\\"/pmwiki/contact.php\\\">contact the mods</a>.\",
              \"alert-verify\" : \"You must verify your email address before doing this. Check your email for a link.\",
              \"alert-approval\" : \"Your account must be approved by a moderator before you can do this. If you still have this problem in a couple hours try <a href=\\\"/pmwiki/contact.php\\\">contacting the mods</a>.\",
              \"alert-age\" : \"Your account is not old enough. Give it a little more time.\",
              \"alert-mod\" : \"This page is only for moderators. Try something else.\",
            };

            if(modal in msgArr) msg = msgArr[modal];
            else msg = \"Unknown error. Please <a href=\\\"/pmwiki/contact.php\\\">Contact us</a> if the problem persists.\";

            modal = \"alert\";
        }

        //bring up modal now
        show_modal( modal, msg );
    });

    //init all modal confirmations
    $(\"*[data-modal-confirmation-url]\").unbind().click(function(e){ e.preventDefault(); show_modal( \"confirmation\", $(this).data('modal-confirmation-message'), $(this).data('modal-confirmation-url') ); });
    //init modal kill buttons
    $('body').on('click','.kill-modal-button',function(e){e.preventDefault(); kill_modal(); });

    //watch/tracking button code
    $('body').on('click','.watch-button',function(e){ e.preventDefault();

        if($(\"input[id='logged_in']\").val() == 'true') {
            $(this).addClass('processing');
        }

        //article
        if($(this).attr('data-watch-info')){

            var data = $(this).data('watch-info').split(','); //<-- [0] groupName, [1] title

            if(!data.length) return;

            var add_or_drop = ( $(this).hasClass('watching') || $(this).parent().hasClass('watching') ) ? 'drop' : 'add';

            handleWatchItem( add_or_drop,data[0],data[1],$(this) );

        //forum thread
        }else if($(this).attr('data-watch-thread-id')){

            var url = ( $(this).hasClass('watching') || $(this).parent().hasClass('watching') ) ? '/pmwiki/thread_watch_drop.php?thread=' : '/pmwiki/setthreadwatch.php?d_id=';
                url = url + $(this).attr('data-watch-thread-id');

            handleWatchThread( url,$(this) );

        }

    });

    //PROFILE/FORUM Image Gallery
    $('.gallery-content img:not(.cur-profile-img)').on('click', function(e) { e.preventDefault();

          $('.gallery-content img.cur-profile-img').removeClass('cur-profile-img');

          $(e.target).addClass('cur-profile-img');

          var imgSrc = $('.cur-profile-img').attr('src');
          $('.cur-profile-img').parent().addClass('processing');

          $.ajax({
              type: 'POST',
              url: '/ajax/change_profile_image.php',
              data: {
                  'src': imgSrc
              },
              success: function (json) {
                  data = JSON.parse(json);
                  if (data.success) {
                      $('.cur-profile-img').parent().removeClass('processing');
                  }
              }
          });

    });

    //ajax add/remove watched article
    var handleWatchItem = function(addOrDrop,groupname,title,obj) {

        $.ajax({
            type:           \"POST\",
            url:            \"/ajax/watchlist.php\",
            contentType :   \"application/x-www-form-urlencoded; charset=ISO-8859-1\",
            dataType:       \"json\",
            data: {
                'groupname': groupname,
                'title'    : title,
                'type'     : addOrDrop,
                'json'     : 1
            },

            success: function(data){

                $(obj).removeClass('processing');

                if( $(obj).hasClass('tile-watch-button') ){
                    $(obj).parent().toggleClass('watching');
                }else{
                    $(obj).toggleClass('watching');
                }

            },
            error: function(error_success) {
                $(obj).removeClass('processing');
                show_modal('alert-red','Whoops, something went wrong. Please try adding again.')
            }

        });

    }

    //ajax add/remove watched forum thread
    var handleWatchThread = function(url,obj) {

        $.ajax({
            type:           \"GET\",
            url:            url,

            success: function(data){

                $(obj).removeClass('processing');

                if( $(obj).hasClass('tile-watch-button') ){
                    $(obj).parent().toggleClass('watching');
                }else{
                    $(obj).toggleClass('watching');
                }

            },
            error: function(error_success) {
                $(obj).removeClass('processing');
                show_modal('alert-red','Whoops, something went wrong. Please try adding again.')
            }

        });

    }

    //Continue the Facebook signup flow
    //by prompting user to select a handle
    if($_GET['fb_token']){

        show_modal(\"fb-account-create\", undefined, undefined, undefined, $_GET['fb_token']);
    }
    //If a user attempts FB login without an account/link
    // prompt with modal
    else if($_GET['login_status']){

        if ($_GET['login_status'] == 'new') {
            show_modal (\"fb-account-create\");
        }
        else if ($_GET['login_status'] == 'link') {
            show_modal (\"fb-account-link\");
        }
    }


    // DISPLAY ANY RESPONSE/SUCCESS/FAILURE MODALS
    if(getCookie('response_modal') != '') {

        var response_modal = getCookie('response_modal');

        document.cookie = \"response_modal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\";

        if(response_modal == \"challenged\"){
                show_modal('alert', 'Succesfully challenged');
            }else if(response_modal == \"decline\"){
                show_modal('alert', 'Succesfully declined');
            }else if(response_modal == \"cut\"){
                show_modal('alert', 'Cut succesful');
            }else if(response_modal == \"submit\"){
                show_modal('alert', $_GET['msg']);
            }else if(response_modal == \"pr\" || response_modal == \"cvr\"){ //\"page reported\" or \"content violation report\"?>
                show_modal('alert', 'Thank you for reporting this page, a MOD will review this page shortly.');
            }else if(response_modal == \"cr\"){ //\"comment reported\"?>
                show_modal('alert', 'Thank you for reporting this comment, a MOD will review it shortly.');
            }else if(response_modal == \"ub\"){ //\"user blocked\"?>
                show_modal('alert', 'That troper has been blocked, sorry for that.');
            }else if(response_modal == \"new_account_pending_email_verification\"){ //\"new account just created, pending email verification\"?>
                show_modal('alert', \"Thank you for signing up to TVTropes. We've sent an email with a verification link, if you don't get it in the next five minutes please check your spam folder or you can resend it from your profile page.\");
            }else if(response_modal == \"new_account_success\"){ //\"new account just created, pending email verification\"?>
                show_modal('alert', \"Thanks for verifying your email. Your new TVTropes account is all set up, please click the login button in the top right and login to your new account.\");
            }else if(response_modal == \"new_account_fail\"){ //\"new account just created, pending email verification\"?>
                show_modal('alert', \"Whoops, looks like something went wrong. Sorry about that, please try re-registering a new account.\");
            }else if(response_modal == \"new_account_pending\"){ //\"new account just created, pending email verification\"?>
                show_modal('alert', \"Thank you for confirming. Your account is ready and you can login using the link in the top right, however all new users require approval before they can edit articles or post in the forum. You can expect a follow-up email when your account is fully approved.\")
            }else{
                show_modal('alert', response_modal);
            }
    }


    // **************************//
    //      Elastic Search      //
    // *************************//
    $('input[type=radio][name=search_type]').change(function() {

        var search_form = $('#elastic_search_form');
        var page_type_select = $(search_form).find('select[name=page_type]');
        var topic_select = $(search_form).find('select[name=topic]');

        var type = $(this).data('type');

        if(type == 'article'){

            $(page_type_select).prop(\"disabled\", false);
            $(topic_select).prop(\"disabled\", true);
        }
        else if(type == 'forum'){

            $(page_type_select).prop(\"disabled\", true);
            $(topic_select).prop(\"disabled\", false);
        }
    });

});

function request_log_check(){
    console.log(\"checking request logs\");

    // Check if our ad-free-visited cookie has been created
    if(cookies.read('ad-free-visited') == 1){
        console.log(\"Refreshing the page due to fake ad-clicks\");
        location.reload(true);
    }
    // Cookie doesn't exist
    else{
        setTimeout(request_log_check, 30000);
    }

    /*
    For removing the ad slot with Proper's code
    ProperMedia.ad_project.deleteSlot(\"{slot_name}\");
    */
}

$(\"#lock_pages_form\").submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');

    $.ajax({
       type: \"POST\",
       url: \"/pmwiki/edit_ban_actions.php\",
       data: form.serialize(),
       success: function(data){
           $(\"#success_message\").html(data);
       }
    });
});
"},517:e=>{e.exports="
var lastChecked = null;

function downloadAdScripts(img_domain) {
    console.log(\"Loading Ads\");

    var use_adblock=!0,load_proper_message_var=!1;\"function\"==typeof proper_callback_function&&(use_adblock=proper_callback_function()),window.addEventListener(\"proper-ad-bidders-blocked\",function(){use_adblock&&load_proper_message(\"load\")}),window.addEventListener(\"properEvents\",function(e){var s=document.cookie.match(\"(^|;)\\\\s*publife_session_data\\\\s*=\\\\s*([^;]+)\");!!s&&s.pop()||(use_adblock=!1),\"proper-ads-fired\"==e.detail.event&&use_adblock&&load_proper_message(\"whitelist\")});var script=document.createElement(\"script\");function load_proper_message(e){var s;!0!==load_proper_message_var&&(load_proper_message_var=!0,(s=document.createElement(\"script\")).type=\"text/javascript\",s.src=\"https://\"+tvtropes_config.adblock_url+\"/design/assets/bundle-message.js\",s.onload=\"load\"==e?function(){ProperMediaMessage.project.setSiteUrl(\"https://\"+tvtropes_config.adblock_url),ProperMediaMessage.project.show_shield_message(tvtropes_config.user_name,\"tvtropes\")}:\"whitelist\"==e||\"un-whitelist\"==e||\"subscribe\"==e||\"un-subscribe\"==e?function(){ProperMediaMessage.project.setSiteUrl(\"https://\"+tvtropes_config.adblock_url),ProperMediaMessage.project.updateUserInfo(e)}:function(){ProperMediaMessage.project.setSiteUrl(\"https://\"+tvtropes_config.adblock_url),ProperMediaMessage.project.updateUserInfo(\"time\")},document.getElementsByTagName(\"head\")[0].appendChild(s))}script.type=\"text/javascript\",script.src=\"https://global.proper.io/tvtropes.min.js\",script.onerror=function(){use_adblock&&load_proper_message(\"load\")},document.getElementsByTagName(\"head\")[0].appendChild(script);

    // Astri Livestream Ad mobile
    if((tvtropes_config.astri_stream_enabled || tvtropes_config.get_astri_stream == 'live') && !tvtropes_config.is_logged_in) {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var ad_unit_width = width - 30;
            var ad_unit_height = ad_unit_width * .8;
            $('<div style=\"margin:auto !important; width:' + ad_unit_width + 'px; padding-top: 15px;\"><div asterilivestream_profile=\"30_27\" asterilivestream_width=\"' + ad_unit_width + '\" asterilivestream_height=\"' + ad_unit_height + '\"></div></div>' +
                '<script type=\"text/javascript\" src=\"https://asteriresearch.com/livestream-latest.min.js\" async=\"\"><\/script>').insertAfter('#proper-ad-tvtropes_mobile_ad_2');
        } else {
            $('<div style=\"margin: 15px 10px 15px 18px !important\"><div asterilivestream_profile=\"30_27\" asterilivestream_width=\"300\" asterilivestream_height=\"250\"></div></div><script type=\"text/javascript\" src=\"https://asteriresearch.com/livestream-latest.min.js\" async=\"\"><\/script>').insertBefore('.quick-links');
        }
    }

}
// Callback for proper ads
function proper_callback_function(){
    console.log(\"Proper callback function found.\");

    if((tvtropes_config.adblock && tvtropes_config.adblock != 0) && (!snoozable || snoozable == \"\")) return true;

    return 0;
}

//MODALS
function show_modal (type,message, confirmation_url,call_back, fb_token, groupname, title, video_id){
    console.log(\"showing modal \"+type);
    kill_modal();

    //add loading graphic
    $('#modal-box').append( \"<div class='modal-loading-graphic'></div>\" );

    var alert = '';
    if (typeof message === 'object' && message !== null) {
        Object.keys(message).forEach(function(key) {
            alert = alert + '&' + key + '=' + encodeURIComponent(message[key])
            //console.log(key, message[key]);
        });
    } else {
        alert = '&message=' + encodeURIComponent(message)
    }

    //fetch and load #modal-box (found in header.php)
    var url = '/design/parts/component-modalBox.php?window=' + type + alert + (confirmation_url ? '&curl=' + encodeURIComponent(confirmation_url) : \"\") + (fb_token ? '&fb_token=' + encodeURIComponent(fb_token) : \"\") + (video_id ? '&video_id=' + encodeURIComponent(video_id) : \"\");

    $(\"#modal-box\").addClass('active').load(url,function(){
        if(call_back){ call_back(); }
    });

    //kill modal if blackout is clicked
    $(\"#modal-box\").click(function(e){ if(e.target == e.currentTarget){ kill_modal(); }  });

}

//modal kill function
function kill_modal(){
    // if(!$(\"#modal-box\").hasClass('paused')){
    $(\"#modal-box\").removeClass('active').html('');
    // }
}

//modal \"loading\" mode, without killing
function pause_modal(){

    $(\"#modal-box > div.modal\").addClass('hidden');
    $(\"#modal-box\").addClass('paused').append( \"<div class='modal-loading-graphic'></div>\" );

}
function unpause_modal(){

    $(\"#modal-box\").removeClass('paused');
    $(\"#modal-box > div.modal\").removeClass('hidden');
    $(\"#modal-box > div.modal-loading-graphic\").remove();

}

//COMPONENT: LOAD GRAPHIC
function show_loader (){
    kill_modal();
    $(\"#modal-box\").addClass('active').append( \"<div class='modal-loading-graphic'></div>\" );
}



//Remove Facebook Redirect Hash
if (window.location.hash == '#_=_'){
    history.replaceState
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
}

//SCROLL (added back during conflict resolution, don't know if it's actually needed, because I don't know if it was added to master before or after the conflicting branch might have removed it)
$(window).scroll(function(){

    //stick the social shares on article pages
    if( $(window).scrollTop() > 200 ) {
        $('.social-shares-wrapper.left-floating .social-shares').addClass('stuck');
    } else {
        $('.social-shares-wrapper.left-floating .social-shares').removeClass('stuck');
    }

});


var trackOutboundLink = function(url) {
    ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
            function () {
                //commented out to prevent redirect (use target=blank) to open outbound links in a new tab
                //document.location = url;
            }
    });
}

//create placeholers to avoid console errors
function toggleAllFolders(){ }
function togglefolder(id){ }
function setAllFolders(now){ }

function toggleinline(anchor) {
    var tgt = anchor.getElementsByTagName('div')[0];
    if(tgt.style.display == 'none')
        tgt.style.display='inline';
    else tgt.style.display='none';
}

function subpage(sel, title){
    var namespce = \"\"+getselection(sel);
    if(namespce.trim() == \"\") return;
    var url=\"/pmwiki/pmwiki.php/\"+namespce+\"/\"+title;
    window.location.href=url;
}

function togglenote(id){
    var ele=object(id);
    var state = ele.style.display;
    if(state=='none') ele.style.display='inline';
    if(state=='inline')ele.style.display='none';
}

function getRandomPage(type) {
    $.ajax({
        type: \"POST\",
        url: \"/pmwiki/randomitem.php?p=\"+type+\"&ajax=1\",
        //data: { p : type } ,
        success: function(data){
            window.location.assign(data);
        },
        error: function(error_success) {
            return false;
        }
    });
}

function check_troper_lock(groupname, title) {

    post_data = JSON.stringify({'groupname': groupname, 'title': title});
    $.ajax({
        type: \"POST\",
        url: \"/ajax/check_troper_lock.php\",
        contentType: \"application/json; charset=utf-8\",
        dataType: \"json\",
        data : post_data,
        success: function(data) {
            if( data.troper_locked == 1 ) {
                show_modal('alert',encodeURIComponent(\"This Article is checked out for <strong>\"+data.display_time+\"</strong> by <a href=/pmwiki/pmwiki.php/Tropers/\"+data.lock_troper+\">\"+data.lock_troper+\"</a>.<br>Please wait your turn.<br>For questions consult <a target='_blank' href=/pmwiki/pmwiki.php/Administrivia/LockedPages >this page </a> for more information on page locks.\"));
            }
            else if(data.admin_locked == 1 ){
                show_modal('alert',encodeURIComponent(\"This Article is under administrative lock and currently not editable. Please visit the <a target='_blank' href=/pmwiki/pmwiki.php/Administrivia/LockedPages>Administrivia Page</a> to learn more.\"));
            }
            else {
                window.location.href = \"http://\"+window.location.hostname+\"/pmwiki/pmwiki.php/\"+groupname+\"/\"+title+\"?action=edit\";
            }
        },
        error: function(error_success) {
            window.location.href = \"http://\"+window.location.hostname+\"/pmwiki/pmwiki.php/\"+groupname+\"/\"+title+\"?action=edit\";
        }
    });
}

String.prototype.trim=function(){return this.replace(/^\\s+/g,'').replace(/\\s+$/g,'');}
String.prototype.csv=function(){return this.replace(/\\s+/g,',');}
/*only used for ajax */
var blockreq;
function blockloaded(){return blockreq.status==200;}
function reqok(){return(blockreq&&blockloaded());}
function sendurl(url){delete blockreq;if(window.XMLHttpRequest){blockreq=new XMLHttpRequest();blockreq.open(\"get\",url,false);blockreq.send(null);}else if(window.ActiveXObject){try{blockreq=new ActiveXObject(\"Msxml2.XMLHTTP\");}catch(e1){try{blockreq=new ActiveXObject(\"Microsoft.XMLHTTP\");}catch(e2){}}if(blockreq){blockreq.open(\"get\",url,false);blockreq.send();}}}
function getNodeValue(obj,nodeName){var st=\"\";if(obj.hasChildNodes()){var i=0;while((st==\"\")&&(i<obj.childNodes.length)){if(!obj.childNodes[i].firstChild)return\"\";st=(obj.childNodes[i].nodeName==nodeName)?obj.childNodes[i].firstChild.nodeValue:getNodeValue(obj.childNodes[i],nodeName);i++;}}return st.trim();}
/* only used when editing */
function unlock(page) { var url = \"http://\"+window.location.hostname; url += \"/pmwiki/unlock.php?pagename=\"+page;sendurl(url);  var rd = \"\"+window.location.href;rd = rd.replace('?action=edit', '');window.location.href = rd;}
function checkauthor(event){var authorinput=object(\"authorinput\");var author=\"\"+authorinput.value;author=author.trim();if(author==\"\"){object(\"inputform\").action=\"#\";object(\"inputmessage\").innerHTML=\"please make up a wiki handle\";authorinput.focus();return false;} return true;}
function do_preview(){object('source').value=object('editarea').value;return false;}
/* edit-only ends */
function togglepanel(id){closeall(id);var ele=object(id);if(ele.style.display=='none')ele.style.display='block';else ele.style.display='none';}
function closeall(id){if(!object('wikileftpage'))return;var divs=object('wikileftpage').getElementsByTagName('div');for(var i=0;i<divs.length;i++){if(divs[i].id!=id&&divs[i].getAttribute('iscat')=='true') divs[i].style.display='none';}}
function getselection(pulldown){var st=\"\";for(var i=0;i<pulldown.options.length;i++)if(pulldown.options[i].selected){if(pulldown.options[i].value)st=pulldown.options[i].value;else st=pulldown.options[i].text;break;} return st;}
function createanchor(subject,url){subject.setAttribute('href',url);}
function findfor(){var target=\"\"+object('findfor').value;if(target==\"\")return;window.location.href='/pmwiki/el.php?findfor='+target;}

// forums
function previewPost() {

    var raw_html = $('#postedit').val();
    var preview_container = $('#preview-container');
    var preview_body = $('#preview-body');

    $.ajax({
        type: \"POST\",
        url: \"/../ajax/forum-post-preview.php\",
        data: {
            'raw_html' : raw_html
        },
        dataType: \"html\",
        success: function (data){

            preview_body.html(data);
            preview_container.show()

        },
        error: function(data){
            //alert('failure');
        }
    });
}

// forums
function hidePreview() {
    var preview_container = $('#preview-container');
    preview_container.hide();
}


//Mod Central
// This function controls the highlighting of the Mod Central topic selection control
jQuery.fn.topicMultiselect = function() {
    $(this).each(function() {
        var checkboxes = $(this).find(\"input:checkbox\");
        checkboxes.each(function() {
            var checkbox = $(this);
            // Highlight pre-selected checkboxes
            if (checkbox.prop(\"checked\"))
                checkbox.parent().addClass(\"topic-multiselect-on\");

            // Highlight checkboxes that the user selects
            checkbox.click(function() {
                if (checkbox.prop(\"checked\"))
                    checkbox.parent().addClass(\"topic-multiselect-on\");
                else
                    checkbox.parent().removeClass(\"topic-multiselect-on\");
            });
        });
    });
};

function getCookie(cname) {
    var name = cname + \"=\";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return \"\";
}

function check_nav_bar(position){
    if(position == 'top'){
        var nav = document.getElementById(\"action-bar-top\").getElementsByClassName('actions-wrapper')[0];
    }else{
        var nav = document.getElementById(\"action-bar-bottom\").getElementsByClassName('actions-wrapper')[0];
    }

    // Get the 'more' section
    var more             = document.getElementById(position+\"_more_list\");
    var button_offset    = document.getElementById(position+\"_more_button\").offsetLeft;
    var right_nav_offset = document.getElementsByClassName(\"action-bar-right\")[0].offsetLeft;

    if(window.innerWidth > 765){
        if((nav && more) && (nav.offsetHeight > 65 || more.offsetLeft < 0 || (button_offset > (right_nav_offset - 90)))){

            // Whole Nav bar
            var nav = document.getElementById(position+\"_main_list\");

            // Get the child that doesn't fit
            var child = nav.lastElementChild;

            // Remove child
            nav.removeChild(child);

            // Add child to more button
            more.appendChild(child);

            var button = document.getElementById(position+\"_more_button\");
            button.classList.remove(\"hidden\");

            // Resize again
            check_nav_bar(position);
        }
    }
    // Get the 'more' section
    var more = document.getElementById(position+\"_more_list\");

    var children = more.childNodes;

    for(var x=0; x<children.length; x++){
        children[x].classList.add(\"more_list_item\")
    }

    var nav    = document.getElementById(position+\"_main_list\");
    nav.classList.remove(\"hidden\");
}

function toggle_more_menu(position){
    var more_menu = document.getElementById(position+\"_more_list\");

    more_menu.classList.toggle(\"hidden_more_list\");
    more_menu.classList.toggle(\"display\");

    var menu_button = document.getElementById(position+\"_more_button\");

    menu_button.classList.toggle(\"is-open\");
}

function show_proper_player(){
    console.log(\"Checking proper player\");

    try{
        var maxDays = .25;
        var maxViewsDesktop = 4;
        var maxViewsMobile = 10;
        var minWidth = 768;
        var viewport_width = document.documentElement.clientWidth;

        window.properSpecialOps.video_enabled = true

        var cookie = cookies.read('proper-player-video-display');

        if(cookie != \"\"){
            try{
                cookie = JSON.parse(cookie);
            }catch(err){
                cookie = {\"expires\": \"\", \"count\": 0};

                console.log(\"Cookie not parsed correctly\");
            }
        }

        var expires = cookie.expires || \"\";
        var count = cookie.count || 0;

        if(expires == \"\" || expires == \"undefined\" || typeof expires === \"undefined\"){
            var date = new Date();
            date.setTime(date.getTime() + (maxDays * 24 * 60 * 60 * 1000));
            expires = date.toUTCString();
        }
        else expires = unescape(expires);

        if(count < maxViewsMobile || cookie == \"\"){
            // Mobile has more views than desktop
            if(viewport_width > minWidth && count >= maxViewsDesktop) return;

            // Create/Update cookie
            cookies.createWithExpire('proper-player-video-display', JSON.stringify({\"count\": count+1, \"expires\": escape(expires)}), expires, '/');

            ga('send', 'event', 'proper-player-triggered', count+1, 'displayed', {'nonInteraction': 1});

            var second = document.createElement(\"div\");
            second.setAttribute(\"class\", \"ads_by_salon_box\");

            var title_box = document.createElement(\"p\");
            title_box.setAttribute(\"class\", \"ads_by_salon_title\");

            var title = document.createTextNode(\"Can You Identify This Trope?\");

            var third = document.createElement(\"div\");
            third.setAttribute(\"class\", \"ads_by_salon_video_wrapper\");

            var fourth = document.createElement(\"div\");
            fourth.setAttribute(\"class\", \"inner_ads_by_salon_video_wrapper\");

            var element = document.createElement(\"div\");
            element.setAttribute(\"data-video-id\", \"salon-playlist-salon_featured\");
            element.setAttribute(\"data-small-player\", \"desktop_ad\");
            element.setAttribute(\"data-number-of-ads\", \"10\");
            element.setAttribute(\"data-autoplay\", \"1\");
            element.setAttribute(\"id\", \"tvtropes_instream_1\");

            var script = document.createElement(\"script\");
            var element2 = document.createTextNode(\"propervideotag.push(function() { propervideo_display('tvtropes_instream_1', 'tvtropes_instream_1', 'tvtropes', '\"+tvtropes_config.proper_video_host_url+\"'); });\");

            script.appendChild(element2);
            element.appendChild(script);

            second.appendChild(title_box);
            title_box.appendChild(title);
            second.appendChild(third);
            third.appendChild(fourth);
            fourth.appendChild(element);

            // Get random trope video, link to it with clickthrough as well
            $.ajax({
                type: \"GET\",
                url: \"/ajax/get_random_video.php?pageview=\"+count,
                success: function(json) {
                    var data = JSON.parse(json);

                    if(data.image && data.image != \"\") element.setAttribute(\"data-video-image\", data.image);
                    if(data.title && data.title != \"\") element.setAttribute(\"data-video-title\", data.title);
                    if(data.clickthrough_url && data.clickthrough_url != \"\") element.setAttribute(\"data-clickthrough-url\", data.clickthrough_url);

                    if(data.mp4_url && data.mp4_url != \"\") element.setAttribute(\"data-video-url\", data.mp4_url);
                    if(data.mpd_url && data.mpd_url != \"\") element.setAttribute(\"data-mpd-url\", data.mpd_url);
                    if(data.hls_url && data.hls_url != \"\") element.setAttribute(\"data-hls-url\", data.hls_url);

                    $.ajax({
                        dataType: \"script\",
                        url:tvtropes_config.proper_video_url,
                        cache: true,
                        timeout: 5000
                    });

                    document.getElementsByClassName(\"outer_ads_by_salon_wrapper\")[0].appendChild(second);
                }
            });
        }
    }
    catch(err){
        console.log(err.message);
        ga('send', 'event', 'proper-player-triggered', err.message, 'failed', {'nonInteraction': 1});
    }
}

$(function(){
    var viewport_width = document.documentElement.clientWidth;

    if(viewport_width > 768){
        $('.main_2').html(\"<div class='proper-ad-unit tvtropes_ad_5'><div id='proper-ad-tvtropes_ad_5'> <script>propertag.cmd.push(function() { proper_display('tvtropes_ad_5'); });<\/script></div></div>\");
    } else {
        $('.main_2').html(\"<span class='ad-caption'>Advertisement:</span><div class='proper-ad-unit tvtropes_mobile_ad_4'><div id='proper-ad-tvtropes_mobile_ad_4'> <script>propertag.cmd.push(function() { proper_display('tvtropes_mobile_ad_4'); });<\/script></div></div>\");
    }
});


//functions for Content Violations Page
function toggle_done(id){
url=\"/pmwiki/p5_toggle_done.php?id=\"+id;
sendurl(url);
return;
}
function closethis(id){
var disposition = object('disposition'+id).value;
url=\"/pmwiki/p5_closer.php?id=\"+id+\"&d=\"+encodeURI(disposition);
sendurl(url);
  if(blockreq && blockloaded()){
    var closer = object('closer'+id);
    var saved  = document.createElement('p');
    saved.innerHTML = \"Saved!\";
    closer.parentNode.replaceChild(saved, closer);
  }
return;
}
function p5vote(id, way, p5er ) {

url=\"/pmwiki/p5_voter.php?id=\"+id+\"&way=\"+way+\"&p5er=\"+p5er;
sendurl(url);
if(blockreq && blockloaded()){
object('voterblock'+id).innerHTML='<a href=\"javascript:undovote(\\''+id+'\\',\\''+way+'\\',\\''+p5er+'\\');\" >'
+'<img title=\"Click this to reverse what you just voted.\" src=\"https://static.tvtropes.org/pmwiki/pub/images/undo_5125.jpg\" /></a>';
}

var holder = object(way+id);
var cnt = new Number(holder.getAttribute('cnt'));
var angelcnt = new Number(object('angel'+id).getAttribute('cnt'));
var devilcnt = new Number(object('devil'+id).getAttribute('cnt'));
holder.innerHTML+=(
way=='angel'
?'<img class=\"angel_icon\" src=\"/images/angel_icon_cv.png\"/>'
:'<img class=\"devil_icon\" src=\"/images/devil_icon_cv.png\"/>'
);
holder.setAttribute('cnt', cnt+1);
cnt = new Number(holder.getAttribute('cnt'));
if(cnt>=3){
object('disposition'+id).style.display='block';
object('disposition'+id).focus();
object('closer'+id).style.display='inline';
}
}
function p5zap(id){
url=\"/pmwiki/p5_zap.php?id=\"+id;
sendurl(url);
if(blockreq && blockloaded()){
object('a_row'+id).style.display='none';
object('b_row'+id).style.display='none';
object('c_row'+id).style.display='none';
}
}
function undovote(id, way, p5er) {

var holder = object(way+id);
var cnt = new Number(holder.getAttribute('cnt'));
var angelcnt = new Number(object('angel'+id).getAttribute('cnt'));
var devilcnt = new Number(object('devil'+id).getAttribute('cnt'));
if(way=='angel') object('angel'+id).setAttribute('cnt',angelcnt-1);
if(way=='devil') object('devil'+id).setAttribute('cnt',devilcnt-1);
angelcnt = new Number(object('angel'+id).getAttribute('cnt'));
devilcnt = new Number(object('devil'+id).getAttribute('cnt'));
object('devil'+id).innerHTML=\"\";
object('angel'+id).innerHTML=\"\";

if(angelcnt>0)
for(var i=0;i<angelcnt;i++)
object('angel'+id).innerHTML+='<img class=\"angel_icon\" src=\"/images/angel_icon_cv.png\"/>' ;
if(devilcnt>0)
for(var i=0;i<devilcnt;i++)
object('devil'+id).innerHTML+='<img class=\"devil_icon\" src=\"/images/devil_icon_cv.png\"/>'
object(way+id).setAttribute('cnt', cnt-1);
cnt = new Number(object(way+id).getAttribute('cnt'));
if(cnt>=3){
object('disposition'+id).style.display='block';
object('disposition'+id).focus();
object('closer'+id).style.display='inline';
}else{
object('disposition'+id).style.display='none';
object('closer'+id).style.display='none';
}
var url=\"/pmwiki/p5_undovote.php?id=\"+id+\"&way=\"+way+\"&p5er=\"+p5er;
sendurl(url);
if(blockreq && blockloaded()){
object('voterblock'+id).innerHTML=\"<a href=\\\"javascript:p5vote('\"+id+\"', 'angel', '\"+p5er+\"');\\\"><img class=\\\"angel_icon\\\" src=\\\"/images/angel_icon_cv.png\\\"/></a>\"
+\"<a href=\\\"javascript:p5vote('\"+id+\"', 'devil', '\"+p5er+\"');\\\"><img class=\\\"devil_icon\\\" src=\\\"/images/devil_icon_cv.png\\\"/></a>\";
return;
}
}
//this function handles all of the subscription changes that can be done on the profile page
function handle_subscription(action, plan, changing, stripeId){
    show_loader();
    $.ajax({
        url: \"/ajax/subscriptions.php\",
        type: 'POST',
        data: {action:action, plan:plan, changing:changing, stripe_id:stripeId },
        success: function(data){
            data = JSON.parse(data);

            //all of the below statements update the dom depending on the event that just happened
            if(data.success == 1 && action == 'unsubscribe')  {
                kill_modal();
                show_modal('alert',`You have successfully cancelled your subscription and will incur no further charges. Your premium account benefits will remain in effect until ${data.date}.`);
                $('#account-ending-value').val('1');
                $('#unsubscribe').addClass('hide');
                $('#cancel_unsubscribe').removeClass('hide');
                $('#subscription_end_date').removeClass('hide');
                $('#update_payment').addClass('hide');
                $('#change_subscription').addClass('hide');
                $('#subscription_change_memo').addClass('hide');
                $('#cancel_change').addClass('hide');
            }

            if(data.success == 1 && action == 'cancel-unsubscribe')  {
                kill_modal();
                show_modal('alert', \"Thank you for choosing to keep your subscription! Your billing cycle will remain the same, and you will continue to have access to your account's premium features.\");
                $('#account-ending-value').val('0');
                $('#subscription_end_date').addClass('hide');
                $('#unsubscribe').removeClass('hide');
                $('#cancel_unsubscribe').addClass('hide');
                $('#update_payment').removeClass('hide');
                $('#change_subscription').removeClass('hide');
            }

            if(data.success == 1 && action == 'change-subscription'){
                kill_modal();
                show_modal('alert','You have successfully changed your subscription!');
                $('#cancel_change').removeClass('hide');
                $('#change_subscription').addClass('hide');
                $('#subscription_change_memo').removeClass('hide');
            }

            if(data.success == 1 && action == 'cancel-change'){
                kill_modal();
                show_modal('alert','You have successfully cancelled your subscription change!');
                $(\"body\").css(\"cursor\", \"default\");
                $('#cancel_change').addClass('hide');
                $('#change_subscription').removeClass('hide');
                $('#subscription_change_memo').addClass('hide');
            }

            if(data.success == 1 && action == 'update-payment'){
                let stripe = Stripe(data.stripe_id);

                stripe.redirectToCheckout({
                    sessionId: data.session_id
                }).then(function (result) {
                    console.log(\"Failed to send to checkout\")
                });
                kill_modal();
            }

        },
        error: function(result){
            kill_modal();
            console.log(\"server error occurred\", result);
        }
    });
}

//delete account
function delete_account(){
  show_loader();
    $.ajax({
        url: \"/ajax/delete_account.php\",
        type: 'POST',
        success: function(data){
            data = JSON.parse(data);
            if(data.success){
                window.location.replace('/');            }
        },
        error: function(result){
            kill_modal();
            console.log(\"server error occurred\", result);
        }
    });

}

function enableButton(){
  $(\"#yes-button\").prop(\"disabled\",false);
}
// redirect the page when a filter menu option is selected
$(document).on('change','#filter_index',function(){

if($(this).val()[0] == \"-\") return;

var url = window.location.href;
var new_url= url.split('?');
window.location = new_url[0] +\"?filter=\"+ $(this).val();
});
"},136:e=>{e.exports='/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.2.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=Array.isArray(d)))?(e?(e=!1,f=c&&Array.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\\\x20\\\\\\\r\\\
\\\\f]",L="(?:\\\\\\\\.|[\\\\w-]|[^\\0-\\\\xa0])+",M="\\\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\"((?:\\\\\\\\.|[^\\\\\\\\\\"])*)\\"|("+L+"))|)"+K+"*\\\\]",N=":("+L+")(?:\\\\(((\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\"((?:\\\\\\\\.|[^\\\\\\\\\\"])*)\\")|((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|"+M+")*)|.*)\\\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\\\]\'\\"]*?)"+K+"*\\\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\("+K+"*(even|odd|(([+-]|)(\\\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\\\d+)|))"+K+"*\\\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\("+K+"*((?:-\\\\d)?\\\\d*)"+K+"*\\\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\\d$/i,Y=/^[^{]+\\{\\s*\\[native \\w/,Z=/^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\\\\\([\\\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\\0-\\x1f\\x7f]|^-?\\d)|^-$|[^\\0-\\x1f\\x7f-\\uFFFF\\w-]/g,ca=function(a,b){return b?"\\0"===a?"\\ufffd":a.slice(0,-1)+"\\\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id=\'"+u+"\'></a><select id=\'"+u+"-\\r\\\\\' msallowcapture=\'\'><option selected=\'\'></option></select>",a.querySelectorAll("[msallowcapture^=\'\']").length&&q.push("[*^$]="+K+"*(?:\'\'|\\"\\")"),a.querySelectorAll("[selected]").length||q.push("\\\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href=\'\' disabled=\'disabled\'></a><select disabled=\'disabled\'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!=\'\']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"=\'$1\']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href=\'#\'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext;function B(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()}var C=/^<([a-z][^\\/\\0>:\\x20\\\r\
\\f]*)[\\x20\\\r\
\\f]*\\/?>(?:<\\/\\1>|)$/i,D=/^.[^:#\\[\\.,]*$/;function E(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):D.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(E(this,a||[],!1))},not:function(a){return this.pushStack(E(this,a||[],!0))},is:function(a){return!!E(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var F,G=/^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]+))$/,H=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||F,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:G.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),C.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};H.prototype=r.fn,F=r(d);var I=/^(?:parents|prev(?:Until|All))/,J={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function K(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return K(a,"nextSibling")},prev:function(a){return K(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return B(a,"iframe")?a.contentDocument:(B(a,"template")&&(a=a.content||a),r.merge([],a.childNodes))}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(J[a]||r.uniqueSort(e),I.test(a)&&e.reverse()),this.pushStack(e)}});var L=/[^\\x20\\\r\
\\f]+/g;function M(a){var b={};return r.each(a.match(L)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?M(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=e||a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function N(a){return a}function O(a){throw a}function P(a,b,c,d){var e;try{a&&r.isFunction(e=a.promise)?e.call(a).done(b).fail(c):a&&r.isFunction(e=a.then)?e.call(a,b,c):b.apply(void 0,[a].slice(d))}catch(a){c.apply(void 0,[a])}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,N,e),g(f,c,O,e)):(f++,j.call(a,g(f,c,N,e),g(f,c,O,e),g(f,c,N,c.notifyWith))):(d!==N&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==O&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:N,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:N)),c[2][3].add(g(0,a,r.isFunction(d)?d:O))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(P(a,g.done(h(c)).resolve,g.reject,!b),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)P(e[c],h(c),g.reject);return g.promise()}});var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&Q.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var R=r.Deferred();r.fn.ready=function(a){return R.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||R.resolveWith(d,[r]))}}),r.ready.then=R.then;function S(){d.removeEventListener("DOMContentLoaded",S),
a.removeEventListener("load",S),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",S),a.addEventListener("load",S));var T=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)T(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},U=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function V(){this.expando=r.expando+V.uid++}V.uid=1,V.prototype={cache:function(a){var b=a[this.expando];return b||(b={},U(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){Array.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(L)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var W=new V,X=new V,Y=/^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,Z=/[A-Z]/g;function $(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:Y.test(a)?JSON.parse(a):a)}function _(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Z,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=$(c)}catch(e){}X.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return X.hasData(a)||W.hasData(a)},data:function(a,b,c){return X.access(a,b,c)},removeData:function(a,b){X.remove(a,b)},_data:function(a,b,c){return W.access(a,b,c)},_removeData:function(a,b){W.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=X.get(f),1===f.nodeType&&!W.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),_(f,d,e[d])));W.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){X.set(this,a)}):T(this,function(b){var c;if(f&&void 0===b){if(c=X.get(f,a),void 0!==c)return c;if(c=_(f,a),void 0!==c)return c}else this.each(function(){X.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){X.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=W.get(a,b),c&&(!d||Array.isArray(c)?d=W.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return W.get(a,c)||W.access(a,c,{empty:r.Callbacks("once memory").add(function(){W.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=W.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var aa=/[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/.source,ba=new RegExp("^(?:([+-])=|)("+aa+")([a-z%]*)$","i"),ca=["Top","Right","Bottom","Left"],da=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ea=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function fa(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&ba.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ga={};function ha(a){var b,c=a.ownerDocument,d=a.nodeName,e=ga[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ga[d]=e,e)}function ia(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=W.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&da(d)&&(e[f]=ha(d))):"none"!==c&&(e[f]="none",W.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ia(this,!0)},hide:function(){return ia(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){da(this)?r(this).show():r(this).hide()})}});var ja=/^(?:checkbox|radio)$/i,ka=/<([a-z][^\\/\\0>\\x20\\\r\
\\f]+)/i,la=/^$|\\/(?:java|ecma)script/i,ma={option:[1,"<select multiple=\'multiple\'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ma.optgroup=ma.option,ma.tbody=ma.tfoot=ma.colgroup=ma.caption=ma.thead,ma.th=ma.td;function na(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&B(a,b)?r.merge([a],c):c}function oa(a,b){for(var c=0,d=a.length;c<d;c++)W.set(a[c],"globalEval",!b||W.get(b[c],"globalEval"))}var pa=/<|&#?\\w+;/;function qa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(pa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ka.exec(f)||["",""])[1].toLowerCase(),i=ma[h]||ma._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=na(l.appendChild(f),"script"),j&&oa(g),c){k=0;while(f=g[k++])la.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var ra=d.documentElement,sa=/^key/,ta=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ua=/^([^.]*)(?:\\.(.+)|)/;function va(){return!0}function wa(){return!1}function xa(){try{return d.activeElement}catch(a){}}function ya(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ya(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=wa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(ra,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(L)||[""],j=b.length;while(j--)h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.hasData(a)&&W.get(a);if(q&&(i=q.events)){b=(b||"").match(L)||[""],j=b.length;while(j--)if(h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\\\.)"+o.join("\\\\.(?:.*\\\\.|)")+"(\\\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&W.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(W.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&B(this,"input"))return this.click(),!1},_default:function(a){return B(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?va:wa,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:wa,isPropagationStopped:wa,isImmediatePropagationStopped:wa,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=va,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=va,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=va,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&sa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ta.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return ya(this,a,b,c,d)},one:function(a,b,c,d){return ya(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=wa),this.each(function(){r.event.remove(this,a,c,b)})}});var za=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\\/\\0>\\x20\\\r\
\\f]*)[^>]*)\\/>/gi,Aa=/<script|<style|<link/i,Ba=/checked\\s*(?:[^=]|=\\s*.checked.)/i,Ca=/^true\\/(.*)/,Da=/^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g;function Ea(a,b){return B(a,"table")&&B(11!==b.nodeType?b:b.firstChild,"tr")?r(">tbody",a)[0]||a:a}function Fa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ga(a){var b=Ca.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ha(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(W.hasData(a)&&(f=W.access(a),g=W.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}X.hasData(a)&&(h=X.access(a),i=r.extend({},h),X.set(b,i))}}function Ia(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ja.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ja(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Ba.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ja(f,b,c,d)});if(m&&(e=qa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(na(e,"script"),Fa),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,na(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ga),l=0;l<i;l++)j=h[l],la.test(j.type||"")&&!W.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Da,""),k))}return a}function Ka(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(na(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&oa(na(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(za,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=na(h),f=na(a),d=0,e=f.length;d<e;d++)Ia(f[d],g[d]);if(b)if(c)for(f=f||na(a),g=g||na(h),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);else Ha(a,h);return g=na(h,"script"),g.length>0&&oa(g,!i&&na(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(U(c)){if(b=c[W.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[W.expando]=void 0}c[X.expando]&&(c[X.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ka(this,a,!0)},remove:function(a){return Ka(this,a)},text:function(a){return T(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.appendChild(a)}})},prepend:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(na(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return T(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Aa.test(a)&&!ma[(ka.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(na(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ja(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(na(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var La=/^margin/,Ma=new RegExp("^("+aa+")(?!px)[a-z%]+$","i"),Na=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",ra.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,ra.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Oa(a,b,c){var d,e,f,g,h=a.style;return c=c||Na(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ma.test(g)&&La.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Pa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Qa=/^(none|table(?!-c[ea]).+)/,Ra=/^--/,Sa={position:"absolute",visibility:"hidden",display:"block"},Ta={letterSpacing:"0",fontWeight:"400"},Ua=["Webkit","Moz","ms"],Va=d.createElement("div").style;function Wa(a){if(a in Va)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ua.length;while(c--)if(a=Ua[c]+b,a in Va)return a}function Xa(a){var b=r.cssProps[a];return b||(b=r.cssProps[a]=Wa(a)||a),b}function Ya(a,b,c){var d=ba.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Za(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ca[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ca[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ca[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ca[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ca[f]+"Width",!0,e)));return g}function $a(a,b,c){var d,e=Na(a),f=Oa(a,b,e),g="border-box"===r.css(a,"boxSizing",!1,e);return Ma.test(f)?f:(d=g&&(o.boxSizingReliable()||f===a.style[b]),"auto"===f&&(f=a["offset"+b[0].toUpperCase()+b.slice(1)]),f=parseFloat(f)||0,f+Za(a,b,c||(g?"border":"content"),d,e)+"px")}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Oa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=Ra.test(b),j=a.style;return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:j[b]:(f=typeof c,"string"===f&&(e=ba.exec(c))&&e[1]&&(c=fa(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(j[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i?j.setProperty(b,c):j[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b),i=Ra.test(b);return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Oa(a,b,d)),"normal"===e&&b in Ta&&(e=Ta[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Qa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?$a(a,b,d):ea(a,Sa,function(){return $a(a,b,d)})},set:function(a,c,d){var e,f=d&&Na(a),g=d&&Za(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=ba.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ya(a,c,g)}}}),r.cssHooks.marginLeft=Pa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Oa(a,"marginLeft"))||a.getBoundingClientRect().left-ea(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ca[d]+b]=f[d]||f[d-2]||f[0];return e}},La.test(a)||(r.cssHooks[a+b].set=Ya)}),r.fn.extend({css:function(a,b){return T(this,function(a,b,c){var d,e,f={},g=0;if(Array.isArray(b)){for(d=Na(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function _a(a,b,c,d,e){return new _a.prototype.init(a,b,c,d,e)}r.Tween=_a,_a.prototype={constructor:_a,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=_a.propHooks[this.prop];return a&&a.get?a.get(this):_a.propHooks._default.get(this)},run:function(a){var b,c=_a.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):_a.propHooks._default.set(this),this}},_a.prototype.init.prototype=_a.prototype,_a.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},_a.propHooks.scrollTop=_a.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=_a.prototype.init,r.fx.step={};var ab,bb,cb=/^(?:toggle|show|hide)$/,db=/queueHooks$/;function eb(){bb&&(d.hidden===!1&&a.requestAnimationFrame?a.requestAnimationFrame(eb):a.setTimeout(eb,r.fx.interval),r.fx.tick())}function fb(){return a.setTimeout(function(){ab=void 0}),ab=r.now()}function gb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ca[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function hb(a,b,c){for(var d,e=(kb.tweeners[b]||[]).concat(kb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&da(a),q=W.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],cb.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=W.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ia([a],!0),j=a.style.display||j,k=r.css(a,"display"),ia([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=W.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ia([a],!0),m.done(function(){p||ia([a]),W.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=hb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],Array.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=kb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=ab||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(i||h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:ab||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);f<g;f++)if(d=kb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,hb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j}r.Animation=r.extend(kb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return fa(c.elem,a,ba.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(L);for(var c,d=0,e=a.length;d<e;d++)c=a[d],kb.tweeners[c]=kb.tweeners[c]||[],kb.tweeners[c].unshift(b)},prefilters:[ib],prefilter:function(a,b){b?kb.prefilters.unshift(a):kb.prefilters.push(a)}}),r.speed=function(a,b,c){var d=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off?d.duration=0:"number"!=typeof d.duration&&(d.duration in r.fx.speeds?d.duration=r.fx.speeds[d.duration]:d.duration=r.fx.speeds._default),null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){r.isFunction(d.old)&&d.old.call(this),d.queue&&r.dequeue(this,d.queue)},d},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(da).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=kb(this,r.extend({},a),f);(e||W.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=W.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&db.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=W.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),r.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(ab=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),ab=void 0},r.fx.timer=function(a){r.timers.push(a),r.fx.start()},r.fx.interval=13,r.fx.start=function(){bb||(bb=!0,eb())},r.fx.stop=function(){bb=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var lb,mb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return T(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?lb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),
null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&B(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(L);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),lb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\\w+/g),function(a,b){var c=mb[b]||r.find.attr;mb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=mb[g],mb[g]=e,e=null!=c(a,b,d)?g:null,mb[g]=f),e}});var nb=/^(?:input|select|textarea|button)$/i,ob=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return T(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):nb.test(a.nodeName)||ob.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function pb(a){var b=a.match(L)||[];return b.join(" ")}function qb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,qb(this)))});if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,qb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,qb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(L)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=qb(this),b&&W.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":W.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+pb(qb(c))+" ").indexOf(b)>-1)return!0;return!1}});var rb=/\\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:pb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!B(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(Array.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var sb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!sb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\\\.)"+q.join("\\\\.(?:.*\\\\.|)")+"(\\\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,sb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(W.get(h,"events")||{})[b.type]&&W.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&U(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!U(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=W.access(d,b);e||d.addEventListener(a,c,!0),W.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=W.access(d,b)-1;e?W.access(d,b,e):(d.removeEventListener(a,c,!0),W.remove(d,b))}}});var tb=a.location,ub=r.now(),vb=/\\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var wb=/\\[\\]$/,xb=/\\r?\
/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(Array.isArray(b))r.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(Array.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!ja.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:Array.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(xb,"\\r\
")}}):{name:b.name,value:c.replace(xb,"\\r\
")}}).get()}});var Bb=/%20/g,Cb=/#.*$/,Db=/([?&])_=[^&]*/,Eb=/^(.*?):[ \]*([^\\r\
]*)$/gm,Fb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Gb=/^(?:GET|HEAD)$/,Hb=/^\\/\\//,Ib={},Jb={},Kb="*/".concat("*"),Lb=d.createElement("a");Lb.href=tb.href;function Mb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(L)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nb(a,b,c,d){var e={},f=a===Jb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Ob(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Pb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Qb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:tb.href,type:"GET",isLocal:Fb.test(tb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\\bxml\\b/,html:/\\bhtml/,json:/\\bjson\\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Ob(Ob(a,r.ajaxSettings),b):Ob(r.ajaxSettings,a)},ajaxPrefilter:Mb(Ib),ajaxTransport:Mb(Jb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Eb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||tb.href)+"").replace(Hb,tb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(L)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Lb.protocol+"//"+Lb.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Nb(Ib,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Gb.test(o.type),f=o.url.replace(Cb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(Bb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(vb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Db,"$1"),n=(vb.test(f)?"&":"?")+"_="+ub++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Kb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Nb(Jb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Pb(o,y,d)),v=Qb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Rb={0:200,1223:204},Sb=r.ajaxSettings.xhr();o.cors=!!Sb&&"withCredentials"in Sb,o.ajax=Sb=!!Sb,r.ajaxTransport(function(b){var c,d;if(o.cors||Sb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Rb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\\b(?:java|ecma)script\\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Tb=[],Ub=/(=)\\?(?=&|$)|\\?\\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Tb.pop()||r.expando+"_"+ub++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ub.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ub.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ub,"$1"+e):b.jsonp!==!1&&(b.url+=(vb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Tb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=C.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=qa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=pb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length},r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),b=f.ownerDocument,c=b.documentElement,e=b.defaultView,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),B(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||ra})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return T(this,function(a,d,e){var f;return r.isWindow(a)?f=a:9===a.nodeType&&(f=a.defaultView),void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Pa(o.pixelPosition,function(a,c){if(c)return c=Oa(a,b),Ma.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return T(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.holdReady=function(a){a?r.readyWait++:r.ready(!0)},r.isArray=Array.isArray,r.parseJSON=JSON.parse,r.nodeName=B,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Vb=a.jQuery,Wb=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Wb),b&&a.jQuery===r&&(a.jQuery=Vb),r},b||(a.jQuery=a.$=r),r});
'},365:e=>{e.exports='/////////////////// LAZY LOADING FUNCTIONS ///////////////////

if(\'IntersectionObserver\' in window && typeof(observer) === "undefined"){
    // We don\'t need to build the observer here anymore since we are building observers per item group
    var observers = [];
}
// If observer doesn\'t exist, add event listeners
else if(typeof(observer) === "undefined"){
    window.addEventListener(\'scroll\', throttle(classic_lazy_load, 16));
    window.addEventListener(\'resize\', throttle(classic_lazy_load, 16));
}

var video_upload_loaded = false;
var global_items = [];
var device_type = get_device_type();
// var lazy_loaded_rev_content = false;

// Lazy Load images
lazy_load(".lazy-image", // Query
          "forever", // How long event listener should last ("forever" or "once")
          300, // Pixels
          0, // Time
          "on", // Status
          "" // Callback
          );

// Lazy Load videos
lazy_load(".lazy-video-script", // Query
          "once", // How long event listener should last ("forever" or "once")
          500, // Pixels
          0, // Time
          "on", // Status
          load_video_scripts // Callback
          );

var req_id = 0;
// Initial call for lazy load
function lazy_load(query, style, in_advance, backup_time, status, callback){
    console.log("Lazy Loading items in query: "+query);
    req_id++;

    // If you just don\'t want to lazy load it, and you want it to load right away
    if(status == "off" || (status != "on" && device_type != status)){
        if(status == "off") var reason = "status is set to off";
        else var reason = "device type is: "+device_type+" and your status is set to: "+status;

        console.log("not lazy loading becuase "+reason);
        callback();
        return;
    }

    var intersection_observer = false;
    if(\'IntersectionObserver\' in window){
        intersection_observer = true;

        var interactSettings = {
            rootMargin: in_advance+\'px 0px \'+in_advance+\'px 0px\'
        };

        var observer = new IntersectionObserver(on_intersection, interactSettings);
        observers.push(observer);
    }

    // Get all items from query
    var items = document.querySelectorAll(query);

    // Add callback to each item
    for(var i = 0; i < items.length; i++){
        var item = items[i];
        if(callback != ""){
            var mycallback     = \'lazy_load_\'+guid()+"_"+req_id;
            window[mycallback] = callback;
            item.dataset.callback = mycallback;
        }

        // Setting timers to execute on item if not loaded in a certain amount of time (if specified)
        if(backup_time > 0) setTimeout(function(){ window[item.dataset.callback](); }, backup_time);

        if(intersection_observer) observer.observe(item);
    }

    // Lazy loaded classic style
    if(!intersection_observer){
        global_items.push({"style": style, "items": items, "in_advance": in_advance, "used": 0});

        classic_lazy_load();
    }
}
// On item intersection for IntersectionObserver
function on_intersection(items, this_observer){
    items.forEach(function(item){
        if(item.isIntersecting){
            this_observer.unobserve(item.target);

            // Images
            if(item.target.tagName == "IMG"){
                item.target.src = item.target.dataset.src;
                item.target.onload = function(item){ item.target.classList.add(\'loaded\') }
            }
            // Images in disguise as divs
            else if(item.target.classList.contains("video-background-image")){
                item.target.style.backgroundImage = "url(\'"+item.target.dataset.src+"\')";
                item.target.classList.add(\'loaded\');
            }
            // Load from the id
            else window[item.target.dataset.callback]();
        }
    });
}
// Classic lazy load if IntersectionObserver doesn\'t exist
function classic_lazy_load(){
    for(var i = 0; i < global_items.length; i++){
        var item_array = global_items[i];

        if(item_array.style == "once" && item_array.used > 0) continue;

        for(var x = 0; x < item_array.items.length; x++){
            var item = item_array.items[x];

            if(item.offsetTop < window.innerHeight + window.pageYOffset + item_array.in_advance){
                // Images
                if(item.tagName == "IMG"){
                    item.src = item.dataset.src;
                    item.onload = function(e){ item.classList.add(\'loaded\'); }
                }
                // Load from the id
                else window[item.dataset.callback]();

                item_array.used++;
            }
        }
    }
}
// Called on scroll or resize for when IntersectionObserver doesn\'t exist
function throttle(func, wait, options){
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if(!options) options = {};

    var later = function(){
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);

        if(!timeout) context = args = null;
    };

    return function(){
        var now = Date.now();

        if(!previous && options.leading === false) previous = now;

        var remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if(remaining <= 0 || remaining > wait){
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            result = func.apply(context, args);

            if(!timeout) context = args = null;
        }
        else if(!timeout && options.trailing !== false){
            timeout = setTimeout(later, remaining);
        }

        return result;
    };
}
// Get random string
function guid(){
    function s4(){
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1,5);
    }

    return s4() + s4() + \'_\' + s4() + s4();
}
// Get device type
function get_device_type(){
    var ua = navigator.userAgent.toLowerCase();
    var device_type = "";

    // This is usually "tablet", but for this case we are going to call it mobile
    if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua)) device_type = "mobile";
    // This is mobile
    else if(/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(ua)) device_type = "mobile";
    // Otherwise desktop
    else device_type = "desktop";

    return device_type;
}
// Load video scripts
function load_video_scripts(item){
    if(video_upload_loaded == true) return;
    video_upload_loaded = true;

    var element = document.createElement(\'script\');
    element.async = false;
    element.src = tvtropes_config.assets_domain+"/design/js/video_upload.js?rev="+tvtropes_config.revnum;
    document.getElementsByTagName(\'head\')[0].appendChild(element);
}
/*// Load revContent
function load_rev_content(){
    if(lazy_loaded_rev_content) return;
    lazy_loaded_rev_content = true;
    console.log("Loading RevContent");

    (function() {
        function test_adblock(func, id) {
            var t = \'0.1.2-dev\',
                el = document.createElement(\'div\');
            el.id = id ? id : \'sponsorText\';
            el.appendChild(document.createTextNode(\'&nbsp;\'));
            Object.assign(el.style, {
                left: \'-999px\',
                position: \'absolute\'
            });
            document.body.appendChild(el);
            setTimeout(function() {
                if (el) {
                    var o = el.clientHeight === 0;
                    func(o, t);
                    document.body.removeChild(el);
                }
            }, 200);
        }
        test_adblock(function(is_blocked) {
            var wid = is_blocked ? 137415 : 137414, target = document.getElementById(\'rc-adblock-widget\');
            target.setAttribute(\'data-widget-id\', wid);
            var script = document.createElement(\'script\');
            script.src = \'https://assets.revcontent.com/master/delivery.js\';
            script.defer = true;
            document.body.appendChild(script);
        })
    })();
}*/
'},685:e=>{e.exports=function(e){function t(e){"undefined"!=typeof console&&(console.error||console.log)("[Script Loader]",e)}try{"undefined"!=typeof execScript&&"undefined"!=typeof attachEvent&&"undefined"==typeof addEventListener?execScript(e):"undefined"!=typeof eval?eval.call(null,e):t("EvalError: No eval function available")}catch(e){t(e)}}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,n),i.exports}n(685)(n(136)),n(685)(n(285)),n(685)(n(517)),n(685)(n(365))})();