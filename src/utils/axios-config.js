import axios from 'axios'
import store from '../redux/store'
import { adminUrl, clientsUrl } from './costants/constants'
export const awaxios = axios.create({
    baseURL: adminUrl,
    headers: {
        Authorization: `Bearer ${store.getState().adminReducer?.token}`
    }
})

export const cwaxios = axios.create({
    baseURL: clientsUrl,
    headers: {
        Authorization: `Bearer ${store.getState().clientReducer?.token}`
    }
})