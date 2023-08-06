import { Request, Response } from 'express';

import { environment } from '../../environments/environment';
import { isAllowed } from '../../utils/middlewares';


const req: Request = { headers: { authorization: `Bearer ${environment.authTransformAndSinkToken}` } } as Request;
const res: Response = {} as Response;
const next: jest.Mock = jest.fn();

describe('isAllowed', (): void => {
  it('should call next() when a valid authorization header token is provided', async (): Promise<void> => {
    await isAllowed(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 403 when authorization header token is missing', async () => {
    const req: Request = { headers: {} } as Request;
    const res: Response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    await isAllowed(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized to transform and sink.' });
  });

  it('should return 403 when authorization header token is invalid', async () => {
    const req: Request = { headers: { authorization: 'invalid_token' } } as Request;
    const res: Response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    await isAllowed(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized to transform and sink.' });
  });

  it('should return 400 when an error occurs during execution', async () => {
    const req: Request = {} as Request;
    const res: Response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next: jest.Mock = jest.fn().mockRejectedValue(new Error('Cannot read properties of undefined (reading \'authorization\')'));

    await isAllowed(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cannot read properties of undefined (reading \'authorization\')' });
  });
});
