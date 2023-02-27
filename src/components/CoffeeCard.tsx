import { ActionIcon, Anchor, Card, Group, Menu, Text } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { Coffee } from "../types/Coffee";

export interface CoffeeCardProps {
  coffee: Coffee;
  onDelete: (coffeeId: string) => void;
}

export function CoffeeCard(props: CoffeeCardProps) {
  const { coffee, onDelete } = props;

  return (
    <Card shadow="sm" p="md" radius="sm" withBorder>
      <Group position="apart" noWrap align="start">
        <Text weight={600}>{coffee.name}</Text>
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
              onClick={() => onDelete(coffee.id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Anchor component={Link} to={`/coffees/${coffee.id}`}>
        Brew history
      </Anchor>
    </Card>
  );
}
