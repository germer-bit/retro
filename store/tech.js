export const state = () => ({
    // Intentamos obtener los productos desde localStorage si existen, sino, usamos los valores predeterminados
    productosTecnologia: JSON.parse(localStorage.getItem('productosTecnologia')) || [
      { id: 1, nombre: 'Laptop', precio: 1500, categoria: 'Electrónica' },
      { id: 2, nombre: 'Smartphone', precio: 800, categoria: 'Electrónica' },
      { id: 3, nombre: 'Monitor', precio: 350, categoria: 'Electrónica' },
      { id: 4, nombre: 'Teclado', precio: 120, categoria: 'Periféricos' },
    ],
  });
  
  export const getters = {
    retraive(state) {
      return state.productosTecnologia;
    },
  };
  
  export const mutations = {
    agregarProducto(state, nuevoProducto) {
      // Asignamos un id único basado en la longitud actual del array
      nuevoProducto.id = state.productosTecnologia.length + 1;
      state.productosTecnologia.push(nuevoProducto);
  
      // Guardamos los productos en localStorage para persistencia
      localStorage.setItem('productosTecnologia', JSON.stringify(state.productosTecnologia));
    },
  
  };
  