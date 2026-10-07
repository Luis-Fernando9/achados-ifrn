import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CampoTexto from "../components/CampoTexto";
import CampoSelecao from "../components/CampoSelecao";
import Carregando from "../components/Carregando";
import {
  buscarItem,
  criarItem,
  editarItem,
  listarCategorias,
  listarLocais,
} from "../services/itensService";
import { obterMensagemErro } from "../utils/erros";

function PaginaFormularioItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const modoEdicao = Boolean(id);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [dataEncontrado, setDataEncontrado] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [locais, setLocais] = useState([]);

  const [carregando, setCarregando] = useState(modoEdicao);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(function () {
    carregarListasAuxiliares();
    if (modoEdicao) {
      carregarItem();
    }
  }, [id]);

  async function carregarListasAuxiliares() {
    try {
      const [dadosCategorias, dadosLocais] = await Promise.all([
        listarCategorias(),
        listarLocais(),
      ]);
      setCategorias(dadosCategorias);
      setLocais(dadosLocais);
    } catch (e) {
      // segue sem as opções pré-definidas
    }
  }

  async function carregarItem() {
    setCarregando(true);
    try {
      const dados = await buscarItem(id);
      setNome(dados.nome);
      setDescricao(dados.descricao);
      setCategoria(dados.categoria);
      setLocal(dados.local);
      setDataEncontrado(dados.data_encontrado);
    } catch (e) {
      setSucesso(false);
      setMensagem(obterMensagemErro(e));
    } finally {
      setCarregando(false);
    }
  }

  async function aoSalvar(evento) {
    evento.preventDefault();
    setEnviando(true);
    setMensagem("");

    const item = {
      nome: nome,
      descricao: descricao,
      categoria: categoria,
      local: local,
      data_encontrado: dataEncontrado,
    };

    try {
      if (modoEdicao) {
        await editarItem(id, item);
      } else {
        await criarItem(item);
      }
      setSucesso(true);
      setMensagem(modoEdicao ? "Item atualizado com sucesso." : "Item cadastrado com sucesso.");
      setTimeout(function () {
        navigate("/");
      }, 800);
    } catch (e) {
      setSucesso(false);
      setMensagem(obterMensagemErro(e));
    } finally {
      setEnviando(false);
    }
  }

  function aoCancelar() {
    navigate(-1);
  }

  if (carregando) {
    return <Carregando texto="Carregando dados do item..." />;
  }

  return (
    <div className="pagina-formulario">
      <h2>{modoEdicao ? "Editar item" : "Novo item"}</h2>

      <form className="formulario-item" onSubmit={aoSalvar}>
        <CampoTexto rotulo="Nome" valor={nome} aoAlterar={setNome} />
        <CampoTexto rotulo="Descrição" valor={descricao} aoAlterar={setDescricao} multilinha />
        <CampoSelecao
          rotulo="Categoria"
          rotuloVazio="Selecione"
          valor={categoria}
          opcoes={categorias}
          aoAlterar={setCategoria}
        />
        <CampoSelecao
          rotulo="Local"
          rotuloVazio="Selecione"
          valor={local}
          opcoes={locais}
          aoAlterar={setLocal}
        />
        <CampoTexto
          rotulo="Data em que foi encontrado"
          tipo="date"
          valor={dataEncontrado}
          aoAlterar={setDataEncontrado}
        />

        {mensagem && (
          <p className={sucesso ? "mensagem-sucesso" : "mensagem-erro"}>{mensagem}</p>
        )}

        <div className="formulario-acoes">
          <button type="submit" disabled={enviando}>
            {enviando ? "Salvando..." : "Salvar"}
          </button>
          <button type="button" className="botao-secundario" onClick={aoCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaginaFormularioItem;
