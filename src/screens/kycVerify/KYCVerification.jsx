




// import React, { useEffect, useState } from 'react';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Alert,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';

// import styles from '../kycVerify/KYCVerificationStyles';

// import {
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';

// import { pick } from '@react-native-documents/picker';
// import { Dropdown } from 'react-native-element-dropdown';
// import api, { getToken } from '../../api/axios';
// import RNFS from 'react-native-fs';


// export default function KYCVerification({
//   navigation,
// }) {
//   const [activeTab, setActiveTab] = useState('aadhaar');
//   const [otherIdType, setOtherIdType] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [aadhaarFile, setAadhaarFile] = useState(null);
//   const [panFile, setPanFile] = useState(null);
//   const [otherIdFile, setOtherIdFile] = useState(null);
//   const [faceFile, setFaceFile] = useState(null);
//   const [token, setToken] = useState("")

//   const otherIdOptions = [
//     { label: 'Driving License', value: 'Driving License' },
//     { label: 'Voter ID', value: 'Voter ID' },
//     { label: 'Passport', value: 'Passport' },
//   ];



//   const handleDocumentUpload = () => {
//     Alert.alert('Upload Document', 'Choose file type', [
//       { text: 'Image', onPress: openImagePicker },
//       { text: 'PDF', onPress: openPdfPicker },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   useEffect(() => {
//     const fetchToken = async () => {
//       const storedToken = await getToken();
//       setToken(storedToken);
//     };

//     fetchToken();
//   }, []);




//   const saveSelectedFile = file => {
//     if (activeTab === 'aadhaar') {
//       setAadhaarFile(file);
//       Alert.alert('Aadhaar Uploaded');
//       setTimeout(() => {
//         setActiveTab('pan');
//       }, 700);
//     } else if (activeTab === 'pan') {
//       setPanFile(file);
//       Alert.alert('PAN Uploaded');
//       setTimeout(() => {
//         setActiveTab('other');
//       }, 700);
//     } else {
//       setOtherIdFile(file);
//       Alert.alert('Other ID Uploaded');
//     }
//   };



//   const openImagePicker = async () => {
//     const response = await launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//       selectionLimit: 1,
//     });

//     if (!response.didCancel && response.assets?.length > 0) {
//       const asset = response.assets[0];
//       const file = {
//         name: asset.fileName,
//         type: asset.type,
//         uri: asset.uri,
//         size: asset.fileSize,
//       };
//       console.log('IMAGE FILE:', file);
//       saveSelectedFile(file);
//     }
//   };


//   const openPdfPicker = async () => {
//     try {
//       const result = await pick({
//         type: ['application/pdf'],
//       });

//       if (result && result.length > 0) {
//         const asset = result[0];
//         const file = {
//           name: asset.name,
//           type: asset.type,
//           uri: asset.uri,
//           size: asset.size,
//         };
//         console.log('PDF FILE:', file);
//         saveSelectedFile(file);
//       }
//     } catch (err) {
//       console.log('PDF PICKER ERROR:', err);
//     }
//   };


//   const handleFaceUpload = () => {
//     launchCamera(
//       {
//         mediaType: 'photo',
//         cameraType: 'front',
//       },
//       response => {
//         if (!response.didCancel && response.assets) {
//           setFaceFile(response.assets[0]);
//           Alert.alert('Selfie Captured');
//         }
//       },
//     );
//   };


//   const uploadAadhar = async () => {
//     try {
//       // Read Aadhaar file as Base64
//       const aadharBase64 = await RNFS.readFile(
//         aadhaarFile?.uri,
//         'base64'
//       );

//       const selfieBase64 = await RNFS.readFile(
//         faceFile?.uri,
//         'base64'
//       );
//       console.log(aadhaarFile?.uri, "5656");

//       const payload = {
//         aadharFront: `data:${aadhaarFile?.type};base64,${aadharBase64}`,
//         // selfie: `data:${faceFile.type};base64,${selfieBase64}`,
//         selfie: `data:${aadhaarFile.type};base64,${aadharBase64}`,

