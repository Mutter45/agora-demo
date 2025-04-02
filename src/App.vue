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
import { LivePlayer } from "agora-fls-sdk";
// import "vue-virtual-scroller";
// import * as VueVirtualScroller from "vue-virtual-scroller";
// import "agora-test";
// import AgoraRTC from "agora-rtc-sdk-ng";

export default {
  data() {
    return {};
  },
  mounted() {
    this.initAgoraPlayer();
  },
  methods: {
    initAgoraPlayer() {
      console.log("LivePlayer:", LivePlayer);
      // const player = new LivePlayer({
      //   url: "您的直播流地址",
      //   el: "player-container-id"
      // });
    }
  }
};
</script>
