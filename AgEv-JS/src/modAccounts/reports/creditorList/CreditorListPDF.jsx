import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const tableCol = {
  padding: "3,2",
  borderStyle: "solid",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    color: "black",
  },
  section: {
    padding: "25",
  },
  header: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottom: "3px solid black",
    paddingBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 3,
  },
  smallTille: {
    fontSize: 8,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },

  partyName: {
    width: "40%",
    ...tableCol,
  },
  others: {
    width: "20%",
    ...tableCol,
  },
});

const CreditorListPDF = ({ list }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{list.data.title}</Text>
            </View>
          </View>
          <View style={styles.table}>
            {/* TableHeader */}
            <View style={styles.tableRow}>
              <View style={styles.partyName}>
                <Text style={styles.smallTille}>Party Name</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Total Credit</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Total Deposit</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Total Balance</Text>
              </View>
            </View>
            {/* TableContent */}
            {list.data.tableList.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.partyName}>
                  <Text style={styles.smallTille}>{item.partyName}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.totalCredit}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.totalDeposit}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.totalBalance}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CreditorListPDF;
