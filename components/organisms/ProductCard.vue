<script lang="ts" setup>

const props = defineProps<{
  name: string
  sku: number
  brand: string
  price: number | null // some prices are null in our dataset
  rating: number
  reviewsCount: string | number
  imageUrl: string
}>()

const { name, sku, brand, price, rating, reviewsCount, imageUrl } = toRefs(props)

const formattedPrice = computed(() => Number.isNaN(price) ? '-' : price)
</script>

<template>
  <BaseCard class="product-card">
    <img :src="imageUrl" :alt="name" class="mb-5"/>
    <div class="px-5 pb-5">
      <BaseTitle size="xs" class="mb-1 text-hot-pink-500 -900">
        {{ brand }}
      </BaseTitle>
      <BaseText
        size="m"
        class="mb-2 text-valhalla-500 product-name"
        :title="name"
      >
        {{ name }}
      </BaseText>
      <BaseText size="l" class="mb-2">
        <span class="text-ashes-900">$</span> <span class="text-valhalla-100">{{ formattedPrice }}</span>
      </BaseText>
      <div class="product-rating">
        <BaseText size="s" class="mr-1 text-valhalla-100">
          {{ rating }}
        </BaseText>
        <StarRating :rating="rating" class="my-auto mr-2 text-valhalla-100" />
        <BaseText size="xs" class="text-ashes-900">
          {{ reviewsCount }} reviews
        </BaseText>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.product-card {
  max-width: 250px;
  transition: transform ease-in-out 150ms;
}

.product-card:hover {
  box-shadow: 0px 0px 14px 8px rgba(77, 90, 125, 0.1), 0px 4px 66px rgba(77, 90, 125, 0.04);
  transform: translateY(-5px);
}

.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-rating {
  display: flex;
  align-items: baseline;
}
</style>
