import { useState } from "react";
import { Button, Group, Modal, TextInput } from "@mantine/core";

import { Coffee } from "../types/Coffee";

export interface CoffeeModalProps {
  coffee?: Coffee;
  opened: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function CoffeeModal(props: CoffeeModalProps) {
  const { coffee, opened, onClose, onSave } = props;
  const [name, setName] = useState(coffee?.name || "");
  const isValid = name.trim().length > 0;

  const [prevOpened, setPrevOpened] = useState(opened);
  if (prevOpened !== opened) {
    setName(coffee?.name || "");
    setPrevOpened(opened);
  }

  return (
    <Modal
      title={`${coffee ? "Edit" : "New"} coffee`}
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
            onSave(name);
            onClose();
          }}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
}
