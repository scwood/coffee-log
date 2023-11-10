import {
  Container,
  Divider,
  ActionIcon,
  Menu,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import {
  IconBrandGithub,
  IconLogin,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

import { useAuth } from "./AuthProvider";

export function Layout() {
  const { signOut, userId, displayName } = useAuth();

  return (
    <Container p="lg" size="xs">
      <Flex justify="space-between" align="center">
        <UnstyledButton component={Link} to="/" fz={22} fw="600">
          ☕ Coffee log
        </UnstyledButton>
        <Flex gap="xs">
          <ActionIcon
            variant="subtle"
            color="gray"
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/scwood/coffee-log"
          >
            <IconBrandGithub />
          </ActionIcon>
          <Menu>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconUser />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {displayName && <Menu.Item disabled>{displayName}</Menu.Item>}
              {userId ? (
                <Menu.Item
                  onClick={signOut}
                  leftSection={<IconLogout size={14} />}
                >
                  Sign out
                </Menu.Item>
              ) : (
                <Menu.Item
                  component={Link}
                  to="/sign-in"
                  leftSection={<IconLogin size={14} />}
                >
                  Sign in
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
      <Divider my="md" />
      <Outlet />
    </Container>
  );
}
