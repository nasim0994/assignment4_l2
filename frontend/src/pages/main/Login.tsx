import { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { useLoginMutation } from "@/redux/features/user/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { TUser, userLoggedIn } from "@/redux/features/user/authSlice";

export default function Login() {
  window.scrollTo(0, 0);
  const { loggedUser } = useAppSelector((store) => store.auth);
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname || loggedUser?.role == "admin"
      ? "/admin/dashboard"
      : "/";

  useEffect(() => {
    if (loggedUser && !isError) {
      navigate(from, { replace: true });
    }
  }, [loggedUser, isError, from, navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in");

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const loginInfo = {
      email,
      password,
    };

    try {
      const res = await login(loginInfo).unwrap();

      if (res?.success) {
        const user = verifyToken(res?.data?.accessToken) as TUser;
        dispatch(userLoggedIn({ user, token: res?.data?.accessToken }));
        toast.success("Login successful", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("something went wrong!", { id: toastId });
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] w-full">
      <form onSubmit={handleLogin} className="w-[90%] sm:w-[350px]">
        <div>
          <h2 className="text-2xl font-medium text-center">Welcome Back</h2>
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            placeholder="********"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs">{error?.data?.message}</p>
        )}

        <br />
        <button
          type="submit"
          disabled={isLoading}
          className="text-base-100 bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
