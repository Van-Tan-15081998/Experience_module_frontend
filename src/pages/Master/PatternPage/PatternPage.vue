<template>
  <div class="master">
    <div
        class="left-content"
        :class="{'isExpanded': isExpanded}"
    >
      <div class="master-menu">
        <div
            @click="toggleExpand"
            class="toggle-master-menu">
          <i v-if="isExpanded" class="bi bi-chevron-bar-left"></i>
          <i v-else class="bi bi-chevron-bar-right"></i>
        </div>
        <ul>
          <router-link to="/master/pattern-page/pattern-01">
            <li>
              <div class="menu-item">
                <div class="menu-icon"><i class="bi bi-journal-text"></i></div>
                <div class="menu-label">Pattern-01</div>
              </div>
            </li>
          </router-link>
          <router-link to="/master/pattern-page/pattern-02">
            <li>
              <div class="menu-item">
                <div class="menu-icon"><i class="bi bi-journal-text"></i></div>
                <div class="menu-label">Pattern-02</div>
              </div>
            </li>
          </router-link>
					<router-link to="/master/pattern-page/pattern-04">
						<li>
							<div class="menu-item">
								<div class="menu-icon"><i class="bi bi-journal-text"></i></div>
								<div class="menu-label">Pattern-04</div>
							</div>
						</li>
					</router-link>
					<router-link to="/master/pattern-page/pattern-05">
						<li>
							<div class="menu-item">
								<div class="menu-icon"><i class="bi bi-journal-text"></i></div>
								<div class="menu-label">Pattern-05</div>
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
</template>

<script>
export default {
  name: 'PatternPage',
  setup() {
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
.master {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .left-content {
    width: 30px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    transition: 0.5s;
    border-right: 1px solid #948C6A;

    .master-menu {
      width: 30px;
      height: 100%;
      background-color: #656565;
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
          font-size: 18px;
          color: #9BE1EE;
        }
      }

      ul {
        padding: 0px !important;
        margin: 0px !important;

        a {
          text-decoration: none;
        }

        li {
          background-color: white;
          min-height: 30px;
          height: fit-content;
          list-style: none;

          .menu-item {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: flex-start;
            line-height: 30px;
            font-size: 14px;

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
            background-color: #B6FF1F;
            cursor: pointer;
          }
        }
      }
    }

    &.isExpanded {
      width: 160px;

      .master-menu {
        width: 160px;

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