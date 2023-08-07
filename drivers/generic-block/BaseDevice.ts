import { Device } from 'homey';
import DakBoardClient from '../../helpers/DakBoardClient';
import { DakBoardApp, IDakBoardManager } from '../../interfaces/IDakBoardManager';

interface IData {
  screen: string;
  block: string;
}

const LAST_ENABLED_KEY = 'lastEnabled';

export default class BaseDevice extends Device {
  protected screen?: string;
  protected block?: string;
  protected lastEnabled?: boolean;
  private apiKey?: string;

  public async onInit() {
    this.screen = this.getMyData().screen || 'none';
    this.block = this.getMyData().block || 'none';
    this.lastEnabled = this.getStoreValue(LAST_ENABLED_KEY);

    this.log(`Starting driver for block ${this.screen} / ${this.block}`);
    this.apiKey = this.getTM().getApiKey();
    this.getTM().onApiKeyChanged(apiKey => {
      this.apiKey = apiKey;
    });
    this.registerCapabilityListener('onoff', async (value) => {
      try {
        if (value) {
          await this.enable(false, true);
        } else {
          await this.disable(false, true);
        }
      } catch (err) {
        this.setWarning(`Failed to disable block: ${err}`);
        this.error(`Failed to disable block: ${err}`);
      }
    });
    this.registerCapabilityListener('button.refresh', async () => {
      try {
        await this.refresh();
      } catch (err) {
        this.setWarning(`Failed to refresh block: ${err}`);
        this.error(`Failed to refresh block: ${err}`);
      }
    });
  }
  public async disable(updateOnlyIfChanged: boolean, refresh: boolean) {
    if (updateOnlyIfChanged && !this.lastEnabled) {
      return;
    }
    this.setCapabilityValue('onoff', false).catch(this.error);
    await this.getClient().disableBlock(this.screen || 'unknown', this.block || 'unknown', 1);
    if (refresh) {
      await this.refresh();
    }
    await this.setEnabled(false);
  }
  public async enable(updateOnlyIfChanged: boolean, refresh: boolean) {
    if (updateOnlyIfChanged && this.lastEnabled) {
      return;
    }
    this.setCapabilityValue('onoff', true).catch(this.error);
    await this.getClient().disableBlock(this.screen || 'unknown', this.block || 'unknown', 0);
    if (refresh) {
      await this.refresh();
    }
    await this.setEnabled(true);
  }
  public async refresh() {
    await this.getClient().refresh(this.screen || 'unknown');
  }

  protected getClient(): DakBoardClient {
    return new DakBoardClient(this, this.apiKey || 'unknown');
  }
  protected async setEnabled(enabled: boolean) {
    this.lastEnabled = enabled;
    this.setCapabilityValue('onoff', enabled).catch(this.error);
    await this.setStoreValue(LAST_ENABLED_KEY, enabled);
  }

  private getMyData(): IData {
    return this.getData() as IData;
  }
  private getTM(): IDakBoardManager {
    return (this.homey.app as any as DakBoardApp).get() as IDakBoardManager;
  }
}
