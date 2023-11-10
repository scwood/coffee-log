import { Anchor, Button, Flex, Skeleton, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import { Coffee } from "../types/Coffee";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeModal } from "./CoffeeModal";
import { useAuth } from "./AuthProvider";
import { useCoffeesQuery } from "../hooks/useCoffeesQuery";
import { useCreateCoffeeMutation } from "../hooks/useCreateCoffeeMutation";
import { useDeleteCoffeeMutation } from "../hooks/useDeleteCoffeeMutation";
import { useUpdateCoffeeMutation } from "../hooks/useUpdateCoffeeMutation";
import { useSettingsQuery } from "../hooks/useSettingsQuery";
import { useUpdateSettingsMutation } from "../hooks/useUpdateSettingsMutation";
import { Link } from "react-router-dom";

export function CoffeeList() {
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false);
  const [coffeeToEdit, setCoffeeToEdit] = useState<Coffee | undefined>();

  const { userId } = useAuth();

  const {
    data: coffees,
    isLoading: isLoadingCoffees,
    isError: failedToLoadCoffees,
  } = useCoffeesQuery();

  const {
    data: settings,
    isLoading: isLoadingSettings,
    isError: failedToLoadSettings,
  } = useSettingsQuery();

  const isLoading = isLoadingCoffees || isLoadingSettings;
  const isError = failedToLoadCoffees || failedToLoadSettings || !coffees;

  const createCoffeeMutation = useCreateCoffeeMutation();
  const updateCoffeeMutation = useUpdateCoffeeMutation();
  const deleteCoffeeMutation = useDeleteCoffeeMutation();
  const updateSettingsMutation = useUpdateSettingsMutation();

  let content: JSX.Element;

  if (isLoading) {
    content = <Skeleton height={85} />;
  } else if (isError) {
    content = (
      <Text ta="center" mt="lg" c="dimmed">
        Failed to fetch coffees
      </Text>
    );
  } else if (coffees.length === 0) {
    content = (
      <Text ta="center" mt="lg" c="dimmed">
        {userId ? (
          <>Add a coffee to get started</>
        ) : (
          <>
            <Anchor component={Link} to="/sign-in">
              Sign in
            </Anchor>{" "}
            to get started
          </>
        )}
      </Text>
    );
  } else {
    const sortedCoffees = settings
      ? coffees.sort((a, b) => {
          return (
            settings.coffeeOrder.indexOf(a.id) -
            settings.coffeeOrder.indexOf(b.id)
          );
        })
      : coffees;
    content = (
      <Flex direction="column" gap="md">
        {sortedCoffees.map((coffee, i) => {
          return (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              disableMoveUp={i === 0}
              disableMoveDown={i === coffees.length - 1}
              onMoveUp={(coffee) => handleMoveCoffee(coffee, "up")}
              onMoveDown={(coffee) => handleMoveCoffee(coffee, "down")}
              onDelete={handleDelete}
              onEdit={openEditModal}
            />
          );
        })}
      </Flex>
    );
  }

  return (
    <>
      <Flex justify="space-between" align="center" mb="md">
        <Title m={0} order={3}>
          Your coffee
        </Title>
        <Button
          color="green"
          leftSection={<IconPlus />}
          onClick={openCreateModal}
          disabled={!userId}
        >
          New coffee
        </Button>
      </Flex>
      {content}
      <CoffeeModal
        title={coffeeToEdit ? "Edit coffee" : "New coffee"}
        initialValues={coffeeToEdit}
        opened={isCoffeeModalOpen}
        loadingSave={
          updateCoffeeMutation.isLoading || createCoffeeMutation.isLoading
        }
        onClose={() => setIsCoffeeModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );

  function openCreateModal() {
    setCoffeeToEdit(undefined);
    setIsCoffeeModalOpen(true);
  }

  function openEditModal(coffee: Coffee) {
    setCoffeeToEdit(coffee);
    setIsCoffeeModalOpen(true);
  }

  async function handleSave(name: string) {
    if (coffeeToEdit) {
      await updateCoffeeMutation.mutateAsync({
        coffee: { ...coffeeToEdit, name },
      });
    } else {
      await createCoffeeMutation.mutateAsync({ name });
    }
    await setIsCoffeeModalOpen(false);
  }

  function handleDelete(coffee: Coffee) {
    deleteCoffeeMutation.mutate({ coffeeId: coffee.id });
  }

  function handleMoveCoffee(coffee: Coffee, direction: "up" | "down") {
    if (!settings) {
      return;
    }
    const coffeeOrder = settings.coffeeOrder;
    const currentIndex = coffeeOrder.indexOf(coffee.id);
    const directionLimit = direction === "up" ? 0 : coffeeOrder.length - 1;
    if (currentIndex === -1 || currentIndex === directionLimit) {
      return;
    }
    const newCoffeeOrder = arraySwap(
      coffeeOrder,
      currentIndex,
      direction === "up" ? currentIndex - 1 : currentIndex + 1
    );
    updateSettingsMutation.mutate({
      settings: { ...settings, coffeeOrder: newCoffeeOrder },
    });
  }

  function arraySwap<T>(array: T[], i: number, j: number) {
    const copy = [...array];
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
    return copy;
  }
}
