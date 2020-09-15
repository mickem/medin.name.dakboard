import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { debug, error, log } from '../LogManager';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export interface IScreen {
  id: string;
  name: string;
  width: number;
  height: number;
  orientation: 'landscape' | '';
  status: 'active' | '';
  version: number;
  is_default: number;
}

export interface IBlock {
  id: string;
  name: string;
  type: string;
  h: number;
  w: number;
  x: number;
  y: number;
  is_disabled: number;
  z_index: number;
  text: string;

  // photos: source

  // Weather
  /*
  location
  lat
  lon
*/
}
const BASE_URL = 'https://dakboard.com/api/2';
const RETRY_DELAY = 500;
const RETRIES = 5;

export default class DakBoardClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async disableBlock(screen: string, block: string, isDisabled: number) {
    return await this.put<IBlock>(`/screens/${screen}/blocks/${block}`, { is_disabled: isDisabled });
  }
  public async setText(screen: string, block: string, text: string) {
    return await this.put<IBlock>(`/screens/${screen}/blocks/${block}`, { text, is_disabled: 0 });
  }

  public async refresh(screen: string) {
    return await this.put<IScreen>(`/screens/${screen}`, { refresh: 1 });
  }

  public async getScreens(): Promise<IScreen[]> {
    return await this.get<IScreen[]>('/screens');
  }
  public async getBlocks(screen: string): Promise<IBlock[]> {
    return await this.get<IBlock[]>(`/screens/${screen}/blocks`);
  }

  private async get<T>(path: string, retry: number = 1): Promise<T> {
    const url = `${BASE_URL}${path}?api_key=${this.apiKey}`;
    debug(`GET: ${BASE_URL}${path}`);

    try {
      const ret = await axios.get<T>(url);
      return ret.data;
    } catch (err) {
      log(`Failed to fetch block (${retry}, ${path}): ${err.response.status}`);
      if (retry < RETRIES && err.response.status === 404) {
        await delay(RETRIES);
        return await this.get(path, retry + 1);
      }
      error(`Failed to fetch block (${path}): ${err.response.status}`);
      throw Error(`Failed to fetch block (${path}): ${err.response.status}`);
    }
  }

  private async put<T>(path: string, data: any, retry: number = 1): Promise<T> {
    const url = `${BASE_URL}${path}?api_key=${this.apiKey}`;
    debug(`PUT: ${BASE_URL}${path}`);
    const headers: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    };
    try {
      const ret = await axios.put<T>(url, qs.stringify(data), headers);
      return ret.data;
    } catch (err) {
      log(`Failed to update block (${retry}, ${url}): ${err.response.status}`);
      if (retry < RETRIES && err.response.status === 404) {
        await delay(RETRY_DELAY);
        return await this.put(path, data, retry + 1);
      }
      error(`Failed to update block (${url}): ${err.response.status}`);
      throw Error(`Failed to update block (${url}): ${err.response.status}`);
    }
  }
}
