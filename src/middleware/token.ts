import jwt from 'jsonwebtoken';
import {config} from '../config/config'
export const verifyToken = (token: string): any => {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Token Invalido');
    }
  }
  import { Request, Response, NextFunction } from 'express';

  export const validarNetwork = (req: Request, res: Response, next: NextFunction) => {
    const network = req.params.network;
  
    if (network !== 'Facebook' && network !== 'Twitter' && network !== 'Instagram' && network !== 'test') {
      return res.status(400).json({ error: 'Tipo de red no válido' });
    }
  
    next(); 
  };
  