// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import { format } from 'date-fns';
// import Navbar from './Navbar';


// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#ffffff',
//     padding: 20,
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   header: {
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   date: {
//     fontSize: 14,
//     textAlign: 'right',
//   },
//   table: {
//     display: 'table',
//     width: 'auto',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: {
//     margin: 'auto',
//     flexDirection: 'row',
//   },
//   tableCol: {
//     width: '25%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCell: {
//     margin: 'auto',
//     marginTop: 5,
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });

// // Create PDF component
// const PDFDocument = ({ products }) => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Image src={require('../Assets/firehead.png')} style={{ width: 100, height: 100 }} />
//           <Text style={styles.date}>{format(new Date(), 'dd/MM/yyyy')}</Text>
//         </View>
//         <Text style={styles.title}>Product Report</Text>
//         <View style={styles.table}>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Products</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Title</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Old Price</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>New Price</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Quantity</Text>
//             </View>
//           </View>
//           {products.map((product, index) => (
//             <View style={styles.tableRow} key={index}>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{product.product_name}</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{product.title}</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>Rs.{product.old_price.toFixed(2)}</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>Rs.{product.new_price.toFixed(2)}</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{product.quantity}</Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// const Report = ({ products }) => {
//   return (
//     <div>
//       <Navbar />
//       <div className="report">
//         <h1>Product Report</h1>
//         <PDFDownloadLink document={<PDFDocument products={products} />} fileName="product_report.pdf">
//           {({ blob, url, loading, error }) =>
//             loading ? 'Loading document...' : <button>Download Report</button>
//           }
//         </PDFDownloadLink>
//       </div>
//     </div>
//   );
// };

// export default Report;
