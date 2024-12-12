export const addExpense = async (values: {
  id: number;
  amount: number;
  description: string;
}) => {
  const { id, amount, description } = values;
  console.log(values);
  const response = await fetch(`http://localhost:8080/expense`, {
    method: "POST",
    body: JSON.stringify({
      category_id: id,
      amount: amount,
      description: description,
    }),
  });

  if (!response.ok) {
    console.log(response);

    return;
  }

  return response;
};
