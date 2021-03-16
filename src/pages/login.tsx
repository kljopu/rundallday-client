import React from "react"
import { Helmet } from "react-helmet-async"
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form"
import { FormError } from "src/Components/form-error";
import {
    loginMutation,
    loginMutationVariables
} from "src/__generated__/loginMutation";
import rundayLogo from "../images/runday_logo.svg"
import { Button } from "src/Components/button";
import { Link } from "react-router-dom";
import { isLoggedInVar, authTokenVar } from "src/appolo";
import { LOCALSTORAGE_ACCESS_TOKEN } from "src/constants";

const LOGIN_MUTATION = gql`
    mutation loginMutation($authLoginInput: AuthLoginInput!) {
        login(input: $authLoginInput) {
            ok
            access_token
            error
        }
    }
`

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({
        mode: "onChange"
    })
    const onCompleted = (data: loginMutation) => {
        const {
            login: { error, ok, access_token }
        } = data;
        if (ok && access_token) {
            localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, access_token)
            authTokenVar(access_token)
            isLoggedInVar(true)
        }
    }
    // const onError = (error: ApolloError) => {}
    const [loginMutation, { data: loginMutationResult, loading, error }] = useMutation<
        loginMutation,
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
    })
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    authLoginInput: {
                        email,
                        password
                    }
                }
            })
        }
    }
    return (
        <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
            <Helmet>
                <title>Login | RunAllDay</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <img src={rundayLogo} className="w-60 mb-5" />
                <h4 className="w-full font-light text-left text-2xl mb-5 text-black">Wellcome Back</h4>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 w-full mb-3">
                    <input
                        ref={register({
                            required: "Email required",
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        placeholder="Email"
                        name="email"
                        className="login-input"
                    />
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    <input
                        ref={register({ required: "Password required", minLength: 10 })}
                        placeholder="Password"
                        name="password"
                        type="password"
                        className="login-input" />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    {errors.password?.type === "minLength" && (
                        <FormError errorMessage="Password must be more then 10 chars." />
                    )}
                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText={"Log In"} />
                    {loginMutationResult?.login.error && (
                        <FormError errorMessage={loginMutationResult.login.error} />
                    )}
                </form>
                <div>
                    New to RunAllDay?&nbsp;
                    <Link to="/create-account"
                        className="text-lime-600 hover:underline">
                        Create an Account.
                    </Link>
                </div>
            </div>
        </div >
    );
};