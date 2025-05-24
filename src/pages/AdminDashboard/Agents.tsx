import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import InspectorProfileCard from '../../components/InspectorProfileCard';
import { fetchAllAgents, getOfficerComplaintStats } from '../../utils/agentManagement';

const Agents: React.FC = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgentsWithStats = async () => {
      try {
        const officers = await fetchAllAgents();

        // For each officer, fetch complaint stats
        const agentsWithStats = await Promise.all(
          officers.map(async (officer: any) => {
            const stats = await getOfficerComplaintStats(officer.id);
            return {
              ...officer,
              totalComplaints: stats.totalComplaints,
              complaintsStatus: stats.complaintsStatus,
            };
          })
        );

        setAgents(agentsWithStats);
      } catch (error) {
        console.error('Error loading agents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAgentsWithStats();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Agents" />

      <div className="flex justify-start m-8">
        <Link
          to="/admin/agents/add-agent"
          className="bg-[#1836b2] hover:bg-[#10259b] text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          + Add Agent
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading agents...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-12 mx-8">
          {agents.map((agent) => (
            <Link key={agent.id} to={`/admin/agents/${agent.id}`}>
              <InspectorProfileCard {...agent} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Agents;
