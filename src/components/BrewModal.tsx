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
  Radio,
} from "@mantine/core";
import { useState } from "react";

import { Brew } from "../types/Brew";
import { BrewValues } from "../types/BrewValues";
import { Coffee } from "../types/Coffee";

export interface BrewModalProps {
  title: string;
  coffee: Coffee;
  opened: boolean;
  initialValues?: Brew;
  onClose: () => void;
  onSave: (brewValues: BrewValues) => void;
}

export function BrewModal(props: BrewModalProps) {
  const { title, coffee, opened, initialValues, onClose, onSave } = props;
  const [brewType, setBrewType] = useState<Brew["brewType"]>("espresso");
  const [grind, setGrind] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState<number | undefined>();

  // Espresso fields
  const [doseInGrams, setDoseInGrams] = useState<number | undefined>();
  const [yieldInGrams, setYieldInGrams] = useState<number | undefined>();
  const [timeInSeconds, setTimeInSeconds] = useState<number | undefined>();

  // Pour over fields
  const [waterInGrams, setWaterInGrams] = useState<number | undefined>();
  const [coffeeInGrams, setCoffeeInGrams] = useState<number | undefined>();
  const [time, setTime] = useState("");

  const isGrindValid = grind.trim().length > 0;
  const isValidEspresso =
    isGrindValid &&
    doseInGrams !== undefined &&
    yieldInGrams !== undefined &&
    timeInSeconds !== undefined;
  const isValidPourOver =
    isGrindValid &&
    waterInGrams !== undefined &&
    coffeeInGrams !== undefined &&
    time.trim().length > 0;
  const isValid =
    (brewType === "espresso" && isValidEspresso) ||
    (brewType === "pour over" && isValidPourOver);

  const [prevOpened, setPrevOpened] = useState(opened);
  if (prevOpened !== opened) {
    setPrevOpened(opened);
    setBrewType(initialValues?.brewType ?? "espresso");
    setGrind(initialValues?.grind ?? "");
    setNotes(initialValues?.notes ?? "");
    setRating(initialValues?.rating);
    if (initialValues?.brewType === "espresso") {
      setDoseInGrams(initialValues?.doseInGrams);
      setYieldInGrams(initialValues?.yieldInGrams);
      setTimeInSeconds(initialValues?.timeInSeconds);
    } else if (initialValues?.brewType === "pour over") {
      setCoffeeInGrams(initialValues?.waterInGrams);
      setWaterInGrams(initialValues?.coffeeInGrams);
      setTime(initialValues?.time ?? "");
    }
  }

  function handleSave() {
    onClose();
    if (brewType === "espresso") {
      onSave({
        brewType,
        rating,
        grind,
        notes,
        yieldInGrams: yieldInGrams ?? 0,
        doseInGrams: doseInGrams ?? 0,
        timeInSeconds: timeInSeconds ?? 0,
      });
    } else {
      onSave({
        brewType,
        rating,
        grind,
        notes,
        time,
        coffeeInGrams: coffeeInGrams ?? 0,
        waterInGrams: waterInGrams ?? 0,
      });
    }
  }

  return (
    <Modal title={title} centered opened={opened} onClose={onClose}>
      <Stack>
        <Group grow>
          <TextInput withAsterisk readOnly label="Coffee" value={coffee.name} />
        </Group>
        <Radio.Group
          withAsterisk
          label="Brew type"
          value={brewType}
          onChange={(value: Brew["brewType"]) => setBrewType(value)}
        >
          <Radio value="espresso" label="Espresso" />
          <Radio value="pour over" label="Pour over" />
        </Radio.Group>
        {brewType === "espresso" ? (
          <>
            <Group grow>
              <NumberInput
                data-autofocus
                withAsterisk
                label="Dose (g)"
                min={0}
                placeholder="18"
                value={doseInGrams}
                onChange={setDoseInGrams}
              />
              <NumberInput
                withAsterisk
                label="Yield (g)"
                placeholder="36"
                min={0}
                value={yieldInGrams}
                onChange={setYieldInGrams}
              />
            </Group>
            <Group grow>
              <NumberInput
                withAsterisk
                label="Brew time (s)"
                placeholder="30"
                min={0}
                value={timeInSeconds}
                onChange={setTimeInSeconds}
              />
              <TextInput
                withAsterisk
                label="Grind"
                placeholder="1.6.0"
                value={grind}
                onChange={(event) => setGrind(event.target.value)}
              />
            </Group>
          </>
        ) : (
          <>
            <Group grow>
              <NumberInput
                data-autofocus
                withAsterisk
                label="Coffee (g)"
                min={0}
                placeholder="15"
                value={coffeeInGrams}
                onChange={setCoffeeInGrams}
              />
              <NumberInput
                withAsterisk
                label="Water (g)"
                placeholder="250"
                min={0}
                value={waterInGrams}
                onChange={setWaterInGrams}
              />
            </Group>
            <Group grow>
              <TextInput
                withAsterisk
                label="Brew time"
                placeholder="3:00"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
              <TextInput
                withAsterisk
                label="Grind"
                placeholder="3.2.0"
                value={grind}
                onChange={(event) => setGrind(event.target.value)}
              />
            </Group>
          </>
        )}
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
          <Button disabled={!isValid} color="green" onClick={handleSave}>
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
