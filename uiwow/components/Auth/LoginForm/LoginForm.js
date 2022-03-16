import { useState } from "react";
import Link from "next/link";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks";
import { loginApi, meApi, validateApi } from "../../../api/auth";
import style from "./LoginForm.module.css";

export function LoginForm() {
  const { login, get } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const onMessage = (message) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const response = await loginApi(formValue);
      const { data } = response;

      if (data.success) {
        login(data.data);
      } else {
        onMessage(data.data.message);
      }
    },
  });

  return (
    <div className={style.loginFormContent}>
      <Form onSubmit={formik.handleSubmit} className={style.loginForm}>
        <Header>Formulario de Ingreso</Header>

        <Form.Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          autofocus
        />

        <Form.Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />

        <Button type="submit" content="Iniciar sesión" fluid primary />
      </Form>

      {errorMessage && (
        <Segment color="red">
          <Icon name="exclamation" />
          {errorMessage}
        </Segment>
      )}

      <Segment color="blue" className={style.loginFormMessage}>
        <div>
          ¿No cuentas con un usuario?&nbsp;
          <br />
          <Link href="/signup">
            <a>Registrate aquí</a>
          </Link>
          &nbsp;.
        </div>
        <div>
          <a href="#">Recuerar contraseña</a>
          &nbsp;.
        </div>
      </Segment>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email().required(true),
    password: Yup.string().required(true),
  };
}
