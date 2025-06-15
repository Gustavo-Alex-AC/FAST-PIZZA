import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/">&larr; Voltar ao cardápio</LinkButton>

      <p className="mt-7 font-semibold">Seu carinho ainda está vazio :)</p>
    </div>
  );
}

export default EmptyCart;
