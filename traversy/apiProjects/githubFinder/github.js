class Github {
    constructor() {
        this.client_id = 'd760b1fd6a4973000810';
        this.client_secret = '3c9ac7343e6e167e4bda6c59d373b7168061e6a0';        
   }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();
        return {
            // profile: profile
            profile 
        }
    }
}