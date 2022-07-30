import { BaseRoute } from './base.route';
import { AddProductRequest } from '../api/request/add-product-request';
import { Constants } from '../common/constants';
import { ResponseCode } from '../enum';
import { AppLogger } from '../utils';
import { plainToClass } from 'class-transformer';
import { Request, Response, Router } from 'express';
import { ProductController } from '../controller';

export class ProductRoute extends BaseRoute {
    constructor(public router: Router, public productController: ProductController) {
        super();
        this.router.post(Constants.ADD_PRODUCT_URL, this.addProduct);
        this.router.put(Constants.RESET_CART_URL, this.resetCart);
    }

    private addProduct = async (request: Request, response: Response) => {
        try {
            AppLogger.info(`Add Product to Cart`);
            const addProductRequest = plainToClass(AddProductRequest, request.body);
            AppLogger.debug(addProductRequest.prettyLog());

            const validationError = await addProductRequest.validate();
            if (validationError) {
                response.status(ResponseCode.BAD_REQUEST).send(this.getErrorResponse(validationError, ResponseCode.BAD_REQUEST));
            }
            const returnResponse = await this.productController.addProduct(addProductRequest);
            response.status(returnResponse.code).send(returnResponse);
        } catch (error) {
            response.status(ResponseCode.INTERNAL_SERVER_ERROR).send(this.getErrorResponse(error));
        }
    };

    private resetCart = async (_request: Request, response: Response) => {
        try {
            AppLogger.info(`Reset Cart`);
            const returnResponse = await this.productController.resetCart();
            response.status(returnResponse.code).send(returnResponse);
        } catch (error) {
            response.status(ResponseCode.INTERNAL_SERVER_ERROR).send(this.getErrorResponse(error));
        }
    };

}
