import { useState } from "react";
import Link from "next/link";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPasswordApi } from "../../../api/auth";
import style from "./ResetPasswordForm.module.css";

export function ResetPasswordForm(props) {
  const { onResetPassword } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      resetPasswordApi(formValue);
      onResetPassword();
    },
  });

  return (
    <div className={style.loginFormContent}>
      <Form onSubmit={formik.handleSubmit} className={style.loginForm}>
        <Header>Recueperar contraseña</Header>

        <Form.Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          autofocus
        />

        <Button type="submit" content="Enviar correo" fluid secondary />
      </Form>

      <Segment color="orange" className={style.loginFormMessage}>
        <div>
          ¿No cuentas con un usuario?
          <br />
          <Link href="/signup">
            <a>Registrate aquí</a>
          </Link>
        </div>
        <div>
          ¿Ya tienes cuenta?
          <br />
          <Link href="/login">
            <a>Ingresa aquí</a>
          </Link>
        </div>
      </Segment>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email().required(true),
  };
}
