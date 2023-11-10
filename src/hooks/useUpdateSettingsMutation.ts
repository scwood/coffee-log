import { useMutation, useQueryClient } from "react-query";

import { useAuth } from "../components/AuthProvider";
import { upsertSettings } from "../utils/firebaseCoffeeApi";
import { getSettingsQueryKey } from "./useSettingsQuery";
import { Settings } from "../types/Settings";

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation({
    mutationFn: async ({ settings }: { settings: Settings }) => {
      await upsertSettings(settings);
    },
    onMutate: ({ settings }) => {
      queryClient.setQueryData(getSettingsQueryKey(userId), settings);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getSettingsQueryKey(userId));
    },
  });
}
