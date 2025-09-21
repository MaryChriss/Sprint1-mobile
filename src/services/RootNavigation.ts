import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function resetToLogin() {
  if (!navigationRef.isReady()) return;
  const current = navigationRef.getCurrentRoute()?.name;
  if (current !== "Login") {
    navigationRef.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    });
  }
}
