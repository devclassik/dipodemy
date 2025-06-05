import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const submitReview = () => {
    console.log('Review Submitted');
   
  };

export default function App() {
  const [selectedOption, setSelectedOption] = useState(false);
  const [fontsLoaded] = useFonts({
    'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
    'Jost-Bold': require('../assets/fonts/Jost-Bold.ttf'),
    'Mulish-Bold': require('../assets/fonts/Mulish-Bold.ttf'),
  });

  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      console.log('File selected:', result);
      
    } else {
      console.log('File selection cancelled');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F9FF' }}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        style={{
          marginTop: 25,
          marginLeft: 35,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.backArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            <Text style={styles.Text}>Write a Reviews</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.graphicContainer}>
        <View style={styles.imageholder} />
        <View style={styles.categoryWrapper}>
          <Text style={styles.Title}>Graphic Design</Text>
          <Text style={styles.SubTitle}>Setup your Graphic Desig..</Text>
        </View>
      </View>

      <Text style={styles.addPhoto}>Add Photo (or) Video</Text>

      <View style={styles.uploadFile}>
        <Pressable onPress={pickFile}>
          <Image
            source={require('../assets/images/upload.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.uploadText}>Click here to Upload</Text>
      </View>

      <Text style={styles.addPhoto}>Write your Review</Text>

      <View style={styles.writeReview}>
        <Text style={styles.reviewText}>
          Would you like to write anything about this Product?
        </Text>
        <Text style={styles.textCount}>
          *250 Characters Remaining
        </Text>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
    <Text style={styles.submitButtonText}>Submit Review</Text>
    <View style={styles.iconContainer}>
      <Ionicons name="arrow-forward" size={24} color="#40E96A" />
    </View>
  </TouchableOpacity>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  Text: {
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    color: '#202244',
    fontWeight: '600',
    marginLeft: 9.75,
  },
  imageholder: {
    width: 81,
    height: 48,
    marginTop: 11,
    marginLeft: 16,
    borderRadius: 16,
    backgroundColor: '#000000',
  },
  graphicContainer: {
    flexDirection: 'row',
    width: 321,
    height: 93,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#B4BDC433',
    marginTop: 135.68,
    marginLeft: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  categoryWrapper: {
    marginLeft: 10,
    marginTop: 11,
  },
  uploadFile: {
    width: 323,
    height: 92,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    borderColor: '#B4BDC433',
    marginTop: 10.68,
    marginLeft: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
  image: {
    width: 55.83,
    height: 27.46,
    marginTop: 12.66,
  },
  uploadText: {
    marginTop: 5.88,
    fontFamily: 'Mulish-Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 12,
  },
  Title: {
    fontFamily: 'Mulish-Bold',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 12,
    color: '#FF6B00',
  },
  SubTitle: {
    marginTop: 4,
    fontFamily: 'Jost-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 14,
    color: '#202244',
  },
  addPhoto: {
    marginLeft: 34,
    marginTop: 39,
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
  },
  writeReview: {
    width: 322,
    height: 150,
    marginTop: 7,
    marginLeft: 34,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    paddingLeft: 9,
    paddingRight: 9,
  },
  reviewText: {
    marginTop: 16,
    fontFamily: 'Mulish-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: '#B4BDC4',
  },
  textCount: {
    width: 157,
    height: 14,
    marginTop: 92,
    marginLeft: 147,
    marginRight: 18,
    marginBottom: 13,
    fontFamily: 'mulish',
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 11,
    color: '#B4BDC4',
  },
  buttonContainer: {

  },
  
  submitButton: {
    flexDirection: 'row',
    width: 235,
    height: 36,
    backgroundColor: '#40E96A',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 29,
    marginLeft: 77,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 4, 

  },
  submitButtonText: {
    width: 127,
    height: 26,
    fontFamily: 'Jost-regular',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 9,
    marginRight: 16.4, 
    marginLeft: 54, 

  },
  iconContainer: {
    width: 32.228572845458984, 
    height: 28.799999237060547, 
    borderRadius: '100%', 
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
