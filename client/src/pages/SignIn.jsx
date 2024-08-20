export default function SignIn() {
    return (
        <>
            <div className="mt-10">
                <div className="w-full max-w-md mx-auto border p-4 rounded-md">
                    <div className="space-y-1 mb-10">
                        <h1 className="text-2xl font-bold">
                            Sign In
                        </h1>
                        <p className="text-sm text-zinc-500">
                            Enter your email and password to access your notes
                        </p>
                    </div>
                    <div className="mb-8">
                        <form className="">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="" className="text-sm font-semibold leading-none inline-block cursor-pointer">
                                        Email
                                    </label>
                                    <input type="email" className="w-full p-2 border border-zinc-300 rounded-md" />

                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>


        </>
    )
}
