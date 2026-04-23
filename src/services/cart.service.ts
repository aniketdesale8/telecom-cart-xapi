import sessionStore from "../store/session.store";
import { SalesforceCartClient, CartExpiredError } from "../clients/salesforce.client";
import { CartItem, calculateTotal, Cart } from "../domain/cart";

const client = new SalesforceCartClient();

class CartService{

    private toResponse(cart: Cart) {
        return {
            cartId: cart.cartId,
            items: cart.items,
            total: calculateTotal(cart.items)
        };
    }

    private getOrCreateCart(sessionId: string): Cart {
        let cartId = sessionStore.get(sessionId);

        try{
            if(cartId) return client.getCart(cartId);
        } catch (e) {
            if (!(e instanceof CartExpiredError)) throw e;
        }

        const newCart = client.createCart();
        sessionStore.set(sessionId, newCart.cartId);
        return newCart
    }

    getCart(sessionId: string) {
        return this.toResponse(this.getOrCreateCart(sessionId));
    }

    addItem(sessionId: string, item: CartItem){
        let cart = this.getOrCreateCart(sessionId);

        try {
            cart = client.addItem(cart.cartId, item);
        } catch (e){
            if (e instanceof CartExpiredError) {
                const newCart = client.createCart();
                sessionStore.set(sessionId, newCart.cartId);

                cart = client.addItem(newCart.cartId, item);
            } else throw e;
        }

        return this.toResponse(cart);
    }

    removeItem(sessionId: string, itemId: string) {
        let cart = this.getOrCreateCart(sessionId);

        try {
            cart = client.removeItem(cart.cartId, itemId);
        } catch (e) {
            if (e instanceof CartExpiredError){
                const newCart = client.createCart();
                sessionStore.set(sessionId, newCart.cartId);
                cart = newCart;
            } else throw e;
        }

        return this.toResponse(cart);
    }
}

export default new CartService();