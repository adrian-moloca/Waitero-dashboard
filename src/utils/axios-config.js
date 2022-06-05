import axios from 'axios'
import store from '../redux/store'
import { adminUrl } from './costants/constants'

export const awaxios = axios.create({
    baseURL: adminUrl,
    headers: {
        Authorization: `Bearer ${store.getState().userReducer?.admin?.token}`
    }
})