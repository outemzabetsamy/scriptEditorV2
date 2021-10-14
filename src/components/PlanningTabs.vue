<template>
 <div>
   
        <DataTable :value="preprod" v-model:expandedRows="expandedRows" dataKey="id"
           responsiveLayout="scroll">
           <template #header>
               <!-- <div class="preprod p-grid p-ai-center vertical-container p-jc-start"  >
           
            <div class="p-col" style="width:"> <i class="pi pi-angle-right" style="fontSize: 2rem"></i></div>
            <div  class="p-col">  <strong>PRE PRODUCTION</strong></div>
            <div  class="p-col">  </div>
             </div>
             
             -->
             <span class="preprod"> <i class="pi pi-angle-right"></i> <strong>PRE PRODUCTION</strong> </span></template>
             <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
              
            <Column field="preProduction" header="Pre production" ></Column>
            
            <Column field="assigne" header="Assigné a" sortable>
                
            </Column>
            <Column field="date" header="Date" sortable></Column>
             <Column field="jours" header="Jours" sortable></Column>
            <Column field="status" header="Statut" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
                </template>
            </Column>
            <Column field="avancement" header="avancement">
            <template #body="slotProps"> 
              <ProgressBar  :value="`${slotProps.data.avancement}`">
               {{slotProps.data.avancement}}%
              </ProgressBar>

            </template>
            </Column>

            <Column field="validation" header="validation" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
                </template>
            </Column>
            <template #footer> 
              <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
              
            </template>
        </DataTable>
        <!-------------PROOOOOOODUCTION----->
        <DataTable :value="preprod" v-model:expandedRows="expandedRows" dataKey="id"
           responsiveLayout="scroll">
           <template #header><span class="prod"> <i class="pi pi-angle-right"></i> <strong>PRODUCTION</strong> </span></template>
             <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
              
            <Column field="production" header="Production" ></Column>
            
            <Column field="assigne" header="Assigné a" sortable>
                
            </Column>
            <Column field="date" header="Date" sortable></Column>
             <Column field="jours" header="Jours" sortable></Column>
            <Column field="status" header="Statut" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
                </template>
            </Column>
            <Column field="avancement" header="avancement">
            <template #body="slotProps"> 
              <ProgressBar  :value="`${slotProps.data.avancement}`">
               {{slotProps.data.avancement}}%
              </ProgressBar>

            </template>
            </Column>

            <Column field="validation" header="validation" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
                </template>
            </Column>
            <template #footer> 
              <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
              
            </template>
        </DataTable>
        <!-------POOOOOOOOOOSTPROOOOOOOOOOOOOOOOOOOOOOOOD--->
        <DataTable :value="preprod" v-model:expandedRows="expandedRows" dataKey="id"
           responsiveLayout="scroll">
           <template #header><span class="postprod"><i class="pi pi-angle-right"></i> <strong>POST PRODUCTION</strong> </span></template>
             <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
              
            <Column field="postProduction" header="Post production" ></Column>
            
            <Column field="assigne" header="Assigné a" sortable>
                
            </Column>
            <Column field="date" header="Date" sortable></Column>
             <Column field="jours" header="Jours" sortable></Column>
            <Column field="status" header="Statut" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
                </template>
            </Column>
            <Column field="avancement" header="avancement">
            <template #body="slotProps"> 
              <ProgressBar  :value="`${slotProps.data.avancement}`">
               {{slotProps.data.avancement}}%
              </ProgressBar>

            </template>
            </Column>

            <Column field="validation" header="validation" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
                </template>
            </Column>
            <template #footer> 
              <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
              
            </template>
        </DataTable>
	</div>
 
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      expandedRows: [] ,
      value:50,
      products: [
        {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5,"orders": [{"id": "1000","productCode": "f230fh0g3","date": "2020-09-13","amount": 65,"quantity": 1,"customer": "David James","status": "PENDING"},{"id": "1001","productCode": "f230fh0g3","date": "2020-05-14","amount": 130,"quantity": 2,"customer": "Leon Rodrigues","status": "DELIVERED"},{"id": "1002","productCode": "f230fh0g3","date": "2019-01-04","amount": 65,"quantity": 1,"customer": "Juan Alejandro","status": "RETURNED"},{"id": "1003","productCode": "f230fh0g3","date": "2020-09-13","amount": 195,"quantity": 3,"customer": "Claire Morrow","status": "CANCELLED"}]},
        {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4,"orders": [{"id": "2000","productCode": "nvklal433","date": "2020-05-14","amount": 72,"quantity": 1,"customer": "Maisha Jefferson","status": "DELIVERED"},{"id": "2001","productCode": "nvklal433","date": "2020-02-28","amount": 144,"quantity": 2,"customer": "Octavia Murillo","status": "PENDING"}]},
        {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3,"orders": [{"id": "3000","productCode": "zz21cz3c1","date": "2020-07-05","amount": 79,"quantity": 1,"customer": "Stacey Leja","status": "DELIVERED"},{"id": "3001","productCode": "zz21cz3c1","date": "2020-02-06","amount": 79,"quantity": 1,"customer": "Ashley Wickens","status": "DELIVERED"}]},
        {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5,"orders": []},
        {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4,"orders": [{"id": "5000","productCode": "h456wer53","date": "2020-09-05","amount": 60,"quantity": 4,"customer": "Mayumi Misaki","status": "PENDING"},{"id": "5001","productCode": "h456wer53","date": "2019-04-16","amount": 2,"quantity": 30,"customer": "Francesco Salvatore","status": "DELIVERED"}]},
        {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4,"orders": [{"id": "6000","productCode": "av2231fwg","date": "2020-01-25","amount": 120,"quantity": 1,"customer": "Isabel Sinclair","status": "RETURNED"},{"id": "6001","productCode": "av2231fwg","date": "2019-03-12","amount": 240,"quantity": 2,"customer": "Lionel Clifford","status": "DELIVERED"},{"id": "6002","productCode": "av2231fwg","date": "2019-05-05","amount": 120,"quantity": 1,"customer": "Cody Chavez","status": "DELIVERED"}]},
        {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3,"orders": [{"id": "7000","productCode": "bib36pfvm","date": "2020-02-24","amount": 32,"quantity": 1,"customer": "Arvin Darci","status": "DELIVERED"},{"id": "7001","productCode": "bib36pfvm","date": "2020-01-14","amount": 64,"quantity": 2,"customer": "Izzy Jones","status": "PENDING"}]},
        {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5,"orders": [{"id": "8000","productCode": "mbvjkgip5","date": "2020-06-19","amount": 34,"quantity": 1,"customer": "Jennifer Smith","status": "DELIVERED"}]},
        {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4,"orders": [{"id": "9000","productCode": "vbb124btr","date": "2020-01-05","amount": 99,"quantity": 1,"customer": "Jeanfrancois David","status": "DELIVERED"},{"id": "9001","productCode": "vbb124btr","date": "2020-01-19","amount": 198,"quantity": 2,"customer": "Ivar Greenwood","status": "RETURNED"}]},
        {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3,"orders": [{"id": "10000","productCode": "cm230f032","date": "2020-06-24","amount": 299,"quantity": 1,"customer": "Kadeem Mujtaba","status": "PENDING"},{"id": "10001","productCode": "cm230f032","date": "2020-05-11","amount": 299,"quantity": 1,"customer": "Ashley Wickens","status": "DELIVERED"},{"id": "10002","productCode": "cm230f032","date": "2019-02-07","amount": 299,"quantity": 1,"customer": "Julie Johnson","status": "DELIVERED"},{"id": "10003","productCode": "cm230f032","date": "2020-04-26","amount": 299,"quantity": 1,"customer": "Tony Costa","status": "CANCELLED"}]}
    ],
    preprod:[
      {preProduction:"redaction script",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
       {preProduction:"validation script",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
        {preProduction:"processus de depouillement",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
    ],
     prod:[
      {preProduction:"redaction script",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
       {preProduction:"validation script",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
        {preProduction:"processus de depouillement",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
    ],
     postProd:[
      {preProduction:"redaction script",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
       {preProduction:"validation script",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
        {preProduction:"processus de depouillement",assigne:"Samir Chemer",date:"09-09-2021",jours:5,status:"LOWSTOCK",validation: "LOWSTOCK",avancement:30},
    ],
    }
  },
  methods:{
     onRowExpand(event) {
            this.$toast.add({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
        },
        onRowCollapse(event) {
            this.$toast.add({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
        },
        expandAll() {
            this.expandedRows = this.products.filter(p => p.id);
            this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
        },
        collapseAll() {
            this.expandedRows = null;
            this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
        },
  }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
.preprod {
 
  color: rgba(231, 102, 231, 0.712);
}
.prod {
   color: rgb(173, 74, 173);
}
.postprod {
   color: rgb(53, 148, 89);
}
</style>                