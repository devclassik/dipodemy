import LottieView from 'lottie-react-native';
import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  lottieSource?: any; // require('./path/to/lottie.json') or uri
  imageSource?: any; // require or { uri: string }
  caption?: string;
  subText?: string;
  loading?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
}

const { width } = Dimensions.get('window');

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  lottieSource,
  imageSource,
  caption,
  subText,
  loading,
  buttonText,
  onButtonPress,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          {lottieSource && (
            <LottieView
              source={lottieSource}
              autoPlay
              loop
              style={styles.lottie}
            />
          )}

          {imageSource && (
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
          )}

          {caption && <Text style={styles.caption}>{caption}</Text>}
          {subText && <Text style={styles.caption}>{subText}</Text>}

          {loading && (
            <ActivityIndicator size="large" color="#27d86c" style={{ marginVertical: 10 }} />
          )}

          {buttonText && (
            <TouchableOpacity style={styles.button} onPress={onButtonPress}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  caption: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#27d86c',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CustomModal;
