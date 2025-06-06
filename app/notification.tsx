import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const notifications = [
  {
    id: 1,
    day: 'Today',
    image: require('@/assets/images/category.png'),
    title: 'New Category Course.!',
    subtitle: 'New the 3D Design Course is Availa…',
    subtitleStyle: 'CategorySubTitle',
    marginTop: 135.68,
  },
  {
    id: 2,
    day: null,
    image: require('@/assets/images/offer.png'),
    title: 'Today’s Special Offers',
    subtitle: 'You Have made a Course Payment.',
    subtitleStyle: 'offerSubTitle',
    marginTop: 10.68,
  },
  {
    id: 3,
    day: 'Yesterday',
    image: require('@/assets/images/credit-card.png'),
    title: 'Credit Card Connected.!',
    subtitle: 'Credit Card has been Linked.!',
    subtitleStyle: 'cardSubTitle',
    marginTop: 26.78,
  },
  {
    id: 4,
    day: 'Nov 20, 2022',
    image: require('@/assets/images/account-setup.png'),
    title: 'Account Setup Successful.!',
    subtitle: 'Your Account has been Created.',
    subtitleStyle: 'setupSubTitle',
    marginTop: 30.97,
  },
];

export default function NotificationScreen() {
  const [selectedOption, setSelectedOption] = useState(false);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F9FF' }}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        style={{ marginTop: 25, marginLeft: 35 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.backArrow}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            <Text style={styles.notificationText}>Notifications</Text>
          </View>
        </View>
      </Pressable>

      {notifications.map((item, index) => (
        <React.Fragment key={item.id}>
          {item.day && <Text style={styles.dynamicDay}>{item.day}</Text>}
          <NotificationCard
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            subtitleStyle={styles[item.subtitleStyle]}
            marginTop={item.marginTop}
          />
        </React.Fragment>
      ))}

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

const NotificationCard = ({ image, title, subtitle, subtitleStyle, marginTop }) => (
  <View style={[styles.card, { marginTop }]}>
    <Image source={image} style={styles.image} resizeMode="contain" />
    <View style={styles.categoryWrapper}>
      <Text style={styles.CategoryTitle}>{title}</Text>
      <Text style={subtitleStyle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  backArrow: {
    flexDirection: 'row',
    fontSize: 16,
    color: '#202244',
    fontWeight: '600',
    marginTop: 25,
  },
  notificationText: {
    fontSize: 16,
    color: '#202244',
    fontWeight: '600',
    marginLeft: 9.75,
  },
  dynamicDay: {
    marginLeft: 34,
    marginTop: 17,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
  card: {
    flexDirection: 'row',
    width: 323,
    height: 88.828,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: '#E8F1FF',
    borderColor: '#B4BDC433',
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
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    color: '#202244',
  },
  CategorySubTitle: {
    width: 224,
    height: 18,
    marginTop: 4.68,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  setupSubTitle: {
    width: 188,
    height: 18,
    marginTop: 4.68,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  offerSubTitle: {
    width: 204,
    height: 18,
    marginTop: 4.68,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  cardSubTitle: {
    width: 172,
    height: 18,
    marginTop: 4.68,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#545454',
  },
  day: {
    marginLeft: 34,
    marginTop: 17,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
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
    fontSize: 9,
    fontWeight: '800',
    color: '#000',
    marginTop: 4,
  },
});
