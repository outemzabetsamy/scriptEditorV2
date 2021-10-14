<template>
  <div class="text:editor">
      <EditorToolbar v-model:type="selectedType" :toggles="selectedToggles"
      v-model:wrap="selectedWrap" v-model:viewHTML="viewHTML" :items="toolbarItems">
      </EditorToolbar>
      <EditorContent v-model="documentModel" :type="selectedType" :toggles="selectedToggles" :wrap="selectedWrap" @keydown.enter.prevent="addContent" @contextmenu="onEditorRightClick"/>
   
      
        <ContextMenu ref="menu" :model="items" />
      
      
    <!--
    <div class="editor-content">
        <br/>
        <br/>
        Type/Block: {{selectedType}}<br/>
        Toggle Buttons: {{selectedToggles}}<br/>
        In wrap Elements: {{selectedWrap}}<br/>
        View HTML: {{viewHTML}}
    </div>
    -->
  </div>
</template>

<script>
import EditorToolbar from '../components/Editor/EditorToolbar.vue'
import EditorContent from '../components/Editor/EditorContent.vue'

export default {
name:'ViewTextEditor',
data(){
    return{
        items:[{label:"one"},{label:"two"},{label:"three"},{label:"four"},{label:"five"},],
        selectedType: 'p',
        selectedToggles:[],
        selectedWrap:'',
        viewHTML: false,
        toolbarItems: [],
        members: ['Roxie Miles', 'grace.carroll','samy']
    }
},
computed:{
    selToggles(){
        return JSON.parse(JSON.stringify(this.selectedToggles));
    }
},
created(){
console.log(this.selectedToggles);
console.log(this.selectedType);
 this.emitter.on("eventToggles",e=>{
     this.selectedToggles=e.tg
 })
 this.emitter.on("eventWrap",e=>{
     this.selectedToggles=e.tg
 })
},
components:
{
EditorToolbar,
EditorContent,

},
methods:{
    entered(e){
        console.log(e)
    },
    addContent(e){
        if(e.key==='Enter'){
        this.emitter.emit('keyEntered',e)
        console.log('trrrrrrrrrrrrrrrrrrr')
        }
    },
    onEditorRightClick(event){
        console.log("this.$refs")
        console.log(this.$refs)
        this.$refs.menu.show(event);
    },
}
}
</script>

<style>

</style>