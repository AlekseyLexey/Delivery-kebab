import { useContext, useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import Product from "../../components/product/Product";
import type { IProductType } from "../../components/product/type";
import Button from "../../components/ui/buttons/button/Button";
import { UserContext } from "../../app/UserContex";
import { userService } from "../../services/api/userService";

function Buscket() {
  const [busket, setBasket] = useState([]);
  const contex = useContext(UserContext);

  useEffect(() => {
    getProductsInBusket();
  }, []);

  if (!contex) {
    return;
  }

  const { setUser } = contex;

  async function getProductsInBusket(): Promise<void> {
    const response = await $api.get("/busket");
    if (response.status === 200) {
      setBasket(response.data);
    }
  }

  async function removeProduct(idOfProduct: number): Promise<void> {
    const response = await $api.delete(`/busket/${idOfProduct}`);

    if (response.status === 204) {
      getProductsInBusket();
    } else {
      alert("Не удалось удалить :с");
    }
  }

  async function removeAllProducts(): Promise<void> {
    const response = await $api.delete(`/busket`);

    if (response.status === 204) {
      await getProductsInBusket();
    } else {
      alert("Не удалось удалить :с");
    }
  }

  async function buyAllBusket() {
    const productsIds = busket.map((p: IProductType) => p.id);
    const response = await $api.post("/orders", productsIds);

    if (response.status === 201) {
      getProductsInBusket();
      const updatedUser = await userService.update({ wallet: totalPrice });
      setUser(updatedUser);
    } else {
      alert("Не удалось оформить заказ :с");
    }
  }

  const totalPrice = busket.reduce((sum: number, product: IProductType) => {
    return sum + (Number(product.endPrice) || 0);
  }, 0);

  return (
    <>
      <div>Buscket</div>
      <div>
        {busket.map((p: IProductType) => {
          return (
            <li key={p.id}>
              <h1>Продукт</h1>
              <Product product={p} />
              <Button
                buttonText="Удалить"
                onClick={() => removeProduct(p.id)}
              />
            </li>
          );
        })}
      </div>
      <div>Общая сумма: {totalPrice} руб.</div>
      <Button buttonText="Очистить корзину" onClick={removeAllProducts} />
      <Button buttonText="Оформить заказ" onClick={buyAllBusket} />
    </>
  );
}

export default Buscket;
