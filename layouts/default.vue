<template>
  <v-app>
    <!-- Menú dinámico -->
    <v-navigation-drawer app>
      <v-list>
        <v-list-item
          v-for="item in menu"
          :key="item._id"
          :to="item.path"
          :class="{ active: selectedMenu === item.path }"
          @click="selectMenu(item.path)"
        >
          <v-list-item-title>{{ item.label }}</v-list-item-title>
            <!-- Agregar el ícono -->
            <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    // Obtener el menú desde la store
    menu() {
      return this.$store.state.menu.menu;
    },
    selectedMenu() {
      return this.$store.state.menu.selectedMenu;
    },
  },
  methods: {
    // Método para manejar la selección de menú
    selectMenu(path) {
      this.$store.commit("menu/setSelectedMenu", path);
      this.$router.push(path);
    },
  },
};
</script>

<style>
.active {
  background-color: #ccc;
}
</style>
