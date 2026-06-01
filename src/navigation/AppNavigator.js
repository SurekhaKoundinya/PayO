// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// /* AUTH */
// import SplashScreen from '../screens/SplashScreen';
// import AnimationScreen from '../screens/AnimationScreen';
// //import WelcomeScreen from '../screens/WelcomeScreen';
// import Onboarding1 from '../screens/Onboarding1';
// import Onboarding2 from '../screens/Onboarding2';
// import Onboarding3 from '../screens/Onboarding3';
// //import Onboarding4 from '../screens/Onboarding4';

// import LoginScreen from '../screens/LoginScreen';
// import RegisterMobileScreen from '../screens/RegisterMobileScreen';
// import OtpVerificationScreen from '../screens/OtpVerificationScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import TransactionPinScreen from '../screens/TransactionPinScreen';
// import EnterAmountScreen from '../screens/HomeScreen/EnterAmountScreen';
// import SendPinScreen from '../screens/HomeScreen/SendPinScreen';
// import ReviewTransferScreen from '../screens/HomeScreen/ReviewTransferScreen';
// import ReferEarn from '../screens/HomeScreen/ReferEarn';
// import TransactionDetailScreen from '../screens/HomeScreen/TransactionDetailScreen';
// import NotificationScreen from '../screens/HomeScreen/NotificationScreen';
// import ForgotPassword from '../screens/ForgotPasswordScreen';



// /* ✅ IMPORT BOTTOM TABS */
// import BottomTabs from '../screens/components/BottomTabs';

// /* SCAN + RECEIVE */
// import ScanQRScreen from '../screens/ScanQRScreen';
// import Receive from '../screens/Receive';

// /* PAYMENT FLOW */
// import EnterAddressScreen from '../screens/HomeScreen/enterAddress';


// import PaymentLoading from '../screens/HomeScreen/loadingScreen';
// import PaymentSuccess from '../screens/HomeScreen/successTokenScreen';
// import SendScreen from '../screens/components/sendScreen';
// import BottomNav from '../screens/components/bottomNav';
// import HomeScreen from '../screens/HomeScreen/HomeScreen';

// import Recents from '../screens/HomeScreen/Recents';

// // import AccountDetails from "../screens/Bank/AccountDetails";
// // import AccountNumber from "../screens/Bank/AccountNumber";
// // import UpiPin from "../screens/Bank/UpiPin";
// // import SuccessScreen from "../screens/Bank/SuccessScreen";
// import UserProfile from '../screens/UserProfile/UserProfile';
// import TransactionHistory from '../screens/HomeScreen/TransactionHistory';
// import TnsHistorySingleUser from '../screens/HomeScreen/TnsHistorySingleUser';
// import WalletScreen from '../screens/HomeScreen/WalletScreen';
// import MarketScreen from '../screens/Market/market';
// import CoinDetailsScreen from '../screens/Market/singleMarket';

// import BankAccInit from '../screens/Bank/BankAccInit';
// import AddBankDetails from '../screens/Bank/AddBankDetails';
// import TpinScreen from '../screens/Bank/TpinScreen';
// import BankAddedScreen from '../screens/Bank/BankAddedScreen';


// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>

//         {/* AUTH */}
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Animation" component={AnimationScreen} />
//         {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
//         <Stack.Screen name="Onboarding1" component={Onboarding1} />
//         <Stack.Screen name="Onboarding2" component={Onboarding2} />
//         <Stack.Screen name="Onboarding3" component={Onboarding3} />
//         {/* <Stack.Screen name="Onboarding4" component={Onboarding4} /> */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} />
//         <Stack.Screen name="OTP" component={OtpVerificationScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//         <Stack.Screen name="TransactionPin" component={TransactionPinScreen} />
//         <Stack.Screen name="EnterAmount" component={EnterAmountScreen} />
//         <Stack.Screen name="SendPin" component={SendPinScreen} />
//         <Stack.Screen name="review" component={ReviewTransferScreen} />
//         <Stack.Screen name="ReferEarn" component={ReferEarn} />
//         <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />

//         {/* ✅ MAIN APP WITH BOTTOM TABS */}
//         <Stack.Screen name="Main" component={BottomTabs} />
//         <Stack.Screen name="Buttom" component={BottomNav} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="UserProfile" component={UserProfile} />
//         <Stack.Screen name="WalletScreen" component={WalletScreen} />
//         <Stack.Screen name="MarketScreen" component={MarketScreen} />
//         <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} />




//         {/* SEND FLOW */}
//         <Stack.Screen name="SendScreen" component={SendScreen} />
//         <Stack.Screen name="ScanQR" component={ScanQRScreen} />
//         <Stack.Screen name="enterAddress" component={EnterAddressScreen} />
//         <Stack.Screen name="recents" component={Recents} />


//         <Stack.Screen name="loading" component={PaymentLoading} />
//         <Stack.Screen name="successfullPayment" component={PaymentSuccess} />

//         {/* RECEIVE */}
//         <Stack.Screen name="Receive" component={Receive} />

//         <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
//         <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
//         <Stack.Screen name="TnsHistorySingleUser" component={TnsHistorySingleUser} />


//         {/* BANK DETAILS */}
//         {/* <Stack.Screen name="AddBankHome" component={BankAccInit} /> */}
//         {/* <Stack.Screen name="AccountDetails" component={AccountDetails} />
//         <Stack.Screen name="AccountNumber" component={AccountNumber} />
//         <Stack.Screen name="UpiPin" component={UpiPin} />
//         <Stack.Screen name="SuccessScreen" component={SuccessScreen} /> */}





