export class FlowCardAction {
  public name: string;
  public handler: any;
  constructor(name: string) {
    this.name = `$$${name}`;
    if (name === 'throw') {
      throw new Error('This is a simulated homey');
    }
  }
  public register() {
    return {
      registerRunListener: handler => {
        this.handler = handler;
      },
    };
  }
}
// tslint:disable-next-line: max-classes-per-file
export class FlowCardTrigger {
  public name: string;
  public handler: any;
  constructor(name: string) {
    this.name = `$$${name}`;
    if (name === 'throw') {
      throw new Error('This is a simulated homey');
    }
  }
  public register() {}
  public trigger(args) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ManagerCron {
  public getTasks(taskname) {
    return [];
  }
  public unregisterTask(taskId: string) {}
  public registerTask(taskname, cron) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ManagerSettings {
  public get(key: string): any {};
  public set(key: string, data: any) {};

  public on(event: string, cb: Function) {};

}


let instance;
export default {
  app: {
    get: () => instance,
    set: (inst: any) => {
      instance = inst;
    },
  },
};
