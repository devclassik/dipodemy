// import { Colors } from "@/constants/Colors";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React from "react";
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   useColorScheme,
//   View
// } from "react-native";
// import { ALERT_TYPE, Toast } from "react-native-alert-notification";
// import { Lesson, Section } from "./InstructionSection";
// import { ThemedText } from "./ThemedText";
// import { ThemedView } from "./ThemedView";

// interface LessonSectionsProps {
//   curriculum: Section[];
//   onPress: (item: Lesson) => void;
// }
// const LessonSections: React.FC<LessonSectionsProps> = ({
//   curriculum,
//   onPress,
// }) => {
//   const colorScheme = useColorScheme();
//   const colors = Colors[colorScheme ?? "light"];

//   const handlePdfPress = (url: string) => {
//     Toast.show({
//       type: ALERT_TYPE.INFO,
//       title: "🥳 PDF Loading",
//       textBody: "Please wait while we load the PDF.",
//     });
//     router.navigate({
//       pathname: "/(pages)/webView",
//       params: { url, pageTitle: "PDF Viewer" },
//     });
//   };

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <ThemedView>
//         {curriculum?.map((section, sectionIndex) => (
//           <View key={sectionIndex} style={styles.sectionBlock}>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <ThemedText style={styles.sectionTitle}>
//                 section {sectionIndex + 1}
//               </ThemedText>
//               <ThemedText style={styles.priceText}>
//                 {section.lessons.length || "N/A"}{" "}
//                 {section.lessons.length > 1 ? "Lessons" : "Lesson"}
//               </ThemedText>
//             </View>
//             {section?.lessons.map((lesson, lessonIndex) => (
//               <>
//                 <View key={lessonIndex} style={styles.lessonRow}>
//                   <ThemedText style={styles.lessonIndex}>
//                     {lessonIndex + 1}
//                   </ThemedText>
//                   <View style={{ flex: 1, paddingLeft: 10 }}>
//                     <ThemedText style={styles.lessonTitle}>
//                       {lesson.title}
//                     </ThemedText>
//                     <ThemedText style={styles.lessonDuration}>
//                       {lesson.description || "N/A"}
//                     </ThemedText>

//                     <View style={styles.resourceRow}>
//                       {lesson.video_url && (
//                         <Pressable onPress={() => onPress(lesson)}>
//                           <View style={styles.resourceItem}>
//                             <Ionicons
//                               name="play-outline"
//                               size={18}
//                               color={colors.themeGreen}
//                             />
//                             <ThemedText style={styles.resourceText}>
//                               Watch Video
//                             </ThemedText>
//                           </View>
//                         </Pressable>
//                       )}

//                       {lesson.pdf_url && (
//                         <Pressable onPress={() => handlePdfPress(lesson.pdf_url)}>
//                           <View style={styles.resourceItem}>
//                             <FontAwesome5
//                               name="file-pdf"
//                               size={16}
//                               color={colors.warning}
//                             />
//                             <ThemedText style={styles.resourceText}>
//                               View PDF
//                             </ThemedText>
//                           </View>
//                         </Pressable>
//                       )}

//                       {lesson.has_assignment && (
//                         <Pressable
//                         >
//                           <View style={styles.resourceItem}>
//                             <FontAwesome5
//                               name="clipboard-check"
//                               size={16}
//                               color={colors.danger}
//                             />
//                             <ThemedText style={styles.resourceText}>
//                               Assignment
//                             </ThemedText>
//                           </View>
//                         </Pressable>
//                       )}

//                     </View>
//                   </View>
//                   <Ionicons
//                     name={"chevron-down"}
//                     size={16}
//                     color={colors.text}
//                   />

//                 </View>
//                 <ThemedView style={styles.lessonSeparator} />
//               </>
//             ))}
//           </View >
//         ))}
//       </ThemedView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionBlock: {
//     marginBottom: 20,
//   },

//   sectionTitle: {
//     fontWeight: "bold",
//     marginBottom: 6,
//   },

//   lessonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   priceText: {
//     fontWeight: "bold",
//     color: "#167F71",
//   },
//   lessonIndex: {
//     width: 30,
//     height: 30,
//     color: "#555",
//     backgroundColor: "#E8F1FF",
//     borderRadius: 10,
//     textAlign: "center",
//     textAlignVertical: "center",
//   },

