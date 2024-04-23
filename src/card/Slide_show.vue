<template>
    <div>
      <transition-group name="fade" tag="div">
        <div v-for="i in [currentIndex]" :key="i">
          <img :src="currentImg"  width="200"  class="radio"/>
        </div>
      </transition-group>
      <a class="prev" @click="prev" href="#"></a>
      <a class="next" @click="next" href="#"> </a>
      <!-- <a class="prev" @click="prev" href="#">&#10094; Previous</a>
      <a class="next" @click="next" href="#">&#10095; Next</a> -->
    </div>
  </template>
  <script>
  export default {
    name: "Slide_show",
    data() {
      return {
        images: [
          "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
          "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
          "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        ],
        timer: null,
        currentIndex: 0
      };
    },
  
    mounted: function() {
      this.startSlide();
    },
  
    methods: {
      startSlide: function() {
        this.timer = setInterval(this.next, 4000);
      },
  
      next: function() {
        this.currentIndex += 1;
      },
      prev: function() {
        this.currentIndex -= 1;
      }
    },
  
    computed: {
      currentImg: function() {
        return this.images[Math.abs(this.currentIndex) % this.images.length];
      }
    }
  };
  </script>