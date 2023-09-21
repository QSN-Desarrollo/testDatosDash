import { NGrams } from "natural";
import moment from 'moment';
import 'moment/locale/es'
import fs from 'fs'
import { ObjetoDB, TweetGlobales } from "../interface/datosGlobales";
import { FiltrosSchema } from "src/interface/filtroInterface";
class DatosGlobales {
  private consulta: Record<string, any> = {};

  constructor() {
    this.mapearObjeto = this.mapearObjeto.bind(this);
    this.mapearObjetos = this.mapearObjetos.bind(this);

  }
  async filtrarNubes(arrayDeObjetos: any[]): Promise<any> {
    const resultado: Record<string, any> = {};
    const palabraFrecuencia: Record<string, number> = {};
  
    arrayDeObjetos.forEach(obj => {
      if (obj.texto_limpio) {
        const palabras = obj.texto_limpio.split(' ');
  
        palabras.forEach((palabra: string) => {
          const palabraLimpia = palabra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
          
          if (palabraLimpia.length > 0 && palabraLimpia.length > 5) {
            if (palabraFrecuencia[palabraLimpia]) {
              palabraFrecuencia[palabraLimpia]++;
            } else {
              palabraFrecuencia[palabraLimpia] = 1;
            }
          }
        });
      }
    });
  
    const palabrasFrecuentes = Object.entries(palabraFrecuencia);
    palabrasFrecuentes.sort((a, b) => b[1] - a[1]);
    const palabrasConFrecuencia = palabrasFrecuentes.map(item => ({
      palabra: item[0],
      frecuencia: item[1]
    }));
    const diezPalabrasMasFrecuentes = palabrasConFrecuencia.slice(0, 10); 
    resultado.diezPalabrasMasFrecuentes = diezPalabrasMasFrecuentes;
    return resultado as FiltrosSchema;
  }
  async filtrarTrigramas(arrayDeObjetos: any[]): Promise<{ trigrama: string, frecuencia: number }[]> {
    const trigramasFrecuentes: { trigrama: string, frecuencia: number }[] = [];
    const trigramasFrecuencia: Record<string, number> = {};
  
    arrayDeObjetos.forEach(obj => {
      if (obj.texto_limpio) {
        const trigramas = NGrams.trigrams(obj.texto_limpio).map(tg => tg.join('-'));
  
        trigramas.forEach(trigrama => {
          const palabras = trigrama.split('-');
          if (palabras.every(palabra => palabra.length > 5)) {
            if (trigramasFrecuencia[trigrama]) {
              trigramasFrecuencia[trigrama]++;
            } else {
              trigramasFrecuencia[trigrama] = 1;
            }
          }
        });
      }
    });
  
    const trigramasConFrecuencia = Object.entries(trigramasFrecuencia)
      .sort((a, b) => b[1] - a[1])
      .map(([trigrama, frecuencia]) => ({ trigrama, frecuencia }));
    trigramasFrecuentes.push(...trigramasConFrecuencia.slice(0, 10));
    return trigramasFrecuentes;
  }
  async filtrarBigramas(arrayDeObjetos: any[]): Promise<{ bigrama: string, frecuencia: number }[]> {
    const bigramasFrecuentes: { bigrama: string, frecuencia: number }[] = [];
    const bigramasFrecuencia: Record<string, number> = {};
  
    arrayDeObjetos.forEach(obj => {
      if (obj.texto_limpio) {
        const bigramas = NGrams.bigrams(obj.texto_limpio).map(bg => bg.join('-'));
  
        bigramas.forEach(bigrama => {
          const palabras = bigrama.split('-');
          if (palabras.every(palabra => palabra.length > 5)) {
            if (bigramasFrecuencia[bigrama]) {
              bigramasFrecuencia[bigrama]++;
            } else {
              bigramasFrecuencia[bigrama] = 1;
            }
          }
        });
      }
    });
    const bigramasConFrecuencia = Object.entries(bigramasFrecuencia)
      .sort((a, b) => b[1] - a[1])
      .map(([bigrama, frecuencia]) => ({ bigrama, frecuencia }));
    bigramasFrecuentes.push(...bigramasConFrecuencia.slice(0, 10));
    return bigramasFrecuentes;
  } 
  async filtrarAcount(arrayDeObjetos: any[]): Promise<FiltrosSchema> {
    const resultado: Record<string, any> = {};
    resultado.cantidadDeObjetos = arrayDeObjetos.length;
    return resultado as FiltrosSchema;
  }
//  async procesarFecha(fechaTexto:string) {
//     const fecha = moment(fechaTexto, 'MMM DD, YYYY hh:mm:ss A');
//     const fechaSeg = fechaMoment.format('YYYY-MM-DD HH:mm:ss');
//     const fechaFormateada = fecha.format('YYYY-MM-DD');
//     const hora = fecha.format('HH');
//     const diaSemana = fecha.format('dddd');
//     console.log({
//       date: fechaFormateada,
//       hora: parseInt(hora, 10), 
//       diaSemana,
//     })
//     return {
//       objeto.fechaSeg = fechaSeg;
//       objeto.date = fechaFormateada;
//       objeto.hora = hora;
//       objeto.diaSemana = diaSemana;
//     };
//   }
  async  mapearObjeto(objetoOriginal: any): Promise<TweetGlobales[]> {
  const mapeoCampos: { [key: string]: string } = {
      "link": "link",
      "seriesName":"serie_name",
      "seriesId": "serie_busqueda",
      "subSeriesName": "subserie_name",
      "id":"ID",
      "fecha":"fecha",
     "dates": "2023-08-24",
     "hora":"0",
     "diaSemana": "jueves",
     "usuarioCategorizador": "usuarioCategorizador",
     "usuarioOriginal":"usuarioOriginal",
     "name": "name_author", 
     "texto":"texto",
     "menciones": "menciones",
     "hashTags":  "hashTags",
     "profileImage":"profileImage",
     "sentimiento":  "sentimiento",
     "valor_sentimiento":"valor_sentimiento",
     "Sentimientos": "Sentimientos",
     "Atributos de Personalidad":"Atributos_de_Personalidad",
     "Atributos de Politicos":"Atributos_de_Politicos",
     "Red motivacional del voto":  "Red_motivacional_del_voto",
     "Preocupaciones": "Preocupaciones",
     "Emociones Básicas (Plutchik)":"Emociones Básicas(Plutchik)",
     "Preocupaciones - Ven":"Preocupaciones - Ven",
     "Continuidad y cambio":"Continuidad y cambio",
     "Voto Emocional y Racional":"Voto Emocional y Racional",
     "enlace":"enlace",
     "comentarios":  "comentarios",
     "retweets": "retweets",
     "citas": "citas",
     "likes":"likes",
     "vistas":"vistas",
     "usuarioCategorizador_Comments":"usuarioCategorizador_Comments",
     "imagen_tweet":"imagen_tweet",
     "link_tweet_citado": "link_tweet_citado",
     "id_tweet_citado":"id_tweet_citado",
     "fecha_tweet_citado":"fecha_tweet_citado",
     "texto_tweet_citado":"texto_tweet_citado",
     "imagen_tweet_citado":"imagen_tweet_citado",
     "usuarioOriginal_tweet_citado":"usuarioOriginal_tweet_citado",
     "name_author_tweet_citado":"name_author_tweet_citado",
     "es_cita":"es_cita",
     "valor_POS":"valor_POS",
     "ESTADO":"ESTADO",
     "lat": "lat",
     "lng": "lng",
    };
    let objetoMapeado: any = {
            link: '',
            seriesName: '',
            seriesId: '',
            subSeriesName: [],
            id: '',
            fecha: '',
            hora: 0,
            diaSemana: '',
            usuarioCategorizador: [],
            usuarioOriginal: '',
            name: '',
            texto: '',
            menciones: [],
            hashTags: [],
            profileImage: '',
            sentimiento: '',
            valor_sentimiento: '',
            Sentimientos: [],
            'Atributos de Personalidad': [],
            'Atributos de Politicos': [],
            'Red motivacional del voto': [],
            Preocupaciones: [],
            'Emociones Básicas (Plutchik)': [],
            'Preocupaciones - Ven': [],
            'Continuidad y cambio': [],
            'Voto Emocional y Racional': [],
            enlace: [],
            link_tweet_citado: '',
            id_tweet_citado: '',
            fecha_tweet_citado: '',
            texto_tweet_citado: '',
            imagen_tweet_citado: [],
            usuarioOriginal_tweet_citado: '',
            name_author_tweet_citado: '',
            es_cita: false,
            valor_POS: 0,
            ESTADO: '',
            lat: '',
            lng: '',
            date: "",
            comentarios: 0,
            retweets: 0,
            citas: 0,
            likes: 0,
            vistas: 0,
            usuarioCategorizador_Comments: [],
            imagen_tweet: []
          };

  for (const campoOriginal in objetoOriginal) {
    if (campoOriginal in mapeoCampos) {
      const campoMapeado = mapeoCampos[campoOriginal];
      objetoMapeado[campoMapeado] = objetoOriginal[campoOriginal];
    }
  }

  return objetoMapeado;
}
  async  mapearObjetos(objetosOriginales: any[]): Promise<TweetGlobales[][]> {
  return Promise.all(objetosOriginales.map(objetoOriginal => this.mapearObjeto(objetoOriginal)));
}
  async save(arrayDeObjetos: any[]): Promise<void> {
    fs.writeFileSync('./cliente.json', JSON.stringify(arrayDeObjetos, null, 2), 'utf8');
    console.log('Archivo JSON generado con éxito.');
  }
  async procesarFechas(objetos: any[]): Promise<TweetGlobales[]>  {
    if (!objetos || objetos.length === 0) {
      throw new Error('El array de objetos está vacío o no se proporcionó.');
    }
        moment.locale('es');
  const rto:TweetGlobales[] = (await ((this.mapearObjetos(objetos)))).flat();
    const objetosModificados = rto.map((objeto) => {
      const fechaKey = 'fecha'; 
      if (!objeto[fechaKey]) {
        throw new Error(`La propiedad "${fechaKey}" no está presente en uno de los objetos proporcionados.`);
      }
      const fechaMoment = moment(objeto[fechaKey], 'MMM DD, YYYY hh:mm:ss A');
      const fechaSeg = fechaMoment.format('YYYY-MM-DD HH:mm:ss');
      const fechaFormateada = fechaMoment.format('YYYY-MM-DD');
      const hora = parseInt(fechaMoment.format('HH'), 10);
      const diaSemana = fechaMoment.format('dddd');

      objeto.fecha = fechaSeg;
      objeto.date = fechaFormateada;
      objeto.hora = hora;
      objeto.diaSemana = diaSemana;
      return objeto;
    });
    return objetosModificados;
  }
  // async filtrarDatosEnParalelo(arrayDeObjetos: any[]): Promise<{
  //   procesarFechas:TweetGlobales[];
  //   diezPalabrasMasFrecuentes: FiltrosSchema[];
  //   trigramasFrecuentes: { trigrama: string; frecuencia: number; }[];
  //   bigramasFrecuentes: { bigrama: string; frecuencia: number; }[];
  //   cantidadDeObjetos: number;
  // }> 
  // {
  //   try {
  //     const [diezPalabrasMasFrecuentes, trigramasFrecuentes, bigramasFrecuentes, procesarFechas] = await Promise.all([
  //       this.procesarFechas(arrayDeObjetos),
  //       this.filtrarNubes(arrayDeObjetos),
  //       this.filtrarTrigramas(arrayDeObjetos),
  //       this.filtrarBigramas(arrayDeObjetos),
  //       this.filtrarAcount(arrayDeObjetos)
  //     ]);
  
  //     return {
  //       procesarFechas:procesarFechas,
  //       diezPalabrasMasFrecuentes: diezPalabrasMasFrecuentes,
  //       trigramasFrecuentes,
  //       bigramasFrecuentes,
  //       cantidadDeObjetos: cantidadDeObjetos.cantidadDeObjetos
  //     };
  //   } catch (error) {
  //     throw new Error(`Error al filtrar los datos en paralelo: ${error}`);
  //   }
  // }
}

export default new DatosGlobales();
