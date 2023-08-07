
export type ApiKeyHandler = (apiKey: string) => void;

export interface IDakBoardManager {
  getApiKey(): string;
  onApiKeyChanged(apiKey: ApiKeyHandler):void;
  updateApiKey(apiKey: string):void;
}


export interface DakBoardApp {
  get():IDakBoardManager;
}