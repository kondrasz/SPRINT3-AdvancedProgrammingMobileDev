import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DeteccaoEpi } from "../types";

// Type LOCAL específico para as Props deste componente (Padrão Aula 14/04)
type DeteccaoCardProps = {
  deteccao: DeteccaoEpi;
  onSelecionar: (item: DeteccaoEpi) => void;
};

export default function DeteccaoCard({ deteccao, onSelecionar }: DeteccaoCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, !deteccao.emUso && styles.cardAlerta]} 
      onPress={() => onSelecionar(deteccao)}
    >
      <View style={styles.headerRow}>
        <Text style={styles.equipamento}>{deteccao.equipamento}</Text>
        <View style={[styles.badge, deteccao.emUso ? styles.badgeSeguro : styles.badgePerigo]}>
          <Text style={styles.badgeTexto}>
            {deteccao.emUso ? "SEGURO" : "ALERTA"}
          </Text>
        </View>
      </View>

      <Text style={styles.detalhe}>📍 Setor: {deteccao.setor}</Text>
      <Text style={styles.detalhe}>📅 {deteccao.dataHora}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardAlerta: {
    borderLeftColor: "#F44336",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  equipamento: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSeguro: {
    backgroundColor: "#E8F5E9",
  },
  badgePerigo: {
    backgroundColor: "#FFEBEE",
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  detalhe: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});