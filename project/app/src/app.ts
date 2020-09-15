import Homey from 'homey';
import { DakBoardManager } from './DakBoardManager';

const mgr = new DakBoardManager();
class Wrapper extends Homey.App {
  public get(): DakBoardManager {
    return mgr;
  }
  public async onInit() {
    await mgr.onInit();
  }
}

export = Wrapper;
