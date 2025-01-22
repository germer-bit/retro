<template>
  <!-- Utilizar variables en inglés -->
  <div>
    <v-row>
      <v-card
      elevation="13"outlined
      class="pa-6 ma-2">
          <ComponentePadre />
      
      </v-card>
      <v-card
      elevation="13"outlined
      class="pa-6 ma-2">
      <v-card-title>LocalStorage</v-card-title>
      <p>Guardar una variable y volverla a recuperar</p>
        <!-- Formulario para ingresar el nombre -->
        <v-text-field
          v-model="nombreUsuario"
          label="Ingresa tu nombre"
          @blur="guardarNombreUsuario"
        ></v-text-field>
        <!-- Muestra el nombre del usuario -->
        <p v-if="nombreUsuarioGuardado">Aqui la variable que se guardo: {{ nombreUsuarioGuardado }}!</p>
    
        <!-- Botón para borrar el nombre guardado -->
        <v-btn color="secondary" @click="borrarNombreUsuario">
          <!-- Manejar el label según la variable -->
          {{ nombreUsuarioGuardado ? "Borra" : "Guardar" }} nombre
        </v-btn>
      </v-card>
      </v-row>
      <v-row>
        <v-card 
        elevation="13"outlined
        class="pa-6 ma-2">
        <v-card-title>Filter</v-card-title>
        <h4>Productos de Tecnología:</h4>
        <ul>
          <li v-for="producto in productosTecnologia" :key="producto.nombre">
            {{ producto.nombre }} - ${{ producto.precio }}
          </li>
        </ul>
        </v-card>
        <v-card
        elevation="13"outlined
        class="pa-6 ma-2">
        <v-card-title>Find</v-card-title>
          <h4>Primer producto que cuesta más de $1000:</h4>
          <p>{{ productoCaro.nombre }} - ${{ productoCaro.precio }}</p>
        </v-card>
        <v-card
        elevation="13"outlined
        class="pa-6 ma-2">
        <v-card-title>map</v-card-title>
        <h4>Precios de productos de Tecnología:</h4>
        <ul>
          <li v-for="precio in preciosTecnologia" :key="precio">{{ precio }}</li>
        </ul>
      </v-card>
      </v-row>
      <v-row>
        <v-card
        elevation="13"outlined
        class="pa-6 ma-2">
        <v-card-title>reduce</v-card-title>
        <h4>Total de productos de Tecnología:</h4>
        <p>${{ totalTecnologia }}</p>
      </v-card>
      <v-card
      elevation="13"outlined
        class="pa-6 ma-2">
                <v-card-title>slice</v-card-title>

        <h4>Primeros 2 productos:</h4>
        <ul>
          <li v-for="producto in primerosProductos" :key="producto.nombre">
            {{ producto.nombre }} - ${{ producto.precio }}
          </li>
        </ul>
      </v-card>
      </v-row>
  </div>
</template>

<script>
import ComponentePadre from "@/components/ComponentePadre.vue";

export default {
  components: {
    ComponentePadre,
  },
  data() {
    return {
      nombreUsuario: null, // Inicializa el nombre del usuario
      nombres: ['Ana', 'Carlos', 'Luis', 'Eva', 'Sofia'], // Array de nombres
      busqueda: '', // Valor de búsqueda ingresado por el usuario
      productos: [
        { nombre: "Laptop", precio: 1500, categoria: "Tecnología" },
        { nombre: "Celular", precio: 800, categoria: "Tecnología" },
        { nombre: "Monitor", precio: 300, categoria: "Tecnología" },
        { nombre: "Silla", precio: 100, categoria: "Muebles" },
        { nombre: "Mesa", precio: 250, categoria: "Muebles" },
        { nombre: "Teclado", precio: 1200, categoria: "Tecnología" },
        { nombre: "Mause", precio: 3200, categoria: "Tecnología" },
      ],
    };
  },
  methods: {
    guardarNombreUsuario() {
      if (this.nombreUsuario) {
        this.nombreUsuarioGuardado = this.nombreUsuario; // Actualiza el nombre en la vista
      }
    },
    borrarNombreUsuario() {
      this.nombreUsuarioGuardado = null; // Limpia la vista
      // localStorage.removeItem("nombreUsuario"); // Elimina el nombre de localStorage
      // this.nombreUsuario = ""; // Limpia el campo de texto
    },
  },
  computed: {
    // Retorna el nombre guardado desde el store
    nombreUsuarioGuardado: {
      get() {
        return this.$store.state.user;
      },
      set(value) {
        this.$store.commit("setUser", value);
      },
    },
    // Filtra los nombres según la búsqueda
    
    // Filtra los productos de tecnología
    //filter() crea un nuevo array con todos los elementos 
    // que pasen una prueba, la cual es definida por una función que retorna un valor booleano (true o false).
    productosTecnologia() {
      return this.productos.filter(producto => producto.categoria === "Tecnología");
    },
    // Encuentra el primer producto que cueste más de $1000
    //find() devuelve el primer elemento que cumple con la condición 
    // proporcionada en la función. Si no hay ningún elemento que cumpla la condición, devuelve undefined.
    productoCaro() {
      return this.productos.find(producto => producto.precio > 1000);
    },
    // Mapea los precios de los productos de tecnología
    //map() crea un nuevo array con los resultados de aplicar una función 
    // a cada uno de los elementos del array original.
    preciosTecnologia() {
      return this.productos.filter(producto => producto.categoria === "Tecnología").map(producto => producto.precio);
    },
    // Suma el total de los productos de tecnología
    //reduce() aplica una función de reducción sobre cada 
    // uno de los elementos de un array, devolviendo un solo valor 
    // (como la suma de los elementos o el producto, etc.).
    totalTecnologia() {
      return this.preciosTecnologia.reduce((total, precio) => total + precio, 0);
    },
    // Obtiene los primeros 2 productos
    //slice() retorna una copia superficial 
    // de una porción del array, sin modificar el 
    // array original. Recibe dos parámetros, el índice de inicio 
    // y el índice de fin (el índice de fin es opcional).
    primerosProductos() {
      return this.productos.slice(0, 2);
    },
  },
};
</script>
