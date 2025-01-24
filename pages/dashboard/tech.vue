<template>
    <v-container>
      <!-- Filtro por categoría -->
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            outlined
            rounded
            v-model="filterCategory"
            :items="category"
            label="Filtrar por Categoría"
            class="mb-4"
          ></v-select>
        </v-col>
        <!-- Botón para abrir el diálogo -->
        <v-col cols="12" md="6">
          <v-btn color="primary" rounded x-large outlined @click="dialog = true">
            Agregar producto
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- Diálogo con el formulario para agregar un producto -->
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Agregar producto</span>
          </v-card-title>
  
          <v-card-text>
            <v-form ref="productForm" v-model="isFormValid">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      rounded
                      v-model="newProduct.name"
                      label="Nombre del producto"
                      :rules="[rules.required]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newProduct.price"
                      label="Precio del producto"
                      outlined
                      rounded
                      type="number"
                      :rules="[rules.required, rules.number]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="newProduct.category"
                      :items="category"
                      label="Categoría del producto"
                      outlined
                      rounded
                      :rules="[rules.required]"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn
              color="green"
              text
              :disabled="!isFormValid"
              @click="validateAndAddProduct"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Tabla con productos filtrados -->
      <v-data-table
        :headers="headers"
        :items="filteredProducts"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      dialog: false, // Controla la visibilidad del diálogo
      isFormValid: false, // Controla la validación del formulario
      filterCategory: null, // Para el filtro de categoría
      newProduct: { name: "", price: null, category: "" }, // Datos del nuevo producto
      rules: {
        required: (value) => !!value || "Este campo es obligatorio",
        number: (value) =>
          !isNaN(value) || "El valor debe ser un número válido",
      },
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Precio", value: "price" },
        { text: "Categoría", value: "category" },
      ],
    }),
    computed: {
      techProducts() {
        return this.$store.getters["tech/retrieve"]; // Obtener productos desde el store
      },
      category() {
        return [...new Set(this.techProducts.map((p) => p.category))]; // Categorías únicas
      },
      filteredProducts() {
        let filtered = this.techProducts;
        if (this.filterCategory) {
          filtered = filtered.filter(
            (product) => product.category === this.filterCategory
          );
        }
        return filtered;
      },
    },
    methods: {
      validateAndAddProduct() {
        const form = this.$refs.productForm;
        if (form.validate()) {
          const product = {
            id: this.techProducts.length + 1,
            name: this.newProduct.name,
            price: this.newProduct.price,
            category: this.newProduct.category,
          };
  
          this.$store.commit("tech/agregarProducto", product);
  
          this.newProduct = { name: "", price: null, category: "" };
          this.dialog = false;
        }
      },
    },
  };
  </script>
  