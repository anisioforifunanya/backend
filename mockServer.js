export const homeLocationData = [
    {
        "id": 1,
        "name": "Alex",
        "desc": "Software Developer"
    },
    {
        "id": 2,
        "name": "Emmanuel",
        "desc": "Backend Developer"
    },
    {
        "id": 3,
        "name": "Valar Mogulis",
        "desc": "The Many Faced God"
    },
    {
        "id": 4,
        "name": "Topman",
        "desc": "Software Developer"
    },
    {
        "id": 5,
        "name": "Jaimie Lannister",
        "desc": "Kingslayer"
    },
    {
        "id": 6,
        "name": "Jon Snow",
        "desc": "King in the North"
    },
    {
        "id": 7,
        "name": "Ayra Stark",
        "desc": "No one"
    },
    {
        "id": 8,
        "name": "Tywin Lannister",
        "desc": "King's Hand"
    },
    {
        "id": 9,
        "name": "Danerys Targaryen",
        "desc": "The Unburnt"
    },
    {
        "id": 9,
        "name": "Danerys Targaryen",
        "desc": "The Unburnt"
    },
    {
        "id": 9,
        "name": "Danerys Targaryen",
        "desc": "The Unburnt"
    },
    {
        "id": 9,
        "name": "Danerys Targaryen",
        "desc": "The Unburnt"
    }
]
// this is how i expect the posts datad to be returned from the server
export const postsData = [
    {
      "id": 1,
      "author": {
        "id": 1,
        "username": "user123",
        "display_name": "Nora West Allen",
        "profile_pic_url": ""
      },
      "content": "This is the content of the first post.",
      "media": [
        {
          "type": "image",
          "url": "https://placehold.co/600x400/000000/FFFFFF.png"
        }
      ],
      "timestamp": "2024-02-29T12:00:00Z",
      "likes": 20,
      "is_liked": true,
      "comments": [
        {
          "id": 1,
          "author": {
            "id": 2,
            "display_name": "Hunter Zolomon",
            "username": "anotherUser",
            "profile_pic_url": ""
          },
          "content": "Nice post!",
          "timestamp": "2024-02-29T12:05:00Z"
        },
        {
          "id": 2,
          "author": {
            "id": 3,
            "display_name": "Barry Alen",
            "username": "thirdUser",
            "profile_pic_url": ""
          },
          "content": "I agree!",
          "timestamp": "2024-02-29T12:10:00Z"
        }
      ]
    },
    {
      "id": 2,
      "author": {
        "id": 2,
        "display_name": "Caitlyn Snow",
        "username": "anotherUser",
        "profile_pic_url": ""
      },
      "content": "Second post here.",
      "media": [
        {
          "type": "image",
          "url": "https://placehold.co/600x400/000000/FFFFFF.png"
        },
        {
          "type": "video",
          "url": "https://placehold.co/1920x1080.mp4"
        },
        {
          "type": "video",
          "url": "https://placehold.co/1920x1080.mp4"
        }
      ],
      "timestamp": "2024-02-29T12:30:00Z",
      "likes": 10,
      "is_liked": false,
      "comments": []
    },
    {
      "id": 3,
      "author": {
        "id": 3,
        "display_name": "Eobard Thawne",
        "username": "thirdUser",
        "profile_pic_url": ""
      },
      "content": "Another day, another post.",
      "timestamp": "2024-02-29T13:00:00Z",
      "likes": 15,
      "is_liked": false,
      "comments": [
        {
          "id": 3,
          "author": {
            "id": 1,
            "diaplay_name": "Iris West-Allen",
            "username": "user123",
            "profile_pic_url": ""
          },
          "content": "Keep up the good work!",
          "timestamp": "2024-02-29T13:05:00Z"
        }
      ]
    },
    {
      "id": 4,
      "author": {
        "id": 1,
        "display_name": "Sisco Ramon",
        "username": "user123",
        "profile_pic_url": ""
      },
      "content": "Feeling inspired today.",
      "timestamp": "2024-02-29T14:00:00Z",
      "likes": 30,
      "is_liked": true,
      "comments": []
    },
    {
      "id": 5,
      "author": {
        "id": 4,
        "display_name": "Harrison Wells",
        "username": "newUser",
        "profile_pic_url": ""
      },
      "content": "Hello world!",
      "timestamp": "2024-02-29T15:00:00Z",
      "likes": 5,
      "comments": []
    },
    {
      "id": 6,
      "author": {
        "id": 2,
        "display_name": "Savitar",
        "username": "anotherUser",
        "profile_pic_url": ""
      },
      "content": "Another post from me.",
      "media": [
        {
          "type": "image",
          "url": "https://placehold.co/600x400/000000/FFFFFF.png"
        },
        {
          "type": "video",
          "url": "https://placehold.co/1920x1080.mp4"
        }
      ],
      "timestamp": "2024-02-29T16:00:00Z",
      "likes": 25,
      "is_liked": false,
      "comments": [
        {
          "id": 4,
          "author": {
            "id": 3,
            "display_name": "Oliver Queen",
            "username": "thirdUser",
            "profile_pic_url": ""
          },
          "content": "Great post!",
          "timestamp": "2024-02-29T16:05:00Z"
        }
      ]
    },
    {
      "id": 7,
      "author": {
        "id": 1,
        "display_name": "Felicity Smoak",
        "username": "user123",
        "profile_pic_url": ""
      },
      "content": "Yet another post.",
      "timestamp": "2024-02-29T17:00:00Z",
      "likes": 12,
      "is_liked": true,
      "comments": []
    }
  ]

