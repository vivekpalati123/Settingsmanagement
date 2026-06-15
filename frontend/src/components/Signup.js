import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "../i18n/LanguageContext";

function Signup() {

  const { t } = useTranslation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post(
      "http://localhost:8080/api/auth/signup",
      user
    );

    alert(t("signupSuccess"));

    window.location.href = "/";
  };

  return (

    <div className="login-container">

<div className="auth-card">
        <h2>{t("createAccount")}</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder={t("name")}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value
              })
            }
          />

          <input
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

          <button>
            {t("signup")}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;