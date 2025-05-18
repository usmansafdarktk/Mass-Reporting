import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';


const AgentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const inspectorData = [
    {
      id: "1",
      imagePath: '/images/inspector1.jpg',
      name: 'Inspector Jamil',
      rank: 'Senior Inspector',
      department: 'Traffic Police',
      contactInfo: 'Phone: +123-456-7890 | Email: jamil@police.com',
      bio: 'Jamil has over 10 years of experience in handling traffic complaints and enforcing road safety laws.',
      totalComplaints: 150,
      complaintsStatus: {
        open: 20,
        inProgress: 30,
        resolved: 100,
      },
    },
    { id: "2",
      imagePath: '/images/inspector2.jpg',
      name: 'Inspector Nasir',
      rank: 'Inspector',
      department: 'Criminal Investigation',
      contactInfo: 'Phone: +987-654-3210 | Email: nasir@police.com',
      bio: 'Nasir specializes in criminal investigations and has solved numerous high-profile cases over the years.',
      totalComplaints: 80,
      complaintsStatus: {
        open: 10,
        inProgress: 20,
        resolved: 50,
      },
    },
    { id: "3",
      imagePath: '/images/inspector3.jpg',
      name: 'Inspector Sarib',
      rank: 'Assistant Inspector',
      department: 'Cyber Crime Unit',
      contactInfo: 'Phone: +456-789-1234 | Email: sarib@police.com',
      bio: 'Sarib leads the fight against cybercrime, ensuring digital safety for all.',
      totalComplaints: 60,
      complaintsStatus: {
        open: 5,
        inProgress: 10,
        resolved: 45,
      },
    },
  ];

  const inspector = inspectorData.find((i) => i.id === id);

  if (!inspector) {
    return <div className="text-center text-red-600 mt-10">Inspector not found.</div>;
  }

    const [isActive, setIsActive] = useState<boolean>(true); // Explicit boolean type

    const handleToggleStatus = (): void => {
    setIsActive((prev: boolean) => !prev);
    // TODO: Add backend logic, e.g.:
    };

    const handleDelete = (): void => {
    const confirmed: boolean = window.confirm("Are you sure you want to permanently delete this agent?");
    if (confirmed) {
        // TODO: Add backend delete logic, e.g.:
        console.log("Agent deleted");
    }
    };
    
  return (
    <div className="max-w-5xl mx-auto mt-2 px-6">
      <button
        onClick={() => navigate('/admin/agents')}
        className="text-lg mb-6 focus:outline-none"
      >
        <FaArrowLeft className="text-2xl text-black dark:text-white hover:opacity-80" />
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#24303f] border border-[#1c2434] dark:border-gray-500 shadow-lg rounded-lg p-6">
        {/* Image Section - Now square with no border */}
        <div className="md:w-1/3 flex justify-center items-center">
          <img
            src={inspector.imagePath}
            alt={inspector.name}
            className="w-96 h-96 object-cover rounded-md border-2 border-blue-500"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-2/3 text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl font-bold mb-4">{inspector.name}</h1>

          <p className="mb-2"><strong>Rank:</strong> {inspector.rank}</p>
          <p className="mb-2"><strong>Department:</strong> {inspector.department}</p>
          <p className="mb-2"><strong>Contact Info:</strong> {inspector.contactInfo}</p>
          <p className="mb-4"><strong>Bio:</strong> {inspector.bio}</p>

          <h2 className="text-2xl font-semibold mt-4 mb-3">Complaints Overview</h2>
          <div className="grid grid-cols-2 gap-x-10 text-lg">
            <p><strong>Total:</strong> {inspector.totalComplaints}</p>
            <p><strong>Open:</strong> <span className="text-red-500">{inspector.complaintsStatus.open}</span></p>
            <p><strong>In Progress:</strong> <span className="text-yellow-500">{inspector.complaintsStatus.inProgress}</span></p>
            <p><strong>Resolved:</strong> <span className="text-green-500">{inspector.complaintsStatus.resolved}</span></p>
          </div>
        </div>
      </div>

        <div className="flex justify-start gap-4 my-8">
            <button
                onClick={handleToggleStatus}
                className={`px-4 py-2.5 rounded font-medium shadow transition-all ${
                isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
                } text-white`}
            >
                {isActive ? 'Deactivate Agent' : 'Reactivate Agent'}
            </button>
            <button
                onClick={handleDelete}
                className="px-4 py-2.5 rounded font-medium bg-red-600 hover:bg-red-700 text-white shadow"
            >
                Delete Agent
            </button>
        </div>
    </div>
  );
};

export default AgentDetailPage;
