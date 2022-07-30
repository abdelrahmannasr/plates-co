import { Product } from "./product.model";

export class Cart {
    constructor(
        public id: number,
        public products: Product[] = [],
        public eligibleToDiscount: boolean = false,
        public totalProductsPrice: number = 0,
        public deliveryRate: number = 0,
        public totalPrice: string = ''
    ) { }
}