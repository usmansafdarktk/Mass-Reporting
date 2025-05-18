import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ComplaintCard from '../../components/ComplaintCard';

// Define allowed status types
type ComplaintStatus = 'Open' | 'In Progress' | 'Resolved';

// Define Complaint data type
export interface Complaint {
  id: string;
  imagePath: string;
  title: string;
  description: string;
  date: string;
  status: ComplaintStatus;
}

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

const Complaints = () => {
  return (
    <>
      <Breadcrumb pageName="Traffic Complaints" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12 mx-8">
        {complaintData.map((complaint) => (
          <Link
            to={`/admin/complaints/${complaint.id}`}
            key={complaint.id}
            className="cursor-pointer"
          >
            <ComplaintCard {...complaint} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Complaints;
