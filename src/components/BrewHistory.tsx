import {
  Anchor,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useBoolean } from "../hooks/useBoolean";
import { useCoffeeApi } from "../hooks/useCoffeeApi";
import { Brew } from "../types/Brew";
import { BrewCard } from "./BrewCard";
import { BrewModal } from "./BrewModal";
import { BrewValues } from "../types/BrewValues";

export function BrewHistory() {
  const [
    isBrewModalOpen,
    { setFalse: closeBrewModal, setTrue: openBrewModal },
  ] = useBoolean(false);
  const [brewToEdit, setBrewToEdit] = useState<Brew | undefined>();

  const { coffeeId } = useParams();
  const { getCoffeeById, createBrew, updateBrew, deleteBrew } = useCoffeeApi();
  const coffee = coffeeId ? getCoffeeById(coffeeId) : undefined;

  function openCreateModal() {
    setBrewToEdit(undefined);
    openBrewModal();
  }

  function openEditModal(brew: Brew) {
    setBrewToEdit(brew);
    openBrewModal();
  }

  function onSave(brewValues: BrewValues) {
    if (!coffee) {
      return;
    }
    if (brewToEdit) {
      updateBrew(coffee.id, { ...brewToEdit, ...brewValues });
    } else {
      createBrew(coffee.id, brewValues);
    }
  }

  if (!coffee) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Anchor component={Link} to="/">
        All coffee
      </Anchor>{" "}
      /<Title order={3}>{coffee.name}</Title>
      <Divider mt="md" />
      <Group position="apart" align="center" my="lg">
        <Title order={3}>Brew history</Title>
        <Button color="green" leftIcon={<IconPlus />} onClick={openCreateModal}>
          New brew
        </Button>
      </Group>
      <Stack>
        {coffee.brewHistory.map((brew) => {
          return (
            <BrewCard
              key={brew.id}
              brew={brew}
              onEdit={openEditModal}
              onDelete={() => deleteBrew(coffee.id, brew.id)}
            />
          );
        })}
      </Stack>
      {coffee.brewHistory.length === 0 && (
        <Text align="center" mt="lg" color="dimmed">
          No brews yet
        </Text>
      )}
      <BrewModal
        title={brewToEdit ? "Edit brew" : "New brew"}
        coffee={coffee}
        initialValues={
          brewToEdit
            ? brewToEdit
            : { ...coffee.brewHistory[0], notes: undefined, rating: undefined }
        }
        opened={isBrewModalOpen}
        onClose={closeBrewModal}
        onSave={onSave}
      />
    </>
  );
}
