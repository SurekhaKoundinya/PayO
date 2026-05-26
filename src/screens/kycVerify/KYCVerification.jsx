

// import React, { useState } from 'react';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   TextInput,
//   Alert,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';

// import {
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';

// import { pick } from '@react-native-documents/picker';

// export default function KYCVerification({
//   navigation,
// }) {
//   const [activeTab, setActiveTab] =
//     useState('aadhaar');

//   const [selectedDoc, setSelectedDoc] =
//     useState('');

//   const [aadhaarFile, setAadhaarFile] =
//     useState(null);

//   const [panFile, setPanFile] =
//     useState(null);

//   const [faceFile, setFaceFile] =
//     useState(null);

//   // Upload Aadhaar / PAN PDF
// //   const handleDocumentUpload =
// //     async () => {
// //       try {
// //         // const result =
// //         //   await DocumentPickeR.pick(
// //         //     {
// //         //       type: [
// //         //         DocumentPicker
// //         //           .types.pdf,
// //         //       ],
// //         //     },
// //         //   );

// //         // if (
// //         //   activeTab ===
// //         //   'aadhaar'
// //         // ) {
// //         //   setAadhaarFile(
// //         //     result[0],
// //         //   );

// //         //   // Auto move to PAN
// //         //   setTimeout(() => {
// //         //     setActiveTab(
// //         //       'pan',
// //         //     );
// //         //   }, 800);
// //         // } else {
// //         //   setPanFile(
// //         //     result[0],
// //         //   );
// //         // }
// //       } catch (err) {
// //         if (
// //           !DocumentPicker.isCancel(
// //             err,
// //           )
// //         ) {
// //           console.log(err);
// //         }
// //       }
// //     };



// // const handleDocumentUpload = async () => {
// //     const result = await launchImageLibrary({
// //       mediaType: 'photo',
// //       quality: 0.8,
// //     });

// //     if (!result.didCancel && result.assets?.length > 0) {
// //       setForm({
// //         ...form,
// //         bankProof: result.assets[0],
// //       });
// //     }
// //   };

// const handleDocumentUpload = () => {
//   Alert.alert(
//     'Upload Document',
//     'Choose file type',
//     [
//       {
//         text: 'Image',
//         onPress: openImagePicker,
//       },
//       {
//         text: 'PDF',
//         onPress: openPdfPicker,
//       },
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//     ]
//   );
// };

// // const openPdfPicker = async () => {
// //   try {
// //     const result = await pick({
// //       type: ['application/pdf'],
// //     });

// //     if (result && result.length > 0) {
// //       const file = result[0];

// //       if (activeTab === 'aadhaar') {
// //         setAadhaarFile(file);
// //       } else {
// //         setPanFile(file);
// //       }
// //     }
// //   } catch (err) {
// //     console.log('PDF Picker Error:', err);
// //   }
// // };

// // const openImagePicker = async () => {
// //   const imageResult = await launchImageLibrary({
// //     mediaType: 'photo',
// //     quality: 0.8,
// //   });

// //   if (
// //     !imageResult.didCancel &&
// //     imageResult.assets?.length > 0
// //   ) {
// //     const file = imageResult.assets[0];

// //     if (activeTab === 'aadhaar') {
// //       setAadhaarFile(file);
// //     } else {
// //       setPanFile(file);
// //     }
// //   }
// // };

//   // Selfie Camera

//   const openPdfPicker = async () => {
//   try {
//     const result = await pick({
//       type: ['application/pdf'],
//     });

//     if (result && result.length > 0) {
//       const asset = result[0];

//       const file = {
//         name: asset.name,
//         type: asset.type,
//         uri: asset.uri,
//         size: asset.size,
//       };

//       console.log(file);

//       if (activeTab === 'aadhaar') {
//         setAadhaarFile(file);
//       } else {
//         setPanFile(file);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

//   const openImagePicker = async () => {
//   const imageResult = await launchImageLibrary({
//     mediaType: 'photo',
//     quality: 0.8,
//   });

//   if (
//     !imageResult.didCancel &&
//     imageResult.assets?.length > 0
//   ) {
//     const asset = imageResult.assets[0];

