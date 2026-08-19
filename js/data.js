/**
 * Vamos Bharat - SIH Tourism & Tourist Safety Platform
 * Mock Database: Monuments, States, Amenities, Recommendations, Translations & Safety Alerts
 */

const APP_DATA = {
  // Current user GPS & location status
  currentLocation: {
    city: "New Delhi",
    state: "Delhi",
    lat: 28.6139,
    lng: 77.2090,
    landmark: "Connaught Place, Central Delhi",
    safetyIndex: "9.5/10",
    safetyZone: "Safe Zone - Low Risk",
    safetyColor: "emerald"
  },

  // Notification Feed
  notifications: [
    {
      id: "notif-1",
      type: "alert",
      icon: "⚠️",
      title: "Weather Advisory: Light Monsoon Fog",
      message: "Expect light morning mist near Yamuna Expressway (Agra). Drive safely.",
      time: "10 mins ago",
      read: false
    },
    {
      id: "notif-2",
      type: "safety",
      icon: "🛡️",
      title: "Tourist Safety: Red Fort Area",
      message: "Delhi Tourist Police Helpdesk is active at Gate 3. Always hire certified ASI guides.",
      time: "1 hour ago",
      read: false
    },
    {
      id: "notif-3",
      type: "tip",
      icon: "💡",
      title: "Fair Fare Reminder",
      message: "Prepaid auto booth available outside New Delhi Railway Station. Avoid unmetered rides.",
      time: "3 hours ago",
      read: true
    }
  ],

  // 1. Famous Places / Monuments (Top Attractions)
  monuments: [
    {
      id: "taj-mahal",
      name: "Taj Mahal",
      city: "Agra",
      state: "Uttar Pradesh",
      category: "World Heritage",
      rating: 4.9,
      reviewsCount: "128k+",
      safetyScore: 9.6,
      safetyBadge: "Verified Safe Zone",
      entryTimings: "Sunrise to Sunset (Closed on Fridays)",
      entryFee: {
        indian: "₹50 (₹200 for main mausoleum)",
        foreigner: "₹1,100 (₹200 extra for mausoleum)",
        saarc: "₹540"
      },
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=900&q=80"
      ],
      snippet: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
      history: "Commissioned by the fifth Mughal Emperor Shah Jahan in 1631 to house the tomb of his beloved wife Mumtaz Mahal. Built over 22 years by more than 20,000 artisans from India, Persia, and Central Asia using Makrana white marble inlaid with 28 types of precious stones.",
      architecture: "Masterpiece of Mughal architecture combining Islamic, Persian, Ottoman Turkish, and Indian architectural styles with flawless symmetry, calligraphic inlays, and charbagh Mughal gardens.",
      dosAndDonts: [
        { type: "do", text: "Wear shoe covers provided at the entry point before stepping onto the white marble platform." },
        { type: "do", text: "Hire only government-authorized ASI guides wearing official photo ID badges." },
        { type: "do", text: "Book tickets online via the ASI official portal or barcode kiosks to skip touts." },
        { type: "dont", text: "Do not bring tobacco, lighters, drones, tripods, or large bags (strict security check)." },
        { type: "dont", text: "Avoid touts claiming 'VIP expedited entry' outside the East & West gates (it's a scam)." }
      ],
      nearbyAmenities: {
        restaurants: [
          {
            name: "Peshawri - ITC Mughal",
            cuisine: "North Indian & Mughlai (Fine Dining)",
            distance: "2.1 km",
            rating: 4.8,
            price: "₹₹₹₹",
            safetyVerified: true,
            address: "Fatehabad Road, Agra",
            mustTry: "Dal Bukhara & Sikandari Raan"
          },
          {
            name: "Joney's Place",
            cuisine: "Budget Multi-cuisine & Fresh Lassi",
            distance: "400 m (Walking distance from South Gate)",
            rating: 4.5,
            price: "₹",
            safetyVerified: true,
            address: "Taj Ganj, Agra",
            mustTry: "Special Banana Lassi & Aloo Paratha"
          },
          {
            name: "Pinch of Spice",
            cuisine: "North Indian, Continental & Tandoor",
            distance: "2.4 km",
            rating: 4.6,
            price: "₹₹",
            safetyVerified: true,
            address: "1076/2, Fatehabad Road, Agra",
            mustTry: "Murgh Lababdar & Paneer Tikka"
          }
        ],
        hotels: [
          {
            name: "The Oberoi Amarvilas",
            type: "Luxury 5-Star (Direct Taj Views)",
            distance: "600 m",
            rating: 4.9,
            pricePerNight: "₹28,000+",
            safetyVerified: true,
            contact: "+91 562 223 1515"
          },
          {
            name: "Tajview - IHCL SeleQtions",
            type: "Premium Hotel",
            distance: "1.8 km",
            rating: 4.5,
            pricePerNight: "₹6,500+",
            safetyVerified: true,
            contact: "+91 562 660 2000"
          },
          {
            name: "Zostel Agra",
            type: "Verified Backpacker Hostel",
            distance: "1.2 km",
            rating: 4.7,
            pricePerNight: "₹799 (Dorm) / ₹2,400 (Private)",
            safetyVerified: true,
            contact: "+91 981 878 9898"
          }
        ],
        transport: [
          {
            type: "Electric Eco-Bus / Battery Cart",
            name: "Pollution-Free Taj Zone Shuttle",
            detail: "Electric golf carts operate between parking zones (Shilpgram) and Entry Gates.",
            fare: "₹10 - ₹20 / free with some tickets",
            tip: "Vehicles with combustion engines are barred within 500m of the monument."
          },
          {
            type: "Government Prepaid Auto Stand",
            name: "Agra Cantt Railway Station Prepaid Booth",
            detail: "Authorized UP Police prepaid counter outside Station Platform 1.",
            fare: "₹120 - ₹160 fixed to Taj East Gate",
            tip: "Collect the receipt slip; never pay extra to driver before reaching destination."
          },
          {
            type: "App Cabs (Uber / Ola)",
            name: "Direct Pick & Drop at Shilpgram Parking",
            detail: "Reliable GPS tracked rides directly from Agra Cantt or Airport.",
            fare: "₹180 - ₹250 approx.",
            tip: "Match driver OTP & registration number before boarding."
          }
        ],
        entertainment: [
          {
            name: "Mohabbat-the-Taj Sound & Light Show",
            type: "Cultural Theatrical Performance",
            distance: "1.9 km",
            timing: "6:30 PM & 8:00 PM daily",
            rating: 4.6,
            highlight: "80 artists enact the love saga of Shah Jahan and Mumtaz Mahal at Kalakriti Cultural Center."
          },
          {
            name: "Mehtab Bagh Sunset Viewpoint",
            type: "Charbagh Garden Complex",
            distance: "3.2 km (Across River Yamuna)",
            timing: "6:00 AM - 6:30 PM",
            rating: 4.7,
            highlight: "Unobstructed photography vantage point of Taj Mahal reflected in the Yamuna waters."
          },
          {
            name: "Sadar Bazaar Night Market",
            type: "Local Handicrafts & Petha Sweets",
            distance: "3.5 km",
            timing: "11:00 AM - 10:00 PM (Closed Tuesdays)",
            rating: 4.4,
            highlight: "Authentic Agra Petha (Panchi Petha), leather goods, and marble souvenir inlay work."
          }
        ],
        emergency: [
          {
            name: "Agra Tourist Police Special Cell",
            type: "Tourist Police Station",
            distance: "500 m (Taj East Gate)",
            phone: "+91 94544 02758 / 112",
            available: "24x7 Active Helpdesk",
            action: "Instant Tourist Assistance"
          },
          {
            name: "SN Medical College & District Hospital",
            type: "Government Multi-Specialty Hospital",
            distance: "4.1 km",
            phone: "+91 562 226 0353 / 108",
            available: "24x7 Trauma & Emergency",
            action: "Emergency Care"
          }
        ]
      }
    },

    {
      id: "red-fort",
      name: "Red Fort (Lal Qila)",
      city: "Old Delhi",
      state: "Delhi",
      category: "World Heritage",
      rating: 4.7,
      reviewsCount: "95k+",
      safetyScore: 9.4,
      safetyBadge: "Verified Safe Zone",
      entryTimings: "9:30 AM - 4:30 PM (Closed on Mondays)",
      entryFee: {
        indian: "₹35 (Cashless/Online) / ₹50 (Counter)",
        foreigner: "₹550 (Cashless/Online) / ₹600 (Counter)",
        saarc: "₹35"
      },
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=900&q=80"
      ],
      snippet: "Massive red sandstone fortification that served as the primary residence of Mughal emperors for nearly 200 years, standing as India's iconic symbol of independence.",
      history: "Built by Emperor Shah Jahan when he decided to shift his capital from Agra to Delhi (Shahjahanabad) in 1638. Designed by architect Ustad Ahmad Lahori. The Prime Minister of India hoists the tricolor here every Independence Day (August 15).",
      architecture: "Octagonal layout enclosed by 2.41 km of massive red sandstone walls, featuring Lahori Gate, Diwan-i-Aam (Hall of Public Audience), and the marble Diwan-i-Khas.",
      dosAndDonts: [
        { type: "do", text: "Take the Delhi Metro directly to Lal Qila Metro Station (Violet Line, Gate 4)." },
        { type: "do", text: "Combine your visit with the historic Chandni Chowk food walk next door." },
        { type: "dont", text: "Do not buy open unsealed street water from unlicensed vendors near the parking." },
        { type: "dont", text: "Beware of pickpockets in crowded pedestrian pathways around Meena Bazaar." }
      ],
      nearbyAmenities: {
        restaurants: [
          {
            name: "Karim's Historic Mughlai",
            cuisine: "Authentic Old Delhi Kebabs & Mutton Korma",
            distance: "700 m (Near Jama Masjid)",
            rating: 4.7,
            price: "₹₹",
            safetyVerified: true,
            address: "Gali Kababian, Jama Masjid",
            mustTry: "Mutton Burra & Butter Naan"
          },
          {
            name: "Haldiram's Chandni Chowk",
            cuisine: "Pure Veg Sweets, Street Snacks & Thali",
            distance: "600 m",
            rating: 4.5,
            price: "₹₹",
            safetyVerified: true,
            address: "Main Chandni Chowk Road",
            mustTry: "Raj Kachori & Chole Bhature"
          }
        ],
        hotels: [
          {
            name: "Haveli Dharampura",
            type: "Heritage Boutique Stay (UNESCO Award)",
            distance: "900 m",
            rating: 4.8,
            pricePerNight: "₹11,000+",
            safetyVerified: true,
            contact: "+91 11 2326 1000"
          },
          {
            name: "The Lalit New Delhi",
            type: "5-Star Central Delhi",
            distance: "3.8 km",
            rating: 4.6,
            pricePerNight: "₹9,500+",
            safetyVerified: true,
            contact: "+91 11 4444 7777"
          }
        ],
        transport: [
          {
            type: "Delhi Metro (Safest & Fastest)",
            name: "Lal Qila Metro Station (Violet Line)",
            detail: "Exit Gate 4 is 150m from the Red Fort ticket counter.",
            fare: "₹10 - ₹40 (Smart Card / DMRC App)",
            tip: "Air-conditioned, CCTV secured with dedicated ladies coaches."
          },
          {
            type: "Prepaid E-Rickshaw",
            name: "Chandni Chowk E-Rickshaw Stand",
            detail: "Electric green rickshaws for short hops to Jama Masjid and Metro.",
            fare: "₹20 - ₹30 fixed per seat",
            tip: "Agree on price per person before sitting."
          }
        ],
        entertainment: [
          {
            name: "Red Fort Sound & Light Show (Jai Hind)",
            type: "Historical Projection Mapping",
            distance: "Inside Red Fort complex",
            timing: "7:00 PM (Hindi) & 8:30 PM (English)",
            rating: 4.7,
            highlight: "Narrated by Amitabh Bachchan, covering 500 years of India's freedom struggle."
          },
          {
            name: "Chandni Chowk Heritage Rickshaw Walk",
            type: "Spice Market (Khari Baoli) Tour",
            distance: "800 m",
            timing: "10:00 AM - 7:00 PM",
            rating: 4.8,
            highlight: "Asia's largest spice market with breathtaking aromas and vibrant culture."
          }
        ],
        emergency: [
          {
            name: "Kotwali Police Station (Chandni Chowk)",
            type: "Delhi Police Tourist Help Post",
            distance: "400 m",
            phone: "+91 11 2328 2000 / 112",
            available: "24x7 Active",
            action: "Police Assistance"
          },
          {
            name: "Lok Nayak Hospital (LNJP)",
            type: "Government Tertiary Care Hospital",
            distance: "2.3 km (Delhi Gate)",
            phone: "+91 11 2323 3000 / 108",
            available: "24x7 Emergency Ward",
            action: "Medical Care"
          }
        ]
      }
    },

    {
      id: "qutub-minar",
      name: "Qutub Minar",
      city: "South Delhi",
      state: "Delhi",
      category: "World Heritage",
      rating: 4.8,
      reviewsCount: "82k+",
      safetyScore: 9.7,
      safetyBadge: "Verified Safe Zone",
      entryTimings: "7:00 AM - 9:00 PM Daily",
      entryFee: {
        indian: "₹35 (Online) / ₹50 (Counter)",
        foreigner: "₹550 (Online) / ₹600 (Counter)",
        saarc: "₹35"
      },
      image: "https://images.unsplash.com/photo-1597042034842-83214b7865bd?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1597042034842-83214b7865bd?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80"
      ],
      snippet: "At 72.5 meters tall, the world's tallest brick minaret, surrounded by ancient ruins of Quwwat-ul-Islam Mosque and the rust-resistant 4th-century Iron Pillar.",
      history: "Construction started by Qutb-ud-din Aibak in 1199 and completed by his son-in-law Shams-ud-din Iltutmish. Firoz Shah Tughlaq added the upper marble storeys after lightning damage in 1368.",
      architecture: "Fluted red sandstone and white marble tower with intricate Arabic inscriptions and geometric decorative bands.",
      dosAndDonts: [
        { type: "do", text: "Visit during late afternoon or evening for the spectacular nighttime architectural illumination." },
        { type: "do", text: "Look closely at the 1,600-year-old Iron Pillar of Chandragupta II which has never rusted." },
        { type: "dont", text: "Do not climb onto fenced ancient ruins or touch delicate carvings." }
      ],
      nearbyAmenities: {
        restaurants: [
          {
            name: "Olive Bar & Kitchen",
            cuisine: "Mediterranean Fine Dining (Under the Banyan Tree)",
            distance: "300 m",
            rating: 4.7,
            price: "₹₹₹₹",
            safetyVerified: true,
            address: "One Style Mile, Mehrauli",
            mustTry: "Wood-fired Pizza & Mezze Platter"
          },
          {
            name: "Rooh New Delhi",
            cuisine: "Progressive Indian Restaurant",
            distance: "450 m",
            rating: 4.6,
            price: "₹₹₹",
            safetyVerified: true,
            address: "Ambawatta One, Mehrauli",
            mustTry: "Duck Shami & Butter Chicken Kulcha"
          }
        ],
        hotels: [
          {
            name: "Sheraton New Delhi (Saket)",
            type: "5-Star Luxury",
            distance: "3.5 km",
            rating: 4.7,
            pricePerNight: "₹8,500+",
            safetyVerified: true,
            contact: "+91 11 4266 1122"
          }
        ],
        transport: [
          {
            type: "Delhi Metro (Yellow Line)",
            name: "Qutab Minar Metro Station",
            detail: "1.2 km away. Feeder electric autos connect to monument gate for ₹15.",
            fare: "₹10 - ₹50",
            tip: "Yellow Line connects directly to Connaught Place and Gurgaon."
          }
        ],
        entertainment: [
          {
            name: "Mehrauli Archaeological Park",
            type: "Historical Walking Trail",
            distance: "500 m",
            timing: "6:00 AM - 6:00 PM",
            rating: 4.6,
            highlight: "Contains over 100 historical monuments spanning 1,000 years including Jamali Kamali Tomb & Rajon ki Baoli."
          }
        ],
        emergency: [
          {
            name: "Mehrauli Police Station",
            type: "Police Station with Tourist Cell",
            distance: "700 m",
            phone: "+91 11 2664 2525 / 112",
            available: "24x7",
            action: "Police Assistance"
          },
          {
            name: "Max Super Speciality Hospital Saket",
            type: "JCI Accredited Multi-Specialty Hospital",
            distance: "3.2 km",
            phone: "+91 11 2651 5050 / 108",
            available: "24x7 Emergency",
            action: "Medical Care"
          }
        ]
      }
    },

    {
      id: "hawa-mahal",
      name: "Hawa Mahal (Palace of Winds)",
      city: "Jaipur",
      state: "Rajasthan",
      category: "Heritage Monument",
      rating: 4.7,
      reviewsCount: "67k+",
      safetyScore: 9.5,
      safetyBadge: "Verified Safe Zone",
      entryTimings: "9:00 AM - 5:00 PM Daily",
      entryFee: {
        indian: "₹50 (Standard) / ₹20 (Students)",
        foreigner: "₹200",
        compositeTicket: "₹300 (Includes Amber Fort, Albert Hall, Jantar Mantar)"
      },
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1603287681836-e174ce7176c2?auto=format&fit=crop&w=900&q=80"
      ],
      snippet: "A five-storey pink and red sandstone palace featuring 953 intricately carved jharokhas (small windows) built in 1799 by Maharaja Sawai Pratap Singh.",
      history: "Constructed so that the royal women could observe everyday street festivals and processions without being observed by the public, adhering to the purdah custom.",
      architecture: "Shaped like the crown of Lord Krishna, designed by Lal Chand Ustad with unique honeycomb cooling airflow through the Venturi effect.",
      dosAndDonts: [
        { type: "do", text: "Visit Wind View Cafe or Tattoo Cafe across the street for iconic front facade photography." },
        { type: "do", text: "Buy the Composite Tourism Ticket if planning to visit Amber Fort and Jantar Mantar." },
        { type: "dont", text: "Don't fall for gem & jewel store 'free ride' tour offers from unverified street auto drivers." }
      ],
      nearbyAmenities: {
        restaurants: [
          {
            name: "Wind View Cafe",
            cuisine: "Cafe & Rooftop Snacks (Facing Hawa Mahal)",
            distance: "50 m (Directly opposite)",
            rating: 4.6,
            price: "₹₹",
            safetyVerified: true,
            address: "3rd Floor, Badi Chaupar",
            mustTry: "Masala Chai & Wood-fired Pizza with direct view"
          },
          {
            name: "LMB (Laxmi Misthan Bhandar)",
            cuisine: "Authentic Rajasthani Sweets & Thali",
            distance: "600 m (Johari Bazaar)",
            rating: 4.5,
            price: "₹₹",
            safetyVerified: true,
            address: "Johari Bazaar, Jaipur",
            mustTry: "Rajasthani Dal Baati Churma & Ghevar"
          }
        ],
        hotels: [
          {
            name: "Samode Haveli",
            type: "Heritage Boutique Palace",
            distance: "1.8 km",
            rating: 4.8,
            pricePerNight: "₹16,000+",
            safetyVerified: true,
            contact: "+91 141 263 2407"
          },
          {
            name: "Umaid Bhawan Heritage Hotel",
            type: "Traditional Rajput Style Hotel",
            distance: "4.2 km",
            rating: 4.6,
            pricePerNight: "₹4,200+",
            safetyVerified: true,
            contact: "+91 141 231 6184"
          }
        ],
        transport: [
          {
            type: "Jaipur Metro (Pink Line)",
            name: "Badi Chaupar Metro Station",
            detail: "Underground station just 120m from Hawa Mahal.",
            fare: "₹6 - ₹18",
            tip: "Connects directly to Jaipur Railway Station & Sindhi Camp Bus Stand."
          },
          {
            type: "Jaipur Smart Auto Service",
            name: "Government Fixed Tariff Stand",
            detail: "QR Code safety enabled auto stand at Badi Chaupar.",
            fare: "₹50 - ₹120 for local sights",
            tip: "Scan QR code inside auto for live route tracking."
          }
        ],
        entertainment: [
          {
            name: "Johari & Bapu Bazaar Shopping Walk",
            type: "Textiles, Mojris & Handicrafts",
            distance: "200 m",
            timing: "10:30 AM - 8:30 PM (Closed Sundays)",
            rating: 4.6,
            highlight: "Bandhani sarees, block print fabrics, handcrafted camel leather juttis, and blue pottery."
          }
        ],
        emergency: [
          {
            name: "Manak Chowk Police Station (Tourist Unit)",
            type: "Rajasthan Tourist Police",
            distance: "250 m",
            phone: "+91 141 260 4100 / 112",
            available: "24x7",
            action: "Police Assistance"
          },
          {
            name: "SMS Hospital (Sawai Man Singh)",
            type: "Premier Government Hospital",
            distance: "3.1 km",
            phone: "+91 141 251 8222 / 108",
            available: "24x7 Trauma Center",
            action: "Medical Emergency"
          }
        ]
      }
    },

    {
      id: "gateway-of-india",
      name: "Gateway of India",
      city: "Mumbai",
      state: "Maharashtra",
      category: "Colonial Heritage & Seafront",
      rating: 4.8,
      reviewsCount: "110k+",
      safetyScore: 9.6,
      safetyBadge: "Verified Safe Zone",
      entryTimings: "Open 24 Hours (Free Entry)",
      entryFee: {
        indian: "Free",
        foreigner: "Free",
        elephantaFerry: "₹260 return"
      },
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=80"
      ],
      snippet: "An imposing 26-meter arch monument overlooking the Arabian Sea, erected to commemorate the 1911 landing of King George V and Queen Mary.",
      history: "Designed by Scottish architect George Wittet in Indo-Saracenic style with yellow basalt stone. It was also the ceremonial departure point for the last British troops leaving India in 1948.",
      architecture: "Indo-Saracenic architecture integrating 16th-century Gujarati architectural elements with European triumphal arch design.",
      dosAndDonts: [
        { type: "do", text: "Take the verified MTDC ferry from the jetty to visit UNESCO Elephanta Caves." },
        { type: "do", text: "Enjoy the sea breeze and iconic views of the historic Taj Mahal Palace Hotel opposite." },
        { type: "dont", text: "Do not accept unsolicited pigeon feed or instant photography from unbadged operators." }
      ],
      nearbyAmenities: {
        restaurants: [
          {
            name: "Cafe Mondegar / Leopold Cafe",
            cuisine: "Historic Irani Cafe, Continental & Beer",
            distance: "400 m (Colaba Causeway)",
            rating: 4.5,
            price: "₹₹",
            safetyVerified: true,
            address: "Colaba Causeway, Mumbai",
            mustTry: "Chilli Chicken & Cold Draught Brew"
          },
          {
            name: "Bademiya",
            cuisine: "Legendary Late-night Kebabs & Rolls",
            distance: "300 m",
            rating: 4.4,
            price: "₹₹",
            safetyVerified: true,
            address: "Tulloch Road, Behind Taj Hotel",
            mustTry: "Mutton Seekh Kebab & Baida Roti"
          }
        ],
        hotels: [
          {
            name: "The Taj Mahal Palace, Mumbai",
            type: "Ultra Luxury 5-Star Heritage",
            distance: "100 m",
            rating: 4.9,
            pricePerNight: "₹24,000+",
            safetyVerified: true,
            contact: "+91 22 6665 3366"
          }
        ],
        transport: [
          {
            type: "Mumbai Kaali-Peeli & Cool Cabs",
            name: "Metered Taxi (Strictly by Meter)",
            detail: "Mumbai taxis run on calibrated digital meters. Minimum fare is ₹28.",
            fare: "₹28 base + ₹18.66/km",
            tip: "Always ask driver to 'Meter down' upon entering."
          },
          {
            type: "Elephanta Island Ferry",
            name: "MTDC Authorized Jetty 1-5",
            detail: "Scenic 1-hour cruise across Mumbai Harbour to cave temples.",
            fare: "₹260 Economy / ₹280 Luxury Upper Deck",
            tip: "Ferries operate every 30 mins from 9:00 AM to 3:30 PM (Closed Mondays)."
          }
        ],
        entertainment: [
          {
            name: "Colaba Causeway Street Shopping",
            type: "Fashion, Antiques & Brassware",
            distance: "350 m",
            timing: "11:00 AM - 9:30 PM",
            rating: 4.6,
            highlight: "Vintage jewelry, bohemian clothing, leather tote bags, and antique clocks."
          }
        ],
        emergency: [
          {
            name: "Colaba Police Station",
            type: "Mumbai Police Tourist Cell",
            distance: "600 m",
            phone: "+91 22 2285 6817 / 112",
            available: "24x7",
            action: "Police Station"
          },
          {
            name: "St. George Hospital & GT Hospital",
            type: "Government Multi-Specialty Hospital",
            distance: "2.1 km (Near CSMT)",
            phone: "+91 22 2262 0241 / 108",
            available: "24x7 Emergency",
            action: "Medical Care"
          }
        ]
      }
    },

    {
      id: "meenakshi-temple",
      name: "Meenakshi Amman Temple",
      city: "Madurai",
      state: "Tamil Nadu",
      category: "Dravidian Architectural Marvel",
      rating: 4.9,
      reviewsCount: "74k+",
      safetyScore: 9.8,
      safetyBadge: "Verified Safe Zone",
      entryTimings: "5:00 AM - 12:30 PM & 4:00 PM - 10:00 PM",
      entryFee: {
        indian: "Free entry / ₹50 (Special Darshan)",
        foreigner: "Free entry (Hall of Thousand Pillars: ₹50)",
        camera: "Phones kept at electronic locker counter"
      },
      image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80"
      ],
      snippet: "A historic Hindu temple complex on the Vaigai River featuring 14 towering gopurams decorated with thousands of colorful mythological stucco figures.",
      history: "Originally built in the 6th century BCE by survivors of Kumari Kandam, reconstructed and expanded between 1623 and 1655 CE by Nayak ruler Thirumalai Nayak.",
      architecture: "Monumental Dravidian temple architecture featuring the Hall of a Thousand Pillars (Aayiram Kaal Mandapam) and the sacred Golden Lotus Pond.",
      dosAndDonts: [
        { type: "do", text: "Follow strict temple dress code: Shoulders & knees covered (Dhotis/pants & sarees/salwars)." },
        { type: "do", text: "Deposit mobile phones and cameras at the official Temple Security Cloakroom at East Tower." },
        { type: "dont", text: "Non-Hindus cannot enter the inner sanctum (garbhagriha), but the entire rest of the complex is open." }
      ],
      nearbyAmenities: {
        restaurants: [
          {
            name: "Murugan Idli Shop (Historic)",
            cuisine: "Authentic South Indian (Fluffy Idlis & Chutneys)",
            distance: "350 m (West Chitrai Street)",
            rating: 4.8,
            price: "₹",
            safetyVerified: true,
            address: "West Tower Street, Madurai",
            mustTry: "Ghee Podi Idli & Jigarthanda drink"
          }
        ],
        hotels: [
          {
            name: "Heritage Madurai",
            type: "Boutique Resort by Geoffrey Bawa",
            distance: "4.5 km",
            rating: 4.8,
            pricePerNight: "₹7,200+",
            safetyVerified: true,
            contact: "+91 452 238 5455"
          }
        ],
        transport: [
          {
            type: "Madurai Junction Railway Station",
            name: "Prepaid Auto Counter",
            detail: "Station is 1.8 km from West Tower. Fixed ₹60 prepaid auto rate.",
            fare: "₹50 - ₹70",
            tip: "Ask auto driver to drop at West Tower Footwear Counter."
          }
        ],
        entertainment: [
          {
            name: "Thirumalai Nayakkar Palace Light Show",
            type: "Historical Palace Sound & Light",
            distance: "1.6 km",
            timing: "6:45 PM (English) & 8:00 PM (Tamil)",
            rating: 4.6,
            highlight: "Massive 17th-century giant stucco pillars and courtyard illuminations."
          }
        ],
        emergency: [
          {
            name: "Temple Police Special Outpost",
            type: "Tamil Nadu Police Temple Squad",
            distance: "100 m (East Tower)",
            phone: "+91 452 234 4360 / 112",
            available: "24x7",
            action: "Police Help"
          },
          {
            name: "Government Rajaji Hospital Madurai",
            type: "Government Medical College Hospital",
            distance: "2.4 km",
            phone: "+91 452 253 2535 / 108",
            available: "24x7 Emergency",
            action: "Medical Care"
          }
        ]
      }
    }
  ],

  // 2. States Exploration (Filter Pills & State Profiles)
  states: [
    { id: "delhi", name: "Delhi", icon: "🏛️", tagline: "The Capital's Heritage & Food Capital", safetyScore: 9.3, topPlaceId: "red-fort" },
    { id: "uttar-pradesh", name: "Uttar Pradesh", icon: "🕌", tagline: "Land of Taj & Spiritual Ghats", safetyScore: 9.4, topPlaceId: "taj-mahal" },
    { id: "rajasthan", name: "Rajasthan", icon: "🏰", tagline: "Royal Forts & Desert Safaris", safetyScore: 9.5, topPlaceId: "hawa-mahal" },
    { id: "maharashtra", name: "Maharashtra", icon: "🌊", tagline: "Gateway to Coastal & Island Forts", safetyScore: 9.6, topPlaceId: "gateway-of-india" },
    { id: "tamil-nadu", name: "Tamil Nadu", icon: "🛕", tagline: "Magnificent Dravidian Temples", safetyScore: 9.8, topPlaceId: "meenakshi-temple" },
    { id: "goa", name: "Goa", icon: "🏖️", tagline: "Sun, Sea & Portuguese Heritage", safetyScore: 9.7, topPlaceId: "taj-mahal" },
    { id: "kerala", name: "Kerala", icon: "🌴", tagline: "God's Own Country & Backwaters", safetyScore: 9.8, topPlaceId: "taj-mahal" },
    { id: "himachal", name: "Himachal Pradesh", icon: "🏔️", tagline: "Snow Peaks & Valley Retreats", safetyScore: 9.8, topPlaceId: "taj-mahal" },
    { id: "sikkim", name: "Sikkim", icon: "🦚", tagline: "Cleanest Himalayan Organic State", safetyScore: 9.9, topPlaceId: "taj-mahal" },
    { id: "jharkhand", name: "Jharkhand", icon: "🌲", tagline: "Untouched Waterfalls & Tribal Culture", safetyScore: 9.4, topPlaceId: "taj-mahal" }
  ],

  // 3. Recommended Hidden Gems & Eco-Tourism
  recommendations: [
    {
      id: "sikkim-gangtok",
      name: "Gangtok & Tsomgo Lake",
      state: "Sikkim",
      region: "Northeast Himalayas",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
      rating: 4.9,
      safetyScore: 9.9,
      badge: "Eco & Safe Choice",
      bestSeason: "Mar - Jun & Oct - Dec",
      highlight: "100% organic state with zero plastic litter, peaceful monasteries, and snow-capped Kanchenjunga views."
    },
    {
      id: "jharkhand-betla",
      name: "Betla National Park & Netarhat",
      state: "Jharkhand",
      region: "Chota Nagpur Plateau",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
      rating: 4.6,
      safetyScore: 9.4,
      badge: "Offbeat Gem",
      bestSeason: "Nov - Mar",
      highlight: "Tigers, wild elephants, 16th-century Chero dynasty forts, and mesmerizing sunsets at 'Queen of Chotanagpur'."
    },
    {
      id: "kerala-munnar",
      name: "Munnar Tea Valleys",
      state: "Kerala",
      region: "Western Ghats",
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=700&q=80",
      rating: 4.9,
      safetyScore: 9.8,
      badge: "Wellness & Nature",
      bestSeason: "Sep - May",
      highlight: "Misty rolling green tea estates, Ayurvedic wellness retreats, and rare Nilgiri Tahr wildlife."
    },
    {
      id: "rajasthan-udaipur",
      name: "Lake Pichola & City Palace",
      state: "Rajasthan",
      region: "Mewar",
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=700&q=80",
      rating: 4.8,
      safetyScore: 9.7,
      badge: "Romantic City",
      bestSeason: "Oct - Mar",
      highlight: "The City of Lakes with illuminated floating marble palaces and sunset boat cruises."
    }
  ],

  // 4. Translation Phrasebook & Pronunciation Guide
  phrases: [
    {
      category: "emergency",
      title: "🚨 Emergency & Safety",
      items: [
        {
          id: "p1",
          en: "Please help me!",
          hi: "कृपया मेरी मदद करें!",
          translit: "Kripya meri madad karein!",
          audioHint: "KREEP-yah MAY-ree MUH-dud kuh-RAIN",
          context: "Use in urgent distress to grab public attention."
        },
        {
          id: "p2",
          en: "Where is the police station?",
          hi: "पुलिस स्टेशन कहाँ है?",
          translit: "Police station kahan hai?",
          audioHint: "Police station kuh-HAAN hai?",
          context: "Ask bystanders or shopkeepers."
        },
        {
          id: "p3",
          en: "I need a doctor / hospital urgently.",
          hi: "मुझे तुरंत डॉक्टर / अस्पताल चाहिए।",
          translit: "Mujhe turant doctor / aspatal chahiye.",
          audioHint: "MOO-jhay too-RUNT doctor / us-puh-TAAL chah-HEE-yay.",
          context: "Medical emergency."
        },
        {
          id: "p4",
          en: "I am feeling unsafe. Please stay away.",
          hi: "मैं असहज महसूस कर रहा हूँ। कृपया दूर रहें।",
          translit: "Main asahaj mehsoos kar raha hoon. Kripya door rahein.",
          audioHint: "Main uh-SUH-hudge meh-SOOS kar ruh-HA hoon. KREEP-yah door ruh-HAIN.",
          context: "To stop pushy touts or harassment."
        }
      ]
    },
    {
      category: "transport",
      title: "🚕 Transport & Fares",
      items: [
        {
          id: "p5",
          en: "Brother, please turn on the meter.",
          hi: "भैया, मीटर चालू कीजिए।",
          translit: "Bhaiya, meter chalu kijiye.",
          audioHint: "BHY-yah, MEE-ter CHAH-loo KEE-jee-yay.",
          context: "Crucial for auto/taxis to prevent overcharging!"
        },
        {
          id: "p6",
          en: "How much will it cost to go to the Railway Station?",
          hi: "रेलवे स्टेशन जाने का कितना लगेगा?",
          translit: "Railway station jaane ka kitna lagega?",
          audioHint: "Railway station JAH-nay kah KIT-nah luh-GAY-gah?",
          context: "Negotiating fixed fare."
        },
        {
          id: "p7",
          en: "Please stop here.",
          hi: "कृपया यहाँ रोक दीजिए।",
          translit: "Kripya yahan rok dijiye.",
          audioHint: "KREEP-yah yuh-HAAN roak DEE-jee-yay.",
          context: "When arriving at your destination."
        }
      ]
    },
    {
      category: "shopping",
      title: "🛍️ Shopping & Bargaining",
      items: [
        {
          id: "p8",
          en: "What is the price of this?",
          hi: "इसका क्या दाम है?",
          translit: "Iska kya daam hai?",
          audioHint: "IS-kah kyah DAHM hai?",
          context: "General price inquiry."
        },
        {
          id: "p9",
          en: "This is too expensive. Can you give a discount?",
          hi: "यह बहुत महँगा है। कुछ कम करिए।",
          translit: "Yeh bahut mehenga hai. Kuch kam kariye.",
          audioHint: "Yeh buh-HOOT meh-HEN-gah hai. Kooch kum KUH-ree-yay.",
          context: "Standard polite Indian bargaining phrase."
        },
        {
          id: "p10",
          en: "Can I pay with UPI / Google Pay / Card?",
          hi: "क्या मैं UPI / ऑनलाइन पेमेंट कर सकता हूँ?",
          translit: "Kya main UPI / online payment kar sakta hoon?",
          audioHint: "Kyah main UPI / online payment kur SUK-tah hoon?",
          context: "Almost 99% of Indian vendors accept UPI QR codes."
        }
      ]
    },
    {
      category: "food",
      title: "🍛 Food, Water & Hygiene",
      items: [
        {
          id: "p11",
          en: "Please make it less spicy (mild).",
          hi: "कृपया कम मिर्च डालिए (मीडियम स्पाइसी)।",
          translit: "Kripya kam mirch daaliye.",
          audioHint: "KREEP-yah kum MEERCH dah-LEE-yay.",
          context: "When ordering at local restaurants."
        },
        {
          id: "p12",
          en: "Please give sealed packaged mineral water.",
          hi: "कृपया सीलबंद मिनरल वाटर दीजिए।",
          translit: "Kripya seal-band mineral water dijiye.",
          audioHint: "KREEP-yah SEAL-bund mineral water DEE-jee-yay.",
          context: "Safe drinking water practice."
        },
        {
          id: "p13",
          en: "Is this food purely vegetarian?",
          hi: "क्या यह खाना पूरी तरह शाकाहारी है?",
          translit: "Kya yeh khana poori tarah shakahari hai?",
          audioHint: "Kyah yeh KHAH-nah POO-ree tuh-RUH shah-kah-HAH-ree hai?",
          context: "Dietary check."
        }
      ]
    }
  ],

  // 5. Common Tourist Scams & Safety Advisory Rules
  scamsGuide: [
    {
      title: "The 'Monument is Closed Today' Trap",
      scam: "Auto/cab drivers claim the monument is shut for prayer/festival and offer to take you to an expensive emporium instead.",
      prevention: "Monuments like Taj Mahal only close on Fridays. Always check our live in-app timings or ask uniformed police at entry."
    },
    {
      title: "Unlicensed 'Government Guide' Badge Scam",
      scam: "Touts wear laminated fake badges claiming to be 'official guides' and charge 10x or steer you to commission shops.",
      prevention: "Official ASI guides have official holograms. Book them only at the monument ticket office window."
    },
    {
      title: "The Broken Meter Auto Excuse",
      scam: "Driver claims meter is faulty and quotes arbitrary inflated tourist prices (e.g. ₹500 for a 2km ride).",
      prevention: "Use our AI Fare Advisor before agreeing, or insist on app cabs (Uber/Ola) or prepaid police stands."
    },
    {
      title: "Free Gemstone / Export Schemes",
      scam: "Friendly strangers offer you free gemstones to carry abroad for tax-free commission.",
      prevention: "Never accept items from strangers. It is an internationally recognized financial courier scam."
    }
  ],

  // 6. Pre-calculated Fare Scenarios for AI Advisor
  fareMatrix: [
    {
      keywords: ["delhi", "railway", "red fort", "station", "chandni"],
      route: "New Delhi Railway Station ➔ Red Fort (Old Delhi)",
      distanceKm: "4.5 km",
      greenZone: { min: 40, max: 70, label: "Fair Government Meter / Prepaid Rate (₹40 - ₹70)" },
      yellowZone: { min: 80, max: 120, label: "Acceptable Peak / Tourist Rate (₹80 - ₹120)" },
      redZone: { min: 150, max: 500, label: "SCAM ALERT! Overpriced (₹150+)" },
      recommendation: "Take the Violet Line Metro from Delhi Gate or use the authorized Delhi Police prepaid booth outside Paharganj exit."
    },
    {
      keywords: ["agra", "cantt", "taj", "taj mahal", "east gate"],
      route: "Agra Cantt Railway Station ➔ Taj Mahal East Gate",
      distanceKm: "6.2 km",
      greenZone: { min: 100, max: 150, label: "Fair Prepaid Auto Rate (₹100 - ₹150)" },
      yellowZone: { min: 160, max: 220, label: "Tourist Cab / Peak Auto (₹160 - ₹220)" },
      redZone: { min: 300, max: 1000, label: "SCAM ALERT! Tourist Gouging (₹300+)" },
      recommendation: "Book from the UP Police Prepaid Booth on Platform 1. Electric golf cart shuttles to Taj gate are free/₹10."
    },
    {
      keywords: ["jaipur", "airport", "hawa mahal", "city palace"],
      route: "Jaipur International Airport ➔ Hawa Mahal (Pink City)",
      distanceKm: "12.8 km",
      greenZone: { min: 250, max: 350, label: "Fair App Cab / Prepaid Taxi (₹250 - ₹350)" },
      yellowZone: { min: 360, max: 480, label: "Peak Surge Pricing (₹360 - ₹480)" },
      redZone: { min: 600, max: 1500, label: "SCAM ALERT! Airport Tout Rip-off (₹600+)" },
      recommendation: "Use the official airport prepaid taxi kiosk or Pink City Metro from nearest station."
    },
    {
      keywords: ["mumbai", "csmt", "gateway", "colaba"],
      route: "CSMT Terminal ➔ Gateway of India (Colaba)",
      distanceKm: "3.1 km",
      greenZone: { min: 35, max: 55, label: "Strict Meter Rate (₹35 - ₹55)" },
      yellowZone: { min: 60, max: 90, label: "Heavy Traffic Rush Hour (₹60 - ₹90)" },
      redZone: { min: 120, max: 400, label: "SCAM ALERT! Unmetered refusal (₹120+)" },
      recommendation: "Mumbai taxis must run on calibrated meter. Politely say 'Bhaiya meter chalu kijiye' or report refusal to traffic police."
    }
  ],

  // 7. Emergency Quick Numbers
  emergencyContacts: [
    { code: "112", title: "National Emergency", desc: "Police, Fire, Medical Services (All-in-One)", color: "rose" },
    { code: "1363", title: "Ministry of Tourism Helpline", desc: "24x7 Multi-lingual Tourist Support (12 Languages)", color: "blue" },
    { code: "108", title: "Ambulance & Medical", desc: "Government Rapid Emergency Medical Care", color: "emerald" },
    { code: "1091", title: "Women Helpline", desc: "24x7 Dedicated Women Safety Cell", color: "purple" },
    { code: "1077", title: "Disaster Management", desc: "State Relief & Natural Weather Assistance", color: "amber" }
  ]
};

// Export to window for global browser usage
window.APP_DATA = APP_DATA;
