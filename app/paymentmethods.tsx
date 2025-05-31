import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

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

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        style={{ marginTop: 25, marginLeft: 35 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Payment Methods</Text>
        </View>
      </Pressable>

      <View style={styles.mainContainer}>
        <View style={styles.selectedCourse}>
          <Image
            source={require('../assets/images/Designer.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Graphic Design</Text>
            <Text style={styles.subtitle}>Setup your Graphic Desig..</Text>
          </View>
        </View>

        <Text style={styles.selectMethod}>
          Select the Payment Methods you Want to Use
        </Text>

        {/* Payment Methods */}
        {['Paypal', 'Google Pay', 'Apple Pay', 'Bank Transfer'].map((method) => (
          <View style={styles.paymentOptionWrapper} key={method}>
            <View style={styles.paymentOptionContainer}>
              <Text style={styles.paymentOption}>{method}</Text>
            </View>
            <Pressable
              onPress={() => setSelectedOption(method)}
              style={styles.check}
            >
              {selectedOption === method && <View style={styles.radioInner} />}
            </Pressable>
          </View>
        ))}

        {/* Add New Card */}
        <View style={styles.greenBox}>
          <Ionicons name="add" size={32} color="#fff" />
        </View>

        <Pressable
          style={styles.enrollButton}
          onPress={() => router.push('PAYMENT_METHODS')}
        >
          <Text style={styles.enrollText}>Enroll Course - $55</Text>
          <View style={styles.arrowBox}>
            <Ionicons name="arrow-forward" size={24} color="#40E96A" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backArrow: {
    fontFamily: 'Jost-Regular',
    fontSize: 18,
    color: '#202244',
    marginRight: 10,
  },
  backText: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
    color: '#202244',
    fontWeight: '600',
  },
  selectedCourse: {
    width: 318,
    height: 100,
    marginTop: 18,
    marginLeft: 36,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  image: {
    width: 76,
    height: 72,
    borderRadius: 16,
    marginLeft: 19,
  },
  textWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Mulish-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B00',
    marginLeft: 22,
  },
  subtitle: {
    fontFamily: 'Jost-Bold',
    fontWeight: '600',
    fontSize: 14,
    color: '#202244',
    marginLeft: 22,
  },
  selectMethod: {
    fontFamily: 'Mulish-Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#545454',
    marginTop: 44,
    marginLeft: 35,
  },
  paymentOptionWrapper: {
    width: 312,
    height: 43,
    marginTop: 5,
    marginLeft: 29,
    marginBottom: 30,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    flexDirection: 'row',
    alignContent: 'center',
    elevation: 4,
  },
  paymentOptionContainer: {
    width: 88,
    height: 18,
    marginTop: 13,
    marginLeft: 175,
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  paymentOption: {
    fontFamily: 'Mulish-Bold',
    fontWeight: '800',
    fontSize: 12,
    color: '#202244',
  },
  check: {
    width: 22.5,
    height: 18.63,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B4BDC4',
    marginTop: 12.18,
    marginLeft: 10.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
  },
  greenBox: {
    width: 52,
    height: 49,
    marginTop: 60,
    marginLeft: 296,
    backgroundColor: '#34C759',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enrollButton: {
    width: 297,
    height: 43,
    backgroundColor: '#40E96A',
    borderRadius: 25,
    top: 24,
    left: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  enrollText: {
    fontFamily: 'Jost-Regular',
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 26,
    textAlign: 'center',
    marginRight: 40.56,
    marginLeft: 81,
  },
  arrowBox: {
    right: 8,
    width: 35,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
