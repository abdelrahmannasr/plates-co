import { Constants } from './../common';
import { AddProductRequest } from '../api/request';
import { BaseController } from './base.controller';
import { ProductRepository } from '../repository';
import { IResponse } from '../api/response';
import { ResponseCode } from '../enum';
import { Cart, Product } from '../model';

export class ProductController extends BaseController {

    constructor(private productRepository: ProductRepository) {
        super();
    }

    public async addProduct(request: AddProductRequest): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await this.productRepository.getProductByCode(request.code);
                if (!product)
                    return resolve(this.getErrorResponse('Product not found', ResponseCode.NOT_FOUND));
                const currentCart = await this.productRepository.getCurrentCart();
                if (!currentCart)
                    return resolve(this.getErrorResponse('Cart not found', ResponseCode.NOT_FOUND));
                currentCart.products.push(this.calculateProductsDeal(product, currentCart));
                currentCart.totalProductsPrice += +product.price;
                currentCart.deliveryRate = this.calculateDeliveryRate(currentCart.totalProductsPrice);
                currentCart.totalPrice = (currentCart.totalProductsPrice + currentCart.deliveryRate).toFixed(2) + '$';
                const updatedCart = await this.productRepository.updateCurrentCart(currentCart);
                resolve(this.getResponseBody(updatedCart, `Cart has been updated successfully`));
            } catch (error) {
                reject(error);
            }
        });
    }

    public async resetCart(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const currentCart = await this.productRepository.getCurrentCart();
                if (!currentCart)
                    return resolve(this.getErrorResponse('Cart not found', ResponseCode.NOT_FOUND));
                currentCart.products = [];
                currentCart.eligibleToDiscount = false;
                currentCart.totalProductsPrice = 0;
                currentCart.deliveryRate = 0;
                currentCart.totalPrice = '';
                const updatedCart = await this.productRepository.updateCurrentCart(currentCart);
                resolve(this.getResponseBody(updatedCart, `Cart has been reset successfully`));
            } catch (error) {
                reject(error);
            }
        });
    }

    private calculateProductsDeal(product: Product, cart: Cart): Product {
        if (product.code === Constants.DEAL_PRODUCT_CODE) {
            product.price = cart.eligibleToDiscount ? product.price * 0.5 : product.price;
            cart.eligibleToDiscount = !cart.eligibleToDiscount;
        }
        return product;
    }

    private calculateDeliveryRate(totalProductsPrice: number): number {
        if (totalProductsPrice < 50)
            return 4.95;
        else if (totalProductsPrice < 90)
            return 2.95;
        return 0;
    }
}

