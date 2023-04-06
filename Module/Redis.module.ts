import redis from 'redis';
import { promisify } from 'util';

class RedisModule {
  private client;

  constructor() {
    this.client = redis.createClient({
      url: "redis://localhost:6379"
    });
    this.client.on('error', (error:any) => console.error(error));
  }

  async getAsync(key: string): Promise<string | null> {
    const asyncGet = promisify(this.client.get).bind(this.client);
    return asyncGet(key);
  }

  async setAsync(key: string, value: any, expiration?: number): Promise<boolean> {
    const asyncSet = promisify(this.client.set).bind(this.client);
    let result = await asyncSet(key, value);
    if (expiration) {
      result = await this.client.expire(key, expiration);
    }
    return result === 1;
  }
}

export default new RedisModule();