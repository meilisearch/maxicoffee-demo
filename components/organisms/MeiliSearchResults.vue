<script lang="ts" setup>
import { AisHits } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <AisHits>
    <template #default="{ items }">
      <div class="items">
        <ProductCard
          v-for="product in items"
          :key="product.uid"
          :name="product['name']"
          :sku="product.sku"
          :brand="product.brand"
          :price="product.offers.price"
          :image-url="product.image"
          :rating="product.aggregateRating === undefined ? 5 : product.aggregateRating.ratingValue"
          :reviews-count="product.aggregateRating === undefined ? 0 : product.aggregateRating.reviewCount"
        />
      </div>
    </template>
  </AisHits>
</template>

<style src="~/assets/css/components/results-grid.css" scoped />
