import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import HorizontalLine from "../components/HorizantalLine";
import config from "../../stores/app-config";
import axios from "axios";

const OrderScreen = ({ route }) => {
  const navigation = useNavigation();
  const { selectedItem } = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setQuantity(1);
  }, [selectedItem]);

  const imagebaseurl = "http://10.0.2.2:8080/";

  const handleItemPress = () => {
    axios
      .post(`${config.BaseURL}/orders/${selectedItem.id}/items`, {
        menuId: selectedItem.id,
        qty: quantity,
        unitPrice: selectedItem.price,
        status: "Pending", // Set the status to "Pending"
      })
      .then((response) => {
        navigation.navigate("Myorder", {
          selectedItemImage: selectedItem.image,
          selectedItemName: selectedItem.name,
          selectedItemPrice: selectedItem.price,
          selectedItemQuantity: quantity,
          selectedItemStatus: "Pending", // Set the status to "Pending"
        });
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  return (
    <SafeAreaView>
      <Image
        source={{ uri: imagebaseurl + selectedItem.image }}
        style={{ width: "100%", height: 400 }}
      />
      <View style={styles.container}>
        <View style={styles.menuDetail}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: theme.fontSizes.lg }}>
              {selectedItem.id}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.name}>{selectedItem.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecreaseQuantity}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={handleIncreaseQuantity}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.price}>Rs: {selectedItem.price}/-</Text>
          </View>
          <View>
            <Text style={styles.description}>{selectedItem.description}</Text>
            <HorizontalLine />
          </View>
        </View>

        <TouchableOpacity onPress={handleItemPress}>
          <View style={styles.addtoButton}>
            <Text style={styles.buttonText}>Add to Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing.xxl,
    gap: theme.spacing.default,
    backgroundColor: "#EBEAF5",
  },
  name: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontSize: theme.fontSizes.lg,
  },

  addtoButton: {
    width: "50%",
    height: 34,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: "63%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  menuDetail: {
    display: "flex",
    gap: theme.spacing.xl,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.default,
  },
  quantityText: {
    fontSize: theme.fontSizes.default,
  },
  quantityButton: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    paddingHorizontal: 10,
    backgroundColor: "red",
    color: "white",
  },
  description: {
    fontSize: theme.fontSizes.lg,
  },
});
