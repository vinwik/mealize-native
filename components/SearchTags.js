import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Touchable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../colors/colors";

import { TranslateY } from "../animations/TranslateY";

const tags = [
  { name: "breakfast", category: "type" },
  { name: "main course", category: "type" },
  { name: "dessert", category: "type" },
  { name: "italian", category: "cuisine" },
  { name: "french", category: "cuisine" },
  { name: "chinese", category: "cuisine" },
];

const dailyRegimenTags = [
  { name: "breakfast", category: "type" },
  { name: "lunch", category: "type" },
  { name: "snack", category: "type" },
  { name: "dinner", category: "type" },
];

const cuisineTags = [
  { name: "italian", category: "cuisine" },
  { name: "french", category: "cuisine" },
  { name: "chinese", category: "cuisine" },
  { name: "greek", category: "cuisine" },
  { name: "american", category: "cuisine" },
];

const intoleranceTags = [
  { name: "dairy", category: "intolerance" },
  { name: "egg", category: "intolerance" },
  { name: "gluten", category: "intolerance" },
  { name: "grain", category: "intolerance" },
  { name: "peanut", category: "intolerance" },
  { name: "seafood", category: "intolerance" },
  { name: "sesame", category: "intolerance" },
  { name: "shellfish", category: "intolerance" },
  { name: "soy", category: "intolerance" },
  { name: "tree nut", category: "intolerance" },
  { name: "wheat", category: "intolerance" },
];

const dietTags = [
  { name: "gluten free", category: "diet" },
  { name: "ketogenic", category: "diet" },
  { name: "vegetarian", category: "diet" },
  { name: "vegan", category: "diet" },
  { name: "paleo", category: "diet" },
  { name: "pescetarian", category: "diet" },
  { name: "primal", category: "diet" },
  { name: "whole30", category: "diet" },
  { name: "lacto-vegetarian", category: "diet" },
  { name: "ovo-vegetarian", category: "diet" },
];

