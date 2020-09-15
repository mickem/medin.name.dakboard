import { ILogMessage } from '../LogManager';

export type ApiKeyHandler = (apiKey: string) => void;

export interface IDakBoardManager {
  getApiKey(): string;
  onApiKeyChanged(apiKey: ApiKeyHandler);
  updateApiKey(apiKey: string);
  getLogs(): ILogMessage[];
}
