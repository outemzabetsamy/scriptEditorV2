<template>
  <div class="text:editor">
      <EditorToolbar v-model:type="selectedType" :toggles="selectedToggles"
      v-model:wrap="selectedWrap" v-model:viewHTML="viewHTML" :items="toolbarItems">
      </EditorToolbar>
      <EditorContent v-model="documentModel" :type="selectedType" :toggles="selectedToggles" :wrap="selectedWrap" @keydown.enter.prevent="addContent" @contextmenu="onEditorRightClick"/>
   
      
        <ContextMenu ref="menu" :model="items" @click="menuItemSelected($event,item)" />
      
      
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
        items:[{label:"scene", items:[{label:"INT."},{label:"EXT."},{label:"INT/EXT."},{label:"EXT/INT."},]},{label:"action"},{label:"personnage"},{label:"dialog"},{label:"update"},],
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
        console.log(event)
    },
    menuItemSelected(event){
        console.log("eveent ")
        console.log(event.target.childNodes[1].innerText)
        this.emitter.emit("selectedButton",{type:event.target.childNodes[1].innerText})
        
    },
}
}
</script>

<style>

</style>