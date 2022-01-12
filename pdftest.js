import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A5" style={styles.page}>
      <View style={styles.section}>
        <Text>{data.name}</Text>
      </View>
      <View style={styles.section}>
        <Text>{data.phone}</Text>
      </View>
    </Page>
  </Document>
)

const DownloadPDF = ({ data }) => {
  return (
    <PDFDownloadLink document={<MyDocument data={data} />} fileName="invoice.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <h1 style={{ width: "10vw",height: "2vw",backgroundColor: 'blue'}}>Hello</h1>)}
    </PDFDownloadLink>
  )
}

export const ViewPDF = ({ data }) => {
  return (
    <>
      <PDFViewer>
        <MyDocument data={data} />
      </PDFViewer>
      <DownloadPDF data={data} />
    </>
  )
}

export default ViewPDF
