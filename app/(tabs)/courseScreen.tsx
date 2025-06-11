import SectionCard from '@/components/SectionCard';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

export default function CourseScreen() {
  const courseSections = [
    {
      title: 'Section 01 - Basics',
      count: 2,
      lessons: [
        { no: '01', title: 'Why Using 3D Blender', duration: '15 Mins' },
        { no: '02', title: '3D Blender Installation', duration: '10 Mins' },
      ],
    },
    {
      title: 'Section 02 - Graphics',
      count: 4,
      lessons: [
        { no: '03', title: 'Blender Interface Tour', duration: '20 Mins' },
        { no: '04', title: '3D Modelling Basics', duration: '25 Mins' },
        { no: '05', title: 'Lighting and Shading', duration: '36 Mins' },
        { no: '06', title: 'Plugins Overview', duration: '10 Mins' },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F9FF' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
          My Courses
        </Text>
        {courseSections.map((section, index) => (
          <SectionCard
            key={index}
            title={section.title}
            count={section.count}
            lessons={section.lessons}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
