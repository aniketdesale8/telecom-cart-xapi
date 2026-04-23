import { Cart, CartItem } from "../domain/cart";

export class CartExpiredError extends Error {}

export class SalesforceCartClient{
    private carts = new Map<string, Cart>();
    private TTL = 60000;

    createCart(): Cart {
        const cartId = Math.random().toString(36).substring(2);

        const cart: Cart = {
            cartId,
            items: [],
            expiresAt: Date.now() + this.TTL
        };

        this.carts.set(cartId, cart);
        return cart;
    }

    private getValidCart(cartId: string): Cart{
        const cart = this.carts.get(cartId);
        if (!cart) throw new Error("Cart not found");

        if (Date.now() > cart.expiresAt){
            throw new CartExpiredError("Cart expired");
        }

        return cart;
    }

    getCart(cartId: string): Cart{
        return this.getValidCart(cartId);
    }

    addItem(cartId: string, item: CartItem): Cart {
        const cart = this.getValidCart(cartId);

        const existing = cart.items.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += item.quantity;
        }else {
            cart.items.push(item);
        }

        return cart;
    }

    removeItem(cartId: string, itemId: string): Cart {
        const cart = this.getValidCart(cartId);
        cart.items = cart.items.filter(i => i.id !== itemId);
        return cart;
    } 
}