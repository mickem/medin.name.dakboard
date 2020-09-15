<template>
  <div>
    <button id="showLog" class="btn"  @click="show=!show">Show/Hide Logs</button>
    <div :class="cls">
      <div
        class="card card-body"
      >
        <p v-for="log in logs" v-bind:key="log.date">
          {{log.date}}: {{log.message}}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import I18nText from './I18nText.vue';

export default {
  name: 'SettingsTabEntry',
  components: {
    I18nText,
  },
  data () {
    return {
      show: false,
    }
  },
  computed: {
    logs: function() {
      return this.$root.$data.getLogs();
    },
    cls: function() {
      return this.show ? "collapse.show" : "collapse";
    }
  },
  props: {
    i18nScope: String,
  },
};
</script>
