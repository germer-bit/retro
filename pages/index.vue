<template>
  <!-- Utilizar  variables en ingles -->
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
    <v-btn color="secondary" @click="borrarNombreUsuario">
      <!-- Manejar el label segun la variable -->
      {{ nombreUsuarioGuardado ? "Borra" : "Guardar" }} nombre
    </v-btn>
  </div>
</template>

<script>
import ComponentePadre from "@/components/ComponentePadre.vue";

export default {
  components: {
    ComponentePadre,
  },
  computed: {
    nombreUsuarioGuardado: {
      get() {
        return this.$store.state.user;
      },
      set(value) {
        this.$store.commit("setUser", value);
      },
    },
  },
  data() {
    return {
      nombreUsuario: null, // Inicializa el nombre del usuario
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
};
</script>
