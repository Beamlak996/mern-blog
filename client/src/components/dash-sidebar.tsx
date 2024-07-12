import { Sidebar } from "flowbite-react"
import { HiUser } from "react-icons/hi"
import { HiArrowSmallRight } from "react-icons/hi2"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export function DashSidebar() {
  const [tab, setTab] = useState('')

  const location = useLocation()

  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')

    if(tabFromUrl) {
        setTab(tab)
    }

  }, [location.search])

  return (
    <Sidebar className="w-full md:w-56" >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label="User"
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmallRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
