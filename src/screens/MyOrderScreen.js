import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../../theme";
import HorizontalLine from "../components/HorizantalLine";
import { useNavigation } from "@react-navigation/native";

const MyOrderScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const selectedItemImage = route.params.selectedItemImage;
  const selectedItemName = route.params.selectedItemName;
  const selectedItemPrice = route.params.selectedItemPrice;
  const selectedItemQuantity = route.params.selectedItemQuantity;
  const selectedItemStatus = route.params.selectedItemStatus;
  const [total, setTotal] = useState(0);

  const itemTotal = selectedItemPrice * selectedItemQuantity;
  const imagebaseurl = "http://10.0.2.2:8080/";

  const [addedItems, setAddedItems] = useState([]);

  const addItemToList = () => {
    const newItem = {
      image: selectedItemImage,
      name: selectedItemName,
      price: selectedItemPrice,
      quantity: selectedItemQuantity,
      status: "Pending",
    };
    setAddedItems([...addedItems, newItem]);
    setTotal((prevTotal) => prevTotal + calculateSelectedItemTotal());
  };

  const calculateSelectedItemTotal = () => {
    return selectedItemPrice * selectedItemQuantity;
  };

  const calculateAddedItemsTotal = () => {
    return addedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ height: 670 }}>
          <View style={{ display: "flex", gap: 20 }}>
            <View style={styles.rectangle}>
              <View style={styles.selectedItemContainer}>
                <View>
                  <Image
                    source={{ uri: imagebaseurl + selectedItemImage }}
                    style={{ width: 120, height: 150, borderRadius: 10 }}
                  />
                </View>
                <View>
                  <View>
                    <Text style={styles.name}>{selectedItemName}</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 190,
                      }}
                    >
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.total}>Total </Text>
                        <Text style={styles.price}>Rs: {itemTotal}/-</Text>
                      </View>
                      <Text style={styles.qty}>
                        Qty: {selectedItemQuantity}
                      </Text>
                    </View>
                    <HorizontalLine />

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 100,
                        alignItems: "center",
                      }}
                    >
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.status}>Status:</Text>
                        <Text style={styles.statusColor}>
                          {selectedItemStatus}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {addedItems.map((item, index) => (
              <View key={index} style={styles.addItemMainContainer}>
                <View>
                  <Image
                    source={{ uri: imagebaseurl + item.image }}
                    style={{ width: 120, height: 150, borderRadius: 10 }}
                  />
                </View>
                <View>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.addItemContainer}>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.total}>Total </Text>
                        <Text style={styles.price}>
                          Rs: {item.price * item.quantity}/-
                        </Text>
                      </View>
                      <Text style={styles.qty}>Qty: {item.quantity}</Text>
                    </View>
                    <HorizontalLine />

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 100,
                        alignItems: "center",
                      }}
                    >
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.status}>Status: </Text>
                        <Text style={styles.statusColor}>{item.status}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.addItemButton}
        onPress={() => {
          addItemToList();
          navigation.navigate("Menu");
        }}
      >
        <Text style={styles.addItemButtonText}>Add Item</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.orderSummary}>Order Summary</Text>
        <View>
          <HorizontalLine />
          <View style={styles.footerContainer}>
            <Text style={styles.text}>Total Payment: </Text>
            <Text style={styles.totalPayment}>
              Rs {calculateSelectedItemTotal() + calculateAddedItemsTotal()}/-
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: theme.spacing.xxl,
    marginTop: "13%",
  },
  name: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
  },
  total: {
    fontSize: theme.fontSizes.md,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: theme.fontSizes.default,
  },
  qty: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: theme.fontSizes.default,
  },
  cancelButton: {
    width: 58,
    backgroundColor: "#A4A4A4",
    borderRadius: 5,
    textAlign: "center",
    marginTop: 10,
    alignItems: "center",
    color: "white",
  },
  status: {
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
    color: "black",
  },
  text: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "bold",
    marginRight: "60%",
  },
  totalPayment: {
    color: "red",
    fontWeight: "bold",
    fontSize: theme.fontSizes.lg,
  },
  orderSummary: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    marginRight: "65%",
  },
  addItemButton: {
    backgroundColor: "blue",
    padding: theme.spacing.default,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3%",
  },
  addItemButtonText: {
    color: "white",
    fontSize: theme.fontSizes.lg,
    fontWeight: "bold",
  },
  rectangle: {
    backgroundColor: "#EBEAF5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 150,
    marginTop: 15,
  },
  statusColor: {
    color: "red",
    fontWeight: "bold",
    fontSize: theme.fontSizes.default,
  },
  selectedItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 27,
  },
  addItemContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 190,
  },
  footer: {
    backgroundColor: "#f2f4fa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 150,
    width: "100%",
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  addItemMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 27,
    backgroundColor: "#EBEAF5",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
