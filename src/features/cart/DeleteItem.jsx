import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
//import { deleteItem } from "./CartSlice";
import { deleteItemFromServer } from "./CartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  return (
    <Button
      type="small"
      onClick={() => {
        // Ação que remove o item do servidor
        dispatch(deleteItemFromServer({ pizzaId, userId }));

        // Evento de rastreamento no Google Analytics
        window.gtag &&
          window.gtag("event", "remove_do_carrinho", {
            event_category: "Carrinho",
            event_label: `Removido pizzaId ${pizzaId}`,
            value: 1,
          });
      }}
    >
      Eliminar
    </Button>

    // <Button
    //   type="small"
    //   onClick={() => dispatch(deleteItemFromServer({ pizzaId, userId }))}
    // >
    //   Eliminar
    // </Button>
  );
}

DeleteItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
};

export default DeleteItem;
