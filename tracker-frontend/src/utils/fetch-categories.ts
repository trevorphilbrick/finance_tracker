export const fetchCategories = async () => {
  const response = await fetch("http://localhost:8080/categories");

  if (!response.ok) {
    console.log(response);
  }

  return response.json();
};
