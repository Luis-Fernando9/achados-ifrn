import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filtros from "../components/Filtros";
import ListaItens from "../components/ListaItens";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import { listarItens, listarCategorias, listarLocais } from "../services/itensService";
import { obterMensagemErro } from "../utils/erros";

function PaginaInicial() {
  const [itens, setItens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [locais, setLocais] = useState([]);

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(function () {
    carregarListasAuxiliares();
  }, []);

  // Pequeno atraso para não disparar uma requisição a cada letra digitada na busca
  useEffect(function () {
    const temporizador = setTimeout(function () {
      carregarItens();
    }, 400);
    return function () {
      clearTimeout(temporizador);
    };
  }, [busca, status, categoria, local]);

  async function carregarListasAuxiliares() {
    try {
      const [dadosCategorias, dadosLocais] = await Promise.all([
        listarCategorias(),
        listarLocais(),
      ]);
      setCategorias(dadosCategorias);
      setLocais(dadosLocais);
    } catch (e) {
      // As opções de filtro não são essenciais: se falharem, a lista continua funcionando
    }
  }

  async function carregarItens() {
    setCarregando(true);
    try {
      const filtros = {};
      if (busca) filtros.busca = busca;
      if (status) filtros.status = status;
      if (categoria) filtros.categoria = categoria;
      if (local) filtros.local = local;

      const dados = await listarItens(filtros);
      setItens(dados);
      setErro("");
    } catch (e) {
      setErro(obterMensagemErro(e));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-inicial">
      <div className="pagina-inicial-topo">
        <h2>Itens encontrados</h2>
        <Link to="/novo" className="botao-primario">
          + Novo item
        </Link>
      </div>

      <Filtros
        busca={busca}
        status={status}
        categoria={categoria}
        local={local}
        categorias={categorias}
        locais={locais}
        aoAlterarBusca={setBusca}
        aoAlterarStatus={setStatus}
        aoAlterarCategoria={setCategoria}
        aoAlterarLocal={setLocal}
      />

      <MensagemErro mensagem={erro} />

      {carregando ? (
        <Carregando texto="Carregando itens..." />
      ) : (
        <ListaItens itens={itens} />
      )}
    </div>
  );
}

export default PaginaInicial;
