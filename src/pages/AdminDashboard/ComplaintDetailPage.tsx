import { useParams } from 'react-router-dom';
import { Complaint } from './Complaints'; 
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Complaint data
const complaintData: Complaint[] = [
  {
    id: "1",
    imagePath: '/images/complaint1.jpg',
    title: 'Illegal Lane Change',
    description: 'A car changed lanes abruptly in front of me without signaling, causing a near accident.',
    date: '2024-12-08',
    status: 'Open',
  },
  { 
    id: "2",
    imagePath: '/images/complaint2.jpg',
    title: 'Running a Red Light',
    description: 'A vehicle ran through a red light, nearly colliding with other cars.',
    date: '2024-12-07',
    status: 'In Progress',
  },
  {
    id: "3",
    imagePath: '/images/complaint3.jpg',
    title: 'Illegal Parking in a Disabled Spot',
    description: 'Someone parked their car in a disabled parking spot without a permit.',
    date: '2024-12-05',
    status: 'Resolved',
  },
  {
    id: "4",
    imagePath: '/images/complaint4.jpg',
    title: 'Speeding in a Residential Area',
    description: 'A car was speeding excessively in a residential area, endangering pedestrians.',
    date: '2024-12-03',
    status: 'Open',
  },
  {
    id: "5",
    imagePath: '/images/complaint5.jpg',
    title: 'Tailgating on the Highway',
    description: 'A car was tailgating me aggressively on the highway, making me feel unsafe.',
    date: '2024-12-02',
    status: 'In Progress',
  },
  {
    id: "6",
    imagePath: '/images/complaint6.jpg',
    title: 'Blocking the Intersection',
    description: 'A vehicle blocked the intersection during rush hour, causing a traffic jam.',
    date: '2024-12-01',
    status: 'Resolved',
  },
  {
    id: "7",
    imagePath: '/images/complaint7.jpg',
    title: 'Driving Under the Influence',
    description: 'A driver was swerving between lanes and driving erratically, possibly under the influence.',
    date: '2024-11-30',
    status: 'Open',
  },
  {
    id: "8",
    imagePath: '/images/complaint8.jpg',
    title: 'Using a Mobile Phone While Driving',
    description: 'A driver was texting while driving, causing a distraction and posing a danger to others.',
    date: '2024-11-28',
    status: 'In Progress',
  },
];

const statusColorMap: { [key in Complaint['status']]: string } = {
  Open: 'bg-red-500 text-white',
  'In Progress': 'bg-yellow-400 text-black',
  Resolved: 'bg-green-500 text-white',
};

const ComplaintDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const complaint = complaintData.find((c) => c.id === id);

  if (!complaint) {
    return <div className="text-center mt-12 text-red-600">Complaint not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-2 mb-10 px-6">
      <button
        onClick={() => navigate('/admin/complaints')}
        className="text-lg focus:outline-none"
      >
        <FaArrowLeft className="mb-6 text-2xl text-black dark:text-white hover:opacity-80 transition-opacity" />
      </button>

      <h1 className="text-4xl font-bold text-left mb-8 text-gray-800 dark:text-white">
        {complaint.title}
      </h1>

      <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#24303f] border border-[#1c2434] dark:border-gray-500 shadow-lg dark:shadow-md rounded-lg p-6">
        {/* Image Left */}
        <div className="md:w-1/2">
          <img
            src={complaint.imagePath}
            alt={complaint.title}
            className="w-full h-80 object-cover rounded"
          />
        </div>

        {/* Text Right */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="mb-4 text-lg dark:text-gray-100">
            <strong>Status:</strong>{' '}
            <span
              className={`px-3 py-1 rounded-md text-sm font-semibold ${statusColorMap[complaint.status]}`}
            >
              {complaint.status}
            </span>
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
            <strong>Date:</strong> {complaint.date}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
            <strong>Description:</strong> {complaint.description}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Reported By:</strong> citizen_user_123
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailPage;
