<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap -mx-2">
    <div class="my-8 p-2 w-full">
      <h2 class="text-2xl font-semibold mb-4">Add Product</h2>
      <form @submit.prevent="addProductHandler">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="newProduct.name" placeholder="Name" class="p-2 border rounded" />
          <span v-if="error && !newProduct.name" class="absolute text-red-500 text-xs ml-2">Can't be empty</span>

          <input type="text" v-model="newProduct.description" placeholder="Description" class="p-2 border rounded" />
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Price: </span>
            <input type="number" v-model="newProduct.price" placeholder="Price" class=" pl-2 " />
          </div>
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Stock: </span>
            <input type="number" v-model="newProduct.stock" placeholder="Stock" class=" pl-2 " />
          </div>
          <div class="p-2 border rounded flex items-center">

            <input type="checkbox" v-model="newProduct.discount" class="border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Discount in %:</span>
            <input type="number" v-model="newProduct.discountPct" placeholder="Discount %" class=" ml-2 pl-2 " />
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input type="checkbox" v-model="newProduct.isHidden" class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Hidden product</span>
          </div>
          <input type="text" v-model="newProduct.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" />

        </div>
        <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>

    <div class="my-8 p-2 w-full">

      <h2 class="text-2xl font-semibold mb-4">Products</h2>
      <div v-for="product in products" :key="product._id" class="mb-4 p-4 border rounded bg-[#181818]">
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="product.name" placeholder="Name" class="p-2 border rounded" />
          <input type="text" v-model="product.description" placeholder="Description" class="p-2 border rounded" />
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Price: </span>
            <input type="number" v-model="product.price" placeholder="Price" class=" pl-2 " />
          </div>
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Stock: </span>
            <input type="number" v-model="product.stock" placeholder="Stock" class=" pl-2 " />
          </div>
          <div class="p-2 border rounded flex items-center">

            <input type="checkbox" v-model="product.discount" class="border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Discount in %:</span>
            <input type="number" v-model="product.discountPct" placeholder="Discount %" class=" ml-2 pl-2 " />
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input type="checkbox" v-model="product.isHidden" class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Hidden product</span>
          </div>
          <input type="text" v-model="product.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" />
          <span>
            Thumbnail img: <img :src="product.imageURL" alt="Product Image" class="w-full h-20 w-20 object-cover mb-4 rounded-lg">
          </span>
        </div>

        <div class="mt-4 flex space-x-2">
          <p>ID: {{ product._id }}</p>
          <button @click="deleteProduct(product._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete</button>
          <button @click="updateProductHandler(product)" class="bg-green-600 text-white p-2 rounded hover:bg-green-700">Edit</button>
         </div>
      </div>
    </div>
  </div>
     <!-- Custom confirmation dialog -->
<!--      <div v-if="showUpdateConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded shadow-lg">
        <p class="mb-4">Are you sure you want to update this product?</p>
        <div class="flex justify-end space-x-2">
          <button @click="confirmUpdateProduct" class="bg-green-600 text-white p-2 rounded hover:bg-green-700">Yes</button>
          <button @click="showUpdateConfirm = false" class="bg-red-600 text-white p-2 rounded hover:bg-red-700">No</button>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useProducts } from '../../modules/useProducts'
import type { Product } from '../../interfaces/interfaces';

const { products, error, loading, fetchProducts, deleteProduct, addProduct, getTokenAndUserId, updateProduct } = useProducts();

onMounted(() => {
  fetchProducts();
});

const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  discount: false,
  discountPct: 0,
  isHidden: false,
  imageURL: '',
  _createdBy: ''
})

const addProductHandler = async () => {
  const { userId } = getTokenAndUserId(); // import the userId from the useProducts module
  newProduct.value._createdBy = userId; // set the userId to the new product
  await addProduct(newProduct.value)
  newProduct.value = {
    ...newProduct.value,
  }
}

const updateProductHandler = async (product: Product) => {
  const updatedProduct = {
    name: product.name,
    description: product.description,
    imageURL: product.imageURL,
    price: product.price,
    stock: product.stock,
    discount: product.discount,
    discountPct: product.discountPct,
    isHidden: product.isHidden,
  }
  await updateProduct(product._id, updatedProduct)
}

</script>

<style scoped>
input {
  background-color: #2b2b2b;
}

.lazy-css {
  color: #969696 ;
}

input[type=checkbox] {
  accent-color: var(--input-field-color);
}

</style>
