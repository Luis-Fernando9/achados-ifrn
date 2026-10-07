import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { buscarItem, devolverItem, excluirItem } from "../services/itensService";
import { obterMensagemErro } from "../utils/erros";

function PaginaDetalheItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [nomeRecebedor, setNomeRecebedor] = useState("");
  const [enviandoDevolucao, setEnviandoDevolucao] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);

  useEffect(function () {
    carregarItem();
  }, [id]);

  async function carregarItem() {
    setCarregando(true);
    try {
      const dados = await buscarItem(id);
      setItem(dados);
      setErro("");
    } catch (e) {
      setErro(obterMensagemErro(e));
    } finally {
      setCarregando(false);
    }
  }

  async function aoDevolver(evento) {
    evento.preventDefault();
    setEnviandoDevolucao(true);
    try {
      await devolverItem(id, nomeRecebedor);
      setNomeRecebedor("");
      await carregarItem();
    } catch (e) {
      setErro(obterMensagemErro(e));
    } finally {
      setEnviandoDevolucao(false);
    }
  }

  async function aoConfirmarExclusao() {
    try {
      await excluirItem(id);
      navigate("/");
    } catch (e) {
      setErro(obterMensagemErro(e));
      setModalAberto(false);
    }
  }

  if (carregando) {
    return <Carregando texto="Carregando item..." />;
  }

  if (!item) {
    return (
      <div className="pagina-detalhe">
        <Link to="/" className="link-voltar">
          ← Voltar
        </Link>
        <MensagemErro mensagem={erro || "Item não encontrado."} />
      </div>
    );
  }

  return (
    <div className="pagina-detalhe">
      <Link to="/" className="link-voltar">
        ← Voltar
      </Link>

      <div className="detalhe-card">
        <div className="detalhe-topo">
          <h2>{item.nome}</h2>
          <span className={"status-badge status-" + item.status}>{item.status}</span>
        </div>

        <MensagemErro mensagem={erro} />

        <p>
          <strong>Descrição:</strong> {item.descricao}
        </p>
        <p>
          <strong>Categoria:</strong> {item.categoria}
        </p>
        <p>
          <strong>Local:</strong> {item.local}
        </p>
        <p>
          <strong>Encontrado em:</strong> {item.data_encontrado}
        </p>

        {item.status === "devolvido" && (
          <>
            <p>
              <strong>Devolvido para:</strong> {item.devolvido_para}
            </p>
            <p>
              <strong>Data da devolução:</strong> {item.data_devolucao}
            </p>
          </>
        )}

        <div className="detalhe-acoes">
          <Link to={"/editar/" + item.id} className="botao-secundario">
            Editar
          </Link>
          <button className="botao-perigo" onClick={function () { setModalAberto(true); }}>
            Excluir
          </button>
        </div>

        {item.status === "aguardando" && (
          <form className="form-devolucao" onSubmit={aoDevolver}>
            <h3>Marcar como devolvido</h3>
            <input
              type="text"
              placeholder="Nome de quem recebeu"
              value={nomeRecebedor}
              onChange={function (e) { setNomeRecebedor(e.target.value); }}
              required
            />
            <button type="submit" disabled={enviandoDevolucao}>
              {enviandoDevolucao ? "Confirmando..." : "Confirmar"}
            </button>
          </form>
        )}
      </div>

      <ModalConfirmacao
        aberto={modalAberto}
        mensagem="Tem certeza que deseja excluir este item?"
        aoConfirmar={aoConfirmarExclusao}
        aoCancelar={function () { setModalAberto(false); }}
      />
    </div>
  );
}

export default PaginaDetalheItem;
