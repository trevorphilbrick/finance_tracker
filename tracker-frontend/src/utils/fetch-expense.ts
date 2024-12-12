export const fetchExpense = async (id: number) => {
  const response = await fetch(`http://localhost:8080/expense/${id}`);

  if (!response.ok) {
    console.log(response);
  }

  return response.json();
};
