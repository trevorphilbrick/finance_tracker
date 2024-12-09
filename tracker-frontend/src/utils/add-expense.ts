export const addExpense = async (
  id: number,
  amount: number,
  description: string
) => {
  const response = await fetch(`http://localhost:8080/expense`, {
    method: "POST",
    body: JSON.stringify({
      amount,
      category_id: id,
      description,
    }),
  });

  if (!response.ok) {
    console.log(response);

    return;
  }
  const data = response.json();

  return data;
};