//     const file = {
//       name: asset.fileName,
//       type: asset.type,
//       uri: asset.uri,
//       size: asset.fileSize,
//     };

//     console.log(file);

//     if (activeTab === 'aadhaar') {
//       setAadhaarFile(file);
//     } else {
//       setPanFile(file);
//     }
//   }
// };

//   const handleFaceUpload = () => {
//     launchCamera(
//       {
//         mediaType: 'photo',
//         cameraType: 'front',
//       },
//       response => {
//         if (
//           !response.didCancel &&
//           response.assets
//         ) {
//           setFaceFile(
//             response.assets[0],
//           );
//         }
//       },
//     );
//   };

//   // Final Submit
//   const handleSubmit = () => {
//     if (!panFile) {
//       Alert.alert(
//         'Upload PAN PDF',
//       );
//       return;
//     }

//     navigation.navigate('Main');
//   };

//   console.log(panFile,aadhaarFile,"909")

//   return (
//     <SafeAreaView
//       style={styles.safeArea}>
//       <StatusBar
//         backgroundColor="#120022"
//         barStyle="light-content"
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={
//           false
//         }
//         contentContainerStyle={
//           styles.scrollContent
//         }>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.goBack()
//               }>
//               <Icon
//                 name="chevron-left"
//                 size={28}
//                 color="#fff"
//               />
//             </TouchableOpacity>

//             <Text style={styles.heading}>
//               Verify your identity
//             </Text>

//             <View
//               style={{ width: 28 }}
//             />
//           </View>

//           {/* Description */}
//           <Text style={styles.subText}>
//             Upload your Aadhaar
//             and PAN card PDFs to
//             complete KYC
//             verification.
//           </Text>

//           {/* Tabs */}
//           <Text style={styles.label}>
//             DOCUMENT TYPE
//           </Text>

//           <View
//             style={
//               styles.tabContainer
//             }>
//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab ===
//                   'aadhaar' &&
//                   styles.activeTab,
//               ]}
//               onPress={() =>
//                 setActiveTab(
//                   'aadhaar',
//                 )
//               }>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab ===
//                     'aadhaar' &&
//                     styles.activeTabText,
//                 ]}>
//                 Aadhaar
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab ===
//                   'pan' &&
//                   styles.activeTab,
//               ]}
//               onPress={() =>
//                 setActiveTab(
//                   'pan',
//                 )
//               }>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab ===
//                     'pan' &&
//                     styles.activeTabText,
//                 ]}>
//                 PAN Card
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Dropdown */}
//           <TextInput
//             placeholder="Voter ID / Passport / Driving License"
//             placeholderTextColor="#ccc"
//             value={selectedDoc}
//             onChangeText={
//               setSelectedDoc
//             }
//             style={styles.dropdown}
//           />

//           {/* Upload PDF */}
//          <TouchableOpacity
//   style={styles.uploadBox}
//   activeOpacity={0.8}
//   onPress={handleDocumentUpload}
// >
//             <View
//               style={
//                 styles.uploadIcon
//               }>
//               <Icon
//                 name="file-text"
//                 size={22}
//                 color="#fff"
//               />
//             </View>

//             <Text
//               style={
//                 styles.uploadTitle
//               }>
//               Upload{' '}
//               {activeTab ===
//               'aadhaar'
//                 ? 'Aadhaar PDF'
//                 : 'PAN PDF'}
//             </Text>

//             <Text
//               style={
//                 styles.uploadInfo
//               }>
//               Only PDF format
//               accepted
//             </Text>

//             {/* Aadhaar PDF */}
//             {activeTab ===
//               'aadhaar' &&
//               aadhaarFile && (
//                 <Text
//                   style={
//                     styles.fileName
//                   }>
//                   ✓ {aadhaarFile?.name}
//                 </Text>
//               )}

//             {/* PAN PDF */}
//             {activeTab ===
//               'pan' &&
//               panFile && (
//                 <Text
//                   style={
//                     styles.fileName
//                   }>
//                   ✓ {panFile.name}
//                 </Text>
//               )}
//           </TouchableOpacity>

