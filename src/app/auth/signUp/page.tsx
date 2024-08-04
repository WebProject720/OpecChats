'use client'
import React from "react";
import Layout from "../../../components/appCom/layout";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/authZOD";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
    FormDescription
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";


export default function SignUp() {
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            email: ''
        },
        resolver: zodResolver(signUpSchema)
    });
    return (
        <Layout>
            <section className="min-w-full min-h-full flex justify-center items-center flex-col gap-6">
                <div>
                    <h1 className="text-center font-bold">
                        Sign up
                    </h1>
                </div>
                <Form {...form}>
                    <form action="">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit"
                            className="mt-3"
                        >Sign Up</Button>
                    </form>
                </Form>
            </section>
        </Layout>
    )
}