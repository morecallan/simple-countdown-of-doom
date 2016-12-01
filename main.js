function getTimeRemaining(endtime){
  var end_time_date = new Date()
  var hours = endtime.split(":")[0]
  var minutes = endtime.split(":")[1]
  end_time_date.setHours(hours)
  end_time_date.setMinutes(minutes)
  end_time_date.setSeconds(0)
  var t = Date.parse(end_time_date) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    clock.innerHTML = 'days: ' + t.days + '<br>' +
                      'hours: '+ t.hours + '<br>' +
                      'minutes: ' + t.minutes + '<br>' +
                      'seconds: ' + t.seconds;
    if(t.total<=0){
      clearInterval(timeinterval);
    }
  },1000);
}

function setDoomsDay() {
  var time_set = document.getElementById("input_time").value
  console.log(time_set)
  initializeClock('clockdiv', time_set);
}
