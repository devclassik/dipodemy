import NotificationCard from "@/components/NotificationCard";
import React from "react";
import { StyleSheet } from "react-native";

export default function NotificationScreen() {
  const notification = [
    {
      title: "Payment Successful",
      image: require("@/assets/images/offer.png"),
      subtitle: "Your course has been activated.",
      date: new Date(),
      isRead: false,
    },
    {
      title: "Reminder",
      subtitle: "You have a class at 3 PM.",
      date: new Date(),
      isRead: true,
    },
    {
      title: "Payment Successful",
      image: require("@/assets/images/offer.png"),
      subtitle: "Your course has been activated.",
      date: new Date(),
      isRead: false,
    },
    {
      title: "Reminder",
      subtitle: "You have a class at 3 PM.",
      date: new Date(),
      isRead: true,
    },
    {
      title: "Payment Successful",
      image: require("@/assets/images/offer.png"),
      subtitle: "Your course has been activated.",
      date: new Date(),
      isRead: false,
    },
    {
      title: "Reminder",
      subtitle: "You have a class at 3 PM.",
      date: new Date(),
      isRead: true,
    },
    {
      title: "Payment Successful",
      image: require("@/assets/images/offer.png"),
      subtitle: "Your course has been activated.",
      date: new Date(),
      isRead: false,
    },
    {
      title: "Reminder",
      subtitle: "You have a class at 3 PM.",
      date: new Date(),
      isRead: true,
    },
    {
      title: "Course Reminder",
      subtitle: "Your design class starts soon!",
      date: new Date(), // Today
      isRead: false,
    },
    {
      title: "New Assignment",
      subtitle: "Upload your latest portfolio update.",
      date: new Date(), // Today
      isRead: false,
    },
    {
      title: "Class Cancelled",
      subtitle: "Instructor is unavailable today.",
      date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
      isRead: true,
    },
    {
      title: "Exam Results",
      subtitle: "You scored 85% on your last test!",
      date: new Date("2025-06-05"),
      isRead: true,
    },
    {
      title: "Welcome Aboard",
      subtitle: "Thanks for joining the Graphic Design course!",
      date: new Date("2025-06-03"),
      isRead: false,
    },
    {
      title: "Project Feedback",
      subtitle: "Great work on your recent logo redesign.",
      date: new Date("2025-06-02"),
      isRead: false,
    },
    {
      title: "Live Q&A",
      subtitle: "Join us at 6pm for a live Q&A with mentors.",
      date: new Date("2025-06-01"),
      isRead: true,
    },
    {
      title: "New Mentor",
      subtitle: "Meet Sarah, your new UI/UX mentor.",
      date: new Date("2025-05-30"),
      isRead: false,
    },
    {
      title: "App Update",
      subtitle: "We’ve rolled out new features in the app.",
      date: new Date("2025-05-29"),
      isRead: true,
    },
    {
      title: "Class Materials",
      subtitle: "New course materials have been uploaded.",
      date: new Date("2025-05-25"),
      isRead: false,
    },
  ];

  return <NotificationCard notifications={notification} />;
}

const styles = StyleSheet.create({});
