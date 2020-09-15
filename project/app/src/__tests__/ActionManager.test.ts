import { ActionManager } from '../ActionManager';

interface IFoo {
  Foo(args: any);
  Bar(args: any);
}

describe('can register cards', () => {
  test('can create cars', () => {
    const ac = new ActionManager<IFoo>({
      Bar: args => {},
      Foo: args => {},
    });
    expect(Object.keys((ac as any).cards)).toHaveLength(2);
    expect((ac as any).cards).toHaveProperty('Foo');
    expect((ac as any).cards.Foo).toHaveProperty('name');
    expect((ac as any).cards.Foo.name).toEqual('$$Foo');
    expect((ac as any).cards).toHaveProperty('Bar');
    expect((ac as any).cards.Bar).toHaveProperty('name');
    expect((ac as any).cards.Bar.name).toEqual('$$Bar');
  });
  test('errors in Homey API are handled nicely', () => {
    const ac = new ActionManager<IFoo>({
      Bar: args => {},
      Foo: args => {},
      throw: args => {},
    } as any);
    expect(Object.keys((ac as any).cards)).toHaveLength(2);
    expect((ac as any).cards).toHaveProperty('Foo');
    expect((ac as any).cards.Foo).toHaveProperty('name');
    expect((ac as any).cards.Foo.name).toEqual('$$Foo');
    expect((ac as any).cards).toHaveProperty('Bar');
    expect((ac as any).cards.Bar).toHaveProperty('name');
    expect((ac as any).cards.Bar.name).toEqual('$$Bar');
  });
});

describe('can trigger cards', () => {
  const handler = {
    Bar: jest.fn().mockReturnValue(false),
    Foo: jest.fn().mockReturnValue(true),
  };
  const ac = new ActionManager<IFoo>(handler);
  test('can create cards', () => {
    ac.register();
    expect(Object.keys((ac as any).cards)).toHaveLength(2);
    expect((ac as any).cards).toHaveProperty('Foo');
    expect((ac as any).cards.Foo).toHaveProperty('handler');
    expect((ac as any).cards.Foo.handler).toBeDefined();
    expect((ac as any).cards).toHaveProperty('Bar');
    expect((ac as any).cards.Bar).toHaveProperty('name');
    expect((ac as any).cards.Bar.handler).toBeDefined();
  });

  test('can fire triggers', async () => {
    expect(await (ac as any).cards.Foo.handler()).toEqual(true);
    expect(handler.Foo).toBeCalled();
    expect(await (ac as any).cards.Bar.handler()).toEqual(false);
    expect(handler.Bar).toBeCalled();
  });
});