//           {/* Selfie only Aadhaar */}
//           {activeTab ===
//             'aadhaar' && (
//             <View
//               style={
//                 styles.faceBox
//               }>
//               <View
//                 style={
//                   styles.faceIcon
//                 }>
//                 <Icon
//                   name="camera"
//                   size={20}
//                   color="#fff"
//                 />
//               </View>

//               <Text
//                 style={
//                   styles.faceTitle
//                 }>
//                 Capture Selfie
//               </Text>

//               <Text
//                 style={
//                   styles.faceSub
//                 }>
//                 Clear selfie with
//                 good lighting
//               </Text>

//               <TouchableOpacity
//                 style={
//                   styles.cameraBtn
//                 }
//                 onPress={
//                   handleFaceUpload
//                 }>
//                 <Text
//                   style={
//                     styles.cameraBtnText
//                   }>
//                   Open Camera
//                 </Text>
//               </TouchableOpacity>

//               {faceFile && (
//                 <Text
//                   style={
//                     styles.fileName
//                   }>
//                   ✓ Selfie Captured
//                 </Text>
//               )}

//               <View
//                 style={
//                   styles.instructions
//                 }>
//                 <Text
//                   style={
//                     styles.instructionText
//                   }>
//                   ✓ Whole face
//                   visible
//                 </Text>

//                 <Text
//                   style={
//                     styles.instructionText
//                   }>
//                   ✓ Neutral
//                   expression
//                 </Text>

//                 <Text
//                   style={
//                     styles.instructionText
//                   }>
//                   ✕ No filters
//                 </Text>
//               </View>
//             </View>
//           )}

//           {/* Checkbox */}
//           <View
//             style={
//               styles.checkboxRow
//             }>
//             <View
//               style={
//                 styles.checkbox
//               }
//             />

//             <Text
//               style={
//                 styles.checkboxText
//               }>
//               This information is
//               used only for KYC
//               verification.
//             </Text>
//           </View>

//           {/* Submit only PAN */}
//           {activeTab ===
//             'pan' && (
//             <TouchableOpacity
//               style={
//                 styles.submitBtn
//               }
//               onPress={
//                 handleSubmit
//               }>
//               <Text
//                 style={
//                   styles.submitBtnText
//                 }>
//                 Submit for Review
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#120022',
//   },

//   scrollContent: {
//     flexGrow: 1,
//   },

//   container: {
//     flex: 1,
//     padding: 22,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent:
//       'space-between',
//     marginTop: 10,
//   },

//   heading: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: '700',
//   },

//   subText: {
//     color: '#ddd',
//     marginTop: 20,
//     lineHeight: 22,
//     fontSize: 14,
//   },

//   label: {
//     color: '#ccc',
//     marginTop: 25,
//     marginBottom: 12,
//     fontSize: 12,
//     letterSpacing: 1,
//   },

//   tabContainer: {
//     flexDirection: 'row',
//     marginBottom: 18,
//   },

//   tabButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor:
//       'rgba(255,255,255,0.3)',
//     paddingVertical: 12,
//     borderRadius: 12,
//     marginRight: 10,
//     alignItems: 'center',
//   },

//   activeTab: {
//     backgroundColor: '#fff',
//   },

//   tabText: {
//     color: '#fff',
//     fontWeight: '600',
//   },

//   activeTabText: {
//     color: '#6A00FF',
//   },

//   dropdown: {
//     height: 52,
//     borderWidth: 1,
//     borderColor:
//       'rgba(255,255,255,0.2)',
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     color: '#fff',
//     marginBottom: 22,
//     backgroundColor:
//       'rgba(255,255,255,0.06)',
//   },

//   uploadBox: {
//     borderWidth: 2,
//     borderStyle: 'dashed',
//     borderColor: '#8B5CFF',
//     borderRadius: 24,
//     padding: 30,
//     alignItems: 'center',
//     backgroundColor: '#6F2BFF',
//     marginBottom: 24,
//   },

//   uploadIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: '#1BCBFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },

//   uploadTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   uploadInfo: {
//     color: '#ddd',
//     marginTop: 8,
//     fontSize: 13,
//   },

//   fileName: {
//     color: '#fff',
//     marginTop: 16,
//     fontSize: 13,
//     fontWeight: '600',
//   },

