import { Router } from "express";
import cartService from "../services/cart.service";

const router = Router();

router.use((req, res, next) => {
    if (!req.headers["x-session-id"]) {
        return res.status(400).send("Missing session id");
    }
    next();
});

router.get("/cart", (req, res) => {
    const sessionId = req.headers["x-session-id"] as string;
    res.json(cartService.getCart(sessionId));
});

router.post("/cart/items", (req,res) => {
    const sessionId = req.headers["x-session-id"] as string;
    res.json(cartService.addItem(sessionId, req.body));
});

router.delete("/cart/items/:id", (req, res) =>{
    const sessionId = req.headers["x-session-id"] as string;
    res.json(cartService.removeItem(sessionId, req.params.id));
});

export default router;