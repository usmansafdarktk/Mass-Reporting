import PakistanMap from "../../components/PakistanMap";

const Cities = () => {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">City Management</h1>
      <PakistanMap/>
    </div>
  );
};

export default Cities;
