import axios, { AxiosResponse } from 'axios';

import { businessTransit } from '../../services/sink-data.service';
import { environment } from '../../environments/environment';


describe('sinkDataService', (): void => {
  it('should send a POST request with valid authToken and body', async () => {
    const authToken: string = 'validToken';
    const body = {
      id: 1,
      uid: 'uid1',
      type: 'type1',
      rh_factor: 'rh1',
      group: 'group1',
      username: 'user1'
    };
    const axiosPostSpy: jest.SpyInstance = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: 'success' });

    const result: AxiosResponse = await businessTransit(authToken, body);

    expect(axiosPostSpy).toHaveBeenCalledWith(`${environment.businessTransitAPI}sink-data`, body, {
      headers: {
        authorization: `Bearer ${authToken}`, 'content-type': 'application/json'
      }
    });
    expect(result.data).toEqual('success');
  });

  it('should throw an error when body is undefined', async () => {
    const authToken = 'validToken';
    const body: any = undefined;

    await expect(businessTransit(authToken, body)).rejects.toThrow();
  });

  it('should throw an error when businessTransitAPI is unreachable', async () => {
    const authToken = 'validToken';
    const body = {
      id: 1,
      uid: 'uid1',
      type: 'type1',
      rh_factor: 'rh1',
      group: 'group1',
      username: 'user1'
    };
    const axiosPostSpy: jest.SpyInstance = jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network Error'));

    await expect(businessTransit(authToken, body)).rejects.toThrow();

    expect(axiosPostSpy).toHaveBeenCalledWith(`${environment.businessTransitAPI}sink-data`, body, {
      headers: {
        authorization: `Bearer ${authToken}`, 'content-type': 'application/json'
      }
    });
  });
});