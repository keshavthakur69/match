"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AddHackathon from "@/components/AddHackathon";
import { useRouter } from "next/navigation";
import RemoveHackathon from "@/components/RemoveHackathon";
import ApplyHackathon from "@/components/ApplyHackathon";
import Link from "next/link";
import ViewHackathon from "@/components/ViewHackathon";

const getCurrentUser = async (email: any) => {
  try {
    const res = await fetch(`/api/getCurrentUser?userEmail=${email}`);
    if (!res.ok) {
      throw new Error("Failed to fetch hackathons");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading hackathons: ", error);
  }
};

const getData = async () => {
  try {
    const res = await fetch("/api/getHackathon");
    if (!res.ok) {
      throw new Error("Failed to fetch hackathons");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading hackathons: ", error);
  }
};

const Page = () => {
  const convertDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString();

    return day + "/" + month + "/" + year;
  };
  const { data: session }: any = useSession();

  const router = useRouter();
  const [hackathons, setHackathons] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  // const [reg, setReg] = useState(false);
  let reg = false;
  const getReg = () => {
    return reg;
  };
  const setReg = (change: any) => {
    reg = change;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        if (data) {
          setHackathons(data.hackathons);
        }
      } catch (error) {
        console.error("Error fetching hackathons: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const data = await getCurrentUser(session?.user.email);
        if (data) {
          setCurrentUser(data.currentUser);
        }
      } catch (error) {
        console.error("Error fetching current user data: ", error);
      }
    };

    if (session?.user?.email) {
      fetchCurrentUserData();
    }
  }, [session?.user?.email]);
  return (
    <>
      <div className="">
        <div className="">
          {currentUser?.["role"] === "admin" ? <AddHackathon /> : <></>}
        </div>
        <div className="mx-4 mt-4">Ongoing</div>
        <div className="shadow-md rounded-md p-4 border mx-4 border-gray-600">
          <table className="min-w-full overflow-x-auto">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 text-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Hackathon Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Apply
                </th>
              </tr>
            </thead>
            <tbody>
              {hackathons?.map(
                (hackathon, index) =>
                  new Date((hackathon as any)?.["deadline"]) > new Date() && (
                    <tr key={index}>
                      <td className="py-2 px-3 text-sm">
                        {hackathon?.["name"]}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        {convertDate(hackathon?.["deadline"])}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        <a
                          href={hackathon?.["link"]}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Website
                        </a>
                      </td>
                      <td className="py-2 px-3 text-sm ">
                        {hackathon?.["description"]}
                      </td>
                      <td className="py-2 px-3 text-sm ">
                        <div className="flex flex-row ">
                          {(currentUser as any)?.hackathon.map(
                            (h: any, index: any) => {
                              h === hackathon?.["_id"] ? setReg(true) : null;
                            }
                          )}
                          {getReg() ? null : (
                            <ApplyHackathon
                              id={`${hackathon?.["_id"]}`}
                              userEmail={`${session?.user?.email}`}
                            />
                          )}
                          {setReg(false)}
                          {currentUser?.["role"] === "admin" ? (
                            <RemoveHackathon id={`${hackathon?.["_id"]}`} />
                          ) : (
                            <></>
                          )}
                          <ViewHackathon hackathon={hackathon} />
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <div className="mx-4 mt-4">Closed</div>
        <div className="shadow-md rounded-md p-4 border mx-4 border-gray-600">
          <table className="min-w-full overflow-x-auto">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 text-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Hackathon Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Apply
                </th>
              </tr>
            </thead>
            <tbody>
              {hackathons?.map(
                (hackathon, index) =>
                  new Date((hackathon as any)?.["deadline"]) < new Date() && (
                    <tr key={index}>
                      <td className="py-2 px-3 text-sm">
                        {hackathon?.["name"]}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        {convertDate(hackathon?.["deadline"])}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        <a
                          href={hackathon?.["link"]}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Website
                        </a>
                      </td>
                      <td className="py-2 px-3 text-sm">
                        {hackathon?.["description"]}
                      </td>
                      <td className="py-2 px-3 text-sm ">
                        <div className="flex flex-row ">
                          {(currentUser as any)?.hackathon.map(
                            (h: any, index: any) => {
                              h === hackathon?.["_id"] ? setReg(true) : null;
                            }
                          )}
                          {setReg(false)}
                          {currentUser?.["role"] === "admin" ? (
                            <RemoveHackathon id={`${hackathon?.["_id"]}`} />
                          ) : (
                            <></>
                          )}
                          <ViewHackathon hackathon={hackathon} />
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
