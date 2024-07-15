import { Category } from '../../models/category/category.model.js';
import { asyncHandler } from '../../utilis/asyncHandler.js';
import { ApiError } from '../../utilis/ApiError.js'
import { ApiResponse } from '../../utilis/ApiResponse.js';

//! Create a new category
export const createCategory = asyncHandler(async (req, res) => {

    // taking category info
    const { name, description } = req.body;
    console.log(req.body);
    // chekcing all info provided by the admin
    if (!name || !description) {
        throw new ApiError(400, "Please Fill Full Form!");
    }
    // checking category existed or not
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        throw new ApiError(400, "Category with this name already exists");
    }
    console.log(req.body);
    // finally creating a new category
    const createdCategory = await Category.create({
        name,
        description,
    });

    return res.status(201).json(
        new ApiResponse(200, "Category created successfully", createdCategory)
    )
})

//! Get all categories
export const getAllCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find();
    res.status(200).json(
        new ApiResponse(200, "Categories List !!", categories)
    );
});

//! Get a single category by ID
export const getCategoryById = asyncHandler(async (req, res) => {

    // Take category id from URL
    const categoryId = req.params.id;

    // Find category by ID
    const category = await Category.findById(categoryId);

    // Category ID found or not
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    // Finally send the category data
    return res.status(201).json(
        new ApiResponse(200, "Category Found", category)
    )
});

// // Update a category by ID
// export const updateCategoryById = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const { name, description, imageURL } = req.body;

//         const category = await Category.findByIdAndUpdate(categoryId, { name, description, imageURL }, { new: true });

//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }

//         res.status(200).json({ message: "Category updated successfully", category });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a category by ID
// export const deleteCategoryById = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const deletedCategory = await Category.findByIdAndDelete(categoryId);

//         if (!deletedCategory) {
//             return res.status(404).json({ message: "Category not found" });
//         }

//         res.status(200).json({ message: "Category deleted successfully", category: deletedCategory });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
