import db from '../models/index';
import { uploadImage } from "./imageService";


let createProduct = async (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra các trường cần thiết
            if (!data.name || !data.price || !data.description || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required fields",
                });
                return;
            }

            // Nếu có file ảnh, tiến hành upload ảnh
            let imageUrl = null;
            if (file) {
                try {
                    imageUrl = await uploadImage(file); // Upload ảnh và lấy URL
                } catch (error) {
                    console.error("Lỗi upload ảnh:", error);
                    resolve({
                        errCode: 2,
                        errMessage: "Lỗi khi upload ảnh",
                    });
                    return;
                }
            }

            await db.Product.create({
                image_url: imageUrl,
                name: data.name,
                description: data.description,
                price: data.price,
                date: data.date,
                categoryId: data.categoryId,
            });

            resolve({
                errCode: 0,
                errMessage: "Create service successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};
let updateProduct = async (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing product id",
                });
                return;
            }

            let product = await db.Product.findByPk(data.id);
            if (!product) {
                resolve({
                    errCode: 1,
                    errMessage: "Product not found",
                });
                return;
            }

            let imageUrl = product.image_url; 
            if (file) {
                try {
                    imageUrl = await uploadImage(file);
                } catch (error) {
                    console.error("Lỗi upload ảnh:", error);
                    resolve({
                        errCode: 2,
                        errMessage: "Lỗi khi upload ảnh",
                    });
                    return;
                }
            }

            if (!data.name || !data.price || !data.description || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required fields",
                });
                return;
            }

            const updated = await db.Product.update(
                {
                    image_url: imageUrl,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    date: data.date,
                    categoryId: data.categoryId,
                },
                {
                    where: { id: data.id },
                }
            );

            if (updated[0] === 0) {
                resolve({
                    errCode: 1,
                    errMessage: "Update failed",
                });
                return;
            }

            resolve({
                errCode: 0,
                errMessage: "Update product successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};


let getAllProducts = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll();
            products = products.map((product) => {
                if (product.image_url) {
                    product.image_url = product.image_url.toString();
                }
                return product;
            });
            resolve(products);
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailProduct = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findByPk(productId);
            if (!product) {
                resolve({
                    errCode: 1,
                    errMessage: "Product not found",
                });
                return;
            }
            if (product.image_url) {
                product.image_url = product.image_url.toString();
            }
            resolve(product);
        } catch (e) {
            reject(e);
        }
    });
}
let deleteProduct = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Product.destroy({
                where: { id: productId },
            });

            if (!result) {
                resolve({
                    errCode: 1,
                    errMessage: "Product not found",
                });
                return;
            }

            resolve({
                errCode: 0,
                errMessage: "Delete product successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};




module.exports = {
    createProduct: createProduct,
    getAllProducts: getAllProducts,
    getDetailProduct: getDetailProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
};