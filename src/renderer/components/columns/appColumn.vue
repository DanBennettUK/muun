<template>
    <section v-bind:style='customColumnStyles' class='appColumn' :id='columnId' transition='scale-transition' origin='center center'>
        <appColumnTitlebar :icon='icon' :title='title'></appColumnTitlebar>
        <v-spacer :style='"height:" + columnOptions.columnHeaderSpacer + "px;" '></v-spacer>
        <appColumnList></appColumnList>
    </section>
</template>

<script>
  import appColumnTitlebar from './appColumnTitlebar'
  import appColumnList from './appColumnList'
  import appTweet from '../tweets/appTweet'

  import settingsStore from '../../store/modules/settings'

  export default {
    components: {
      appColumnTitlebar,
      appColumnList,
      appTweet
    },
    props: ['icon', 'title', 'columnId'],
    data () {
      return {
        columnOptions: settingsStore.state.columnOptions,
        customColumnStyles: {
          width: settingsStore.state.columnOptions.columnWidth + 'px',
          padding: settingsStore.state.columnOptions.columnPadding + 'px'
        }
      }
    }
  }
</script>

<style>
    .appColumn {
        height: 99vh;
    }
</style>
