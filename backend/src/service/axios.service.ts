import axios, { AxiosInstance } from "axios";

import { DUMMY_JSON_QUOTES_RANDOM } from "../constants/constants.common";
import { IQuoteResponse } from "../interfaces/quote-response";

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: DUMMY_JSON_QUOTES_RANDOM,
    });
  }

  public async getRandomQuote(): Promise<IQuoteResponse | null> {
    try {
      const { data } = await this.axiosInstance.get<IQuoteResponse>("");
      return data;
    } catch (error) {
      console.error("Failed to fetch random quote:", error);
      return null;
    }
  }
}

export const axiosService = new AxiosService();
