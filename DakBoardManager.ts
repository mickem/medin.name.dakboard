import Homey from 'homey';
import { SettingsManager } from './SettingsManager';
import { ApiKeyHandler, IDakBoardManager } from './interfaces/IDakBoardManager';

export class DakBoardManager implements IDakBoardManager {
  private loaded: boolean;
  private settingsManager: SettingsManager;
  private apiKeyHandlers: ApiKeyHandler[] = [];
  app: Homey.App;

  constructor(app:Homey.App) {
    this.app = app;
    this.loaded = false;
    app.log(`Starting dakboard manager`);
    this.settingsManager = new SettingsManager(app.homey.settings, {
      onApiKey: (apiKey: string) => {
        this.apiKeyHandlers.forEach(h => h(apiKey));
      },
    });
  }
  public onApiKeyChanged(handler: ApiKeyHandler) {
    this.apiKeyHandlers.push(handler);
  }
  public updateApiKey(apiKey: string) {
    this.settingsManager.setApiKey(apiKey);
    this.apiKeyHandlers.forEach(h => h(apiKey));
  }
  public getApiKey(): string {
    return this.settingsManager.getSettings().apiKey || '';
  }

  public async onInit() {
    this.app.log(`Initializing dakboard manager`);
    await this.settingsManager.start();
    this.loaded = true;
  }
}
