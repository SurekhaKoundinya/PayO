import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./BankAddedStyles";

const BankAddedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bank Added Successfully!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

    </View>
  );
};

export default BankAddedScreen;