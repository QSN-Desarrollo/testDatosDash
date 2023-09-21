import { Document } from 'mongoose';

interface Stats {
  comment: any;
  retweets: number;
  quote: any;
  heart: number;
  play: any;
}

export interface TweetDocument extends Document {
  idCliente: number;
  date: string;
  fecha: string;
  profileImage: string;
  usuarioOriginal: string;
  name_author: string;
  texto: string,
  sentiment: string;
  sentimiento: string;
  valor_sentimiento: string;
  valor_POS: number;
  likes: number;
  retweets: number;
  comentarios: number;
  vistas: number;
  red_motivacional_voto: string[];
  voto_emocional_racional: string[];
  link: string;
  url_serie: string;
  fecha_actualizacion: string;
}
export interface DbConfig {
  Facebook: string;
  Twitter: string;
  Instagram: string;
};
export interface Config  {
  dbConfig: DbConfig;
  jwtSecret: string;
  env: string;
  DB: {
    url: string;
    urlProduction:string;
    urlProductionFacebook: string;
    urlProductionTwitter: string;
    urlProductionInstagrams: string;
    options: {
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
      useCreateIndex: boolean;
      useFindAndModify: boolean;
    };
  };
  accessToken: string;
  refressToken: string;
}


