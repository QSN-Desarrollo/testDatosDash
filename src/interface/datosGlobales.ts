export interface TweetGlobales {
    link: string;
    seriesName: string;
    seriesId: string;
    subSeriesName: string[];
    id: string;
    fecha: string;
    date: string;
    hora: number;
    diaSemana: string;
    usuarioCategorizador: string[];
    usuarioOriginal: string;
    name: string;
    texto: string;
    menciones: string[];
    hashTags: string[];
    profileImage: string;
    sentimiento: string;
    valor_sentimiento: string;
    Sentimientos: string[]; // Puedes ajustar este tipo según la estructura real
    "Atributos de Personalidad": string[]; // Puedes ajustar este tipo según la estructura real
    "Atributos de Politicos": string[]; // Puedes ajustar este tipo según la estructura real
    "Red motivacional del voto": string[]; // Puedes ajustar este tipo según la estructura real
    Preocupaciones:string[]; // Puedes ajustar este tipo según la estructura real
    "Emociones Básicas (Plutchik)": string[]; // Puedes ajustar este tipo según la estructura real
    "Preocupaciones - Ven": string[]; // Puedes ajustar este tipo según la estructura real
    "Continuidad y cambio":string[]; // Puedes ajustar este tipo según la estructura real
    "Voto Emocional y Racional": string[]; // Puedes ajustar este tipo según la estructura real
    enlace: string[]; // Puedes ajustar este tipo según la estructura real
    comentarios: number;
    retweets: number;
    citas: number;
    likes: number;
    vistas: number;
    usuarioCategorizador_Comments: string[];
    imagen_tweet: string[];
    link_tweet_citado: string;
    id_tweet_citado: string;
    fecha_tweet_citado: string;
    texto_tweet_citado: string;
    imagen_tweet_citado: string[];
    usuarioOriginal_tweet_citado: string;
    name_author_tweet_citado: string;
    es_cita: boolean;
    valor_POS: number;
    ESTADO: string;
    lat: string;
    lng: string;
  }
  
 export interface ObjetoDB {
    Atributos_de_Personalidad: string[];
    Atributos_de_Politicos: string[];
    Red_motivacional_del_voto: string[];
    'Emociones Básicas(Plutchik)': string[];
    _id: string;
    date: string;
    fecha: string;
    profileImage: string;
    usuarioOriginal: string;
    name_author: string;
    texto: string;
    inicio_de_texto: string;
    enlace: string[];
    usuarioCategorizador_Comments: string[];
    imagen_tweet: string[];
    usuarioCategorizador_Quotes: string;
    link_tweet_citado: string;
    id_tweet_citado: string;
    fecha_tweet_citado: string;
    texto_tweet_citado: string;
    imagen_tweet_citado: string;
    usuarioOriginal_tweet_citado: string;
    name_author_tweet_citado: string;
    followers_count: number;
    location: string;
    serie_name: string;
    serie_busqueda: string;
    titulo: string;
    usuarioCategorizador: string[];
    link: string;
    ID: string;
    comentarios: number;
    retweets: number;
    likes: number;
    citas: number;
    vistas: number;
    es_cita: string;
    'thread-line': string;
    url_serie: string;
    hashTags: string[];
    menciones: string[];
    fecha_actualizacion: string;
    texto_limpio: string;
    sentiment: string;
    sentimiento: string;
    valor_sentimiento: string;
    valor_POS: number;
    Sentimientos: string[];
    'Atributos de Personalidad': string[];
    'Atributos de Politicos': string[];
    'Red motivacional del voto': string[];
    Preocupaciones: string[];
    'Emociones Básicas (Plutchik)': string[];
    'Preocupaciones - Ven': string[];
    'Continuidad y cambio': string[];
    'Voto Emocional y Racional': string[];
    subserie_name: string[];
    ESTADO: string;
    lat: string;
    lng: string;
    idCliente: number;
  }
