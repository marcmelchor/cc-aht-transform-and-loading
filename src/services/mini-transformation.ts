import bcrypt from 'bcrypt';

import { Producer } from '../models/producer.model';


export async function miniTransform(data: Producer): Promise<Producer> {
  try {
    const dataAfterCleansing: Producer = dataCleansing(data);
    return await dataGovernance(dataAfterCleansing);
  } catch (e: any) {
    throw e;
  }
}

/*
  In order to proceed with the data cleansing, I want to assume that there is a rule that if an 'id' is lower to
  100 then, should be added 200 more.
  If the id is lower to 1 throws an error and if the username is longer than 100 characters cut it to a maximum of 100
*/
export function dataCleansing(data: Producer): Producer {
  try {
    data.id < 100 ? data['id'] = data.id + 200 : null;
    if (data.id < 1) {
      throw new Error('Id should be greater than 0');
    } if (data.username.length > 100) {
      data.username = data.username.slice(0, 100);
    }
    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

/*
  In order to proceed with the data governance, I want to assume that due to GDPR compliance, I should mask the username
*/
export async function dataGovernance(data: Producer): Promise<Producer> {
  try {
    const saltRounds: number = 10;
    data.username = await bcrypt.hash(data.username, saltRounds);
    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