export const suggestedPeople = [
    {
        "id": 1,
        "username": "theofficialavatar",
        "display_name": "Aang",
        "profile_pic_url": "",
        "is_following": false,
        "followers": 334,
    },
    {
        "id": 4,
        "username": "blueflames",
        "display_name": "Azula",
        "profile_pic_url": "",
        "is_following": true,
        "followers": 325
    },
    {
        "id": 5,
        "username": "toph_the_boulder",
        "display_name": "Toph Beifong",
        "profile_pic_url": "",
        "is_following": true,
        "followers": 312
    },
    {
        "id": 2,
        "username": "waterbenderkatara",
        "display_name": "Katara",
        "profile_pic_url": "",
        "is_following": false,
        "followers": 294
    },
    {
        "id": 3,
        "username": "sokka_the_warrior",
        "display_name": "Sokka",
        "profile_pic_url": "",
        "is_following": false,
        "followers": 342
    },
]

export const ProductCategories = [ 'electronics', 'fashion', 'home_kitchen', 'health_beauty', 'toys_games', 'sports_outdoors', 'books', 'automotive', 'grocery', 'pet_supplies', 'tools', 'baby', 'handmade', 'software' ]

export const eventTypes = [
  { name: 'physical', displayName: 'Physical' },
  { name: 'virtual', displayName: 'Virtual' },
  { name: 'hybrid', displayName: 'Hybrid' }
];

