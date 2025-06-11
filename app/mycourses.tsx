import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


  const handleStartCourse = () => {
    console.log('Start Course Again pressed');
    // Navigate to: "41_MY COURSE - ONGOING - VIDEO"
    // Navigation logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} style={{ marginBottom: 113 }}>

        {/* Header */}
        <View style={styles.header}>
          <Feather name="arrow-left" size={24} color="#202244" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>My Courses</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="3D Design Illustration"
            placeholderTextColor="#B4BDC4"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => console.log('Search pressed')}
          >
            <FontAwesome name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Section 01 */}
        <View style={styles.sectionCard}>
          {/* Section 01 */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Section 01 -</Text>
            </View>
            <View style={styles.sectionCountContainer}>
              <Text style={styles.sectionCount}>25</Text>
            </View>
          </View>

          {[
            { no: '01', title: 'Why Using 3D Blender', duration: '15 Mins' },
            { no: '02', title: '3D Blender Installation', duration: '10 Mins' },
          ].map((item, index) => (
            <View key={`s1-${index}`} style={styles.lessonRow}>
              <View style={styles.lessonCircle}>
                <Text style={styles.lessonNumber}>{item.no}</Text>
              </View>
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.lessonDuration}>{item.duration}</Text>
              </View>
              <FontAwesome
                name="play-circle"
                size={24}
                color="#40E96A"
                style={styles.playIcon}
              />
              <View style={styles.bottomLine} />
            </View>
          ))}

          {/* Section 02 - Graphic */}
          <View style={[styles.sectionHeader, { marginTop: 20 }]}>
            <Text style={styles.sectionTitle}>
              Section 02 - <Text style={{ color: '#40E96A' }}>Graphic</Text>
            </Text>
            <Text style={styles.sectionCount}>125</Text>
          </View>

          {[
            { no: '03', title: 'Take a Look Blender Interfa…', duration: '20 Mins' },
            { no: '04', title: 'The Basic of 3D Modelling', duration: '25 Mins' },
            { no: '05', title: 'Shading and Lighting', duration: '36 Mins' },
            { no: '06', title: 'Using Graphic Plugins', duration: '10 Mins' },
          ].map((item, index) => (
            <View key={`s2-${index}`} style={styles.lessonRow}>
              <View style={styles.lessonCircle}>
                <Text style={styles.lessonNumber}>{item.no}</Text>
              </View>
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.lessonDuration}>{item.duration}</Text>
              </View>
              <FontAwesome
                name="play-circle"
                size={24}
                color="#40E96A"
                style={styles.playIcon}
              />
              <View style={styles.bottomLine} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Fixed Bar */}
      <View style={styles.bottomBar}>
  <TouchableOpacity style={styles.leftButton}>
    <Image
      source={require('../assets/images/Certi.png')}
      style={styles.iconImage}
      resizeMode="contain"
    />
  </TouchableOpacity>
  <TouchableOpacity style={styles.startButton} onPress={handleStartCourse}>
    <Text style={styles.startButtonText}>Start Course Again</Text>
    <View style={styles.iconContainer}>
      <Ionicons name="arrow-forward" size={24} color="#40E96A" />
    </View>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 22,
    marginTop: 25,
    marginBottom: 24,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Jost_600SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#202244',
    marginLeft: 8.43,
  },
  searchBarWrapper: {
    width: 322,
  height: 51,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  paddingHorizontal: 12,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Mulish_700Bold',
    fontSize: 14,
    lineHeight: 14,
    marginLeft: 15,
    color: '#000',
    height: 20,
  },
  searchButton: {
    width: 34,
    height: 30.28,
    borderRadius: 10,
    backgroundColor: '#40E96A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sectionCard: {
    width: 321.87, // Figma-specific width
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 16,
  marginTop: 33,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 5,
  alignSelf: 'center', // Center the card since it's not full width
},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 21,
    marginTop: 23,
    marginBottom: 18.6,
  },
  sectionTitleContainer: {
    flex: 1,
    height: 22,
  },
  sectionCountContainer: {
    height: 15,
    justifyContent: 'center',
    marginTop: 3,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Jost_600SemiBold',
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#40E96A',
    marginRight: 12,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomColor: '#F5F9FF',
    position: 'relative',
  },
  bottomLine: {
  position: 'absolute',
  bottom: 0,
  left: -16,
  right: -16,
  height: 2,
  backgroundColor: '#F5F9FF',
},
  lessonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8F1FF',
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonNumber: {
    color: '#202244',
    fontWeight: '700',
    fontSize: 15,
  },
  lessonContent: {
    flex: 1,
    marginLeft: 20,
  },
  lessonTitle: {
    fontWeight: '700',
    fontFamily: 'Jost_600SemiBold',
    fontSize: 14,
    marginBottom: 8,
  },
  lessonDuration: {
    fontWeight: '700',
    fontSize: 12,
    color: '#545454',

  },
  playIcon: {
    marginLeft: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    height: 113,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 8,
  },
  leftButton: {
    width: 79.38,
    height: 54,
    backgroundColor: '#E8F1FF',
    borderRadius: 30,
    borderColor: '#B4BDC4',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 34,
  },
  iconImage: {
    width: 27.62,
    height: 24.89,
    
  },
  startButton: {
    flexDirection: 'row',
    width: 211,
    height: 54,
    backgroundColor: '#40E96A',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 13.62,
  },
  startButtonText: {
    fontFamily: 'Jost_600SemiBold',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 16.75, 
    marginLeft: 26.16, 

  },
  iconContainer: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
