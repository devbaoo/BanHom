import express from "express";
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import categoryController from '../controllers/categoryController';
import statisticController from '../controllers/statisticController';

import multer from "multer";



let router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let initWebRoutes = (app) => {

    // User API
    router.post("/api/register", userController.handleRegister);
    router.post('/api/login', userController.handleLoging);
    // router.get('/api/get-all-users', userController.handleGetAllUsers);

    // Product API
    router.post(
        "/api/create-product",
        upload.single("imageFile"),
        productController.createProduct
    );
    router.get("/api/get-all-products", productController.getAllProducts);
    router.get("/api/get-detail-product/:id", productController.getDetailProduct);
    router.delete("/api/delete-product/:id", productController.deleteProduct);
    router.put(
        "/api/update-product",
        upload.single("imageFile"),
        productController.updateProduct);

    // Category API
    router.post("/api/create-category", categoryController.createCategory);
    router.get("/api/get-all-categories", categoryController.getAllCategories);
    router.put("/api/update-category", categoryController.updateCategory);
    router.delete("/api/delete-category/:categoryId", categoryController.deleteCategory);

    // Statistic API
    router.get('/page-view-stats', statisticController.getPageViewStats);

    return app.use("/", router);
}

module.exports = initWebRoutes;