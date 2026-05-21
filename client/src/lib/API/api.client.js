// export default async function apiClient (path, options={}) {
//     try {
//         const {headers: headersOpt, ...resOptions} = options;

//         const hasBody = options.body !== undefined;

//         const response = await fetch(path, {
//             ...resOptions,
//             credentials: "include",
//             headers: {
//                 ...(hasBody && {'Content-Type': 'application/json;charset=utf-8'}),
//                 ...headersOpt, // all headers 
//             },        
//         });

//         if (!response.ok) {
//             throw new Error("Response status:", response.status);
//         }

//         const result = await response.json();
//         return result; 
//     } catch (err) {
//         if (err.name !== "AbortError") {
//             console.error('res error:', err.message || err);
//         }
//         throw err;
//     }
// }

export class ApiError extends Error {
    constructor (code, error) {
        super(code);
        this.erData = error;
    }
}



export default async function apiClient (path, options={}) {
    try {
        const {headers: headersOpt, ...resOptions} = options;

        const hasBody = options.body !== undefined;

        const response = await fetch(path, {
            ...resOptions,
            credentials: "include",
            headers: {
                ...(hasBody && {'Content-Type': 'application/json;charset=utf-8'}),
                ...headersOpt, // all headers 
            },        
        });

        if (!response.ok) {
            const errorVal = await response.json().catch(() => ({}));

            throw ApiError(response.status, errorVal);
        }

        const result = await response.json();
        return result; 
    } catch (err) {
        if (err.name !== "AbortError") {
            console.error('res error:', err.message || err);
        }
        throw err;
    }
}
