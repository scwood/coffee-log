import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useBoolean } from "../hooks/useBoolean";
import { useCoffeeApi } from "../hooks/useCoffeeApi";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeModal } from "./CoffeeModal";

export function CoffeeList() {
  const [
    isCoffeeModalOpen,
    { setTrue: openCoffeeModal, setFalse: closeCoffeeModal },
  ] = useBoolean(false);

  const { createCoffee, getCoffees, deleteCoffee } = useCoffeeApi();
  const coffees = getCoffees();

  return (
    <>
      <Group position="apart" align="center" my="lg">
        <Title m={0} order={3}>
          Your coffee
        </Title>
        <Button color="green" leftIcon={<IconPlus />} onClick={openCoffeeModal}>
          New coffee
        </Button>
      </Group>
      <Stack>
        {coffees.map((coffee) => {
          return (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onDelete={deleteCoffee}
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
        opened={isCoffeeModalOpen}
        onClose={closeCoffeeModal}
        onSave={createCoffee}
      />
    </>
  );
}
