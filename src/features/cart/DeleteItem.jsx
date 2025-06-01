import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
//import { deleteItem } from "./CartSlice";
import { deleteItemFromServer } from "./CartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button
      type="small"
      onClick={() => dispatch(deleteItemFromServer(pizzaId))}
    >
      Eliminar
    </Button>
  );
}

DeleteItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
};

export default DeleteItem;
