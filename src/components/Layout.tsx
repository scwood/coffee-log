import { Container, Title, Divider, Group, ActionIcon } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { IconBrandGithub } from "@tabler/icons-react";

export function Layout() {
  return (
    <Container p="lg" size="xs">
      <Group position="apart">
        <Title order={2}>☕ Coffee log</Title>
        <ActionIcon
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/scwood/coffee-log"
        >
          <IconBrandGithub />
        </ActionIcon>
      </Group>
      <Divider my="md" />
      <Outlet />
    </Container>
  );
}
