import React from 'react'
import { Page, Text, View, Image, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import BasicButton from '@/components/button'
import InvoiceItemTable from './table'

//$ Sample Data
const invoiceData = {
  id: '5df3180a09ea16dc4b95f910',
  invoice_no: '201906-28',
  balance: '$2,283.74',
  company: 'MANTRIX',
  email: 'susanafuentes@mantrix.com',
  phone: '+1 (872) 588-3809',
  address: '922 Campus Road, Drytown, Wisconsin, 1986',
  trans_date: '2019-09-12',
  due_date: '2019-10-12',
  items: [
    { sno: 1, desc: 'ad sunt culpa occaecat qui', qty: 5, rate: 405.89 },
    { sno: 2, desc: 'cillum quis sunt qui aute', qty: 5, rate: 373.11 },
    { sno: 3, desc: 'ea commodo labore culpa irure', qty: 5, rate: 458.61 },
    { sno: 4, desc: 'nisi consequat et adipisicing dolor', qty: 10, rate: 725.24 },
    { sno: 5, desc: 'proident cillum anim elit esse', qty: 4, rate: 141.02 },
  ],
}

//$ Create styles
const styles = StyleSheet.create({
  page: {
    fontSize: 14,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  reportTitle: {
    color: '#61dafb',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 60,
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique',
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})

const InvoiceTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
)

const InvoiceNo = ({ invoice }) => (
  <>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text>{invoice.trans_date}</Text>
    </View>
  </>
)

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{invoice.company}</Text>
    <Text>{invoice.address}</Text>
    <Text>{invoice.phone}</Text>
    <Text>{invoice.email}</Text>
  </View>
)

const InvoiceThankYouMsg = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>Thank you for your business</Text>
  </View>
)

// Create Document Component
const MyDocument = ({ data, size, orientation }) => (
  <Document>
    <Page size={size} style={styles.page} orientation={orientation?.toLowerCase()}>
      <Image alt="Print" style={styles.logo} src={'/icons/logo/logo.png'} />
      <InvoiceTitle title="Invoice" />
      <InvoiceNo invoice={invoiceData} />
      <BillTo invoice={invoiceData} />
      <InvoiceItemTable invoice={invoiceData} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
)

const DownloadPDF = ({ data, size, orientation }) => {
  return (
    <PDFDownloadLink document={<MyDocument data={data} size={size} orientation={orientation} />} fileName="invoice.pdf">
      {({ blob, url, loading, error }) =>
        loading ? (
          'Loading document...'
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '2vw' }}>
            <BasicButton title="Print Invoice" func={() => console.log('Printed')} />
          </div>
        )
      }
    </PDFDownloadLink>
  )
}

export const ViewPDF = ({ data, size, orientation }) => {
  return (
    <>
      <PDFViewer>
        <MyDocument data={data} size={size} orientation={orientation} />
      </PDFViewer>
      <DownloadPDF data={data} size={size} orientation={orientation} />
    </>
  )
}

export default ViewPDF
