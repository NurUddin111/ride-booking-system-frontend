import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import BecomeDriverForm from "./BecomeDriverForm";
import type { IUser } from "@/types/user";

const BecomeDriverPage = () => {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data?.data as IUser;
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
      <BecomeDriverForm userId={user?._id as string} />
    </main>
  );
};

export default BecomeDriverPage;
