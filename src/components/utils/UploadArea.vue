<template lang="pug">
.upload-area
    label.upload.cursor-pointer(:for='id' :class='{ dragover: dragover }'
            @dragover.prevent='dragover = true' @dragleave.prevent='dragover = false'
            @drop.prevent='onDrop')
        div
            slot
    input.block.upload-input(:id='id' type='file' @change='onFileChange')
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator';
import shortid from 'shortid';

@Component
export default class UploadArea extends Vue {
    @PropSync('files', { required: true })
    public syncedfiles!: File[];

    protected id = `uploadArea-${shortid()}`;

    protected dragover = false;

    protected onDrop(event: { dataTransfer: { files: File[] } }): void {
        this.dragover = false;
        this.syncedfiles = event.dataTransfer.files;
    }

    protected onFileChange(event: { target: { files: File[] } }): void {
        this.dragover = false;
        this.syncedfiles = event.target.files;
    }
}
Vue.component('UploadArea', UploadArea);
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/entry/variable.styl';

.upload-area {
    .upload {
        position: relative;
        display: block;
        width: 100%;
        height: 200px;
        border: 1px solid $border-primary;
        border-style: dashed;
        background-color: #F9F9F9;

        &.dragover {
            background-color: #D9D9D9;
        }

        & > div {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            span {
                display: block;
                width: 100%;
            }
        }
    }

    .upload-input {
        width: 0;
        height: 0;
        overflow: hidden;
    }
}
</style>
