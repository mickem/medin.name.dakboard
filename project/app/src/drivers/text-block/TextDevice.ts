import { __ } from 'homey';
import { Catch } from '../../utils';
import BaseDevice from '../generic-block/BaseDevice';

interface IData {
  screen: string;
  block: string;
}

const LAST_TEXT_KEY = 'lastText';
const LAST_ENABLED_KEY = 'lastEnabled';

export class TextDevice extends BaseDevice {
  private lastText: string;

  @Catch(true)
  public async onInit() {
    await super.onInit();
    this.lastText = this.getStoreValue(LAST_TEXT_KEY) || '';
  }
  public async setText(text: string, updateOnlyIfChanged: boolean, refresh: boolean) {
    if (updateOnlyIfChanged && this.lastText === text && this.lastEnabled) {
      return;
    }
    await this.getClient().setText(this.screen, this.block, text);
    if (refresh) {
      await this.refresh();
    }
    await this.setEnabled(true);
    this.lastText = text;
    await this.setStoreValue(LAST_TEXT_KEY, text);
  }
}
