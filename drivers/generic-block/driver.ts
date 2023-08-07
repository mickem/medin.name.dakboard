import PairSession from 'homey/lib/PairSession';
import BaseDevice from './BaseDevice';
import { BaseDriver } from './BaseDriver';

const prefix = 'IGenericActionHandler.';
class Driver extends BaseDriver {

  public async onInit() {
    const flow = this.homey.flow;

  flow.getActionCard(`${prefix}EnableBlock`).registerRunListener(async (args:{
          device: any;
          enabled: string;
          updateOnlyIfChanged: string;
          refreshScreen: string;
        }): Promise<boolean> =>{
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
        });

  flow.getActionCard(`${prefix}Refresh`).registerRunListener(async (args:{ device: any }): Promise<boolean> =>{
          await (args.device as BaseDevice).refresh();
          return true;
        });
    await super.onInit();
  }

  public async onPair(session:PairSession) {
    super.pairDevice(session, undefined);
  }
}

export = Driver;
