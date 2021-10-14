export default async function(){
    return [
        {
            id:'block-1-FdsvfdULHNH',
            insert:'div',
            content: [
              {
                id:'title',
                insert:'h6',
                content:'INT.DAY.HOPITAL',
                attrs:{
                    align:'left',
                    bold:true}
                
              },
              {
                  id:'action',
                  insert:'p',
                  content:'JAQUES Rentre dans un grand hall d hopital et rencontre une infirmiere',
                  attrs:{align:'left'}
              },
              {
                  id:'replique-1',
                  insert:'div',
                  content:[
                      {
                          id:'personnage-1r1',
                          insert:'h6',
                          content:'INFIRMIERE',
                          attrs:{
                              align:'center',
                              bold:true,
                          }
                          
                      },
                      {
                          id:'replique-1p1',
                          insert:'p',
                          content:'SALUT!',
                          attrs:{
                              align:'center'
                          }
                      }
                  ]
              },
              {
                id:'replique-2',
                insert:'div',
                content:[
                    {
                        id:'personnage-2r1',
                        insert:'h6',
                        content:'JAQUES',
                        attrs:{
                            align:'center',
                            bold:true,
                        }
                        
                    },
                    {
                        id:'replique-1p1',
                        insert:'p',
                        content:[
                            {id:'parenthese-2pr1',
                            insert:'h6',
                            content:'(En souriant)',
                            attrs:{align:'center'},
                        },
                        {
                            id:'repli',
                            insert:'p',
                            content:'Saluut!',
                            attrs:{align:'center'}
                        }
                        ],
                        attrs:{
                            align:'center'
                        }
                    }
                ]
            },

            ],
            attrs: {
                align: 'left'
            }
        },
       
    ]
}