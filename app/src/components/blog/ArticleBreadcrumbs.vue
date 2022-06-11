<template>
  <div class="dBreadcrumbs">
    <div
      class="dBreadcrumbs__item"
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.anchor"
    >
      <img src="/icons/breadcrumbs.svg" />
      <a href="#" @click.prevent="$router.push(breadcrumb.link)">{{ breadcrumb.anchor }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useBlogStore } from 'stores/blog'

export default defineComponent({
  name: 'ArticleBreadcrumbs',
  setup () {
    const blogStore = useBlogStore()
    const breadcrumbs = computed(() => [{ link: { name: 'Blog' }, anchor: 'Блог' }, { link: '', anchor: blogStore.article.name }])
    return {
      blogStore,
      breadcrumbs
    }
  }
})
</script>

<style lang="scss">
.dBreadcrumbs {
  display: flex;
  align-items: center;
  margin-top: 40px;

  &__item {
    display: flex;
    align-items: center;
    margin-right: 4px;
    a {
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
      color: #616161;
      text-decoration: none;
    }
    img {
      margin: 0 4px;
    }
    &:first-child img {
      display: none;
    }
    &:last-child a {
      color: #9E9E9E;
    }
  }
}
</style>
