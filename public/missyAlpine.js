
document.addEventListener('alpine:init', () => {
    Alpine.data('container', () => ({
        garments: [],
        genderFilter: '',
        seasonFilter: '',
        maxPrice: 0,
        addGarment: {
            description: "",
            price: 0,
            img: "",
            season: "",
            gender: "",
        },
        id: {  
            garment: "",
        },
        success_message : '',
        error : false,
        

        init() {
            this.filterData()
        },
        filterData() {

            fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
                .then(r => r.json())
                .then(userData => {
                    console.log(userData);
                    this.garments = userData.data

                }).catch(err => console.log(err))
        },
        filterPrice() {
            console.log(this.maxPrice);
            fetch(`/api/garments/${this.maxPrice}`)
                .then(r => r.json())
                .then(userData => {
                    console.log(userData);
                    this.garments = userData.data
                }).catch(err => console.log(err))

        },
        insertGarment() {
                console.log(this.addGarment);
                axios
                    .post(`/api/garment`, this.addGarment)
                    .then(r => this.filterData())
                    .then(()=>{
                        this.success_message = 'Garment has been added successfully!'
                            this.error = false
                    })
                    .catch(err => console.log(err))
                    setTimeout(() =>  { 
                    this.success_message = '';
                    this.error = false;
                }, 3000);
        },
        deleteGarments(id){
            console.log(id);
            axios
                .delete(`/api/garments/${id}`)
                .then(r => this.filterData())
                .then(()=> {
                    this.success_message = 'Garment has been deleted successfully!';
                    this.error = false;
                })
                .catch(err => console.log(err))
                setTimeout(() =>  { 
                this.success_message = '';
                this.error = false;
              }, 3000);
        }
    }));
})

