const UserInfo = ({ userInfo }: { userInfo: any }) => {
  return (
    <div className="my-4  flex gap-10">
      <div className="w-32 h-32 text-center flex justify-center items-center rounded-full border-none" />
      <div className="grid w-[80%] grid-cols-2 gap-y-3 justify-between">
        <div>
          {" "}
          <p className="text-gray-400"> Name</p>
          {userInfo.name}
        </div>
        <div>
          {" "}
          <p className="text-gray-400">Email</p>
          {userInfo.email}
        </div>
        <div>
          {" "}
          <p className="text-gray-400">Role</p>
          {userInfo.role}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
