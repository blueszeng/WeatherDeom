var weatherModel = angular.module('weather', []);

weatherModel.service("weather",['$http',
function($http){	
    var that = this;
	this.convertTime = function(time) 
	{		
	 var date = new Date(parseInt(time) * 1000);
	 return  date.getFullYear().toString() +'-' + date.getDay().toString() +
			 '-'+date.getDate().toString() ;						
	}
	
	this.convertemperatures = function(temp) 
	{
		return (temp / 33.8).toFixed(2);		
	}	
	this.getWeatherPost = function(weatherData) {				
		var url ="http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&cnt=7&appid=bd82977b86bf27fb59a04b61b657fb6f"	
		$http.get(url)
  			.success(function(data) {  
			if(data.cod =='200') {	
			 for (var i =0; i <data.list.length; i++) {					 
				 weatherData.push({
					date: that.convertTime(data.list[i].dt),
					high: that.convertemperatures(data.list[i].temp.max),
			 	    low:  that.convertemperatures(data.list[i].temp.min),
			 	    weather: data.list[i].weather[0].main	
				 })		
			  }					
			}			
			});	
	}		
	return {
    	getWeather:this.getWeatherPost
  	}		
}]);

weatherModel.controller('weatherCtl', ['$scope','weather' ,function($scope,weather) {			
	 $scope.getWeather = function() {
		$scope.weatherData =[];	
		weather.getWeather($scope.weatherData);
  	}	  
}]);



