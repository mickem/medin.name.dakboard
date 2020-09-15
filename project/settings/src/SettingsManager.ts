declare var Homey: any;

export default class SettingsManager {
  private logs: [] = [];

  public resetSettings() {
    this.logs = [];
  }
  public reload(): Promise<void[]> {
    return Promise.all([this.reloadLogs()]);
  }
  public getLogs() {
    return this.logs;
  }
  public async saveKey(apiKey) {
    await Homey.set('settings', { apiKey });
  }
  public error(error) {
    Homey.alert(error);
  }

  private async reloadLogs(): Promise<void> {
    return new Promise((resolve, reject) => {
      Homey.api('GET', '/logs', null, (err, result) => {
        if (err) {
          console.error('Failed to load logs: ', err);
          Homey.alert('reloadLogs' + err);
          return reject();
        }
        this.logs = result;
        resolve();
      });
    });
  }
}
