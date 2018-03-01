$(function(){
	//Vue.js部分
	var content = new Vue({
		el: '#container',
		data: {
			items: {},
			type:[{},{},{},{},{}]
		},
		created: function () {
			this.input();
		},
		methods: {
			input: function(){
				var that = this,
					path = window.location.pathname,// '/main/nav-xxx/xxx1'
					index = ['news','china','world','strategy','tip'].indexOf(path.split('/')[3].slice(0,-1));
				that.type.splice(index,1,{current:'current'});
				that.$resource('/main/data-' + path.split('/')[3]).get().then(function(respon){
					respon.json().then(function(result){
						that.items = result.items;
					});
				});
			}
		}
	});
	//获取当前时间、地点和天气状况
	var time = new Date(),
		week = ['日', '一', '二', '三', '四', '五', '六'],
		timeInfo = [time.getFullYear(), time.getMonth(), time.getDate(), week[time.getDay()],time.getHours(),time.getMinutes(), time.getSeconds()];
	$('.time span').each(function(index){
		$(this).text(timeInfo[index].toString().replace(/^(\d)$/,'0$1'));
	});
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
	//网址跳转
	$('a').click(function(e){
		window.location.href='/';
		e.preventDefault();
	});
	$('#header em').click(function(){
		window.location.href='/main';
	});
	var arr = ['news','china','world','strategy','tip'];
	$('#nav li').each(function(index){
		$(this).click(function(){
			window.location.href='/main/nav-' + arr[index];
		})
	});
	//横条line与窗口等宽、容器container居中。
	var marginLeft = $('#container').css('margin-left');
	function judge1(){
		var left = ($(window).width() - $('#container').width()) / 2;
		if($(window).width() <= 1349){
			$('#line').width(1349);
			$('#container').css('margin-left',-$(window).width() / 2);
		}else{
			$('#line').width($(window).width());
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
});