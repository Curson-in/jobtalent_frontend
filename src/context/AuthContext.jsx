import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import * as authService from "../services/authService.js";
import api from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

  /* =====================================================
     LOAD AUTH FROM LOCAL STORAGE (ON APP START)
  ===================================================== */
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        const normalizedUser = {
          ...parsedUser,
          isOnboarded:
            parsedUser.isOnboarded ??
            parsedUser.is_onboarded ??
            false,
        };

        setToken(savedToken);
        setUser(normalizedUser);
      } catch (err) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  /* =====================================================
     SIGNUP
  ===================================================== */
  const signup = async (email, password, role, firstName, lastName) => {
    // ❌ DO NOT clear everything
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    const data = await authService.signup(
      email,
      password,
      role,
      firstName,
      lastName
    );

    const normalizedUser = {
      ...data.user,
      name:
        data.user.name ||
        `${data.user.first_name || firstName} ${
          data.user.last_name || lastName
        }`.trim(),
      isOnboarded:
        data.user.isOnboarded ??
        data.user.is_onboarded ??
        false,
    };

    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setToken(data.token);
    setUser(normalizedUser);

    return normalizedUser;
  };

  /* =====================================================
     LOGIN
  ===================================================== */
  const login = async (email, password) => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    const data = await authService.login(email, password);

    const normalizedUser = {
      ...data.user,
      isOnboarded:
        data.user.isOnboarded ??
        data.user.is_onboarded ??
        true, // login users are onboarded
    };

    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setToken(data.token);
    setUser(normalizedUser);

    return normalizedUser;
  };

  /* =====================================================
     LOAD SUBSCRIPTION (ONLY WHEN READY)
  ===================================================== */
  useEffect(() => {
    if (!token || user?.role !== "talent") return;

    const loadSubscription = async () => {
      try {
        const res = await api.get("/profile/talent");
        setSubscription(res.data.profile.subscription);
      } catch {
        // silent fail – avoids logout loops
      }
    };

    loadSubscription();
  }, [token, user]);

  /* =====================================================
     SET USER FROM JWT (GOOGLE OAUTH CALLBACK)
  ===================================================== */
  const setUserFromToken = (token) => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    const decoded = jwtDecode(token);

    const user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name:
        decoded.name ||
        decoded.fullName ||
        `${decoded.firstName || ""} ${decoded.lastName || ""}`.trim(),
      isOnboarded:
        decoded.isOnboarded ??
        decoded.is_onboarded ??
        false,
    };

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setSubscription(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        subscription,
        signup,
        login,
        logout,
        setUserFromToken,
        setUser,          // needed for onboarding completion
        setSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
