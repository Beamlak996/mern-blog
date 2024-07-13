import { Avatar, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export function DashProfile() {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <Avatar
            alt="user"
            rounded
            className="w-full h-full border-8 border-[lightgray] rounded-full"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="name@company.com"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
      </form>
      <div className="text-rose-500 flex justify-between mt-5" >
        <span className="cursor-pointer" >Delete Account</span>
        <span className="cursor-pointer" >Sign out</span>
      </div>
    </div>
  );
}
