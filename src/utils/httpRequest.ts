import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { IErrorResponse, EStatusErrorCode } from '../interfaces';

type BodyType = object | string | undefined;
type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpReqCfg extends AxiosRequestConfig {
  data?: BodyType;
  method: MethodType;
  headers?: {[key: string]: string | number}
}

export default function httpReq<OK = any>(url: string, config: HttpReqCfg): Promise<OK> {
  return new Promise<OK>((resolve, reject) => {
    axios(url, config)
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        const errResp: IErrorResponse = {
          status: err.response!.status || EStatusErrorCode.NOT_FOUND,
        };
        reject(errResp);
      });
  });
}
