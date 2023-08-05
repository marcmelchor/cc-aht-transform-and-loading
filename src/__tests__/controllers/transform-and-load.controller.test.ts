import { transformAndLoad } from '../../controllers/transform-and-load.controller';

describe('transformAndLoad', (): void => {
  it('should log the request body', (): void => {
    const req: any = { body: { data: 'test data' } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn()
    };
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    transformAndLoad(req, res);
    expect(consoleSpy).toHaveBeenCalledWith('Transform and Load', req.body);
  });

  it('should return a 200 status code with a success message', async (): Promise<void> => {
    const req: any = { body: { data: 'test data' } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn()
    };
    await transformAndLoad(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Transform and Sink Data' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return a JSON object with a non-empty message string', async (): Promise<void> => {
    const req: any = { body: { data: 'test data' } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn()
    };
    jest.spyOn(console, 'log').mockImplementation(() => {});
    await transformAndLoad(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    expect(res.json.mock.calls[0][0].message.length).toBeGreaterThan(0);
  });
});
