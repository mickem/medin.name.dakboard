import { ManagerSettings } from 'homey';
import { SettingsManager } from '../SettingsManager';

jest.mock('homey');

const listener = {
  onApiKey: jest.fn().mockReturnValue(false),
}

let handler;


describe('SettingsManager', () => {
  const sm = new SettingsManager(listener);
  ManagerSettings.on = jest.fn().mockImplementation((id, fun) => {
    handler = fun
  });
  
  test('api key should be empty on ctor', () => {
    expect(sm.getSettings().apiKey).toBe('');
    expect(listener.onApiKey).not.toBeCalled()
  });
  test('start should fetch settings and fire trigger', async () => {
    ManagerSettings.get = jest.fn().mockReturnValue({ apiKey: 'value' });
    await sm.start();
    expect(sm.getSettings().apiKey).toBe('value');
    expect(listener.onApiKey).toBeCalledWith('value');
    expect(handler).toBeDefined();
  });
  test('saving the key should save it', async () => {
    ManagerSettings.set = jest.fn();
    sm.setApiKey('new-key');
    expect(ManagerSettings.set).toBeCalledWith('settings', {apiKey: 'new-key'});
  });
  test('settings updates should fire trigger', async () => {
    (listener.onApiKey as jest.Mock).mockReset();
    ManagerSettings.get = jest.fn().mockReturnValue({ apiKey: 'final-key' });

    await handler('settings');
    expect(sm.getSettings().apiKey).toBe('final-key');
    expect(listener.onApiKey).toBeCalledWith('final-key');
  });
});
