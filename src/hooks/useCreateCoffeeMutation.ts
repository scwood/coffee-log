import { useMutation, useQueryClient } from "react-query";

import { createCoffee } from "../utils/firebaseCoffeeApi";
import { getCoffeesQueryKey } from "./useCoffeesQuery";
import { useAuth } from "../components/AuthProvider";
import { getSettingsQueryKey } from "./useSettingsQuery";

export function useCreateCoffeeMutation() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!userId) {
        return;
      }
      await createCoffee(userId, name);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getCoffeesQueryKey(userId));
      queryClient.invalidateQueries(getSettingsQueryKey(userId));
    },
  });
}
