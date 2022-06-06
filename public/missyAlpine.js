document.addEventListener('alpine:init', () => {
    Alpine.data('container', () => ({
        garments: [],
        open: false,
        username: null,
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
        token: null,
        login_message:'',
        success_message: '',
        error: false,


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
                .then(() => {
                    this.success_message = 'Garment has been added successfully!'
                    this.error = false
                })
                .catch(err => console.log(err))
            setTimeout(() => {
                this.success_message = '';
                this.error = false;
            }, 3000);
        },
        deleteGarments(id) {
            console.log(id);
            axios
                .delete(`/api/garments/${id}`)
                .then(r => this.filterData())
                .then(() => {
                    this.success_message = 'Garment has been deleted successfully!';
                    this.error = false;
                })
                .catch(err => console.log(err))
            setTimeout(() => {
                this.success_message = '';
                this.error = false;
            }, 3000);
        },
        checkToken() {
            alert('logs in')
            axios
            .post(`/api/login`, this.username)
            alert('logs in')
            .then(this.username === this.username)
            alert('logs in')
            .then(() => {
                this.login_message = 'Logged In!!!';
                this.open = true;
            })
            
            .catch(err => console.log(err))
        },
        generatedJwt(){
            const username = this.username
            fetch(`/api/login`,{username})
            .then(userData => {
                console.log(userData);
                var {accessToken} = userData.data
                this.parseJwt()
                this.token = setTimeout(() => {
                    JSON.stringify(this.parseJwt(accessToken))
                }, 2000);
                console.log(accessToken);
            }).catch(err => console.log(err))
        },
        parseJwt: (accessToken) => {
            try {
                return JSON.parse(atob(accessToken.split('.')[1]));
            } catch (e) {
                return null;
            }
        },
    }));
})

