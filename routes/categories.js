//IMPORT
const express = require("express"); // para levantar el servidor
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();


//ROUTES
router.post("/", CategoryController.insert);
router.put("/id/:id", CategoryController.update);
router.delete("/id/:id", CategoryController.delete);
router.get("/id/:id", CategoryController.getByID);
router.get("/name/:name", CategoryController.getOneByName);
router.get("/all", CategoryController.getAll)



//EXPORTS
module.exports = router;