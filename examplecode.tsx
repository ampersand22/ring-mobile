import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { FC } from "react";

interface Box {
  text: string;
  style?: any;
  flex: number;
  backgroundColor: "red" | "blue" | "white" | "gray";
}

const Box: FC<Box> = (props) => (
  <View
    style={[
      {
        flex: props.flex || 1,
        backgroundColor: props.backgroundColor || "white",
        width: '100%',
      },
      props.style && props.style,
    ]}
  >
    <Text>{props.text}</Text>
  </View>
);

const App: FC = () => 
    // <View style={styles.container}>
    //   <Box flex={1} backgroundColor="red" text='hi' />
    //   <Box flex={2} backgroundColor="gray" text='hi' />
    // </View>

    <View style={styles.container}>
      <View style={{ flex: 1 }}>
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image
            style={styles.image} 
            source={{ uri: `https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg`}}
        />
        <Image
            style={styles.image} 
            source={{ uri: `https://cdn.pixabay.com/photo/2018/11/17/22/15/trees-3822149_1280.jpg`}}
        />
        <Image
            style={styles.image} 
            source={{ uri: `https://daily.jstor.org/wp-content/uploads/2020/06/why_you_should_learn_the_names_of_trees_1050x700.jpg`}}
        />
       </ScrollView>
      </View>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.paragraph}>
            Boogie and bang, bang and boogie. Let's get this paper
            for the cheesebread. All day every day. This is for the 
            gangstas and the hoes. All the ladies and the bros. And 
            if I were Drake, I'd say its for my woes.
          </Text>
          <Text style={styles.paragraph}>
            Boogie and bang, bang and boogie. Let's get this paper
            for the cheesebread. All day every day. This is for the 
            gangstas and the hoes. All the ladies and the bros. And 
            if I were Drake, I'd say its for my woes.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.paragraph}>
            Boogie and bang, bang and boogie. Let's get this paper
            for the cheesebread. All day every day. This is for the 
            gangstas and the hoes. All the ladies and the bros. And 
            if I were Drake, I'd say its for my woes.
          </Text>
          <Text style={styles.paragraph}>
            Boogie and bang, bang and boogie. Let's get this paper
            for the cheesebread. All day every day. This is for the 
            gangstas and the hoes. All the ladies and the bros. And 
            if I were Drake, I'd say its for my woes.
          </Text>
        </View>

      </View>
    </View>
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    paddingVertical: 40,
    // justifyContent: "center",
    // alignItems: "center",
  },
  paragraph: {
    width: "90%",
    alignSelf: 'center',
    textAlign: "justify",
    color: '#333333',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
});

export default App;
