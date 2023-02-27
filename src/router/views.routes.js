import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import dirName from '../utils.js';

const router = Router();
const Manager = new ProductManager()

router.get('/', async (req, res) => {
    const list = await Manager.getProducts()
    res.render('home', {products: list})
});

router.get('/realtimeproducts', (req, res) => {res.render('realtimeproducts', {})});

export default router;