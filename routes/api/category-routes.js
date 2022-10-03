const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      // JOIN with product, using the Product table
      // Does the same thing as include: [{model: Product}]
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  // Succinct
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.json("Update successful");
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json("Successfully deleted category!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
