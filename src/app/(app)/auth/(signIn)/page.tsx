'use client'
import React from "react";
import { signIn } from "next-auth/react";
import Layout from "../AuthLayout";

export default function SignUp() {
    return (
        <Layout>
            <div>
                <p>
                    Sign In page
                </p>
            </div>
            <div>
                <div>
                    <button className="p-2 bg-gray-200 rounded" onClick={() => signIn('google')}>Continue with Google</button>
                </div>
            </div>
        </Layout>
    )
}