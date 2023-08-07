import PairSession from 'homey/lib/PairSession';
import { BaseDriver } from '../generic-block/BaseDriver';
import { TextDevice } from './device';
const prefix = 'ITextActionHandler.';

class Driver extends BaseDriver {

  public async onInit() {
    const flow = this.homey.flow;
    flow.getActionCard(`${prefix}EnableBlock`).registerRunListener(async (args:{
      device: any;
      enabled: string;
      updateOnlyIfChanged: string;
      refreshScreen: string;
    }): Promise<boolean> => {
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
      });

      flow.getActionCard(`${prefix}SetText`).registerRunListener(async (args:{
          device: any;
          text: string;
          updateOnlyIfChanged: string;
          refreshScreen: string;
        }): Promise<boolean> => {
          await (args.device as TextDevice).setText(
            args.text,
            args.updateOnlyIfChanged === 'changed',
            args.refreshScreen === 'always',
          );
          return true;
        });
        flow.getActionCard(`${prefix}Refresh`).registerRunListener(async (args:{ device: any }): Promise<boolean> =>{
          await (args.device as TextDevice).refresh();
          return true;
        });

    await super.onInit();
  }

  public async onPair(session:PairSession) {
    super.pairDevice(session, 'text');
  }
}

export = Driver;
