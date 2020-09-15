import { IGenericActionHandler } from 'src/Actions';
import { ActionManager } from '../../ActionManager';
import BaseDevice from './BaseDevice';
import { BaseDriver } from './BaseDriver';
/**
 * Generic block
 * #class:other
 */
class Driver extends BaseDriver {
  protected actions: ActionManager<IGenericActionHandler>;

  public async onInit() {
    this.actions = new ActionManager(
      {
        async EnableBlock(args: {
          device: any;
          enabled: string;
          updateOnlyIfChanged: string;
          refreshScreen: string;
        }): Promise<boolean> {
          if (args.enabled === 'enable') {
            await (args.device as BaseDevice).enable(
              args.updateOnlyIfChanged === 'changed',
              args.refreshScreen === 'always',
            );
          } else {
            await (args.device as BaseDevice).disable(
              args.updateOnlyIfChanged === 'changed',
              args.refreshScreen === 'always',
            );
          }
          return true;
        },
        async Refresh(args: { device: any }): Promise<boolean> {
          await (args.device as BaseDevice).refresh();
          return true;
        },
      },
      'IGenericActionHandler.',
    );
    this.actions.register();
    await super.onInit();
  }

  public onPair(socket) {
    super.onPair(socket, undefined);
  }
}

export = Driver;
