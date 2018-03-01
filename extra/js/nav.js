$(function(){
	//Vue.js部分
	var content = new Vue({
        el: '#container',
        data: {
			items: {},
			style: {},
			type: [{},{},{},{},{}]
        },
        created: function () {//created钩子可以用来在一个实例被创建之后执行代码
            this.input();
        },
        methods: {
            input: function(){
                var that = this,
					path = window.location.pathname;// '/main/nav-xxx'
					index = ['news','china','world','strategy','tip'].indexOf(path.slice(10));
				that.style.paddingBottom = ['40px','165px','165px','305px','245px'][index];//修改style
				that.type.splice(index,1,{current:'current'});//修改class
                that.$resource('/main/data-' + path.slice(10)).get().then(function(respon){//根据请求路径获得的数据渲染页面
                    respon.json().then(function(result){
                        that.items = result.items;
                    });
                });
            },
            turn: function(index){//网址跳转
                var theme = window.location.pathname.slice(10); // 'xxx'
                window.location.href='/main/nav-' + theme + '/' + theme + index;
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
		});
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
		$('body').css('overflow-x','auto');
	});
	//*横向滚动条的显示
	$('body').css('overflow-x',$(window).height()>600?'hidden':'visible');
});