//   faceBox: {
//     borderWidth: 3,
//     borderColor: '#11CFFF',
//     borderRadius: 24,
//     padding: 24,
//     backgroundColor: '#5B1DD6',
//   },

//   faceIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     borderWidth: 2,
//     borderColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },

//   faceTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   faceSub: {
//     color: '#ddd',
//     marginTop: 8,
//     fontSize: 13,
//   },

//   cameraBtn: {
//     backgroundColor: '#11CFFF',
//     paddingVertical: 14,
//     borderRadius: 14,
//     marginTop: 18,
//     alignItems: 'center',
//   },

//   cameraBtnText: {
//     color: '#fff',
//     fontWeight: '700',
//   },

//   instructions: {
//     marginTop: 20,
//   },

//   instructionText: {
//     color: '#fff',
//     marginBottom: 8,
//     fontSize: 13,
//   },

//   checkboxRow: {
//     flexDirection: 'row',
//     marginTop: 24,
//     alignItems: 'center',
//   },

//   checkbox: {
//     width: 18,
//     height: 18,
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     marginRight: 10,
//   },

//   checkboxText: {
//     color: '#ddd',
//     flex: 1,
//     fontSize: 12,
//     lineHeight: 18,
//   },

//   submitBtn: {
//     backgroundColor: '#fff',
//     paddingVertical: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 40,
//   },

//   submitBtnText: {
//     color: '#5A00D1',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });




// import React, { useState } from 'react';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Alert,
//   TextInput,


// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';
// import styles from '../kycVerify/KYCVerificationStyles';
// import {
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';

// export default function KYCVerification({
//   navigation,
// }) {
//   const [activeTab, setActiveTab] =
//     useState('aadhaar');

//   const [otherIdText,
//     setOtherIdText] =
//     useState('');

//   const [aadhaarFile,
//     setAadhaarFile] =
//     useState(null);

//   const [panFile,
//     setPanFile] =
//     useState(null);

//   const [otherIdFile,
//     setOtherIdFile] =
//     useState(null);

//   const [faceFile,
//     setFaceFile] =
//     useState(null);

//   // Upload File
//   const handleDocumentUpload =
//     () => {
//       launchImageLibrary(
//         {
//           mediaType: 'mixed',
//           selectionLimit: 1,
//         },
//         response => {
//           if (
//             !response.didCancel &&
//             response.assets
//           ) {
//             const file =
//               response.assets[0];

//             // Aadhaar
//             if (
//               activeTab ===
//               'aadhaar'
//             ) {
//               setAadhaarFile(
//                 file,
//               );

//               Alert.alert(
//                 'Aadhaar Uploaded',
//               );

//               // Move PAN
//               setTimeout(() => {
//                 setActiveTab(
//                   'pan',
//                 );
//               }, 700);
//             }

//             // PAN
//             else if (
//               activeTab ===
//               'pan'
//             ) {
//               setPanFile(
//                 file,
//               );

//               Alert.alert(
//                 'PAN Uploaded',
//               );

//               // Move Other ID
//               setTimeout(() => {
//                 setActiveTab(
//                   'other',
//                 );
//               }, 700);
//             }

//             // Other ID
//             else {
//               setOtherIdFile(
//                 file,
//               );

//               Alert.alert(
//                 'Other ID Uploaded',
//               );
//             }
//           }
//         },
//       );
//     };

//   // Selfie
//   const handleFaceUpload =
//     () => {
//       launchCamera(
//         {
//           mediaType:
//             'photo',
//           cameraType:
//             'front',
//         },
//         response => {
//           if (
//             !response.didCancel &&
//             response.assets
//           ) {
//             setFaceFile(
//               response.assets[0],
//             );

//             Alert.alert(
//               'Selfie Captured',
//             );
//           }
//         },
//       );
//     };

//   // Submit
//   const handleSubmit =
//     () => {
//       if (!otherIdFile) {
//         Alert.alert(
//           'Upload Other ID File',
//         );
//         return;
//       }

//       navigation.navigate(
//         'KycUnderReview',
//       );
//     };

