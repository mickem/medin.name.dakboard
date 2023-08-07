import BaseDevice from '../generic-block/BaseDevice';

const LAST_TEXT_KEY = 'lastText';

export class TextDevice extends BaseDevice {
  private lastText?: string;

  public async onInit() {
    await super.onInit();
    this.lastText = this.getStoreValue(LAST_TEXT_KEY) || '';
  }
  public async setText(text: string, updateOnlyIfChanged: boolean, refresh: boolean, fromSettings = false) {
    if (updateOnlyIfChanged && this.lastText === text && this.lastEnabled) {
      return;
    }
    await this.getClient().setText(this.screen||'unknown', this.block||'unknown', text);
    this.setCapabilityValue('text_block_text', text).catch(this.error);
    if (refresh) {
      await this.refresh();
    }
    await this.setEnabled(true);
    this.lastText = text;
    await this.setStoreValue(LAST_TEXT_KEY, text);
    if (!fromSettings) {
        await this.setSettings({ text, });
    }
  }

  async onSettings({ newSettings, changedKeys }: {
    oldSettings: { [key: string]: boolean | string | number | undefined | null };
    newSettings: { [key: string]: boolean | string | number | undefined | null };
    changedKeys: string[];
}) {
    if (changedKeys.includes('text')) {
      await this.setText('' + newSettings.text, false, true, true);
    }
  }
}

module.exports = TextDevice;
