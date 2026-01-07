import Loader from "@/components/layout/Loader";
import {
  useAllUsersQuery,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { CircleAlert, XCircle } from "lucide-react";
import type { IUser } from "@/types/user";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ViewAllUsersProfile = () => {
  const navigate = useNavigate();
  const [permitted, setPermitted] = useState(false);
  const { data: adminDetails, isLoading: adminDetailsLoading } =
    useUserInfoQuery(undefined);
  const role = adminDetails?.data?.data?.role;
  console.log(role);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page"));
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const { data, isLoading, isError } = useAllUsersQuery({ page: currentPage });
  const allUsersResponse = data?.data;
  const allUsers = allUsersResponse?.data;
  const totalPage = Number(allUsersResponse?.meta?.totalPage);
  let pageNumbers: number[] = [];
  if (currentPage <= totalPage - 2) {
    for (let i = currentPage; i <= currentPage + 2; i++) {
      pageNumbers.push(i);
    }
  }
  if (currentPage >= totalPage - 2) {
    pageNumbers = [totalPage - 2, totalPage - 1, totalPage];
  }

  console.log("pageno", pageNumbers);

  console.log(totalPage);
  console.log(allUsersResponse);
  console.log(allUsers);

  useEffect(() => {
    if (adminDetailsLoading) {
      setPermitted(false);
    }
    if (!adminDetailsLoading) {
      if (!role || role !== "ADMIN") {
        navigate("/");
      }
      if (role && role === "ADMIN") {
        setPermitted(true);
      }
    }
  }, [role, navigate, adminDetailsLoading]);

  return (
    <div>
      {permitted && !isLoading && allUsers && Array.isArray(allUsers) && (
        <>
          <div className="my-10 mx-2 space-y-10">
            <div>
              <h1 className="text-center text-4xl">All Users</h1>
            </div>

            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {allUsers.length > 0 ? (
                allUsers.map((user: IUser) => (
                  <div key={user._id} className="">
                    <Card className="h-[18rem]">
                      <CardHeader className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 border-2 border-primary">
                          <AvatarImage
                            src={user.picture}
                            alt={`${user.name}'s profile picture`}
                          />
                          <AvatarFallback className="text-4xl">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="mt-4 text-2xl font-bold">
                          {user.name}
                        </CardTitle>
                        <CardDescription className="mt-1 flex flex-col items-center">
                          <span>{user.email}</span>
                          <div className="mt-2 flex items-center space-x-2">
                            {user.role && (
                              <Badge
                                variant="outline"
                                className="capitalize bg-green-500 text-white"
                              >
                                {user.role}
                              </Badge>
                            )}
                            {!user.isVerified && (
                              <Badge variant="destructive">
                                <XCircle className="h-4 w-4 mr-1" /> Unverified
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className="capitalize bg-sky-700 text-white"
                            >
                              <Link
                                to={`/api/v1/admin/all-users/user/${user._id}`}
                                state={{ user }}
                                className="flex items-center gap-1"
                              >
                                View More
                              </Link>
                            </Badge>
                          </div>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                ))
              ) : (
                <h1>No User Found</h1>
              )}
            </div>

            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem hidden={currentPage <= 1}>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  {totalPage &&
                    pageNumbers &&
                    pageNumbers.map((page: number) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem
                    hidden={!pageNumbers[2] || pageNumbers[2] >= totalPage}
                  >
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem hidden={currentPage >= totalPage}>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </>
      )}

      {isLoading && <Loader />}

      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
        >
          <CircleAlert className="h-4 w-4" />
          <span>Failed to load all users.</span>
        </motion.div>
      )}
    </div>
  );
};

export default ViewAllUsersProfile;