//   return (
//     <SafeAreaView
//       style={styles.safeArea}>
//       <StatusBar
//         backgroundColor="#120022"
//         barStyle="light-content"
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={
//           false
//         }
//         contentContainerStyle={
//           styles.scrollContent
//         }>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.goBack()
//               }>
//               <Icon
//                 name="chevron-left"
//                 size={28}
//                 color="#fff"
//               />
//             </TouchableOpacity>

//             <Text style={styles.heading}>
//               Verify your identity
//             </Text>

//             <View
//               style={{ width: 28 }}
//             />
//           </View>

//           {/* Description */}
//           <Text style={styles.subText}>
//             Upload your documents
//             to complete KYC
//             verification.
//           </Text>

//           {/* Label */}
//           <Text style={styles.label}>
//             DOCUMENT TYPE
//           </Text>

//           {/* Tabs */}
//           <View
//             style={
//               styles.tabContainer
//             }>
//             {/* Aadhaar */}
//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab ===
//                 'aadhaar' &&
//                 styles.activeTab,
//               ]}
//               onPress={() =>
//                 setActiveTab(
//                   'aadhaar',
//                 )
//               }>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab ===
//                   'aadhaar' &&
//                   styles.activeTabText,
//                 ]}>
//                 Aadhaar
//               </Text>
//             </TouchableOpacity>

//             {/* PAN */}
//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab ===
//                 'pan' &&
//                 styles.activeTab,
//               ]}
//               onPress={() =>
//                 setActiveTab(
//                   'pan',
//                 )
//               }>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab ===
//                   'pan' &&
//                   styles.activeTabText,
//                 ]}>
//                 PAN Card
//               </Text>
//             </TouchableOpacity>

//             {/* Other IDs */}
//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab ===
//                 'other' &&
//                 styles.activeTab,
//               ]}
//               onPress={() =>
//                 setActiveTab(
//                   'other',
//                 )
//               }>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab ===
//                   'other' &&
//                   styles.activeTabText,
//                 ]}>
//                 Other ID's
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Input only Other IDs */}
//           {activeTab ===
//             'other' && (
//               <TextInput
//                 placeholder="Voter ID / Passport / Driving License"
//                 placeholderTextColor="#B9A8D4"
//                 value={
//                   otherIdText
//                 }
//                 onChangeText={
//                   setOtherIdText
//                 }
//                 style={
//                   styles.inputBox
//                 }
//               />
//             )}

//           {/* Upload Box */}
//           <TouchableOpacity
//             style={
//               styles.uploadBox
//             }
//             activeOpacity={0.8}
//             onPress={
//               handleDocumentUpload
//             }>
//             <View
//               style={
//                 styles.uploadIcon
//               }>
//               <Icon
//                 name="upload"
//                 size={22}
//                 color="#fff"
//               />
//             </View>

//             <Text
//               style={
//                 styles.uploadTitle
//               }>
//               {activeTab ===
//                 'aadhaar'
//                 ? 'Upload Aadhaar Card'
//                 : activeTab ===
//                   'pan'
//                   ? 'Upload PAN Card'
//                   : 'Upload Other File'}
//             </Text>

//             <Text
//               style={
//                 styles.uploadInfo
//               }>
//               JPG, PNG or PDF •
//               Max 5MB
//             </Text>

//             {/* Aadhaar */}
//             {activeTab ===
//               'aadhaar' &&
//               aadhaarFile && (
//                 <Text
//                   style={
//                     styles.fileName
//                   }>
//                   ✓{' '}
//                   {
//                     aadhaarFile.fileName
//                   }
//                 </Text>
//               )}

//             {/* PAN */}
//             {activeTab ===
//               'pan' &&
//               panFile && (
//                 <Text
//                   style={
//                     styles.fileName
//                   }>
//                   ✓{' '}
//                   {
//                     panFile.fileName
//                   }
//                 </Text>
//               )}

//             {/* Other */}
//             {activeTab ===
//               'other' &&
//               otherIdFile && (
//                 <Text
//                   style={
//                     styles.fileName
//                   }>
//                   ✓{' '}
//                   {
//                     otherIdFile.fileName
//                   }
//                 </Text>
//               )}
//           </TouchableOpacity>

