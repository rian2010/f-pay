import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

type CardProps = {
  id: string;
  name: string;
  image: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const Card: React.FC<CardProps> = ({ id, name, image, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={() => onSelect(id)} // Toggling selection on press
    >
      <View style={styles.cardContent}>
        {/* Left: Image and Name */}
        <View style={styles.cardInfo}>
          <Image source={{ uri: image }} style={styles.cardImage} />
          <Text style={[styles.cardText, isSelected && styles.selectedCardText]}>
            {name}
          </Text>
        </View>
        {/* Right: Radio Button */}
        <View style={styles.radioButton}>
          {isSelected && <View style={styles.radioButtonInner} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#e6f4ff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCardText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
});