//       };

//       console.log('Payload:', payload);

//       const response = await api?.post(
//         '/api/kyc/upload-aadhar-documents',
//         payload
//       );

//       console.log('Upload Response:', response.data);

//       return response?.data;
//     } catch (error) {
//       console.log('Upload Error:', error);
//       throw error;
//     }
//   };

//   const uploadPan = async () => {
//     try {
//       const panBase64 = await RNFS.readFile(
//         panFile?.uri,
//         'base64'
//       );


//       console.log(panFile?.uri, 'PAN URI');

//       const payload = {
//         panCard: `data:${panFile?.type};base64,${panBase64}`,
//       };

//       console.log('PAN Payload:', payload);

//       const response = await api.post(
//         '/api/kyc/upload-pan-documents',
//         payload
//       );

//       console.log('PAN Upload Response:', response.data);

//       return response.data;
//     } catch (error) {
//       console.error('PAN Upload Error:', error);
//       throw error;
//     }
//   };

//   const uploadPassport = async () => {
//     try {
//       const passportBase64 = await RNFS.readFile(
//         otherIdFile?.uri,
//         'base64'
//       );


//       console.log(otherIdFile?.uri, 'PASSPORT URI');

//       const payload = {
//         passport: `data:${otherIdFile?.type};base64,${passportBase64}`,
//       };

//       console.log('Passport Payload:', payload);

//       const response = await api.post(
//         '/api/kyc/upload-passport-documents',
//         payload
//       );

//       console.log('Passport Upload Response:', response.data);

//       return response.data;
//     } catch (error) {
//       console.error('Passport Upload Error:', error);
//       throw error;
//     }
//   };

//   const submitForReview = async () => {

//     const payload = {
//       token: token
//     }
//     const response = await api.post(
//       '/api/kyc/submit-for-review',
//       payload
//     );
//   }

//   const handleSubmit = async () => {

//     // Validation checks
//     if (!otherIdType) {
//       Alert.alert('Select ID Type', 'Please select an ID type');
//       return;
//     }

//     if (!otherIdFile) {
//       Alert.alert(`Upload ${otherIdType}`, `Please upload your ${otherIdType}`);
//       return;
//     }

//     if (!faceFile) {
//       Alert.alert('Selfie Required', 'Please capture your selfie');
//       return;
//     }

//     if (!aadhaarFile) {
//       Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
//       return;
//     }

//     if (!panFile) {
//       Alert.alert('PAN Card Required', 'Please upload your PAN card');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Upload all documents sequentially
//       console.log('Starting Aadhar upload...');
//       await uploadAadhar();

//       console.log('Starting PAN upload...');
//       await uploadPan();

//       console.log('Starting Other ID upload...');
//       await uploadPassport();
//       await submitForReview();

//       // All uploads successful
//       Alert.alert('Success', 'All documents uploaded successfully', [
//         { text: 'OK', onPress: () => navigation.navigate('KycUnderReview') }
//       ]);

//     } catch (error) {
//       console.log('Upload Error:', error);
//       Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#120022" barStyle="light-content" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Icon name="chevron-left" size={28} color="#fff" />
//             </TouchableOpacity>

//             <Text style={styles.heading}>Verify your identity</Text>

//             <View style={{ width: 28 }} />
//           </View>

//           {/* Description */}
//           <Text style={styles.subText}>
//             Upload your documents to complete KYC verification.
//           </Text>

//           {/* Label */}
//           <Text style={styles.label}>DOCUMENT TYPE</Text>

