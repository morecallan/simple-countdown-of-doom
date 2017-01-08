const before_enter = document.getElementById("before_enter")
const after_enter = document.getElementById("after_enter")
const scott_said = document.getElementById("scott_said")


function getTimeRemaining(endtime){
  var end_time_date = new Date()
  var hours = endtime.split(":")[0]
  var minutes = endtime.split(":")[1]
  end_time_date.setHours(hours)
  end_time_date.setMinutes(minutes)
  end_time_date.setSeconds(0)
  var t = Date.parse(end_time_date) - Date.parse(new Date());
  if (t < 0) {
    return 'Silly Zoe. That time already happened.'
  } else {
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
    }
  }
}

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    if (typeof t == "object") {
      let endTimeHours = Number(endtime.split(':')[0]) > 12 ? Number(endtime.split(':')[0]) - 12 : endtime.split(':')[0]
      let displayTime = endTimeHours + ':' + endtime.split(':')[1]
      scott_said.innerHTML = `Zoe said be back at ${displayTime}.`
      clock.innerHTML = '<div> The learning commences in... </div>' +
                        `<div class="display_box phase-3">` +
                        `<div> <div class="number">${t.minutes}</div> minutes </div>` +
                        `<div> <div class="number">${t.seconds}</div> seconds </div>` +
                        `</div>`
      if(t.total<=0){
        clearInterval(timeinterval);
      }
    } else {
      scott_said.innerHTML = t;
      clearInterval(timeinterval);
    }

  },1000);
}

function setDoomsDay() {
  var time_set = document.getElementById("input_time").value
  before_enter.classList.add("hidden")
  after_enter.classList.remove("hidden")
  initializeClock('clockdiv', time_set);
}
