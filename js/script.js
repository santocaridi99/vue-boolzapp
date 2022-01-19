new Vue({
    el:"#app",
    data:{
        // setto un current index a 0
        currentIndex:0,
        timer:0,
        // array di oggetti contenenti dati degli utenti
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        // inizializzo un messaggio temporaneo vuoto
        // con status sent perchè è quello che inviamo
        temporaryMessage:{
                date:'',
                text:'',
                status:'sent'
        },
        // inizializzo i messaggi dei bot
        aiAnswers:{
            date:'',
            text:'Ok!',
            status:'received'
        },
        // inizializzo un testo temporaneo per la barra di ricerca 
        temporaryText:'',

            
            
    },
    // qui aggiungo tutti i miei metodi
    methods:{
        // metodo per selezionare la chat 
        // ovvero quando la chiamo il currentIndex si sposta nell'indice selezionato
        selectChat:function(index){
            this.currentIndex=index;
        },
        // metodo per inviare un messaggio 
        // dove il messaggio temporaneo creato sopra che viene modificato dal v-model in input
        // viene pushato nell'array di messages presenti in contacts nell' indice corrente
        // una volta pushato viene  resettato
        sendMessage:function(index){
            this.contacts[index].messages.push(this.temporaryMessage);
            this.temporaryMessage={
                date:'',
                text:'',
                status:'sent'
            }  
            // aggiunto risposta 
            // ad ogni messaggio che invio dopo due secondi c'è un setTimeout
            //che pusherà il messaggio mandato dai bot
            let t=this;
            this.timer=setTimeout(function() {
                t.contacts[index].messages.push(t.aiAnswers);
            }, 2000);

        }

    },
    // una proprietà computed serve a descrivere un valore che dipende da un altro valore
    computed:{
        //funzione filter che crea  ritorna un nuovo oggetto filtrato per nome 
        //uso metodo match per conftontare i due testi 
        filteredNames:function(){
            return this.contacts.filter((obj)=>{
                return obj.name.toLowerCase().match(this.temporaryText.toLowerCase())
            });
        }

    }
})