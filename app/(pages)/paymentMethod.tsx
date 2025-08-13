import PaymentMethodsScreen from "@/components/PaymentMethodScreen";
import { Stack } from "expo-router";
import React from "react";

const PaymentMethod = () => {
  const mockCourses = {
    id: 1,
    category: "Graphic Design",
    title: "Graphic Design Advanced",
    price: "89/-",
    rating: 4.9,
    reviews: 7830,
    image: require("@/assets/images/c1.png"),
  };
  return (
    <>
      <Stack.Screen options={{
        title: "Payment Methods", headerBackTitle: "Back",
        headerShown: true
      }} />
      <PaymentMethodsScreen
        id={mockCourses.id}
        category={mockCourses.category}
        title={mockCourses.title}
        price={mockCourses.price}
        rating={mockCourses.rating}
        reviews={mockCourses.reviews}
        image={mockCourses.image}
        showCourse={false}
      />
      ;
    </>
  );
};

export default PaymentMethod;
