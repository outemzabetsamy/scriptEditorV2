<script>
import { h } from 'vue'
import { $char, $string, $array } from 'alga-js'
import documentModel from '../../document-model.js'

export default {
  name: 'EditorContent',
  props: {
    modelValue: Array,
    type: String,
    toggles: Array,
    wrap: String,
    
  },
  emits: ['update:modelValue'],
  data() {
    return {
      document: [],
      scenes:[],
      ranges: {},
      flatdoc: [],
      selectedNode:'',
      selectedBlock:'',
    }
  },
  render() {
    return h('div', { class: 'editor-content' }, this.renderDocument())
  },
  watch: {
    toggles: {
      handler(value) {
        if(value.length >= 1 && Object.entries(this.ranges).length >= 1) {
          const flatten = $array.flatten(this.document, { children: 'content' })
          for(const [key, val] of Object.entries(this.ranges)) {
            const ind = flatten.findIndex(obj => obj.id === key)
              
            const valAttrs = val[1]
            valAttrs.attrs = {
              bold: (value.includes('b')) ? true : false,
              italic: (value.includes('i')) ? true : false,
              underline: (value.includes('u')) ? true : false,
              strikethrough: (value.includes('s')) ? true : false
            }
              
            const newObj = flatten[ind]
            newObj.content = [
              val[0], 
              valAttrs, 
              val[2]
            ]
            flatten.splice(ind, 1, newObj)
          }
          this.flatdoc = flatten
        }
      },
      deep: true
    }
  },
  updated() {
    this.$nextTick(() => {
      document.onselectionchange = () => {
        this.ranges = {}
        const selection = document.getSelection();

        for(let i = 0; i < selection.rangeCount; i++) {
          const rangeStart = selection.getRangeAt(i).startOffset
          const rangeEnd = selection.getRangeAt(i).endOffset
          const rangeId = selection.getRangeAt(i).commonAncestorContainer.parentElement.getAttribute('id')
           //const index = $array.index(this.document, { key: 'id', value:rangeId});
          //const index = this.findInTheDoc(rangeId);
          this.findInTheDoc(rangeId)
          this.selectedNode=rangeId;
          const rangeSplit = $string.split(selection.getRangeAt(i).commonAncestorContainer.textContent)(rangeStart, rangeEnd)
          console.log("rangeStart");
          console.log(rangeStart);
          console.log("rangeEnd");
          console.log(rangeEnd);
          console.log("rangeId");
          console.log(rangeId);
          console.log("index of element containing rangeId");
          console.log(this.selectedBlock)
          console.log("rangeId");
          console.log(rangeSplit);
          const rangeArray = []
          rangeSplit.forEach(text => {
            const rangeObject = {
              id: `inline-${$char.random(11)}`,
              insert: 'span',
              content: text,
              parent: rangeId
            }
            rangeArray.push(rangeObject)
          })
          if(rangeId !== null && rangeId !== 'app') {
            this.ranges[rangeId] = rangeArray
          }
        }
        console.log(this.ranges)

      }
    })
  },
  created() {
    if(this.document.length <= 0) {
      this.getDocumentModel().then(res => {
        this.document = res
      })

      /*const newBlock = { 
        id: `block-${this.document.length + 1}-${$char.random(5)}`,
        insert: this.type,
        content: (this.type !== 'p') ? '' : []
      }
      if(this.type === 'p') {
        newBlock.content.push({
          id: `inline-${$char.random(11)}`,
          insert: 'span',
          content: ''
        })
      }
      this.document.push(newBlock)*/
      this.$emit('update:modelValue', this.document)
    }
     this.emitter.on("wrapEvent",e=>{
     this.addBlock(e.type);
 })
    this.emitter.on("typeEvent",e=>{
     this.addType(e.type);
    });
    this.emitter.on("typeAlignement",e=>{
     this.setAlignement(e.alignement);
    });
      this.emitter.on("typeScene",e=>{
     this.AddSceneInline(e.scene);
    });

  },
  methods: {
    AddScene(scene){
      if(scene ==='scene'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'h6',content:`${this.selectedBlock?this.selectedBlock+1:this.document.length+1}.   INT-`,attrs:{align:'left'}})
      }
      if(scene ==='action'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'p',content:``,attrs:{align:'left'}})
      }
      if(scene ==='personnage'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'h6',content:``,attrs:{align:'center'}})
      }

      if(scene ==='dialog'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'p',content:``,attrs:{align:'center'}})
      }

        if(scene ==='parenthese'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'p',content:`(  )`,attrs:{align:'center'}})
      }

      
    },



  AddSceneInline(scene){
      if(scene ==='scene'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'div',content:[{id:`inline-${$char.random(11)}`,insert:'h6',content: `${this.selectedBlock?this.selectedBlock+1:this.document.length+1}.   INT-`}],attrs:{align:'left'}})
      }
      if(scene ==='action'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        let i=this.selectedBlock;
        console.log(i)
        this.document[i].content.push(
        {id:`block-${$char.random(5)}`,insert:'p',content:`OK`,attrs:{align:'left'}})
      }
      if(scene ==='personnage'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document[this.selectedBlock?this.selectedBlock+1:this.document.length+1].push(
        {id: `inline-${$char.random(11)}`,insert:'h6',content:``,attrs:{align:'center'}})
      }

      if(scene ==='dialog'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'p',content:``,attrs:{align:'center'}})
      }

        if(scene ==='parenthese'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`block-${this.document.length + 1}-${$char.random(5)}`,insert:'p',content:`(  )`,attrs:{align:'center'}})
      }

      
    },



    setAlignement(alignement){
      console.log("ikechmed ar alignement")
      console.log(alignement);
      this.document[this.selectedBlock]['attrs']['align']=`${alignement}`;
    },
    addBlock(type){
      //this.document.push({id:"block-5-upoyt",insert:'p',content:[{id:'inline-28-ytrp',insert:`${type}`,content:[{id: 'inline-29-tgjksa', insert: 'li', content: ''},]}],attrs:{align:''}})
      this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,{id:"block-5-upoyt",insert:'p',content:[{id:'inline-28-ytrp',insert:`${type}`,content:[{id: 'inline-29-tgjksa', insert: 'li', content: ''},]}],attrs:{align:''}})
    },
    addType(type){
      //this.document.push({id:"block-5-upoyt",insert:`${type}`,content:'',attrs:{align:''}})
       this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,{id:"block-5-upoyt",insert:`${type}`,content:'',attrs:{align:''}})
    },
    renderDocument() {
      console.log("render document")
      if(this.flatdoc.length >= 1) {
        this.document = $array.nested(this.flatdoc, { children: 'content' })
        this.flatdoc = []
        this.$emit('update:modelValue', this.document)
      }
      const renderArray = []
      let j=0;
      this.document.forEach(item => {
        renderArray.push(h(item.insert, { id: item.id, class: this.typeAttributes(item.attrs), contenteditable: true, onKeyUp: this.enterNewBlock, indexofTheBlock:`${j}`, onClick:this.getTheIndex(j) }, this.renderNodes(item.content)))
        
      j++;
      })
      return renderArray
    },
    renderNodes(nodes) {
      console.log("render noooooodes")
      let contentNode = ''
      if(typeof nodes === 'object' && Array.isArray(nodes)) {
        console.log("nodes === object")
        if(nodes.length >= 1) {
           console.log("nodes.length >=1")
          contentNode = []
          let i=0;
          nodes.forEach(node => {

            if(typeof node === 'object' && node !== null) {
              console.log("foreach and node=== 'object' and node !==null")
              if(node.insert === 'span') {
                console.log("span")
                contentNode.push(h(node.insert, { id: node.id, class: this.toggleAttributes(node.attrs), onClick: this.storeTextNode, index:`${i}` }, this.subNodes(node.content)))
              } else if(node.insert === 'a') {
                console.log("a")
                contentNode.push(h(node.insert, { id: node.id, href: this.renderAttribute(node.attrs['link']), class: this.toggleAttributes(node.attrs), index:`${i}`}, this.subNodes(node.content)))
              } else if(node.insert === 'img') {
                console.log("img")
                contentNode.push(h(node.insert, { id: node.id, src: this.renderAttribute(node.attrs['image']), alt:  this.renderAttribute(node.attrs['description']), index:`${i}` }))
              } else if(node.insert === 'embed') {
                console.log("embed")
                contentNode.push(h(node.insert, { id: node.id, src: this.renderAttribute(node.attrs['source']), type:  this.renderAttribute(node.attrs['type']), width:  this.renderAttribute(node.attrs['width']), height:  this.renderAttribute(node.attrs['height']), index:`${i}` }))
              } else {
                console.log("else execute subnodes")
                contentNode.push(h(node.insert, { id: node.id, index:`${i}` }, this.subNodes(node.content)))
              }
            } else {
              console.log("else spaaaan")
              contentNode.push(h('span', {index:`${i}`}, node))
            }
            i++;
          })
        }
      } else {
        contentNode = nodes
      }
      return contentNode
    },

    subNodes(nodes) {
      console.log("subNooooodes")
      let content = nodes
      if(typeof nodes === 'object' && Array.isArray(nodes)) {
        content = this.renderNodes(nodes)
      }
      return content
    },
    typeAttributes(nodeAttrs) {
      console.log("typeAttributes")
      return [
        { 'left:text': this.checkAttribute(nodeAttrs, 'align', 'left') },
        { 'center:text': this.checkAttribute(nodeAttrs, 'align', 'center') },
        { 'right:text': this.checkAttribute(nodeAttrs, 'align', 'right') },
        { 'justify:text': this.checkAttribute(nodeAttrs, 'align', 'justify') },
        { 'none:outline': true }
      ]
    },
    checkAttribute(node, attr, value = '') {
      console.log("checkAttribute")
      let checkAttr = false
      if(value === '') {
        checkAttr = (typeof node === 'object' && attr in node) ? node[attr] : false
      } else {
        checkAttr = (typeof node === 'object' && attr in node && node[attr] === value) ? true : false
      }
      return checkAttr
    },
    toggleAttributes(nodeAttrs) {
      console.log("toggleAttributes")
      return [
        {'bold:text': this.checkAttribute(nodeAttrs, 'bold') },
        {'italic:text': this.checkAttribute(nodeAttrs, 'italic') },
        {'underline:text': this.checkAttribute(nodeAttrs, 'underline') },
        {'strikethrough:text': this.checkAttribute(nodeAttrs, 'strikethrough') }
      ]
    },
    renderAttribute(nodeAttr) {
      console.log("renderAttribute")
      return (nodeAttr !== null) ? nodeAttr : ''
    },
    async getDocumentModel() {
      console.log("getDocumentModel")
      return await documentModel()
    },
    enterNewBlock(event) {
      console.log("enterNewBlock")
      if(event.key === 'Enter') {
        const newBlock = { 
          id: `block-${this.document.length + 1}-${$char.random(5)}`,
          insert: this.type,
          content: (this.type !== 'p') ? '' : []
        }
        if(this.type === 'p') {
          newBlock.content.push({
            id: `inline-${$char.random(11)}`,
            insert: 'span',
            content: ''
          })
        }
        const index = $array.index(this.document, { key: 'id', value: event.target.getAttribute('id') })
        this.document = $array.insert(newBlock)(this.document).after(index)
        
        setTimeout(() => {
          const blockElement = event.target.nextElementSibling
          const rangeEnter = document.createRange()
          const selectEnter = document.getSelection()
          
          if(blockElement.getAttribute('id') === this.document[index + 1].id) {
            if(blockElement.tagName === 'P') {
              rangeEnter.setStart(blockElement.children[0], 0)
            } else {
              rangeEnter.setStart(blockElement, 0)
            }
            rangeEnter.collapse(true)
            
            selectEnter.removeAllRanges()
            selectEnter.addRange(rangeEnter)
          }
        })
      }
    },
    storeTextNode(event) {
      console.log("storeTextNode")
      console.log("ikechmeeed ar dayiiiiiiiiiiiiii")
      const inlineFlatten = $array.flatten(this.document, { children: 'content' })
      const inlineIndex = $array.index(inlineFlatten, { key: 'id', value: event.target.getAttribute('id') })
      if(typeof inlineFlatten[inlineIndex].content === 'string') {
        inlineFlatten[inlineIndex].content = event.target.textContent
        this.flatdoc = inlineFlatten
      }
        console.log("avaant inlineFlatten[inlineIndex] ")
      console.log(inlineFlatten[inlineIndex])
      console.log("avaant emiiit")
      this.$emit('update:modelValue',this.document)
      console.log("apres emiiit")
    },
    getTheIndex(j){
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      console.log(j);
    },
    findInTheDoc(id){
      //Array.prototype.forEach.call(parent.children,
      var n=0;
      
      this.document.forEach(e=>{
        console.log(Object.prototype.toString.call(e.content))
        if(e.id === id){
        this.selectedBlock=n;
      }else{
        console.log("e.content.length");
        console.log(Object.prototype.toString.call(e.content)==='[object Array]');
        console.log(Object.prototype.toString.call(e.content)==='[object Array]');
        if(Object.prototype.toString.call(e.content)==='[object Array]'){
          Array.prototype.forEach.call(e.content,c=>{
           
            if(c.id === id){
              this.selectedBlock=n;
            }else{
              
              if(Object.prototype.toString.call(c.content)==='[object Array]'){
                Array.prototype.forEach.call(c.content,k=>{
                  if(k.id === id){
                    this.selectedBlock=n;
                  }
                })
              }
            }
          })
        }
      }
      n++;
      })
      
    }
  }
}
</script>
