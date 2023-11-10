import { useState } from "react";
import { Button, Flex, Modal, TextInput } from "@mantine/core";

import { Coffee } from "../types/Coffee";

export interface CoffeeModalProps {
  title: string;
  opened: boolean;
  initialValues?: Coffee;
  loadingSave: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function CoffeeModal(props: CoffeeModalProps) {
  const { title, opened, initialValues, loadingSave, onClose, onSave } = props;
  const [name, setName] = useState("");
  const isValid = name.trim().length > 0;

  const [prevOpened, setPrevOpened] = useState(opened);
  if (prevOpened !== opened) {
    setName(initialValues?.name || "");
    setPrevOpened(opened);
  }

  return (
    <Modal title={title} size="xs" centered opened={opened} onClose={onClose}>
      <TextInput
        required
        data-autofocus
        mb="md"
        label="Coffee name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Flex gap="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="green"
          disabled={!isValid}
          loading={loadingSave}
          onClick={() => {
            onSave(name);
          }}
        >
          Save
        </Button>
      </Flex>
    </Modal>
  );
}
