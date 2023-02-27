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
import { Link, useParams } from "react-router-dom";

import { useBoolean } from "../hooks/useBoolean";
import { useCoffeeApi } from "../hooks/useCoffeeApi";
import { BrewCard } from "./BrewCard";
import { BrewModal } from "./BrewModal";

export function BrewHistory() {
  const [
    isBrewModalOpen,
    { setFalse: closeBrewModal, setTrue: openBrewModal },
  ] = useBoolean(false);

  const { coffeeId } = useParams();
  const { getCoffeeById, createBrew, deleteBrew } = useCoffeeApi();

  const coffee = coffeeId ? getCoffeeById(coffeeId) : undefined;

  if (!coffee) {
    return null;
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
        <Button color="green" leftIcon={<IconPlus />} onClick={openBrewModal}>
          New brew
        </Button>
      </Group>
      <Stack>
        {coffee.brewHistory.map((brew) => {
          return (
            <BrewCard
              key={brew.id}
              brew={brew}
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
        previousBrew={coffee.brewHistory[0]}
        opened={isBrewModalOpen}
        onClose={closeBrewModal}
        onSave={(brew) => coffee.id && createBrew(coffee.id, brew)}
      />
    </>
  );
}
