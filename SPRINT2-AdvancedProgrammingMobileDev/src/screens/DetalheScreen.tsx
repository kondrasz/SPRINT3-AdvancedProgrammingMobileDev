import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { DeteccaoEpi } from "../types";
import { buscarDeteccaoPorId } from "../services/deteccaoService";

type DetalheProps = {
  idSelecionado: number | null;
  onVoltar: () => void;
};

export default function DetalheScreen({ idSelecionado, onVoltar }: DetalheProps) {
  const [item, setItem] = useState<DeteccaoEpi | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (idSelecionado) {
      carregarDetalhe(idSelecionado);
    }
  }, [idSelecionado]);

  async function carregarDetalhe(id: number) {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarDeteccaoPorId(id);
      setItem(dados);
    } catch (error) {
      setErro("Falha ao carregar os detalhes do registro.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Flagrante</Text>

      {carregando && <ActivityIndicator size="large" color="#1A237E" />}

      {erro && <Text style={styles.erroTexto}>{erro}</Text>}

      {!carregando && !erro && item && (
        <View style={[styles.card, !item.emUso && styles.cardAlerta]}>
          <Text style={styles.info}><Text style={styles.bold}>ID da Ocorrência:</Text> #{item.id}</Text>
          <Text style={styles.info}><Text style={styles.bold}>EPI Alvo:</Text> {item.equipamento}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Localização:</Text> {item.setor}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Timestamp:</Text> {item.dataHora}</Text>
          <Text style={styles.info}>
            <Text style={styles.bold}>Status de Segurança:</Text>{" "}
            {item.emUso ? "✅ Uso em conformidade" : "❌ Infração Detectada"}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
        <Text style={styles.botaoTexto}>Voltar para Lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#1A237E", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 12, borderWidth: 1, borderColor: "#E0E0E0", marginBottom: 20 },
  cardAlerta: { borderColor: "#F44336", backgroundColor: "#FFEBEE" },
  info: { fontSize: 16, marginBottom: 10, color: "#333" },
  bold: { fontWeight: "bold" },
  botaoVoltar: { backgroundColor: "#666", padding: 14, borderRadius: 8, alignItems: "center" },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  erroTexto: { color: "#F44336", textAlign: "center", marginBottom: 20 },
});