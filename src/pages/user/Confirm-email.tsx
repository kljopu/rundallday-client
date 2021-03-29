import React, { useEffect } from "react";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables,
} from "src/__generated__/verifyEmail";
import { useLocation } from "react-router-dom";
import { useMe } from "src/hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.getMyProfile.id) {
      client.writeFragment({
        id: `User:${userData.getMyProfile.id}`,
        fragment: gql`
          fragment verifyEmail on User {
            isVerified
          }
        `,
        data: {
          isVerified: true,
        },
      });
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );
  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="mt-52 flex flex-col items-center justify-items-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page.
      </h4>
    </div>
  );
};
