import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animacaoApp from "../assets/order-food.json";
import logoWhite from "../assets/logoWhite.svg";
import animacao2 from "../assets/food-delivery.json";
import { getMenu } from "../services/apiRestaurant";
import MenuItem from "../features/menu/MenuItem";

function Home() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const data = await getMenu();
        setMenu(data);
      } catch (error) {
        console.error("Erro ao carregar menu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return (
    <div>
      {/* 🔸 Esta div NÃO será afetada por padding externo */}
      <div className="relative mb-5 flex flex-wrap items-center justify-center gap-6 bg-orange-400 p-4">
        <Lottie style={{ width: 150, height: 150 }} animationData={animacaoApp} loop />
        <img src={logoWhite} alt="Logo" className="h-20" />
        <div className="text-white text-center text-lg">
          <p>
            A melhor pizza <br />
            <span className="font-bold">DO FORNO, DIRETO PARA VOCÊ</span>
          </p>
        </div>
        <Lottie style={{ width: 150, height: 150 }} animationData={animacao2} loop />
      </div>

      {/* 🔹 Apenas o menu tem padding horizontal/vertical */}
      <div className="px-4 py-6">
        {loading ? (
          <p className="text-center text-stone-500">Carregando menu...</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menu.map((pizza) => (
              <MenuItem pizza={pizza} key={pizza.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


export default Home;
