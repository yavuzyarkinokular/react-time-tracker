import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    alignItems: "center",
    padding: 5,
  },
  column: {
    width: "25%",
    textAlign: "center",
  },
});

const ProjectTablePDF = ({ projects }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Project Table</Text>
        {projects.map((p, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.column}>
              <Text>{p.project}</Text>
            </View>
            <View style={styles.column}>
              <Text>{p.startDate}</Text>
            </View>
            <View style={styles.column}>
              <Text>{p.startTime}</Text>
            </View>
            <View style={styles.column}>
              <Text>{p.endDate}</Text>
            </View>
            <View style={styles.column}>
              <Text>{p.endTime}</Text>
            </View>
            <View style={styles.column}>
              <Text>{p.duration}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ProjectTablePDF;
