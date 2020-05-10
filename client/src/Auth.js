class Auth {
	constructor(){
		this.isAuthed = false;
		this.email = '';
		this.first_name = '';
	}

	signin(email, password, callback){
		var data = new FormData();
		data.append("email", email);
		data.append("password", password);
	
		var requestOptions = {
			method: 'POST',
			mode: 'cors',
			body: data
		};
	
		fetch("http://localhost:8888/route/signin", requestOptions)
			.then(result => result.json())
			.then(
				res => {
					// console.log(res);
					if (res.status === 200) {
						var data = res.data;
						// console.log(data);
						this.isAuthed = true;
						this.email = data.email;
						this.first_name = data.first_name;
						// alert(`Logged in successfully`);
					} else {
						alert(res.message);
						this.isAuthed = false;
						this.email = '';
						this.first_name = '';
					}
					// console.log(this.email);
					// console.log(first_name);
					callback(this.isAuthed)
				}
			)
			.catch(error => console.log('Error', error));
	}

	signout() {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		console.log(this.email);

		fetch(`http://localhost:8888/route/signout?email=${this.email}`, requestOptions)
			.then(result => result.json())
			.then(
				res => {
					if (res.status === 200) {
						this.isAuthed = false
						this.email = ''
						this.first_name = ''
					}
					// console.log(`*****${this.isAuthed}*****`);
				}
			)
			.catch(error => console.log('error', error));
	}
}

let user = new Auth();

export { user };