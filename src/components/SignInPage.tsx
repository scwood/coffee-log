import { useState } from "react";
import { ActionIcon, Alert, Button, Flex } from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export function SignInPage() {
  const [error, setError] = useState<Error | null>(null);
  const { signInWithGitHub, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Flex direction="column" gap="md">
        <ActionIcon variant="subtle" color="gray" component={Link} to="/">
          <IconArrowNarrowLeft />
        </ActionIcon>
        {!!error && <Alert color="red">{error?.message}</Alert>}
        <Button
          size="md"
          color="gray"
          leftSection={<IconBrandGithub />}
          onClick={() => handleSignIn("github")}
        >
          Sign in with GitHub
        </Button>
        <Button
          size="md"
          color="gray"
          leftSection={<IconBrandGoogle />}
          onClick={() => handleSignIn("google")}
        >
          Sign in with Google
        </Button>
      </Flex>
    </>
  );

  async function handleSignIn(provider: "google" | "github") {
    try {
      provider === "github"
        ? await signInWithGitHub()
        : await signInWithGoogle();
      navigate("/");
      setError(null);
    } catch (error) {
      setError(error as Error);
    }
  }
}
