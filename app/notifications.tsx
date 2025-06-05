import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function NotificationScreen() {
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

  const Continue = () => {
    console.log("Continue button pressed");
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
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.backArrow}><Ionicons name="arrow-back-outline" size={24} color="black" />
          <Text style={styles.notificationText}>Notifications</Text>
          </View>
        </View>
      </Pressable>

      <Text style={styles.dynamicDay}>Today</Text>

      <View style={styles.categoryNotification}>
        <Image
          source={require('../assets/images/Category.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.categoryWrapper}>
          <Text style={styles.CategoryTitle}>New Category Course.!</Text>
          <Text style={styles.CategorySubTitle}>New the 3D Design Course is Availa…</Text>
        </View>
      </View>

      <View style={styles.offerNotification}>
        <Image
          source={require('../assets/images/offer.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.categoryWrapper}>
          <Text style={styles.CategoryTitle}>Today’s Special Offers</Text>
          <Text style={styles.offerSubTitle}>You Have made a Course Payment.</Text>
        </View>
      </View>

      <Text style={styles.dynamicDay}>Yesterday</Text>

      <View style={styles.creditCardNotification}>
        <Image
          source={require('../assets/images/credit-card.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.categoryWrapper}>
          <Text style={styles.CategoryTitle}>Credit Card Connected.!</Text>
          <Text style={styles.cardSubTitle}>Credit Card has been Linked.!</Text>
        </View>
      </View>

      <Text style={styles.day}>Nov 20, 2022</Text>

      <View style={styles.accountSetupNotification}>
        <Image
          source={require('../assets/images/account-setup.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.categoryWrapper}>
          <Text style={styles.CategoryTitle}>Account Setup Successful.!</Text>
          <Text style={styles.setupSubTitle}>Your Account has been Created.</Text>
        </View>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
  <Pressable style={styles.iconContainer}>
    <Octicons name="home" size={24} color="black" />
    <Text style={styles.iconLabel}>HOME</Text>
  </Pressable>
  <Pressable style={styles.iconContainer}>
    <Ionicons name="newspaper-outline" size={24} color="black" />
    <Text style={styles.iconLabel}>LEARN</Text>
  </Pressable>
  <Pressable style={styles.iconContainer}>
    <MaterialCommunityIcons name="text-box-search-outline" size={24} color="black" />
    <Text style={styles.iconLabel}>SEARCH</Text>
  </Pressable>
  <Pressable style={styles.iconContainer}>
    <Octicons name="briefcase" size={24} color="black" />
    <Text style={styles.iconLabel}>MY COURSE</Text>
  </Pressable>
  <Pressable style={styles.iconContainer}>
    <Ionicons name="person-outline" size={24} color="orange" />
    <Text style={[styles.iconLabel, { color: 'orange' }]}>PROFILE</Text>
  </Pressable>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  backArrow: {
    flexDirection: 'row',
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    color: '#202244',
    fontWeight: '600',
    marginTop: 25,
  },
  notificationText: {
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    color: '#202244',
    fontWeight: '600',
    marginLeft: 9.75,
  },
  dynamicDay: {
    marginLeft: 34,
    marginTop: 17,
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
  categoryNotification: {
    flexDirection: 'row',
    width: 323,
    height: 88.828,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: '#E8F1FF',
    borderColor: '#B4BDC433',
    marginTop: 135.68,
    marginLeft: 34,
  },
  offerNotification: {
    flexDirection: 'row',
    width: 323,
    height: 88.828,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: '#E8F1FF',
    borderColor: '#B4BDC433',
    marginTop: 10.68,
    marginLeft: 34,
  },
  image: {
    marginLeft: 16.65,
    alignSelf: 'center',
  },
  categoryWrapper: {
    marginLeft: 7.18,
  },
  CategoryTitle: {
    width: 211,
    height: 27,
    marginTop: 17.32,
    fontFamily: 'Jost-Bold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    color: '#202244',
  },
  CategorySubTitle: {
    width: 224,
    height: 18,
    marginTop: 4.68,
    fontFamily: 'Mulish-Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  setupSubTitle: {
    width: 188,
    height: 18,
    marginTop: 4.68,
    fontFamily: 'Mulish-Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  offerSubTitle: {
    width: 204,
    height: 18,
    marginTop: 4.68,
    fontFamily: 'Mulish-Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  cardSubTitle: {
    width: 172,
    height: 18,
    marginTop: 4.68,
    fontFamily: 'Mulish-Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  day: {
    marginLeft: 34,
    marginTop: 17,
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
  creditCardNotification: {
    flexDirection: 'row',
    width: 323,
    height: 88.828,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: '#E8F1FF',
    borderColor: '#B4BDC433',
    marginTop: 26.78,
    marginLeft: 34,
  },
  accountSetupNotification: {
    flexDirection: 'row',
    width: 323,
    height: 88.828,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: '#E8F1FF',
    borderColor: '#B4BDC433',
    marginTop: 30.97,
    marginLeft: 34,
  },
  bottomBar: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: 79.67,
  backgroundColor: '#40E96A',
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 100,
},
iconContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

iconLabel: {
  fontFamily: 'mulish',
  fontSize: 9,
  fontWeight: '800',
  color: '#000',
  marginTop: 4,
},

});