//   lessonTitle: {
//     flex: 1,
//     color: "#333",
//   },
//   lessonDuration: {
//     marginLeft: 8,
//     // color: "gray",
//   },
//   lessonSeparator: {
//     height: 1,
//     backgroundColor: "green",
//     marginTop: 10,
//   },

//   resourceRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//   },
//   resourceItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     backgroundColor: "#E8F1FF",
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//   },
//   resourceText: {
//     color: "#202244",
//     fontSize: 12,
//     fontWeight: "500",
//   },
// });

// export default LessonSections;


// import { Colors } from "@/constants/Colors";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React from "react";
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   useColorScheme,
//   View,
// } from "react-native";
// import { ALERT_TYPE, Toast } from "react-native-alert-notification";
// import { Lesson, Section } from "./InstructionSection";
// import { ThemedText } from "./ThemedText";
// import { ThemedView } from "./ThemedView";

// interface LessonSectionsProps {
//   curriculum: Section[];
//   onPress: (item: Lesson) => void;
// }

// const LessonSections: React.FC<LessonSectionsProps> = ({
//   curriculum,
//   onPress,
// }) => {
//   const colorScheme = useColorScheme();
//   const colors = Colors[colorScheme ?? "light"];

//   const handlePdfPress = (url: string) => {
//     Toast.show({
//       type: ALERT_TYPE.INFO,
//       title: "🥳 PDF Loading",
//       textBody: "Please wait while we load the PDF.",
//     });
//     router.navigate({
//       pathname: "/(pages)/webView",
//       params: { url, pageTitle: "PDF Viewer" },
//     });
//   };

//   return (
// <ScrollView
//   showsVerticalScrollIndicator={false}
// >
//   <ThemedView style={{ paddingBottom: 0 }}>
//     {curriculum?.map((section, sectionIndex) => (
//       <View key={sectionIndex}>
//         <View style={styles.sectionHeader}>
//           <ThemedText style={styles.sectionTitle}>
//             Section {sectionIndex + 1}
//           </ThemedText>
//           <ThemedText style={styles.lessonCount}>
//             {section.lessons.length || "N/A"}
//             {section.lessons.length > 1 ? " Lessons" : " Lesson"}
//           </ThemedText>
//         </View>

//         {section?.lessons.map((lesson, lessonIndex) => (
//           <Pressable
//             key={lessonIndex}
//             style={({ pressed }) => [
//               styles.lessonCard,
//               {
//                 transform: [{ scale: pressed ? 0.98 : 1 }],
//                 backgroundColor: pressed ? "#F8FDFB" : "#333",
//               },
//             ]}
//             onPress={() => onPress(lesson)}
//           >
//             <View style={styles.lessonHeader}>
//               <View style={styles.lessonIndexContainer}>
//                 <ThemedText style={styles.lessonIndexText}>
//                   {lessonIndex + 1}
//                 </ThemedText>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <ThemedText style={styles.lessonTitle}>
//                   {lesson.title}
//                 </ThemedText>
//                 <ThemedText style={styles.lessonSubtitle}>
//                   {lesson.description || "No description available."}
//                 </ThemedText>
//               </View>

//               <Ionicons
//                 name="chevron-forward"
//                 size={18}
//                 color={colors.themeGreen}
//               />
//             </View>

//             <View style={styles.resourceRow}>
//               {lesson.video_url && (
//                 <View
//                   style={[styles.resourcePill, { backgroundColor: "#E3FFF2" }]}
//                 >
//                   <Ionicons
//                     name="play-circle-outline"
//                     size={16}
//                     color={colors.themeGreen}
//                   />
//                   <ThemedText
//                     style={[styles.resourceText, { color: colors.themeGreen }]}
//                   >
//                     Video
//                   </ThemedText>
//                 </View>
//               )}

//               {lesson.pdf_url && (
//                 <Pressable onPress={() => handlePdfPress(lesson.pdf_url)}>
//                   <View
//                     style={[styles.resourcePill, { backgroundColor: "#FFF7E6" }]}
//                   >
//                     <FontAwesome5
//                       name="file-pdf"
//                       size={14}
//                       color={colors.warning}
//                     />
//                     <ThemedText
//                       style={[styles.resourceText, { color: colors.warning }]}
//                     >
//                       PDF
//                     </ThemedText>
//                   </View>
//                 </Pressable>
//               )}

