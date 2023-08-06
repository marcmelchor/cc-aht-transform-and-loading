import { Request, Response } from 'express';

export const transformAndLoad = async (req: Request, res: Response): Promise<Response> => {
  console.log('Transform and Load', req.body);
  try {
    // TODO: Make the 'Mini Transformation'
    // TODO: Store data in Data Wear House (DWH) 'Sink'
    return res.json({message: 'Transform and Sink Data'}).end();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({message: `Error in 'Mini Transform' and 'Sink': ${error.message}`})
  }
}
