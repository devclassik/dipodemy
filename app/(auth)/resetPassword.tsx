import ResetPasswordScreen from "@/components/ResetPasswordScreen";
import { useLocalSearchParams } from "expo-router";

export default function ResetPassword() {
  const { isReset } = useLocalSearchParams();

  return <ResetPasswordScreen isReset={isReset === "true"} />;
}
