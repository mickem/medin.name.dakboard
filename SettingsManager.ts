import ManagerSettings from 'homey/manager/settings';

export interface ISettings {
  apiKey?: string;
}

interface ISettingsListener {
  onApiKey(apiKey: string):void;
}

export class SettingsManager {
  private settings: ISettings;
  private listener: ISettingsListener;
  manager: ManagerSettings;

  constructor(manager:ManagerSettings, listener: ISettingsListener) {
    this.manager = manager;
    this.listener = listener;
    this.settings = {
      apiKey: '',
    };
  }

  public async start() {
    this.settings = {
      ...this.settings,
      ...this.manager.get('settings'),
    };
    await this.listener.onApiKey(this.settings.apiKey||'');
    this.subscribe();
  }

  public setApiKey(apiKey: string) {
    this.settings.apiKey = apiKey;
    this.manager.set('settings', this.settings);
  }

  public getSettings(): ISettings {
    return this.settings;
  }
  public setSettings(settings: ISettings) {
    this.manager.set('settings', { ...this.settings, ...settings });
  }

  private subscribe() {
    this.manager.on('set', async (variable: string) => {
      try {
        if (variable === 'settings') {
          const settings = this.manager.get('settings') as ISettings;
          //log(`Api key updated`);
          this.settings = { ...settings };
          await this.listener.onApiKey(this.settings.apiKey||'');
        }
      } catch (err) {
        //error(`Failed to update settings: ${err}`);
      }
    });
  }
}
