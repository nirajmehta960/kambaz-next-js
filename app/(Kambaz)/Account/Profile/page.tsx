"use client";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { FormControl, Alert } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      if (!profile._id) {
        setErrorMessage("Profile data is not loaded. Please refresh the page.");
        return;
      }

      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      setSuccessMessage("Profile updated successfully!");
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      if (error.response?.status === 401) {
        setErrorMessage(
          "Your session has expired. Please sign in again to update your profile."
        );
        // Redirect to signin after showing error message
        setTimeout(() => {
          router.push("/Account/Signin");
        }, 3000);
      } else {
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Failed to update profile. Please try again.";
        setErrorMessage(errorMsg);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser, router]);

  const signout = async () => {
    try {
      await client.signout();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      dispatch(setCurrentUser(null));
      router.push("/Account/Signin");
    }
  };

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {successMessage && (
        <Alert variant="success" className="mb-2">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" className="mb-2">
          {errorMessage}
        </Alert>
      )}
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            value={profile.username || ""}
            placeholder="username"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            value={profile.password || ""}
            placeholder="password"
            type="password"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            value={profile.firstName || ""}
            placeholder="First Name"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            value={profile.lastName || ""}
            placeholder="Last Name"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            type="email"
            value={profile.email || ""}
            placeholder="email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <FormControl
            as="select"
            className="mb-2"
            id="wd-role"
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormControl>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
            id="wd-update-profile-btn"
          >
            Update
          </button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
