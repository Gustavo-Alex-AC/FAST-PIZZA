import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateItemQuantityOnServer } from "./CartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      dispatch(
        updateItemQuantityOnServer({
          pizzaId,
          quantity: currentQuantity - 1,
          userId,
        }),
      );
    }
  };

  const handleIncrease = () => {
    dispatch(
      updateItemQuantityOnServer({
        pizzaId,
        quantity: currentQuantity + 1,
        userId,
      }),
    );
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}

UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number,
};

export default UpdateItemQuantity;
