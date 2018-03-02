$(function(){
	//构建轮播部分
	var carousel = new Vue({
        el: '#carousel',
        data: {
			type: [{no:'no7'},{no:'no8'},{no:'no1'},{no:'no2'},{no:'no3'},{no:'no4'},{no:'no5'},{no:'no6'}],
            items:[
                {name: '旅游攻略', text1: '富士山和白川乡', text2: '信仰的对象与艺术的源泉'},
                {name: '出行常识', text1: '穷游小常识', text2: '这30条背包穷游客不得不看'},
                {name: '资讯中心', text1: '2018春节我国旅游创收4750亿元', text2: '同比增长12.6％'},
                {name: '资讯中心', text1: '十国小记者齐聚都江堰', text2: '体验传统中国年'},
                {name: '地理中国' ,text1: '群峰时隐时现', text2: '黄山云海翻滚在千山万壑'},
                {name: '地理中国', text1: '高山流水鬼斧神工', text2: '神奇的熊猫放归地石棉'},
                {name: '环游世界', text1: '极光邂逅火山爆发', text2: '捕捉百年一遇壮观景色'},
                {name: '环游世界', text1: '令人惊艳的视觉之旅', text2: '英国的星空可以这么美'}
            ]
        }
    });
	//获取当前时间
	var time = new Date(),
		week = ['日', '一', '二', '三', '四', '五', '六'],
		timeInfo = [time.getFullYear(), time.getMonth()+1, time.getDate(), week[time.getDay()],time.getHours(),time.getMinutes(), time.getSeconds()];
	$('.time span').each(function(index){
		$(this).text(timeInfo[index].toString().replace(/^(\d)$/,'0$1'));
	});
	//获取当前所在城市，再根据该信息获取天气状况。
	$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(){
		var city = remote_ip_info.city;
		$.getJSON('http://wthrcdn.etouch.cn/weather_mini?city=' + city, function(obj){
			var today = obj.data.forecast[0]; 
			var weatherInfo = [obj.data.city, today.type, today.low, today.high];
			$('.time strong').each(function(index){
				$(this).text(weatherInfo[index].replace(' ',''));
			});
		});
	});
	//网址跳转--文字July Journey、七月之旅
	$('a').click(function(e){
		window.location.href= '/';
		e.preventDefault();
	});
	$('#header em').click(function(){
		window.location.href= '/main';
	});
	//网址跳转--广告、更多、热点排行后五
	$('.ad:eq(0),.more:eq(0),.redirect').click(function(){
		window.location.href= '/main/nav-news';
	});
	$('.ad:eq(1),.more:eq(1)').click(function(){
		window.location.href= '/main/nav-china';
	});
	$('.ad:eq(2),.more:eq(2)').click(function(){
		window.location.href= '/main/nav-world';
	});
	$('.ads:eq(0),.more:eq(3)').click(function(){
		window.location.href= '/main/nav-strategy';
	});
	$('.ads:eq(1),.more:eq(4)').click(function(){
		window.location.href= '/main/nav-tip';
	});
	//网址跳转--轮播
	var arr1 = ['strategy1','tip1','news1','news2','china1','china2','world1','world2'];
	$('#carousel li').each(function(index){
		$(this).attr('title','/main/nav-'+ arr1[index].slice(0,-1) + '/' + arr1[index]);
	});
	$('#carousel').click(function(e){
		if(e.target.nodeName = 'LI'){
			window.location.href = e.target.title;
		}
	});
	//网址跳转--资讯中心、地理中国、环游世界文字
	var arr2 = ['news1','news2','news3','china1','china2','china3','world1','world2','world3'];
	$('.content span').each(function(index){
		$(this).click(function(){
			window.location.href = '/main/nav-'+ arr2[Math.floor(index / 2)].slice(0,-1) + '/' + arr2[Math.floor(index / 2)];
		});
	});
	//网址跳转--资讯中心、地理中国、环游世界图片
	var arr3 = ['news2','china1','china2','world1','world2'];
	$('.content>div').not(':eq(1)').each(function(index){//或 $('.content>div:not(:eq(1))')
		$(this).click(function(){
			window.location.href = '/main/nav-'+ arr3[index].slice(0,-1) + '/' + arr3[index];
		});
	});
	//网址跳转--热点排行前五
	$('.top10 li:not(.redirect)').each(function(index){
		$(this).click(function(){
			window.location.href = '/main/nav-news/news' + (index + 4);
		});
	});
	//网址跳转--每日推荐、每周精选
	$('.recommend li').each(function(index){
		$(this).click(function(){
			window.location.href = index < 3? '/main/nav-china/china' + (index + 4) : '/main/nav-world/world' + (index + 1);
		});
	});
	//网址跳转--旅游攻略、出行常识
	$('#strategy .episode>li,.read').each(function(index){
		$(this).click(function(){
			window.location.href = index < 2? '/main/nav-strategy/strategy' + (index + 1) : '/main/nav-tip/tip' + (index - 1);
		});
	});
	//显示下划线
	$('.content span').mouseenter(function(){
		$(this).css('text-decoration','underline');
		$(this).parent().siblings().children().css('text-decoration','underline');
	});
	$('.content span').mouseleave(function(){
		$(this).css('text-decoration','none');
		$(this).parent().siblings().children().css('text-decoration','none');
	});
	//使横条line与窗口等宽、回到顶部top靠右、容器container居中。
	var marginLeft = $('#container').css('margin-left');
	function judge1(){
		var left = ($(window).width() - $('#container').width()) / 2;
		if($(window).width() <= 1349){
			$('#line').width(1349);
			$('.top').css('right', '10px');
			$('#container').css('margin-left',-$(window).width() / 2);
		}else{
			$('#line').width($(window).width());
			$('.top').css('right', left + 10 + 'px');
			$('#container').css('margin-left',marginLeft);
		}
	}
	//导航栏居中
	function judge2(){
		var navTop = $('#nav').offset().top;
		if($(window).width() <= 1349){
			$('#nav ul').css('left', 365);
		}else{
			$('#nav ul').css('left', ($('#nav').width() - $('#nav ul li').innerWidth()* 5) / 2);
		}
	}
	judge1();
	judge2();
	$(window).resize(function(){
		judge1();
		judge2();
	});
	//导航栏浮动和显示回到顶部
	var navTop = $('#nav').offset().top;
	function judge3(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop > navTop){
			$('#nav').addClass('fixed');
		}else{
			$('#nav').css('left',0)
			$('#nav').removeClass('fixed');	
		}
		if(scrollTop >= $('#news').offset().top - navTop - 3){
			$('.top').css('display','block');
		}else{
			$('.top').css('display','none');
		}
	}
	window.addEventListener('scroll', judge3);
	//节流
	function throttle(fun, wait, mustRun) {
		var timeout, startTime = new Date();
	    return function() {
	        var curTime = new Date();
	        clearTimeout(timeout);
	        if(curTime - startTime >= mustRun){
	            fun();
	            startTime = curTime;
	        }else{
	            timeout = setTimeout(fun, wait);
	        }
	   	}
	}
	//浮动时支持横向移动
	function judge4(){
		var scrollTop = $(window).scrollTop(),
			scrollLeft = $(window).scrollLeft(),
			left = ($(window).width() - $('#container').width()) / 2;
		if(scrollTop >=  navTop){
			if($(window).width() <= 1349){
				$('#nav').css('left', -scrollLeft + 'px');
			}else{
				$('#nav').css('left', left + 'px');
			}
		}
	}
	window.addEventListener('scroll', throttle(judge4, 30, 30));
	//导航栏跳转和回到顶部
	var navHeight = $('#nav').height();
	$('.top').click(function(){
		$('html').animate({scrollTop:0},500);
	});
	$('#nav li').each(function(index){
		$(this).click(function(){
			$('html').animate({scrollTop:$('.part:eq('+ index +')').offset().top - navHeight},500);
		});
	});
	function judge5(){
		var scrollTop = $(window).scrollTop();
		$('#nav li').each(function(index){
			if(scrollTop >= $('.part:eq('+ index +')').offset().top - navHeight - 3){
				$('#nav li').css('color','black');
				$(this).css('color','red');
			}else if(scrollTop < $('#news').offset().top - navHeight - 3){
				$('#nav li').css('color','black');
			}
		});
	}
	window.addEventListener('scroll', judge5);
	//克隆式轮播
	var flag = false;
	$('.turn:eq(0)').click(function(){
		left();
		flag = true;
	});
	$('.reverse').click(function(){
		right();
		flag = true;
	});
	function left(){
		if(flag) return;
		$('#carousel ul').animate({marginLeft:'-296px'},500,function(){
			$(this).css({marginLeft:'-592px'}).prepend($('#carousel li:eq(-1)').clone());//clone()方法只能复制属性，不能复制方法。
			$('#carousel li:eq(-1)').remove();
			flag = false;
		});
	}
	function right(){
		if(flag) return;
		$('#carousel ul').animate({marginLeft:'-888px'},500,function(){
			$(this).css({marginLeft:'-592px'}).append($('#carousel li:eq(0)').clone());
			$('#carousel li:eq(0)').remove();
			flag = false;
		});
	}
	//自动播放
	function auto(){
		play = setInterval(right,5000);
	}
	auto();
	$('#carousel,.turn').mouseenter(function(){
		clearInterval(play);
	});
	$('#carousel,.turn').mouseleave(function(){
		auto();
	});
});