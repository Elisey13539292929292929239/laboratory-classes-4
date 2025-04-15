const Product = require("../models/Product");
const { STATUS_CODE } = require("../constants/statusCode");

const getProductsView = (_req, res) => {
  const products = Product.getAll();
  res.render("products.ejs", { products });
};

const { MENU_LINKS } = require("../constants/navigation");

const getAddProductView = (_req, res) => {
  res.render("add-product.ejs", {
    headTitle: "Shop - Add Product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
};


const addNewProduct = (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send("Brakuje nazwy lub opisu");
  }

  const newProduct = new Product(name, description);
  Product.add(newProduct);
  res.redirect("/products/new");
};

const getNewProductView = (_req, res) => {
    const product = Product.getLast();
    res.render("new-product.ejs", {
      headTitle: "Shop - New Product",
      path: "/new",
      menuLinks: MENU_LINKS,
      activeLinkPath: "/products/new",
      newestProduct: product,
    });
  };
  

const getProductView = (req, res) => {
  const { name } = req.params;
  const product = Product.findByName(name);

  if (!product) {
    return res.status(404).send("Produkt nie znaleziony");
  }

  res.render("product.ejs", { product });
};

const deleteProduct = (req, res) => {
  const { name } = req.params;
  const wasDeleted = Product.deleteByName(name);

  if (!wasDeleted) {
    return res.status(404).send("Produkt nie istnieje");
  }

  res.status(STATUS_CODE.OK).json({ success: true });
};

module.exports = {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct,
};
