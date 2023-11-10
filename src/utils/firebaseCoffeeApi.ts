import { getApp } from "firebase/app";
import {
  CollectionReference,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { Coffee } from "../types/Coffee";
import { Settings } from "../types/Settings";

export async function getCoffees(userId: string) {
  const snapshot = await getDocs(
    query(getCoffeeCollection(), where("userId", "==", userId))
  );
  return snapshot.docs.map((doc) => doc.data());
}

export async function createCoffee(userId: string, name: string) {
  const coffeeRef = doc(getCoffeeCollection());
  const coffee: Coffee = {
    id: coffeeRef.id,
    userId,
    name,
    brewHistory: [],
  };
  const settings = await getSettings(userId);
  const updatedSettings: Settings = {
    ...settings,
    coffeeOrder: [coffee.id, ...settings.coffeeOrder],
  };
  await upsertSettings(updatedSettings);
  await setDoc(coffeeRef, coffee);
}

export async function updateCoffee(coffee: Coffee) {
  await updateDoc(doc(getCoffeeCollection(), coffee.id), { ...coffee });
}

export async function deleteCoffee(userId: string, coffeeId: string) {
  const settings = await getSettings(userId);
  const updatedSettings: Settings = {
    ...settings,
    coffeeOrder: settings.coffeeOrder.filter((id) => id !== coffeeId),
  };
  await upsertSettings(updatedSettings);
  await deleteDoc(doc(getCoffeeCollection(), coffeeId));
}

export async function getCoffeeById(coffeeId: string) {
  const snapshot = await getDoc(doc(getCoffeeCollection(), coffeeId));
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return null;
  }
}

export async function getSettings(userId: string) {
  const snapshot = await getDoc(doc(getSettingsCollection(), userId));
  if (snapshot.exists()) {
    return snapshot.data();
  }
  const coffees = await getCoffees(userId);
  const settings: Settings = {
    userId,
    coffeeOrder: coffees.map((coffee) => coffee.id),
  };
  await upsertSettings(settings);
  return settings;
}

export async function upsertSettings(settings: Settings) {
  await setDoc(doc(getSettingsCollection(), settings.userId), settings);
}

export function getRandomId() {
  return doc(getCoffeeCollection()).id;
}

function getDb() {
  return getFirestore(getApp());
}

function getCoffeeCollection() {
  return collection(getDb(), "coffees") as CollectionReference<Coffee>;
}

function getSettingsCollection() {
  return collection(getDb(), "settings") as CollectionReference<Settings>;
}
