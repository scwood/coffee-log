import {
  Button,
  Text,
  Group,
  Modal,
  NumberInput,
  Rating,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { Brew } from "../types/Brew";

export interface BrewModalProps {
  opened: boolean;
  previousBrew?: Brew;
  onClose: () => void;
  onSave: (brew: Brew) => void;
}

export function BrewModal(props: BrewModalProps) {
  const { previousBrew, opened, onClose, onSave } = props;
  const [doseInGrams, setDoseInGrams] = useState<number | undefined>();
  const [yieldInGrams, setYieldInGrams] = useState<number | undefined>();
  const [timeInSeconds, setTimeInSeconds] = useState<number | undefined>();
  const [rating, setRating] = useState<number | undefined>();
  const [grind, setGrind] = useState("");
  const [notes, setNotes] = useState("");

  // Pre-fill certain values from most recent brew and clear others
  const [prevOpened, setPrevOpened] = useState(opened);
  if (prevOpened !== opened) {
    setPrevOpened(opened);
    setDoseInGrams(previousBrew?.doseInGrams);
    setYieldInGrams(previousBrew?.yieldInGrams);
    setTimeInSeconds(previousBrew?.timeInSeconds);
    setGrind(previousBrew?.grind ?? "");
    setNotes("");
    setRating(undefined);
  }

  return (
    <Modal title="New brew" centered opened={opened} onClose={onClose}>
      <Stack>
        <Group grow>
          <NumberInput
            data-autofocus
            label="Dose (g)"
            min={0}
            placeholder="18"
            value={doseInGrams}
            onChange={(value) => setDoseInGrams(value)}
          />
          <NumberInput
            label="Yield (g)"
            placeholder="36"
            min={0}
            value={yieldInGrams}
            onChange={(value) => setYieldInGrams(value)}
          />
        </Group>
        <Group grow>
          <NumberInput
            label="Brew time (s)"
            placeholder="30"
            min={0}
            value={timeInSeconds}
            onChange={(value) => setTimeInSeconds(value)}
          />
          <TextInput
            label="Grind"
            placeholder="1.5.0"
            value={grind}
            onChange={(event) => setGrind(event.target.value)}
          />
        </Group>
        <Textarea
          label="Notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <Group spacing={6}>
          <Text fw={500} fz="sm">
            Rating
          </Text>
          <Rating value={rating} onChange={(value) => setRating(value)} />
        </Group>
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="green"
            onClick={() => {
              onSave({
                id: uuidV4(),
                timestamp: Date.now(),
                rating,
                yieldInGrams,
                doseInGrams,
                timeInSeconds,
                grind,
                notes,
              });
              onClose();
            }}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
