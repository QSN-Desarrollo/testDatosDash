export interface FiltrosSchema {
  idCliente?: number|null;
  categoria?: (string | null)[] | null;
  fechaFin?: string | null;
  fechaInicio?: string | null;
  horaFin?: string | null;
  horaInicio?: string | null;
  modelo?: (string | null)[] | null;
  polaridad?: (string | null)[] | null;
  serie?: (string | null)[] | null;
  subserie?: (string | null)[] | null;
  filas?: FilaInterface[] | null;
  [key: string]: any;
}

export interface FilaInterface  {
  dato: string;
  valor: boolean;
  anidados:boolean;
}

interface PalabraFrecuente {
  palabra: string;
  frecuencia: number;
}

interface BigramaFrecuente {
  bigrama: string;
  frecuencia: number;
}

interface TrigramaFrecuente {
  trigrama: string;
  frecuencia: number;
}

export interface FiltrosSchemaNubes {
  diezPalabrasMasFrecuentes: PalabraFrecuente[];
  diezBigramasMasFrecuentes: BigramaFrecuente[];
  diezTrigramasMasFrecuentes: TrigramaFrecuente[];
}

export interface Consulta{
  comas:string[];
  // Mencion:string[];
  Usuario:string[];
  Hashtag:string[];
}