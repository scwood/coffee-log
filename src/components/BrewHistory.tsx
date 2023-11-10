import { Anchor, Button, Divider, Flex, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";

import { Brew } from "../types/Brew";
import { BrewCard } from "./BrewCard";
import { BrewModal } from "./BrewModal";
import { BrewValues } from "../types/BrewValues";
import { useCoffeeQuery } from "../hooks/useCoffeeQuery";
import { useUpdateCoffeeMutation } from "../hooks/useUpdateCoffeeMutation";
import { getRandomId } from "../utils/firebaseCoffeeApi";

export function BrewHistory() {
  const [isBrewModalOpen, setIsBrewModalOpen] = useState(false);
  const [brewToEdit, setBrewToEdit] = useState<Brew | undefined>();

  const { coffeeId = "" } = useParams();
  const { data: coffee, isLoading } = useCoffeeQuery(coffeeId);
  const updateCoffeeMutation = useUpdateCoffeeMutation();

  if (!isLoading && !coffee) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Anchor component={Link} to="/">
        All coffee
      </Anchor>{" "}
      /
      <Title c={coffee ? undefined : "dimmed"} order={3}>
        {coffee?.name ?? "..."}
      </Title>
      <Divider mt="md" />
      <Flex justify="space-between" my="lg">
        <Title order={3}>Brew history</Title>
        <Button
          color="green"
          leftSection={<IconPlus />}
          onClick={openCreateModal}
        >
          New brew
        </Button>
      </Flex>
      {!!coffee && (
        <>
          <Flex direction="column" gap="md">
            {coffee.brewHistory.map((brew) => {
              return (
                <BrewCard
                  key={brew.id}
                  brew={brew}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              );
            })}
          </Flex>
          {coffee.brewHistory.length === 0 && (
            <Text ta="center" mt="lg" c="dimmed">
              No brews yet
            </Text>
          )}
          <BrewModal
            title={brewToEdit ? "Edit brew" : "New brew"}
            initialValues={
              brewToEdit
                ? brewToEdit
                : { ...coffee.brewHistory[0], notes: "", rating: 0 }
            }
            opened={isBrewModalOpen}
            onClose={() => setIsBrewModalOpen(false)}
            onSave={handleSave}
          />
        </>
      )}
    </>
  );

  function handleSave(brewValues: BrewValues) {
    if (brewToEdit) {
      handleEdit(brewValues);
    } else {
      handleCreate(brewValues);
    }
  }

  function handleEdit(brewValues: BrewValues) {
    if (!coffee || !brewToEdit) {
      return;
    }
    updateCoffeeMutation.mutate({
      coffee: {
        ...coffee,
        brewHistory: coffee.brewHistory.map((prevBrew) => {
          return prevBrew.id === brewToEdit.id
            ? { ...brewToEdit, ...brewValues }
            : prevBrew;
        }),
      },
    });
  }

  function handleCreate(brewValues: BrewValues) {
    if (!coffee) {
      return;
    }
    updateCoffeeMutation.mutate({
      coffee: {
        ...coffee,
        brewHistory: [
          { id: getRandomId(), timestamp: Date.now(), ...brewValues },
          ...coffee.brewHistory,
        ],
      },
    });
  }

  function handleDelete(brew: Brew) {
    if (!coffee) {
      return;
    }
    updateCoffeeMutation.mutate({
      coffee: {
        ...coffee,
        brewHistory: coffee.brewHistory.filter((prevBrew) => {
          return prevBrew.id !== brew.id;
        }),
      },
    });
  }

  function openCreateModal() {
    setBrewToEdit(undefined);
    setIsBrewModalOpen(true);
  }

  function openEditModal(brew: Brew) {
    setBrewToEdit(brew);
    setIsBrewModalOpen(true);
  }
}
