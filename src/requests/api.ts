import {post} from './http'
import * as urls from './urls'

export const apiSingerLogin = (data: object) => post(urls.singerUrl.singerLogin, data);
export const apiUserLogin = (data: object) => post('users/login', data);
