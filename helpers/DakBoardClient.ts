import axios, { AxiosRequestConfig } from 'axios';
import { SimpleClass } from 'homey';
import qs from 'qs';

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
  client: SimpleClass;

  constructor(client: SimpleClass,  apiKey: string) {
    this.client = client;
    this.apiKey = apiKey;
  }

  public async disableBlock(screen: string, block: string, isDisabled: number) {
    return await this.put<IBlock>(`/screens/${screen}/blocks/${block}`, { is_disabled: isDisabled });
  }
  public async setText(screen: string, block: string, text: string) {
    return await this.put<IBlock>(`/screens/${screen}/blocks/${block}`, { text, is_disabled: 0 });
  }

  public async addMetric(metric: string, value: number) {
    return await this.postRaw<void>(`/metrics/${metric}`, [{ value }], 1, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
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

  private async get<T>(path: string, retry = 1): Promise<T> {
    const url = `${BASE_URL}${path}?api_key=${this.apiKey}`;
    this.client.log(`GET: ${BASE_URL}${path}`);

    try {
      const ret = await axios.get<T>(url);
      return ret.data;
    } catch (err) {
      const response = (err as any).response;
      this.client.log(`Failed to fetch block (${retry}, ${path}): ${response.status}`);
      if (retry < RETRIES && response.status === 404) {
        await delay(RETRIES);
        return await this.get(path, retry + 1);
      }
      this.client.error(`Failed to fetch block (${path}): ${response.status}`);
      throw Error(`Failed to fetch block (${path}): ${response.status}`);
    }
  }

  private async put<T>(path: string, data: any, retry = 1): Promise<T> {
    return this.putRaw<T>(path, qs.stringify(data), retry, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });
  }
  private async putRaw<T>(path: string, data: any, retry = 1, headers : AxiosRequestConfig = {}): Promise<T> {
    const url = `${BASE_URL}${path}?api_key=${this.apiKey}`;
    this.client.log(`PUT: ${BASE_URL}${path}`);
    try {
      const ret = await axios.put<T>(url, data, headers);
      return ret.data;
    } catch (err) {
      const response = (err as any).response;
      this.client.log(`Failed to update block (${retry}, ${url}): ${response.status}`);
      if (retry < RETRIES && response.status === 404) {
        await delay(RETRY_DELAY);
        return await this.put(path, data, retry + 1);
      }
      this.client.error(`Failed to update block (${url}): ${response.status}`);
      throw Error(`Failed to update block (${url}): ${response.status}`);
    }
  }
  private async postRaw<T>(path: string, data: any, retry = 1, headers : AxiosRequestConfig = {}): Promise<T> {
    const url = `${BASE_URL}${path}?api_key=${this.apiKey}`;
    this.client.log(`POST: ${BASE_URL}${path}`);
    try {
      const ret = await axios.post<T>(url, data, headers);
      return ret.data;
    } catch (err) {
      const response = (err as any).response;
      this.client.log(`Failed to update block (${retry}, ${url}): ${response.status}`);
      if (retry < RETRIES && response.status === 404) {
        await delay(RETRY_DELAY);
        return await this.put(path, data, retry + 1);
      }
      this.client.error(`Failed to update block (${url}): ${response.status}`);
      throw Error(`Failed to update block (${url}): ${response.status}`);
    }
  }

}
