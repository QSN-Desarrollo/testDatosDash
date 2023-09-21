import { FilaInterface, FiltrosSchema } from 'src/interface/filtroInterface';
import { TweetModel } from '../models/tweetsModels';
import { TweetDocument } from 'src/interface/tweetsInterface';
import PalabraParser from '../middleware/filasFilter';
class ConsultaMongo {
  private consulta: Record<string, any> = {};
  private mapeoCampos: Record<string, string> = {
    idCliente: 'idCliente',
    categoria: '',
    fechaInicio: 'fecha',
    fechaFin: 'fecha',
    horaInicio: 'fecha',
    horaFin: 'fecha',
    modelo: '',
    polaridad: 'sentimiento',
    serie: 'serie_name',
    subserie: 'subserie_name',
    filas: '',
  };
  constructor(private filtros: FiltrosSchema) {
    this.mapearCampo = this.mapearCampo.bind(this);
  }
  private mapearCampo(campo: string): string {
    return this.mapeoCampos[campo] || campo;
  }
  async cliente() {
    const clienteDB = this.mapearCampo('idCliente');
    if (this.filtros.idCliente) {
      this.consulta[clienteDB] = this.filtros.idCliente;
    }
  }
  // async manejarCategoria() {
  //   const categoriaDB = this.mapearCampo('categoria');
  //   if (this.filtros.categoria) {
  //     this.consulta[categoriaDB] = { "$in": this.filtros.categoria };
  //   }
  // }
  async manejarModelo() {
    const modeloDB = this.mapearCampo('modelo');
    
    if (this.filtros.modelo && Array.isArray(this.filtros.modelo)) {
      const modeloQuery: Record<string, any> = {}; 
      for (const modeloObj of this.filtros.modelo as any[]) { 
        if (typeof modeloObj === 'object' && modeloObj !== null && modeloObj !== undefined) {
          for (const campo in modeloObj) {
            if (Object.prototype.hasOwnProperty.call(modeloObj, campo)) {
              const condiciones = modeloObj[campo];
              // Verificar si las condiciones son un array
              if (Array.isArray(condiciones)) {
                modeloQuery[campo] = { $in: condiciones };
              }
            }
          }
        }
      }
      
      // Asignar modeloQuery al campo correspondiente en this.consulta
      // this.consulta[modeloDB] = modeloQuery;
      this.consulta = { ...this.consulta, ...modeloQuery };
    }
  }
  async manejarFecha() {
    const fechaInicioDB = this.mapearCampo('fechaInicio');
    const fechaFinDB = this.mapearCampo('fechaFin');

    if (this.filtros.fechaInicio || this.filtros.fechaFin || this.filtros.horaInicio || this.filtros.horaFin) {
      if (this.filtros.fechaInicio || this.filtros.horaInicio) {
        const startDateTime = new Date(`${this.filtros.fechaInicio} ${this.filtros.horaInicio}`);
        if (!isNaN(startDateTime.getTime())) {
          const formattedStartDate = startDateTime.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
          this.consulta[fechaInicioDB] = { ...this.consulta[fechaInicioDB], $gte: formattedStartDate };
        } else {
          console.error('Fecha y/u hora de inicio no válidas');
        }
      }
      if (this.filtros.fechaFin || this.filtros.horaFin) {
        const endDateTime = new Date(`${this.filtros.fechaFin} ${this.filtros.horaFin}`);
        if (!isNaN(endDateTime.getTime())) {
          const formattedEndDate = endDateTime.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
          this.consulta[fechaFinDB] = { ...this.consulta[fechaFinDB], $lte: formattedEndDate };
        } else {
          console.error('Fecha y/u hora de fin no válidas');
        }
      }
    }
  }
  async manejarSerie() {
    const serieDB = this.mapearCampo('serie');
    if (this.filtros.serie) {
      this.consulta[serieDB] = this.filtros.serie;
    }
  }
  async manejarSubserie() {
    const subserieDB = this.mapearCampo('subserie');
    if (this.filtros.subserie) {
      this.consulta[subserieDB] = this.filtros.subserie;
    }
  }
  async polaridad() {
    const polaridadDB = this.mapearCampo('polaridad');
    if (this.filtros.polaridad) {
      this.consulta[polaridadDB] = this.filtros.polaridad;
    }
  }
  async manejarUsuarioCategorizador(usuariosOrigi: string[]) {
    if (usuariosOrigi.length > 0) {
      this.consulta['usuarioCategorizador'] = { $in: usuariosOrigi };
    }
  }
  
  async filas() {
    const FilaDB = this.mapearCampo('Fila');
    if (this.filtros.Fila && Array.isArray(this.filtros.Fila)) {
      const filas: FilaInterface[] = this.filtros.Fila;
      const consultaFilaFinal: Record<string, any> = {};
  
      for (let index = 0; index < filas.length; index++) {
        const fila = filas[index];
  
        if (fila.anidados === true) {
          const UserConsulta = await PalabraParser.obtenerPalabrasConDobleArroba(fila.dato);
          await this.manejarUsuarioCategorizador(UserConsulta);
        }
        else{if (fila.dato) {
          const consultasFila = await PalabraParser.filtrarTextoPorPalabras(fila.dato);
  
          const condiciones: Record<string, any> = {
            false: {
              hashTags: consultasFila.Hashtag.length > 0 ? { $not: { $in: consultasFila.Hashtag } } : undefined,
              // menciones: consultasFila.Mencion.length > 0 ? { $not: { $in: consultasFila.Mencion } } : undefined,
              usuarioOriginal: consultasFila.Usuario.length > 0 ? { $not: { $in: consultasFila.Usuario } } : undefined,
              texto_limpio: consultasFila.comas.length > 0 ? { $not: { $regex: consultasFila.comas.join('|'), $options: 'i' } } : undefined,
            },
            true: {
              hashTags: consultasFila.Hashtag.length > 0 ? { $in: consultasFila.Hashtag } : undefined,
              // menciones: consultasFila.Mencion.length > 0 ? { $in: consultasFila.Mencion } : undefined,
              usuarioOriginal: consultasFila.Usuario.length > 0 ? { $in: consultasFila.Usuario } : undefined,
              texto_limpio: consultasFila.comas.length > 0 ? { $regex: consultasFila.comas.join('|'), $options: 'i' } : undefined,
            },
          };
  
          if (String(fila.valor) in condiciones) {
            const condicionFila = condiciones[String(fila.valor)];
            for (const campo in condicionFila) {
              if (condicionFila[campo] !== undefined) {
                consultaFilaFinal[campo] = condicionFila[campo];
              }
            }
          } else {
            console.log(`La fila ${index + 1} tiene un valor no válido`);
          }
        }}
      }
      this.consulta = { ...this.consulta, ...consultaFilaFinal };
    }
  }
  
  async obtenerResultados(): Promise<TweetDocument[]> {
    // const consultaConAnidados = { ...this.consulta };
    // delete consultaConAnidados.consultaFilaFinal;
    // console.log(consultaConAnidados);

    const documentosFiltrados = await TweetModel.find(this.consulta);
    return documentosFiltrados;
  }
  async obtenerResultadosSinAnidados(): Promise<TweetDocument[]> {
    const consultaSinAnidados = { ...this.consulta };
    delete consultaSinAnidados.Fila;
    console.log(consultaSinAnidados);

    const documentosFiltrados = await TweetModel.find(consultaSinAnidados);
    return documentosFiltrados;
  }
  
}

export default ConsultaMongo;
