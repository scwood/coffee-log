import {
  Text,
  Card,
  Group,
  Menu,
  ActionIcon,
  Rating,
  Stack,
  Tooltip,
} from "@mantine/core";
import {
  IconAlarm,
  IconCoffee,
  IconDots,
  IconScale,
  IconTrash,
} from "@tabler/icons-react";

import { Brew } from "../types/Brew";

export interface BrewCardProps {
  brew: Brew;
  onDelete: (brewId: string) => void;
}

export function BrewCard(props: BrewCardProps) {
  const { brew, onDelete } = props;

  return (
    <Card withBorder shadow="sm" radius="sm">
      <Card.Section withBorder inheritPadding py="sm">
        <Group position="apart">
          <Text color="dimmed" size="sm">
            {new Date(brew.timestamp).toLocaleString(undefined, {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconTrash size={14} />}
                color="red"
                onClick={() => onDelete(brew.id)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="sm">
        <Text size="sm">
          <Stack mb={4}>
            <Group>
              <Group spacing={2}>
                <Tooltip label="Dose (g)" color="dark">
                  <IconScale />
                </Tooltip>
                {String(brew.doseInGrams)}g
              </Group>
              <Group spacing={4}>
                <Tooltip label="Yield (g)" color="dark">
                  <IconCoffee />
                </Tooltip>
                {String(brew.yieldInGrams)}g
              </Group>
              <Group spacing={2}>
                <Tooltip label="Brew time (s)" color="dark">
                  <IconAlarm />
                </Tooltip>
                {String(brew.timeInSeconds)}s
              </Group>
              <Group spacing={4}>
                <Text display="inline" weight={600}>
                  Grind:
                </Text>
                {brew.grind}
              </Group>
            </Group>
            {brew.rating && <Rating value={brew.rating} readOnly />}
            {brew.notes?.trim() && (
              <div>
                <Text display="inline" weight={600}>
                  Notes:
                </Text>{" "}
                {brew.notes}
              </div>
            )}
          </Stack>
        </Text>
      </Card.Section>
    </Card>
  );
}
