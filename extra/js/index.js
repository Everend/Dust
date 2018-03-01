$(function(){
	var loop, stop, degree = 0;
//浏览器提示	
	$('h5').animate({opacity:0},10000,function(){
		$(this).css('display','none');
	});
//跳转至main页面
	$('div').click(function(){
		window.location.href='/main';
	});
//旋转entrance图标
	$('div').mouseenter(function(){
		clearInterval(stop);
		loop = setInterval(function(){
			degree += 2;
			$('div').css({transform:'rotate(' + degree + 'deg)'});
		},0);
	});
	$('div').mouseleave(function(){
		clearInterval(loop);
		stop = setInterval(function(){
			degree += 2;
			degree % 360? $('div').css({transform:'rotate(' + degree + 'deg)'}) : clearInterval(stop);
		},0);
	});
})