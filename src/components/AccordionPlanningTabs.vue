<template>
  <div>
      <Accordion :multiple="true">
	<AccordionTab>
        <template #header>
            <span class="preprod"> <strong>PRE PRODUCTION</strong> </span>
        </template>
		<DataTable :value="preprod" v-model:expandedRows="expandedRows" dataKey="id"
           responsiveLayout="scroll">
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
	</AccordionTab>
	<AccordionTab>
        <template #header>
            <span class="prod"> <strong>PRODUCTION</strong> </span>
        </template>
		<DataTable :value="preprod" v-model:expandedRows="expandedRows" dataKey="id"
           responsiveLayout="scroll">
           
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

	</AccordionTab>
	<AccordionTab >
        <template #header>
            <span class="postprod"><strong>POST PRODUCTION</strong> </span>
        </template>
		<DataTable :value="preprod" v-model:expandedRows="expandedRows" dataKey="id"
           responsiveLayout="scroll">
           
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
	</AccordionTab>
</Accordion>
  </div>
</template>

<script>
export default {
    name:"AccordionPlanningTabs",
data(){
    return {
        cl:"preprod",
      expandedRows: [] ,
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
.pi-chevron-right {
    color:red;
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