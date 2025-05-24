import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getOfficerById, getOfficerComplaintStats, deleteAgent } from '../../utils/agentManagement';
import { toast } from 'react-hot-toast';

const AgentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [agent, setAgent] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        const agentData = await getOfficerById(id);
        const complaintStats = await getOfficerComplaintStats(id);
        setAgent(agentData);
        setStats(complaintStats);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load agent data");
      }
    };

    loadData();
  }, [id]);

  const handleToggleStatus = () => {
    setIsActive(prev => !prev);
    // Optional: update Firestore with active/inactive flag
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this agent?");
    if (confirmed && id) {
      try {
        await deleteAgent(id);
        toast.success("Agent deleted successfully!");
        navigate("/admin/agents");
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Failed to delete agent.");
      }
    }
  };

  if (!agent || !stats) {
    return <div className="text-center mt-10 text-gray-500">Loading agent details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-2 px-6">
      <button
        onClick={() => navigate('/admin/agents')}
        className="text-lg mb-6 focus:outline-none"
      >
        <FaArrowLeft className="text-2xl text-black dark:text-white hover:opacity-80" />
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#24303f] border border-[#1c2434] dark:border-gray-500 shadow-lg rounded-lg p-6">
        <div className="md:w-1/3 flex justify-center items-center">
          <img
            src={agent.profileImage || '/images/user-profile.png'}
            alt={agent.name}
            className="w-96 h-96 object-cover rounded-md border-2 border-blue-500"
          />
        </div>

        <div className="md:w-2/3 text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl font-bold mb-4">{agent.name}</h1>
          <p className="mb-2"><strong>Rank:</strong> {agent.role}</p>
          <p className="mb-2"><strong>Department:</strong> {agent.organization}</p>
          <p className="mb-2"><strong>Contact Info:</strong> Phone: {agent.phone} | Email: {agent.email}</p>
          <p className="mb-4"><strong>CNIC:</strong> {agent.cnic}</p>

          <h2 className="text-2xl font-semibold mt-4 mb-3">Complaints Overview</h2>
          <div className="grid grid-cols-2 gap-x-10 text-lg">
            <p><strong>Total:</strong> {stats.totalComplaints}</p>
            <p><strong>Open:</strong> <span className="text-red-500">{stats.complaintsStatus.open}</span></p>
            <p><strong>In Progress:</strong> <span className="text-yellow-500">{stats.complaintsStatus.inProgress}</span></p>
            <p><strong>Resolved:</strong> <span className="text-green-500">{stats.complaintsStatus.resolved}</span></p>
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
