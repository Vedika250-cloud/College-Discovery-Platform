export interface Review {
 user: string;
 rating: number;
 comment: string;
}

export interface College {
 id: string;
 name: string;
 location: string;
 ownership: "Public" | "Private";
 courses: string[];
 fees: number;
 placements: number;
 rankings: number;
 description: string;
 hostelAvailability: boolean;
 gallery: string[];
 reviews: Review[];
}

export const colleges: College[] = [
 {
 "id": "1",
 "name": "Indian Institute of Technology Bombay",
 "location": "City 10, Uttar Pradesh",
 "ownership": "Public",
 "courses": [
 "Mechatronics and Automation",
 "Aerospace and Design",
 "Robotics and Engineering",
 "Production Engineering",
 "Mechanical and Management",
 "Computer Science & Communication",
 "Mechanical with Specialization in AI",
 "Machine Learning & Communication",
 "Chemical with Specialization in AI",
 "Civil with Data Analytics"
 ],
 "fees": 186049,
 "placements": 2496162,
 "rankings": 1,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Bombay offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.957842314521798,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.752780958430643,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "2",
 "name": "Indian Institute of Technology Delhi",
 "location": "City 7, Uttar Pradesh",
 "ownership": "Public",
 "courses": [
 "Cyber Security Engineering",
 "Mechanical & Communication",
 "Mechatronics Engineering",
 "Machine Learning Engineering",
 "Artificial Intelligence & Electronics",
 "Chemical & Communication",
 "Robotics & Communication",
 "Mining & Electronics",
 "Cyber Security Technology",
 "Production & Communication",
 "Production Technology",
 "Biotechnology with Specialization in AI",
 "Civil and Engineering",
 "Machine Learning Technology"
 ],
 "fees": 197993,
 "placements": 2481596,
 "rankings": 2,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Delhi offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.5698214897839105,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.775134204964161,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "3",
 "name": "Indian Institute of Technology Madras",
 "location": "City 0, Punjab",
 "ownership": "Public",
 "courses": [
 "Chemical and Design",
 "Electronics Engineering",
 "Mechatronics & Electronics",
 "Data Science and Design",
 "Textile with Data Analytics",
 "Computer Science Technology",
 "Machine Learning Engineering",
 "Production Technology",
 "Mechatronics Technology",
 "Civil with Data Analytics",
 "Mechanical & Electronics",
 "Robotics with Data Analytics",
 "Mining & Electronics",
 "Aerospace & Communication"
 ],
 "fees": 159230,
 "placements": 1526161,
 "rankings": 3,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Madras offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.686339695519348,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.284380997336106,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "4",
 "name": "Indian Institute of Technology Kanpur",
 "location": "City 2, West Bengal",
 "ownership": "Public",
 "courses": [
 "Information Technology Engineering",
 "Aerospace & Electronics",
 "Computer Science Engineering",
 "Artificial Intelligence Engineering",
 "Computer Science and Design",
 "Chemical & Communication",
 "Biotechnology and Design",
 "Mechanical and Management",
 "Mining & Communication",
 "Mechanical and Automation",
 "Metallurgy & Electronics",
 "Automobile & Communication",
 "Chemical Technology",
 "Computer Science & Communication"
 ],
 "fees": 201946,
 "placements": 1753548,
 "rankings": 4,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Kanpur offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.28856185449314,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.537212467436527,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "5",
 "name": "Indian Institute of Technology Kharagpur",
 "location": "City 5, Telangana",
 "ownership": "Public",
 "courses": [
 "Artificial Intelligence and Management",
 "Electrical and Automation",
 "Aerospace and Engineering",
 "Data Science and Design",
 "Civil & Electronics",
 "Civil with Specialization in AI",
 "Electrical and Design",
 "Aerospace and Design",
 "Robotics and Engineering",
 "Biotechnology Engineering",
 "Artificial Intelligence and Automation"
 ],
 "fees": 176251,
 "placements": 1607163,
 "rankings": 5,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Kharagpur offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.924463359436052,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.8428807903710744,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "6",
 "name": "Indian Institute of Technology Roorkee",
 "location": "City 10, Maharashtra",
 "ownership": "Public",
 "courses": [
 "Civil with Data Analytics",
 "Mining and Automation",
 "Robotics Engineering",
 "Automobile with Data Analytics",
 "Electronics & Electronics",
 "Data Science and Engineering",
 "Computer Science and Management",
 "Mechatronics and Automation",
 "Information Technology with Specialization in AI",
 "Artificial Intelligence and Design",
 "Machine Learning Engineering",
 "Computer Science with Data Analytics",
 "Civil and Engineering",
 "Computer Science with Specialization in AI",
 "Machine Learning and Engineering"
 ],
 "fees": 223270,
 "placements": 2490195,
 "rankings": 6,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Roorkee offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.495675124092839,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.6118283712369834,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "7",
 "name": "Indian Institute of Technology Guwahati",
 "location": "City 2, Rajasthan",
 "ownership": "Public",
 "courses": [
 "Production and Automation",
 "Computer Science Technology",
 "Aerospace and Design",
 "Textile and Design",
 "Artificial Intelligence and Management",
 "Instrumentation Technology",
 "Textile & Electronics",
 "Computer Science and Automation",
 "Mechanical and Automation",
 "Robotics and Design",
 "Robotics Technology"
 ],
 "fees": 173873,
 "placements": 1722653,
 "rankings": 7,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Guwahati offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.107971538393745,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.248751148622447,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "8",
 "name": "Indian Institute of Technology Hyderabad",
 "location": "City 7, Telangana",
 "ownership": "Public",
 "courses": [
 "Information Technology & Electronics",
 "Civil with Specialization in AI",
 "Mining & Communication",
 "Robotics and Engineering",
 "Artificial Intelligence with Specialization in AI",
 "Mechanical and Automation",
 "Metallurgy Engineering",
 "Chemical & Communication",
 "Electrical and Automation",
 "Chemical & Electronics",
 "Artificial Intelligence and Management",
 "Information Technology and Engineering",
 "Biotechnology with Specialization in AI",
 "Artificial Intelligence with Data Analytics",
 "Instrumentation with Specialization in AI"
 ],
 "fees": 185329,
 "placements": 2028169,
 "rankings": 8,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Hyderabad offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.234041711325861,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.8452019783568074,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "9",
 "name": "Indian Institute of Technology Indore",
 "location": "City 0, Karnataka",
 "ownership": "Public",
 "courses": [
 "Biotechnology & Electronics",
 "Electrical with Data Analytics",
 "Mining & Electronics",
 "Chemical Technology",
 "Aerospace and Engineering",
 "Robotics with Specialization in AI",
 "Civil with Specialization in AI",
 "Metallurgy and Engineering",
 "Cyber Security & Electronics",
 "Computer Science and Automation",
 "Robotics and Engineering",
 "Mining and Design",
 "Production & Electronics",
 "Data Science and Engineering",
 "Data Science and Automation"
 ],
 "fees": 192104,
 "placements": 1655847,
 "rankings": 9,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology Indore offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.555520713448564,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.153831762209284,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "10",
 "name": "Indian Institute of Technology BHU Varanasi",
 "location": "City 17, Delhi",
 "ownership": "Public",
 "courses": [
 "Civil with Specialization in AI",
 "Machine Learning and Management",
 "Biotechnology and Automation",
 "Data Science and Engineering",
 "Metallurgy and Engineering",
 "Aerospace Engineering",
 "Cyber Security with Data Analytics",
 "Data Science with Specialization in AI",
 "Textile & Communication",
 "Robotics with Data Analytics",
 "Machine Learning with Data Analytics",
 "Automobile and Design",
 "Mining and Management"
 ],
 "fees": 224969,
 "placements": 1830378,
 "rankings": 10,
 "description": "A premier institution for engineering and technology. Indian Institute of Technology BHU Varanasi offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.632688148127766,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.7912557957552453,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "11",
 "name": "National Institute of Technology Trichy",
 "location": "City 4, Delhi",
 "ownership": "Public",
 "courses": [
 "Textile and Engineering",
 "Metallurgy and Design",
 "Data Science and Management",
 "Mining and Engineering",
 "Production and Engineering",
 "Mechanical with Specialization in AI",
 "Robotics and Design",
 "Civil and Engineering",
 "Artificial Intelligence and Engineering",
 "Computer Science & Communication",
 "Aerospace with Specialization in AI",
 "Metallurgy & Communication",
 "Automobile with Data Analytics"
 ],
 "fees": 245572,
 "placements": 2418459,
 "rankings": 11,
 "description": "A premier institution for engineering and technology. National Institute of Technology Trichy offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.809607600260924,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.155232340328956,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "12",
 "name": "National Institute of Technology Surathkal",
 "location": "City 5, West Bengal",
 "ownership": "Public",
 "courses": [
 "Machine Learning & Communication",
 "Electronics with Specialization in AI",
 "Biotechnology and Automation",
 "Civil with Specialization in AI",
 "Cyber Security with Data Analytics",
 "Information Technology with Data Analytics",
 "Electronics Engineering",
 "Production with Specialization in AI",
 "Information Technology and Design",
 "Biotechnology Engineering",
 "Information Technology & Communication"
 ],
 "fees": 176688,
 "placements": 2008813,
 "rankings": 12,
 "description": "A premier institution for engineering and technology. National Institute of Technology Surathkal offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.030318489074063,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.495655479535958,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "13",
 "name": "National Institute of Technology Warangal",
 "location": "City 18, Gujarat",
 "ownership": "Public",
 "courses": [
 "Robotics and Engineering",
 "Instrumentation and Design",
 "Instrumentation Technology",
 "Data Science Technology",
 "Mechatronics and Management",
 "Artificial Intelligence and Design",
 "Data Science and Management",
 "Robotics and Automation",
 "Chemical Technology",
 "Electronics with Specialization in AI",
 "Metallurgy Engineering",
 "Data Science with Data Analytics",
 "Data Science and Design"
 ],
 "fees": 198038,
 "placements": 2460986,
 "rankings": 13,
 "description": "A premier institution for engineering and technology. National Institute of Technology Warangal offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.9862348433458425,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.843979101422039,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "14",
 "name": "National Institute of Technology Rourkela",
 "location": "City 4, Karnataka",
 "ownership": "Public",
 "courses": [
 "Artificial Intelligence & Communication",
 "Electronics & Communication",
 "Computer Science and Engineering",
 "Mechatronics with Specialization in AI",
 "Production and Design",
 "Metallurgy and Management",
 "Mining and Engineering",
 "Mechatronics and Engineering",
 "Mechatronics and Automation",
 "Instrumentation Engineering",
 "Data Science and Automation",
 "Biotechnology Engineering",
 "Textile Engineering",
 "Cyber Security and Management"
 ],
 "fees": 189621,
 "placements": 2336974,
 "rankings": 14,
 "description": "A premier institution for engineering and technology. National Institute of Technology Rourkela offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.26607850708179,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.9636552771081597,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "15",
 "name": "National Institute of Technology Calicut",
 "location": "City 0, Uttar Pradesh",
 "ownership": "Public",
 "courses": [
 "Metallurgy and Design",
 "Information Technology Technology",
 "Aerospace and Engineering",
 "Automobile and Management",
 "Chemical & Communication",
 "Textile with Data Analytics",
 "Artificial Intelligence and Engineering",
 "Robotics with Data Analytics",
 "Instrumentation and Management",
 "Mining Technology",
 "Computer Science and Design",
 "Information Technology and Automation"
 ],
 "fees": 190964,
 "placements": 1602904,
 "rankings": 15,
 "description": "A premier institution for engineering and technology. National Institute of Technology Calicut offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.831389496294369,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.056279867732713,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "16",
 "name": "Motilal Nehru National Institute of Technology Allahabad",
 "location": "City 8, Delhi",
 "ownership": "Public",
 "courses": [
 "Chemical with Data Analytics",
 "Mechanical Engineering",
 "Aerospace Engineering",
 "Automobile & Electronics",
 "Production with Specialization in AI",
 "Mechatronics with Specialization in AI",
 "Electrical with Specialization in AI",
 "Instrumentation Technology",
 "Civil with Data Analytics",
 "Metallurgy with Specialization in AI",
 "Instrumentation Engineering",
 "Electrical and Automation"
 ],
 "fees": 197408,
 "placements": 2206422,
 "rankings": 16,
 "description": "A premier institution for engineering and technology. Motilal Nehru National Institute of Technology Allahabad offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.936555642699227,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.8579031749435577,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "17",
 "name": "Malaviya National Institute of Technology Jaipur",
 "location": "City 15, Telangana",
 "ownership": "Public",
 "courses": [
 "Computer Science Engineering",
 "Chemical & Electronics",
 "Information Technology and Design",
 "Mechanical & Communication",
 "Metallurgy & Communication",
 "Machine Learning and Engineering",
 "Automobile with Specialization in AI",
 "Automobile and Management",
 "Information Technology and Automation",
 "Electronics with Specialization in AI",
 "Mechatronics & Electronics",
 "Aerospace Technology",
 "Artificial Intelligence and Management",
 "Chemical and Design"
 ],
 "fees": 182620,
 "placements": 2271896,
 "rankings": 17,
 "description": "A premier institution for engineering and technology. Malaviya National Institute of Technology Jaipur offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.186970667942553,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.299148808023229,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "18",
 "name": "IIIT Hyderabad",
 "location": "City 6, Rajasthan",
 "ownership": "Public",
 "courses": [
 "Chemical with Specialization in AI",
 "Biotechnology with Specialization in AI",
 "Textile Engineering",
 "Metallurgy Engineering",
 "Textile Technology",
 "Robotics with Specialization in AI",
 "Mining with Specialization in AI",
 "Machine Learning and Management",
 "Automobile Technology",
 "Information Technology and Design",
 "Automobile Engineering",
 "Biotechnology Technology",
 "Machine Learning & Communication"
 ],
 "fees": 205808,
 "placements": 3240388,
 "rankings": 18,
 "description": "A premier institution for engineering and technology. IIIT Hyderabad offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.036110645023764,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.484966548118748,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "19",
 "name": "IIIT Allahabad",
 "location": "City 17, Uttar Pradesh",
 "ownership": "Public",
 "courses": [
 "Artificial Intelligence & Electronics",
 "Computer Science and Design",
 "Mining and Automation",
 "Machine Learning with Specialization in AI",
 "Information Technology and Automation",
 "Civil and Management",
 "Automobile with Data Analytics",
 "Data Science Engineering",
 "Electrical & Communication",
 "Civil Engineering",
 "Electrical and Automation",
 "Artificial Intelligence and Engineering"
 ],
 "fees": 221743,
 "placements": 1826349,
 "rankings": 19,
 "description": "A premier institution for engineering and technology. IIIT Allahabad offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.112489859542727,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.361668835600573,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "20",
 "name": "IIIT Bangalore",
 "location": "City 4, Maharashtra",
 "ownership": "Public",
 "courses": [
 "Mining with Specialization in AI",
 "Mechatronics with Specialization in AI",
 "Electronics with Data Analytics",
 "Automobile & Communication",
 "Chemical and Management",
 "Mining with Data Analytics",
 "Cyber Security with Specialization in AI",
 "Metallurgy and Design",
 "Chemical & Communication",
 "Mining Technology",
 "Machine Learning Technology",
 "Information Technology Engineering",
 "Textile and Design",
 "Machine Learning & Electronics"
 ],
 "fees": 230527,
 "placements": 2000884,
 "rankings": 20,
 "description": "A premier institution for engineering and technology. IIIT Bangalore offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.5690293620662015,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.8284982453939893,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "21",
 "name": "IIIT Delhi",
 "location": "City 17, Punjab",
 "ownership": "Public",
 "courses": [
 "Robotics Engineering",
 "Data Science with Data Analytics",
 "Machine Learning and Engineering",
 "Data Science Engineering",
 "Automobile & Communication",
 "Data Science & Communication",
 "Metallurgy with Data Analytics",
 "Instrumentation and Engineering",
 "Machine Learning with Specialization in AI",
 "Information Technology & Electronics",
 "Automobile and Engineering",
 "Data Science with Specialization in AI",
 "Electronics Technology",
 "Biotechnology and Management"
 ],
 "fees": 214775,
 "placements": 1967592,
 "rankings": 21,
 "description": "A premier institution for engineering and technology. IIIT Delhi offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.854215085635117,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.40979822800783,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "22",
 "name": "IIIT Pune",
 "location": "City 11, Maharashtra",
 "ownership": "Public",
 "courses": [
 "Instrumentation Technology",
 "Artificial Intelligence and Management",
 "Cyber Security and Management",
 "Electrical Engineering",
 "Robotics and Automation",
 "Robotics Technology",
 "Cyber Security Engineering",
 "Electronics and Design",
 "Civil with Specialization in AI",
 "Data Science and Automation",
 "Civil & Communication",
 "Mining and Management"
 ],
 "fees": 204222,
 "placements": 1599809,
 "rankings": 22,
 "description": "A premier institution for engineering and technology. IIIT Pune offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": false,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.919240222643502,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.2101149978438706,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "23",
 "name": "BITS Pilani",
 "location": "City 15, Maharashtra",
 "ownership": "Private",
 "courses": [
 "Cyber Security & Electronics",
 "Mechatronics & Communication",
 "Aerospace and Management",
 "Aerospace and Engineering",
 "Computer Science & Electronics",
 "Textile & Electronics",
 "Biotechnology & Electronics",
 "Mining Technology",
 "Machine Learning and Engineering",
 "Mining and Automation",
 "Computer Science and Engineering",
 "Biotechnology Engineering",
 "Mechanical Engineering"
 ],
 "fees": 592741,
 "placements": 2187989,
 "rankings": 23,
 "description": "A premier institution for engineering and technology. BITS Pilani offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.273866730657204,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.8663687640684463,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "24",
 "name": "BITS Goa",
 "location": "City 16, Karnataka",
 "ownership": "Private",
 "courses": [
 "Chemical & Electronics",
 "Information Technology with Specialization in AI",
 "Biotechnology & Electronics",
 "Data Science and Design",
 "Production and Design",
 "Chemical with Specialization in AI",
 "Electrical Technology",
 "Aerospace & Communication",
 "Chemical & Communication",
 "Civil Engineering"
 ],
 "fees": 417979,
 "placements": 2254091,
 "rankings": 24,
 "description": "A premier institution for engineering and technology. BITS Goa offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.419086089880771,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.441613229698615,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "25",
 "name": "BITS Hyderabad",
 "location": "City 2, Uttar Pradesh",
 "ownership": "Private",
 "courses": [
 "Metallurgy Engineering",
 "Electrical Technology",
 "Textile with Specialization in AI",
 "Production and Design",
 "Electronics and Management",
 "Computer Science and Design",
 "Chemical and Management",
 "Chemical and Engineering",
 "Artificial Intelligence with Specialization in AI",
 "Aerospace & Electronics",
 "Machine Learning and Design",
 "Civil and Management",
 "Metallurgy and Design",
 "Data Science with Specialization in AI"
 ],
 "fees": 575402,
 "placements": 1940834,
 "rankings": 25,
 "description": "A premier institution for engineering and technology. BITS Hyderabad offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.3121456474867195,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.091159017713596,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "26",
 "name": "Vellore Institute of Technology",
 "location": "City 4, Rajasthan",
 "ownership": "Public",
 "courses": [
 "Biotechnology and Design",
 "Artificial Intelligence Technology",
 "Biotechnology Technology",
 "Textile and Design",
 "Artificial Intelligence and Management",
 "Computer Science with Data Analytics",
 "Metallurgy & Electronics",
 "Instrumentation with Specialization in AI",
 "Electrical and Automation",
 "Information Technology with Specialization in AI",
 "Robotics & Communication",
 "Instrumentation with Data Analytics"
 ],
 "fees": 212177,
 "placements": 2011872,
 "rankings": 26,
 "description": "A premier institution for engineering and technology. Vellore Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.495346714133969,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.005969803328409,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "27",
 "name": "VIT Chennai",
 "location": "City 17, Punjab",
 "ownership": "Private",
 "courses": [
 "Production and Automation",
 "Electrical with Specialization in AI",
 "Textile and Engineering",
 "Automobile with Data Analytics",
 "Artificial Intelligence and Automation",
 "Artificial Intelligence & Electronics",
 "Biotechnology and Management",
 "Mechatronics with Specialization in AI",
 "Information Technology & Communication",
 "Electrical & Communication",
 "Biotechnology Engineering",
 "Production with Data Analytics",
 "Computer Science & Electronics",
 "Computer Science Technology",
 "Data Science and Management"
 ],
 "fees": 689484,
 "placements": 826556,
 "rankings": 27,
 "description": "A premier institution for engineering and technology. VIT Chennai offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.849531373701085,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.206493828137226,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "28",
 "name": "SRM Institute of Science and Technology",
 "location": "City 5, Punjab",
 "ownership": "Private",
 "courses": [
 "Mechanical Engineering",
 "Electrical and Management",
 "Automobile with Specialization in AI",
 "Cyber Security Engineering",
 "Instrumentation and Engineering",
 "Mechanical with Specialization in AI",
 "Instrumentation and Automation",
 "Electronics and Design",
 "Artificial Intelligence & Electronics",
 "Electrical and Engineering",
 "Mechatronics with Data Analytics"
 ],
 "fees": 661390,
 "placements": 886196,
 "rankings": 28,
 "description": "A premier institution for engineering and technology. SRM Institute of Science and Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.246186776414777,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.447808907265479,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "29",
 "name": "Delhi Technological University",
 "location": "City 18, Telangana",
 "ownership": "Public",
 "courses": [
 "Civil and Management",
 "Electronics Engineering",
 "Civil & Electronics",
 "Artificial Intelligence with Specialization in AI",
 "Mechanical and Automation",
 "Textile and Engineering",
 "Aerospace & Electronics",
 "Civil and Automation",
 "Biotechnology Technology",
 "Textile and Design",
 "Data Science Engineering"
 ],
 "fees": 164926,
 "placements": 1646419,
 "rankings": 29,
 "description": "A premier institution for engineering and technology. Delhi Technological University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": false,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.593035806927016,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.7592372677105086,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "30",
 "name": "Netaji Subhas University of Technology",
 "location": "City 6, Gujarat",
 "ownership": "Public",
 "courses": [
 "Mechatronics and Design",
 "Automobile & Communication",
 "Metallurgy Engineering",
 "Production & Electronics",
 "Data Science Technology",
 "Computer Science Engineering",
 "Mechanical & Communication",
 "Textile and Automation",
 "Mining and Design",
 "Electrical Technology",
 "Electrical and Automation"
 ],
 "fees": 244330,
 "placements": 2385793,
 "rankings": 30,
 "description": "A premier institution for engineering and technology. Netaji Subhas University of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.982833390716774,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.10142105700396,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "31",
 "name": "The LNM Institute of Information Technology",
 "location": "City 15, Rajasthan",
 "ownership": "Private",
 "courses": [
 "Mechatronics and Design",
 "Information Technology with Data Analytics",
 "Mechatronics and Automation",
 "Machine Learning and Design",
 "Mechanical and Automation",
 "Mechatronics and Management",
 "Computer Science Engineering",
 "Artificial Intelligence and Management",
 "Artificial Intelligence and Engineering",
 "Machine Learning with Data Analytics",
 "Computer Science & Electronics",
 "Information Technology and Engineering",
 "Chemical and Automation"
 ],
 "fees": 562998,
 "placements": 926260,
 "rankings": 31,
 "description": "A premier institution for engineering and technology. The LNM Institute of Information Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.680757170589441,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.682283148713103,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "32",
 "name": "Thapar Institute of Engineering and Technology",
 "location": "City 6, Punjab",
 "ownership": "Private",
 "courses": [
 "Information Technology and Management",
 "Computer Science with Specialization in AI",
 "Mechanical and Engineering",
 "Data Science & Communication",
 "Mechanical with Data Analytics",
 "Aerospace & Electronics",
 "Instrumentation and Engineering",
 "Civil & Communication",
 "Information Technology & Communication",
 "Cyber Security and Engineering",
 "Artificial Intelligence with Specialization in AI",
 "Computer Science & Communication"
 ],
 "fees": 416783,
 "placements": 1298602,
 "rankings": 32,
 "description": "A premier institution for engineering and technology. Thapar Institute of Engineering and Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.295258040519496,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.573313374494158,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "33",
 "name": "Jadavpur University",
 "location": "City 18, Rajasthan",
 "ownership": "Private",
 "courses": [
 "Instrumentation and Automation",
 "Chemical Engineering",
 "Mining & Communication",
 "Mechanical and Engineering",
 "Information Technology with Data Analytics",
 "Mechatronics and Management",
 "Machine Learning and Automation",
 "Aerospace and Automation",
 "Aerospace & Communication",
 "Data Science and Management",
 "Electrical & Communication",
 "Metallurgy Engineering",
 "Electronics Technology",
 "Automobile Engineering",
 "Information Technology Technology"
 ],
 "fees": 543636,
 "placements": 1368809,
 "rankings": 33,
 "description": "A premier institution for engineering and technology. Jadavpur University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.477996752989199,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.304614673394844,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "34",
 "name": "Manipal Institute of Technology",
 "location": "City 1, Delhi",
 "ownership": "Public",
 "courses": [
 "Robotics and Design",
 "Electrical and Design",
 "Biotechnology & Communication",
 "Mechanical and Management",
 "Biotechnology and Management",
 "Chemical and Automation",
 "Electrical Technology",
 "Robotics with Data Analytics",
 "Machine Learning and Design",
 "Mining and Automation",
 "Aerospace with Data Analytics",
 "Instrumentation & Communication",
 "Mining and Design"
 ],
 "fees": 198653,
 "placements": 2312808,
 "rankings": 34,
 "description": "A premier institution for engineering and technology. Manipal Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.337790451411048,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.940459938075351,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "35",
 "name": "Amity University Noida",
 "location": "City 11, Tamil Nadu",
 "ownership": "Private",
 "courses": [
 "Textile with Data Analytics",
 "Mechanical and Automation",
 "Cyber Security with Specialization in AI",
 "Robotics & Electronics",
 "Cyber Security and Automation",
 "Machine Learning & Electronics",
 "Electronics & Electronics",
 "Machine Learning Technology",
 "Information Technology and Management",
 "Artificial Intelligence and Automation",
 "Biotechnology with Data Analytics",
 "Computer Science & Communication",
 "Electrical and Engineering",
 "Cyber Security Technology"
 ],
 "fees": 322832,
 "placements": 861613,
 "rankings": 35,
 "description": "A premier institution for engineering and technology. Amity University Noida offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.3475787877449354,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.9059536601906455,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "36",
 "name": "Shiv Nadar University",
 "location": "City 13, Maharashtra",
 "ownership": "Private",
 "courses": [
 "Machine Learning & Communication",
 "Robotics Engineering",
 "Mechanical Technology",
 "Automobile Technology",
 "Production Engineering",
 "Artificial Intelligence and Design",
 "Textile & Communication",
 "Automobile & Communication",
 "Textile & Electronics",
 "Chemical Technology",
 "Robotics Technology",
 "Textile with Specialization in AI",
 "Data Science and Automation"
 ],
 "fees": 484989,
 "placements": 1287872,
 "rankings": 36,
 "description": "A premier institution for engineering and technology. Shiv Nadar University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.8312832170037,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.210885848413616,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "37",
 "name": "PES University",
 "location": "City 9, Telangana",
 "ownership": "Private",
 "courses": [
 "Electrical and Automation",
 "Artificial Intelligence & Electronics",
 "Electronics and Design",
 "Data Science Technology",
 "Biotechnology Engineering",
 "Data Science and Automation",
 "Chemical with Data Analytics",
 "Automobile and Management",
 "Biotechnology with Data Analytics",
 "Mechanical and Design",
 "Cyber Security and Engineering",
 "Mechanical and Management"
 ],
 "fees": 685976,
 "placements": 1216972,
 "rankings": 37,
 "description": "A premier institution for engineering and technology. PES University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.837909465753564,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.129956573550502,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "38",
 "name": "RV College of Engineering",
 "location": "City 19, Telangana",
 "ownership": "Private",
 "courses": [
 "Robotics and Automation",
 "Mining Engineering",
 "Civil & Communication",
 "Artificial Intelligence and Design",
 "Robotics & Communication",
 "Instrumentation and Management",
 "Machine Learning Engineering",
 "Robotics and Engineering",
 "Mechanical & Electronics",
 "Computer Science & Communication",
 "Production with Data Analytics",
 "Automobile and Design",
 "Mining Technology"
 ],
 "fees": 319941,
 "placements": 1123348,
 "rankings": 38,
 "description": "A premier institution for engineering and technology. RV College of Engineering offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.247587710006281,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.7972440850099907,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "39",
 "name": "MS Ramaiah Institute of Technology",
 "location": "City 5, Tamil Nadu",
 "ownership": "Public",
 "courses": [
 "Chemical Technology",
 "Mining with Data Analytics",
 "Information Technology and Engineering",
 "Civil and Automation",
 "Cyber Security and Engineering",
 "Electronics Technology",
 "Machine Learning with Data Analytics",
 "Instrumentation and Management",
 "Biotechnology and Engineering",
 "Computer Science and Engineering",
 "Aerospace and Engineering",
 "Instrumentation & Communication",
 "Mechatronics and Management"
 ],
 "fees": 192732,
 "placements": 2161974,
 "rankings": 39,
 "description": "A premier institution for engineering and technology. MS Ramaiah Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.306256605467385,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.105716622562867,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "40",
 "name": "College of Engineering Pune",
 "location": "City 15, Uttar Pradesh",
 "ownership": "Private",
 "courses": [
 "Artificial Intelligence and Management",
 "Electrical and Engineering",
 "Machine Learning & Electronics",
 "Data Science and Design",
 "Artificial Intelligence and Automation",
 "Robotics and Automation",
 "Civil & Communication",
 "Civil Technology",
 "Information Technology and Automation",
 "Machine Learning and Automation",
 "Mining Technology",
 "Electronics with Specialization in AI",
 "Electronics and Design",
 "Metallurgy and Design"
 ],
 "fees": 465340,
 "placements": 1081305,
 "rankings": 40,
 "description": "A premier institution for engineering and technology. College of Engineering Pune offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.518925308155134,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.03513965365426,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "41",
 "name": "ICT Mumbai",
 "location": "City 17, Maharashtra",
 "ownership": "Private",
 "courses": [
 "Cyber Security Technology",
 "Automobile with Data Analytics",
 "Biotechnology and Management",
 "Mechatronics with Specialization in AI",
 "Data Science & Electronics",
 "Mechatronics Technology",
 "Aerospace and Management",
 "Instrumentation with Data Analytics",
 "Machine Learning & Electronics",
 "Information Technology and Automation",
 "Mechanical Technology"
 ],
 "fees": 593468,
 "placements": 1086912,
 "rankings": 41,
 "description": "A premier institution for engineering and technology. ICT Mumbai offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.179419570131687,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.6856477705520745,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "42",
 "name": "Veermata Jijabai Technological Institute",
 "location": "City 7, West Bengal",
 "ownership": "Private",
 "courses": [
 "Robotics and Engineering",
 "Mechatronics with Data Analytics",
 "Aerospace & Electronics",
 "Computer Science & Electronics",
 "Mechatronics with Specialization in AI",
 "Textile & Electronics",
 "Mechatronics & Electronics",
 "Information Technology Engineering",
 "Mechanical and Design",
 "Mining & Electronics",
 "Automobile Technology",
 "Electronics with Specialization in AI",
 "Cyber Security & Electronics",
 "Robotics with Data Analytics"
 ],
 "fees": 522236,
 "placements": 833715,
 "rankings": 42,
 "description": "A premier institution for engineering and technology. Veermata Jijabai Technological Institute offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.087678388845456,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.841041742458736,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "43",
 "name": "Sardar Patel Institute of Technology",
 "location": "City 3, Maharashtra",
 "ownership": "Public",
 "courses": [
 "Electrical and Design",
 "Computer Science and Automation",
 "Civil and Automation",
 "Mining & Electronics",
 "Instrumentation Technology",
 "Civil Technology",
 "Electrical and Automation",
 "Biotechnology and Automation",
 "Mining & Communication",
 "Robotics Technology",
 "Textile and Design",
 "Metallurgy with Data Analytics"
 ],
 "fees": 155134,
 "placements": 1985120,
 "rankings": 43,
 "description": "A premier institution for engineering and technology. Sardar Patel Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.177455108122256,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.809934985275431,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "44",
 "name": "Pune Institute of Computer Technology",
 "location": "City 9, West Bengal",
 "ownership": "Private",
 "courses": [
 "Civil & Communication",
 "Metallurgy with Data Analytics",
 "Mechatronics & Communication",
 "Automobile Technology",
 "Information Technology and Engineering",
 "Aerospace with Specialization in AI",
 "Textile and Automation",
 "Automobile with Data Analytics",
 "Information Technology and Management",
 "Chemical with Specialization in AI",
 "Mechanical Technology",
 "Electrical & Communication",
 "Data Science Technology",
 "Automobile and Engineering"
 ],
 "fees": 353751,
 "placements": 1214038,
 "rankings": 44,
 "description": "A premier institution for engineering and technology. Pune Institute of Computer Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.346938582692645,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.254071177319009,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "45",
 "name": "BMS College of Engineering",
 "location": "City 1, West Bengal",
 "ownership": "Private",
 "courses": [
 "Textile & Electronics",
 "Production and Engineering",
 "Automobile with Data Analytics",
 "Computer Science Engineering",
 "Civil and Management",
 "Mechanical & Communication",
 "Robotics and Engineering",
 "Biotechnology with Specialization in AI",
 "Chemical and Design",
 "Cyber Security & Electronics",
 "Metallurgy with Specialization in AI",
 "Machine Learning Engineering"
 ],
 "fees": 348660,
 "placements": 897788,
 "rankings": 45,
 "description": "A premier institution for engineering and technology. BMS College of Engineering offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.267163766308901,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.3109597379847,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "46",
 "name": "Dayananda Sagar College of Engineering",
 "location": "City 4, Gujarat",
 "ownership": "Private",
 "courses": [
 "Machine Learning & Electronics",
 "Biotechnology and Management",
 "Civil and Engineering",
 "Biotechnology and Design",
 "Instrumentation Engineering",
 "Artificial Intelligence and Management",
 "Mining & Communication",
 "Aerospace and Automation",
 "Cyber Security and Management",
 "Machine Learning and Design"
 ],
 "fees": 529769,
 "placements": 943808,
 "rankings": 46,
 "description": "A premier institution for engineering and technology. Dayananda Sagar College of Engineering offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.590884406465131,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.776053071916613,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "47",
 "name": "Bangalore Institute of Technology",
 "location": "City 3, Maharashtra",
 "ownership": "Public",
 "courses": [
 "Machine Learning with Specialization in AI",
 "Instrumentation and Design",
 "Mechanical with Specialization in AI",
 "Instrumentation and Engineering",
 "Electrical and Management",
 "Electrical and Design",
 "Instrumentation & Communication",
 "Production Technology",
 "Aerospace and Management",
 "Mechanical & Communication",
 "Mining & Communication",
 "Cyber Security and Design",
 "Mechanical and Management",
 "Civil and Automation",
 "Aerospace & Electronics"
 ],
 "fees": 225432,
 "placements": 2441703,
 "rankings": 47,
 "description": "A premier institution for engineering and technology. Bangalore Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.720276870533128,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.236939417532829,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "48",
 "name": "Kalinga Institute of Industrial Technology",
 "location": "City 10, Tamil Nadu",
 "ownership": "Private",
 "courses": [
 "Production and Design",
 "Electrical and Engineering",
 "Aerospace and Design",
 "Mining and Engineering",
 "Automobile Technology",
 "Data Science Technology",
 "Robotics and Design",
 "Artificial Intelligence with Specialization in AI",
 "Aerospace Technology",
 "Textile & Electronics"
 ],
 "fees": 464340,
 "placements": 1265869,
 "rankings": 48,
 "description": "A premier institution for engineering and technology. Kalinga Institute of Industrial Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.7037576124262515,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.095240958916837,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "49",
 "name": "Siksha 'O' Anusandhan",
 "location": "City 11, Uttar Pradesh",
 "ownership": "Private",
 "courses": [
 "Aerospace with Specialization in AI",
 "Civil and Management",
 "Textile Technology",
 "Instrumentation and Engineering",
 "Textile & Electronics",
 "Mechatronics and Design",
 "Electrical and Automation",
 "Information Technology and Management",
 "Machine Learning with Data Analytics",
 "Aerospace and Design",
 "Aerospace & Communication",
 "Mechatronics and Engineering",
 "Artificial Intelligence and Design",
 "Artificial Intelligence & Electronics"
 ],
 "fees": 452982,
 "placements": 869034,
 "rankings": 49,
 "description": "A premier institution for engineering and technology. Siksha 'O' Anusandhan offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.768920973634891,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.8713322123980918,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "50",
 "name": "SASTRA Deemed University",
 "location": "City 6, Karnataka",
 "ownership": "Private",
 "courses": [
 "Electrical and Automation",
 "Civil and Engineering",
 "Robotics and Automation",
 "Electrical with Specialization in AI",
 "Artificial Intelligence and Automation",
 "Biotechnology Technology",
 "Machine Learning and Design",
 "Instrumentation with Specialization in AI",
 "Mining Engineering",
 "Machine Learning and Management",
 "Computer Science Technology",
 "Instrumentation and Management",
 "Machine Learning with Data Analytics"
 ],
 "fees": 637640,
 "placements": 1376192,
 "rankings": 50,
 "description": "A premier institution for engineering and technology. SASTRA Deemed University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": false,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.177482775246357,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.2644487618225995,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "51",
 "name": "SSN College of Engineering",
 "location": "City 12, Uttar Pradesh",
 "ownership": "Private",
 "courses": [
 "Information Technology and Management",
 "Chemical Technology",
 "Mining Technology",
 "Artificial Intelligence & Communication",
 "Data Science and Management",
 "Computer Science & Communication",
 "Electrical & Electronics",
 "Machine Learning & Electronics",
 "Mechatronics Engineering",
 "Mechatronics Technology",
 "Automobile and Management"
 ],
 "fees": 619502,
 "placements": 993109,
 "rankings": 51,
 "description": "A premier institution for engineering and technology. SSN College of Engineering offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.829620615664123,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.421859314724428,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "52",
 "name": "PSG College of Technology",
 "location": "City 3, West Bengal",
 "ownership": "Private",
 "courses": [
 "Chemical with Data Analytics",
 "Aerospace and Automation",
 "Robotics and Engineering",
 "Cyber Security and Design",
 "Information Technology Engineering",
 "Mechatronics with Data Analytics",
 "Data Science & Electronics",
 "Chemical Engineering",
 "Machine Learning Technology",
 "Cyber Security with Specialization in AI",
 "Artificial Intelligence and Management",
 "Robotics and Design"
 ],
 "fees": 517211,
 "placements": 835766,
 "rankings": 52,
 "description": "A premier institution for engineering and technology. PSG College of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.362618592072406,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.095562004527079,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "53",
 "name": "Thiagarajar College of Engineering",
 "location": "City 4, Uttar Pradesh",
 "ownership": "Private",
 "courses": [
 "Cyber Security and Automation",
 "Production Technology",
 "Chemical and Engineering",
 "Automobile with Specialization in AI",
 "Textile with Specialization in AI",
 "Automobile with Data Analytics",
 "Electrical with Specialization in AI",
 "Production & Communication",
 "Mechanical and Engineering",
 "Mechanical Technology",
 "Production and Automation",
 "Computer Science and Management",
 "Robotics and Design"
 ],
 "fees": 505675,
 "placements": 966329,
 "rankings": 53,
 "description": "A premier institution for engineering and technology. Thiagarajar College of Engineering offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.0850504180494775,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.9584068478974546,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "54",
 "name": "Kumaraguru College of Technology",
 "location": "City 6, Punjab",
 "ownership": "Private",
 "courses": [
 "Artificial Intelligence with Data Analytics",
 "Cyber Security & Electronics",
 "Artificial Intelligence and Automation",
 "Aerospace and Management",
 "Instrumentation and Automation",
 "Electrical with Specialization in AI",
 "Mechatronics and Management",
 "Computer Science with Data Analytics"
 ],
 "fees": 581103,
 "placements": 882044,
 "rankings": 54,
 "description": "A premier institution for engineering and technology. Kumaraguru College of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.150642759698949,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.419637703745268,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "55",
 "name": "Chaitanya Bharathi Institute of Technology",
 "location": "City 15, West Bengal",
 "ownership": "Public",
 "courses": [
 "Artificial Intelligence and Management",
 "Electronics and Management",
 "Mechanical and Design",
 "Mining and Engineering",
 "Production and Automation",
 "Mining & Communication",
 "Instrumentation with Specialization in AI",
 "Aerospace Engineering",
 "Aerospace and Engineering",
 "Mining Engineering",
 "Cyber Security Engineering",
 "Civil and Design",
 "Computer Science with Specialization in AI",
 "Data Science and Engineering",
 "Instrumentation with Data Analytics"
 ],
 "fees": 192019,
 "placements": 2285827,
 "rankings": 55,
 "description": "A premier institution for engineering and technology. Chaitanya Bharathi Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.853704320646926,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.053623555892241,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "56",
 "name": "VNR Vignana Jyothi Institute of Engineering and Technology",
 "location": "City 16, Delhi",
 "ownership": "Private",
 "courses": [
 "Cyber Security & Communication",
 "Biotechnology with Specialization in AI",
 "Machine Learning and Automation",
 "Electronics & Electronics",
 "Information Technology Engineering",
 "Mechanical and Management",
 "Mechanical with Data Analytics",
 "Production and Automation",
 "Chemical and Management",
 "Machine Learning and Management",
 "Electrical and Design",
 "Biotechnology with Data Analytics"
 ],
 "fees": 411170,
 "placements": 815449,
 "rankings": 56,
 "description": "A premier institution for engineering and technology. VNR Vignana Jyothi Institute of Engineering and Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.1477123704842205,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.247447816769772,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "57",
 "name": "Gokaraju Rangaraju Institute of Engineering and Technology",
 "location": "City 17, Telangana",
 "ownership": "Private",
 "courses": [
 "Chemical and Engineering",
 "Biotechnology and Management",
 "Metallurgy with Specialization in AI",
 "Robotics Engineering",
 "Production & Communication",
 "Cyber Security and Automation",
 "Production Technology",
 "Textile with Data Analytics",
 "Machine Learning & Electronics",
 "Artificial Intelligence Engineering",
 "Robotics with Data Analytics",
 "Machine Learning with Specialization in AI",
 "Automobile Technology",
 "Biotechnology & Electronics"
 ],
 "fees": 457916,
 "placements": 1335078,
 "rankings": 57,
 "description": "A premier institution for engineering and technology. Gokaraju Rangaraju Institute of Engineering and Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.004787587747704,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.045331694010415,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "58",
 "name": "SR University",
 "location": "City 1, Karnataka",
 "ownership": "Private",
 "courses": [
 "Chemical & Electronics",
 "Electrical and Engineering",
 "Machine Learning Engineering",
 "Textile with Data Analytics",
 "Chemical and Engineering",
 "Mechatronics and Engineering",
 "Electronics with Data Analytics",
 "Data Science and Management",
 "Machine Learning with Data Analytics",
 "Cyber Security Engineering",
 "Cyber Security with Data Analytics"
 ],
 "fees": 632837,
 "placements": 1167844,
 "rankings": 58,
 "description": "A premier institution for engineering and technology. SR University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": false,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.66294943324115,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.8633161690174944,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "59",
 "name": "Koneru Lakshmaiah Education Foundation",
 "location": "City 7, Punjab",
 "ownership": "Private",
 "courses": [
 "Civil & Communication",
 "Production & Communication",
 "Mining with Data Analytics",
 "Metallurgy & Electronics",
 "Robotics with Specialization in AI",
 "Biotechnology & Communication",
 "Biotechnology & Electronics",
 "Automobile Engineering",
 "Production and Design",
 "Chemical & Electronics",
 "Instrumentation with Specialization in AI",
 "Metallurgy with Specialization in AI",
 "Electronics & Communication",
 "Artificial Intelligence and Automation",
 "Computer Science & Electronics"
 ],
 "fees": 622479,
 "placements": 946136,
 "rankings": 59,
 "description": "A premier institution for engineering and technology. Koneru Lakshmaiah Education Foundation offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.914885705819769,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.7131375595795024,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "60",
 "name": "Sathyabama Institute of Science and Technology",
 "location": "City 11, Telangana",
 "ownership": "Private",
 "courses": [
 "Computer Science and Design",
 "Production with Data Analytics",
 "Textile Technology",
 "Instrumentation Technology",
 "Artificial Intelligence with Data Analytics",
 "Instrumentation with Data Analytics",
 "Mechanical with Specialization in AI",
 "Mechanical & Communication",
 "Automobile & Communication",
 "Machine Learning and Management",
 "Cyber Security & Communication",
 "Production and Design",
 "Cyber Security and Automation",
 "Mechanical Technology"
 ],
 "fees": 698094,
 "placements": 1210105,
 "rankings": 60,
 "description": "A premier institution for engineering and technology. Sathyabama Institute of Science and Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.92632137594091,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.35185209353466,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "61",
 "name": "Hindustan Institute of Technology and Science",
 "location": "City 15, Maharashtra",
 "ownership": "Public",
 "courses": [
 "Instrumentation and Design",
 "Instrumentation and Engineering",
 "Chemical and Design",
 "Production and Management",
 "Instrumentation and Automation",
 "Electrical Technology",
 "Data Science with Data Analytics",
 "Mining and Design",
 "Civil and Management",
 "Mechatronics and Engineering",
 "Textile and Management",
 "Electronics & Electronics",
 "Computer Science Technology",
 "Mechanical and Design",
 "Cyber Security & Electronics"
 ],
 "fees": 213382,
 "placements": 2400440,
 "rankings": 61,
 "description": "A premier institution for engineering and technology. Hindustan Institute of Technology and Science offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.276821948459782,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.431392691939504,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "62",
 "name": "Nirma University",
 "location": "City 19, Karnataka",
 "ownership": "Private",
 "courses": [
 "Electronics with Specialization in AI",
 "Computer Science Technology",
 "Automobile Technology",
 "Computer Science with Specialization in AI",
 "Cyber Security with Specialization in AI",
 "Mechanical and Management",
 "Artificial Intelligence Technology",
 "Civil & Communication",
 "Data Science Technology",
 "Automobile with Data Analytics"
 ],
 "fees": 315125,
 "placements": 944892,
 "rankings": 62,
 "description": "A premier institution for engineering and technology. Nirma University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.146895448873091,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.250520677874374,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "63",
 "name": "Dhirubhai Ambani Institute of Information and Communication Technology",
 "location": "City 7, Tamil Nadu",
 "ownership": "Private",
 "courses": [
 "Artificial Intelligence & Communication",
 "Mechatronics with Data Analytics",
 "Computer Science & Electronics",
 "Production with Data Analytics",
 "Data Science and Automation",
 "Textile with Data Analytics",
 "Mining with Specialization in AI",
 "Electrical & Communication",
 "Electronics and Automation",
 "Cyber Security and Automation"
 ],
 "fees": 609360,
 "placements": 1092320,
 "rankings": 63,
 "description": "A premier institution for engineering and technology. Dhirubhai Ambani Institute of Information and Communication Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.171981908102407,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.731572598102585,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "64",
 "name": "Pandit Deendayal Energy University",
 "location": "City 8, Uttar Pradesh",
 "ownership": "Private",
 "courses": [
 "Computer Science with Data Analytics",
 "Information Technology & Electronics",
 "Biotechnology & Communication",
 "Data Science and Management",
 "Chemical and Engineering",
 "Automobile and Automation",
 "Mining & Electronics",
 "Production & Electronics",
 "Biotechnology and Design",
 "Automobile Technology",
 "Instrumentation & Electronics",
 "Computer Science Engineering",
 "Mechatronics & Communication",
 "Civil and Design"
 ],
 "fees": 403631,
 "placements": 1102715,
 "rankings": 64,
 "description": "A premier institution for engineering and technology. Pandit Deendayal Energy University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.006438646283991,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.040510237059698,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "65",
 "name": "Ahmedabad University",
 "location": "City 2, Maharashtra",
 "ownership": "Private",
 "courses": [
 "Metallurgy with Specialization in AI",
 "Robotics and Design",
 "Civil and Design",
 "Artificial Intelligence Engineering",
 "Mechatronics Engineering",
 "Instrumentation & Electronics",
 "Instrumentation and Management",
 "Metallurgy & Communication",
 "Aerospace and Automation",
 "Robotics Engineering",
 "Chemical with Specialization in AI",
 "Chemical Technology"
 ],
 "fees": 452299,
 "placements": 1052678,
 "rankings": 65,
 "description": "A premier institution for engineering and technology. Ahmedabad University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.298457058421875,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.459484653814054,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "66",
 "name": "Navrachana University",
 "location": "City 7, Gujarat",
 "ownership": "Private",
 "courses": [
 "Robotics and Engineering",
 "Electrical & Electronics",
 "Textile and Automation",
 "Electronics with Specialization in AI",
 "Biotechnology Engineering",
 "Textile Technology",
 "Electrical and Management",
 "Electrical Technology",
 "Artificial Intelligence and Design",
 "Chemical Technology",
 "Instrumentation and Engineering",
 "Biotechnology with Specialization in AI",
 "Cyber Security and Design",
 "Chemical & Communication"
 ],
 "fees": 544916,
 "placements": 951845,
 "rankings": 66,
 "description": "A premier institution for engineering and technology. Navrachana University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.59459637805952,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.381670591992967,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "67",
 "name": "Symbiosis Institute of Technology",
 "location": "City 12, West Bengal",
 "ownership": "Public",
 "courses": [
 "Instrumentation with Data Analytics",
 "Aerospace with Specialization in AI",
 "Data Science & Electronics",
 "Mining Technology",
 "Instrumentation and Design",
 "Production & Electronics",
 "Machine Learning and Design",
 "Information Technology and Engineering",
 "Mechatronics and Automation",
 "Instrumentation and Automation",
 "Textile Technology",
 "Electrical with Specialization in AI",
 "Mechatronics & Electronics",
 "Civil & Communication",
 "Electrical and Management"
 ],
 "fees": 211526,
 "placements": 2102683,
 "rankings": 67,
 "description": "A premier institution for engineering and technology. Symbiosis Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.126402556058319,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.5463970867577497,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "68",
 "name": "MIT World Peace University",
 "location": "City 15, Maharashtra",
 "ownership": "Private",
 "courses": [
 "Production Technology",
 "Textile and Management",
 "Chemical and Engineering",
 "Information Technology Engineering",
 "Instrumentation with Specialization in AI",
 "Mining Engineering",
 "Textile and Engineering",
 "Machine Learning Technology",
 "Aerospace & Communication",
 "Biotechnology Technology",
 "Machine Learning with Data Analytics",
 "Electrical and Automation",
 "Computer Science with Specialization in AI",
 "Electrical Engineering",
 "Data Science & Electronics"
 ],
 "fees": 468833,
 "placements": 1278406,
 "rankings": 68,
 "description": "A premier institution for engineering and technology. MIT World Peace University offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.952708974993067,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.7442705765053255,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "69",
 "name": "Vishwakarma Institute of Technology",
 "location": "City 9, Gujarat",
 "ownership": "Public",
 "courses": [
 "Artificial Intelligence Technology",
 "Mechanical Engineering",
 "Aerospace and Management",
 "Information Technology and Management",
 "Chemical with Specialization in AI",
 "Automobile and Engineering",
 "Biotechnology Engineering",
 "Data Science & Electronics",
 "Data Science Engineering",
 "Biotechnology and Management",
 "Robotics and Automation",
 "Machine Learning and Management",
 "Robotics Technology"
 ],
 "fees": 152962,
 "placements": 2171230,
 "rankings": 69,
 "description": "A premier institution for engineering and technology. Vishwakarma Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.141126985048734,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.343455770752052,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "70",
 "name": "Dwarkadas J. Sanghvi College of Engineering",
 "location": "City 14, Delhi",
 "ownership": "Private",
 "courses": [
 "Chemical with Data Analytics",
 "Instrumentation and Automation",
 "Machine Learning and Automation",
 "Biotechnology and Management",
 "Metallurgy and Engineering",
 "Electrical Technology",
 "Cyber Security with Data Analytics",
 "Aerospace & Communication",
 "Mining & Communication",
 "Aerospace & Electronics",
 "Electronics Engineering"
 ],
 "fees": 555127,
 "placements": 1054776,
 "rankings": 70,
 "description": "A premier institution for engineering and technology. Dwarkadas J. Sanghvi College of Engineering offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": false,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.31575266743989,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.236893176682884,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "71",
 "name": "KJ Somaiya College of Engineering",
 "location": "City 16, Tamil Nadu",
 "ownership": "Private",
 "courses": [
 "Artificial Intelligence & Electronics",
 "Civil and Automation",
 "Chemical and Automation",
 "Cyber Security Technology",
 "Automobile and Engineering",
 "Robotics & Communication",
 "Textile Engineering",
 "Production and Management",
 "Mining and Engineering",
 "Mechatronics & Communication",
 "Electrical Engineering",
 "Metallurgy and Automation",
 "Mining and Design",
 "Data Science and Management"
 ],
 "fees": 661391,
 "placements": 1070109,
 "rankings": 71,
 "description": "A premier institution for engineering and technology. KJ Somaiya College of Engineering offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.163056147840076,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.5336690323770137,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "72",
 "name": "Thadomal Shahani Engineering College",
 "location": "City 16, Tamil Nadu",
 "ownership": "Private",
 "courses": [
 "Aerospace & Electronics",
 "Instrumentation & Electronics",
 "Information Technology with Data Analytics",
 "Mining and Automation",
 "Information Technology and Automation",
 "Metallurgy and Engineering",
 "Information Technology Technology",
 "Mining and Design",
 "Production and Management",
 "Artificial Intelligence and Automation"
 ],
 "fees": 514945,
 "placements": 997106,
 "rankings": 72,
 "description": "A premier institution for engineering and technology. Thadomal Shahani Engineering College offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.799177849708649,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.3315804419725925,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "73",
 "name": "NMIMS Mukesh Patel School of Technology",
 "location": "City 1, Tamil Nadu",
 "ownership": "Private",
 "courses": [
 "Machine Learning Engineering",
 "Civil Technology",
 "Aerospace and Design",
 "Instrumentation & Communication",
 "Production & Electronics",
 "Electronics with Data Analytics",
 "Electrical with Specialization in AI",
 "Aerospace with Specialization in AI",
 "Chemical Technology",
 "Machine Learning and Design",
 "Artificial Intelligence and Design",
 "Computer Science Engineering",
 "Production Engineering"
 ],
 "fees": 613597,
 "placements": 1124881,
 "rankings": 73,
 "description": "A premier institution for engineering and technology. NMIMS Mukesh Patel School of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.8627935868334005,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 4.262993671435337,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "74",
 "name": "Jaypee Institute of Information Technology",
 "location": "City 14, Uttar Pradesh",
 "ownership": "Private",
 "courses": [
 "Robotics & Electronics",
 "Mining and Engineering",
 "Civil Technology",
 "Data Science & Electronics",
 "Production and Management",
 "Computer Science with Data Analytics",
 "Production with Specialization in AI",
 "Instrumentation & Communication",
 "Mechanical Engineering",
 "Chemical and Engineering",
 "Biotechnology & Communication"
 ],
 "fees": 328564,
 "placements": 1284296,
 "rankings": 74,
 "description": "A premier institution for engineering and technology. Jaypee Institute of Information Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.845295015729047,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.9436092757996764,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 },
 {
 "id": "75",
 "name": "Maharaja Agrasen Institute of Technology",
 "location": "City 4, Karnataka",
 "ownership": "Public",
 "courses": [
 "Information Technology and Engineering",
 "Artificial Intelligence and Automation",
 "Cyber Security and Management",
 "Automobile and Design",
 "Data Science Engineering",
 "Mining and Automation",
 "Biotechnology Engineering",
 "Civil and Automation",
 "Automobile & Communication",
 "Electrical with Specialization in AI"
 ],
 "fees": 248907,
 "placements": 2289933,
 "rankings": 75,
 "description": "A premier institution for engineering and technology. Maharaja Agrasen Institute of Technology offers world-class facilities and excellent placement opportunities.",
 "hostelAvailability": true,
 "gallery": [
 "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
 ],
 "reviews": [
 {
 "user": "Student A",
 "rating": 4.2657838126695005,
 "comment": "Great faculty and excellent placements."
 },
 {
 "user": "Student B",
 "rating": 3.775264279239968,
 "comment": "Good infrastructure but curriculum is rigorous."
 }
 ]
 }
];
