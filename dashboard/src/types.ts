export class FormModel {
  host: string;
  port: number;
  path: string;
  username: string;
  password: string;
  constructor(
    host?: string,
    port?: number,
    path?: string,
    username?: string,
    password?: string
  ) {
    this.host = host ? host : "";
    this.port = port ? port : 0;
    this.path = path ? path : "";
    this.username = username ? username : "";
    this.password = password ? password : "";
  }
}

export interface EspData {
  temperature: number;
  humidity: number;
}
