import {
  Button,
  Text,
  Modal,
  NumberInput,
  Rating,
  Textarea,
  TextInput,
  Radio,
  Flex,
} from "@mantine/core";
import { useState, Dispatch, SetStateAction } from "react";

import { Brew } from "../types/Brew";
import { BrewValues } from "../types/BrewValues";

export interface BrewModalProps {
  title: string;
  opened: boolean;
  initialValues?: Brew;
  onClose: () => void;
  onSave: (brewValues: BrewValues) => void;
}

export function BrewModal(props: BrewModalProps) {
  const { title, opened, initialValues, onClose, onSave } = props;
  const [brewType, setBrewType] = useState<Brew["brewType"]>("espresso");
  const [grind, setGrind] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);

  // Espresso fields
  const [doseInGrams, setDoseInGrams] = useState(0);
  const [yieldInGrams, setYieldInGrams] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  // Pour over fields
  const [waterInGrams, setWaterInGrams] = useState(0);
  const [coffeeInGrams, setCoffeeInGrams] = useState(0);
  const [time, setTime] = useState("");

  const isGrindValid = grind.trim().length > 0;
  const isValidEspresso =
    isGrindValid && doseInGrams > 0 && yieldInGrams > 0 && timeInSeconds > 0;
  const isValidPourOver =
    isGrindValid &&
    waterInGrams > 0 &&
    coffeeInGrams > 0 &&
    time.trim().length > 0;
  const isValid =
    (brewType === "espresso" && isValidEspresso) ||
    (brewType === "pour over" && isValidPourOver);

  const [prevOpened, setPrevOpened] = useState(opened);
  if (prevOpened !== opened) {
    setPrevOpened(opened);
    resetInputs();
  }

  return (
    <Modal title={title} centered opened={opened} onClose={onClose}>
      <Flex direction="column" gap="md">
        <Radio.Group
          withAsterisk
          label="Brew type"
          value={brewType}
          onChange={(value) => setBrewType(value as Brew["brewType"])}
        >
          <Flex gap="xs">
            <Radio value="espresso" label="Espresso" />
            <Radio value="pour over" label="Pour over" />
          </Flex>
        </Radio.Group>
        {brewType === "espresso" ? (
          <>
            <Flex gap="md">
              <NumberInput
                style={{ flex: 1 }}
                data-autofocus
                withAsterisk
                label="Dose (g)"
                min={0}
                placeholder="18"
                value={doseInGrams || ""}
                allowDecimal={false}
                onChange={updateNumber(setDoseInGrams)}
              />
              <NumberInput
                style={{ flex: 1 }}
                withAsterisk
                label="Yield (g)"
                placeholder="36"
                min={0}
                value={yieldInGrams || ""}
                allowDecimal={false}
                onChange={updateNumber(setYieldInGrams)}
              />
            </Flex>
            <Flex gap="md">
              <NumberInput
                style={{ flex: 1 }}
                withAsterisk
                label="Brew time (s)"
                placeholder="30"
                min={0}
                value={timeInSeconds || ""}
                allowDecimal={false}
                onChange={updateNumber(setTimeInSeconds)}
              />
              <TextInput
                style={{ flex: 1 }}
                withAsterisk
                label="Grind"
                placeholder="1.6.0"
                value={grind}
                onChange={(event) => setGrind(event.target.value)}
              />
            </Flex>
          </>
        ) : (
          <>
            <Flex gap="md">
              <NumberInput
                style={{ flex: 1 }}
                data-autofocus
                withAsterisk
                label="Coffee (g)"
                min={0}
                placeholder="15"
                value={coffeeInGrams || ""}
                allowDecimal={false}
                onChange={updateNumber(setCoffeeInGrams)}
              />
              <NumberInput
                style={{ flex: 1 }}
                withAsterisk
                label="Water (g)"
                placeholder="250"
                min={0}
                value={waterInGrams || ""}
                allowDecimal={false}
                onChange={updateNumber(setWaterInGrams)}
              />
            </Flex>
            <Flex gap="md">
              <TextInput
                style={{ flex: 1 }}
                withAsterisk
                label="Brew time"
                placeholder="3:00"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
              <TextInput
                style={{ flex: 1 }}
                withAsterisk
                label="Grind"
                placeholder="3.2.0"
                value={grind}
                onChange={(event) => setGrind(event.target.value)}
              />
            </Flex>
          </>
        )}
        <Textarea
          label="Notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <Flex align="center" gap="xs">
          <Text fw={500} fz="sm">
            Rating
          </Text>
          <Rating value={rating} onChange={(value) => setRating(value)} />
        </Flex>
        <Flex justify="flex-end" gap="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!isValid} color="green" onClick={handleSave}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );

  function updateNumber(updater: Dispatch<SetStateAction<number>>) {
    return (value: number | string) => {
      if (typeof value === "number") {
        updater(value);
      } else if (typeof value === "string" && value.length > 0) {
        updater(parseInt(value));
      } else {
        updater(0);
      }
    };
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

  function resetInputs() {
    setBrewType(initialValues?.brewType ?? "espresso");
    setGrind(initialValues?.grind ?? "");
    setNotes(initialValues?.notes ?? "");
    setRating(initialValues?.rating ?? 0);
    setDoseInGrams(0);
    setYieldInGrams(0);
    setTimeInSeconds(0);
    setCoffeeInGrams(0);
    setWaterInGrams(0);
    setTime("");
    if (initialValues?.brewType === "espresso") {
      setDoseInGrams(initialValues.doseInGrams);
      setYieldInGrams(initialValues.yieldInGrams);
      setTimeInSeconds(initialValues.timeInSeconds);
    } else if (initialValues?.brewType === "pour over") {
      setCoffeeInGrams(initialValues.waterInGrams);
      setWaterInGrams(initialValues.coffeeInGrams);
      setTime(initialValues.time);
    }
  }
}
