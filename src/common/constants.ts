export class Constants {

    public static DOT_ENV = require('dotenv').config();

    // Server Configurations
    public static PORT = process.env.PORT ? process.env.PORT : '3000';
    public static JSON_SERVER_PORT = process.env.JSON_SERVER_PORT ? process.env.JSON_SERVER_PORT : '3200';
    public static SESSION_SECRET_KEY = 'asdmkasldmsalkdmasldkmsaldk';
    public static CURRENT_SESSION = 'sessionId';

    // JSON Server URLs
    public static JSON_SERVER_URL = `http://localhost:${Constants.JSON_SERVER_PORT}`;
    public static JSON_SERVER_URL_PRODUCTS = `${Constants.JSON_SERVER_URL}/products`;
    public static JSON_SERVER_URL_CART = `${Constants.JSON_SERVER_URL}/cart`;

    // End Points URLs
    public static ADD_PRODUCT_URL = `/add-product`;
    public static RESET_CART_URL = `/reset-cart`;

    // Deals Products
    public static DEAL_PRODUCT_CODE = 'R01';
}
