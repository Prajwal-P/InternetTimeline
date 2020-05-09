let isAuthed = false;
let email = '';
let first_name = '';

function signin(email, password, callback){
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
					isAuthed = true;
					email = data.email;
					first_name = data.first_name;
					// alert(`Logged in successfully`);
				} else {
					alert(res.message);
					isAuthed = false;
					email = '';
					first_name = '';
				}
				console.log(email);
				// console.log(first_name);
				callback(isAuthed)
			}
		)
		.catch(error => console.log('Error', error));
}

function signout(){
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	console.log(email);
	
	fetch(`http://localhost:8888/route/signout?email=${email}`, requestOptions)
		.then(result => result.json())
		.then(
			res => {
				if(res.status === 200){
					isAuthed = false
					email = ''
					first_name = ''
				}
				console.log(`*****${isAuthed}*****`);
			}
		)
		.catch(error => console.log('error', error));
}

export {isAuthed, email, first_name, signin, signout}