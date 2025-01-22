<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <ComponentePadre />
      </v-col>
    </v-row>
    
    <!-- Formulario para ingresar el nombre -->
    <v-text-field 
      v-model="nombreUsuario" 
      label="Ingresa tu nombre"
      @blur="guardarNombreUsuario"
    ></v-text-field>
    <!-- Muestra el nombre del usuario -->
    <p v-if="nombreUsuarioGuardado">Hola, {{ nombreUsuarioGuardado }}!</p>

    <!-- Botón para borrar el nombre guardado -->
    <v-btn color="secondary" @click="borrarNombreUsuario">Borrar Nombre</v-btn>

    <!-- Input para buscar un nombre -->
    <v-text-field 
      type="text" 
      v-model="busqueda" 
      label="Buscar..." 
    ></v-text-field>

    <!-- Lista de nombres filtrados -->
    <ul>
      <li v-for="nombre in nombresFiltrados" :key="nombre">
        {{ nombre }}
      </li>
    </ul>
  </div>
</template>

<script>
import ComponentePadre from '@/components/ComponentePadre.vue';

export default {
  components: {
    ComponentePadre,
  },
  data() {
    return {
      nombreUsuario: "", // Inicializa el nombre del usuario
      nombreUsuarioGuardado: localStorage.getItem('nombreUsuario') || "", // Recupera el nombre guardado en localStorage
      nombres: ['Ana', 'Carlos', 'Luis', 'Eva', 'Sofia'], // Lista inicial
      busqueda: '', // Texto que escribe el usuario
    };
  },
  methods: {
    guardarNombreUsuario() {
      if (this.nombreUsuario) {
        localStorage.setItem('nombreUsuario', this.nombreUsuario); // Guarda el nombre en localStorage
        this.nombreUsuarioGuardado = this.nombreUsuario; // Actualiza el nombre en la vista
      }
    },
    borrarNombreUsuario() {
      localStorage.removeItem('nombreUsuario'); // Elimina el nombre de localStorage
      this.nombreUsuarioGuardado = ""; // Limpia la vista
      this.nombreUsuario = ""; // Limpia el campo de texto
    }
  },
  computed: {
    nombresFiltrados() {
      // Filtrar nombres según la búsqueda
      return this.nombres.filter((nombre) =>
        nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },
  },
};
</script>
