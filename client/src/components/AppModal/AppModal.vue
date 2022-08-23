<template>
  <Transition name="modal">
    <div v-if="show" class="modal-backdrop">
      <div class="modal-wrapper">
        <div class="modal-container" :class="(size=='S')?'modal-small':'modal-large'">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body">body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div v-if="isConfirmModal" class="button-container" >
                <button
                  class="modal-default-button"
                  @click="$emit('close')"
                >NO</button>
                <button
                  class="modal-default-button"
                  @click="$emit('confirm')"
                >YES</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    isConfirmModal: Boolean,
    size: String
  }
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.2s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-large {
 width: 80%;
 
}

.modal-small {
 width: 50%;
 
}
.modal-header {
  margin: 0 0 0 0;
}
.modal-header h3 {
  color: rgb(0,0,0);
   margin: 0 0 0 0;
}

.modal-body {
  margin: 20px 0;
}
.modal-footer {
  margin-bottom: 10px;

}
.button-container{
  min-height: 20px;
}
.modal-default-button {
  float: right;
  margin-left: 5px;
  min-width: 50px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>