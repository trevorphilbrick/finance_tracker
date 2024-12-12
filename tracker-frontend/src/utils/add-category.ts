export const addCategory = async (values: { name: string }) => {
  const { name } = values;
  console.log(values);
  const response = await fetch(`http://localhost:8080/category`, {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    console.log(response);
  }
  return response;
};
