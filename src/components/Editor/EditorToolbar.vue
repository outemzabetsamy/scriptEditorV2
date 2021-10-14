<template>
  <div class="editor-toolbar">
   
      <div class="nav">
          <div v-for="(tool,ind) in toolbar" :key="ind" class="nav-item">
                 <div v-if="tool.type ==='button'">
                    <button v-if="tool.icon!==null" v-html="tool.text" :title="tool.text" type="button" class="buton" @click="singleButton(tool.value)"></button>
                    <button v-else type="button" class="buton" @click="singleButton(tool.action)"> 
                        {{tool.text}}
                    </button>
              </div>
            <div v-if="tool.type === 'divider'" class="editor-divider"></div>
           
          </div>
      </div>
  </div>
</template>

<script>
export default {
name:'EditorToolbar',
props: ['type','toggles','wrap','viewHTML','items'],
emits: ['update:type','update:toggles','update:wrap','update:viewHTML'],
data(){
    return{
        toolbar:[
            
            {
              type: 'button',
              text: 'Scene',
              value: 'scene',
              
            },
            {
              type: 'button',
              text: 'Action',
              value: 'action'
            },
            {
              type: 'button',
              text: 'Personnage',
              value: 'personnage'
            },
            {
              type: 'button',
              text: 'Dialogue',
              value: 'dialog'
            },
            {
              type: 'button',
              text: 'Parenthese',
              value: 'parenthese'
            },
            {
              type: 'button',
              text: 'Update',
              value: 'update',
              
            },

            
        ],
        tab:[],
    }
},
computed:{
    tools(){
        let menus = this.toolbar
        if(this.items.length>0){
            menus= this.items
        }
        return menus;
    }
},
methods: {
  selectAlignement(alignement){
    console.log("alignement");
    console.log(alignement);
    this.emitter.emit("typeAlignement",{alignement:alignement});

  },
  selectScene(scene){
    console.log("Scenes");
    console.log(scene);
    this.emitter.emit("typeScene",{scene:scene});

  },
    selectType(type){
        this.$emit('update:type',type)
        this.emitter.emit("typeEvent",{type:type})
    },
    toggleButton(index,button,order){
      console.log(this.toolbar)
        const toggleAction = this.toolbar[index].action
        console.log(...toggleAction)
        console.log(order)
        console.log(toggleAction)
        console.log(JSON.parse(JSON.stringify(toggleAction)))
      // console.log(Reflect.get(toggleAction)); 
        console.log(toggleAction.includes(button.value))
        if(toggleAction.includes(button.value)){
          
          const id=toggleAction.findIndex(el=>el === button.value);
          console.log(id)
            toggleAction.splice(id,1);
            document.querySelector('#'+button.value).classList.remove('primary-bottom:border','solid-bottom:border-2')
            }else{
          console.log("else")
          document.querySelector('#'+button.value).classList.add('primary-bottom:border','solid-bottom:border-2')
            toggleAction.push(button.value)
        }
        console.log("avant emit")
        //this.$emit('update:toggles',toggleAction)
        this.emitter.emit("eventToggles",{tg:JSON.parse(JSON.stringify(toggleAction))})
        console.log("apres emit")
    },
    wrapButton(index, button){
        const wrapAction = this.toolbar[index].action =button.value
        this.$emit('update:wrap',wrapAction)
        console.log(wrapAction)
        this.emitter.emit("wrapEvent",{type:wrapAction})
    },
    singleButton(action){
        //this.$emit('update:viewHTML',action)
        console.log("actiooooooooooooooooooooooooon")
        console.log(action)
        this.emitter.emit("selectedButton",{type:action})
    }
}
}
</script>

<style>

</style>