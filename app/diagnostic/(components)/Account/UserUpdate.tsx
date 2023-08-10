import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type nameUpdate = {
  name: string;
};

const UserUpdate = ({
  userInfo,
  userRole,
}: {
  userInfo: any;
  userRole: string;
}) => {
  const {
    register: register3,

    handleSubmit: handleSubmit3,

    formState: { errors: errors3 },
  } = useForm<nameUpdate>();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(userInfo.name);
  }, [userInfo.name]);
  const onSubmitNameUpadate: SubmitHandler<nameUpdate> = async (data) => {
    console.log(data);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
        data,
        { withCredentials: true }
      );
      setUserName(data.name);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: `Name Updated Successfully.. Reload to see the update`,
        confirmButtonText: "OK",
      });
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error updating diagnostic info due to ${err.message}`,
        confirmButtonText: "Try Again",
      });
    }

    //    console.log(data);
  };
  return (
    <div className="my-4 w-[100%] flex justify-center  gap-10">
      <div className="w-[80%] text-left  rounded-full border-none">
        <form onSubmit={handleSubmit3(onSubmitNameUpadate)}>
          <div className="grid w-[100%] grid-cols-2 gap-x-10 gap-y-3 justify-between">
            <div className="">
              <label className="text-gray-400 my-2" htmlFor="password my-2">
                Name
              </label>
              <input
                defaultValue={userName}
                type="text"
                id="username"
                className="inputStyle "
                {...register3("name", { required: true })}
              />
              {errors3.name && (
                <p className="text-red-600">User Name is required</p>
              )}
            </div>
            <div>
              <label className="text-gray-400 my-2" htmlFor="password my-2">
                Email
              </label>
              <input
                defaultValue={userInfo.email}
                id="division"
                readOnly
                type="email"
                className="inputStyle "
              />
            </div>

            <div>
              <label className="text-gray-400 my-2" htmlFor="password my-2">
                Role
              </label>
              <input
                value={userRole}
                type="text"
                id="logo"
                className="inputStyle "
                readOnly
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="btn my-4 bg-black">Update Information</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
