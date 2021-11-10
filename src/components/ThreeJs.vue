<template>
  <div>
    <div class="sidebar">
      <img
        id="fps"
        class="buttonClass"
        title="性能调试"
        src="../assets/icon/fps.svg"
      />
      <img
        id="store"
        class="buttonClass"
        title="显示仓库"
        src="../assets/icon/store.svg"
      />
      <img
        id="group"
        class="buttonClass"
        title="显示巷道"
        src="../assets/icon/group.svg"
      />
      <img
        id="shelf"
        class="buttonClass"
        title="显示架子"
        src="../assets/icon/shelf.svg"
      />
      <img
        id="reset"
        class="buttonClass"
        title="复位场景"
        src="../assets/icon/reset.svg"
      />
    </div>
    <div id="canvas-frame"></div>
    <div id="S01" style="width: 400px;height: 400px"></div>
    <div id="S02" style="width: 400px;height: 400px"></div>
    <div id="S03" style="width: 400px;height: 400px"></div>
    <div id="S04" style="width: 400px;height: 400px"></div>
    <div id="S05" style="width: 400px;height: 400px"></div>
    <div id="label"></div>
  </div>
</template>

<script>
import * as THREE from "three";

var scene;
var camera;
//var control;
//var stats;
var renderer;
var light;
var amblight;
var pointLight1;
var pointLight2;

export default {
  data() {
    return {
      data: [],
      width: "",
      height: ""
    };
  },

  mounted() {
    this.width = document.getElementById("canvas-frame").clientWidth;
    this.height = document.getElementById("canvas-frame").clientHeight;
    this.threeStart();
  },
  methods: {
    threeStart() {
      scene = new THREE.Scene();
      this.initThree();
      this.initScene();
      this.initCamera();
      this.initLight();
    },
    initThree() {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
        //用来解决模型重叠部分不停闪烁问题
        // logarithmicDepthBuffer: true
      });
      renderer.setSize(this.width, this.height);
      renderer.setClearColor(0x39609b);
      renderer.setPixelRatio(window.devicePixelRatio);
      document.getElementById("canvas-frame").appendChild(renderer.domElement);
      window.addEventListener("resize", this.onWindowResize, false);
    },
    initScene() {
      scene = new THREE.Scene();
    },
    initCamera() {
      camera = new THREE.PerspectiveCamera(
        60,
        this.width / this.height,
        1,
        10000
      );
      camera.position.set(0, 1600, 1000);
      camera.lookAt(0, 0, 0);
      scene.add(camera);
    },
    initLight() {
      //添加环境光
      amblight = new THREE.AmbientLight(0xffffff, 1);
      amblight.position.set(0, 0, 0);
      scene.add(amblight);
      //添加平行光
      light = new THREE.DirectionalLight(0xffffff, 0.3);
      light.position.set(0, 200, 0);
      scene.add(light);
      //添加点光源
      pointLight1 = new THREE.PointLight(0xffffff, 0.3);
      pointLight1.position.set(-500, 200, 0);
      pointLight2 = new THREE.PointLight(0xffffff, 0.3);
      pointLight2.position.set(500, 200, 0);
      scene.add(pointLight1);
      scene.add(pointLight2);
    }
  }
};
</script>

<style scoped>
div#canvas-frame {
  border: none;
  width: 100%;
  height: 1000px;
}
.sidebar {
  margin-top: 100px;
  width: 1.5%;
  height: 400px;
  border-radius: 8px;
  text-align: center;
  background: rgba(205, 215, 230, 1);
  left: 10px;
  position: absolute;
  z-index: 1;
}
.buttonClass {
  width: 90%;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.6s;
  margin-top: 10px;
}
.buttonClass:hover {
  transform: scale(1.2);
}
#label {
  position: absolute;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  line-height: 1;
  color: #000000;
  border-radius: 5px;
  display: none;
}
</style>
