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
  particulars: {
    width: "28%",
    ...tableCol,
  },
  others: {
    width: "18%",
    ...tableCol,
  },
});

const BankLedgerListPDF = ({ list }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{list.data.title}</Text>
              <Text style={styles.smallTille}>
                {list.data.fromDate} To {list.data.toDate}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            {/* TableHeader */}
            <View style={styles.tableRow}>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Vno</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Date</Text>
              </View>
              <View style={styles.particulars}>
                <Text style={styles.smallTille}>Pariticulars</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Dr</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Cr</Text>
              </View>
            </View>
            {/* TableContent */}
            {list.data.tableList.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.vno}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.date}</Text>
                </View>
                <View style={styles.particulars}>
                  <Text style={styles.smallTille}>{item.particulars}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.dr}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.cr}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BankLedgerListPDF;
