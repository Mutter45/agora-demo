<template>
  <div>
    声网集成试用
    <div>
      <video
        id="player-container-id"
        class="video-class"
        preload="auto"
        playsinline
        webkit-playsinline
        style="border-radius: 4px;"
      ></video>
    </div>
  </div>
</template>

<script>
import {
  LivePlayer,
  PlayerEvent,
  setRTCParameter,
  enableLogUpload,
  setLogLevel,
  RtcEvent
} from "agora-fls-sdk";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods:{
    initAgoraPlayer() {

    },
  }
};
</script>
