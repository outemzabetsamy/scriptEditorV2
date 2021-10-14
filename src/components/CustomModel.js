export default async function(){
    return [
       {
           idScene:1,
           repere:'INT',
           momentDeLaJournée:'MATIN',
           lieu:'HOPITAL',
           action:'JAQUES Rentre dans un grand hall d hopital et rencontre une infirmiere',
           dialogue:[
               {idReplique:1,personnageReplique:'INFIRMIERE',parentheseReplique:null,texteReplique:'Salut!',ordre:1},
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

    }
    ]
}