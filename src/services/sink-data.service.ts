import axios, { AxiosResponse } from 'axios';

import { Producer } from '../models/producer.model';
import { environment } from '../environments/environment';


export async function businessTransit(authToken: string | undefined, body: Producer): Promise<AxiosResponse> {
  try {
    return await axios.post(
      `${environment.businessTransitAPI}sink-data`,
      body, {
        headers: {
          authorization: `Bearer ${authToken}`,
          'content-type': 'application/json',
        }
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}