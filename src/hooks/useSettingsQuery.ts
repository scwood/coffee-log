import { useQuery } from "react-query";

import { getSettings } from "../utils/firebaseCoffeeApi";
import { useAuth } from "../components/AuthProvider";

export function getSettingsQueryKey(userId: string | null) {
  return [userId, "settings"];
}

export function useSettingsQuery() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: getSettingsQueryKey(userId),
    queryFn: () => {
      if (!userId) {
        return null;
      }
      return getSettings(userId);
    },
  });
}
