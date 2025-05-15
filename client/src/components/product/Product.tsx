import React from 'react';
import type { IProductType } from './type';

interface ProductProps {
    product: IProductType,
    handleClick: (id:number) => void
}

function Product( { product, handleClick }: ProductProps): React.JSX.Element {


    return (
        <section>
            <h1>Доступное меню</h1>
                <div>
                    <div>Название: {product.name}</div>
                    <div>Картинка: {product.imgURL} </div>
                    <div>Исходная цена: {product.price} </div>
                    <div>Скидка: {product.discount} </div>
                    <div>Цена со скидкой: {product.endPrice} </div>
                    <button onClick={() => handleClick(product.id)}></button>
                </div>
        </section>
    )       

}

export default Product;




// const product = 
//     {
//         "id": 16,
//         "name": "Гамбургер",
//         "imgURL": null,
//         "price": 450,
//         "discount": 15,
//         "courier_id": 5,
//         "createdAt": "2025-05-14T17:56:24.073Z",
//         "endPrice": "383"
//     }


// const Data = [
//     {
//         "id": 16,
//         "name": "Гамбургер",
//         "imgURL": null,
//         "price": 450,
//         "discount": 15,
//         "courier_id": 5,
//         "createdAt": "2025-05-14T17:56:24.073Z",
//         "endPrice": "383"
//     },
//     {
//         "id": 10,
//         "name": "Лазанья",
//         "imgURL": null,
//         "price": 650,
//         "discount": 15,
//         "courier_id": 5,
//         "createdAt": "2025-05-14T17:56:24.073Z",
//         "endPrice": "553"
//     },
// ]