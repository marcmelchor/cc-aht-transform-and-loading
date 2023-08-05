import { Application } from 'express';
import createServer from '../../utils/server';

const app: Application = createServer();

describe('createServer', (): void => {
  it('should apply json middleware', (): void => {
    expect(app._router.stack[2].name).toBe('jsonParser');
  });

  it('should apply urlencoded middleware', (): void => {
    expect(app._router.stack[3].name).toBe('urlencodedParser');
  });

  it('should apply cors middleware', (): void => {
    expect(app._router.stack[4].name).toBe('corsMiddleware');
  });
});