//           {/* Selfie only Aadhaar */}
//           {activeTab ===
//             'aadhaar' && (
//               <View
//                 style={
//                   styles.faceBox
//                 }>
//                 <View
//                   style={
//                     styles.faceIcon
//                   }>
//                   <Icon
//                     name="camera"
//                     size={20}
//                     color="#fff"
//                   />
//                 </View>

//                 <Text
//                   style={
//                     styles.faceTitle
//                   }>
//                   Capture Selfie
//                 </Text>

//                 <Text
//                   style={
//                     styles.faceSub
//                   }>
//                   Clear selfie with
//                   good lighting
//                 </Text>

//                 <TouchableOpacity
//                   style={
//                     styles.cameraBtn
//                   }
//                   onPress={
//                     handleFaceUpload
//                   }>
//                   <Text
//                     style={
//                       styles.cameraBtnText
//                     }>
//                     Open Camera
//                   </Text>
//                 </TouchableOpacity>

//                 {faceFile && (
//                   <Text
//                     style={
//                       styles.fileName
//                     }>
//                     ✓ Selfie Captured
//                   </Text>
//                 )}

//                 <View
//                   style={
//                     styles.instructions
//                   }>
//                   <Text
//                     style={
//                       styles.instructionText
//                     }>
//                     ✓ Whole face
//                     visible
//                   </Text>

//                   <Text
//                     style={
//                       styles.instructionText
//                     }>
//                     ✓ Neutral
//                     expression
//                   </Text>

//                   <Text
//                     style={
//                       styles.instructionText
//                     }>
//                     ✕ No filters
//                   </Text>
//                 </View>
//               </View>
//             )}

//           {/* Checkbox */}
//           <View
//             style={
//               styles.checkboxRow
//             }>
//             <View
//               style={
//                 styles.checkbox
//               }
//             />

//             <Text
//               style={
//                 styles.checkboxText
//               }>
//               This information is
//               used for identity
//               verification only.
//             </Text>
//           </View>

//           {/* Submit only Other IDs */}
//           {activeTab ===
//             'other' && (
//               <TouchableOpacity
//                 style={
//                   styles.submitBtn
//                 }
//                 onPress={
//                   handleSubmit
//                 }>
//                 <Text
//                   style={
//                     styles.submitBtnText
//                   }>
//                   Submit for Review
//                 </Text>
//               </TouchableOpacity>
//             )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }



import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import styles from '../kycVerify/KYCVerificationStyles';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { pick } from '@react-native-documents/picker';
import { Dropdown } from 'react-native-element-dropdown';

