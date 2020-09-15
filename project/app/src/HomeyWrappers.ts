import Homey from 'homey';

export function __(key: string, data?: any): string {
  return Homey.__(key, data);
}
