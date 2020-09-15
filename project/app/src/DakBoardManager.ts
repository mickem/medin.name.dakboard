import { HomeyAPI } from 'athom-api';
import { __ } from './HomeyWrappers';
import { ApiKeyHandler, IDakBoardManager } from './interfaces/IDakBoardManager';
import { get as getLogs, ILogMessage, log } from './LogManager';
import { SettingsManager } from './SettingsManager';
import { Catch } from './utils';

export class DakBoardManager implements IDakBoardManager {
  private api: HomeyAPI | undefined;
  private loaded: boolean;
  private settingsManager: SettingsManager;
  private apiKeyHandlers: ApiKeyHandler[] = [];

  constructor() {
    this.loaded = false;
    log(`Starting dakboard manager`);
    this.api = undefined;
    this.settingsManager = new SettingsManager({
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

  @Catch()
  public getLogs(): ILogMessage[] {
    return getLogs();
  }
  @Catch()
  public async onInit() {
    log(`Initializing dakboard manager`);
    this.api = await HomeyAPI.forCurrentHomey();
    await this.settingsManager.start();
    this.loaded = true;
  }
}
