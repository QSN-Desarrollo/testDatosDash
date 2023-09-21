import { Request, Response } from 'express';
import TweetService from '../services/filtrosServices';
import DatosGlobales from './datosGlobales';
import filterMiddleware from '../middleware/filterMiddleware';
import { verifyToken } from '../middleware/token';
import { TweetDocument } from 'src/interface/tweetsInterface';

class TweetController {
  constructor() {
  }
  async getAllTweetsOneClient(req: Request, res: Response) {
    try {
      let numberClient = 0;
      if (req.params && req.params.clientId) {
        const clientIdString = req.params.clientId;
        numberClient = parseInt(clientIdString, 10);
        if (isNaN(numberClient)) {
           const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });
          const decodedToken = verifyToken(token);
        if (!decodedToken.cliente) return res.status(400).json({ msg: 'El cliente no existe' });
          numberClient = parseInt(decodedToken.cliente);}
      } else {
        if (isNaN(numberClient)) {
          return res.status(400).json({ msg: 'clientId en el token no es un número válido' });
        }
      }
      const filteredTweetsbyClient = await TweetService.filterByClient(numberClient);
      if (!filteredTweetsbyClient || filteredTweetsbyClient.length === 0) {
        return res.status(404).json({ msg: 'No se encontraron tweets para este cliente' });
      }
      const filterAcount = await DatosGlobales.filtrarAcount(filteredTweetsbyClient);
      res.status(200).json({ tweets:filterAcount });
    } catch (error) {
      console.error('Error getting tweets by client:', error);
      res.status(500).json({ msg: 'Error interno del servidor o Token Expirado' });
    }
  }
  async getOneTweet(req: Request, res: Response) {
    try {
      const { idTweet } = req.body;
      if (!idTweet) return res.status(400).json({ msg: 'error con el id del tweet' });
      const tweets = await TweetService.getOneTweet(idTweet.toString());
      if (!tweets) return res.status(400).json({ msg: 'la respuesta de la consulta no existe' });
      // console.time('Tiempo de respuesta de filterAcount');
      const objetoMapeado = await DatosGlobales.procesarFechas(tweets);
      console.log((objetoMapeado).flat());
      // console.timeEnd('Tiempo de respuesta de filterAcount');
      return res.status(200).json(objetoMapeado);
    } catch (error) {
      console.error('Error fetching tweets:', error);
      res.status(500).json({ message: 'Error fetching tweets' });
    }
  }
  async getFilteredData(req: Request, res: Response) {
    try {
      const filtros = req.body;
      if (!filtros)  res.status(400).json({ msg: 'the obj for filter was empty' });
      console.time('Tiempo de respuesta de filtrados');
      const filtrados = await filterMiddleware.filtrarNull([filtros]);
      console.timeEnd('Tiempo de respuesta de filtrados');
      if (filtrados.length === 0) {
        console.log('Resultados filtrados están vacíos, se corta el proceso.');
        res.status(200).json({ msg: 'the obj for filter was empty' });
        return;
      }  
      // console.time('Tiempo de respuesta de de mongo');
      const findDate = await TweetService.filtrarDocumentos(filtrados);
      // console.timeEnd('Tiempo de respuesta de mongo');
  
      // console.time('Tiempo de respuesta de filter Nubes Bigramas');
      // const filterNubes = await DatosGlobales.filtrarNubes(findDate);
      // console.timeEnd('Tiempo de respuesta de filter Nubes jesus');
      // console.time('Tiempo de respuesta de filter Nubes Bigramas');
      // const filterNubesBigramas = await DatosGlobales.filtrarBigramas(findDate);
      // console.timeEnd('Tiempo de respuesta de filter Nubes Trigramas');
      // console.time('Tiempo de respuesta de filter Nubes jesus');
      // const filterNubesTrigramas = await DatosGlobales.filtrarTrigramas(findDate);
      // console.timeEnd('Tiempo de respuesta de filter Nubes Trigramas');
  
      console.time('Tiempo de respuesta de filterAcount');
      const filterAcount = await DatosGlobales.mapearObjetos(findDate);
      console.timeEnd('Tiempo de respuesta de filterAcount');
      res.status(200).json({ msg: filterAcount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  } 
}

export default new TweetController();
  // async post(req: Request, res: Response){
  //   try {
  //     const body = req.body
  //     if(!body) return res.status(400).json({msg:'error con el body'})
  //     const tweets = await TweetService.sendtweet(body);
  //     if(!tweets) return res.status(400).json({msg:'la respuesta de la consulta no existe'})
  //     return res.status(200).json(tweets);
  //   } catch (error) {
  //     console.error('Error fetching tweets:', error);
  //     res.status(500).json({ message: 'Error fetching tweets' });
  //   }
  // }