//           {/* Tabs */}
//           <View style={styles.tabContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab === 'aadhaar' && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab('aadhaar')}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'aadhaar' && styles.activeTabText,
//                 ]}>
//                 Aadhaar
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab === 'pan' && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab('pan')}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'pan' && styles.activeTabText,
//                 ]}>
//                 PAN Card
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.tabButton,
//                 activeTab === 'other' && styles.activeTab,
//               ]}
//               onPress={() => setActiveTab('other')}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'other' && styles.activeTabText,
//                 ]}>
//                 Other ID's
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Other ID Dropdown */}
//           {activeTab === 'other' && (
//             <Dropdown
//               style={styles.dropdown}
//               placeholderStyle={styles.dropdownPlaceholder}
//               selectedTextStyle={styles.dropdownSelectedText}
//               data={otherIdOptions}
//               labelField="label"
//               valueField="value"
//               placeholder="Select ID Type"
//               value={otherIdType}
//               onChange={item => {
//                 setOtherIdFile(null);
//                 setOtherIdType(item.value);
//               }}
//             />
//           )}

//           {/* Upload Box */}
//           <TouchableOpacity
//             style={styles.uploadBox}
//             activeOpacity={0.8}
//             onPress={handleDocumentUpload}>
//             <View style={styles.uploadIcon}>
//               <Icon name="upload" size={22} color="#fff" />
//             </View>

//             <Text style={styles.uploadTitle}>
//               {activeTab === 'aadhaar'
//                 ? 'Upload Aadhaar Card'
//                 : activeTab === 'pan'
//                   ? 'Upload PAN Card'
//                   : `Upload ${otherIdType || 'Other ID'}`}
//             </Text>

//             <Text style={styles.uploadInfo}>JPG, PNG or PDF • Max 5MB</Text>

//             {/* File display */}
//             {activeTab === 'aadhaar' && aadhaarFile && (
//               <Text style={styles.fileName}>✓ {aadhaarFile.name}</Text>
//             )}

//             {activeTab === 'pan' && panFile && (
//               <Text style={styles.fileName}>✓ {panFile.name}</Text>
//             )}

//             {activeTab === 'other' && otherIdFile && (
//               <Text style={styles.fileName}>✓ {otherIdFile.name}</Text>
//             )}
//           </TouchableOpacity>

//           {/* Selfie Section */}
//           {activeTab === 'aadhaar' && (
//             <View style={styles.faceBox}>
//               <View style={styles.faceIcon}>
//                 <Icon name="camera" size={20} color="#fff" />
//               </View>

//               <Text style={styles.faceTitle}>Capture Selfie</Text>

//               <Text style={styles.faceSub}>Clear selfie with good lighting</Text>

//               <TouchableOpacity style={styles.cameraBtn} onPress={handleFaceUpload}>
//                 <Text style={styles.cameraBtnText}>Open Camera</Text>
//               </TouchableOpacity>

//               {faceFile && <Text style={styles.fileName}>✓ Selfie Captured</Text>}

//               <View style={styles.instructions}>
//                 <Text style={styles.instructionText}>
//                   ✓ Take a selfie of yourself with a neutral expression
//                 </Text>

//                 <Text style={styles.instructionText}>
//                   ✓ Make sure your whole face is visible, centred, and your eyes are open
//                 </Text>

//                 <Text style={styles.instructionText}>
//                   ✕ Do not crop your ID or screenshots of your ID
//                 </Text>

//                 <Text style={styles.instructionText}>
//                   ✕ Do not hide or alter parts of your face (No hats/ beauty images/ filters/ headgear)
//                 </Text>
//               </View>
//             </View>
//           )}

//           {/* Info */}
//           <View style={styles.checkboxRow}>
//             <View style={styles.checkbox} />
//             <Text style={styles.checkboxText}>
//               This information is used for identity verification only.
//             </Text>
//           </View>

//           {/* Submit Button */}
//           {activeTab === 'other' && (
//             <TouchableOpacity
//               style={[styles.submitBtn, isLoading && { opacity: 0.7 }]}
//               onPress={handleSubmit}
//               disabled={isLoading}>
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.submitBtnText}>Submit for Review</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import styles from '../kycVerify/KYCVerificationStyles';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { pick } from '@react-native-documents/picker';
import { Dropdown } from 'react-native-element-dropdown';
import api, { getToken } from '../../api/axios';
import RNFS from 'react-native-fs';

