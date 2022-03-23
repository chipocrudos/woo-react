import { useEffect, useState } from "react";
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
import { changePasswordApi } from "../../../api/auth";

export function ChangePasswordForm(props) {
  const { onChangePassword } = props;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabledButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (!router.query?.code && !router.query?.email) {
      setErrorMessage("Información no valida, para reestablcer la contraseña");
      setDisableButton(true);
    }
  }, []);

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
      console.log({
        ...formValue,
        ...router.query,
      });
      try {
        const { data } = await changePasswordApi({
          ...formValue,
          ...router.query,
        });

        if (data.success) {
          onChangePassword();
        } else {
          onMessage(data.data.message);
        }
      } catch (error) {}
    },
  });

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Header>Actualización de contraseña</Header>

        <Form.Input
          name="new_password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.new_password}
          onChange={formik.handleChange}
          error={formik.errors.new_password}
        />
        <Form.Input
          name="password_confirm"
          type="password"
          placeholder="Confirmar contraseña"
          value={formik.values.password_confirm}
          onChange={formik.handleChange}
          error={formik.errors.password_confirm}
        />

        <Button
          type="submit"
          content="Actualizar"
          fluid
          secondary
          disabled={disabledButton}
        />
      </Form>

      {errorMessage && (
        <Segment color="red">
          <Icon name="exclamation" />
          {errorMessage}
        </Segment>
      )}

      <Segment color="orange">
        <div>
          ¿No cuentas con un usuario?
          <br />
          <Link href="/auth/signup">
            <a>Registrate aquí</a>
          </Link>
        </div>
        <div>
          ¿Ya tienes cuenta?
          <br />
          <Link href="/auth/login">
            <a>Ingresa aquí</a>
          </Link>
        </div>
      </Segment>
    </div>
  );
}

function initialValues() {
  return {
    new_password: "",
    password_confirm: "",
  };
}

function validationSchema() {
  return {
    new_password: Yup.string()
      .required(true)
      .min(8, "La contraseña debe de tener almenos 8 caracteres.")
      .matches(
        /^[A-Za-z\d@$!%*#?&\.\^]{8,}$/,
        // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "La contraseña puede tener numeros, letras y caracteres especiales sin espacios."
      ),
    password_confirm: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "La contraseña no coinciden"
    ),
  };
}
