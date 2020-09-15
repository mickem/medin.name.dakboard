<template>
  <div>
    <div class="form-group">
      <label for="apiKey"><I18nText id="apiKey" /></label>
      <input type="text" class="form-control" id="apiKey" v-model="apiKey" />
    </div>
    <div class="form-group">
      <label for="btnSave"><I18nText id="btnSave.label" /></label>
      <button id="btnSave" class="btn" @click="saveKey()"><I18nText id="btnSave.button" /></button>
    </div>
    <SettingsTabLogs />
  </div>
</template>
<script lang="js">

import SettingsTabLogs from './SettingsTabLogs.vue';
import I18nText from './I18nText.vue';

export default {
  name: 'ApiKeyTab',
  components: {
    SettingsTabLogs,
    I18nText
  },
  data () {
    return {
      i18nScope: "settings",
      apiKey: ""
    }
  },
  methods: {
    saveKey: async function() {
      this.settingsHints = false;
      await this.$root.$data.saveKey(this.apiKey);
    },
  }

}
</script>