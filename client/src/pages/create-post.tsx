import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import "react-quill/dist/quill.snow.css";

export function CreatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState<string | null>(null)

  const navigate = useNavigate()
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
       const res = await fetch(`/api/post/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
       }) 

       const data = await res.json()

       if(data.success === false) {
        setPublishError(data.message)
       }

       if(res.ok) {
        setPublishError(null)
        navigate(`/slug/${data.slug}`)
       } 
    } catch (error) {
        setPublishError("Something went wrong!")
    }

  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e)=> {
                setFormData({...formData, title: e.target.value})
            }}
          />
          <Select
            onChange={(e)=> {
                setFormData({...formData, category: e.target.value})
            }}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput typeof="file" formAction="image/*" />
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            size="sm"
            outline
          >
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          onChange={(value)=> {
            setFormData({...formData, content: value})
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {
            publishError && (
                <Alert className="mt-5" color='failure' >
                    {publishError}
                </Alert>
            )
        }
      </form>
    </div>
  );
}
