<template>
  <div id="app">
    <albums-block
      v-if="!album_selected"
      v-bind:album_list="albums"
      v-bind:album_source="album_uri">
    </albums-block>
    <images-block 
      v-else-if="album_selected"
      v-bind:title="album_title"
      v-bind:images_source="source" 
      v-bind:images_source_type="type" 
      v-bind:grid_width="grid_width"
      v-bind:image_count="count">
    </images-block>
    <modal-block>
    </modal-block>
  </div>
</template>

<script>
import AlbumsBlock from "./components/AlbumsBlock.vue"
import ImagesBlock from "./components/ImagesBlock.vue"
import ModalBlock from "./components/ModalBlock.vue"
import config from "../gallery.conf.json"
import imageData from "../data/data3.json"
import albumData from "../data/data4.json"

export default {
  name: "app",
  props: {
    album_uri: String,
  },
  data () {
    return {
      // number of images to show in a row
      grid_width: 3,
      type: config.data.type,
      album_selected: false,
      album_title: "",
      albums: "",
      source: "",
      count: 0,
    }
  },
  computed: {
    source2: function () {
      if (imageData) {
        return imageData
      }
      return config.data.source
    },
    album_list: function () {
    },
    asource: function () {
      if (this.album_uri) {
        return this.album_uri
      }
      return albumData
    }
  },
  methods: {
    openAlbum: function (album) {
      this.type = "url"
      this.album_title = album.name
      this.source = album.url
      this.album_selected = true
      this.count = album.count
    },
    closeAlbum: function () {
      this.album_selected = false
    }
  },
  components: {
    AlbumsBlock,
    ImagesBlock,
    ModalBlock
  },
  created: function () {
    this.evtHub.$on("selectAlbum", this.openAlbum)
    this.evtHub.$on("back-to-albums", this.closeAlbum)
  },
  destroyed: function () {
    this.evtHub.$off("selectAlbum")
    this.evtHub.$off("back-to-albums")
  }
}
</script>

<style>
#app {
  font-family: arial, titillium, sans-serif;
  height: 100%;
  width: 100%;
  display: inline-block;
}
</style>
