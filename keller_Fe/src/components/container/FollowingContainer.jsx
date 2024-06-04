import React from 'react'
import UnderConstruction from "../../assets/underConstruction.jpeg"

const FollowingContainer = () => {
  return (
    <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg">
    <div className="flex justify-between items-center pt-3 pb-3">
      <h1 className="text-3xl ps-5 pt-5 ">Folgen</h1>
    </div>
    <div className="bg-white mx-7 my-2 rounded-lg border-2 mb-10">
      <div className="">
        <div className="mt-3 mb-7 ">
        <img src={UnderConstruction} alt="img" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default FollowingContainer