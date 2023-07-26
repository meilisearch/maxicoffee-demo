<script lang="ts" setup>
const sortingOptions = [
  { value: 'products', label: 'Featured' },
  { value: 'products:offers.price:asc', label: 'Price: Low to High' },
  { value: 'products:offers.price:desc', label: 'Price: High to Low' },
  { value: 'products:aggregateRating.ratingValue:desc', label: 'Rating: High to Low' }
]
</script>

<template>
  <MeiliSearchProvider index-name="products">
    <TheNavbar class="mb-5 shadow-l">
      <template #search>
        <MeiliSearchBar />
      </template>
    </TheNavbar>
    <div class="container mb-5">
      <div class="filters">
        <MeiliSearchFacetFilter attribute="brand" class="mb-5" />
        <MeiliSearchRangeFilter attribute="offers.price" class="mb-5" />
        <MeiliSearchRatingFilter attribute="aggregateRating.ratingValue" label="Rating" />
      </div>
      <div class="results">
        <div class="mb-5 results-meta">
          <MeiliSearchStats />
          <MeiliSearchSorting :options="sortingOptions" />
        </div>
        <MeiliSearchResults class="mb-5" />
        <MeiliSearchPagination />
      </div>
    </div>
  </MeiliSearchProvider>
</template>

<style src="~/assets/css/components/home.css" scoped />
