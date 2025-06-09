import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class CourseDetailsCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.category}>Graphic Design</Text>
        <Text style={styles.title}>Design Principles: Organizing</Text>

        <View style={styles.statsRow}>
          <Text style={styles.statText}>4.3</Text>
          <Ionicons name="star" size={14} color="gold" />
          <Text style={styles.statText}> | 12 Class</Text>
          <Text style={styles.statText}> | 9.5 Hours</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₦3,000</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>E3</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.activeTabText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.inactiveTabText}>Curriculum</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          Graphic Design is a popular profession...
          <Text style={styles.readMore}> Read More</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginTop: -64, 
  },
  category: {
    fontSize: 12,
    color: "#F97316", 
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  statText: {
    fontSize: 12,
    color: "#6B7280", 
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
  },
  badge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: "#047857", 
    fontWeight: "600",
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#EFF6FF", 
  },
  activeTabText: {
    color: "#3B82F6", 
    fontWeight: "600",
  },
  inactiveTabText: {
    color: "#4B5563", 
  },
  description: {
    fontSize: 14,
    color: "#374151", 
    marginTop: 12,
  },
  readMore: {
    color: "#2563EB",
  },
});
