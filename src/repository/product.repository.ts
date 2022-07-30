import { Constants } from './../common';
import { Cart, Product } from './../model';
import { AppLogger } from '../utils';
const axios = require('axios');

export class ProductRepository {

    public async getAllProducts(): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            axios.get(Constants.JSON_SERVER_URL_PRODUCTS).then(response => {
                resolve(response);
            }).catch(error => {
                AppLogger.error(error);
                reject(error);
            });
        });
    }

    public async getProductByCode(code: string): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            axios.get(`${Constants.JSON_SERVER_URL_PRODUCTS}?code=${code}`).then(response => {
                resolve(response.data[0] as Product);
            }).catch(error => {
                AppLogger.error(error);
                reject(error);
            });
        });
    }

    public async updateCurrentCart(currentCartState: Cart): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            axios.put(Constants.JSON_SERVER_URL_CART, currentCartState).then(response => {
                resolve(response.data);
            }).catch(error => {
                AppLogger.error(error);
                reject(error);
            });
        });
    }

    public async getCurrentCart(cartId: number = 1): Promise<Cart> {
        return new Promise(async (resolve, reject) => {
            axios.get(`${Constants.JSON_SERVER_URL_CART}?id=${cartId}`).then(response => {
                resolve(response.data);
            }).catch(error => {
                AppLogger.error(error);
                reject(error);
            });
        });
    }

}
