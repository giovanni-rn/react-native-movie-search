import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { searchMovies } from "./api";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (query) {
      setIsLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Enter movie title"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer,
            { backgroundColor: pressed ? "#2a64e0" : "#4287f5" },
          ]}
          onPress={handleSearch}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={movies.filter((item) => item.image && item.title && item.year)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image.url }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.info}>
                {item.year} - {item.titleType === "tvSeries" ? "Série" : "Film"}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    fontSize: 18,
    paddingLeft: 5,
    outlineStyle: "none",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  row: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
  },
  image: {
    width: 75,
    height: 110,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
  },
  info: {
    fontSize: 15,
  },
  list: {
    paddingBottom: 20,
  },
});
