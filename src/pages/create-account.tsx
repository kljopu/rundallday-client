import React from "react"
import { Helmet } from "react-helmet-async"
import rundayLogo from "../images/runday_logo.svg"
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form"
import { FormError } from "src/Components/form-error";
import { Button } from "src/Components/button";
import { Link, useHistory } from "react-router-dom";
import { createUserMutation, createUserMutationVariables } from "src/__generated__/createUserMutation";

const CREAT_USER_MUTATION = gql`
    mutation createUserMutation($createUserInput: CreateUserInput!) {
        createUser(input: $createUserInput) {
            ok
            error
        }
    }
`

interface ICreateUserForm {
    email: string;
    password: string;
    name: string;
    profileImage: string | null;
}

export const CreateAccount = () => {
    const { register,
        getValues,
        errors,
        handleSubmit,
        formState,
    } = useForm<ICreateUserForm>({
        mode: "onChange"
    })
    const history = useHistory()
    const onCompleted = (data: createUserMutation) => {
        const { createUser: { ok, } } = data;
        if (ok) {
            // redirect to login
            alert("Account Created! Log in now!")
            history.push("/login")
        }
    }
    const [createUserMutation, { loading, data: createUserMutationResult }] = useMutation<
        createUserMutation,
        createUserMutationVariables
    >(
        CREAT_USER_MUTATION, {
        onCompleted
    })
    const onSubmit = () => {
        if (!loading) {
            const { email, password, name } = getValues();
            createUserMutation({
                variables: {
                    createUserInput: {
                        email,
                        password,
                        name
                    }
                }
            })
        }
    }
    return (
        <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
            <Helmet>
                <title>Create Account | RunAllDay</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <img src={rundayLogo} className="w-60 mb-5" />
                <h4 className="w-full font-light text-left text-2xl mb-5 text-black">
                    Let's get started
                </h4>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 w-full mb-3">
                    <input
                        ref={register({
                            required: "Name required",
                        })}
                        placeholder="Name"
                        name="name"
                        className="login-input" />
                    {errors.name?.message && (
                        <FormError errorMessage={errors.name?.message} />
                    )}
                    <input
                        ref={register({
                            required: "Email required",
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        placeholder="Email"
                        name="email"
                        className="login-input" />
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    {errors.email?.type === "pattern" && (
                        <FormError errorMessage={"Please enter a valid email"} />
                    )}
                    <input
                        ref={register({ required: "Password required" })}
                        required
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
                        actionText={"Create Account"} />
                    {createUserMutationResult?.createUser.error && (
                        <FormError
                            errorMessage={createUserMutationResult.createUser.error}
                        />
                    )}
                </form>
                <div>
                    Already have an account?&nbsp;
                    <Link to="/login"
                        className="text-lime-600 hover:underline">
                        Log in Now.
                    </Link>
                </div>
            </div>
        </div >
    );
};