import { Request, Response } from 'express';

import { miniTransform } from '../services/mini-transformation';
import { businessTransit } from '../services/sink-data.service';
import { environment } from '../environments/environment';
import { Producer } from '../models/producer.model';


export const transformAndLoad = async (req: Request, res: Response): Promise<Response> => {
  try {
    const body: Producer = await miniTransform(req.body);
    await businessTransit(environment.businessTransitToken, body);
    return res.json({message: 'Transform and Sink Data'}).end();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({message: `Error in 'Mini Transform' and 'Sink': ${error.message}`})
  }
}
