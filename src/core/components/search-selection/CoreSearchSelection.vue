<template>
<div class="core-search-selection">
  <div class="wrapper-content">
    <div class="label">
      {{ coreSearchSelectionLabel }}
    </div>
    <div class="group-content-wrapper">
      <div class="group-content">
        <div class="selection-list">
          <slot name="selection-list"></slot>
        </div>

        <div class="selection-search">
          <div class="selection-search-input">
            <slot name="selection-search-input"></slot>

          </div>
          <div class="selection-search-result">
            <slot name="selection-search-result"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CoreFormInput from "@/core/components/form-input/CoreFormInput";
export default {
  name: "CoreSearchSelection",
  components: {
    CoreFormInput
  },
  props: {
    coreSearchSelectionLabel: {
      type: [String],
      default: 'Label'
    },
  }
}
</script>

<style scoped lang="scss">
.core-search-selection {
  .wrapper-content {
    width: 100%;
    height: fit-content;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: start;
    align-content: start;

    .label {
      width: fit-content;
      min-width: 200px;
      max-width: 300px;
      height: 30px;
      font-weight: 600;

      color: #979797;
    }

    .group-content-wrapper {
      position: relative;
      width: 100%;
      border-radius: 6px;
      border: 1px solid #626262;
      overflow: hidden;

      &:after {
        content: '';
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 6px;
        box-shadow:
            2px 2px 2px 0px #111316 inset,
            -2px -2px 2px 0px #262830 inset;
      }

      .group-content {
        z-index: 10;
        position: relative;
        left: 0;
        top: 0;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: start;
        align-content: start;

        .selection-list {
          width: 600px;
          height: 500px;
          padding: 4px;
          border-right: 1px solid #626262;

          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          align-content: flex-start;

          overflow-y: scroll;
        }

        .selection-search {
          width: calc(100% - 600px);
          height: 500px;
          padding: 4px;

          .selection-search-input {
            width: 100%;
            height: 60px;
          }

          .selection-search-result {
            width: 100%;
            height: calc(100% - 60px);
            overflow-y: scroll;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            align-content: flex-start;
          }
        }
      }
    }
  }
}
</style>