import { useState } from "react";
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import animacao from "../../assets/pizza-delivery.json";

import axios from 'axios';


function CreateUser() {
  const [form, setForm] = useState({ nome: '', sobrenome: '',casa:'',municipio:'',telefone:'',email:'',senha:'' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1) Extrai somente os campos de endereço do form
      const { bairro, casa, municipio, ...restoDoForm } = form;
  
      // 2) Envia os dados de Endereço
      const enderecoResponse = await axios.post(
        'http://localhost:3000/api/enderecos',
        { bairro, casa, municipio }
      );
  
      // Se quiser usar o id do endereço para salvar no usuário, por ex:
      const enderecoCriado = enderecoResponse.data; // assume que retorna algo como { id: 1, bairro: "...", ... }
      const idEndereco = enderecoCriado.id; 
      
      // 3) Prepara os dados do usuário
      //    Se seu modelo de User tiver um campo para referenciar o endereço, inclua `id_Endereco: idEndereco`
      const userPayload = {
        ...restoDoForm,
        id_Endereco: idEndereco  // ou remova essa linha se não houver relacionamento
      };
  
      // 4) Envia os dados de Usuário
      await axios.post('http://localhost:3000/api/users', userPayload);
  
      alert('Usuário e Endereço cadastrados com sucesso!');
      setForm({
        nome: '',
        sobrenome: '',
        casa: '',
        municipio: '',
        bairro: '',
        telefone: '',
        email: '',
        senha: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar usuário/endereço');
    }
  };
  
  

  

  return (
    <div className="flex w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-yellow-400">
        <Lottie
          style={{ width: 300, height: 300 }}
          animationData={animacao}
          loop={true}
        />
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex h-screen flex-col justify-center p-10"
        >
          <Link
            to="/"
            className="mb-10 w-auto bg-yellow-400 text-4xl font-bold tracking-widest"
          >
            Fast Pizza
          </Link>
          <h1 className="text-2xl font-bold">Criar Conta</h1>
          <p className="mb-4 text-xs text-stone-600 md:text-base">
            Já tens uma conta?{" "}
            <Link to="/" className="text-blue-500 underline">
              Iniciar Sessão
            </Link>
          </p>

          <input
            type="text"
            name="nome"
            placeholder="Digite o seu nome"
            value={form.nome} onChange={handleChange} required
            className="input mb-4 p-4 w-full"
          />
          <input
            type="text"
            name="sobrenome"
            placeholder="Digite o seu Sobrenome"
            value={form.sobrenome} onChange={handleChange} required
            className="input mb-4 p-4 w-full"
          />
          <div className="grid grid-rows-2">
            <input
              type="text"
              name="casa"
              placeholder="Digite o nº de casa/edificio"
              value={form.casa} onChange={handleChange} required
              className="input mb-4 p-4 w-full"
            />
            <input
              type="text"
              name="bairro"
              placeholder="Digite o nome do bairro"
              value={form.bairro} onChange={handleChange} required
              className="input mb-4 p-4 w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="municipio"
                placeholder="Digite o seu municipio"
                value={form.municipio} onChange={handleChange} required
                className="input mb-4 p-4 w-full"
              />
              <input
                type="text"
                name="telefone"
                placeholder="Digite o seu nº telefone"
                value={form.telefone} onChange={handleChange} required
                className="input mb-4 p-4 w-full"
              />
            </div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Digite o seu Email"
            value={form.email} onChange={handleChange} required
            className="input mb-4 p-4 w-full"
          />
          <input
            type="password"
            name="senha"
            placeholder="Digite a sua palavra-passe"
            value={form.senha} onChange={handleChange} required
            className="input mb-4 p-4 w-full"
          />

          <button
            type="submit"
            className="w-auto rounded bg-red-500 p-4 text-center font-bold text-white"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;

//npm i @reduxjs/toolkit react-redux
