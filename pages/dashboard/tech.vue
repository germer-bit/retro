<template>
    <v-container>
      <!-- Filtro por categoría -->
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            outlined
            rounded
            v-model="filtroCategoria"
            :items="categorias"
            label="Filtrar por Categoría"
            class="mb-4"
          ></v-select>
        </v-col>
      </v-row>
  
      <!-- Formulario para agregar un nuevo producto -->
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
          outlined
            rounded
            v-model="nuevoProducto.nombre"
            label="Nombre del producto"
            
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="nuevoProducto.precio"
            label="Precio del producto"
            outlined
            rounded
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="nuevoProducto.categoria"
            :items="categorias"
            label="Categoría del producto"
            rounded
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="3"  >
          <v-btn @click="agregarProducto" color="primary"  rounded   x-large

          outlined>Agregar Producto</v-btn>
        </v-col>
      </v-row>
  
      <!-- Tabla con productos filtrados -->
      <v-data-table
        :headers="headers"
        :items="productosFiltrados"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      filtroCategoria: null, // Para el filtro de categoría
      nuevoProducto: { nombre: "", precio: null, categoria: "" }, // Datos del nuevo producto
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Precio", value: "precio" },
        { text: "Categoría", value: "categoria" },
      ],
    }),
    computed: {
      productosTecnologia() {
        return this.$store.getters["tech/retraive"];
      },
      categorias() {
        return [...new Set(this.productosTecnologia.map(p => p.categoria))];
      },
      productosFiltrados() {
        let filtrados = this.productosTecnologia;
  
        if (this.filtroCategoria) {
          filtrados = filtrados.filter(
            producto => producto.categoria === this.filtroCategoria
          );
        }
  
        return filtrados;
      },
    },
    methods: {
      agregarProducto() {
        if (
          this.nuevoProducto.nombre &&
          this.nuevoProducto.precio &&
          this.nuevoProducto.categoria
        ) {
          const nuevoProducto = {
            id: this.productosTecnologia.length + 1, // Un id único
            nombre: this.nuevoProducto.nombre,
            precio: this.nuevoProducto.precio,
            categoria: this.nuevoProducto.categoria,
          };
  
          // Agregar el producto al store
          this.$store.commit("tech/agregarProducto", nuevoProducto);
  
          // Limpiar los campos del formulario
          this.nuevoProducto = { nombre: "", precio: null, categoria: "" };
        } else {
          alert("Por favor, completa todos los campos.");
        }
      },
    },
  };
  </script>
  