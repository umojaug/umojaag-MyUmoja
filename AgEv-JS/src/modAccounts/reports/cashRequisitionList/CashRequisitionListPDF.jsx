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
  pariticulars: {
    width: "25%",
    ...tableCol,
  },
  others: {
    width: "15%",
    ...tableCol,
  },
  totalWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
    borderBottom: "1px solid black",
  },
  totalBottom: {
    width: "40%",
  },
  totalOthers: {
    width: "15%",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
  totalOthers2: {
    width: "45%",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
});

const CashRequisitionListPDF = ({ list }) => {
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
                <Text style={styles.smallTille}>EntryBy</Text>
              </View>
              <View style={styles.pariticulars}>
                <Text style={styles.smallTille}>Particulars</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Amount</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Approved</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>ApprovedBy</Text>
              </View>
              <View style={styles.others}>
                <Text style={styles.smallTille}>Approved Date</Text>
              </View>
            </View>
            {/* TableContent */}
            {list.data.tableList.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.entryBy}</Text>
                </View>
                <View style={styles.pariticulars}>
                  <Text style={styles.smallTille}>{item.particulars}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.amount}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.approved}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.approvedBy}</Text>
                </View>
                <View style={styles.others}>
                  <Text style={styles.smallTille}>{item.approvedDate}</Text>
                </View>
              </View>
            ))}
            <View style={styles.totalWrapper}>
              <View style={styles.totalBottom}>
                <Text style={styles.smallTille}>{list.data.total}</Text>
              </View>
              <View style={styles.totalOthers}>
                <Text style={styles.smallTille}>{list.data.totalAmount}</Text>
              </View>
              <View style={styles.totalOthers2}></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CashRequisitionListPDF;
