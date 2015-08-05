var app = angular.module("app", [
    "ngRoute",
    "app.controllers",
    "app.directives",
    "app.filters"
]);

app.config([
    "$routeProvider",
    "$httpProvider",
    function($routeProvider, $httpProvider){
    	$httpProvider.defaults.useXDomain=true;
      delete $httpProvider.defaults.headers.post['Content-type'];
    }
]);


angular
	.module('main').controller('homeController', homeController);

	homeController.$inject = ['$http', '$interval'];


	function homeController ($http, $interval){
		var self = this;

		self.alarmTime = {};
		self.setTime = {};
		self.alarmMessage = "You haven't set an alarm yet!";
		
		this.setAlarm = function() {
			for (key in self.alarmTime) {
				self.setTime[key] = self.alarmTime[key];
			}
			var min = self.setTime.min;
			if (min < 10) {
				min = "0" + min;
			}
			self.alarmMessage = "Your alarm is set for " + self.setTime.hour + ":" + min + " " + self.setTime.ampm;
		};

		this.GetClock = function(){
			var tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
			var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
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
				ap="AM";
				hour=12;
			}
			else if (hour < 12) {
				ap="AM";
			}
			else if (hour === 12) {
				ap="PM";
			}
			else if (hour > 12) {
				ap = "PM";
				hour -= 12;
			}
			
			if (self.setTime.hour && self.setTime.min){
				if (hour === self.setTime.hour && min === self.setTime.min && ap=== self.setTime.ampm) {
					if (confirm("Would you like to snooze?")){
						var message = {"channel": "#general", "username": "arko617", "text": "That batch Arko is snoozing again", "icon_emoji": ":poop:"};
						$http.post('/slack', message).success(function(data){
							console.log("Sent!");
						});
						self.setTime.min+=1;
						if (self.setTime.min>59){
							self.setTime.hour+=1;
							self.setTime.min-=60;
							if (self.setTime.hour === 12){
								if (self.setTime.ampm === "PM"){
									self.setTime.ampm = "AM";
								} else {self.setTime.ampm = "PM"};
							}
							if (self.setTime.hour > 12){
								self.setTime.hour-=12;
							}
						}
						var minute = self.setTime.min;
						if (minute < 10) {
							minute = "0" + minute;
						}
						self.alarmMessage = "Your alarm is set for " + self.setTime.hour + ":" + minute + " " + self.setTime.ampm;
					}
					else {
						self.setTime = {};
						self.alarmMessage = "You haven't set an alarm yet!";
					}
				}

			}
			if (min <= 9) min = "0" + min;
			if (sec <= 9) sec = "0" + sec;

			document.getElementById('clockbox').innerHTML=""+tday[day]+", "+tmonth[month]+" "+date+", "+year+" "+hour+":"+min+":"+sec+" "+ap+"";
		}
		self.GetClock();
		$interval(self.GetClock,1000);
	
	
}


	
