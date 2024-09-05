const { createApp } = Vue;

createApp({
    data() {
        return {
            searchTerm: '',
            newMessage: '',
            contacts: [
                { 
                    id: 1, 
                    name: 'Michele', 
                    image: './img/avatar_1.jpg',
                    messages: [
                        { text: 'Hai portato a spasso il cane?', time: '15:30', from: 'user' },
                        { text: 'Ricordati di stendere i panni', time: '15:50', from: 'user' },
                        { text: 'Tutto fatto!', time: '16:15', from: 'contact' }
                    ]
                },
                { id: 2, name: 'Fabio', image: './img/avatar_2.jpg', messages: [] },
                { id: 3, name: 'Samuele', image: './img/avatar_3.jpg', messages: [] },
                { id: 4, name: 'Alessandro B.', image: './img/avatar_4.jpg', messages: [] },
                { id: 5, name: 'Alessandro L.', image: './img/avatar_5.jpg', messages: [] },
                { id: 6, name: 'Claudia', image: './img/avatar_6.jpg', messages: [] },
                { id: 7, name: 'Federico', image: './img/avatar_7.jpg', messages: [] },
                { id: 8, name: 'Davide', image: './img/avatar_8.jpg', messages: [] }
            ],
            currentContact: null,
        };
    },
    computed: {
        filteredContacts() {
            return this.contacts.filter(contact => 
                contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
        currentMessages() {
            if (this.currentContact) {
                return this.currentContact.messages;
            }
            return [];
        }
    },
    methods: {
        selectContact(contact) {
            this.currentContact = contact;
        },
        sendMessage() {
            if (this.newMessage.trim() === '' || !this.currentContact) return;

            const message = {
                text: this.newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                from: 'user'
            };

            this.currentContact.messages.push(message);
            this.newMessage = '';

            setTimeout(() => {
                const autoReply = {
                    text: 'ok',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    from: 'contact'
                };
                this.currentContact.messages.push(autoReply);
            }, 1000);
        },
        messageClass(message) {
            return message.from === 'user' ? 'user-message' : 'contact-message';
        }
    }
}).mount('#app');
