import {
    ApolloClient,
    InMemoryCache,
    makeVar,
    createHttpLink,
    // split
} from "@apollo/client"
import { LOCALSTORAGE_ACCESS_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context"
// import { WebSocketLink } from "@apollo/client/link/ws"
// import { getMainDefinition } from "@apollo/client/utilities"

const token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
// const wsLink = new WebSocketLink({
//     uri:
//         process.env.NODE_ENV === "production"
//             ? "ws://localhost:4000/graphql"
//             : "ws://localhost:4000/graphql",
//     options: {
//         reconnect: true,
//         connectionParams: {
//             "authentication": authTokenVar() || ""
//         }
//     }
// })

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === "production"
            ? "http://localhost:4000/graphql"
            : "http://localhost:4000/graphql"
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "authorization": `Bearer ${authTokenVar()}` || ""
        },
    }
})

// const splitLink = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query)
//         return (
//             definition.kind === "OperationDefinition" &&
//             definition.operation === "subscription"
//         )
//     },
//     wsLink,
//     authLink.concat(httpLink)
// )

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar()
                        }
                    },
                    access_token: {
                        read() {
                            return authTokenVar()
                        }
                    }
                }
            }
        }
    })
})


// export default client