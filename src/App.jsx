'import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cabecalho from "./components/Cabecalho";
import MensagemErro from "./components/MensagemErro";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaDetalheItem from "./pages/PaginaDetalheItem";
import PaginaFormularioItem from "./pages/PaginaFormularioItem";
import { buscarUsuario } from "./services/itensService";
import { obterMensagemErro } from "./utils/erros";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [erroUsuario, setErroUsuario] = useState("");

  useEffect(function () {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    try {
      const dados = await buscarUsuario();
      setUsuario(dados);
      setErroUsuario("");
    } catch (e) {
      setErroUsuario(obterMensagemErro(e));
    }
  }

  return (
    <div className="App">
      <Cabecalho usuario={usuario} />
      <main className="conteudo">
        <MensagemErro mensagem={erroUsuario} />
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/item/:id" element={<PaginaDetalheItem />} />
          <Route path="/novo" element={<PaginaFormularioItem />} />
          <Route path="/editar/:id" element={<PaginaFormularioItem />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
