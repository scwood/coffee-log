import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { useBoolean } from "../hooks/useBoolean";
import { useCoffeeApi } from "../hooks/useCoffeeApi";
import { Coffee } from "../types/Coffee";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeModal } from "./CoffeeModal";

export function CoffeeList() {
  const [
    isCoffeeModalOpen,
    { setTrue: openCoffeeModal, setFalse: closeCoffeeModal },
  ] = useBoolean(false);
  const [coffeeToEdit, setCoffeeToEdit] = useState<Coffee | undefined>();

  const { createOrUpdateCoffee, getCoffees, deleteCoffee } = useCoffeeApi();
  const coffees = getCoffees();

  function openCreateModal() {
    setCoffeeToEdit(undefined);
    openCoffeeModal();
  }

  function openEditModal(coffee: Coffee) {
    setCoffeeToEdit(coffee);
    openCoffeeModal();
  }

  function handleSave(name: string) {
    if (coffeeToEdit) {
      createOrUpdateCoffee({ ...coffeeToEdit, name });
    } else {
      createOrUpdateCoffee({ id: uuidV4(), name, brewHistory: [] });
    }
  }

  return (
    <>
      <Group position="apart" align="center" my="lg">
        <Title m={0} order={3}>
          Your coffee
        </Title>
        <Button color="green" leftIcon={<IconPlus />} onClick={openCreateModal}>
          New coffee
        </Button>
      </Group>
      <Stack>
        {coffees.map((coffee) => {
          return (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onDelete={(coffee) => deleteCoffee(coffee.id)}
              onEdit={openEditModal}
            />
          );
        })}
      </Stack>
      {coffees.length === 0 && (
        <Text align="center" mt="lg" color="dimmed">
          Add a coffee to get started
        </Text>
      )}
      <CoffeeModal
        coffee={coffeeToEdit}
        opened={isCoffeeModalOpen}
        onClose={closeCoffeeModal}
        onSave={handleSave}
      />
    </>
  );
}
