import { gql, useQuery } from "@apollo/client";
import { getMyProfileQuery } from "src/__generated__/getMyProfileQuery";

const GET_PROFILE_QUERY = gql`
  query getMyProfileQuery {
    getMyProfile {
      id
      email
      name
      isVerified
    }
  }
`;

export const useMe = () => {
  return useQuery<getMyProfileQuery>(GET_PROFILE_QUERY);
};