//               {lesson.has_assignment && (
//                 <View
//                   style={[styles.resourcePill, { backgroundColor: "#FFE9E9" }]}
//                 >
//                   <FontAwesome5
//                     name="clipboard-check"
//                     size={14}
//                     color={colors.danger}
//                   />
//                   <ThemedText
//                     style={[styles.resourceText, { color: colors.danger }]}
//                   >
//                     Assignment
//                   </ThemedText>
//                 </View>
//               )}
//             </View>
//           </Pressable>
//         ))}
//       </View>
//     ))}
//   </ThemedView>
// </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   lessonCount: {
//     fontWeight: "500",
//     color: "#167F71",
//   },
//   lessonCard: {
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.08,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   lessonHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   lessonIndexContainer: {
//     width: 32,
//     height: 32,
//     backgroundColor: "#E8F1FF",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     borderEndEndRadius: 10,
//     borderTopStartRadius: 10
//   },
//   lessonIndexText: {
//     color: "#333",
//     fontWeight: "600",
//   },
//   lessonTitle: {
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   lessonSubtitle: {
//     fontSize: 12,
//     marginTop: 5,
//   },
//   resourceRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 10,
//     gap: 8,
//   },
//   resourcePill: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 50,
//     gap: 6,
//   },
//   resourceText: {
//     fontWeight: "500",
//     fontSize: 12,
//   },
// });

// export default LessonSections;



import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Lesson, Section } from "./InstructionSection";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const { height } = Dimensions.get("window");

interface LessonSectionsProps {
  curriculum: Section[];
  onPress: (item: Lesson) => void;
  courseId?: number | null;
}

const LessonSections: React.FC<LessonSectionsProps> = ({
  curriculum,
  onPress,
  courseId,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(height));
  const [fadeAnim] = useState(new Animated.Value(0));

  const openModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalVisible(true);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsModalVisible(false);
      setSelectedLesson(null);
    });
  };


  const handlePdfPress = (url: string) => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "🥳 PDF Loading",
      textBody: "Please wait while we load the PDF.",
    });
    router.navigate({
      pathname: "/(pages)/webView",
      params: { url, pageTitle: "PDF Viewer" },
    });
  };

  return (
    <>
      {/* LESSON LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <ThemedView>
          {curriculum?.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>
                  Section {sectionIndex + 1}
                </ThemedText>
                <ThemedText style={styles.lessonCount}>
                  {section.lessons.length}{" "}
                  {section.lessons.length > 1 ? "Lessons" : "Lesson"}
                </ThemedText>
              </View>

              {section.lessons.map((lesson, index) => (
                <Pressable
                  key={index}
                  onPress={() => openModal(lesson)}
                  style={({ pressed }) => [
                    styles.lessonCard,
                    { transform: [{ scale: pressed ? 0.995 : 1 }] },
                  ]}
                >
                  <View style={styles.lessonHeader}>
                    <View style={styles.lessonIndexContainer}>
                      <ThemedText style={styles.lessonIndexText}>
                        {index + 1}
                      </ThemedText>
                    </View>

                    <View style={{ flex: 1 }}>
                      <ThemedText style={styles.lessonTitle}>
                        {lesson.title}
                      </ThemedText>
                      <ThemedText style={styles.lessonSubtitle}>
                        {lesson.description || "No description available."}
                      </ThemedText>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={colors.themeGreen}
                    />
                  </View>

                  <View style={styles.resourceRow}>
                    {lesson.video_url && (
                      <View style={[styles.resourcePill, { backgroundColor: "#E3FFF2" }]}>
                        <Ionicons
                          name="play-circle-outline"
                          size={16}
                          color={colors.themeGreen}
                        />
                        <ThemedText style={[styles.resourceText, { color: colors.themeGreen }]}>
                          Video
                        </ThemedText>
                      </View>
                    )}

                    {lesson.pdf_url && (
                      <Pressable onPress={() => handlePdfPress(lesson.pdf_url)}>
                        <View style={[styles.resourcePill, { backgroundColor: "#FFF7E6" }]}>
                          <FontAwesome5 name="file-pdf" size={14} color={colors.warning} />
                          <ThemedText style={[styles.resourceText, { color: colors.warning }]}>
                            PDF
                          </ThemedText>
                        </View>
                      </Pressable>
                    )}

                    {lesson.has_assignment && (
                      <View style={[styles.resourcePill, { backgroundColor: "#FFE9E9" }]}>
                        <FontAwesome5 name="clipboard-check" size={14} color={colors.danger} />
                        <ThemedText style={[styles.resourceText, { color: colors.danger }]}>
                          Assignment
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          ))}
        </ThemedView>
      </ScrollView>

      {isModalVisible && selectedLesson && (
        <Modal transparent animationType="none" visible={true}>
          {/* Fade background */}
          <Animated.View
            style={[styles.modalBackdrop, { opacity: fadeAnim }]}
          >
            <Pressable style={{ flex: 1 }} onPress={closeModal} />
          </Animated.View>

          {/* Slide-up card */}
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>
                {selectedLesson.title}
              </ThemedText>
              <ThemedText style={styles.modalDesc}>
                {selectedLesson.description || "No description available."}
              </ThemedText>

              {/* Thumbnail */}
              {selectedLesson.video_url && (
                <Pressable
                  style={styles.thumbCard}
                  onPress={() => onPress(selectedLesson)}
                >
                  <Image
                    source={{
                      uri:
                        selectedLesson.pdf_url ||
                        "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
                    }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.thumbOverlay}>
                    <Ionicons
                      name="play-circle"
                      size={46}
                      color="rgba(255,255,255,0.95)"
                    />
                  </View>
                </Pressable>
              )}

              {/* PDF */}
              {selectedLesson.pdf_url && (
                <Pressable
                  style={styles.pdfCard}
                  onPress={() => handlePdfPress(selectedLesson.pdf_url!)}
                >
                  <FontAwesome5 name="file-pdf" size={20} color="#d9534f" />
                  <ThemedText style={styles.pdfText}>Open PDF</ThemedText>
                </Pressable>
              )}

              {/* Assignment */}
              {selectedLesson.has_assignment && (
                <Pressable
                  style={styles.assignmentCard}
                  onPress={() =>
                    router.navigate({
                      pathname: "/(pages)/assignment",
                      params: { data: courseId },
                    })
                  }
                >
                  <FontAwesome5 name="clipboard-check" size={20} color="#167F71" />
                  <ThemedText style={styles.assignmentText}>
                    Go to Assignment
                  </ThemedText>
                </Pressable>
              )}

              {/* Review button */}
              <Pressable
                style={styles.reviewButton}
                onPress={() =>
                  router.navigate({
                    pathname: "/(pages)/writeReview",
                    params: { data: courseId },
                  })
                }
              >
                <ThemedText style={styles.reviewButtonText}>
                  Add Review
                </ThemedText>
              </Pressable>
            </View>
          </Animated.View>
        </Modal>
      )}

    </>
  );
};

