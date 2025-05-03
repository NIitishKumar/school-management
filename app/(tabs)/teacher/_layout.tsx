import { Stack } from 'expo-router';
import React from 'react';

export default function TeacherLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}