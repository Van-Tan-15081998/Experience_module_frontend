<template>
	<div class="core-app-style core-neumorphism-style dark-mode">
  <div class="master">
    <div
        class="left-content"
        :class="{'isExpanded': isExpanded}"
        >
      <div class="master-menu">
        <div
            @click="toggleExpand"
            class="toggle-master-menu">
          <i v-if="isExpanded" class="bi bi-arrow-bar-left"></i>
          <i v-else class="bi bi-arrow-bar-right"></i>
        </div>
        <ul>
          <router-link to="/master/favorite-app">
            <li>
              <div class="menu-item">
                <div class="menu-icon"><i class="bi bi-heart"></i></div>
                <div class="menu-label">Favorite App</div>
              </div>
            </li>
          </router-link>
          <router-link to="/master/laravel-research">
            <li>
              <div class="menu-item">
                <div class="menu-icon"><i class="bi bi-journal-code"></i></div>
                <div class="menu-label">Laravel Research</div>
              </div>
            </li>
          </router-link>
          <router-link to="/master/system">
            <li>
              <div class="menu-item">
                <div class="menu-icon"><i class="bi bi-gear"></i></div>
                <div class="menu-label">System</div>
              </div>
            </li>
          </router-link>
          <router-link to="/master/pattern-page">
            <li>
              <div class="menu-item">
                <div class="menu-icon"><i class="bi bi-box"></i></div>
                <div class="menu-label">Pattern</div>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
	</div>
</template>

<script>
import { useAuthStore } from '@/store/System/AuthStore';
import apiService from "@/plugins/api/apiService";

export default {
  name: 'Master-Page',
  setup() {
    const authStore = useAuthStore();

    let appApiService = apiService(this, authStore);

    return {
      appApiService
    }
  },
  provide() {
    return {
      apiService: this.appApiService
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>

<style scoped lang="scss">
html,
body {
  height: 100% !important;
  width: 100% !important;
}

.master {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: inherit;

  .left-content {
    width: 40px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    transition: 0.5s;
    border-right: 1px solid #948C6A;

    .master-menu {
      width: 40px;
      height: 100%;
      transition: 0.5s;

      .toggle-master-menu {
        height: 30px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: white;
          cursor: pointer;

          i {
            //color: #F1DD00;
            color: #EB8600;
          }
        }

        i {
          font-size: 20px;
          color: #85EDEE;
        }
      }

      ul {
        a {
          text-decoration: none;
        }

        li {
          background-color: white;
          min-height: 30px;
          height: fit-content;

          .menu-item {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: flex-start;
            line-height: 30px;
            font-size: 16px;

            .menu-icon {
              margin: 0px 5px;
              transition: 0.5s;
              color: #36382e;
            }

            .menu-label {
              width: 100%;
              height: 100%;
              opacity: 0;
              display: none;
              transition: 0.5s;
              color: #36382e;
            }
          }

          &:hover {
            background-color: #F5F400;
            cursor: pointer;
          }
        }
      }
    }

    &.isExpanded {
      width: 200px;

      .master-menu {
        width: 200px;

        ul {
          li {
            .menu-item {
              justify-content: flex-start;

              .menu-label {
                opacity: 1;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .page-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>