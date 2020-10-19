<template>
  <button :class="$style.button" v-on="$listeners">
    <slot />
  </button>
</template>

<style lang="scss" module>
@import 'src/design/index.scss';

.button {
  @extend %typography-small;

  border-radius: 0px 25px 25px 0px;
  display: inline-block;
  font: inherit;
  outline: 0;
  transition: all 200ms ease-in;
  padding: $size-button-padding;
  color: $color-button-text;
  cursor: pointer;
  background: $color-button-bg;
  border: none;

  &--primary {
    
    color: $color-button-text;
    box-shadow: 0 0 2px 2px #ffa000;
    border-radius: 2px;
    padding: 12px 36px;

    &:hover {
      background: darken($color-button-bg, 24%);
    }

    &:active {
      background: #867455;
      box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: $color-button-disabled-bg;
  }
}
</style>