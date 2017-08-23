<template>
  <div class="album-block">
    <div v-for="album in albums" v-if="album.img" class="album-link" >
      <div v-on:click="selectAlbum(album)">
        <h4>{{ album.name }}</h4>
        <img :src="album.img.url" :alt="album.img.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "albums-block",
  props: {
    name: String,
    album_list: [Object, String],
    album_source: String,
  },
  data () {
    return {
      albums: {}
    }
  },
  computed: {
  },
  methods: {
    selectAlbum: function (album) {
      this.evtHub.$emit("selectAlbum", album)
    },
  },
  created: function () {
    let vm = this
    // this.getAlbums()
    fetch(this.album_source)
      .then(function (res) {
        return res.json()
      })
      .then(function (res) {
        if (Object.keys(res).indexOf("albums") < 0) {
          vm.albums = {"name": "no albums found"}
          return 
        }
        vm.albums = res.albums
      })
  },
  mounted: function () {
  },
  beforeUpdate: function () {
  }
}
</script>

<style scoped>
div.album-block { 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 50px;
}
.album-link {
  display: flex;
  flex: auto;
  align-items: center;
  text-align: center;
  margin: 2px;
  overflow: hidden;
  justify-content: center;
  cursor: pointer;
}
.album-link a {
  text-decoration: none;
  color: #222;
}
img {
  display: flex;
  height: 100%;
  min-width: 100%;
}
span {
  display: inline-block;
}
.last img {
  min-width: 0;
  width: auto;
}
</style>
