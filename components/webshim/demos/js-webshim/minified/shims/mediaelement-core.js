(function(e,t,n){"use strict";var r=t.audio&&t.video,i=!1,s=n.bugs,o=function(){n.ready(a,function(){n.mediaelement.createSWF||(n.mediaelement.loadSwf=!0,n.reTest([a],r))})},u=n.cfg.mediaelement,a=u&&u.player=="jwplayer"?"mediaelement-swf":"mediaelement-jaris",f;if(!u){n.error("mediaelement wasn't implemented but loaded");return}if(r){var l=document.createElement("video");t.videoBuffered="buffered"in l,i="loop"in l,n.capturingEvents(["play","playing","waiting","paused","ended","durationchange","loadedmetadata","canplay","volumechange"]),t.videoBuffered||(n.addPolyfill("mediaelement-native-fix",{f:"mediaelement",test:t.videoBuffered,d:["dom-support"]}),n.reTest("mediaelement-native-fix"))}if(r&&!u.preferFlash){var c=function(t){var r=t.target.parentNode;!u.preferFlash&&(e(t.target).is("audio, video")||r&&e("source:last",r)[0]==t.target)&&n.ready("DOM mediaelement",function(){f&&o(),n.ready("WINDOWLOAD "+a,function(){setTimeout(function(){f&&!u.preferFlash&&n.mediaelement.createSWF&&!e(t.target).closest("audio, video").is(".nonnative-api-active")?(u.preferFlash=!0,document.removeEventListener("error",c,!0),e("audio, video").mediaLoad(),n.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+t.target.src)):f||document.removeEventListener("error",c,!0)},20)})})};document.addEventListener("error",c,!0),e("audio, video").each(function(){this.error&&c({target:this})})}t.track&&!s.track&&function(){s.track||(s.track=typeof e("<track />")[0].readyState!="number");if(!s.track)try{new TextTrackCue(2,3,"")}catch(t){s.track=!0}var r=n.cfg.track,i=function(t){e(t.target).filter("track").each(o)},o=function(){if(s.track||!r.override&&e.prop(this,"readyState")==3)r.override=!0,n.reTest("track"),document.removeEventListener("error",i,!0),this&&e.nodeName(this,"track")?n.error("track support was overwritten. Please check your vtt including your vtt mime-type"):n.info("track support was overwritten. due to bad browser support")},u=function(){document.addEventListener("error",i,!0),s.track?o():e("track").each(o)};r.override||(n.isReady("track")?u():e(u))}(),n.register("mediaelement-core",function(e,n,l,c,h){f=swfobject.hasFlashPlayerVersion("9.0.115"),e("html").addClass(f?"swf":"no-swf");var p=n.mediaelement;p.parseRtmp=function(e){var t=e.src.split("://"),r=t[1].split("/"),i,s,o;e.server=t[0]+"://"+r[0]+"/",e.streamId=[];for(i=1,s=r.length;i<s;i++)!o&&r[i].indexOf(":")!==-1&&(r[i]=r[i].split(":")[1],o=!0),o?e.streamId.push(r[i]):e.server+=r[i]+"/";e.streamId.length||n.error("Could not parse rtmp url"),e.streamId=e.streamId.join("/")};var d=function(t,n){t=e(t);var r={src:t.attr("src")||"",elem:t,srcProp:t.prop("src")},i;if(!r.src)return r;i=t.attr("data-server"),i!=null&&(r.server=i),i=t.attr("type"),i?(r.type=i,r.container=e.trim(i.split(";")[0])):(n||(n=t[0].nodeName.toLowerCase(),n=="source"&&(n=(t.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),r.server?(r.type=n+"/rtmp",r.container=n+"/rtmp"):(i=p.getTypeForSrc(r.src,n,r),i&&(r.type=i,r.container=i))),i=t.attr("media"),i&&(r.media=i);if(r.type=="audio/rtmp"||r.type=="video/rtmp")r.server?r.streamId=r.src:p.parseRtmp(r);return r},v=!f&&"postMessage"in l&&r,m=function(){if(m.loaded)return;m.loaded=!0,e(function(){n.loader.loadList(["track-ui"])})},g=function(){var t;return function(){if(t||!v)return;t=!0,n.loader.loadScript("https://www.youtube.com/player_api"),e(function(){n.polyfill("mediaelement-yt")})}}(),y=function(){f?o():g()};n.addPolyfill("mediaelement-yt",{test:!v,d:["dom-support"]}),p.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":["mp4","mpg4","m4r","m4a","m4p","m4b","aac"],"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}},p.mimeTypes.source=e.extend({},p.mimeTypes.audio,p.mimeTypes.video),p.getTypeForSrc=function(t,n,r){if(t.indexOf("youtube.com/watch?")!=-1||t.indexOf("youtube.com/v/")!=-1)return"video/youtube";if(t.indexOf("rtmp")===0)return n+"/rtmp";t=t.split("?")[0].split("."),t=t[t.length-1];var i;return e.each(p.mimeTypes[n],function(e,n){if(n.indexOf(t)!==-1)return i=e,!1}),i},p.srces=function(t,n){t=e(t);if(!n){n=[];var r=t[0].nodeName.toLowerCase(),i=d(t,r);return i.src?n.push(i):e("source",t).each(function(){i=d(this,r),i.src&&n.push(i)}),n}t.removeAttr("src").removeAttr("type").find("source").remove(),e.isArray(n)||(n=[n]),n.forEach(function(e){var n=c.createElement("source");typeof e=="string"&&(e={src:e}),n.setAttribute("src",e.src),e.type&&n.setAttribute("type",e.type),e.media&&n.setAttribute("media",e.media),t.append(n)})},e.fn.loadMediaSrc=function(t,n){return this.each(function(){n!==h&&(e(this).removeAttr("poster"),n&&e.attr(this,"poster",n)),p.srces(this,t),e(this).mediaLoad()})},p.swfMimeTypes=["video/3gpp","video/x-msvideo","video/quicktime","video/x-m4v","video/mp4","video/m4p","video/x-flv","video/flv","audio/mpeg","audio/aac","audio/mp4","audio/x-m4a","audio/m4a","audio/mp3","audio/x-fla","audio/fla","youtube/flv","jwplayer/jwplayer","video/youtube","video/rtmp","audio/rtmp"],p.canThirdPlaySrces=function(t,n){var r="";if(f||v)t=e(t),n=n||p.srces(t),e.each(n,function(e,t){if(t.container&&t.src&&(f&&p.swfMimeTypes.indexOf(t.container)!=-1||v&&t.container=="video/youtube"))return r=t,!1});return r};var b={};p.canNativePlaySrces=function(t,n){var i="";if(r){t=e(t);var s=(t[0].nodeName||"").toLowerCase();if(!b[s])return i;n=n||p.srces(t),e.each(n,function(e,n){if(n.type&&b[s].prop._supvalue.call(t[0],n.type))return i=n,!1})}return i},p.setError=function(t,r){r||(r="can't play sources"),e(t).pause().data("mediaerror",r),n.warn("mediaelementError: "+r),setTimeout(function(){e(t).data("mediaerror")&&e(t).trigger("mediaerror")},1)};var w=function(){var e;return function(t,r,i){e||m(),n.ready(f?a:"mediaelement-yt",function(){p.createSWF?p.createSWF(t,r,i):e||(e=!0,y(),w(t,r,i))}),!e&&v&&!p.createSWF&&g()}}(),E=function(e,t,n,r,i){var s;n||n!==!1&&t&&t.isActive=="third"?(s=p.canThirdPlaySrces(e,r),s?w(e,s,t):i?p.setError(e,!1):E(e,t,!1,r,!0)):(s=p.canNativePlaySrces(e,r),s?t&&t.isActive=="third"&&p.setActive(e,"html5",t):i?(p.setError(e,!1),t&&t.isActive=="third"&&p.setActive(e,"html5",t)):E(e,t,!0,r,!0))},S=/^(?:embed|object|datalist)$/i,x=function(t,r){var i=n.data(t,"mediaelementBase")||n.data(t,"mediaelementBase",{}),s=p.srces(t),o=t.parentNode;clearTimeout(i.loadTimer),e.data(t,"mediaerror",!1);if(!s.length||!o||o.nodeType!=1||S.test(o.nodeName||""))return;r=r||n.data(t,"mediaelement"),E(t,r,u.preferFlash||h,s)};e(c).on("ended",function(t){var r=n.data(t.target,"mediaelement");if(i&&(!r||r.isActive=="html5")&&!e.prop(t.target,"loop"))return;setTimeout(function(){if(e.prop(t.target,"paused")||!e.prop(t.target,"loop"))return;e(t.target).prop("currentTime",0).play()},1)}),i||n.defineNodeNamesBooleanProperty(["audio","video"],"loop"),["audio","video"].forEach(function(t){var i=n.defineNodeNameProperty(t,"load",{prop:{value:function(){var e=n.data(this,"mediaelement");x(this,e),r&&(!e||e.isActive=="html5")&&i.prop._supvalue&&i.prop._supvalue.apply(this,arguments)}}});b[t]=n.defineNodeNameProperty(t,"canPlayType",{prop:{value:function(n){var i="";return r&&b[t].prop._supvalue&&(i=b[t].prop._supvalue.call(this,n),i=="no"&&(i="")),!i&&f&&(n=e.trim((n||"").split(";")[0]),p.swfMimeTypes.indexOf(n)!=-1&&(i="maybe")),i}}})}),n.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var e=this,t=n.data(e,"mediaelementBase")||n.data(e,"mediaelementBase",{});clearTimeout(t.loadTimer),t.loadTimer=setTimeout(function(){x(e),e=null},9)}});var T=function(){n.addReady(function(t,i){var s=e("video, audio",t).add(i.filter("video, audio")).each(function(){e.browser.msie&&n.browserVersion>8&&e.prop(this,"paused")&&!e.prop(this,"readyState")&&e(this).is('audio[preload="none"][controls]:not([autoplay])')?e(this).prop("preload","metadata").mediaLoad():x(this);if(r){var t,i,s=this,o=function(){var t=e.prop(s,"buffered");if(!t)return;var n="";for(var r=0,i=t.length;r<i;r++)n+=t.end(r);return n},u=function(){var t=o();t!=i&&(i=t,e(s).triggerHandler("progress"))};e(this).on({"play loadstart progress":function(e){e.type=="progress"&&(i=o()),clearTimeout(t),t=setTimeout(u,999)},"emptied stalled mediaerror abort suspend":function(e){e.type=="emptied"&&(i=!1),clearTimeout(t)}})}});!m.loaded&&e("track",s).length&&m(),s=null})};t.track&&!s.track&&n.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}}),r?(n.isReady("mediaelement-core",!0),T(),n.ready("WINDOWLOAD mediaelement",y)):n.ready(a,T),n.ready("WINDOWLOAD mediaelement",m)})})(jQuery,Modernizr,jQuery.webshims);