
// import {   } from '@types/redis';
import { promisify } from 'util';
import { RedisClientType, createClient } from 'redis';

class RedisModule {
  private client: RedisClientType | undefined;

   constructor() {
 this.connectToRedis();
    }

  async connectToRedis() {
    try{
      this.client = createClient({
        url: "redis://localhost:6379"
      });
      await this.client.connect();
      this.client.on('error', (error:any) => console.error('redis error',error));
      this.client.on('connect', () => console.log('Redis connected'))
    }catch(err){
      console.log("Dat Error",err);
      console.log("RedisModule" , this.client);
      
    }
  }
    

  async getAsync(key: string) {
    if(!this.client) return null;
    try{
      const asyncGet = await this.client.get(key);
      return asyncGet;
    }catch (err){
      console.log("getAsync Error",err); 
      return null;
    }
  }

  async setAsync(key: string, value: any, expiration?: number): Promise<boolean> {
    if(!this.client) return false;
    const asyncSet = await this.client.set(key, value);
    return true;
  }

  async clearAsync(){
    if(!this.client) return false;
    await this.client.flushAll();
    return true;
  }
}

export default new RedisModule();