import Homey from 'homey';
import { DakBoardManager } from './DakBoardManager';
import DakBoardClient from './helpers/DakBoardClient';

class DakBoard extends Homey.App {
  mgr?: DakBoardManager;


  public get(): DakBoardManager {
    return this.mgr || new DakBoardManager(this);
  }
  async onInit() {
    this.mgr = new DakBoardManager(this);
    await this.mgr.onInit();

    this.homey.flow.getActionCard(`DakBoard.AddMetric`).registerRunListener(async (args:{
      name: string;
      value: number;
    }): Promise<boolean> =>{
      if (this.mgr === undefined) {
        this.error("Seems Dakboard client has not loaded properly...")
        return false;
      }
      new DakBoardClient(this, this.mgr.getApiKey()).addMetric(args.name, args.value);
      return true;
    });


  }
}

module.exports = DakBoard;
