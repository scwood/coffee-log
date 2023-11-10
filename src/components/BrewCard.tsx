import {
  Text,
  Card,
  Menu,
  ActionIcon,
  Rating,
  Tooltip,
  Flex,
} from "@mantine/core";
import {
  IconAlarm,
  IconCoffee,
  IconDots,
  IconPencil,
  IconScale,
  IconTrash,
} from "@tabler/icons-react";

import { Brew } from "../types/Brew";

export interface BrewCardProps {
  brew: Brew;
  onEdit: (brew: Brew) => void;
  onDelete: (brew: Brew) => void;
}

export function BrewCard(props: BrewCardProps) {
  const { brew, onEdit, onDelete } = props;

  return (
    <Card withBorder shadow="sm" radius="sm" fz="sm">
      <Card.Section withBorder inheritPadding py="sm">
        <Flex align="center" justify="space-between">
          <Flex gap="xs">
            <Text tt="capitalize" fw={600} size="sm">
              Type: {brew.brewType}
            </Text>
            <Text size="sm" c="dimmed">
              {new Date(brew.timestamp).toLocaleString(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </Text>
          </Flex>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown miw={130}>
              <Menu.Item
                leftSection={<IconPencil size={14} />}
                onClick={() => onEdit(brew)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash size={14} />}
                color="red"
                onClick={() => onDelete(brew)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Card.Section>
      <Card.Section withBorder inheritPadding py={14}>
        <Flex direction="column" gap="sm">
          {brew.brewType === "espresso" ? (
            <Flex gap="sm">
              <Flex gap={4}>
                <Tooltip label="Dose (g)" color="dark">
                  <IconScale />
                </Tooltip>
                {String(brew.doseInGrams)}g
              </Flex>
              <Flex gap={4}>
                <Tooltip label="Yield (g)" color="dark">
                  <IconCoffee />
                </Tooltip>
                {String(brew.yieldInGrams)}g
              </Flex>
              <Flex gap={2}>
                <Tooltip label="Brew time (s)" color="dark">
                  <IconAlarm />
                </Tooltip>
                {String(brew.timeInSeconds)}s
              </Flex>
              <Flex gap={4}>
                <Text display="inline" fw={600} fz="sm">
                  Grind:
                </Text>
                {brew.grind}
              </Flex>
            </Flex>
          ) : (
            <Flex gap="sm">
              <Flex gap={2}>
                <Tooltip label="Coffee (g)" color="dark">
                  <IconScale />
                </Tooltip>
                {String(brew.coffeeInGrams)}g
              </Flex>
              <Flex gap={4}>
                <Tooltip label="Water (g)" color="dark">
                  <IconCoffee />
                </Tooltip>
                {String(brew.waterInGrams)}g
              </Flex>
              <Flex gap={2}>
                <Tooltip label="Brew time" color="dark">
                  <IconAlarm />
                </Tooltip>
                {String(brew.time)}
              </Flex>
              <Flex gap={4}>
                <Text display="inline" fw={600} fz="sm">
                  Grind:
                </Text>
                {brew.grind}
              </Flex>
            </Flex>
          )}
          {brew.rating > 0 && <Rating value={brew.rating} readOnly />}
          {brew.notes?.trim() && (
            <div>
              <Text display="inline" fw={600} fz="sm">
                Notes:
              </Text>{" "}
              {brew.notes}
            </div>
          )}
        </Flex>
      </Card.Section>
    </Card>
  );
}
