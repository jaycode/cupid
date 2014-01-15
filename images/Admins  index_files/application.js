// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
var smaller_player = null;
var larger_player = null;

function view_video_larger(el) {
  if ($f('player_small') != null) {
    $f('player_small').stop();
  }
  if (larger_player != null && typeof(larger_player.playVideo) != 'undefined') {
    //larger_player.seekTo(smaller_player.getCurrentTime(), true); 
    larger_player.playVideo();
    smaller_player.stopVideo(); 
  }
  return hs.htmlExpand(el, { contentId: 'popvid', width: 600});
}

function onYouTubePlayerReady(playerId) {
  smaller_player = document.getElementById("smaller_player");
  larger_player = document.getElementById("larger_player");
}


String.prototype.count=function(s1) { 
  return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
};

function get_text_in_middle(strToParse, strStart, strFinish)
{
	var str = "";
  if (strFinish == '') {
    str = strToParse.substring(strToParse.lastIndexOf(strStart) + strStart.length, strToParse.length);
  }
  else {
    str = strToParse.match(strStart + "(.*?)" + strFinish);
    if (str != null) {
      str = str[1];
    }
  }
if (str != null) {
  return(str);
}
else
  return('');
}

function mark_for_destroy(element, el_to_hide) {
  $(element).next('.should_destroy').value = 1;
  $(element).up(el_to_hide).hide();
}

var _authenticity_token = '';

document.observe('dom:loaded',
function()
{
  
  
//  window.onload = function() {
//    document.body.setStyle({opacity: 100});
//  };

  Custom.init();
  var my_field = $('sidebar_search_text');
  if (my_field) {
    my_field.defaultText('Search...', 'search_input_default_class');
  }
  $$('.side_news').each(function(el) {
    Event.observe(el,'click', function() {
      window.location = this.getElementsBySelector('.side_news-title a')[0].href;
    });
  });
  
  if ($('sidebar_search_reset') != null) {
    $('sidebar_search_reset').hide();
    Event.observe($('sidebar_search_text'), 'focus', function() {
      $('sidebar_search_text').morph("background:#FFF;width:150px");
      $('sidebar_search_reset').appear({duration: 0.4});
    });

    Event.observe($('sidebar_search_text'), 'blur', function() {
      $('sidebar_search_text').morph("background:#fff;width:80px");
      $('sidebar_search_reset').fade({duration: 0.4});
    });

    Event.observe($('sidebar_search_reset'), 'click', function() {
      $('sidebar_search_text').setValue('');
      $('sidebar_search_text').addClassName('search_input_default_class');
      $('sidebar_search_reset').hide();
    });
  }
  var tokens = $$('input[name=authenticity_token]');
  if (tokens.length > 0) {
    _authenticity_token = tokens[0].value;
  }
});

function prepare_highlight_links() {
  $$('.highlight-listing').each(function(el) {
    el.stopObserving('click');
    Event.observe(el,'click', function() {
      window.location = this.getElementsBySelector('.details p a')[0].href;
    });
  });
}

var selected;
var submitter = null;
function popupWindow(url) {
  window.open(url,'popupWindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=450,height=320,screenX=150,screenY=150,top=150,left=150');
}
function couponpopupWindow(url) {
  window.open(url,'couponpopupWindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=450,height=320,screenX=150,screenY=150,top=150,left=150');
}
function submitFunction($gv,$total) {
  if ($gv >=$total) {
    submitter = 1;
  }
}

function methodSelect(theMethod) {
  if (document.getElementById(theMethod)) {
    document.getElementById(theMethod).checked = 'checked';
  }
}
