export const state = () => ({
    // Try to get products from localStorage if they exist, otherwise, use default values
    technologyProducts: JSON.parse(localStorage.getItem("technologyProducts")) || [
      { id: 1, name: "Computadora", price: 1500, category: "Electrónica" },
      { id: 2, name: "Smartphone", price: 800, category: "Electrónica" },
      { id: 3, name: "Monitor", price: 350, category: "Electrónica" },
      { id: 4, name: "Teclado", price: 120, category: "Periféricos" },
    ],
  });
  
  export const getters = {
    retrieve(state) {
      return state.technologyProducts;
    },
  };
  
  export const mutations = {
    addProduct(state, newProduct) {
      // Assign a unique ID based on the current length of the array
      newProduct.id = state.technologyProducts.length + 1;
      state.technologyProducts.push(newProduct);
  
      // Save the products in localStorage for persistence
      localStorage.setItem("technologyProducts", JSON.stringify(state.technologyProducts));
    },
  };
  