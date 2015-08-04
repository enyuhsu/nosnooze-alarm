angular.module('main').controller('homeController', ['$http', function($http){
	tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
		tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

		function GetClock(){
			var d = new Date();
			var day = d.getDay();
			var month = d.getMonth();
			var date=d.getDate();
			var year=d.getYear();
			var hour = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();
			if (year < 1000)
				year+=1900;
			var d = new Date();
			var ap;

			if (hour == 0) {
				ap=" AM";
				hour=12;
			}
			else if (hour < 12) {
				ap=" AM";
			}
			else if (hour === 12) {
				ap=" PM";
			}
			else if (hour > 12) {
				ap = " PM";
				nhour -= 12;
			}

			if (min <= 9) min = "0" + min;
			if (sec <= 9) sec = "0" + sec;

			document.getElementById('clockbox').innerHTML=""+tday[day]+", "+tmonth[month]+" "+date+", "+year+" "+hour+":"+min+":"+sec+ap+"";
		}
		GetClock();
		setInterval(GetClock,1000);
}]);