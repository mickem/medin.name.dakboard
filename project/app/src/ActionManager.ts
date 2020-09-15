import { FlowCardAction } from 'homey';
import { error, log } from './LogManager';
import { Catch } from './utils';

interface ICardList {
  [key: string]: FlowCardAction;
}
export class ActionManager<Handler> {
  private handler: Handler;
  private cards: ICardList;
  private prefix: string;

  constructor(handler: Handler, prefix: string = '') {
    this.handler = handler;
    this.prefix = prefix;
    this.cards = {};
    for (const id in handler) {
      try {
        this.cards[id] = new FlowCardAction(prefix + id);
      } catch (err) {
        error(`Failed to register action card ${prefix + id}: ${err}`);
      }
    }
  }

  @Catch()
  public register() {
    log(`Registering ${Object.keys(this.cards).length} actions`);
    for (const id in this.cards) {
      (this.cards[id] as any).register().registerRunListener(async (args, state) => {
        try {
          return await this.handler[id](args);
        } catch (err) {
          error(`Failed to fire trigger ${this.prefix}${id}: ${err}`);
        }
      });
    }
  }
}
