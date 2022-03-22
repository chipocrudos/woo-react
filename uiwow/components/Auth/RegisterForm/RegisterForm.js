import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Form,
  Header,
  Button,
  Checkbox,
  Segment,
  Icon,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCustomerApi } from "../../../api/auth";
import style from "./RegisterForm.module.css";

export function RegisterForm(props) {
  const { onUserCreate } = props;
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
      try {
        const response = await createCustomerApi(formValue);

        if (response.status === 201) {
          onUserCreate();
        } else {
          onMessage("El correo ya se encuentra registrado.");
        }
      } catch (error) {}
    },
  });

  return (
    <div className={style.signupFormContent}>
      <Form onSubmit={formik.handleSubmit} className={style.signupForm}>
        <Header>Formulario de registro</Header>
        <Form.Input
          name="first_name"
          placeholder="Nobre(s)"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.errors.first_name}
        />
        <Form.Input
          name="last_name"
          placeholder="Apellidos"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.errors.last_name}
        />
        <Form.Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Form.Input
          name="password_confirm"
          type="password"
          placeholder="Confirmar contraseña"
          value={formik.values.password_confirm}
          onChange={formik.handleChange}
          error={formik.errors.password_confirm}
        />

        <Form.Field
          name="terms"
          control={Checkbox}
          label={{ children: `Acepto los terminos y condiciones` }}
          value={formik.values.terms}
          onChange={(e, data) => (formik.values.terms = data.checked)}
          error={formik.errors.terms}
        />

        <Button type="submit" content="Crear cuenta" fluid primary />
      </Form>

      {errorMessage && (
        <Segment color="red">
          <Icon name="exclamation" />
          {errorMessage}
        </Segment>
      )}

      <Segment color="orange" className={style.signupFormMessage}>
        <div>
          ¿Ya tienes cuenta?
          <br />
          <Link href="/login">
            <a>Ingresa aquí</a>
          </Link>
        </div>

        <div>
          ¿Se te olvido la contraseña?
          <br />
          <Link href="/resetpassword">
            <a>Recuerarla aquí</a>
          </Link>
        </div>
      </Segment>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
    terms: false,
  };
}

function validationSchema() {
  return {
    email: Yup.string().email().required(true),
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
    password: Yup.string()
      .required(true)
      .min(8, "La contraseña debe de tener almenos 8 caracteres.")
      .matches(
        /^[A-Za-z\d@$!%*#?&\.\^]{8,}$/,
        // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "La contraseña puede tener numeros, letras y caracteres especiales sin espacios."
      ),
    password_confirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "La contraseña no coinciden"
    ),

    terms: Yup.bool().oneOf([true], "Acepte los términos").required(true),
  };
}
