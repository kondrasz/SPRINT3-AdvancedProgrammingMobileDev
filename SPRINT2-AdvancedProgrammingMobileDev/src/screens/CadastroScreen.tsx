import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { DeteccaoEpi } from "../types";

type CadastroProps = {
  onSalvar: (novaDeteccao: Omit<DeteccaoEpi, "id">) => Promise<void>;
  onVoltar: () => void;
};

export default function CadastroScreen({ onSalvar, onVoltar }: CadastroProps) {
  const [salvando, setSalvando] = useState(false);

  const simularEnvioYolo = async (equipamento: string, emUso: boolean) => {
    try {
      setSalvando(true);
      await onSalvar({
        equipamento,
        emUso,
        setor: "Setor Automatizado Sul",
        dataHora: new Date().toISOString(), // Alinhado ao LocalDateTime do Spring Boot
      });
    } catch (err) {
      alert("Erro ao cadastrar registro no backend.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Simulador de Câmera YOLOv8</Text>
      <Text style={styles.subtitulo}>Escolha qual cenário disparar para a API REST:</Text>

      {salvando ? (
        <ActivityIndicator size="large" color="#1A237E" style={{ marginVertical: 20 }} />
      ) : (
        <>
          <TouchableOpacity
            style={[styles.botaoSimular, styles.bgSucesso]}
            onPress={() => simularEnvioYolo("Óculos de Proteção", true)}
          >
            <Text style={styles.textoBotao}>Simular Uso Correto (Óculos)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoSimular, styles.bgAlerta]}
            onPress={() => simularEnvioYolo("Protetor Auricular", false)}
          >
            <Text style={styles.textoBotao}>Simular Infração (Falta de Abafador)</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar} disabled={salvando}>
        <Text style={styles.textoVoltar}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#1A237E", marginBottom: 8, textAlign: "center" },
  subtitulo: { fontSize: 14, color: "#666", marginBottom: 24, textAlign: "center" },
  botaoSimular: { padding: 16, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  bgSucesso: { backgroundColor: "#4CAF50" },
  bgAlerta: { backgroundColor: "#F44336" },
  botaoVoltar: { backgroundColor: "#E0E0E0", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 20 },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  textoVoltar: { color: "#333", fontWeight: "bold" },
});