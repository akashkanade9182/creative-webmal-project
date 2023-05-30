"use client"
import "./Homepage.css"
import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios"
import Loading from "./Loading";
const getData = async (page,limit) => {
return axios.get(`https://odd-ruby-angelfish-wear.cyclic.app/product/getproducts?page=${page}&limit=${limit}`)
  
};

const Homepage = () => {
     const [page, setPage] = useState(1);
     const [data,setData]=useState([]);
     const [load,setLoad]=useState(false)
     const [totalResults,setTotalResults]=useState(0);

const handlePrev=()=>{
if(page>=1){
  setPage(page-1)
}
}
const handleNext=()=>{
  if(page<=11){
    setPage(page+1)
  }
}


     useEffect(()=>{
      setLoad(true)
          getData(page,10).then((r)=>{
            setLoad(false)
            console.log(r.data)
            setData(r.data.data)
            setTotalResults(r.data.total)
          }).catch((e)=>{
            setLoad(false)

            console.log(e);
            alert(`${e}`)
          })
        },[page])
  return (
    <div className="homepage-box">
      <div style={{width:"auto",fontSize:"38px",color:"black",display:"flex",justifyContent:"space-around" ,alignItems:"center"}}>
        Products
      </div>
      {
        load?<Loading/>:<div className="gridbox">
        {
          data.length>0 && data.map((ele,index)=>(
            <div className="card">
              <img className="card-pic" src={ele.image} alt="" />
              <h1 className="card-title">{ele.title}</h1>
              </div>
          ))
        }

      </div>

      }  
<div className="btn-box">
  <button onClick={handlePrev}>Prev</button>
  <div className="pagebox">{page}</div>
  <button onClick={handleNext}>Next</button>

</div>

    </div>
  )
}

export default Homepage