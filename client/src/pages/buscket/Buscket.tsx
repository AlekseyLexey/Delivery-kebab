import { useContext, useEffect, useState } from "react";
import $api from "../../configs/axiosConfig";
import Product from "../../components/product/Product";
import type { IProductType } from "../../components/product/type";
import Button from "../../components/ui/buttons/button/Button";
import { UserContext } from "../../app/UserContex";
import { userService } from "../../services/api/userService";
import "./buscket.scss"

function Buscket() {

  const contex = useContext(UserContext);

  const [busket, setBasket] = useState<IProductType[]>([]);

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
    <div className="buscket-container">
      <div className="crt-overlay"></div>
      <h1 className="buscket-title">ВАША КОРЗИНА</h1>
      
      <div className="products-list">
        {busket.length === 0 ? (
          <p className="empty-message">КОРЗИНА ПУСТА</p>
        ) : (
          busket.map((p: IProductType) => (
            <div key={p.id} className="product-item">
              <Product product={p} />
              <Button
                buttonText="УДАЛИТЬ"
                onClick={() => removeProduct(p.id)}
                className="retro-button danger"
              />
            </div>
          ))
        )}
      </div>

      <div className="total-section">
        <h2>ОБЩАЯ СУММА: {totalPrice} ₽</h2>
        <div className="action-buttons">
          <Button 
            buttonText="ОЧИСТИТЬ КОРЗИНУ" 
            onClick={removeAllProducts} 
            className="retro-button danger"
          />
          <Button 
            buttonText="ОФОРМИТЬ ЗАКАЗ" 
            onClick={buyAllBusket} 
            className="retro-button success"
            disabled={busket.length === 0}
          />
        </div>
      </div>
    </div>
  );
}

export default Buscket;