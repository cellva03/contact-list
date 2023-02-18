import React from 'react';
import { data } from './data';
import './home.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AiOutlineStar,AiFillStar } from "react-icons/ai";
import { Input } from 'antd';
const { Search } = Input;
import { useState, useEffect } from 'react';

const Home = () => {

    // set the state
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]); 
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState(data.results.sort((a, b) => a.name.first.localeCompare(b.name.first)));

    // sort the data by name and set the data

    const handleFavs = (user) => { 

        if (favorites.some(fav => fav.email === user.email)) {
            return;
        } else {
            // add to favorites to local storage
            localStorage.setItem('favorites', JSON.stringify([...favorites, user]));
            setFavorites([...favorites, user]);
            // remove from users and add to local storage

            
            const newData = users.filter(item => item.email !== user.email);
            setUsers(newData);
            localStorage.setItem('users', JSON.stringify(newData));
        }
    }
    // remove from favorites
    const handleRemoveFavs = (user) => {

        localStorage.setItem('favorites', JSON.stringify(favorites.filter(fav => fav.email !== user.email)));
        const newFavs = favorites.filter(fav => fav.email !== user.email);
        setFavorites(newFavs);
        // add to users and add to local storage
        const newData = [...users, user];
        setUsers(newData.sort((a, b) => a.name.first.localeCompare(b.name.first)));
        localStorage.setItem('users', JSON.stringify([...users, user]));
    }

    // render the user data
    const UserList = ({ users }) => {
        return(
                users &&
                    users.map((user, index) => (
                            <div className="user" key={index}>
                                <div className="user-image">
                                    {loading ? <Skeleton
                                                circle
                                                height={50}
                                                width={50} /> : 
                                                <img src={user.picture.large} alt={user.name.first} /> }
                                    <div className="user-info">
                                        <div className="user-name">
                                        { loading? <Skeleton width={300} height={20}/> : user.name.first + user.name.last}
                                        </div>
                                        <div className="user-email">
                                        { loading? <Skeleton width={300} height={20}/> : <a href={`mailto:${user.email}`}>{user.email}</a>}
                                        </div>
                                        <div className="user-phone">
                                        { loading? <Skeleton width={300} height={20}/> : user.phone }
                                        </div>
                                    </div>
                                </div>
                                <div className="user-fav">
                                    <AiOutlineStar className='user-fav-icon' onClick={() => handleFavs(user)} />
                                </div>
                            </div>
                    ))
            
        )
    }   
     
    // render the favorite user data
    const UserFavList = ({ user, index }) => {
        return(
            <div className="user" key={index}>
                <div className="user-image">
                    {loading ? <Skeleton
                                circle
                                height={50}
                                width={50} /> : 
                                <img src={user.picture.large} alt={user.name.first} /> }
                    <div className="user-info">
                        <div className="user-name">
                        { loading? <Skeleton width={300} height={20}/> : user.name.first + user.name.last}
                        </div>
                        <div className="user-email">
                        { loading? <Skeleton width={300} height={20}/> : <a href={`mailto:${user.email}`}>{user.email}</a>}
                        </div>
                        <div className="user-phone">
                        { loading? <Skeleton width={300} height={20}/> : user.phone }
                        </div>
                    </div>
                </div>
                <div className="user-fav">
                    <AiFillStar className='user-fill-fav-icon' onClick={() => handleRemoveFavs(user)} />
                </div>
            </div>
        )
    }

    // handle the search
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    
    // filter the user data
    const FilterUsers = (user) => {
        if (search === '') {
          return user;
        }
        else{
            return user.filter((user) => user.name.first.toLowerCase().includes(search.toLowerCase()));
        }
      } 


    // set the data to local storage
    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favorites'));
        if (favs) {
            setFavorites(favs);
        }
        const users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            setUsers(users.sort((a, b) => a.name.first.localeCompare(b.name.first)));
        }
        setTimeout(() => {
            setLoading(false);
        }, 3000);

    }, []);


    // render the home page
  return (
    <div className="home">
        <div className="user-card">
                <div className='header'>
                    { loading? <Skeleton width={300} height={50}/> : <p> <span className='heading'>Contact Lists</span></p>}
                    {/* make a searchbar with icon */}
                </div>
                
                { loading? <Skeleton width={300} height={30}/> : <p> <span className='sub_heading'>Favorites</span></p>}
                {
                    favorites.length > 0 ? favorites.map((user, index) => (
                        <UserFavList user={user} key={index} />
                        )) : loading? <Skeleton width={200} height={20}/> : <p>No Favorites Yet  😔</p>
                    }
                <div className='user-section'>
                { loading? <Skeleton width={300} height={30}/> : <p> <span className='sub_heading'>Users</span> </p>}
                    <Search placeholder="Search.." style={{ width: 200 }} onChange={handleSearch}/>  
                </div>
                < UserList users={FilterUsers(users)} />
        </div>
    </div>  
);

}

export default Home;