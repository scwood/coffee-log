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

import { Brew } from "../types/Brew";
import { Coffee } from "../types/Coffee";

export interface BrewModalProps {
  title: string;
  coffee: Coffee;
  opened: boolean;
  initialValues?: Partial<Brew>;
  onClose: () => void;
  onSave: (brewValues: Omit<Brew, "id" | "timestamp">) => void;
}

export function BrewModal(props: BrewModalProps) {
  const { title, coffee, opened, initialValues, onClose, onSave } = props;
  const [doseInGrams, setDoseInGrams] = useState<number | undefined>();
  const [yieldInGrams, setYieldInGrams] = useState<number | undefined>();
  const [timeInSeconds, setTimeInSeconds] = useState<number | undefined>();
  const [rating, setRating] = useState<number | undefined>();
  const [grind, setGrind] = useState("");
  const [notes, setNotes] = useState("");
  const isValid =
    doseInGrams !== undefined &&
    yieldInGrams !== undefined &&
    timeInSeconds !== undefined &&
    grind.trim().length > 0;

  const [prevOpened, setPrevOpened] = useState(opened);
  if (prevOpened !== opened) {
    setPrevOpened(opened);
    setDoseInGrams(initialValues?.doseInGrams);
    setYieldInGrams(initialValues?.yieldInGrams);
    setTimeInSeconds(initialValues?.timeInSeconds);
    setGrind(initialValues?.grind ?? "");
    setNotes(initialValues?.notes ?? "");
    setRating(initialValues?.rating);
  }

  return (
    <Modal title={title} centered opened={opened} onClose={onClose}>
      <Stack>
        <Group grow>
          <TextInput label="Coffee" value={coffee.name} disabled />
        </Group>
        <Group grow>
          <NumberInput
            data-autofocus
            withAsterisk
            label="Dose (g)"
            min={0}
            placeholder="18"
            value={doseInGrams}
            onChange={(value) => setDoseInGrams(value)}
          />
          <NumberInput
            withAsterisk
            label="Yield (g)"
            placeholder="36"
            min={0}
            value={yieldInGrams}
            onChange={(value) => setYieldInGrams(value)}
          />
        </Group>
        <Group grow>
          <NumberInput
            withAsterisk
            label="Brew time (s)"
            placeholder="30"
            min={0}
            value={timeInSeconds}
            onChange={(value) => setTimeInSeconds(value)}
          />
          <TextInput
            withAsterisk
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
            disabled={!isValid}
            color="green"
            onClick={() => {
              onSave({
                rating,
                yieldInGrams: yieldInGrams ?? 0,
                doseInGrams: doseInGrams ?? 0,
                timeInSeconds: timeInSeconds ?? 0,
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
