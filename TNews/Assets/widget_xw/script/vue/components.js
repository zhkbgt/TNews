Vue.component('v-img', {
  template: '<img :src="src" ref="img" :height="height">',
  name: 'v-img',
  props: {
    url: String,
    err: String,
    height: {
      type: [String, Number],
      default: 'auto'
    }
  },
  data () {
    return {
      src: this.url
    }
  },
  watch: {
    url () {
      (this.url === null || this.url === undefined ) ?
        this.src = this.err :
        this.src = this.url;
    }
  },
  mounted () {
    if (this.url === null || this.url === undefined) {
      this.src = this.err;
    }
    this.$refs.img.onerror = () => {
      this.src = this.err
    }
  }
});
