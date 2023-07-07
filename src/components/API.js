const url = "http://35.154.233.185:8000";

export class API {

        static Login(accountName, password, accountType)
        {
            return fetch(`${url}/user/login`,{
                method:"POST",
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: `${accountName}`,
                    password: `${password}`,
                    accountType: `${accountType}`,
                  })
            }).then(resp => resp.json())
            .catch(error => console.log(error));
        }
}