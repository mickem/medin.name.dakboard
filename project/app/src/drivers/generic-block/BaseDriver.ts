import { __, app, Driver } from 'homey';
import DakBoardClient from '../../helpers/DakBoardClient';
import { IDakBoardManager } from '../../interfaces/IDakBoardManager';
import { error, log } from '../../LogManager';

export const capabilities = {
  /**
   * Disable block #maintenanceAction
   */
  disable: 'button.disable_block',
  /**
   * Enable block #maintenanceAction
   */
  enable: 'button.enable_block',
  /**
   * Refresh screen (of block) #maintenanceAction
   */
  refresh: 'button.refresh_screen',
};

/**
 * TextBlock for dakboard
 * #class:other
 */
export class BaseDriver extends Driver {
  private apiKey: string;

  public async onInit() {
    this.getTM().onApiKeyChanged(apiKey => {
      this.apiKey = apiKey;
    });
  }
  public onPair(socket, typeFilter: string) {
    let screen = '';

    socket.on('get_api_key', (data, callback) => {
      callback(null, this.apiKey);
    });

    socket.on('verify_api_key', (apiKey, callback) => {
      const client = new DakBoardClient(apiKey);
      client.getScreens().then(
        screens => {
          this.apiKey = apiKey;
          this.getTM().updateApiKey(apiKey);
          callback(undefined, screens);
        },
        reason => {
          error(`Failed to login to dakboard: ${reason}`)
          callback(`Failed to login to dakboard: ${reason}`);
        },
      );
    });

    socket.on('select_screen', (selectedScreen, callback) => {
      screen = selectedScreen;
      callback(undefined, 'ok');
    });

    socket.on('showView', (viewId, callback) => {
      callback();
    });

    socket.on('list_devices', (data, callback) => {
      const client = new DakBoardClient(this.apiKey);
      client.getBlocks(screen).then(
        blocks => {
          if (typeFilter) {
            blocks = blocks.filter(b => b.type === typeFilter);
          }
          callback(
            null,
            blocks.map(s => ({ name: s.name ? s.name : s.id, data: { name: s.name, screen, block: s.id } })),
          );
        },
        reason => {
          error(`Failed to fetch blocks: ${reason}`)
          callback(`Failed to fetch blocks: ${reason}`);
        },
      );
    });
  }

  private getTM(): IDakBoardManager {
    return app.get() as IDakBoardManager;
  }
}
