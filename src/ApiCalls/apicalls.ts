import Axios from 'axios';

export default function request(url: string, options: any) {
    options = options || {};
    options.headers = options.headers || {};
    return Axios(url, options)
  }