
import express from 'express';
import homeController from "../controllers/homeControllers"

let router = express.Router();

let initWebRoutes = (app) => {
    //cac route cua trang web su dung cac ham trong controller
    router.get('/', homeController.getHomePage);

    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);

    router.get('/get-crud', homeController.displayCRUD);

    return app.use("/", router)
}

module.exports = initWebRoutes;