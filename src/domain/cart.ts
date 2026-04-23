export interface CartItem{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Cart{
    cartId: string;
    items: CartItem[];
    expiresAt: number;
}

export function calculateTotal(items: CartItem[]): number{
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}