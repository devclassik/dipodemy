import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const CreatePinScreen = () => {
  const [pin, setPin] = useState<string[]>([]);

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      setPin(prev => prev.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(prev => [...prev, key]);
    }
  };

  const renderPinDots = () =>
    Array(4)
      .fill('')
      .map((_, i) => (
        <View key={i} style={styles.pinBox}>
          <Text style={styles.pinText}>{pin[i] ? '•' : ''}</Text>
        </View>
      ));

  const keypadKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', 'delete'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Create New Pin</Text>
      <Text style={styles.subtitle}>Add a Pin Number to Make Your Account more Secure</Text>

      <View style={styles.pinRow}>{renderPinDots()}</View>

      <TouchableOpacity
        style={styles.continueBtn}
        disabled={pin.length < 4}
        onPress={() => console.log('Pin:', pin.join(''))}
      >
        <Text style={styles.continueText}>Continue</Text>
        <Ionicons name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.keypad}>
        {keypadKeys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((key, keyIndex) => (
              <TouchableOpacity
                key={keyIndex}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(key)}
              >
                {key === 'delete' ? (
                  <Ionicons name="backspace-outline" size={24} color="#000" />
                ) : (
                  <Text style={styles.keyText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    color: '#1e1e1e',
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
    maxWidth: 280,
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    gap: 12,
  },
  pinBox: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27d86c',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  keypad: {
    marginTop: 10,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  keypadKey: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#ccc',
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
