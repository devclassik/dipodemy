import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { default as React, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Forgot Password</Text>
        </View>
      </Pressable>

      <View style={styles.mainContainer}>
        <View style={styles.contactDetails}>
          <Text style={styles.contactText}>
            Select which contact details should we use to Reset Your Password
          </Text>
        </View>

        {/* Email Option */}
        <View style={styles.emailContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../assets/images/Email.png')}
              style={styles.emailIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.emailTextWrapper}>
            <Text style={styles.viaEmail}>Via Email</Text>
            <Text style={styles.emailText}>priscilla.frank26@gmail.com</Text>
          </View>
        </View>

        {/* SMS Option */}
        <View style={styles.emailContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../assets/images/Email.png')}
              style={styles.emailIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.emailTextWrapper}>
            <Text style={styles.viaEmail}>Via SMS</Text>
            <Text style={styles.emailText}>+234 70456578</Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={Continue}>
          <Text style={styles.continueButtonText}>Continue</Text>
          <View style={styles.iconContainer}>
            <Ionicons name="arrow-forward" size={24} color="#40E96A" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  backArrow: {
    fontFamily: 'Jost-Regular',
    fontSize: 18,
    color: '#202244',
    marginRight: 10,
    marginTop: 29,
  },
  backText: {
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    color: '#202244',
    fontWeight: '600',
    marginTop: 29,
  },
  contactDetails: {
    width: 279,
    height: 44,
    marginLeft: 56,
    marginTop: 275,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
    color: '#545454',
  },
  emailContainer: {
    width: 301,
    height: 47,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 18,
    marginBottom: 10,
    marginLeft: 45,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 30.1,
    height: 21.15,
    marginLeft: 17.56,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FF9C07',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '80%',
  },
  emailIcon: {
    width: 15,
    height: 15,
  },
  emailTextWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  viaEmail: {
    width: 95,
    height: 15,
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 12,
    color: '#202244',
    marginBottom: 5,
  },
  emailText: {
    width: 216,
    height: 18,
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#202244',
  },
  continueButton: {
  flexDirection: 'row',
  width: 236,
  height: 38,
  backgroundColor: '#40E96A',
  borderRadius: 30,
  alignItems: 'center',
  paddingVertical: 10,
  marginTop: 35,
  marginLeft: 77,
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.3, 
  shadowRadius: 8,
  elevation: 4,
},

  continueButtonText: {
    fontFamily: 'Jost-Regular',
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 18,
    marginRight: 16.75, 
    marginLeft: 73,
    letterSpacing: 1,
  },
  iconContainer: {
    width: 32.37, 
    height: 30.4, 
    borderRadius: 15, 
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 31.57,
  },
});
