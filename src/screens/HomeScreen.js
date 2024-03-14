import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import config from "../../stores/app-config";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  tableId: Yup.string()
    .trim()
    .required("Table ID is required")
    .matches(/^[0-9]+$/, "Table ID must be a number"),
});

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [tableId, setTableId] = useState("");
  const [validationError, setValidationError] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // Clear validation error when modal is opened
    setValidationError("");
  };

  const startNewOrder = async () => {
    try {
      await validationSchema.validate({ tableId });
      const requestData = {
        tableId: tableId,
      };

      const response = await axios.post(
        `${config.BaseURL}/orders`,
        requestData
      );

      navigation.navigate("Menu");
      toggleModal();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Yup validation error, set the validation error state
        setValidationError(error.message);
      } else {
        // Other errors, show a generic error message
        Alert.alert(
          "Failed to start a new order",
          "Please check your Table ID and try again."
        );
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Kign’s</Text>
          <Text style={styles.subHeader}>RESTAURANT</Text>
          <Text style={styles.desc}>Let’s find your favorite food.</Text>
        </View>

        <View style={{ marginTop: "25%" }}>
          <Button title="Start New Order" color="red" onPress={toggleModal} />
        </View>
      </View>
      <Image
        source={require("../../assets/home-logo.png")}
        style={styles.image}
        resizeMode="stretch"
      />

      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Enter Table ID</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTableId(text)}
              value={tableId}
              placeholder="Table ID"
            />
            {validationError ? (
              <Text style={styles.validationError}>{validationError}</Text>
            ) : null}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={startNewOrder}
              >
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={toggleModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing.xxl,
  },
  image: {
    width: "100%",
    height: 700,
  },
  header: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: theme.fontSizes.xl,
  },

  desc: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "bold",
  },

  headerContainer: {
    display: "flex",
    gap: theme.spacing.xs,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    width: 300,
    padding: theme.spacing.xl,
    borderRadius: theme.spacing.sm,
  },
  modalHeader: {
    fontSize: theme.fontSizes.l,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.xs,
    marginTop: theme.spacing.s,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.default,
  },
  modalButton: {
    backgroundColor: "red",
    padding: theme.spacing.s,
    borderRadius: theme.spacing.xs,
    width: "48%",
    height: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  validationError: {
    color: "red",
    marginTop: theme.spacing.s,
  },
});
