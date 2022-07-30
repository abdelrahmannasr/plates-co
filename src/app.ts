import { ENV, Constants } from './common';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Router } from 'express';
import helmet from 'helmet';
import * as  httpContext from 'express-http-context';
import { ProductRepository } from './repository';
import { ProductController } from './controller';
import { ProductRoute } from './route/product.route';

const session = require('express-session');
export class App {
  private router!: Router;

  constructor(private application: Application) {
    this.setupConfigurations();
    this.initializeMiddleware();
  }

  public start(): Promise<App> {
    return new Promise(async (resolve, reject) => {
      try {
        this.initializeRoutesWithServices();
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }


  private setupConfigurations() {
    // Setup Router
    this.router = express.Router();

    if (ENV.API_VERSION) {
      this.application.use(`/${ENV.API_VERSION}/api`, this.router);
    } else {
      this.application.use('/api', this.router);
    }
  }

  private initializeRoutesWithServices() {
    // Repositories
    const productRepository = new ProductRepository();

    // Controllers
    const productController = new ProductController(productRepository);

    // Routes
    new ProductRoute(this.router, productController)
  }

  private initializeMiddleware() {
    this.router.use(helmet());
    this.router.use(cors());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(bodyParser.json());
    this.router.use(httpContext.middleware);
    this.router.use(
      session({
        secret: Constants.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
      })
    );
    this.router.use((req, _res, next) => {
      httpContext.set(Constants.CURRENT_SESSION, req['sessionID'])
      next();
    });
  }
}
