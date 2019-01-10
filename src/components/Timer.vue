<template>
  <div class="timer">
    <div id="timer-div">
      <span style="width: 20%">{{ name }} </span>
      <input style="width: 35%" v-model="displayText" placeholder="0" :class="[ isLow ? 'background-yellow' : 'background-grey' ]">
      <input style="width: 20%" v-model="remark">
      <input style="width: 5%" v-model="hour" placeholder="hour">
      <input style="width: 5%" v-model="minute" placeholder="minute">
      <input style="width: 5%" v-model="second" placeholder="second">
      <button style="width: 10%" v-on:click="startTimer">Start</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Timer',
  props: {
    name: String,
  },
  data: function () {
    return {
      displayText: '',
      hour: '',
      minute: '',
      second: '',
      remark: '',
      interval: '',
      isLow: false
    }
  },
  created: function () {
    const self = this
    axios
      .get(`http://172.18.0.11:8080/get/${this.name}-multiple-timers`,{ crossDomain: true })
      .then(response => (self.showRestRsp(response)))
  },
  methods: {
    showRestRsp: function(rsp) {
      if (rsp.data.value) {
        var secondValue = rsp.data.value;

        var hours   = Math.floor(secondValue / 3600);
        var minutes = Math.floor((secondValue - (hours * 3600)) / 60);
        var seconds = secondValue - (hours * 3600) - (minutes * 60);

        this.hour = hours;
        this.minute = minutes;
        this.second = seconds;

        this.countdown(this.hour, this.minute, this.second);
      }
    },
    startTimer: function() {
      this.countdown(this.hour, this.minute, this.second);
    },
    countdown: function(hour, minutes, seconds) {
      const self = this

      if (!hour) { hour = 0 }
      if (!minutes) { minutes = 0 }
      if (!seconds) { seconds = 0 }

      var totalSeconds = parseInt(hour*3600) + parseInt(minutes*60) + parseInt(seconds);
      axios
        .get(`http://172.18.0.11:8080/register/${this.name}-multiple-timers/${totalSeconds}`,{ crossDomain: true })
        .then(response => (self.showRestRsp(response)))

      clearInterval(self.interval);
      self.isLow = false;
      self.remark = '';

      this.interval = setInterval(function() {
          if(seconds == 0) {
              if(minutes == 0) {
                if(hour == 0) {
                    clearInterval(self.interval);
                    self.displayText = '';
                    self.hour = '';
                    self.minute = '';
                    self.second = '';
                    self.remark = (new Date()).toTimeString();

                    var sound = "http://soundbible.com/mp3/Tick Tock-SoundBible.com-1165545065.mp3";
                    var audio = new Audio(sound);
                    audio.play();
                    return;
                } else {
                    hour--;
                    minutes = 59;
                    seconds = 60;
                }
              } else {
                  minutes--;
                  seconds = 60;
              }
          }

          if (minutes < 5 && hour == 0) {
            self.isLow = true;
          }
          else if (minutes == 5 && hour == 0 && seconds == 0) {
            sound = "http://soundbible.com/mp3/Tick-DeepFrozenApps-397275646.mp3";
            audio = new Audio(sound);
            audio.play();
          }
          else {
            self.isLow = false;
          }
          self.displayText = `${hour ? hour : 0} hour ${minutes ? minutes : 0} minutes ${seconds ? seconds : 0} seconds`
          seconds--;
      }, 1000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background-red {
  background-color: #FF0000;
}
.background-grey {
  background-color: #808080;
  color: white;
}
.background-yellow {
  background-color: #FFFF00;
}
</style>
