import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { DeteccaoEpi } from "./src/types";
import { listarDeteccoes, criarDeteccao } from "./src/services/deteccaoService";

import ListagemScreen from "./src/screens/ListagemScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import DetalheScreen from "./src/screens/DetalheScreen";

export default function App() {
  const [deteccoes, setDeteccoes] = useState<DeteccaoEpi[]>([]);
  const [telaAtiva, setTelaAtiva] = useState<"LISTAR" | "CADASTRAR" | "DETALHE">("LISTAR");
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await listarDeteccoes();
      setDeteccoes(lista);
    } catch (error) {
      setErro("Servidor indisponível. Verifique se o backend está rodando na porta 8080.");
    } finally {
      setCarregando(false);
    }
  }

  const handleSalvarDeteccao = async (novaDeteccao: Omit<DeteccaoEpi, "id">) => {
    await criarDeteccao(novaDeteccao);
    await carregarDados(); // Recarrega a lista vinda da API
    setTelaAtiva("LISTAR");
  };

  const handleVerDetalhes = (item: DeteccaoEpi) => {
    setIdSelecionado(item.id);
    setTelaAtiva("DETALHE");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {telaAtiva === "LISTAR" && (
        <ListagemScreen
          dados={deteccoes}
          carregando={carregando}
          erro={erro}
          onSelecionar={handleVerDetalhes}
          onNavegarCadastro={() => setTelaAtiva("CADASTRAR")}
          onRecarregar={carregarDados}
        />
      )}

      {telaAtiva === "CADASTRAR" && (
        <CadastroScreen
          onSalvar={handleSalvarDeteccao}
          onVoltar={() => setTelaAtiva("LISTAR")}
        />
      )}

      {telaAtiva === "DETALHE" && (
        <DetalheScreen
          idSelecionado={idSelecionado}
          onVoltar={() => setTelaAtiva("LISTAR")}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
});