import mongoose, { Schema } from 'mongoose';
import { TweetDocument } from 'src/interface/tweetsInterface';

const statsSchema = new Schema({
  comment: Schema.Types.Mixed,
  retweets: Number,
  quote: Schema.Types.Mixed,
  heart: Number,
  play: Schema.Types.Mixed,
}, { _id: false });

const tweetSchema = new Schema<any>({
    idCliente: Number,
    link: { type: String, required: true, unique: true },
    ID: { type: String, required: true },
    texto: { type: String, required: true },
    inicio_de_texto: String,
    date: { type: String, required: true },
    fecha: { type: String, required: true },
    profileImage: { type: String, required: true },
    usuarioOriginal: { type: String, required: true },
    name_author: { type: String, required: true },
    stats: statsSchema,
    comentarios: Schema.Types.Mixed,
    retweets: Number,
    citas: Schema.Types.Mixed,
    likes: Number,
    vistas: Number,
    usuarioCategorizador_Comments: [Schema.Types.Mixed],
    imagen_tweet: [String],
    usuarioCategorizador_Quotes: String,
    link_tweet_citado: Schema.Types.Mixed,
    id_tweet_citado: Schema.Types.Mixed,
    thread_line: String, // Cambio en el nombre del campo
    es_cita: String, // Cambio en el nombre del campo
    usuarioCategorizador_Retweets: String,
    retweet_user: String,
    imagen_tweet_citado: Schema.Types.Mixed,
    usuarioOriginal_tweet_citado: Schema.Types.Mixed,
    name_author_tweet_citado: Schema.Types.Mixed,
    texto_tweet_citado: Schema.Types.Mixed,
    fecha_tweet_citado: Schema.Types.Mixed,
    serie_busqueda: String,
    serie_name: String,
    titulo: String,
    hashTags: [String],
    menciones: [String],
    fecha_actualizacion: String,
    usuarioCategorizador: [Schema.Types.Mixed],
    texto_limpio: String,
    url_serie: String,
    sentiment: String,
    sentimiento: String,
    valor_sentimiento: String,
    valor_POS: Number,
    Sentimientos: [Schema.Types.Mixed],
    Atributos_de_Personalidad: [Schema.Types.Mixed], // Cambio en el nombre del campo
    Atributos_de_Politicos: [Schema.Types.Mixed], // Cambio en el nombre del campo
    Red_motivacional_del_voto: [Schema.Types.Mixed], // Cambio en el nombre del campo
    Preocupaciones: [Schema.Types.Mixed],
    "Emociones Básicas(Plutchik)": [Schema.Types.Mixed], // Cambio en el nombre del campo
    "Preocupaciones - Ven": [Schema.Types.Mixed], // Cambio en el nombre del campo
    "Continuidad y cambio": [Schema.Types.Mixed], // Cambio en el nombre del campo
    "Voto Emocional y Racional": [Schema.Types.Mixed], // Cambio en el nombre del campo
    subserie_name: [Schema.Types.Mixed],
    Location: String,
    followers_count: Number,
  });
  
export const TweetModel = mongoose.model<TweetDocument>('tweets', tweetSchema);