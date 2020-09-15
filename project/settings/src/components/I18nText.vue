<template>
  <span v-html="localizedText"></span>
</template>
<script lang="js">

export default {
  name: 'I18nText',
  props: {
    id: String,
  },
  computed: {
      localizedText: function () {
        if (this.$parent.i18nScope) {
          const tag = `${this.$parent.i18nScope}.${this.id}`;
          const result = Homey.__(tag);
          if (result === tag || !result) {
            console.error(`Failed to find value for ${tag}`, this);
            return tag;
          }
          return result;
        }
        const tag = this.id;
        const result = Homey.__(this.id);
        if (result === this.id || !result) {
            console.error(`Failed to find value for ${tag}`, this);
            return tag;
        }
        return result;
      }
  }
}
</script>
