const before_enter = document.getElementById("before_enter")
const after_enter = document.getElementById("after_enter")
const scott_said = document.getElementById("scott_said")

const explosion_array = ["http://www.reactiongifs.us/wp-content/uploads/2013/08/bitches_gots_to_learn_orange.gif", "https://media.tenor.co/images/5b04f7e51bd8659b985b8aa4f86ffedc/raw", "https://adoptiveblackmom.files.wordpress.com/2016/03/200_s.gif", "https://randomletterstotheworld.files.wordpress.com/2012/07/tumblr_lwwhywaqmm1qatmal.gif", "https://media.tenor.co/images/cbb5332b609d9e1bb484c5dc925a774d/raw", "http://replygif.net/i/724.gif", "https://az616578.vo.msecnd.net/files/2016/01/17/6358866633973910581146351272_The-Notebook-Now-Its-Too-Late-GIF.gif", "http://cdn.gurl.com/wp-content/uploads/2014/05/late-gif.gif", "https://68.media.tumblr.com/632b2603278412e8381309d60eb1d078/tumblr_njr9nvsWeW1si3gq6o1_r1_500.gif", "http://static.fjcdn.com/gifs/when+im+dancing+alone+at+a+party.+blues+clues_9b9d7c_3354611.gif", "https://68.media.tumblr.com/17ec976e56e41705c3cf417c24c41c5b/tumblr_nnndvj7WBp1rt5pgzo1_400.gif"]

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
                        `<img src="https://media.giphy.com/media/UxREcFThpSEqk/giphy.gif" class="waiting-img ${(phaseParse(t) == 2) ? 'show' : 'hidden'}">` +
                        `<img src="https://s-media-cache-ak0.pinimg.com/736x/c2/d6/be/c2d6befa8ee585a8f69b9e25dbf4d335.jpg" class="waiting-img ${(phaseParse(t) == 1) ? 'show' : 'hidden'}">` +
                        `<div class="display_box phase-${phaseParse(t)}">` +
                        `<div> <div class="number">${t.minutes}</div> minutes </div>` +
                        `<div> <div class="number">${t.seconds}</div> seconds </div>` +
                        `</div>`
      if(t.total<0){
        clearInterval(timeinterval);
      } else if (t.total==0) {
        scott_said.innerHTML = `Zoe said be back at ${displayTime}.`
        clock.innerHTML = '<div>' +
                            `<img src=${explosion_array[getRandomInt(0, explosion_array.length - 1)]}>`
                          `</div>`;
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

function phaseParse(t) {
  let phase;
  if (t.minutes > 10) {
    phase = 1;
  } else if (t.minutes <= 10 && t.minutes > 2) {
    phase = 2;
  } else {
    phase = 3;
  }
  return phase;
}

let getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
