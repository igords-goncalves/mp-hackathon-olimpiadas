import { AxiosResponse } from "axios";
import HttpService from "./Http.service";

interface IHttpClientService {}

const BASE_API_URL = "https://apis.codante.io/olympic-games";

export default class HttpClientService extends HttpService {
  #baseUrl: string;

  constructor() {
    super();
    this.#baseUrl = BASE_API_URL;
  }

  get(endpoint: string): Promise<AxiosResponse<any, any>> {
    const url =  [this.#baseUrl, endpoint].join("")
    return super.get(url);
  }
}
