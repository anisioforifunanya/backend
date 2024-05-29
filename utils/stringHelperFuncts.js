import { 
  MdOutlineSportsBasketball,
  MdOutlineHealthAndSafety,
  MdOutlineScience, 
  MdOutlineFamilyRestroom, 
  MdOutlineWbSunny, 
  MdFaceRetouchingNatural, MdOutlinePets
} from "react-icons/md";

import { 
  IoPeopleOutline, 
  IoBusiness, 
  IoMusicalNotes, 
  IoFastFoodOutline, 
  IoSchool, 
  IoAirplaneSharp 
} from "react-icons/io5";

import { 
  FaHandHoldingHeart, 
  FaCar, FaPlus, FaDice, 
  FaMasksTheater, FaCross, 
  FaUserTie, FaFacebook, 
  FaXTwitter, FaInstagram, 
  FaLinkedin, FaYoutube,
  FaPinterest, FaTiktok, FaBook,
  FaSnapchat, FaGlobe, FaBaby, FaComputer
 } from "react-icons/fa6";

import { FaTools } from "react-icons/fa";


import { GoSmiley } from "react-icons/go";

import { BsFillSuitSpadeFill, BsFillCameraReelsFill } from "react-icons/bs";
import moment from 'moment';

import { ImSwitch, ImSpoonKnife } from "react-icons/im";
import { PiBowlFood } from "react-icons/pi";
import { GiClothes } from "react-icons/gi";
import { GrGamepad } from "react-icons/gr";
import { TbNeedleThread } from "react-icons/tb";




export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const randomHex = () => {
  return Math.floor(Math.random() * 4096).toString(16).padStart(3, '0');
}


export const formatTime = (datetime) =>{
    const date = new Date(datetime);
    return date.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  }

  export const formatDateShort = (inputDateStr) => {
    const date = new Date(inputDateStr);
    return date.toLocaleString('en-US', {
      day: '2-digit', 
      month: 'short' 
    });
  }
export  const snakeToTitle = str => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


export const  convertTo12HourTime = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  return `${((hour + 11) % 12) + 1}:${minute < 10 ? '0' : ''}${minute} ${hour < 12 ? 'AM' : 'PM'}`;
}
 
export const eventCategoryIcons = (category) =>{
    switch (category) {
      case 'auto_boat_air':
        return <FaCar />
      case 'travel_outdoor':
        return <IoAirplaneSharp />
      case 'other':
        return <FaPlus />
      case 'family_education':
        return <MdOutlineFamilyRestroom />
      case 'home_lifestyle':
        return <BsFillSuitSpadeFill />
      case 'performing_visual_arts':
        return <FaMasksTheater />
      case 'religion_spirituality':
        return <FaCross />
      case 'seasonal_holiday':
        return <MdOutlineWbSunny />
      case 'fashion_beauty':
        return <MdFaceRetouchingNatural />
      case 'film_media_ent':
        return <BsFillCameraReelsFill />
      case 'government_politics':
        return <FaUserTie />
      case 'hobbies_special_interest':
        return <FaDice />
      case 'sports_fitness':
        return <MdOutlineSportsBasketball />
      case 'health_wellness':
        return <MdOutlineHealthAndSafety />
      case 'science_technology':
        return <MdOutlineScience />
      case 'music':
        return <IoMusicalNotes />
      case 'business_professional':
        return <IoBusiness />
      case 'charity_causes':
        return <FaHandHoldingHeart />
      case 'food_drink':
        return <IoFastFoodOutline />
      case 'community_culture':
        return <IoPeopleOutline />
      case 'school_activities':
        return <IoSchool />
      default:
        return <GoSmiley />
    }
  }

export const formatTimeAgo = (datetime) => {
    return moment(datetime).fromNow();
  }

export const  urlToEmbed = (url) => {
    //Todo: implement a function that takes a url and returns the embed url
        return null
        return `https://www.google.com/maps/embed/v1/place?key=${YOUR_API_KEY}&q=${query}`;
}

export const socialLinkIcon = (title) =>{
    switch (title) {
      case 'facebook':
        return <FaFacebook />
      case 'twitter':
        return <FaXTwitter />
      case 'instagram':
        return <FaInstagram />
      case 'linkedin':
        return <FaLinkedin />
      case 'youtube':
        return <FaYoutube />
      case 'pinterest':
        return <FaPinterest />
      case 'tiktok':
        return <FaTiktok />
      case 'snapchat':
        return <FaSnapchat />
      default:
        return <FaGlobe />
    }
}

export const sortMostRecent = (arr) =>{
  return arr.sort((a, b) => {
      let dateA = new Date(a.date_updated);
      let dateB = new Date(b.date_updated);
      return dateB - dateA; 
  });
}

export function formatCurrency(number) {
  const options = {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
  };

  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(number);
}

export const splitLocation = (location) => {
  let locationArr = location.split(',');
  return [locationArr[0], locationArr[1]]
}

export const splitRadius = (location) => {
  let locationArr = location.split(',');
  return locationArr[2]
}

export const sortLastSeen = (arr) =>{
  return arr.sort((a, b) => {
      let dateA = new Date(a.last_seen);
      let dateB = new Date(b.last_seen);
      return dateB - dateA; 
  });
}

export const StoreCatIcons = (category) =>{
  switch (category) {
    case 'automotive':
      return <FaCar size={15} />
    case 'health_beauty':
      return <MdFaceRetouchingNatural />
    case 'sports_outdoors':
      return <MdOutlineSportsBasketball />
    case 'grocery':
      return <PiBowlFood />
    case 'electronics':
      return <ImSwitch size={15} />
    case 'fashion':
      return <GiClothes />
    case 'home_kitchen':
      return <ImSpoonKnife />
    case 'toys_games':
      return <GrGamepad />
    case 'books':
      return <FaBook size={15} />
    case 'pet_supplies':
      return <MdOutlinePets />
    case 'tools':
      return <FaTools  size={15}/>
    case 'baby':
      return <FaBaby />
    case 'handmade':
      return <TbNeedleThread />
    case 'software':
      return <FaComputer />
    default:
      return <GoSmiley />
  }
}