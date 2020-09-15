const triggers = {};
const instance = {
  devices: {
    fire: async (id, value) => {
      await triggers[id](value);
    },
    getDevice: jest.fn(),
    getDevices: jest.fn(),
    on: (id, fun) => {
      triggers[id] = fun;
    },
  },
  zones: {
    fire: async (id, value) => {
      await triggers[id](value);
    },
    getZones: jest.fn(),
    on: (id, fun) => {
      triggers[id] = fun;
    },
  },
};
export class HomeyAPI {
  public static async forCurrentHomey() {
    return instance;
  }
}
