<template>
  <div id="app">
    <div id="timerDiv" style="width: 40%">
      <button v-on:click="clearTimers">Clear</button>
      <div>
        <Timer v-for="timerName in acc3" :key="timerName" :name="timerName" />
      </div>
      <br/>
      <div>
        <Timer v-for="timerName in acc1" :key="timerName" :name="timerName" />
      </div>
      <br/>
      <div>
        <Timer v-for="timerName in acc2" :key="timerName" :name="timerName" />
      </div>
    </div>
    <div id="notificationDiv" style="width: 60%">
      <span>{{ notification }} </span>
    </div>
  </div>
</template>

<script>
import Timer from './components/Timer.vue'
import axios from 'axios';
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
  name: 'app',
  components: {
    Timer
  },
  data: function () {
    return {
      acc1: ['A1-F1', 'A1-F2', 'A1-F3', 'A1-F4', 'A1-T1', 'A1-T2', 'A1-T3', 'A1-T4', 'A1-B1', 'A1-B2'],
      acc2: ['A2-F1', 'A2-F2', 'A2-F3', 'A2-T1', 'A2-T2', 'A2-T3', 'A2-T4', 'A2-B1', 'A2-B2'],
      acc3: ['A3-F1', 'A3-F2', 'A3-F3', 'A3-T1', 'A3-T2', 'A3-T3', 'A3-T4', 'A3-B1', 'A3-B2'],
      notification: '',
      videoId: getIdFromURL("https://youtu.be/u6iuBCrNVaI")
    }
  },
  methods: {
    clearTimers: function() {
      const self = this
      axios
        .get(`http://172.18.0.11:8080/clear`,{ crossDomain: true })
        .then(response => (self.notification = response))
    }
  }
}

//docker build -t vue/multiple-timers .;docker stop timer1;docker rm timer1;docker run -d --name timer1 --restart=always   --net mynet --ip 172.18.0.10 vue/multiple-timers;docker logs -f --tail 80 timer1;
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>