class Github {
    constructor() {
        this.client_id = 'd760b1fd6a4973000810';
        this.client_secret = '3c9ac7343e6e167e4bda6c59d373b7168061e6a0'; 
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
   }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json(); // profileData
        const repos = await repoResponse.json();
        return {
            profile,
            repos
        }
    }
}