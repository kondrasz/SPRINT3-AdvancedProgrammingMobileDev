import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { DeteccaoEpi } from "../types";
import { DeteccaoCard } from "../components";

type ListagemProps = {
  dados: DeteccaoEpi[];
  carregando: boolean;
  erro: string | null;
  onSelecionar: (item: DeteccaoEpi) => void;
  onNavegarCadastro: () => void;
  onRecarregar: () => void;
};

export default function ListagemScreen({
  dados,
  carregando,
  erro,
  onSelecionar,
  onNavegarCadastro,
  onRecarregar,
}: ListagemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Logs de Segurança (YOLOv8)</Text>

      {carregando && (
        <ActivityIndicator size="large" color="#1A237E" style={{ marginTop: 40 }} />
      )}

      {erro && (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>{erro}</Text>
          <TouchableOpacity style={styles.botaoTentar} onPress={onRecarregar}>
            <Text style={styles.textoTentar}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {!carregando && !erro && (
        <ScrollView style={styles.lista}>
          {dados.length === 0 ? (
            <Text style={styles.semDados}>Nenhum registro encontrado no backend.</Text>
          ) : (
            dados.map((item) => (
              <DeteccaoCard key={item.id} deteccao={item} onSelecionar={onSelecionar} />
            ))
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.botaoFlutuante} onPress={onNavegarCadastro}>
        <Text style={styles.botaoTexto}>+ Novo Log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#1A237E", marginBottom: 16, textAlign: "center" },
  lista: { flex: 1 },
  semDados: { textAlign: "center", color: "#666", marginTop: 20 },
  botaoFlutuante: { backgroundColor: "#1A237E", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 12 },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  erroContainer: { marginTop: 20, padding: 16, backgroundColor: "#FFEBEE", borderRadius: 8, borderWidth: 1, borderColor: "#F44336" },
  erroTexto: { color: "#D32F2F", textAlign: "center", marginBottom: 12 },
  botaoTentar: { backgroundColor: "#D32F2F", padding: 10, borderRadius: 6, alignItems: "center" },
  textoTentar: { color: "#fff", fontWeight: "bold" },
});