import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  // Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Constants from "expo-constants";
import { 
    // Button
     Text, theme } from "galio-framework";
import moment from "moment";
const statusBarHeight = Constants.statusBarHeight;
const Home = ({navigation}) => {
  const [malas, setMalas] = useState(0);
  const [time, setTime] = useState("");
  const [total, setTotal] = useState(0);
  const [entry, setEntry] = useState([
    // {
    //   malas: 6,
    //   time: "30",
    //   timestamp: new Date(),
    // },
    // {
    //   malas: 8,
    //   time: "1 hr",
    //   timestamp: new Date(),
    // },
  ]);
  const [data, setData] = useState([
    { date: moment().subtract(4, "days").format("ll"), malaCount: 12 },
    { date: moment().subtract(3, "days").format("ll"), malaCount: 10 },
    { date: moment().subtract(3, "days").format("ll"), malaCount: 14 },
    { date: moment().subtract(3, "days").format("ll"), malaCount: 7 },
    { date: moment().subtract(2, "days").format("ll"), malaCount: 1 },
    { date: moment().subtract(2, "days").format("ll"), malaCount: 13 },
    { date: moment().subtract(2, "days").format("ll"), malaCount: 8 },
    { date: moment().subtract(1, "days").format("ll"), malaCount: 4 },
    { date: moment().subtract(1, "days").format("ll"), malaCount: 10 },
  ]);

  const [transformedData, setTransformedData] = useState([
    { date: moment().subtract(3, "days").format("LL"), malaCount: 7 }, // dummy data, will be removed one component renders
  ]);

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, "date")));
  }, [data]);

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const transformData = (groupedData) => {
    const transformedArray = [];
    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.malaCount, 0);
      transformedArray.push({
        date: moment(entry[0]).format("DD/MM"),
        malaCount: total,
      });
    });
    const sortedArray = transformedArray.sort((a, b) => a["date"] - b["date"]);
    return sortedArray;
  };

  // console.log(groupBy(data, 'date'))
  // console.log(transformData((groupBy(data, 'date'))))

  // console.log(`hare krishna`)
  const getDates = () => transformedData.map((pair) => pair.date);
  const getAmounts = () => transformedData.map((pair) => pair.malaCount);
  // console.log(`krishna`)
  // console.log(getAmounts());
  const p1 = "How many rounds did you chant?";
  const p2 = "How long did it take?";
  const handleClick = () => {
    setEntry([
      ...entry,
      {
        malas: malas,
        time: time,
        timestamp: new Date(),
      },
    ]);
    setData([
      ...data,
      {
        malaCount: Number(malas),
        date: moment().format("ll"),
      },
    ]);
    setMalas(0);
    setTime("");
  };
  useEffect(() => {
    setTotal(entry.reduce((total, entry) => total + Number(entry.malas), 0));
  }, [entry]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chanting Tracker 📿🌟</Text>
      <Text style={styles.text}>
        Total rounds chanted today by now: {total}
      </Text>
      {/* <Button title="Login" onPress={() => navigation.navigate('Login')} /> */}
      <View style={styles.chart}>
        {/* <Text style={styles.text}>Bezier Line Chart</Text> */}

        <LineChart
          data={{
            labels: getDates(),
            datasets: [{ data: getAmounts() }],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          // yAxisLabel="₹"
          // marginRight="10"
          // yAxisSuffix="rounds"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#30009c",
            backgroundGradientTo: "#985eff",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              marginLeft: "auto",
              marginRight: "auto",
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setMalas}
        // value={malas}
        placeholder={p1}
        placeholderTextColor="#dbb2ff7e"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input2}
        onChangeText={setTime}
        // value={time}
        placeholder={p2}
        placeholderTextColor="#dbb2ff7e"
      />
      <TouchableOpacity>
        <Button
          title="Add Entry"
          // style={styles.button}
          // style={!malas && !time ? styles.disabled : styles.button}
          color="#3700b3"
          onPress={handleClick}
          disabled={!malas && !time}
          style={[styles.gradient]}
        >
          <Text color={theme.COLORS.WHITE} style={styles.text1}>
            Add Entry
          </Text>
        </Button>
      </TouchableOpacity>
      {entry.map((enter) => (
        <View key={Math.random()}>
          <Text style={styles.text1}>Mala: {enter.malas}</Text>
          <Text style={styles.text1}>Time taken: {enter.time}</Text>
        </View>
      ))}
      <StatusBar style="auto" backgroundColor="#121212" />
    </View>
  );
};
const styles = StyleSheet.create({
  gradient: {
    borderWidth: 0,
    borderRadius: theme.SIZES.BASE * 2,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    // justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    // marginTop: statusBarHeight,
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: "#6200ee",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  text: {
    color: "#6200ee",
    marginBottom: 20,
  },
  text1: {
    color: "white",
  },
  chart: {
    marginRight: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#6200ee",
    height: 40,
    fontSize: 18,
    padding: 10,
    marginTop: 30,
    // marginBottom: 20,
    borderRadius: 5,
    color: "#6200ee",
    // backgroundColor: '#9f83de',
    // placeholderTextColor: '#dbb2ff'
  },
  input2: {
    borderWidth: 2,
    borderColor: "#6200ee",
    height: 40,
    fontSize: 18,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
    color: "#6200ee",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#6200ee",
  },
});

export default Home;