const SearchTags = (props) => {
  const [type, setType] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [intolerance, setIntolerance] = useState([]);
  const [diet, setDiet] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldSlide, setShouldSlide] = useState(false);

  // console.log(cuisine);
  // console.log(intolerance);
  // console.log(diet);

  const tagsHandler = (tag) => {
    if (tag.category === "type") {
      if (!type.includes(tag.name)) {
        setType([...type, tag.name]);
      } else {
        const filteredType = type.filter((name) => {
          return name !== tag.name;
        });

        setType(filteredType);
      }
    }
    if (tag.category === "cuisine") {
      if (!cuisine.includes(tag.name)) {
        setCuisine([...cuisine, tag.name]);
      } else {
        const filteredCuisine = cuisine.filter((name) => {
          return name !== tag.name;
        });

        setCuisine(filteredCuisine);
      }
    }
    if (tag.category === "intolerance") {
      if (!intolerance.includes(tag.name)) {
        setIntolerance([...intolerance, tag.name]);
      } else {
        const filteredIntolerance = intolerance.filter((name) => {
          return name !== tag.name;
        });

        setIntolerance(filteredIntolerance);
      }
    }
    if (tag.category === "diet") {
      if (!diet.includes(tag.name)) {
        setDiet([...diet, tag.name]);
      } else {
        const filteredDiet = diet.filter((name) => {
          return name !== tag.name;
        });

        setDiet(filteredDiet);
      }
    }
  };

  const buttonMargin = (i) => {
    // if (i === 0) {
    //   return styles.firstButton;
    // }
    if (i === tags.length - 1) {
      return styles.lastButton;
    }

    return styles.button;
  };

  const filterButtonMargin = (filterTags, i) => {
    if (i === 0) {
      return styles.firstFilterButton;
    }
    if (i === filterTags.length - 1) {
      return styles.lastFilterButton;
    }

    return styles.filterButton;
  };

  const handleFilterReset = () => {
    setType([]);
    setCuisine([]);
    setIntolerance([]);
    setDiet([]);
  };
  const handleFilterSubmition = () => {
    props.setType(type);
    props.setCuisine(cuisine);
    props.setIntolerance(intolerance);
    props.setDiet(diet);
  };

  useEffect(() => {
    // if (type || cuisine) {
    //   props.getSearch("", type, cuisine);
    // }
    setType(props.type);
    setCuisine(props.cuisine);
    setIntolerance(props.intolerance);
    setDiet(props.diet);
  }, [props.type, props.cuisine, props.intolerance, props.diet]);

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.firstButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Feather
            name="sliders"
            color="#fff"
            size={18}
            style={{ transform: [{ rotate: "-90deg" }] }}
          />
        </TouchableOpacity>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          {/* <View
            style={{
              backgroundColor: "#00000070",
            }}
          > */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#00000080",
              // justifyContent: "flex-end",
            }}
          >
            <TouchableWithoutFeedback onPress={() => setShouldSlide(true)}>
              <View
                style={{
                  height: Dimensions.get("screen").height * 0.2,
                }}
              ></View>
            </TouchableWithoutFeedback>
            <TranslateY
              start={Dimensions.get("screen").height * 0.8}
              end={0}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              shouldSlide={shouldSlide}
              setShouldSlide={setShouldSlide}
              style={{
                height: Dimensions.get("screen").height * 0.8,
                backgroundColor: "#fff",
                flex: 1,
                // bottom: 0,
                // right: 0,
                // left: 0,
                // position: "absolute",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#e2e2e2",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: Dimensions.get("screen").width * 0.05,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      paddingVertical: 15,
                      fontWeight: "700",
                      color: "#555",
                    }}
                  >
                    Filters
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        marginRight: Dimensions.get("screen").width * 0.075,
                      }}
                      onPress={() => {
                        handleFilterReset();
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: "#888",
                        }}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleFilterSubmition();
                        setShouldSlide(true);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: colors.paleGreen,
                        }}
                      >
                        Go!
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{
                //   justifyContent: "space-around",
                //   flex: 1,
                // }}
              >
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      paddingLeft: Dimensions.get("screen").width * 0.05,
                      marginVertical: 10,
                    }}
                  >
                    Daily regimen
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // style={{
                    //   paddingLeft: Dimensions.get("screen").width * 0.0375,
                    // }}
                  >
                    {dailyRegimenTags.map((tag, i) => {
                      return (
                        <TouchableOpacity
                          style={[
                            filterButtonMargin(dailyRegimenTags, i),
                            type.includes(tag.name)
                              ? styles.pressedFilterButtonBackground
                              : styles.filterButtonBackground,
                          ]}
                          key={tag.name}
                          onPress={() => {
                            tagsHandler(tag);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 13,
                              color: type.includes(tag.name)
                                ? "white"
                                : "black",
                              textTransform: "capitalize",
                              fontWeight: "600",
                            }}
                          >
                            {tag.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      paddingLeft: Dimensions.get("screen").width * 0.05,
                      marginVertical: 10,
                    }}
                  >
                    Cuisine
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // style={{
                    //   paddingLeft: Dimensions.get("screen").width * 0.0375,
                    // }}
                  >
                    {cuisineTags.map((tag, i) => {
                      return (
                        <TouchableOpacity
                          style={[
                            filterButtonMargin(cuisineTags, i),
                            cuisine.includes(tag.name)
                              ? styles.pressedFilterButtonBackground
                              : styles.filterButtonBackground,
                          ]}
                          key={tag.name}
                          onPress={() => {
                            tagsHandler(tag);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 13,
                              color: cuisine.includes(tag.name)
                                ? "white"
                                : "black",
                              textTransform: "capitalize",
                              fontWeight: "600",
                            }}
                          >
                            {tag.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      paddingLeft: Dimensions.get("screen").width * 0.05,
                      marginVertical: 10,
                    }}
                  >
                    Intolerances
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // style={{
                    //   paddingLeft: Dimensions.get("screen").width * 0.0375,
                    // }}
                  >
                    {intoleranceTags.map((tag, i) => {
                      return (
                        <TouchableOpacity
                          style={[
                            filterButtonMargin(intoleranceTags, i),
                            intolerance.includes(tag.name)
                              ? styles.pressedFilterButtonBackground
                              : styles.filterButtonBackground,
                          ]}
                          key={tag.name}
                          onPress={() => {
                            tagsHandler(tag);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 13,
                              color: intolerance.includes(tag.name)
                                ? "white"
                                : "black",
                              textTransform: "capitalize",
                              fontWeight: "600",
                            }}
                          >
                            {tag.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      paddingLeft: Dimensions.get("screen").width * 0.05,
                      marginVertical: 10,
                    }}
                  >
                    Diet
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // style={{
                    //   paddingLeft: Dimensions.get("screen").width * 0.0375,
                    // }}
                  >
                    {dietTags.map((tag, i) => {
                      return (
                        <TouchableOpacity
                          style={[
                            filterButtonMargin(dietTags, i),
                            diet.includes(tag.name)
                              ? styles.pressedFilterButtonBackground
                              : styles.filterButtonBackground,
                          ]}
                          key={tag.name}
                          onPress={() => {
                            tagsHandler(tag);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 13,
                              color: diet.includes(tag.name)
                                ? "white"
                                : "black",
                              textTransform: "capitalize",
                              fontWeight: "600",
                            }}
                          >
                            {tag.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </ScrollView>
            </TranslateY>
          </View>
        </Modal>

        {tags.map((tag, i) => {
          return (
            <TouchableOpacity
              style={[
                buttonMargin(i),
                props.type.includes(tag.name) ||
                props.cuisine.includes(tag.name)
                  ? styles.pressedButtonBackground
                  : styles.buttonBackground,
              ]}
              key={tag.name}
              onPress={() => {
                props.tagsHandler(tag);
              }}
            >
              <Text style={{ color: "white", textTransform: "capitalize" }}>
                {tag.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SearchTags;

const styles = StyleSheet.create({
  tags: {
    // marginTop: "auto",
    // flex: 1,
    // position: "absolute",
    // bottom: 0,
    // top: Dimensions.get("screen").height - 258,
    // width: 100,
    // height: 100,
    // zIndex: 100,
    // paddingTop: 15,
  },
  button: {
    marginHorizontal: Dimensions.get("screen").width * 0.0125,
    // marginVertical: 15,
    // marginTop: 5,
    marginBottom: 15,

    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 45,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  firstButton: {
    marginLeft: Dimensions.get("screen").width * 0.05,
    marginRight: Dimensions.get("screen").width * 0.0125,

    // marginVertical: 15,
    // marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 45,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  lastButton: {
    marginLeft: Dimensions.get("screen").width * 0.0125,
    marginRight: Dimensions.get("screen").width * 0.05,
    // marginVertical: 15,
    // marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 45,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonBackground: {
    backgroundColor: colors.paleGreen,
  },
  pressedButtonBackground: {
    backgroundColor: colors.paleDarkGreen,
  },

  filterButton: {
    marginHorizontal: Dimensions.get("screen").width * 0.0125,
    // marginVertical: 15,
    marginTop: 5,
    marginBottom: 15,

    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 45,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  firstFilterButton: {
    marginLeft: Dimensions.get("screen").width * 0.05,
    marginRight: Dimensions.get("screen").width * 0.0125,

    // marginVertical: 15,
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 45,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  lastFilterButton: {
    marginLeft: Dimensions.get("screen").width * 0.0125,
    marginRight: Dimensions.get("screen").width * 0.05,
    // marginVertical: 15,
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 45,
    backgroundColor: colors.paleGreen,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  filterButtonBackground: {
    backgroundColor: "#fff",
  },
  pressedFilterButtonBackground: {
    backgroundColor: colors.paleGreen,
  },
});
