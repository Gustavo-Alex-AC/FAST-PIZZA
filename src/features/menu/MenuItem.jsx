import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentQuantityById, addItemToServer } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

function MenuItem({ pizza }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const currentQuantity = useSelector(getCurrentQuantityById(pizza.id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: Number(pizza.unitPrice),
      userId,
    };

    if (isAuthenticated) {
      dispatch(addItemToServer(newItem));
    } else {
      navigate("/user");
    }
  }

  const timeRef = useRef(Date.now());

  useEffect(() => {
    return () => {
      const timeSpent = Math.round((Date.now() - timeRef.current) / 1000); // in seconds

      if (typeof window.gtag === "function" && timeSpent > 1) {
        window.gtag("event", "duracao_item_visualizar", {
          item_id: pizza.id,
          item_name: pizza.name,
          item_category: pizza.category || "Uncategorized",
          time_spent: timeSpent,
        });
      }
    };
  }, [pizza.id, pizza.name, pizza.category]);

  return (
    <li className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Imagem */}
      <div className="h-44 overflow-hidden rounded-xl">
        {/* <img
          src={pizza.imageUrl}
          alt={pizza.name}
          className={`h-full w-full object-cover transition duration-200 ${
            pizza.soldOut ? "opacity-50 grayscale" : ""
          }`}
        /> */}
        <img
          src={pizza.imageUrl}
          alt={pizza.name}
          onClick={() => {
            if (typeof window.gtag === "function") {
              window.gtag("event", "clique_image_pizza", {
                item_id: pizza.id,
                item_name: pizza.name,
                item_category: pizza.category || "Uncategorized",
              });
            }
          }}
          className={`h-full w-full object-cover transition duration-200 ${
            pizza.soldOut ? "opacity-50 grayscale" : ""
          }`}
        />
      </div>

      {/* Conteúdo */}
      <div className="mt-4 flex flex-col items-center gap-1 text-center">
        <h3 className="text-lg font-semibold text-orange-800">{pizza.name}</h3>
        <p className="text-xs text-stone-500">{pizza.ingredients.join(", ")}</p>
        {pizza.size && (
          <p className="text-xs text-stone-500">Tamanho: {pizza.size}</p>
        )}
        {pizza.category && (
          <p className="text-xs text-stone-500">Categoria: {pizza.category}</p>
        )}

        <div className="mt-2">
          {!pizza.soldOut ? (
            <span className="text-sm font-semibold text-green-700">
              {formatCurrency(pizza.unitPrice)}
            </span>
          ) : (
            <span className="text-sm font-medium uppercase text-red-500">
              Esgotado
            </span>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="mt-4 flex justify-center">
        {isInCart ? (
          <div className="flex items-center gap-2">
            <UpdateItemQuantity
              pizzaId={pizza.id}
              currentQuantity={currentQuantity}
            />
            <DeleteItem pizzaId={pizza.id} />
          </div>
        ) : (
          !pizza.soldOut && (
            <Button
              type="small"
              onClick={() => {
                if (typeof window.gtag === "function") {
                  window.gtag("event", "adicionar_ao_carrinho", {
                    item_id: pizza.id,
                    item_name: pizza.name,
                    price: pizza.unitPrice,
                    category: pizza.category || "undefined",
                    size: pizza.size || "undefined",
                    currency: "AOA", // Change if you use a different currency
                  });
                }

                handleAddToCart();
              }}
            >
              Adicionar
            </Button>
          )
        )}
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    size: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default MenuItem;

/* <Button type="small" onClick={handleAddToCart}>
              Adicionar
            </Button> */
