import * as dotenv from 'dotenv'
import { MeiliSearch } from 'meilisearch'
import { watchTasks } from './utils.js'

// Load environment
dotenv.config()

const credentials = {
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_ADMIN_API_KEY
}

const INDEX_NAME = 'products'

const setup = async () => {
  console.log('🚀 Seeding your Meilisearch instance')

  if (!credentials.host) {
    console.error('Missing `MEILISEARCH_HOST` environment variable')
    process.exit(1)
  }
  if (!credentials.apiKey) {
    console.error('Missing `MEILISEARCH_ADMIN_API_KEY` environment variable')
    process.exit(1)
  }

  const client = new MeiliSearch(credentials)

  console.log(`Adding searchable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateFilterableAttributes([
    'sku',
    'gtin13',
    'name',
    'brand',
    'description'
  ])

  console.log(`Adding filterable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateFilterableAttributes([
    'aggregateRating.ratingValue',
    'aggregateRating.reviewCount',
    'brand',
    'offers.availability',
    'offers.price'
  ])

  // console.log(`Adding ranking rules to \`${INDEX_NAME}\``)
  // await client.index(INDEX_NAME).updateRankingRules([
  //   'sort',
  //   'words',
  //   'typo',
  //   'proximity',
  //   'attribute',
  //   'exactness'
  // ])

  console.log(`Adding sortable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateSortableAttributes([
    'aggregateRating.ratingValue',
    'aggregateRating.reviewCount',
    'offers.price'
  ])

  await watchTasks(client, INDEX_NAME)
}

setup()
