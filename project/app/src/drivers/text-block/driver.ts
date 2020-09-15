import { ActionManager } from '../../ActionManager';
import { ITextActionHandler } from '../../Actions';
import { BaseDriver } from '../generic-block/BaseDriver';
import { TextDevice } from './TextDevice';
/**
 * Text block
 * #class:other
 */
class Driver extends BaseDriver {
  protected actions: ActionManager<ITextActionHandler>;

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
            await (args.device as TextDevice).enable(
              args.updateOnlyIfChanged === 'changed',
              args.refreshScreen === 'always',
            );
          } else {
            await (args.device as TextDevice).disable(
              args.updateOnlyIfChanged === 'changed',
              args.refreshScreen === 'always',
            );
          }
          return true;
        },
        async SetText(args: {
          device: any;
          text: string;
          updateOnlyIfChanged: string;
          refreshScreen: string;
        }): Promise<boolean> {
          await (args.device as TextDevice).setText(
            args.text,
            args.updateOnlyIfChanged === 'changed',
            args.refreshScreen === 'always',
          );
          return true;
        },
        async Refresh(args: { device: any }): Promise<boolean> {
          await (args.device as TextDevice).refresh();
          return true;
        },
      },
      'ITextActionHandler.',
    );

    this.actions.register();
    await super.onInit();
  }

  public onPair(socket) {
    super.onPair(socket, 'text');
  }
}

export = Driver;
