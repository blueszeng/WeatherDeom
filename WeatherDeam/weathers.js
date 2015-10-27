weatherModel = angular.module 'weather' []

weatherModel.controller 'weatherCtl' ['$scope','weather',
 ($scope,weather) -> 
 	$scope.getWeather = () ->
	 	$scope.weatherData =[]
		weather.getWeather $scope.weatherData
 
  ] 
  
weatherModel.service  "weather" ['$http',
($http) ->
	that = this
	this.convertTime = (time) ->
		date = new Date parseInt(time) * 1000
	    date.getFullYear().toString() +'-' + date.getDay().toString() +
			 '-'+date.getDate().toString()
	this.convertemperatures = (temp) ->
		 (temp / 33.8).toFixed 2	
	this.getWeatherPost = (weatherData) ->
	url ="http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&cnt=7&appid=bd82977b86bf27fb59a04b61b657fb6f"	
	$http.get url 
		.success (data) ->
			if 	data.cod is '2000' 
				for Wdata in data.list
					weatherData.push 
						{
							date: that.convertTime data.list[i].dt
							high: that.convertemperatures data.list[i].temp.max
			 	    		low:  that.convertemperatures data.list[i].temp.min
			 	    		weather: data.list[i].weather[0].main
						}	
						 
	  { getWeather:this.getWeatherPost}			
  
  
  
