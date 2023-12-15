<template>
  <div class="master-dashboard">
    <div class="sky-wrapper">
      <div class="sky-wrapper-content">

        <div class="sky-wrapper-content-execute-run" ref="sky-wrapper-content-execute-run">
          <default-cloud
              v-for="item in 100"
              :key="item"
          />
        </div>

        <button @click="onStart">Start</button>
      </div>
    </div>

    <div class="surface-wrapper">
      <div class="surface-wrapper-content">

       <div class="surface-wrapper-content-execute-run" ref="surface-wrapper-content-execute-run">
         <default-tree
             v-for="item in 100"
             :key="item"
         />
       </div>

      </div>
    </div>

    <div class="ground-wrapper">

     <div class="ground-elements">

       <div class="top-pavement">
         <div class="top-pavement-content">

         </div>
       </div>

       <div class="road">

         <div class="right-road">
          <div class="right-road-content">

          </div>
         </div>

         <div class="left-road">
          <div class="left-road-content">

          </div>
         </div>

       </div>

       <div class="bottom-pavement">

         <div class="elements-on-bottom-pavement">
<!--          <demo-car/>-->
           <walking-dog/>
         </div>

       </div>

     </div>

    </div>

  </div>
</template>

<script>
import WalkingDog from "@/youtube/components/animals/dogs/WalkingDog";
import DemoCar from "@/youtube/components/cars/DemoCar";

import DashboardComponents from "@/youtube/components/DashboardComponents";

export default {
  name: "MasterDashboard",
  extends: DashboardComponents,
  components: {
    WalkingDog,
    DemoCar
  },
  methods: {
    onStart()  {
      this.cloudRun();

      this.treeRun();
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async cloudRun() {
      for(let i = 0; i < 10000; i++) {

        this.$refs["sky-wrapper-content-execute-run"].style.left = - (i/2)+ 'px';

        await this.sleep(20);
      }
    },
    async treeRun() {
      for(let i = 0; i < 10000; i++) {

        this.$refs["surface-wrapper-content-execute-run"].style.left = - i + 'px';

        await this.sleep(15);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.master-dashboard {
  position: relative;
  height: 1000px;
  width: 1500px;
  background-color: #00bf72;

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
    background-color: #1b1f23;
  }
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: #1b1f23;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
    background-color: #626262;
  }

  .sky-wrapper {
    position: absolute;
    height: 30%;
    width: 100%;
    background-color: #4A6EE0;
    overflow: hidden;

    .sky-wrapper-content {
      position: relative;
      width: 100%;
      height: 100%;

      .sky-wrapper-content-execute-run {
        position: absolute;
        left: 0;
        bottom: 0;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-end;
      }
    }
  }

  .surface-wrapper {
    position: absolute;
    height: 20%;
    width: 100%;
    top: 30%;
    background-color:lightslategray ;
    overflow: hidden;

    .surface-wrapper-content {
      position: relative;
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-end;

      .surface-wrapper-content-execute-run {
        position: absolute;
        left: 0;
        bottom: 0;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-end;
      }
    }
  }

  .ground-wrapper {
    position: absolute;
    height: 50%;
    width: 100%;
    top: 50%;
    background-color: tan;

    .ground-elements {
      position: relative;
      width: 100%;
      height: 100%;

      .top-pavement {
        position: absolute;
        height: 20%;
        width: 100%;
        top: 0;
        background-color: #555555;

        .top-pavement-content {
          position: relative;
          width: 100%;
          height: 100%;
        }
      }

      .bottom-pavement {
        position: absolute;
        height: 30%;
        width: 100%;
        bottom: 0;
        background-color: #555555;

        .elements-on-bottom-pavement {
          position: relative;
          width: 200px;
          height: 200px;
          //z-index: 10;
        }
      }

      .road {
        position: absolute;
        height: 50%;
        width: 100%;
        top: 20%;
        background-color: #2D2D2D;

        .right-road {

        }

        .left-road {

        }
      }
    }
  }
}
</style>