import { __, app, Device } from 'homey';
import DakBoardClient from '../../helpers/DakBoardClient';
import { IDakBoardManager } from '../../interfaces/IDakBoardManager';
import { error, log } from '../../LogManager';
import { Catch } from '../../utils';
import { capabilities } from './BaseDriver';

interface IData {
  screen: string;
  block: string;
}

const LAST_ENABLED_KEY = 'lastEnabled';

export default class BaseDevice extends Device {
  protected screen: string;
  protected block: string;
  protected lastEnabled: boolean;
  private apiKey: string;

  @Catch(true)
  public async onInit() {
    this.screen = this.getMyData().screen || 'none';
    this.block = this.getMyData().block || 'none';
    this.lastEnabled = this.getStoreValue(LAST_ENABLED_KEY);
    log(`Starting driver for block ${this.screen} / ${this.block}`);
    this.apiKey = this.getTM().getApiKey();
    this.getTM().onApiKeyChanged(apiKey => {
      this.apiKey = apiKey;
    });

    this.registerCapabilityListener(capabilities.disable, async () => {
      try {
        await this.disable(false, false);
      } catch (err) {
        error(`Failed to disable block: ${err}`);
      }
    });
    this.registerCapabilityListener(capabilities.enable, async () => {
      try {
        await this.enable(false, false);
      } catch (err) {
        error(`Failed to enable block: ${err}`);
      }
    });
    this.registerCapabilityListener(capabilities.refresh, async () => {
      try {
        await this.refresh();
      } catch (err) {
        error(`Failed to refresh block: ${err}`);
      }
    });
  }
  public async disable(updateOnlyIfChanged: boolean, refresh: boolean) {
    if (updateOnlyIfChanged && !this.lastEnabled) {
      return;
    }
    await this.getClient().disableBlock(this.screen, this.block, 1);
    if (refresh) {
      await this.refresh();
    }
    await this.setEnabled(false);
  }
  public async enable(updateOnlyIfChanged: boolean, refresh: boolean) {
    if (updateOnlyIfChanged && this.lastEnabled) {
      return;
    }
    await this.getClient().disableBlock(this.screen, this.block, 0);
    if (refresh) {
      await this.refresh();
    }
    await this.setEnabled(true);
  }
  public async refresh() {
    await this.getClient().refresh(this.screen);
  }

  protected getClient(): DakBoardClient {
    return new DakBoardClient(this.apiKey);
  }
  protected async setEnabled(enabled: boolean) {
    this.lastEnabled = enabled;
    await this.setStoreValue(LAST_ENABLED_KEY, enabled);
  }

  private getMyData(): IData {
    return this.getData() as IData;
  }
  private getTM(): IDakBoardManager {
    return app.get() as IDakBoardManager;
  }
}
