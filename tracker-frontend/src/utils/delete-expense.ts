export const deleteExpense = async (id: number) => {
  const response = await fetch(`http://localhost:8080/expense/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log(response);

    return;
  }

  return { message: "success" };
};