export default function KYCVerification({
  navigation,
}) {
  const [activeTab, setActiveTab] = useState('aadhaar');
  const [isLoading, setIsLoading] = useState(false);

  // Document states
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [faceFile, setFaceFile] = useState(null);

  // New document states
  const [passbookFile, setPassbookFile] = useState(null);
  const [chequeFile, setChequeFile] = useState(null);
  const [statementFile, setStatementFile] = useState(null);

  // Kept state for compatibility with untouched API integrations
  const [otherIdFile, setOtherIdFile] = useState(null);
  const [token, setToken] = useState("");

  const handleDocumentUpload = () => {
    // Force PDF picker for the newly added bank buttons
    // if (activeTab === 'passbook' || activeTab === 'cheque' || activeTab === 'statement') {
    //   openPdfPicker();
    // } else {
      Alert.alert('Upload Document', 'Choose file type', [
        { text: 'Image', onPress: openImagePicker },
        { text: 'PDF', onPress: openPdfPicker },
        { text: 'Cancel', style: 'cancel' },
      ]);
    // }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  const saveSelectedFile = file => {
    if (activeTab === 'aadhaar') {
      setAadhaarFile(file);
      Alert.alert('Aadhaar Uploaded');
      setTimeout(() => {
        setActiveTab('pan');
      }, 700);
    } else if (activeTab === 'pan') {
      setPanFile(file);
      Alert.alert('PAN Uploaded');
      setTimeout(() => {
        setActiveTab('passbook');
      }, 700);
    } else if (activeTab === 'passbook') {
      setPassbookFile(file);
      Alert.alert('Passbook Uploaded');
      setTimeout(() => {
        setActiveTab('cheque');
      }, 700);
    } else if (activeTab === 'cheque') {
      setChequeFile(file);
      Alert.alert('Cancelled Cheque Uploaded');
      setTimeout(() => {
        setActiveTab('statement');
      }, 700);
    } else if (activeTab === 'statement') {
      setStatementFile(file);
      Alert.alert('Bank Statement Uploaded');
    }
  };

  const openImagePicker = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (!response.didCancel && response.assets?.length > 0) {
      const asset = response.assets[0];
      const file = {
        name: asset.fileName,
        type: asset.type,
        uri: asset.uri,
        size: asset.fileSize,
      };
      console.log('IMAGE FILE:', file);
      saveSelectedFile(file);
    }
  };

  const openPdfPicker = async () => {
    try {
      const result = await pick({
        type: ['application/pdf'],
      });

      if (result && result.length > 0) {
        const asset = result[0];
        const file = {
          name: asset.name,
          type: asset.type,
          uri: asset.uri,
          size: asset.size,
        };
        console.log('PDF FILE:', file);
        saveSelectedFile(file);
      }
    } catch (err) {
      console.log('PDF PICKER ERROR:', err);
    }
  };

  // --- NEW PERMISSION BASED CAMERA HANDLER ---
  const handleFaceUpload = async () => {
    try {
      // 1. Ask the user for permission at runtime
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "We need access to your camera to capture your selfie for KYC.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      // 2. If they say yes, open the camera
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            mediaType: 'photo',
            cameraType: 'front',
          },
          response => {
            if (response.didCancel) {
              console.log('User cancelled camera picker');
              return;
            }

            if (response.errorCode) {
              Alert.alert('Camera Error', response.errorMessage);
              return;
            }

            if (response.assets && response.assets.length > 0) {
              setFaceFile(response.assets[0]);
              Alert.alert('Selfie Captured');
            }
          },
        );
      } else {
        Alert.alert("Permission Denied", "You need to allow camera access to take a selfie.");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // -------------------------------------------

  const uploadAadhar = async () => {
    try {
      // Read Aadhaar file as Base64
      const aadharBase64 = await RNFS.readFile(
        aadhaarFile?.uri,
        'base64'
      );

      const selfieBase64 = await RNFS.readFile(
        faceFile?.uri,
        'base64'
      );
      console.log(aadhaarFile?.uri, "5656");

      const payload = {
        aadharFront: `data:${aadhaarFile?.type};base64,${aadharBase64}`,
        selfie: `data:${faceFile.type};base64,${selfieBase64}`,
      };

      console.log('Payload:', payload);

      const response = await api.post(
        '/api/kyc/upload-aadhar-documents',
        payload
      );

      console.log('Upload Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  };

  const uploadPan = async () => {
    try {
      const panBase64 = await RNFS.readFile(
        panFile?.uri,
        'base64'
      );

      console.log(panFile?.uri, 'PAN URI');

      const payload = {
        panCard: `data:${panFile?.type};base64,${panBase64}`,
      };

      console.log('PAN Payload:', payload);

      const response = await api.post(
        '/api/kyc/upload-pan-documents',
        payload
      );

      console.log('PAN Upload Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('PAN Upload Error:', error);
      throw error;
    }
  };

  const uploadPassport = async () => {
    try {
      const passportBase64 = await RNFS.readFile(
        otherIdFile?.uri,
        'base64'
      );

      console.log(otherIdFile?.uri, 'PASSPORT URI');

      const payload = {
        passport: `data:${otherIdFile?.type};base64,${passportBase64}`,
      };

      console.log('Passport Payload:', payload);

      const response = await api.post(
        '/api/kyc/upload-passport-documents',
        payload
      );

      console.log('Passport Upload Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Passport Upload Error:', error);
      throw error;
    }
  };

  const uploadPassbook = async () => {
    try {
      const passbookBase64 = await RNFS.readFile(
        passbookFile?.uri,
        'base64'
      );

      const payload = {
        passbook: `data:${passbookFile?.type};base64,${passbookBase64}`,
      };

      console.log('Passbook Payload:', payload);

      const response = await api.post(
        '/api/kyc/upload-passbook-documents',
        payload
      );

      console.log('Passbook Upload Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Passbook Upload Error:', error);
      throw error;
    }
  };

  const uploadCheque = async () => {
    try {
      const chequeBase64 = await RNFS.readFile(
        chequeFile?.uri,
        'base64'
      );

      const payload = {
        cheque: `data:${chequeFile?.type};base64,${chequeBase64}`,
      };

      console.log('Cheque Payload:', payload);

      const response = await api.post(
        '/api/kyc/upload-cheque-documents',
        payload
      );

      console.log('Cheque Upload Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Cheque Upload Error:', error);
      throw error;
    }
  };

  const uploadStatement = async () => {
    try {
      const statementBase64 = await RNFS.readFile(
        statementFile?.uri,
        'base64'
      );

      const payload = {
        statement: `data:${statementFile?.type};base64,${statementBase64}`,
      };

      console.log('Statement Payload:', payload);

      const response = await api.post(
        '/api/kyc/upload-statement-documents',
        payload
      );

      console.log('Statement Upload Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Statement Upload Error:', error);
      throw error;
    }
  };

  const submitForReview = async () => {
    const payload = {
      token: token
    }
    const response = await api.post(
      '/api/kyc/submit-for-review',
      payload
    );
  }

  const handleSubmit = async () => {
  
    if (!aadhaarFile) {
      Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
      return;
    }

    if (!panFile) {
      Alert.alert('PAN Card Required', 'Please upload your PAN card');
      return;
    }

    if (!passbookFile) {
      Alert.alert('Passbook Required', 'Please upload your Bank Passbook');
      return;
    }

    if (!chequeFile) {
      Alert.alert('Cheque Required', 'Please upload your Cancelled Cheque');
      return;
    }

    if (!statementFile) {
      Alert.alert('Statement Required', 'Please upload your Bank Statement');
      return;
    }

    if (!faceFile) {
      Alert.alert('Selfie Required', 'Please capture your selfie');
      return;
    }

    setIsLoading(true);

    // try {
    //   // Upload existing API documents sequentially
    //   console.log('Starting Aadhar upload...');
    //   await uploadAadhar();

    //   console.log('Starting PAN upload...');
    //   await uploadPan();

    //   // Included safety check in case otherIdFile wasn't populated but api call was kept as requested
    //   if (otherIdFile) {
    //      console.log('Starting Other ID upload...');
    //      await uploadPassport();
    //   }

    //   await submitForReview();

    //   // All uploads successful
    //   Alert.alert('Success', 'All documents uploaded successfully', [
    //     { text: 'OK', onPress: () => navigation.navigate('KycUnderReview') }
    //   ]);

    // }

    try {
      console.log('Starting Aadhar upload...');
      await uploadAadhar();

      console.log('Starting PAN upload...');
      await uploadPan();

      console.log('Starting Passbook upload...');
      await uploadPassbook();

      console.log('Starting Cancelled Cheque upload...');
      await uploadCheque();

      console.log('Starting Bank Statement upload...');
      await uploadStatement();

      await submitForReview();

      Alert.alert(
        'Success',
        'All documents uploaded successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('KycUnderReview'),
          },
        ],
      );
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert(
        'Upload Failed',
        error.message || 'Failed to upload documents. Please try again.',
      );
    }

    // catch (error) {
    //   console.error('Upload Error:', error);
    //   Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
    // } 
    finally {
      setIsLoading(false);
    }
  };

  // Helper function to render correct upload box title
  const getUploadTitle = () => {
    if (activeTab === 'aadhaar') return 'Upload Aadhaar Card';
    if (activeTab === 'pan') return 'Upload PAN Card';
    if (activeTab === 'passbook') return 'Upload Bank Passbook';
    if (activeTab === 'cheque') return 'Upload Cancelled Cheque';
    if (activeTab === 'statement') return 'Upload Bank Statement';
    return 'Upload Document';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#120022" barStyle="light-content" />


      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.heading}>Verify your identity</Text>

          <View style={{ width: 28 }} />
        </View>

        {/* Description */}
        <Text style={styles.subText}>
          Upload your documents to complete KYC verification.
        </Text>

        {/* Label */}
        <Text style={styles.label}>DOCUMENT TYPE</Text>

        {/* Tabs - Now aligned horizontally with scrolling to fit 5 buttons */}
        {/* <View>
            <ScrollView 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 }}
            >
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'aadhaar' && styles.activeTab,
                  { minWidth: 130, paddingHorizontal: 20 } // Increased Width
                ]}
                onPress={() => setActiveTab('aadhaar')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'aadhaar' && styles.activeTabText,
                  ]}>
                  Aadhaar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'pan' && styles.activeTab,
                  { minWidth: 130, paddingHorizontal: 20 } // Increased Width
                ]}
                onPress={() => setActiveTab('pan')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'pan' && styles.activeTabText,
                  ]}>
                  PAN Card
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'passbook' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('passbook')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'passbook' && styles.activeTabText,
                  ]}>
                  Bank Passbook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'cheque' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('cheque')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'cheque' && styles.activeTabText,
                  ]}>
                  Cancelled Cheque
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'statement' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('statement')}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'statement' && styles.activeTabText,
                  ]}>
                  Bank Statements
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View> */}


        {/* Document Type Buttons */}

        {/* First Row */}
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'aadhaar' && styles.activeTab,
              { flex: 1, marginRight: 5 },
            ]}
            onPress={() => setActiveTab('aadhaar')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'aadhaar' && styles.activeTabText,
              ]}>
              Aadhaar Card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'pan' && styles.activeTab,
              { flex: 1, marginLeft: 5 },
            ]}
            onPress={() => setActiveTab('pan')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'pan' && styles.activeTabText,
              ]}>
              PAN Card
            </Text>
          </TouchableOpacity>
        </View>

        {/* Second Row */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'passbook' && styles.activeTab,
              { flex: 1, marginRight: 5 },
            ]}
            onPress={() => setActiveTab('passbook')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'passbook' && styles.activeTabText,
              ]}>
              Passbook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'cheque' && styles.activeTab,
              { flex: 1, marginHorizontal: 5 },
            ]}
            onPress={() => setActiveTab('cheque')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'cheque' && styles.activeTabText,
              ]}>
              Cancel Cheque
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'statement' && styles.activeTab,
              { flex: 1, marginLeft: 5 },
            ]}
            onPress={() => setActiveTab('statement')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'statement' && styles.activeTabText,
              ]}>
              Statement
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upload Box */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.uploadBox}
            activeOpacity={0.8}
            onPress={handleDocumentUpload}>
            <View style={styles.uploadIcon}>
              <Icon name="upload" size={22} color="#fff" />
            </View>

            <Text style={styles.uploadTitle}>
              {getUploadTitle()}
            </Text>

            <Text style={styles.uploadInfo}>
              {(activeTab === 'passbook' || activeTab === 'cheque' || activeTab === 'statement')
                ? 'PDF Only • Max 5MB'
                : 'JPG, PNG or PDF • Max 5MB'}
            </Text>

            {/* File displays */}
            {activeTab === 'aadhaar' && aadhaarFile && (
              <Text style={styles.fileName}>✓ {aadhaarFile.name}</Text>
            )}

            {activeTab === 'pan' && panFile && (
              <Text style={styles.fileName}>✓ {panFile.name}</Text>
            )}

            {activeTab === 'passbook' && passbookFile && (
              <Text style={styles.fileName}>✓ {passbookFile.name}</Text>
            )}

            {activeTab === 'cheque' && chequeFile && (
              <Text style={styles.fileName}>✓ {chequeFile.name}</Text>
            )}

            {activeTab === 'statement' && statementFile && (
              <Text style={styles.fileName}>✓ {statementFile.name}</Text>
            )}
          </TouchableOpacity>

          {/* Selfie Section */}
          {activeTab === 'aadhaar' && (
            <View style={styles.faceBox}>
              <View style={styles.faceIcon}>
                <Icon name="camera" size={20} color="#fff" />
              </View>

              <Text style={styles.faceTitle}>Capture Selfie</Text>

              <Text style={styles.faceSub}>Clear selfie with good lighting</Text>

              <TouchableOpacity style={styles.cameraBtn} onPress={handleFaceUpload}>
                <Text style={styles.cameraBtnText}>Open Camera</Text>
              </TouchableOpacity>

              {faceFile && <Text style={styles.fileName}>✓ Selfie Captured</Text>}

              {/* <View style={styles.instructions}>
                <Text style={styles.instructionText}>
                  ✓ Take a selfie of yourself with a neutral expression
                </Text>

                <Text style={styles.instructionText}>
                  ✓ Make sure your whole face is visible, centred, and your eyes are open
                </Text>

                <Text style={styles.instructionText}>
                  ✕ Do not crop your ID or screenshots of your ID
                </Text>

                <Text style={styles.instructionText}>
                  ✕ Do not hide or alter parts of your face (No hats/ beauty images/ filters/ headgear)
                </Text>
              </View> */}

              <View style={styles.instructions}>
                <View style={styles.pointRow}>
                  <Text style={styles.bullet}>✓</Text>
                  <Text style={styles.instructionText}>
                    Take a selfie of yourself with a neutral expression
                  </Text>
                </View>

                <View style={styles.pointRow}>
                  <Text style={styles.bullet}>✓</Text>
                  <Text style={styles.instructionText}>
                    Make sure your whole face is visible, centred, and your eyes are open
                  </Text>
                </View>

                <View style={styles.pointRow}>
                  <Text style={styles.bullet}>✕</Text>
                  <Text style={styles.instructionText}>
                    Do not crop your ID or screenshots of your ID
                  </Text>
                </View>

                <View style={styles.pointRow}>
                  <Text style={styles.bullet}>✕</Text>
                  <Text style={styles.instructionText}>
                    Do not hide or alter parts of your face (No hats, beauty images, filters, or headgear)
                  </Text>
                </View>
              </View>
            </View>
          )}

        </ScrollView>

        {/* Info */}
        {/* <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text style={styles.checkboxText}>
              This information is used for identity verification only.
            </Text>
          </View> */}

        {/* Submit Button - Shown on the last tab */}
        {activeTab === 'statement' && (
          <TouchableOpacity
            style={[styles.submitBtn, isLoading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitBtnText}>Submit for Review</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
