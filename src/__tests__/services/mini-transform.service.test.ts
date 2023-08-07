import * as miniTransform from '../../services/mini-transformation';
import { Producer } from '../../models/producer.model';
import bcrypt from 'bcrypt';


describe('miniTransformService', (): void => {
  it('should return the same object without modifying its id when id is greater than or equal to 100', () => {
    const data: Producer = {
      id: 100,
      uid: 'uid',
      type: 'type',
      rh_factor: 'rh_factor',
      group: 'group',
      username: 'username'
    };
    expect(miniTransform.dataCleansing(data)).toEqual(data);

    const data2: Producer = {
      id: 101,
      uid: 'uid',
      type: 'type',
      rh_factor: 'rh_factor',
      group: 'group',
      username: 'username'
    };
    expect(miniTransform.dataCleansing(data2)).toEqual(data2);
  });

  it('should add 200 to the id and return the modified object when id is less than 100', () => {
    const data: Producer = {
      id: 99,
      uid: 'uid',
      type: 'type',
      rh_factor: 'rh_factor',
      group: 'group',
      username: 'username'
    };
    const expectedData: Producer = {
      id: 299,
      uid: 'uid',
      type: 'type',
      rh_factor: 'rh_factor',
      group: 'group',
      username: 'username'
    };
    expect(miniTransform.dataCleansing(data)).toEqual(expectedData);

    const data2: Producer = {
      id: 0,
      uid: 'uid',
      type: 'type',
      rh_factor: 'rh_factor',
      group: 'group',
      username: 'username'
    };
    const expectedData2: Producer = {
      id: 200,
      uid: 'uid',
      type: 'type',
      rh_factor: 'rh_factor',
      group: 'group',
      username: 'username'
    };
    expect(miniTransform.dataCleansing(data2)).toEqual(expectedData2);
  });

  it('should hash the username field using bcrypt', async () => {
    const data: Producer = {
      id: 1,
      uid: '1234',
      type: 'type',
      rh_factor: 'rh+',
      group: 'group',
      username: 'testuser'
    };
    const originalHashedUsername: string = data.username;
    const result: Producer = await miniTransform.dataGovernance(data);
    expect(await bcrypt.compare(originalHashedUsername, result.username)).toBe(true);
  });

  it('should throw an error if the data object is null', async () => {
    const data: any = null;
    await expect(miniTransform.dataGovernance(data)).rejects.toThrow();
  });

  it('should throw an error if the username field is null', async () => {
    const data: any = {
      id: 1,
      uid: '1234',
      type: 'type',
      rh_factor: 'rh+',
      group: 'group',
      username: null
    };
    await expect(miniTransform.dataGovernance(data)).rejects.toThrow();
  });

  it('should throw an error if the saltRounds is null', async () => {
    const data: Producer = {
      id: 1,
      uid: '1234',
      type: 'type',
      rh_factor: 'rh+',
      group: 'group',
      username: 'testuser'
    };
    const saltRounds: any = null;
    await expect(bcrypt.hash(data.username, saltRounds)).rejects.toThrow();
  });

  it('should throw an error if the saltRounds is not a number', async () => {
    const data: Producer = {
      id: 1,
      uid: '1234',
      type: 'type',
      rh_factor: 'rh+',
      group: 'group',
      username: 'testuser'
    };
    const saltRounds: string = 'not a number';
    await expect(bcrypt.hash(data.username, saltRounds)).rejects.toThrow();
  });

  it('should throw an error if the data object is missing the username field', async () => {
    const data: any = {
      id: 1,
      uid: '1234',
      type: 'type',
      rh_factor: 'rh+',
      group: 'group'
    };
    await expect(miniTransform.dataGovernance(data)).rejects.toThrow();
  });

  it('should return transformed data when given valid input', async () => {
    const input: Producer = {
      id: 50,
      uid: '1234',
      type: 'type1',
      rh_factor: '+',
      group: 'A',
      username: 'user1'
    };
    const expectedOutput: Producer = {
      id: 250,
      uid: '1234',
      type: 'type1',
      rh_factor: '+',
      group: 'A',
      username: expect.any(String)
    };
    const output: Producer = await miniTransform.miniTransform(input);
    expect(output).toEqual(expectedOutput);
  });

  it('should throw an error when given invalid input', async () => {
    const input: any = {
      id: 500,
      uid: '1234',
      type: 'type1',
      rh_factor: '+',
      group: 'A',
    };
    await expect(miniTransform.miniTransform(input)).rejects.toThrow();
  });
});