export const eventsData = [
  {
      "id": 3,
      "title": "Sports Tournament",
      "organizer": "Nigerian Sports Federation",
      "event_type": "tournament",
      "category": "sports_fitness",
      "tags": [
          "sports",
          "tournament"
      ],
      "location": "Ibadan, Nigeria",
      "virtual_url": "https://zoom.us/j/1234567890",
      "date": "2024-07-12",
      "time": "14:00",
      "picture": "https://placehold.co/600x400/png",
      "likes": 80,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:03:40.873753Z",
      "date_updated": "2024-03-02T14:03:40.873753Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 4,
      "title": "Community Festival",
      "organizer": "Local Community Council",
      "event_type": "festival_fair",
      "category": "community_culture",
      "tags": [
          "community",
          "festival"
      ],
      "location": "Kano, Nigeria",
      "virtual_url": "https://meet.google.com/abc-xyz",
      "date": "2024-06-05",
      "time": "12:00",
      "picture": "https://placehold.co/600x400/png",
      "likes": 90,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:04:40.454469Z",
      "date_updated": "2024-03-02T14:04:40.454469Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 5,
      "title": "Business Conference",
      "organizer": "Nigerian Business Council",
      "event_type": "conference",
      "category": "business_professional",
      "tags": [
          "business",
          "conference"
      ],
      "location": "Port Harcourt, Nigeria",
      "virtual_url": null,
      "date": "2024-05-20",
      "time": "09:00",
      "picture": "https://placehold.co/600x400/png",
      "likes": 120,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:05:04.657177Z",
      "date_updated": "2024-03-02T14:05:04.657177Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 6,
      "title": "Health and Wellness Seminar",
      "organizer": "Nigeria Health Foundation",
      "event_type": "seminar_talk",
      "category": "health_wellness",
      "tags": [
          "health",
          "wellness",
          "seminar"
      ],
      "location": "Abuja, Nigeria",
      "virtual_url": null,
      "date": "2024-04-15",
      "time": "10:00",
      "picture": "https://placehold.co/600x400/png",
      "likes": 75,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:05:38.983982Z",
      "date_updated": "2024-03-02T14:05:38.983982Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 7,
      "title": "Music Concert",
      "organizer": "XYZ Entertainment",
      "event_type": "concert_performance",
      "category": "music",
      "tags": [
          "music",
          "concert",
          "entertainment"
      ],
      "location": "Lagos, Nigeria",
      "virtual_url": null,
      "date": "2024-03-10",
      "time": "19:00",
      "picture": "https://placehold.co/600x400/png",
      "likes": 150,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:05:56.362154Z",
      "date_updated": "2024-03-02T14:05:56.362154Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 8,
      "title": "Tech Conference",
      "organizer": "Nigeria Tech Summit",
      "event_type": "conference",
      "category": "science_technology",
      "tags": [
          "technology",
          "conference"
      ],
      "location": "Jos, Nigeria",
      "virtual_url": null,
      "date": "2024-08-15",
      "time": "10:00",
      "picture": "https://placehold.co/600x400/png",
      "likes": 200,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:07:27.567407Z",
      "date_updated": "2024-03-02T14:07:27.567407Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 9,
      "title": "Food Expo",
      "organizer": "Nigerian Food Association",
      "event_type": "attraction",
      "category": "food_drink",
      "tags": [
          "food",
          "expo"
      ],
      "location": "Abeokuta, Nigeria",
      "virtual_url": null,
      "date": "2024-09-20",
      "time": "11:30",
      "picture": "https://placehold.co/600x400/png",
      "likes": 180,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:07:57.194959Z",
      "date_updated": "2024-03-02T14:07:57.194959Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 10,
      "title": "Educational Seminar",
      "organizer": "Nigerian Education Society",
      "event_type": "seminar_talk",
      "category": "school_activities",
      "tags": [
          "education",
          "seminar"
      ],
      "location": "Owerri, Nigeria",
      "virtual_url": "https://zoom.us/j/9876543210",
      "date": "2024-11-12",
      "time": "09:30",
      "picture": "https://placehold.co/600x400/png",
      "likes": 190,
      "google_map_link": "https://maps.app.goo.gl/kAgvtPYv4aqGUJDe6",
      "date_created": "2024-03-02T14:10:04.370696Z",
      "date_updated": "2024-03-02T14:10:04.370696Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  },
  {
      "id": 11,
      "title": "Charity Fundraiser",
      "organizer": "Nigeria Charity Foundation",
      "event_type": "other",
      "category": "charity_causes",
      "tags": [
          "charity",
          "fundraiser"
      ],
      "location": "Calabar, Nigeria",
      "virtual_url": null,
      "date": "2024-12-08",
      "time": "18:00",
      "picture": "https://placehold.co/600x400/png",
      "likes": 220,
      "google_map_link": null,
      "date_created": "2024-03-02T14:10:43.660405Z",
      "date_updated": "2024-03-02T14:10:43.660405Z",
      "created_by": "3753c9ad-986e-4ad3-b086-e289c4f4f350"
  }
]

export const AllEventCategories = [
  { name: 'auto_boat_air', displayName: 'Automobiles' },
  { name: 'business_professional', displayName: 'Business' },
  { name: 'charity_causes', displayName: 'Charity' },
  { name: 'community_culture', displayName: 'Community & Culture' },
  { name: 'family_education', displayName: 'Family & Education' },
  { name: 'fashion_beauty', displayName: 'Fashion & Beauty' },
  { name: 'film_media_ent', displayName: 'Media & Entertainment' },
  { name: 'food_drink', displayName: 'Food & Drink' },
  { name: 'government_politics', displayName: 'Government & Politics' },
  { name: 'health_wellness', displayName: 'Health & Wellness' },
  { name: 'hobbies_special_interest', displayName: 'Hobbies' },
  { name: 'home_lifestyle', displayName: 'Home & Lifestyle' },
  { name: 'music', displayName: 'Music' },
  { name: 'performing_visual_arts', displayName: 'Performing & Visual Art' },
  { name: 'religion_spirituality', displayName: 'Religion' },
  { name: 'school_activities', displayName: 'School Activities' },
  { name: 'science_technology', displayName: 'Science & Technology' },
  { name: 'seasonal_holiday', displayName: 'Seasonal & Holiday' },
  { name: 'sports_fitness', displayName: 'Sports & Fitness' },
  { name: 'travel_outdoor', displayName: 'Travel & Outdoor' },
  { name: 'other', displayName: 'Other' },
];

 export const locations = [
  "Abuja, Federal Capital Territory",
  "Lagos, Lagos",
  "Kano, Kano",
  "Ibadan, Oyo",
  "Benin City, Edo",
  "Port Harcourt, Rivers",
  "Kaduna, Kaduna",
  "Jos, Plateau",
  "Enugu, Enugu",
  "Owerri, Imo",
  "Abeokuta, Ogun",
  "Maiduguri, Borno",
  "Zaria, Kaduna",
  "Warri, Delta",
  "Onitsha, Anambra",
  "Lekki, Lagos",
  "Aba, Abia",
  "Uyo, Akwa Ibom",
  "Ado-Ekiti, Ekiti",
  "Makurdi, Benue",
  "Minna, Niger",
  "Ilorin, Kwara",
  "Umuahia, Abia",
  "Osogbo, Osun",
  "Akure, Ondo",
  "Calabar, Cross River",
  "Gombe, Gombe",
  "Yenagoa, Bayelsa",
  "Dutse, Jigawa",
  "Lafia, Nasarawa",
  "Sokoto, Sokoto",
  "Awka, Anambra",
  "Jalingo, Taraba",
  "Birnin Kebbi, Kebbi",
  "Katsina, Katsina",
  "Gusau, Zamfara",
  "Efon-Alaaye, Ekiti",
  "Gboko, Benue",
  "Ijebu-Ode, Ogun",
  "Ise-Ekiti, Ekiti",
  "Kisi, Oyo",
  "Modakeke, Osun",
  "Okene, Kogi",
  "Okigwe, Imo",
  "Ondo City, Ondo",
  "Sagamu, Ogun",
  "Sapele, Delta",
  "Akwanga, Nasarawa",
  "Ikare, Ondo",
  "Ile-Ife, Osun",
  "Ilesa, Osun",
  "Oturkpo, Benue",
  "Pankshin, Plateau",
  "Sabo Gida Ora, Edo",
  "Ughelli, Delta",
  "Yola, Adamawa",
  "Bonny, Rivers",
  "Bama, Borno",
  "Azare, Bauchi",
  "Gbongan, Osun",
  "Ikirun, Osun",
  "Offa, Kwara",
  "Igboho, Oyo",
  "Ihiala, Anambra",
  "Ipoti, Ekiti",
  "Obajana, Kogi",
  "Ogoja, Cross River",
  "Oke-Mesi, Ekiti",
  "Okrika, Rivers",
  "Saki, Oyo",
  "Zungeru, Niger",
  "Lokoja, Kogi",
  "Owerri-Ebeiri, Imo",
  "Owo, Ondo",
  "Oyo, Oyo",
  "Suleja, Niger",
  "Wukari, Taraba",
  "Birnin Kudu, Jigawa",
  "Nguru, Yobe",
  "Gwaram, Jigawa",
  "Keffi, Nasarawa",
  "Ibi, Taraba",
  "Koko, Kebbi",
  "Kontagora, Niger",
  "Kumo, Gombe",
  "Kamba, Kebbi",
  "Kari, Adamawa",
  "Garko, Kano",
  "Funtua, Katsina",
  "Kafanchan, Kaduna",
  "Ganye, Adamawa",
  "Gashua, Yobe",
  "Gombe, Gombe",
  "Gwaram, Jigawa",
  "Gwarzo, Kano",
  "Hadejia, Jigawa",
  "Ikom, Cross River",
  "Isua, Akoko, Ondo",
  "Jega, Kebbi",
  "Kachia, Kaduna",
  "Karu, Nasarawa",
  "Kaura Namoda, Zamfara",
  "Kiyawa, Jigawa",
  "Kukawa, Borno",
  "Lafia, Nasarawa",
  "Maiha, Adamawa",
  "Mokwa, Niger",
  "Nafada, Gombe",
  "Nguru, Yobe",
  "Nkpor, Anambra",
  "Nsukka, Enugu",
  "Numan, Adamawa",
  "Ode, Ondo",
  "Ofunato, Ondo",
  "Okeigbo, Ondo",
  "Oke-Ero, Kwara",
  "Okitipupa, Ondo",
  "Omu-Aran, Kwara",
  "Oturkpo, Benue",
  "Owode, Ogun",
  "Ozubulu, Anambra",
  "Pategi, Kwara",
  "Pindiga, Gombe",
  "Potiskum, Yobe",
  "Rano, Kano",
  "Rijau, Niger",
  "Roni, Jigawa",
  "Shendam, Plateau",
  "Serti, Taraba",
  "Shagamu, Ogun",
  "Sapele, Delta",
  "Shaki, Oyo",
  "Suleja, Niger",
  "Talata Mafara, Zamfara",
  "Tambuwal, Sokoto",
  "Tegina, Niger",
  "Tsafe, Zamfara",
  "Ugep, Cross River",
  "Uromi, Edo",
  "Urua Inyang, Akwa Ibom",
  "Wudil, Kano",
  "Wukari, Taraba",
  "Yenagoa, Bayelsa",
  "Yola, Adamawa",
  "Zaria, Kaduna",
  "Zungeru, Niger",
  "Ado-Ekiti, Ekiti",
  "Agulu, Anambra",
  "Aku, Anambra",
  "Apomu, Osun",
  "Auchi, Edo",
  "Awa, Akoko, Ondo",
  "Awgu, Enugu",
  "Bachita, Niger",
  "Badagry, Lagos",
  "Bagudo, Kebbi",
  "Bajoga, Gombe",
  "Bakori, Katsina",
  "Bali, Taraba",
  "Bama, Borno",
  "Banawa, Kaduna",
  "Banga, Cross River",
  "Bara, Katsina",
  "Baro, Niger",
  "Basra, Kebbi",
  "Bassa, Plateau",
  "Batsari, Katsina",
  "Bebi, Cross River",
  "Bebeji, Kano",
  "Bedi, Niger",
  "Bekwara, Cross River",
  "Bende, Abia",
  "Bida, Niger",
  "Birnin Gwari, Kaduna",
  "Birnin Kudu, Jigawa",
  "Birnin Magaji, Zamfara",
  "Birnin Kebbi, Kebbi",
  "Bode Sadu, Kwara",
  "Bode Saadu, Kwara",
  "Boi, Kwara",
  "Boluwaji, Kwara",
  "Borgu, Niger",
  "Bunza, Kebbi",
  "Bursali, Kebbi",
  "Buji, Jigawa",
  "Bununu, Kano",
  "Bunza, Kebbi",
  "Buruku, Benue",
  "Bwari, Abuja",
  "Calabar, Cross River",
  "Chafe, Zamfara",
  "Dala, Kano",
  "Dambatta, Kano",
  "Dan Musa, Katsina",
  "Danja, Katsina",
  "Dange, Katsina",
  "Dangoma, Katsina",
  "Danja, Katsina",
  "Danmusa, Katsina",
  "Daura, Katsina",
  "Dawakin Tofa, Kano",
  "Dekina, Kogi",
  "Delta, Delta",
  "Deba, Gombe",
  "Doma, Nasarawa",
  "Donga, Taraba",
  "Dutse, Jigawa",
  "Ebute Ikorodu, Lagos",
  "Egbe, Kogi",
  "Efon-Alaaye, Ekiti",
  "Egbe, Kwara",
  "Egbe, Kogi",
  "Egbe, Kwara",
  "Egbejila, Oyo",
  "Egede, Enugu",
  "Ejigbo, Lagos",
  "Eket, Akwa Ibom",
  "Elele, Rivers",
  "Eleyele, Oyo",
  "Emure-Ekiti, Ekiti",
  "Epe, Lagos",
  "Esuk Oron, Akwa Ibom",
  "Fada, Gombe",
  "Fagge, Kano",
  "Fulani, Kano",
  "Fune, Yobe",
  "Funtua, Katsina",
  "Gagarawa, Jigawa",
  "Gamboru, Borno",
  "Ganye, Adamawa",
  "Gashua, Yobe",
  "Gaya, Kano",
  "Gboko, Benue",
  "Gembu, Taraba",
  "Gidan Waya, Kaduna",
  "Gombe, Gombe",
  "Gombi, Adamawa",
  "Gora, Kaduna",
  "Goronyo, Sokoto",
  "Gubio, Borno",
  "Gusau, Zamfara",
  "Gwadabawa, Sokoto",
  "Gwagwalada, Abuja",
  "Gwale, Kano",
  "Gwaram, Jigawa",
  "Gwarzo, Kano",
  "Gwiwa, Jigawa",
  "Hadejia, Jigawa",
  "Ibadan, Oyo",
  "Ibeto, Niger",
  "Ibi, Taraba",
  "Idah, Kogi",
  "Idanre, Ondo",
  "Ido, Oyo",
  "Igabi, Kaduna",
  "Igbeti, Oyo",
  "Igueben, Edo",
  "Igboho, Oyo",
  "Igbo-Ukwu, Anambra",
  "Igede-Ekiti, Ekiti",
  "Igirigiri, Niger",
  "Igumale, Benue",
  "Ihiala, Anambra",
  "Iho, Imo",
  "Ijebu-Jesa, Osun",
  "Ijebu-Ode, Ogun",
  "Ijero-Ekiti, Ekiti",
  "Ijumu, Kogi",
  "Ikare, Ondo",
  "Ikare, Ogun",
  "Ikare, Ondo",
  "Ikere-Ekiti, Ekiti",
  "Ikerre, Osun",
  "Ikerre, Ekiti",
  "Ikire, Osun",
  "Ikirun, Osun",
  "Ikole-Ekiti, Ekiti",
  "Ikot Ekpene, Akwa Ibom",
  "Ikot Abasi, Akwa Ibom",
  "Ikom, Cross River",
  "Ikotun, Lagos",
  "Ikwo, Ebonyi",
  "Ila, Osun",
  "Ilorin, Kwara",
  "Ilobu, Osun",
  "Ilaro, Ogun",
  "Ilesa, Osun",
  "Illela, Sokoto",
  "Ilorin, Kwara",
  "Ilaro, Ogun",
  "Inisa, Osun",
  "Inisa, Osun",
  "Iragbiji, Osun",
  "Iresi, Osun",
  "Irepodun, Osun",
  "Irigbo, Ogun",
  "Iru, Kwara",
  "Isara, Ogun",
  "Ise-Ekiti, Ekiti",
  "Iseyin, Oyo",
  "Iseyin, Oyo",
  "Isieke, Ebonyi",
  "Isin, Kwara",
  "Isolo, Lagos",
  "Isonyin, Ogun",
  "Itele, Ogun",
  "Itori, Ogun",
  "Itori, Ogun",
  "Itu, Akwa Ibom",
  "Iwo, Osun",
  "Iyamoyun, Ekiti",
  "Iyara, Kogi",
  "Iyin, Ekiti",
  "Izzi, Ebonyi",
  "Jaba, Kaduna",
  "Jada, Adamawa",
  "Jajimaji, Katsina",
  "Jalingo, Taraba",
  "Jama'are, Bauchi",
  "Jegba, Niger",
  "Jega, Kebbi",
  "Jemaa, Kaduna",
  "Jibia, Katsina",
  "Jibiya, Katsina",
  "Jigawa, Jigawa",
  "Jikamshi, Katsina",
  "Jimeta, Adamawa",
  "Joga, Kogi",
  "Jugawa, Kebbi",
  "Kabba, Kogi",
  "Kachia, Kaduna",
  "Kaduna, Kaduna",
  "Kafanchan, Kaduna",
  "Kagara, Niger",
  "Kaiama, Kwara",
  "Kaiama, Bayelsa",
  "Kaltungo, Gombe",
  "Kamba, Kebbi",
  "Kano, Kano",
  "Kankara, Katsina",
  "Kaura Namoda, Zamfara",
  "Keffi, Nasarawa",
  "Ketare, Kebbi",
  "Koko, Kebbi",
  "Kontagora, Niger",
  "Kuje, Abuja",
  "Kumbotso, Kano",
  "Kurfi, Katsina",
  "Kware, Sokoto",
  "Kwale, Delta",
  "Lafia, Nasarawa",
  "Lafiagi, Kwara",
  "Lamurde, Adamawa",
  "Lapai, Niger",
  "Lere, Kaduna",
  "Lokoja, Kogi",
  "Makurdi, Benue",
  "Maiduguri, Borno",
  "Malumfashi, Katsina",
  "Mangu, Plateau",
  "Marte, Borno",
  "Mashi, Katsina",
  "Mokwa, Niger",
  "Monguno, Borno",
  "Mubi, Adamawa",
  "Moriki, Zamfara",
  "Nafada, Gombe",
  "Nasarawa, Nasarawa",
  "Nnewi, Anambra",
  "Nsukka, Enugu",
  "Numan, Adamawa",
  "Nguru, Yobe",
  "Nkwerre, Imo"
]

export const jobTypes = [
  {
    'name': 'remote',
    'display': 'Remote'
  },
  {
    'name': 'onsite',
    'display': 'Onsite'
  },
  {
    'name': 'hybrid',
    'display': 'Hybrid'
  }
]

export const employmentTypes = [
  {
    'name' : 'internship',
    'display': 'Internship'
  }, 
  {
    'name': 'full_time',
    'display': 'Full Time'
  },
  {
    'name': 'part_time',
    'display': 'Part Time'
  },
  {
    'name': 'contract',
    'display': 'Contract'
  },
]