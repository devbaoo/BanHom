import db from '../models/index';


const createCategory = async (data) => {
  try {
    if (!data.name) {
      return {
        errCode: 1,
        errMessage: "Missing required field: name",
      };
    }

    const newCategory = await db.Category.create({
      name: data.name,
      parentId: data.parentId || null, // Nếu không truyền parentId, để null
    });

    return {
      errCode: 0,
      errMessage: "Create category successfully",
      category: newCategory,
    };
  } catch (e) {
    throw e;
  }
};


const updateCategory = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        errMessage: "Missing category id",
      };
    }

    const category = await db.Category.findByPk(data.id);
    if (!category) {
      return {
        errCode: 1,
        errMessage: "Category not found",
      };
    }

    const updated = await db.Category.update(
      {
        name: data.name || category.name,
        parentId: data.parentId !== undefined ? data.parentId : category.parentId,
      },
      {
        where: { id: data.id },
      }
    );

    if (updated[0] === 0) {
      return {
        errCode: 1,
        errMessage: "Update failed",
      };
    }

    return {
      errCode: 0,
      errMessage: "Update category successfully",
    };
  } catch (e) {
    throw e;
  }
};


const getAllCategories = async () => {
  try {
    const categories = await db.Category.findAll();
    return categories;
  } catch (e) {
    throw e;
  }
};


const deleteCategory = async (categoryId) => {
  try {
    const result = await db.Category.destroy({
      where: { id: categoryId },
    });

    if (!result) {
      return {
        errCode: 1,
        errMessage: "Category not found",
      };
    }

    return {
      errCode: 0,
      errMessage: "Delete category successfully",
    };
  } catch (e) {
    throw e;
  }
};
let  getCategoryTree = async () => {
  // Lấy tất cả các danh mục với các trường cần thiết
  const categories = await db.Category.findAll({
    attributes: ['id', 'name', 'parentId']
  });

  // Tạo map để xây dựng cây
  let categoryMap = {};
  categories.forEach(category => {
    // Khởi tạo đối tượng với các thuộc tính rõ ràng
    categoryMap[category.id] = { 
      id: category.id, 
      name: category.name, 
      parentId: category.parentId, 
      subcategories: [] 
    };
  });

  // Xây dựng cây phân cấp
  let tree = [];
  categories.forEach(category => {
    if (category.parentId) {
      // Nếu có parentId, thêm vào danh mục cha
      if (categoryMap[category.parentId]) {
        categoryMap[category.parentId].subcategories.push(categoryMap[category.id]);
      }
    } else {
      // Nếu không có parentId -> danh mục gốc
      tree.push(categoryMap[category.id]);
    }
  });

  return tree;
};


module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
  getCategoryTree
};
