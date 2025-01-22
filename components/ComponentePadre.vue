<template>
    <div>
      
      <p>Lista de Frutas</p>
      <p>Interacion entre los componentes padre e hijo</p>
      <!-- Enviar la lista al hijo y escuchar la selección -->
      <ComponenteHijo :listaPro="frutas" @seleccionar="manejarSeleccion" />
  
      <!-- Mostrar la fruta seleccionada -->
      <p v-if="frutaSeleccionada">
        Fruta seleccionada: <p>{{ frutaSeleccionada }}</p>
      </p>
    </div>
  </template>
  
  <script>
  import ComponenteHijo from '@/components/ComponenteHijo.vue';
  
  export default {
    components: {
      ComponenteHijo,
    },
    data() {
      return {
        frutas: ['Pera', 'Manzana', 'Plátano', 'Uva','fresa','kiwi','mandarina'], // Lista enviada al hijo
        frutaSeleccionada: null, // Fruta seleccionada por el hijo
      };
    },
    methods: {
      manejarSeleccion(fruta) {
        this.frutaSeleccionada = fruta; // Actualizar la fruta seleccionada
      },
    },
  };
  </script>
  