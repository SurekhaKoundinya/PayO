// import React, { useEffect } from 'react';

// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';

// import styles from '../kycVerify/KycUnderReviewStyles';

// export default function KycUnderReview({
//   navigation,
// }) {

//   // Auto Navigate After 5 Seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace(
//         'KycFail',
//       );
//     }, 5000);

//     return () =>
//       clearTimeout(timer);
//   }, []);

//   return (
//     <SafeAreaView
//       style={styles.safeArea}>
//       <StatusBar
//         backgroundColor="#120022"
//         barStyle="light-content"
//       />

//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.goBack()
//             }>
//             <Icon
//               name="chevron-left"
//               size={28}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Circle Loader */}
//         <View style={styles.loaderWrapper}>
//           <View style={styles.loaderOuter}>
//             <View style={styles.loaderInner} />
//           </View>

//           <Text style={styles.kycText}>
//             • KYC Submitted
//           </Text>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>
//           Under Review
//         </Text>

//         {/* Subtitle */}
//         <Text style={styles.subTitle}>
//           Documents submitted.
//           Our team is verifying
//           documents.
//         </Text>

//         {/* Status Card */}
//         <View style={styles.card}>

//           {/* Row 1 */}
//           <View style={styles.row}>
//             <Text style={styles.leftText}>
//               • Account Created
//             </Text>

//             <Text
//               style={
//                 styles.completedText
//               }>
//               Completed
//             </Text>
//           </View>

//           {/* Row 2 */}
//           <View style={styles.row}>
//             <Text style={styles.leftText}>
//               • Documents Uploaded
//             </Text>

//             <Text
//               style={
//                 styles.completedText
//               }>
//               Completed
//             </Text>
//           </View>

//           {/* Row 3 */}
//           <View style={styles.row}>
//             <Text style={styles.leftText}>
//               • KYC Verification
//             </Text>

//             <Text
//               style={
//                 styles.pendingText
//               }>
//               Pending
//             </Text>
//           </View>

//           {/* Row 4 */}
//           <View style={styles.row}>
//             <Text style={styles.leftText}>
//               • Wallet Activated
//             </Text>

//             <Text
//               style={
//                 styles.pendingText
//               }>
//               Pending
//             </Text>
//           </View>

//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }



import React, { useEffect } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import styles from '../kycVerify/KycUnderReviewStyles';

export default function KycUnderReview({
  navigation,
}) {

  // Change this value
  // true = success
  // false = fail
  const isKycApproved = true;

  // Auto Navigate After 5 Seconds
  useEffect(() => {
    const timer = setTimeout(() => {

      // Success Screen
      if (isKycApproved) {
        navigation.replace(
          'KycComplete',
        );
      }

      // Fail Screen
      else {
        navigation.replace(
          'KycFail',
        );
      }

    }, 5000);

    return () =>
      clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}>
      <StatusBar
        backgroundColor="#120022"
        barStyle="light-content"
      />

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
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
        </View>

        {/* Circle Loader */}
        <View style={styles.loaderWrapper}>
          <View style={styles.loaderOuter}>
            <View style={styles.loaderInner} />
          </View>

          <Text style={styles.kycText}>
            • KYC Submitted
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Under Review
        </Text>

        {/* Subtitle */}
        <Text style={styles.subTitle}>
          Documents submitted.
          Our team is verifying
          documents.
        </Text>

        {/* Status Card */}
        <View style={styles.card}>

          {/* Row 1 */}
          <View style={styles.row}>
            <Text style={styles.leftText}>
              • Account Created
            </Text>

            <Text
              style={
                styles.completedText
              }>
              Completed
            </Text>
          </View>

          {/* Row 2 */}
          <View style={styles.row}>
            <Text style={styles.leftText}>
              • Documents Uploaded
            </Text>

            <Text
              style={
                styles.completedText
              }>
              Completed
            </Text>
          </View>

          {/* Row 3 */}
          <View style={styles.row}>
            <Text style={styles.leftText}>
              • KYC Verification
            </Text>

            <Text
              style={
                styles.pendingText
              }>
              Pending
            </Text>
          </View>

          {/* Row 4 */}
          <View style={styles.row}>
            <Text style={styles.leftText}>
              • Wallet Activated
            </Text>

            <Text
              style={
                styles.pendingText
              }>
              Pending
            </Text>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}