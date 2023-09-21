import { MongoClient, Db } from 'mongodb';
import { config } from './config';

class MongoDBPool {
  private static instance: MongoDBPool;
  private pool: MongoClient;
  private connectedDbName: string | null = null; 

  private constructor() {
    this.pool = new MongoClient(config.DB.url);
    }

  public static getInstance(): MongoDBPool {
    if (!this.instance) {
      this.instance = new MongoDBPool();
    }
    return this.instance;
  }

  public async connectToDb(dbName: string): Promise<Db> {
    if (!(this.pool)) {
    }
    await this.pool.connect();
    this.connectedDbName = dbName; 
    return this.pool.db(dbName);
  }

  public async closePool(): Promise<void> {
    await this.pool.close();
    this.connectedDbName = null; 
  }

  public getConnectedDbName(): string | null {
    return this.connectedDbName;
  }
}

export const mongodbPool = MongoDBPool.getInstance();
