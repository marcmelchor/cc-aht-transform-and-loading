import { NextFunction, Request, Response } from 'express';

import { environment } from '../environments/environment';


export const isAllowed = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const authHeaderToken: string | undefined = req.headers.authorization;
    const authTransformAndSinkToken: string = `Bearer ${environment.authTransformAndSinkToken}`;
    if (!authHeaderToken || authHeaderToken !== authTransformAndSinkToken) {
      return res.status(403).json({message: 'Unauthorized to transform and sink.'});
    }

    return next();
  } catch (error: any) {
    return res.status(400).json({message: error.message});
  }
}
