'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){
    const router = useRouter();
    const [form, setForm] = useState<{username: string, password: string}>({
        username: "",
        password: ""
    });
    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const res = await signIn('SignUp', {
            redirect: false,
            username: form.username,
            password: form.password
        })
        // if(!res?.ok)
        //     throw new Error("Unknown error!");      
        router.replace('/')
    }
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Make an account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type your username..."
                            required
                            onChange={(e) => setForm(prev => ({...prev, username: e.target.value}))}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            placeholder="Type your password..."
                            onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
                        />
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                        <Link className='mt-4 text-blue-500 hover:text-blue-600' href='/login'>
                            Already a member? Login here!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}