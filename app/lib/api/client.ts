'use client';

import axios, { AxiosInstance } from 'axios';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_OIL_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getOilPrices() {
    try {
      const response = await this.client.get('/oil-data');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch oil prices:', error);
      throw error;
    }
  }

  async getSPRData() {
    try {
      const response = await this.client.get('/spr-data');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch SPR data:', error);
      throw error;
    }
  }

  async getSupplyRoutes() {
    try {
      const response = await this.client.get('/supply-routes');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch supply routes:', error);
      throw error;
    }
  }

  async getGeopoliticalRisk() {
    try {
      const response = await this.client.get('/geopolitical-risk');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch geopolitical risk:', error);
      throw error;
    }
  }

  async runScenario(scenarioId: string, params?: Record<string, unknown>) {
    try {
      const response = await this.client.post('/scenarios', {
        scenarioId,
        ...params,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to run scenario:', error);
      throw error;
    }
  }
}

export const apiClient = new APIClient();
