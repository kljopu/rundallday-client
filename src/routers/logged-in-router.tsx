import React from "react"
import { gql, useQuery } from "@apollo/client"
import { isLoggedInVar } from "src/appolo"
import { getMyProfileQuery } from "src/__generated__/getMyProfileQuery";

// const GET_PROFILE_MUTATION = gql`
//     mutation getMyProfile{
//         getMyProfile {
//             user{
//                 id,
//                 email,
//                 name
//             }
//         }
//     }
// `
const GET_PROFILE_QUERY = gql`
    query getMyProfileQuery{
        getMyProfile{
            id,
            email,
            name
        }
    }
`

export const LoggedInRouter = () => {
    const { data, loading, error } = useQuery<getMyProfileQuery>(GET_PROFILE_QUERY)
    console.log(data);
    if (loading || error || !data) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-2xl tracking-wide">Loading ...</span>
            </div>
        );
    };
    return (
        <div className="">
            <h1>{data.getMyProfile.email}</h1>
        </div>
    );
};