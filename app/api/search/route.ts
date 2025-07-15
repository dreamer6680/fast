import { liteClient } from 'algoliasearch/lite';
import { useDocsSearch } from 'fumadocs-core/search/client';

const client = liteClient('id', 'key');

const { search, setSearch, query } = useDocsSearch({
  type: 'algolia',
  indexName: 'document',
  client,
});