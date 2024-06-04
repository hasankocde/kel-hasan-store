"use strict";

const { Category, Subcategory } = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    const categories = await Category.find().populate('subcategories');
    res.status(200).send({
      error: false,
      data: categories
    });
  },

  create: async (req, res) => {
    const { categoryName, subcategories } = req.body;
    const existingCategory = await Category.findOne({ categoryName });

    // Kategori adının boş olup olmadığını kontrol edin
    if (!categoryName || categoryName.trim() === '') {
      return res.status(400).send({
        error: true,
        message: "Category name is required"
      });
    }

    if (subcategories && subcategories.some(subcategory => !subcategory.name)) {
      return res.status(400).send({
        error: true,
        message: "Each subcategory must have a name"
      });
    }

    if (existingCategory) {
      return res.status(400).send({
        error: true,
        message: "Category with this name already exists"
      });
    }

    const newCategory = new Category({ categoryName });
    await newCategory.save();

    const subcategoryIds = [];
    for (const subcategory of subcategories) {
      const newSubcategory = new Subcategory({ name: subcategory.name, parentCategory: newCategory._id });
      await newSubcategory.save();
      subcategoryIds.push(newSubcategory._id);
    }

    newCategory.subcategories = subcategoryIds;
    await newCategory.save();

    res.status(201).send({
      error: false,
      data: newCategory
    });
  },

  read: async (req, res) => {
    const category = await Category.findById(req.params.id).populate('subcategories');
    if (!category) {
      return res.status(404).send({
        error: true,
        message: "Category not found"
      });
    }
    res.status(200).send({
      error: false,
      data: category
    });
  },
  

//   burada, populate('subcategories') ifadesi ile, Category modelindeki subcategories alanını dolduruyoruz. Böylece, kategori detaylarını getirirken, alt kategorilerin de bilgileri yer alacaktır.

// Daha sonra, istemci tarafında (örneğin, React uygulamanızda) aşağıdaki gibi kullanabilirsiniz:

// javascript

// const fetchCategoryDetails = async (categoryId) => {
//   const response = await fetch(`/categories/${categoryId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   const category = await response.json();
//   console.log(category);
// };

// // Örnek kullanım
// fetchCategoryDetails('6457a8b9a3e5c3c1c1c1c1c1');
// Bu sayede, kategori detaylarını ve alt kategorilerin bilgilerini kolaylıkla alabilirsiniz.

  update: async (req, res) => {
    const { categoryName, subcategories } = req.body;

    // Kontrol edelim
    if (!categoryName) {
      return res.status(400).send({
        error: true,
        message: "Category name is required"
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { categoryName, subcategories: [] },
      { new: true }
    );

    const subcategoryIds = [];
    for (const subcategory of subcategories) {
      const newSubcategory = new Subcategory({ name: subcategory.name, parentCategory: updatedCategory._id });
      await newSubcategory.save();
      subcategoryIds.push(newSubcategory._id);
    }

    updatedCategory.subcategories = subcategoryIds;
    await updatedCategory.save();

    res.status(200).send({
      error: false,
      data: updatedCategory
    });
  },


  delete: async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).send({
        error: true,
        message: "Category not found"
      });
    }
    res.status(204).send(); // No content to send back
  },

  enhancedSearch: async (req, res) => {
    const { searchText } = req.query;
    
    const categories = await Category.find({
      $or: [
        { categoryName: new RegExp(searchText, 'i') },
        { subcategories: { $elemMatch: { name: new RegExp(searchText, 'i') } } }
      ]
    }).populate('subcategories');

    const subcategories = await Subcategory.find({
      name: new RegExp(searchText, 'i')
    }).populate('parentCategory');

    res.status(200).send({ categories, subcategories });
  }
};