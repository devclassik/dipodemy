import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SectionCard({ title, count, lessons }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{count} Lessons</Text>
      </View>
      {lessons.map((lesson, index) => (
        <View key={index} style={styles.lesson}>
          <Text>{lesson.no}. {lesson.title} - {lesson.duration}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  count: {
    color: '#40E96A',
    fontWeight: 'bold',
  },
  lesson: {
    paddingVertical: 4,
  },
});
