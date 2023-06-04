import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { post } from "./data/types";
import { FontAwesome } from "@expo/vector-icons";
import { posts, Users } from "./data";

interface Box {
  text: string;
  style?: any;
  flex: number;
  backgroundColor: "red" | "blue" | "white" | "gray";
}

const { width, height } = Dimensions.get("screen");

const val = new Animated.Value(0);
const bottomVal = new Animated.Value(0);

const Post: FC<post> = (props) => (
  <View style={styles.post}>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: "lightgray",
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        {/* <Text>{props.authorDetails?.kayfabeName.charAt(0)}</Text> */}
      </View>
      <Text style={{ fontWeight: "600" }}>
        {props.authorDetails?.kayfabeName}
      </Text>
    </View>
    <View style={{ flex: 3 }}>
      <Text>{props.text}</Text>
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",

        // paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity>
        <FontAwesome name="heart-o" color="#555" size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="comment-o" color="#555" size={24} />
      </TouchableOpacity>
    </View>
  </View>
);

const PopularPost: FC<post> = (props) => (
  <View style={styles.PopularPost}>
    <Text>{props.text}</Text>
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity>
        <FontAwesome name="heart-o" color="#555" size={18} />
      </TouchableOpacity>
    </View>
  </View>
);

const Box: FC<Box> = (props) => (
  <View
    style={[
      {
        flex: props.flex || 1,
        backgroundColor: props.backgroundColor || "white",
        width: "100%",
      },
      props.style && props.style,
    ]}
  >
    <Text>{props.text}</Text>
  </View>
);

const App: FC = () => {
  const [allPosts, setAllPosts] = useState(posts);
  const [trendingPosts, setTrendingPosts] = useState<post[]>([]);

  const getTrendingPosts = () => {
    const posts: post[] = allPosts.sort((a: post, b: post) => {
      return a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0;
    });
    const trend = posts.slice(0, 4);
    setTrendingPosts(trend);
  };

  const getAuthorDetails = () => {
    const __posts = posts.map((post) => {
      const authorDetails = Users.find((author) => author.id == post.author);
      return { ...post, authorDetails };
      console.log(authorDetails);
    });
    setAllPosts(__posts);
  };

  const animateBottomVal = (_val : number) => Animated.timing(bottomVal, {
    toValue: _val,
    duration: 600,
    useNativeDriver: true,
  }).start();

  const animateValues = () =>
    Animated.timing(val, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();


  useEffect(() => {
    animateValues();
    getTrendingPosts();
    getAuthorDetails();
  }, []);

  // put animate on the view
  const coverInterpolate = val.interpolate({
    inputRange: [0, 1],
    outputRange: [9, 1],
  });

  // put animate on the image
  const imageInterpolate = val.interpolate({
    inputRange: [0, 1],
    outputRange: ["200%", "100%"],
  });

  const mainInterpolate = val.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const bottomTabInterpolate = bottomVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  const bottomStyle = {
    transform: [
      {
        translateY: bottomTabInterpolate,
      },
    ],
  };

  const dynamicFlex = {
    flex: coverInterpolate,
  };

  const dynamicImage = {
    height: imageInterpolate,
  };

  const dynamicMain = {
    opacity: mainInterpolate,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={dynamicFlex}>
        <Animated.Image
          source={{
            uri: `https://daily.jstor.org/wp-content/uploads/2020/06/why_you_should_learn_the_names_of_trees_1050x700.jpg`,
          }}
          style={[styles.coverImage, dynamicFlex]}
        />
      </Animated.View>

      <Animated.View style={[styles.main, dynamicMain]}>
        <View style={styles.popular}>
          <FlatList
            data={trendingPosts}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularPost
                id={item.id}
                text={item.text}
                timeStamp={item.timeStamp}
                author={item.author}
                comments={item.comments}
                likes={item.likes}
                authorDetails={item.authorDetails}
              />
            )}
          />
        </View>
        <View style={{ flex: 3 }}>
          <FlatList
            data={allPosts}
            onScrollBeginDrag={(e: any) => animateBottomVal(1)}
            onScrollEndDrag={(e: any) => animateBottomVal(0)}
            ListHeaderComponent={() => (
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ color: 'white', fontWeight: '600'}}>POST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ color: 'white', fontWeight: '600'}}>EVENTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ color: 'white', fontWeight: '600'}}>IMAGE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ color: 'white', fontWeight: '600'}}>VIDEO</Text>
                </TouchableOpacity>
              </View>
            )}
            renderItem={({ item, index }) => (
              <Post
                id={item.id}
                text={item.text}
                timeStamp={item.timeStamp}
                comments={item.comments}
                likes={item.likes}
                authorDetails={item.authorDetails}
                author={item.author}
              />
            )}
          />
        </View>
      </Animated.View>
      <Animated.View style={[styles.bottomTab, bottomStyle]}>
            <TouchableOpacity style={styles.bottomTabBtn}>
              <FontAwesome name='home' size={30} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTabBtn}>
              <FontAwesome name='search' size={30} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTabBtn}>
              <FontAwesome name='plus' size={30} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTabBtn}>
              <FontAwesome name='bell' size={30} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTabBtn}>
              <FontAwesome name='user' size={30} color="#888" />
            </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // paddingVertical: 40,
    // justifyContent: "center",
    // alignItems: "center",
  },
  paragraph: {
    width: "90%",
    alignSelf: "center",
    textAlign: "justify",
    color: "#333333",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginHorizontal: 5,
  },
  coverImage: {
    width: width,
    height: "100%",
  },
  cover: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  main: {
    flex: 3,
    backgroundColor: "#f1f1f1",
  },
  popular: {
    flex: 1,
    justifyContent: "center",
    marginTop: -80,
  },
  PopularPost: {
    backgroundColor: "white",
    width: width / 3,
    height: width / 4,
    marginHorizontal: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 7,
  },
  post: {
    backgroundColor: "white",
    width: width / 1.05,
    alignSelf: "center",
    minHeight: height / 4,
    shadowColor: "#ccc",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    marginVertical: 5,
    padding: 10,
  },
  btn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
    width: width / 4.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabBtn: {
    backgroundColor: 'lightgray',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    backgroundColor: 'white',
  },
});

export default App;
