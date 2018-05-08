<template>
  <div class="list">
    <ul class="list-article">
      <li class="article" v-for="(article, index) in articles" :key="article.id">
        <h2 class="article-title">
          <nuxt-link class="title-link" :to="'/detail/' + article.id">{{ article.title }}</nuxt-link>&nbsp;<span class="views">({{ article.views }})</span>
        </h2>
        <p class="article-body">{{ article.content | cutString(170) }}</p>
        <div><timeago class="timeago" :since="articles[index].createdAt"></timeago></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'blog-lists',
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  }
}

</script>
<style lang="scss">
$link-color: #42B983;
$font-color: #24292e;
.list {
  ul {
    list-style: none;
  }
  .article {
    max-width: 700px;
    margin: 60px auto;
    border-left: 4px solid #42b983;
    border-radius: 10px;
    padding-left:20px;
    .article-title {
      font-size: 20px;
      font-weight: normal;
      a {
        color: $font-color;
        &:hover {
          color: $link-color;
        }
      }
    }
    .article-body {
      margin: 10px 0;
      color: #666;
    }

    .timeago {
      color: #a1a1a1;
      font-size:0.7em;
    }

    .views {
      color: #42b983;
      font-size:0.8em;
    }
  }
}

</style>
