import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "../i18n/LanguageContext";

function Login() {

  const { t } = useTranslation();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      user
    );

    if (response.data === "SUCCESS") {

      localStorage.setItem("loggedIn", "true");

      window.location.href = "/dashboard";

    } else {

      alert(t("invalidCredentials"));
    }
  };

  return (

    <div className="login-container">

<div className="auth-card">
        <h2>{t("appName")}</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder={t("email")}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder={t("password")}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value
              })
            }
          />

          <button>{t("login")}</button>

        </form>

        <a href="/signup">
          {t("createAccount")}
        </a>

      </div>

    </div>
  );
}

export default Login;