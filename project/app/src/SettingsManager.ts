import { ManagerSettings } from 'homey';
import { error, log } from './LogManager';

export interface ISettings {
  apiKey?: string;
}

interface ISettingsListener {
  onApiKey(apiKey: string);
}

export class SettingsManager {
  private settings: ISettings;
  private listener: ISettingsListener;

  constructor(listener: ISettingsListener) {
    this.listener = listener;
    this.settings = {
      apiKey: '',
    };
  }

  public async start() {
    this.settings = {
      ...this.settings,
      ...ManagerSettings.get('settings'),
    };
    await this.listener.onApiKey(this.settings.apiKey);
    this.subscribe();
  }

  public setApiKey(apiKey: string) {
    this.settings.apiKey = apiKey;
    ManagerSettings.set('settings', this.settings);
  }

  public getSettings(): ISettings {
    return this.settings;
  }
  public setSettings(settings: ISettings) {
    ManagerSettings.set('settings', { ...this.settings, ...settings });
  }

  private subscribe() {
    ManagerSettings.on('set', async (variable: string) => {
      try {
        if (variable === 'settings') {
          const settings = ManagerSettings.get('settings') as ISettings;
          log(`Api key updated`);
          this.settings = { ...settings };
          await this.listener.onApiKey(this.settings.apiKey);
        }
      } catch (err) {
        error(`Failed to update settings: ${err}`);
      }
    });
  }
}
