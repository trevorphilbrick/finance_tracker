export const fetchExpenses = async (id: number) => {
  const response = await fetch(`http://localhost:8080/category/${id}`);

  if (!response.ok) {
    console.log(response);
  }

  return response.json();
};
