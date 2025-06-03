import { useSelector } from "react-redux";

function Username() {
  const nome = useSelector((state) => state.user.nome);

  if (!nome) return null;

  return <div className="hidden text-sm font-semibold md:block">{nome}</div>;
}

export default Username;
