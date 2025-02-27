<template>
  <transition name="bounce">
    <div class="popup" v-if="show">
      <div class="content" :class="{ type }">
        <progress class="progressBar" :value="timeoutProgress" :max="timeoutLength / 1000"></progress>
        <div class="shit">
          <p>
            <strong>{{ apiMethod }}</strong> - {{ apiMessage }}
          </p>
          <Icon icon="x" class="xButton" @click="show = !show" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import eventHandler from "@/services/eventHandler.js";
import Icon from "@/components/misc/Icon";

export default {
  name: "Popup",
  components: {
    Icon
  },
  data() {
    return {
      show: false,
      apiMessage: "null",
      apiMethod: "null",
      timeoutProgress: 0,
      timeoutLength: 10000,
      type: "error"
    };
  },
  async mounted() {
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    eventHandler.on("show", async params => {
      this.type = params.type;
      switch (params.type) {
        case "ok":
          this.timeoutProgress = 0;
          this.timeoutLength = 5000;
          this.show = true;
          this.apiMethod = `${params.method}`;
          this.apiMessage = "Success";
          break;
        default:
          this.timeoutProgress = 0;
          this.timeoutLength = 10000;
          this.show = true;
          this.apiMessage = params.messages[0].response.data.message;
          this.apiMethod = `${params.messages[0].response.status} ${params.method}`;
          break;
      }

      for (let i = 0; i < this.timeoutLength / 1000; i++) {
        this.timeoutProgress++;
        await sleep(this.timeoutLength / 10);
      }

      this.show = false;
    });
  }
};
</script>

<style scoped>
.popup {
  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  min-height: 48px;
  height: fit-content;
  z-index: 11000;
  padding: 8px;
}

.content {
  background-color: var(--theme-color);
  box-shadow: var(--shadowColor) 0px 10px 20px;
  color: white;

  position: relative;
  user-select: initial;
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0px 0px 4px 4px;
  width: 75%;
  height: 100%;
}

.content.ok {
  background-color: green;
}

.content.warn {
  background-color: orange;
}

.content.error {
  background-color: red;
}

.progressBar {
  position: absolute;
  top: 0px;
  width: 100%;
  border: none;
  height: 4px;
}

.progressBar::-webkit-progress-bar {
  background-color: transparent;
}

.progressBar::-webkit-progress-value {
  background-color: var(--bright-theme-color);
}

.shit {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.shit p {
  font-size: 13px;
  color: white;
}
.shit p strong {
  color: white;
}

.xButton {
  cursor: pointer;
  filter: invert(1);
  width: 24px;
  height: 24px;
}

.bounce-enter-active {
  animation: bounce-in 0.4s ease-in-out;
}
.bounce-leave-active {
  animation: bounce-in 0.4s reverse ease-in-out;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-64px);
  }
  80% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