export default function KYCVerification({
  navigation,
}) {
  const [activeTab, setActiveTab] =
    useState('aadhaar');

 const [otherIdType, setOtherIdType] = useState(null);

  const [aadhaarFile,
    setAadhaarFile] =
    useState(null);

  const [panFile,
    setPanFile] =
    useState(null);

  const [otherIdFile,
    setOtherIdFile] =
    useState(null);

  const [faceFile,
    setFaceFile] =
    useState(null);

  const otherIdOptions = [
  {
    label: 'Driving License',
    value: 'Driving License',
  },
  {
    label: 'Voter ID',
    value: 'Voter ID',
  },
  {
    label: 'Passport',
    value: 'Passport',
  },
];

  // =========================
  // Upload Alert
  // =========================

  const handleDocumentUpload =
    () => {
      Alert.alert(
        'Upload Document',
        'Choose file type',
        [
          {
            text: 'Image',
            onPress:
              openImagePicker,
          },
          {
            text: 'PDF',
            onPress:
              openPdfPicker,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    };

  // =========================
  // Save File
  // =========================

  const saveSelectedFile =
    file => {
      // Aadhaar
      if (
        activeTab ===
        'aadhaar'
      ) {
        setAadhaarFile(
          file,
        );

        Alert.alert(
          'Aadhaar Uploaded',
        );

        setTimeout(() => {
          setActiveTab(
            'pan',
          );
        }, 700);
      }

      // PAN
      else if (
        activeTab ===
        'pan'
      ) {
        setPanFile(
          file,
        );

        Alert.alert(
          'PAN Uploaded',
        );

        setTimeout(() => {
          setActiveTab(
            'other',
          );
        }, 700);
      }

      // Other
      else {
        setOtherIdFile(
          file,
        );

        Alert.alert(
          'Other ID Uploaded',
        );
      }
    };

  // =========================
  // Image Picker
  // =========================

  const openImagePicker =
    async () => {
      const response =
        await launchImageLibrary(
          {
            mediaType:
              'photo',
            quality: 0.8,
            selectionLimit: 1,
          },
        );

      if (
        !response.didCancel &&
        response.assets
          ?.length > 0
      ) {
        const asset =
          response.assets[0];

        const file = {
          name:
            asset.fileName,
          type: asset.type,
          uri: asset.uri,
          size:
            asset.fileSize,
        };

        console.log(
          'IMAGE FILE:',
          file,
        );

        saveSelectedFile(
          file,
        );
      }
    };

  // =========================
  // PDF Picker
  // =========================

  const openPdfPicker =
    async () => {
      try {
        const result =
          await pick({
            type: [
              'application/pdf',
            ],
          });

        if (
          result &&
          result.length > 0
        ) {
          const asset =
            result[0];

          const file = {
            name:
              asset.name,
            type: asset.type,
            uri: asset.uri,
            size:
              asset.size,
          };

          console.log(
            'PDF FILE:',
            file,
          );

          saveSelectedFile(
            file,
          );
        }
      } catch (err) {
        console.log(
          'PDF PICKER ERROR:',
          err,
        );
      }
    };

  // =========================
  // Selfie Camera
  // =========================

  const handleFaceUpload =
    () => {
      launchCamera(
        {
          mediaType:
            'photo',
          cameraType:
            'front',
        },
        response => {
          if (
            !response.didCancel &&
            response.assets
          ) {
            setFaceFile(
              response
                .assets[0],
            );

            Alert.alert(
              'Selfie Captured',
            );
          }
        },
      );
    };

  // =========================
  // Submit
  // =========================

 const handleSubmit = () => {
  if (!otherIdType) {
    Alert.alert('Select ID Type');
    return;
  }

  if (!otherIdFile) {
    Alert.alert(`Upload ${otherIdType}`);
    return;
  }

  navigation.navigate('KycUnderReview');
};

  return (
    <SafeAreaView
      style={
        styles.safeArea
      }>
      <StatusBar
        backgroundColor="#120022"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }>
        <View
          style={
            styles.container
          }>
          {/* Header */}

          <View
            style={
              styles.header
            }>
            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }>
              <Icon
                name="chevron-left"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>

            <Text
              style={
                styles.heading
              }>
              Verify your
              identity
            </Text>

            <View
              style={{
                width: 28,
              }}
            />
          </View>

          {/* Description */}

          <Text
            style={
              styles.subText
            }>
            Upload your
            documents to
            complete KYC
            verification.
          </Text>

          {/* Label */}

          <Text
            style={
              styles.label
            }>
            DOCUMENT TYPE
          </Text>

          {/* Tabs */}

          <View
            style={
              styles.tabContainer
            }>
            {/* Aadhaar */}

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab ===
                  'aadhaar' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setActiveTab(
                  'aadhaar',
                )
              }>
              <Text
                style={[
                  styles.tabText,
                  activeTab ===
                    'aadhaar' &&
                    styles.activeTabText,
                ]}>
                Aadhaar
              </Text>
            </TouchableOpacity>

            {/* PAN */}

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab ===
                  'pan' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setActiveTab(
                  'pan',
                )
              }>
              <Text
                style={[
                  styles.tabText,
                  activeTab ===
                    'pan' &&
                    styles.activeTabText,
                ]}>
                PAN Card
              </Text>
            </TouchableOpacity>

            {/* Other */}

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab ===
                  'other' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setActiveTab(
                  'other',
                )
              }>
              <Text
                style={[
                  styles.tabText,
                  activeTab ===
                    'other' &&
                    styles.activeTabText,
                ]}>
                Other ID's
              </Text>
            </TouchableOpacity>
          </View>

       

          {/* {activeTab ===
            'other' && (
              <TextInput
                placeholder="Voter ID / Passport / Driving License"
                placeholderTextColor="#B9A8D4"
                value={
                  otherIdText
                }
                onChangeText={
                  setOtherIdText
                }
                style={
                  styles.inputBox
                }
              />
            )} */}


