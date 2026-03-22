// export default async function apiClient () {
// const response = await fetch("/api/use");

// if (response.ok) {
//     let json = await response.json();
//     console.log(json);
// } else {
//     console.log("res error", response.status);
// }
// }


export default async function apiClient () {
    try {
        const response = await fetch('/api/use');
        
        if (!response.ok) {
            throw new Error('Responce status:', response.status);
        }

        const result = await response.json();
        console.log(result); 

    } catch (error) {
        console.log(error);
    } finally {
        console.log('API connected', result);
    }


    try {

        const response = await fetch('api/use', {
            method: 'POST',
            // body: {

            // }
            body: JSON.stringify({
                title: 'foo',
                body: 'lskjf',
                userId: 1,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        if (!response.ok) {
            throw new Error(response.status);
        }

        const result = response.json();

    } catch (err) {
        console.log(err)
    }
}

const promise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    if (success) {
        resolve('succes');
    } else {
        reject('failed');
    }
})

    