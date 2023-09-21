import { TweetDocument } from 'src/interface/tweetsInterface';
import { TweetModel } from '../models/tweetsModels';
import { FiltrosSchema } from 'src/interface/filtroInterface';
import ConsultaMongo from './claseFiltradoPrincipal';
import { ObjetoDB } from 'src/interface/datosGlobales';

class TweetService {
  async getOneTweet(idTweet: string) {
    try {
      const tweet = await TweetModel.find({ ID: `${idTweet}` });
      if (!tweet) return null;
      return tweet;
    } catch (error) {
      console.log({ msg: `error desde el intento de consultar ${error} esto en filtros` });
    }
  }
  async filterByClient(numberClient: number): Promise<TweetDocument[] | null> {
    try {
      const tweetsByClient = await TweetModel.find({ idCliente: numberClient });
      return tweetsByClient;
    } catch (error) {
      console.error('Error filtering by client:', error);
      throw error;
    }
  }
  async filtrarDocumentos(filtrarDocumentos: FiltrosSchema) {
    try {
      const consultaMongo = new ConsultaMongo(filtrarDocumentos);
  
      await consultaMongo.cliente();
      await consultaMongo.manejarSerie();
      await consultaMongo.manejarFecha();
      await consultaMongo.manejarModelo();
      await consultaMongo.manejarSubserie();
      await consultaMongo.polaridad();
      await consultaMongo.filas();
  
      let documentosFiltrados = await consultaMongo.obtenerResultados();
  
      if (filtrarDocumentos.Fila && Array.isArray(filtrarDocumentos.Fila) && filtrarDocumentos.Fila.length > 0) {
        // Si se proporcionaron múltiples filas de búsqueda
        for (const fila of filtrarDocumentos.Fila) {
          if (fila.anidados === true) {
            const documentosSinAnidados = await consultaMongo.obtenerResultadosSinAnidados();
  
            // Combina los resultados de ambas consultas y elimina duplicados
            documentosFiltrados = [...documentosFiltrados, ...documentosSinAnidados];
            documentosFiltrados = documentosFiltrados.filter((documento, index, self) =>
              index === self.findIndex((d) => d.id === documento.id)
            );
          }
        }
      }
  
      return documentosFiltrados;
    } catch (error) {
      console.error('Error filtrando documentos:', error);
      throw error;
    }
  }
  
  

  
}

export default new TweetService();


  // async sendtweet(data:any){
  //   try{
  //     const tweet = await TweetModel.create(data);
  //     if (!tweet) return null;
  //     return tweet;
  //   }catch(err){
  //     console.log({ msg: `error desde el intento de consultar ${err} esto en filtros` });
  //   }
  // }