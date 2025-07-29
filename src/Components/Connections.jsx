import axios from 'axios'
import React, { useDebugValue, useEffect } from 'react'
import { BASE_URL } from '../utils/constance'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    console.log(connections);
    
    const dispatch = useDispatch()

    const fetchConnectons = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            // console.log(res.data.data);
            dispatch(addConnections(res?.data?.data))
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchConnectons()
    }, [])
    if(!connections) return

  return (
    <div>
      Connections
      {connections.map((connection) => (
          <div key={connection._id} className='border m-4'>
              <img src={connection.photoUrl} alt="" className='w-[150px]' />
              <h1>{connection.firstName}</h1>
              <p>{connection.profession}</p>
        </div>
      ))}
    </div>
  );
}

export default Connections