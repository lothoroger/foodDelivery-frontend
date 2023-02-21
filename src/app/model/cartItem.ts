import { Cuisines } from "./cuisines";

export class CartItem {
    constructor(public food: Cuisines) { }
    quantity: number = 1;
    price: number = this.food.price;
    image: string = this.food.image;
}