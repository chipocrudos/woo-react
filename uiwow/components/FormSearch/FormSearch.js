import { useState } from "react";
import { useRouter } from "next/router";
import { Icon, Form } from "semantic-ui-react";
import { filterSearch } from "../../helpers";

export default function FormSearch() {
  const [formData, setFormData] = useState({
    search: "",
  });

  const router = useRouter();

  const onSubmitHandler = (e) => {
    if (formData.search) {
      const query = router.query;
      delete query?.page;

      router.push({
        pathname: "/",
        // pathname: router.pathname,
        query: filterSearch(query, formData),
      });
    }
  };

  const onChangeHandler = (e) => {
    let value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <Form onSubmit={(e) => onSubmitHandler(e)}>
      <Form.Input
        placeholder="Buscar"
        name="search"
        icon={<Icon name="search" link onClick={(e) => onSubmitHandler(e)} />}
        onChange={(e) => onChangeHandler(e)}
      ></Form.Input>
    </Form>
  );
}
