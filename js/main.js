var timerApi = {
	seckillOverTime: undefined,
	seckillTimer: function() {
		//对比秒杀结束时间。
		//返回包含 小时/分钟/秒数 的数组，“[1,9,2,3,5,6]” 表示19小时23分钟56秒。

		var nowTime = new Date();

		var differTime = timerApi.seckillOverTime - nowTime;

		var hours = Math.floor((differTime / 1000 / 60 / 60) % 60, 1);
		var hoursUnint = hours % 10;
		var hoursTens = (hours - hoursUnint) / 10;

		var minutes = Math.floor((differTime / 1000 / 60) % 60, 0);
		var minutesUnint = minutes % 10;
		var minutesTens = (minutes - minutesUnint) / 10;

		var seconds = Math.floor((differTime / 1000) % 60, 0);
		var secondsUnint = seconds % 10;
		var secondsTens = (seconds - secondsUnint) / 10;

		return [
			hoursTens,
			hoursUnint,
			minutesTens,
			minutesUnint,
			secondsTens,
			secondsUnint
		];
	}
};

jQuery(document).ready(function($) {
	$('.banner').unslider({

		autoplay: true,
		arrows: false,
		dots: true,
		fluid: true
	});

	timerApi.seckillOverTime = new Date();
	timerApi.seckillOverTime.setHours(23);
	timerApi.seckillOverTime.setMinutes(00);
	timerApi.seckillOverTime.setSeconds(00);

	var seckill_floor_title_timer_number = $(".seckill-floor-title-timer_number");

	setInterval(function() {
		var resArr = timerApi.seckillTimer()
		for (i in resArr) {
			seckill_floor_title_timer_number.eq(i).text(resArr[i]);
		}
	}, 1000);

	//设置主题馆的轮播动画隐藏
	$(".cycle-img-box").each(function() {
		$(this).children('img').eq(1).hide();
		$(this).children('img').eq(2).hide();
		//10秒后隐藏 0 2，显示 1
		//20秒售隐藏 0 1，显示 2
		//30秒后隐藏 1 2，显示 0
	});

	// 设置主题馆的轮播动画
	//延迟设置各个动画的开始时间，出现顺序的效果
	 firstImageArray = $(".cycle-img-box img:nth-child(1)");
	 secondImageArray = $(".cycle-img-box img:nth-child(2)");
	 thirdImageArray = $(".cycle-img-box img:nth-child(3)");

	loopImage();

	setInterval(loopImage, 3000);

	$('body').css('display', 'inherit');
});

function loopImage() {
	secondImageArray.each(function(index, el) {
		setTimeout(function() {
			secondImageArray.eq(index).parent().children().hide();
			secondImageArray.eq(index).fadeIn(500);
		}, 1000 + index * 100);
	});
	thirdImageArray.each(function(index, el) {
		setTimeout(function() {
			thirdImageArray.eq(index).parent().children().hide();
			thirdImageArray.eq(index).fadeIn(500);
		}, 2000 + index * 100);
	});
	firstImageArray.each(function(index, el) {
		setTimeout(function() {
			firstImageArray.eq(index).parent().children().hide();
			firstImageArray.eq(index).fadeIn(500);
		}, 3000 + index * 100);
	});
}