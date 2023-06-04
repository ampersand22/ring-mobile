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
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { User, post } from "./data/types";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
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

const Post: FC<post> = (props) => {
  
  const isAlreadyLiked = (): boolean =>
    props.likes.includes(currentUser.id) ? true : false;

  return (
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
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            // backgroundColor: "red",
            justifyContent: "space-between",
            alignItems: "center",
            width: 40,
          }}
          onPress={props.likePost}
        >
          <Text>{props.likes.length}</Text>
          <FontAwesome
            name={isAlreadyLiked() ? "heart" : "heart-o"}
            color="#555"
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 40,
          }}
        >
          <Text>{props.comments.length}</Text>
          <FontAwesome name="comment-o" color="#555" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 40,
          alignItems: "center",
        }}
        onPress={props.makeComment}
      >
        <FontAwesome name="heart-o" color="#555" size={18} />
      </TouchableOpacity>
    </View>
  </View>
);

const App: FC = () => {
  const [allPosts, setAllPosts] = useState<any[]>(posts);
  const [trendingPosts, setTrendingPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [commentModalVisible, setCommentModalVisible] =
    useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<post | null>(null);
  const [currentText, setCurrentText] = useState<string>("");

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

  const animateBottomVal = (_val: number) =>
    Animated.timing(bottomVal, {
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
    getData();
  }, []);

  useEffect(() => {
    animateValues();
  }, [loading]);

  async function getData() {
    getAuthorDetails();
    getTrendingPosts();
    setLoading(false);
  }

  const postComment = () => {
    const id = currentPost?.id;
    const text = currentText;
    const updatedPost = {...currentPost, comments: [...currentPost?.comments, {text, author: currentUser.id }]}
  }

  // expects id as an input/param
  const likePost = (id: number): number => {
    //add current user to the likes array of the post

    // find the post of current id
    const currentPost = allPosts.find((post: post) => post.id == id);
    // get likes array of current post
    const likes = currentPost?.likes;
    // add current user id to the likes array
    const alreadyLiked = likes?.includes(id);

    const __likes = alreadyLiked
      ? likes.filter((like: number) => like !== id)
      : likes
      ? [...likes, currentUser.id]
      : [currentUser.id];
    // update lieks of the current post
    const updatedPost = { ...currentPost, likes: __likes };
    // replace the current post in all posts
    const updatedPosts = allPosts.map((post: post) =>
      post.id == id ? updatedPost : post
    );

    setAllPosts(updatedPosts);

    return id;
  };

  const makeComment = (id: number) => {
    const currentPost = allPosts.find((post: post) => post.id == id);
    setCurrentPost(currentPost);

    setCommentModalVisible(true);
  };

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
    outputRange: [0, 200],
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
                likePost={() => likePost(item.id)}
                makeComment={() => makeComment(item.id)}
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
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    FEED
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    EVENTS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    INDIE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    STABLES
                  </Text>
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
          <FontAwesome name="home" size={30} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTabBtn}>
          <FontAwesome name="search" size={30} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTabBtn}>
          <FontAwesome name="plus" size={30} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTabBtn}>
          <FontAwesome name="bell" size={30} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTabBtn}>
          <FontAwesome name="user" size={30} color="#888" />
        </TouchableOpacity>
      </Animated.View>

      <Modal visible={commentModalVisible}>
        <SafeAreaView />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: width / 1.1,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCommentModalVisible(false);
                setTimeout(() => {
                  setCurrentPost(null);
                }, 500);
              }}
            >
              <FontAwesome name="angle-left" size={30} />
            </TouchableOpacity>
          </View>
          {currentPost && (
            <Post
              id={currentPost.id}
              text={currentPost.text}
              author={currentPost.author}
              authorDetails={currentPost.authorDetails}
              timeStamp={currentPost.timeStamp}
              likes={currentPost.likes}
              comments={currentPost.comments}
              // likePost={() => likePost(currentPost.id)}
            />
          )}
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
            behavior={Platform.select({ ios: "padding", android: undefined })}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...styles.input,
                  flex: 1,
                  flexDirection: "row",
                  maxHeight: 50,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <TextInput
                  style={{ flex: 1, padding: 5 }}
                  onChangeText={(text: string) => setCurrentText(text)}
                  placeholder="Write comment here..."
                />
                <TouchableOpacity onPress={postComment}>
                  <MaterialCommunityIcons
                    name="send"
                    color="rgba(81,135,200,1)"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 8,
    width: width / 4.2,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTabBtn: {
    backgroundColor: "lightgray",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
    backgroundColor: "white",
  },
  input: {
    width: width / 1.1,
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 20,
  },
});

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

export default App;