//         <Stack.Screen name="AddBankHome" component={BankAccInit} />
//         <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
//         <Stack.Screen name="TpinScreen" component={TpinScreen} />
//         <Stack.Screen name="Notifications" component={NotificationScreen} />
//         <Stack.Screen name="BankAddedScreen" component={BankAddedScreen} />



//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* AUTH */

import SplashScreen from '../screens/Auth/splash/SplashScreen';

import AnimationScreen from '../screens/Auth/splash/AnimationScreen';

import Onboarding1 from '../screens/Auth/Onboarding/Onboarding1';

import Onboarding2 from '../screens/Auth/Onboarding/Onboarding2';

import Onboarding3 from '../screens/Auth/Onboarding/Onboarding3';

import LoginScreen from '../screens/Auth/Login/LoginScreen';

import RegisterScreen from '../screens/Auth/Register/RegisterScreen';

import OtpVerificationScreen from '../screens/Auth/OTP/OtpVerificationScreen';

import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPasswordScreen';

/* COMPONENTS */

import BottomTabs from '../components/common/BottomTabs';

/* HOME */

import HomeScreen from '../screens/Home/HomeScreen';

import WalletScreen from '../screens/Home/WalletScreen';

import TransactionHistory from '../screens/Home/TransactionHistory';

import TransactionDetailScreen from '../screens/Home/TransactionDetailScreen';

import TnsHistorySingleUser from '../screens/Home/TnsHistorySingleUser';

import NotificationScreen from '../screens/Home/NotificationScreen';

/* PROFILE */

import ProfileScreen from '../screens/Profile/ProfileScreen';

import UserProfile from '../screens/Profile/UserProfile';

/* MARKET */

import Market from '../screens/Market/market';

import SingleMarket from '../screens/Market/singleMarket';

/* QR */

import ScanQRScreen from '../screens/QR/ScanQRScreen';

import Receive from '../screens/QR/Recieve';

/* TRANSFER */

import SendScreen from '../screens/Transfer/SendScreen';

import SendTabs from '../screens/Transfer/SendTabs';

import EnterAddressScreen from '../screens/Transfer/EnterAddressScreen';

import EnterAmountScreen from '../screens/Transfer/EnterAmountScreen';

import ReviewTransferScreen from '../screens/Transfer/ReviewTransferScreen';

import SendPinScreen from '../screens/Transfer/SendPinScreen';

import TransactionPin from '../screens/Transfer/TransactionPin';

import LoadingScreen from '../screens/Transfer/LoadingScreen';

import SuccessTokenScreen from '../screens/Transfer/SuccessTokenScreen';

import ReferEarn from '../screens/Transfer/ReferEarn';

import RecentsScreen from '../screens/Transfer/RecentsScreen';

/* BANK */

import BankAccInit from '../screens/Bank/BankAccInit';

import AddBankDetails from '../screens/Bank/AddBankDetails';

import TpinScreen from '../screens/Bank/TpinScreen';

import BankAddedScreen from '../screens/Bank/BankAddedScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        {/* AUTH */}

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Animation"
          component={AnimationScreen}
        />

        <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
        />

        <Stack.Screen
          name="Onboarding2"
          component={Onboarding2}
        />

        <Stack.Screen
          name="Onboarding3"
          component={Onboarding3}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="RegisterMobile"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="OTP"
          component={OtpVerificationScreen}
        />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />

        {/* MAIN */}

        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
         options={{ headerShown: false }} 
        />

        {/* HOME */}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="WalletScreen"
          component={WalletScreen}
        />

        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />

        <Stack.Screen
          name="TransactionDetailScreen"
          component={TransactionDetailScreen}
        />

        <Stack.Screen
          name="TnsHistorySingleUser"
          component={TnsHistorySingleUser}
        />

        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
        />

        {/* PROFILE */}

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />

        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
        />

        {/* MARKET */}

        <Stack.Screen
          name="MarketScreen"
          component={Market}
        />

        <Stack.Screen
          name="SingleMarket"
          component={SingleMarket}
        />

        {/* QR */}

        <Stack.Screen
          name="ScanQR"
          component={ScanQRScreen}
        />

        <Stack.Screen
          name="Receive"
          component={Receive}
        />

        {/* TRANSFER */}

        <Stack.Screen
          name="SendScreen"
          component={SendScreen}
        />

        <Stack.Screen
          name="SendTabs"
          component={SendTabs}
        />

        <Stack.Screen
          name="EnterAddress"
          component={EnterAddressScreen}
        />

        <Stack.Screen
          name="EnterAmount"
          component={EnterAmountScreen}
        />

        <Stack.Screen
          name="ReviewTransfer"
          component={ReviewTransferScreen}
        />

        <Stack.Screen
          name="SendPin"
          component={SendPinScreen}
        />

        <Stack.Screen
          name="TransactionPin"
          component={TransactionPin}
        />

        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
        />

        <Stack.Screen
          name="SuccessToken"
          component={SuccessTokenScreen}
        />

        <Stack.Screen
          name="ReferEarn"
          component={ReferEarn}
        />

        <Stack.Screen
          name="Recents"
          component={RecentsScreen}
        />

        {/* BANK */}

        <Stack.Screen
          name="AddBankHome"
          component={BankAccInit}
        />

        <Stack.Screen
          name="AddBankDetails"
          component={AddBankDetails}
        />

        <Stack.Screen
          name="TpinScreen"
          component={TpinScreen}
        />

        <Stack.Screen
          name="BankAddedScreen"
          component={BankAddedScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}