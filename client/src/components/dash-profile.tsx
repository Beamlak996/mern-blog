import { Avatar, Button, TextInput, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"

import { updateUserStart, updateUserFailure, updateUserSuccess } from "../redux/user/userSlice";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export function DashProfile() {
  const { currentUser, loading, error } = useSelector((state: any) => state.user);

  const [formData, setFormData] = useState<FormData>({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState<string | null>("")

  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateSuccess("")

    if(Object.keys(formData).length === 0) {
      dispatch(updateUserFailure("No changes made"))
      return;
    }

    try {
      dispatch(updateUserStart())

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if(!res.ok) {
        dispatch(updateUserFailure(data.message))
      } else {
        dispatch(updateUserSuccess(data))
        setUpdateSuccess("User's profile updated successfully.")
      }

    } catch (error) {
      dispatch(updateUserFailure("Something went wrong!")) 
    }

  }

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="name@company.com"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput type="password" id="password" onChange={handleChange} />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading}
        >
          {loading ? (
            <div className="space-x-2">
              <Spinner size="sm" />
              <span>loading...</span>
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className="text-rose-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
      {updateSuccess && (
        <Alert color="success" className="mt-5">
          {updateSuccess}
        </Alert>
      )}
      {error && (
        <Alert className="mt-5" color={"failure"}>
          {error}
        </Alert>
      )}
    </div>
  );
}
