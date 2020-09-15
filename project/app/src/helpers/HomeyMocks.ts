const Homey = {
  FlowCardAction: class FlowCardAction {
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
  },
  // tslint:disable-next-line: max-classes-per-file
  FlowCardTrigger: class FlowCardTrigger {
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
  },
};
jest.mock('homey');

export default Homey;
