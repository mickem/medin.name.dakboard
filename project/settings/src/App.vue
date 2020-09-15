<template>
  <div class="container-fluid">
    <div class="loader" v-if="loading"><I18nText id="loading" /></div>
    <ApiKeyTab />
  </div>
</template>
<script lang="js">

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ApiKeyTab from './components/ApiKeyTab.vue';
import I18nText from './components/I18nText.vue';

export default {
  name: 'app',
  components: {
    ApiKeyTab,
    I18nText,
  },
  props: ['homey'],
  data () {
    return {
      loading: true,
      i18nScope: "settings",
    }
  },
  mounted() {
    this.loading = false;
  }
}
</script>
<style scoped>
.container-fluid {
  padding-right: 0px;
  padding-left: 0px;
}
.nav {
  margin-left: 0;
}
</style>