const styles = StyleSheet.create({
  sectionBlock: { marginBottom: 5 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontWeight: "700", fontSize: 16 },
  lessonCount: { fontWeight: "500", color: "#167F71" },

  lessonCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#fff", // default card bg
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  lessonIndexContainer: {
    width: 36,
    height: 36,
    backgroundColor: "#E8F1FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonIndexText: { color: "#333", fontWeight: "600" },
  lessonTitle: { fontWeight: "700", fontSize: 15, color: "#222" },
  lessonSubtitle: { fontSize: 13, marginTop: 6, color: "#666" },

  resourceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
  resourcePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    gap: 8,
  },
  resourceText: {
    fontWeight: "600",
    fontSize: 12,
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 28,
  },
  modalContent: {
    gap: 14,
  },
  modalTitle: {
    fontWeight: "800",
    fontSize: 18,
    textAlign: "center",
  },
  modalDesc: {
    textAlign: "center",
    fontSize: 13,
    color: "#666",
  },

  // ** MISSING THUMBNAIL STYLES (added) **
  thumbCard: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    maxWidth: 560,
    height: 190,
    backgroundColor: "#000", // fallback for smooth play overlay contrast
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  pdfCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFF3F3",
    padding: 12,
    borderRadius: 10,
  },
  pdfText: { fontWeight: "700", color: "#d9534f", marginLeft: 6 },

  assignmentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#E8FFF2",
    padding: 12,
    borderRadius: 10,
  },
  assignmentText: { fontWeight: "700", color: "#167F71", marginLeft: 6 },

  reviewButton: {
    backgroundColor: "#167F71",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  reviewButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
});

export default LessonSections;

