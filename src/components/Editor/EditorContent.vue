<script>
import { h } from 'vue'
import { $char, $string, $array } from 'alga-js'
import documentModel from '../../document-model.js'
import CustomModel from '../CustomModel.js'

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
      typee:null,
      entered:'',
      joinedStrings:'',
      targetedId:'',
      
      scenes:[{
           idScene:1,
           repere:'INT',
           momentDeLaJournée:'MATIN',
           lieu:'HOPITAL',
           action:'JAQUES Rentre dans un grand hall d hopital et rencontre une infirmiere',
           dialogue:[
               {idReplique:1,personnageReplique:'Infirmiere',parentheseReplique:null,texteReplique:'Salut!',ordre:1},
               {idReplique:2,personnageReplique:'JAQUES',parentheseReplique:'En souriant',texteReplique:'Bonjour!',ordre:2},
           ]

       },
       {
        idScene:2,
        repere:'EXT',
        momentDeLaJournée:'JOUR',
        lieu:'PARC',
        action:'JAQUES marche dans un parc plein de petits enfants et vois de loin son fils MATT et se precipite vers lui',
        dialogue:[
            {idReplique:1,personnageReplique:'JAQUES',parentheseReplique:'En souriant',texteReplique:'Heey mon petit',ordre:1},
            {idReplique:2,personnageReplique:'MATT',parentheseReplique:'Surpris',texteReplique:'Papaa',ordre:2},
        ]

        }],
      ranges: {},
      flatdoc: [],
      selectedNode:'',
      selectedBlock:'',
    }
  },
  render() {
    return h('div', { class: 'editor-content',contenteditable:true,on:{keyDown:()=>{console.log("keeey")}} }, this.renderDocument())
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
    console.log("updated")
    this.$nextTick(() => {
      console.log("$nextTick")
      document.onselectionchange = () => {
        this.ranges = {}
        const selection = document.getSelection();
        

          console.log("onSelectionChange")
        for(let i = 0; i < selection.rangeCount; i++) {
          const rangeStart = selection.getRangeAt(i).startOffset
          const rangeEnd = selection.getRangeAt(i).endOffset
          const rangeId = selection.getRangeAt(i).commonAncestorContainer.parentElement.getAttribute('id')
          const el = selection.getRangeAt(i);
           console.log("ellllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
           console.log(el);
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
          this.targetedId=rangeId;

          console.log("index of element containing rangeId");
          console.log(this.selectedBlock)
          console.log("rangeSplit");
          console.log(rangeSplit);
          console.log(rangeSplit.join())
          console.log("rangeSplit");
          this.joinedStrings=rangeSplit.join("");
          console.log(rangeSplit[0]);
           //this.setDocValues(rangeId,rangeSplit[0],this.selectedBlock)
          
          //this.setDocValues(rangeId,rangeSplit.join(""),this.selectedBlock)
          
        }
        console.log(this.ranges)
        this.setDocValues(this.targetedId,this.joinedStrings,this.selectedBlock)
        
      }
    })
    //this.setDocValues(this.targetedId,this.joinedStrings,this.selectedBlock)
  },
  created() {
   
    document.onselectionchange = (e) => {
      console.log(e)
        
        const selection = document.getSelection();
          console.log("onSelectionChange")
        for(let i = 0; i < selection.rangeCount; i++) {
          const rangeStart = selection.getRangeAt(i).startOffset
          const rangeEnd = selection.getRangeAt(i).endOffset
          const rangeId = selection.getRangeAt(i).commonAncestorContainer.parentElement.getAttribute('id')
          const el = selection.getRangeAt(i);
           console.log("ellllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
           console.log(el);
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
          this.targetedId=rangeId;
          let t=rangeId.split("-")
          this.setType(t[0])
          console.log("index of element containing rangeId");
          console.log(this.selectedBlock)
          console.log("rangeId");
          console.log(rangeSplit);
          console.log(rangeSplit.join(""));
          this.joinedStrings=rangeSplit.join("");
           console.log("rangeSplit");
          console.log(rangeSplit[0]);
           
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
      this.setDocValues(this.targetedId,this.joinedStrings,this.selectedBlock)
      this.getCustomModel().then(res => {
        
        this.scenes = res;
        console.log("scenes recup")
      })
      
      
      this.setDocumentModel();
      this.$emit('update:modelValue', this.document)
    

     
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

    this.emitter.on("selectedButton",e=>{
      
      this.AddScene(e.type);
      if(e.type==="INT."||e.type==="EXT."||e.type==="EXT/INT."||e.type==="INT/EXT."){
        this.typee="scene";
      }else{

      
     this.typee=e.type;
    }
    });

     this.emitter.on("keyEntered",e=>{
       
       if(this.typee==='scene'){
         this.AddScene("action");
         this.enterNewElement("action")
        this.typee="action";
       console.log("key entered  "+e.key)
       

       }else if(this.typee==='action'){
         this.AddScene("personnage")
         this.enterNewElement("personnage")
         this.typee="personnage";

        

       }else if(this.typee==='personnage'){
         this.AddScene("parenthese")
         this.enterNewElement("parenthese")
         this.typee="parenthese";

        
       }else if(this.typee==='parenthese'){
         this.AddScene("dialog")
         this.enterNewElement("dialog")
         this.typee="dialog";

         
       }
       else if(this.typee==='dialog'){
         console.log("dialog to personnage")
         this.AddScene("personnage")
         this.enterNewElement("dialog2personnage")
         this.typee="personnage";
       }
       
       
     
    });

  },
  mounted(){
    
  },
  methods: {
    AddScene(scene){

      if(scene ==='scene'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`${this.document.length + 1}`,insert:'div',content:[{id:`title-${this.selectedBlock?this.selectedBlock+1:this.document.length+1}-${$char.random(5)}`
        ,insert:'div',content:`${this.selectedBlock?this.selectedBlock+2:this.document.length+1} \xa0`,attrs:{align:'left',bold:true}}],attrs:{align:'left',bold:true}})
      }

      if(scene ==='action'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document[this.selectedBlock?this.selectedBlock:this.document.length].content.push({
                  id:`action-${this.selectedBlock?this.selectedBlock+1:this.document.length+1}-${$char.random(5)}`,
                  insert:'p',
                  content:`\xa0`,
                  attrs:{align:'left'}
              })
      }

      if(scene ==='personnage'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document[this.selectedBlock?this.selectedBlock:this.document.length].content.push({
                              id:`replique-${$char.random(5)}`,
                              insert:'div',
                              content:[
                                  {
                                      id:`personnage-${$char.random(5)}`,
                                      insert:'h6',
                                      content:`\xa0`,
                                      attrs:{
                                          align:'center',
                                          bold:true,
                                      }
                                      
                                  }]})
      }

      if(scene ==='dialog'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        let l=this.document[this.selectedBlock?this.selectedBlock:this.document.length].content.length-1;
        console.log(l);
        this.document[this.selectedBlock?this.selectedBlock:this.document.length].content[l].content.push(
                                  {
                                      id:`text_replique-${$char.random(5)}`,
                                      insert:'p',
                                      content:`\xa0`,
                                      attrs:{
                                          align:'dialog',  
                                      }
                                      
                                  })
      }

      if(scene ==='parenthese'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        let l=this.document[this.selectedBlock?this.selectedBlock:this.document.length].content.length-1;
        console.log(l);
        this.document[this.selectedBlock?this.selectedBlock:this.document.length].content[l].content.splice(1,0,
                                  {
                                              id:`parenthese-${$char.random(5)}`,
                                              insert:'h6',
                                              content:`( \xa0 )`,
                                              attrs:{align:'center'},
                                              },
                                  )
      }
      
      if (scene ==='update'){
        console.log("ikechmed ar if update")
        this.docToScenes();
      }
      
      if(scene ==='INT.'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`${this.document.length + 1}`,insert:'div',content:[{id:`title-${this.selectedBlock?this.selectedBlock+1:this.document.length+1}-${$char.random(5)}`
        ,insert:'div',content:`${this.selectedBlock?this.selectedBlock+2:this.document.length+1} \xa0 INT.`,attrs:{align:'left',bold:true}}],attrs:{align:'left',bold:true}})
      }

      if(scene ==='EXT.'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`${this.document.length + 1}`,insert:'div',content:[{id:`title-${this.selectedBlock?this.selectedBlock+1:this.document.length+1}-${$char.random(5)}`
        ,insert:'div',content:`${this.selectedBlock?this.selectedBlock+2:this.document.length+1} \xa0 EXT.`,attrs:{align:'left',bold:true}}],attrs:{align:'left',bold:true}})
      }

       if(scene ==='EXT/INT.'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`${this.document.length + 1}`,insert:'div',content:[{id:`title-${this.selectedBlock?this.selectedBlock+1:this.document.length+1}-${$char.random(5)}`
        ,insert:'div',content:`${this.selectedBlock?this.selectedBlock+2:this.document.length+1} \xa0 EXT/INT.`,attrs:{align:'left',bold:true}}],attrs:{align:'left',bold:true}})
      }
        if(scene ==='INT/EXT.'){
        // `block-${this.document.length + 1}-${$char.random(5)}`
        this.document.splice(this.selectedBlock?this.selectedBlock+1:this.document.length+1,0,
        {id:`${this.document.length + 1}`,insert:'div',content:[{id:`title-${this.selectedBlock?this.selectedBlock+1:this.document.length+1}-${$char.random(5)}`
        ,insert:'div',content:`${this.selectedBlock?this.selectedBlock+2:this.document.length+1} \xa0 INT/EXT.`,attrs:{align:'left',bold:true}}],attrs:{align:'left',bold:true}})
      }

      
     
      
    },
    setType(type){
      if(type==="title"){
        this.typee="scene";
      }else if(type==="action"){
        this.typee="action";
      }else if(type==="personnage"){
        this.typee="personnage";
      }else if(type==="text_replique"){
        this.typee="dialog";
      }
    },
    setDocumentModel(){
      this.document=[];
      console.log("ikechmed ar setDocumentModel")
      let i=1;
      this.scenes.forEach(sc=>{
        console.log("ikechmed ar foreaaaach n scenes")
        console.log(sc);
        let part1={
            id:`${sc.idScene}`,
            insert:'div',
            content: [
              {
                id:`title-${sc.idScene}-${$char.random(5)}`,
                insert:'h6',
                content:`${i} ${sc.repere}.${sc.momentDeLaJournée}.${sc.lieu}`,
                attrs:{
                    align:'left',
                    bold:true}
                
              },
              {
                  id:`action-${sc.idScene}-${$char.random(5)}`,
                  insert:'p',
                  content:`${sc.action}`,
                  attrs:{align:'left'}
              },]};
      sc.dialogue.forEach(d=>{
          console.log(d);
          if(d.parentheseReplique !==null){
               part1.content.push(
                          {
                              id:`replique-${d.idReplique}-${d.personnageReplique}-${$char.random(5)}`,
                              insert:'div',
                              content:[
                                  {
                                      id:`personnage-${d.idReplique}-${d.personnageReplique}-${$char.random(5)}`,
                                      insert:'h6',
                                      content:`${d.personnageReplique}`,
                                      attrs:{
                                          align:'center',
                                          bold:true,
                                      }
                                      
                                  },
                                  {
                                              id:`parenthese-${d.idReplique}-${d.personnageReplique}-${$char.random(5)}`,
                                              insert:'h6',
                                              content:`( ${d.parentheseReplique} )`,
                                              attrs:{align:'center'},
                                              },
                                              {
                                              id: `text_replique-${d.idReplique}-${d.personnageReplique}-${$char.random(5)}`,
                                              insert:'p',
                                              content: `${d.texteReplique}`,
                                              attrs:{align:'dialog'}
                                              }
                              ]
                          },)
        }else{

                part1.content.push(
                          {
                              id:`replique-${d.idReplique}-${d.personnageReplique}-${$char.random(5)}`,
                              insert:'div',
                              content:[
                                  {
                                      id:`personnage-${d.idReplique}-${d.personnageReplique}-${$char.random(5)}`,
                                      insert:'h6',
                                      content:`${d.personnageReplique}`,
                                      attrs:{
                                          align:'center',
                                          bold:true,
                                      }
                                      
                                  },
                                  {
                                      id:`text_replique-${d.idReplique}-${d.personnageReplique}-${$char.random(5)}`,
                                      insert:'p',
                                      content:`${d.texteReplique}`,
                                      attrs:{
                                          align:'dialog'
                                      }
                                  }
                              ]
                          },)
        }


        })
        this.document.push(part1);
        i++;
        
      })
    },
    setDocValues(targetedID,value,selectedBlock){
      console.log(targetedID,value,selectedBlock)
      console.log(targetedID.split("-"))
      let targetedType=targetedID.split("-");
      if(targetedType[0]==="action"){
        console.log("action");
        console.log("value");
        console.log(value);

        //this.document[selectedBlock].content[1].content=value;
      }else if(targetedType[0]==="title"){
        console.log("title");
      }else if (targetedType[0]==="replique"){
        console.log("replique")
      }else if (targetedType[0]==="personnage"){
        console.log("personnage")
      }else if (targetedType[0]==="text_replique"){
        console.log("text_replique")
      }else if (targetedType[0]==="parenthese"){
        console.log("parenthese")
      }
    },
    enterNewElement(type){
      if(type==='action'||type==='dialog'){

      setTimeout(()=>{
          let dc=document.getElementById(`${this.targetedId}`)
       console.log("document for next sibling")
       console.log(dc)
       console.log("iwdheeeeeeeeed ar on keyEntered")
       let ranger=document.createRange();
      console.log("rangeEnter");
      console.log(ranger)
      let nxt=dc.nextElementSibling
      console.log("let nxt=dc.nextSibling")
      console.log(nxt)
      ranger.setStart(nxt,0)
      let selectedRange=document.getSelection();
      console.log("selectedRange")
      console.log(selectedRange)
       ranger.collapse(true)
      selectedRange.removeAllRanges()
      selectedRange.addRange(ranger)
          
       })
      }else if(type==='personnage') {
        setTimeout(()=>{
          let dc=document.getElementById(`${this.targetedId}`)
       console.log("document for next sibling")
       console.log(dc)
       console.log("iwdheeeeeeeeed ar on keyEntered")
       let ranger=document.createRange();
      console.log("rangeEnter");
      console.log(ranger)
      let nxt=dc.nextElementSibling
      console.log("let nxt=dc.nextSibling")
      console.log(nxt.childNodes[0])
      ranger.setStart(nxt.childNodes[0],0)
      let selectedRange=document.getSelection();
      console.log("selectedRange")
      console.log(selectedRange)
       ranger.collapse(true)
      selectedRange.removeAllRanges()
      selectedRange.addRange(ranger)
          
       })
      }else if( type==='parenthese'){
         setTimeout(()=>{
          let dc=document.getElementById(`${this.targetedId}`)
       console.log("document for next sibling")
       console.log(dc)
       console.log("iwdheeeeeeeeed ar on keyEntered")
       let ranger=document.createRange();
      console.log("rangeEnter");
      console.log(ranger)
      let nxt=dc.nextElementSibling
      console.log("let nxt=dc.nextSibling")
      console.log(nxt)
      ranger.setStart(nxt,0)
      let selectedRange=document.getSelection();
      console.log("selectedRange")
      console.log(selectedRange)
       ranger.collapse(true)
      selectedRange.removeAllRanges()
      selectedRange.addRange(ranger)
          
       })
      } else if(type==='dialog2personnage') {
        setTimeout(()=>{
          let dc=document.getElementById(`${this.targetedId}`)
       console.log("document for next sibling")
       console.log(dc)
       console.log("iwdheeeeeeeeed ar on keyEntered")
       let ranger=document.createRange();
      console.log("rangeEnter");
      console.log(ranger)
      let nxt=dc.parentNode.nextElementSibling
      console.log("let nxt=dc.nextSibling")
      console.log(nxt.childNodes[0])
      ranger.setStart(nxt.childNodes[0],0)
      let selectedRange=document.getSelection();
      console.log("selectedRange")
      console.log(selectedRange)
       ranger.collapse(true)
      selectedRange.removeAllRanges()
      selectedRange.addRange(ranger)
          
       })
      }

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
        renderArray.push(h(item.insert, { id: item.id, class: this.typeAttributes(item.attrs), indexofTheBlock:`${j}`, onClick:this.getTheIndex(j) }, this.renderNodes(item.content)))
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
              if(node.insert === 'div') {
                console.log("a")
                contentNode.push(h(node.insert, { id: node.id, class: [this.toggleAttributes(node.attrs),this.typeAttributes(node.attrs)],contenteditable: true ,onKeyDown: this.hi, index:`${i}`}, this.subNodes(node.content)))
              } else if(node.insert === 'h6') {
                console.log("a")
                contentNode.push(h(node.insert, { id: node.id, class: [this.toggleAttributes(node.attrs),this.typeAttributes(node.attrs)],contenteditable: true,onKeyDown: this.enterNewBlock, index:`${i}`}, this.subNodes(node.content)))
              } 
              else if(node.insert === 'p') {
                console.log("a")
                contentNode.push(h(node.insert, { id: node.id, class: [this.toggleAttributes(node.attrs),this.typeAttributes(node.attrs)],onKeyUp: this.enterNewBlock, index:`${i}`}, this.subNodes(node.content)))
              }
              else if(node.insert === 'a') {
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
        { 'dialog:text': this.checkAttribute(nodeAttrs, 'align', 'dialog') },
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
     getCustomModel() {
      console.log("getCustomModel")
      return  CustomModel()
    },
   
    setValue(ev){
      console.log("event key doooown")
      console.log(ev)
    },
    
    getTheIndex(j){
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      console.log(j);
    },
    hi(){
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    },
    findInTheDoc(id){
      //Array.prototype.forEach.call(parent.children,
      var n=0;
      //var replique=0;
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
      
    },
    docToScenes(){
      console.log("ikechmed ar la methoide doc to scnes")
      let doc=document.querySelector(".editor-content");
    console.log(doc)
    let tabsc=[];
    let tabrepl;
    let repere;
    let momentDeLaJournée;
    let lieu;
    let action;
    let personnageReplique;
    let texteReplique;
    let parentheseReplique;
      
      doc.childNodes.forEach(e=>{
      console.log("eeeeeeeeeeeeeeeeeeeeeeeee");
      tabrepl=[];
      console.log(e);
      e.childNodes.forEach(j=>{
        
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        console.log(j);
        let spl=j.id.split("-");
        if(spl[0]==="title"){
         let tab= j.innerText.split(" ")[1].split(".");
          repere=tab[0];
         momentDeLaJournée=tab[1];
          lieu=tab[2];
         console.log(tab)
         console.log("title")
        }
        if(spl[0]==="action"){
          action=j.innerText;
          console.log("action")
        }
        if(spl[0]==="replique"){
          console.log("replique")
          j.childNodes.forEach(c=>{
            let spl2=c.id.split("-");

            if(spl2[0]==="personnage"){
              console.log("personnage")
               personnageReplique=c.innerText
            }

            if(spl2[0]==="text_replique"){
              console.log("textreplique")
             texteReplique=c.innerText
            }

            if(spl2[0]==="parenthese"){
              console.log("parenthese")
              parentheseReplique=c.innerText
            }
          })
            tabrepl.push({idReplique:null,personnageReplique: personnageReplique,parentheseReplique: parentheseReplique,texteReplique: texteReplique,ordre:null},)
        }
       
      })
       console.log("sccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc")
    console.log({
           idScene:null,
           repere:`${repere}`,
           momentDeLaJournée:`${momentDeLaJournée}`,
           lieu:`${lieu}`,
           action:`${action}`,
           dialogue:[
               ...tabrepl
              
           ]

       })
       tabsc.push({
           idScene:null,
           repere:repere,
           momentDeLaJournée:momentDeLaJournée,
           lieu:lieu,
           action:action,
           dialogue:[
               ...tabrepl
              
           ]

       })
    
    })
    console.log("tabsc")
    console.log(tabsc)
    }

    
  }
}
</script>
