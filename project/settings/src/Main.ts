import Vue from 'vue';
import App from './App.vue';
import SettingsManager from './SettingsManager';

declare var Homey: any;

const manager = new SettingsManager();

(window as any).onHomeyReady = () => {
  manager
    .reload()
    .then(() => {
      Homey.ready();
      new Vue({
        data: manager,
        render: h => h(App),
      }).$mount('#app');
    })
    .catch(error => {
      console.error(`Failed to load configuration: `, error);
      manager.error(`Failed to load configuration: ${error}`);
    });
};