{activeTab === 'other' && (
  <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.dropdownPlaceholder}
    selectedTextStyle={styles.dropdownSelectedText}
    data={otherIdOptions}
    labelField="label"
    valueField="value"
    placeholder="Select ID Type"
    value={otherIdType}
    onChange={item => {
      // remove old uploaded file
      setOtherIdFile(null);

      // set new selected type
      setOtherIdType(item.value);
    }}
  />
)}
        

          <TouchableOpacity
            style={
              styles.uploadBox
            }
            activeOpacity={
              0.8
            }
            onPress={
              handleDocumentUpload
            }>
            <View
              style={
                styles.uploadIcon
              }>
              <Icon
                name="upload"
                size={22}
                color="#fff"
              />
            </View>

            <Text
              style={
                styles.uploadTitle
              }>
              {activeTab ===
              'aadhaar'
                ? 'Upload Aadhaar Card'
                : activeTab ===
                    'pan'
                  ? 'Upload PAN Card'
                  : `Upload ${otherIdType || 'Other ID'}`}
            </Text>

            <Text
              style={
                styles.uploadInfo
              }>
              JPG, PNG or PDF
              • Max 5MB
            </Text>

            {/* Aadhaar */}

            {activeTab ===
              'aadhaar' &&
              aadhaarFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓{' '}
                  {
                    aadhaarFile.name
                  }
                </Text>
              )}

            {/* PAN */}

            {activeTab ===
              'pan' &&
              panFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓{' '}
                  {panFile.name}
                </Text>
              )}

            {/* Other */}

            {activeTab ===
              'other' &&
              otherIdFile && (
                <Text
                  style={
                    styles.fileName
                  }>
                  ✓{' '}
                  {
                    otherIdFile.name
                  }
                </Text>
              )}
          </TouchableOpacity>

          {/* Selfie */}

          {activeTab ===
            'aadhaar' && (
              <View
                style={
                  styles.faceBox
                }>
                <View
                  style={
                    styles.faceIcon
                  }>
                  <Icon
                    name="camera"
                    size={20}
                    color="#fff"
                  />
                </View>

                <Text
                  style={
                    styles.faceTitle
                  }>
                  Capture
                  Selfie
                </Text>

                <Text
                  style={
                    styles.faceSub
                  }>
                  Clear selfie
                  with good
                  lighting
                </Text>

                <TouchableOpacity
                  style={
                    styles.cameraBtn
                  }
                  onPress={
                    handleFaceUpload
                  }>
                  <Text
                    style={
                      styles.cameraBtnText
                    }>
                    Open Camera
                  </Text>
                </TouchableOpacity>

                {faceFile && (
                  <Text
                    style={
                      styles.fileName
                    }>
                    ✓ Selfie
                    Captured
                  </Text>
                )}

                <View
                  style={
                    styles.instructions
                  }>
                  <Text
                    style={
                      styles.instructionText
                    }>
                    ✓  Take a selfie of yourself with a neutral expression
                  </Text>

                  <Text
                    style={
                      styles.instructionText
                    }>
                    ✓  Make sure your whole face is visible, centred, and your eyes are open
                  </Text>

                  <Text
                    style={
                      styles.instructionText
                    }>
                    ✕  Do not crop your ID or screenshots of your ID
                  </Text>

                   <Text
                    style={
                      styles.instructionText
                    }>
                    ✕  Do not hide or alter parts of your face ( No hats/ beauty images/ filters/ headgear )
                  </Text>
                </View>
              </View>
            )}

          {/* Info */}

          <View
            style={
              styles.checkboxRow
            }>
            <View
              style={
                styles.checkbox
              }
            />

            <Text
              style={
                styles.checkboxText
              }>
              This
              information is
              used for
              identity
              verification
              only.
            </Text>
          </View>

          {/* Submit */}

          {activeTab ===
            'other' && (
              <TouchableOpacity
                style={
                  styles.submitBtn
                }
                onPress={
                  handleSubmit
                }>
                <Text
                  style={
                    styles.submitBtnText
                  }>
                  Submit for
                  Review
                </Text>
              </TouchableOpacity>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}