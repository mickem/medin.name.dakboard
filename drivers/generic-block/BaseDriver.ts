import { Driver } from 'homey';
import DakBoardClient from '../../helpers/DakBoardClient';
import { DakBoardApp, IDakBoardManager } from '../../interfaces/IDakBoardManager';
import PairSession from 'homey/lib/PairSession';

export class BaseDriver extends Driver {
  private apiKey?: string;

  public async onInit() {
    this.getTM().onApiKeyChanged(apiKey => {
      this.apiKey = apiKey;
    });
    this.apiKey = this.getTM().getApiKey();
  }
  public async pairDevice(session: PairSession, typeFilter?: string) {
    let screen = '';

    session.setHandler('get_api_key', async (): Promise<any> => {
      return this.apiKey;
    });

    session.setHandler('verify_api_key', async (apiKey: string): Promise<any> => {
      try {
        const client = new DakBoardClient(this, apiKey);
        const screens = await client.getScreens();
        this.apiKey = apiKey;
        this.getTM().updateApiKey(apiKey);
        return screens;
      } catch (err) {
        this.error(`Failed to login to dakboard: ${err}`)
        throw `Failed to login to dakboard: ${err}`;
      }
    });

    session.setHandler('select_screen', async (selectedScreen: string): Promise<any> => {
      screen = selectedScreen;
      return 'ok';
    });

    session.setHandler('showView', async (): Promise<any> => {
      return '';
    });

    session.setHandler('list_devices', async (): Promise<any> => {
      const client = new DakBoardClient(this, this.apiKey || '');
      try {
        let blocks = await client.getBlocks(screen);
        if (typeFilter) {
          blocks = blocks.filter(b => b.type === typeFilter);
        }
        return blocks.map(s => ({ name: s.name ? s.name : s.id, data: { name: s.name, screen, block: s.id } }));
      } catch (err) {
        this.error(`Failed to fetch blocks: ${err}`)
        throw `Failed to fetch blocks: ${err}`;
      }
    }
    );
  }

  private getTM(): IDakBoardManager {
    return (this.homey.app as any as DakBoardApp).get();
  }
}
