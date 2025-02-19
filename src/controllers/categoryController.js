import categoryService from '../services/categoryService';


let getAllCategories = async (req, res) => {
    try {
        let categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            errCode: 500,
            message: 'Internal Server Error'
        });
    }
}

let createCategory = async (req, res) => {
    try {
        let data = await categoryService.createCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            errCode: 500,
            message: 'Internal Server Error'
        });
    }
}

let updateCategory = async (req, res) => {
    try {
        let data = await categoryService.updateCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            errCode: 500,
            message: 'Internal Server Error'
        });
    }
}
let deleteCategory = async (req, res) => {
    try {
        let data = await categoryService.deleteCategory(req.params.categoryId);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            errCode: 500,
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    getAllCategories: getAllCategories,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}