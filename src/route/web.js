
import express from 'express';
import homeController from "../controllers/homeControllers";
import userController from '../controllers/userController';
let router = express.Router();

let initWebRoutes = (app) => {
    //cac route cua trang web su dung cac ham trong controller
    router.get('/', homeController.getHomePage);

    router.get('/crud', homeController.getCRUD); // create user

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD); // get all user
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);

    return app.use("/", router)
}

module.exports = initWebRoutes;