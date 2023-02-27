import { useState } from "react";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { v4 as uuidV4 } from "uuid";

import { Coffee } from "../types/Coffee";

export interface CoffeeModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (coffee: Coffee) => void;
}

export function CoffeeModal(props: CoffeeModalProps) {
  const { opened, onClose, onSave } = props;
  const [name, setName] = useState("");
  const isValid = name.trim().length > 0;

  return (
    <Modal
      title="New coffee"
      size="xs"
      centered
      opened={opened}
      onClose={onClose}
    >
      <TextInput
        required
        data-autofocus
        mb="md"
        label="Coffee name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Group position="right">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="green"
          disabled={!isValid}
          onClick={() => {
            onSave({ name, id: uuidV4(), brewHistory: [] });
            setName("");
            onClose();
          }}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
}
