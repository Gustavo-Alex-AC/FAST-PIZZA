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
      onClick={() => dispatch(deleteItemFromServer({ pizzaId, userId }))}
    >
      Eliminar
    </Button>
  );
}

DeleteItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
};

export default DeleteItem;
