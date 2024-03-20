export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

//heredar
export type CartItem = Guitar & {
    quantity: number;
}
// export interface CartItem extends Guitar {
//     quantity: number;
// }

//pick permite elegir elementos de otro type
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
//     quantity: number;
// }