import {
  Container,
  Title,
  Divider,
  Group,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import {
  IconBrandGithub,
  IconLogin,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

import { useAuth } from "./AuthProvider";

export function Layout() {
  const { signIn, signOut, userId, displayName } = useAuth();

  return (
    <Container p="lg" size="xs">
      <Group position="apart">
        <Title order={2}>☕ Coffee log</Title>
        <Group>
          <ActionIcon
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/scwood/coffee-log"
          >
            <IconBrandGithub />
          </ActionIcon>
          <Menu>
            <Menu.Target>
              <ActionIcon>
                <IconUser />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {displayName && <Menu.Item disabled>{displayName}</Menu.Item>}
              <Menu.Item
                onClick={userId ? signOut : signIn}
                icon={
                  userId ? <IconLogout size={14} /> : <IconLogin size={14} />
                }
              >
                Sign {userId ? "out" : "in"}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      <Divider my="md" />
      <Outlet />
    </Container>
  );
}
