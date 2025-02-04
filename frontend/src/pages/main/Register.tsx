import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/user/authApi";
import { TResponse } from "@/interface/globalInterface";

export default function Register() {
  window.scroll(0, 0);
  const [errorMessage, setErrorMessage] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const re_password = form.get("re_password") as string;

    if (password.length < 8) {
      return setErrorMessage("Password must be 8 character");
    } else if (password !== re_password) {
      return setErrorMessage("Password not match");
    } else {
      setErrorMessage("");
    }

    const userInfo = {
      name,
      email,
      password,
    };

    const res = (await register(userInfo)) as TResponse;

    if (res?.data?.success) {
      toast.success("Register successful, Please login to continue");
      setErrorMessage("");
      navigate("/login");
    }
    if (res?.error) {
      setErrorMessage(res?.error?.data?.message);
      toast.error(res?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-6 bg-gray-50">
      <div className="container">
        <div className="sm:w-[420px] mx-auto">
          <h6 className="text-xl font-medium mt-2 text-center text-neutral">
            Signup
          </h6>

          <form onSubmit={handleRegister} className="mt-10 text-neutral">
            <div>
              <div className="mb-3 relative">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name *"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3 relative">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              {/* Password */}
              <div className="mb-3 relative">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password *"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              {/* RePassword */}
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Re Password
                </label>
                <input
                  name="re_password"
                  type="password"
                  placeholder="Re-Password *"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
            )}

            <div className="flex flex-col w-full border-opacity-50">
              <button
                type="submit"
                className="w-full py-2 font-semibold text-base-100 bg-primary rounded hover:bg-opacity-90 duration-300 flex justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Create my account"}
              </button>
            </div>
          </form>

          <div className="border-t border-neutral/20 mt-6 pt-4 text-center">
            <p className="text-sm text-neutral/70">
              Already have an account?
              <Link to="/login" className="text-blue-500  pl-2 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
