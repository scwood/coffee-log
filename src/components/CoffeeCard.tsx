import { ActionIcon, Anchor, Card, Group, Menu, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { Coffee } from "../types/Coffee";

export interface CoffeeCardProps {
  coffee: Coffee;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
  onMoveUp: (coffee: Coffee) => void;
  onMoveDown: (coffee: Coffee) => void;
  onEdit: (coffee: Coffee) => void;
  onDelete: (coffee: Coffee) => void;
}

export function CoffeeCard(props: CoffeeCardProps) {
  const {
    coffee,
    disableMoveUp,
    disableMoveDown,
    onMoveUp,
    onMoveDown,
    onEdit,
    onDelete,
  } = props;

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
              disabled={disableMoveUp}
              icon={<IconArrowUp size={14} />}
              onClick={() => onMoveUp(coffee)}
            >
              Move up
            </Menu.Item>
            <Menu.Item
              disabled={disableMoveDown}
              icon={<IconArrowDown size={14} />}
              onClick={() => onMoveDown(coffee)}
            >
              Move down
            </Menu.Item>
            <Menu.Item
              icon={<IconPencil size={14} />}
              onClick={() => onEdit(coffee)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size={14} />}
              color="red"
              onClick={() => onDelete(coffee)}
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
