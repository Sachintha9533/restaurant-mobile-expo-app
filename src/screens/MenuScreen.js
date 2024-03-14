import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { theme } from "../../theme";
import axios from "axios";
import config from "../../stores/app-config";
import { useNavigation } from "@react-navigation/native";

const FILTER_TYPES = ["All", "Breakfast", "Lunch", "Dinner", "Drink"];

export const MenuScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const imagebaseurl = "http://10.0.2.2:8080/";

  useEffect(() => {
    axios
      .get(`${config.BaseURL}/menus`)
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filteredItems);
  }, [searchText, data]);

  const handleItemPress = (item) => {
    navigation.navigate("Order", { selectedItem: item });
  };

  useEffect(() => {
    const filteredItems = data.filter(
      (item) => selectedFilter === "All" || item.tags.includes(selectedFilter)
    );
    setFilteredData(filteredItems);
  }, [selectedFilter, data]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedItem]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Menu</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.subContainer}>
        <View style={styles.subContainerHeader}>
          {FILTER_TYPES.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={
                  selectedFilter === filter
                    ? styles.selectedFilterText
                    : styles.filterText
                }
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredData}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: imagebaseurl + item.image }}
                  style={styles.itemImage}
                />
                <Text style={styles.itemId}>{item.id}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rs: {item.price}/-</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing.xxl,
    gap: theme.spacing.default,
  },
  subContainer: {
    display: "flex",
    padding: theme.spacing.xxl,
    backgroundColor: "#EBEAF5",
    height: "100%",
    borderRadius: 20,
  },
  subContainerHeader: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing.default,
  },
  header: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: "bold",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#F0F0F0",
  },
  filterText: {
    fontSize: theme.fontSizes.lg,
  },
  itemContainer: {
    width: 150,
    height: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    marginTop: 30,
  },
  itemId: {
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
  },
  itemName: {
    fontSize: theme.fontSizes.default,
  },
  itemPrice: {
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
  },
  itemImage: {
    width: 150,
    height: 120,
  },
  name: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontSize: theme.fontSizes.lg,
  },
});
