"use client";
import * as client from "../client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    username: "niraj.mehta",
    password: "Niraj@762483",
  });
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      setError("");
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid username or password");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please try again.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <FormControl
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Button
        id="wd-signin-btn"
        onClick={signin}
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </Button>
      <Link id="wd-signup-link" href="Signup">
        Sign up
      </Link>
    </div>
  );
}
