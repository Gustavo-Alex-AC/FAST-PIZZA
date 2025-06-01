import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentQuantityById, addItemToServer } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const {
    id,
    name,
    ingredients,
    soldOut,
    imageUrl,
    unitPrice,
    size, // <-- Tamanho da pizza
    category, // <-- Categoria da pizza
  } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: Number(unitPrice) * 1,
    };

    dispatch(addItemToServer(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />

      <div className="flex grow flex-col pt-0.5">
        <p className="text-lg font-medium">{name}</p>

        <p className="text-sm capitalize italic text-stone-500">
          Ingredientes: {ingredients.join(", ")}
        </p>

        {size && (
          <p className="text-sm capitalize text-stone-500">Tamanho: {size}</p>
        )}

        {category && (
          <p className="text-sm capitalize text-stone-500">
            Categoria: {category}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-semibold">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Esgotado
            </p>
          )}

          {isInCart ? (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          ) : (
            !soldOut && (
              <Button type="small" onClick={handleAddToCart}>
                Adicionar ao carrinho
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    size: PropTypes.string, // <-- Novo
    category: PropTypes.string, // <-- Novo
  }).isRequired,
};

export default MenuItem;
