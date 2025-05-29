import { Link } from "react-router-dom";
import pizzaImage from "../assets/chad-montano-MqT0asuoIcU-unsplash.jpg";

function Home() {
  return (
    <div className="my-10 flex flex-col items-center gap-8 px-4 sm:my-16 md:flex-row md:items-center md:justify-center">
      {/* Texto */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="mb-8 text-xl font-semibold md:text-3xl">
          A melhor pizza.
          <br />
          <span className="uppercase text-yellow-400">
            DO FORNO, DIRETO PARA VOCÊ.
          </span>
        </h1>

        {/* Botão que redireciona para o menu */}
        <Link
          to="/menu"
          className="inline-block rounded-full bg-yellow-400 px-6 py-3 font-semibold uppercase text-stone-800 shadow-md transition hover:bg-yellow-300"
        >
          Ver Cardápio
        </Link>
      </div>

      {/* Imagem como background */}
      <div
        className="h-72 w-72 rounded-lg bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `url(${pizzaImage})`,
        }}
      ></div>
    </div>
  );
}

export default Home;
